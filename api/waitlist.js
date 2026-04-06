import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

// ✅ Primary: email-based limit (business rule)
const emailRateLimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, '24 h'),
  prefix: 'turnkit_email',
});

// ✅ Secondary: IP-based limit (infra protection)
const ipRateLimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(60, '1 h'),
  prefix: 'turnkit_ip',
});

const successMessage = "You're on the list! Check your email for confirmation.";

function sendJson(res, status, body) {
  return res.status(status).json(body);
}

async function readJson(response) {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  // -----------------------------
  // CORS (optional but safe)
  // -----------------------------
  const allowedOrigins = [
    'https://turnkit.dev',
    'https://www.turnkit.dev',
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null,
  ].filter(Boolean);

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return sendJson(res, 200, { success: true, message: 'OK' });
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { success: false, error: 'Method not allowed' });
  }

  // -----------------------------
  // Content-Type check
  // -----------------------------
  if (!req.headers['content-type']?.includes('application/json')) {
    return sendJson(res, 415, { success: false, error: 'Content-Type must be application/json' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('[ERROR] Missing RESEND_API_KEY');
    return sendJson(res, 500, { success: false, error: 'Service unavailable' });
  }

  // -----------------------------
  // Extract IP (Vercel-safe)
  // -----------------------------
  const rawIp =
    req.headers['x-forwarded-for']?.toString() ||
    req.headers['x-real-ip'] ||
    '';

  const ip = rawIp.split(',')[0].trim() || '127.0.0.1';
  const body = typeof req.body === 'object' && req.body !== null ? req.body : {};
  const email = typeof body.email === 'string' ? body.email : '';
  const honeypot = typeof body.honeypot === 'string' ? body.honeypot : '';

  if (honeypot) {
    return sendJson(res, 200, { success: true, message: successMessage });
  }

  if (!email) {
    return sendJson(res, 400, { success: false, error: 'Email is required' });
  }

  const trimmedEmail = email.trim().toLowerCase();

  if (trimmedEmail.length < 3 || trimmedEmail.length > 254) {
    return sendJson(res, 400, { success: false, error: 'Invalid email address' });
  }

  // Simpler, practical regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return sendJson(res, 400, { success: false, error: 'Invalid email address' });
  }

  // Basic disposable blocking (lightweight)
  const disposableDomains = [
    'tempmail.com',
    'guerrillamail.com',
    '10minutemail.com',
    'mailinator.com',
  ];

  const domain = trimmedEmail.split('@')[1];
  if (disposableDomains.includes(domain)) {
    return sendJson(res, 400, { success: false, error: 'Disposable email not allowed' });
  }

  // -----------------------------
  // Rate limiting
  // -----------------------------
  try {
    // ✅ Email-based (primary)
    const emailResult = await emailRateLimit.limit(`email:${trimmedEmail}`);

    if (!emailResult.success) {
      const retryAfter = Math.ceil((emailResult.reset - Date.now()) / 1000);

      res.setHeader('Retry-After', retryAfter.toString());

      return sendJson(res, 429, {
        success: false,
        error: 'Too many submissions for this email. Try again later.',
        retryAfter,
      });
    }

    // ✅ IP-based (secondary)
    const ipResult = await ipRateLimit.limit(`ip:${ip}`);

    if (!ipResult.success) {
      const retryAfter = Math.ceil((ipResult.reset - Date.now()) / 1000);

      res.setHeader('Retry-After', retryAfter.toString());

      return sendJson(res, 429, {
        success: false,
        error: 'Too many requests from your network. Try again later.',
        retryAfter,
      });
    }

    // Optional headers (debug/visibility)
    res.setHeader('X-RateLimit-Remaining-IP', ipResult.remaining.toString());
    res.setHeader('X-RateLimit-Remaining-Email', emailResult.remaining.toString());

  } catch (err) {
    console.error('[RATE_LIMIT_ERROR]', err);
    // ✅ fail-open (better UX for landing page)
  }

  // -----------------------------
  // Resend API call
  // -----------------------------
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

    const data = await readJson(response);

    if (response.ok) {
      return sendJson(res, 200, { success: true, message: successMessage });
    }

    if (response.status === 400 && typeof data.message === 'string' && data.message.includes('already exists')) {
      return sendJson(res, 200, { success: true, message: successMessage });
    }

    if (response.status === 401) {
      console.error('[ERROR] Resend auth failed');
      return sendJson(res, 500, { success: false, error: 'Service configuration error' });
    }

    console.error('[ERROR] Resend error:', data);
    return sendJson(res, 500, { success: false, error: 'Unable to process request' });

  } catch (err) {
    console.error('[ERROR] Resend network error:', err instanceof Error ? err.message : err);
    return sendJson(res, 500, {
      success: false,
      error: 'Service temporarily unavailable. Try again later.',
    });
  } finally {
    clearTimeout(timeout);
  }
}
