'use server';

import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

export interface WaitlistResult {
  status: 'idle' | 'success' | 'error';
  message: string;
}

const emailRateLimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, '24 h'),
  prefix: 'turnkit_email',
});

const ipRateLimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(60, '1 h'),
  prefix: 'turnkit_ip',
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const disposableDomains = ['tempmail.com', 'guerrillamail.com', '10minutemail.com', 'mailinator.com'];

export async function submitWaitlistRequest(email: string, honeypot: string, ip: string): Promise<WaitlistResult> {
  if (honeypot) {
    return { status: 'success', message: "You're on the list! Check your email for confirmation." };
  }

  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedEmail || trimmedEmail.length < 3 || trimmedEmail.length > 254 || !emailRegex.test(trimmedEmail)) {
    return { status: 'error', message: 'Please enter a valid email address.' };
  }

  const domain = trimmedEmail.split('@')[1];
  if (disposableDomains.includes(domain)) {
    return { status: 'error', message: 'Disposable email not allowed.' };
  }

  try {
    const emailResult = await emailRateLimit.limit(`email:${trimmedEmail}`);

    if (!emailResult.success) {
      const retryAfter = Math.ceil((emailResult.reset - Date.now()) / 1000);
      const hours = Math.ceil(retryAfter / 3600);
      return {
        status: 'error',
        message: `Too many attempts. Please try again in ${hours} hour${hours > 1 ? 's' : ''}.`,
      };
    }

    const ipResult = await ipRateLimit.limit(`ip:${ip}`);

    if (!ipResult.success) {
      const retryAfter = Math.ceil((ipResult.reset - Date.now()) / 1000);
      const hours = Math.ceil(retryAfter / 3600);
      return {
        status: 'error',
        message: `Too many attempts. Please try again in ${hours} hour${hours > 1 ? 's' : ''}.`,
      };
    }
  } catch (error) {
    console.error('[RATE_LIMIT_ERROR]', error);
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('[ERROR] Missing RESEND_API_KEY');
    return { status: 'error', message: 'Service temporarily unavailable. Try again later.' };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch('https://api.resend.com/contacts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: trimmedEmail,
        unsubscribed: false,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const data = (await response.json()) as { message?: string };

    if (response.ok) {
      return { status: 'success', message: "You're on the list! Check your email for confirmation." };
    }

    if (response.status === 400 && data.message?.includes('already exists')) {
      return { status: 'success', message: "You're on the list! Check your email for confirmation." };
    }

    console.error('[ERROR] Resend error:', data);
    return { status: 'error', message: 'Something went wrong. Please try again or join our Discord.' };
  } catch (error) {
    console.error('[ERROR] Resend network error:', error);
    return { status: 'error', message: 'Network error. Please check your connection and try again.' };
  }
}
