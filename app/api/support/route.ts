import { NextResponse, type NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import { BackendAuthError, backendFetch } from '@/lib/backend-auth';
import { BILLING_CCU_TIERS } from '@/lib/billing-upgrade';

type SupportContactRequest = {
  name?: string;
  email?: string;
  intent?: 'custom-plan' | 'downgrade';
  details?: string;
  honeypot?: string;
  context?: {
    gameId?: string;
    currentCcu?: number;
    currentModules?: string;
  };
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const defaultSupportToEmail = 'nenadnikolic.tf2@gmail.com';
const defaultSupportFromEmail = 'TurnKit Support <support@turnkit.dev>';
const supportRequestError = 'Unable to send support request right now. Please try again later or email support@turnkit.dev.';
const restrictedSupportError = 'Support requests here are available only for customers on the 640 CCU plan.';
const maxPublicCcuTier = BILLING_CCU_TIERS[BILLING_CCU_TIERS.length - 1] ?? 640;

const emailRateLimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, '24 h'),
  prefix: 'turnkit_support_email',
});

const ipRateLimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(20, '1 h'),
  prefix: 'turnkit_support_ip',
});

function readClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for') ?? '';
  const realIp = request.headers.get('x-real-ip') ?? '';
  return forwardedFor.split(',')[0]?.trim() || realIp || '127.0.0.1';
}

async function enforceRateLimit(email: string, ip: string) {
  const [emailResult, ipResult] = await Promise.all([
    emailRateLimit.limit(`email:${email}`),
    ipRateLimit.limit(`ip:${ip}`),
  ]);

  if (!emailResult.success || !ipResult.success) {
    const resetAt = Math.max(emailResult.reset, ipResult.reset);
    const retryAfter = Math.max(1, Math.ceil((resetAt - Date.now()) / 1000));
    return NextResponse.json(
      { success: false, error: 'Too many support requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
        },
      },
    );
  }

  return null;
}

function getCurrentPlanCcu(tierLimits: Record<string, number> | undefined) {
  return Math.max(0, ...Object.values(tierLimits ?? {}).filter((value) => Number.isFinite(value)));
}

async function requireEligibleSupportCustomer(gameId: string) {
  const billing = (await backendFetch(`/v1/dev/dashboard/${gameId}/billing`)) as { tierLimits?: Record<string, number> } | null;
  const currentPlanCcu = getCurrentPlanCcu(billing?.tierLimits);
  return currentPlanCcu === maxPublicCcuTier;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SupportContactRequest;

    if (body.honeypot) {
      return NextResponse.json({ success: true, message: 'Thanks. We will get back to you soon.' });
    }

    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim().toLowerCase();
    const intent = body.intent === 'downgrade' ? 'downgrade' : 'custom-plan';
    const details = String(body.details ?? '').trim();
    const gameId = String(body.context?.gameId ?? '').trim();

    if (!name) {
      return NextResponse.json({ success: false, error: 'Name is required.' }, { status: 400 });
    }
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (!details) {
      return NextResponse.json({ success: false, error: 'Please describe what you need.' }, { status: 400 });
    }
    if (!gameId) {
      return NextResponse.json({ success: false, error: restrictedSupportError }, { status: 403 });
    }

    try {
      const eligibleCustomer = await requireEligibleSupportCustomer(gameId);
      if (!eligibleCustomer) {
        return NextResponse.json({ success: false, error: restrictedSupportError }, { status: 403 });
      }
    } catch (error) {
      if (error instanceof BackendAuthError) {
        return NextResponse.json({ success: false, error: restrictedSupportError }, { status: 403 });
      }
      throw error;
    }

    const rateLimitResponse = await enforceRateLimit(email, readClientIp(request));
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('[SUPPORT_ERROR] Missing RESEND_API_KEY');
      return NextResponse.json({ success: false, error: supportRequestError }, { status: 500 });
    }

    const context = body.context ?? {};
    const requestTypeLabel = intent === 'downgrade' ? 'downgrade' : 'custom plan';
    const subject = `TurnKit ${requestTypeLabel} request from ${name}`;
    const supportToEmail = process.env.SUPPORT_TO_EMAIL?.trim() || defaultSupportToEmail;
    const text = [
      `Request Type: ${requestTypeLabel}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Game ID: ${gameId || '-'}`,
      `Current CCU: ${context.currentCcu ?? '-'}`,
      `Current Modules: ${context.currentModules ?? '-'}`,
      '',
      'Message:',
      details,
    ].join('\n');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.SUPPORT_FROM_EMAIL ?? defaultSupportFromEmail,
        to: [supportToEmail],
        reply_to: email,
        subject,
        text,
        html: text.replaceAll('\n', '<br />'),
      }),
      signal: controller.signal,
    }).finally(() => {
      clearTimeout(timeout);
    });

    if (!response.ok) {
      const raw = await response.text();
      console.error('[SUPPORT_ERROR] Resend request failed', { status: response.status, body: raw });
      return NextResponse.json({ success: false, error: supportRequestError }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Thanks. We will get back to you soon.' });
  } catch (error) {
    console.error('[SUPPORT_ERROR] Unexpected error', error);
    return NextResponse.json({ success: false, error: supportRequestError }, { status: 500 });
  }
}
