import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

// Initialize Vercel rate limiting
// 5 submissions per email per day
const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, '24 h'),
  prefix: 'turnkit_ratelimit',
});

export default async function handler(req, res) {
  // CORS protection
  const allowedOrigins = [
    'https://turnkit.dev',
    'https://www.turnkit.dev',
    // Add dev environment if needed
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null
  ].filter(Boolean);
  
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Content-Type validation
  const contentType = req.headers['content-type'];
  if (!contentType || !contentType.includes('application/json')) {
    return res.status(415).json({ error: 'Content-Type must be application/json' });
  }

  // Environment variable validation
  if (!process.env.RESEND_API_KEY) {
    console.error('[ERROR] Missing RESEND_API_KEY environment variable');
    return res.status(500).json({ error: 'Service temporarily unavailable' });
  }

  // Extract and validate email
  const { email, honeypot } = req.body;

  // Honeypot check (bot trap)
  if (honeypot) {
    console.log('[SECURITY] Honeypot triggered - bot detected');
    // Return success to fool bots
    return res.status(200).json({ success: true });
  }

  // Email validation
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }

  const trimmedEmail = email.trim().toLowerCase();

  // Length check (RFC 5321)
  if (trimmedEmail.length < 3 || trimmedEmail.length > 254) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Comprehensive email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(trimmedEmail)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Block common disposable email domains
  const disposableDomains = [
    'tempmail.com', 'throwaway.email', 'guerrillamail.com',
    '10minutemail.com', 'mailinator.com', 'trashmail.com'
  ];
  
  const domain = trimmedEmail.split('@')[1];
  if (disposableDomains.includes(domain)) {
    return res.status(400).json({ error: 'Disposable email addresses are not allowed' });
  }

  // Rate limiting using Vercel KV
  try {
    const identifier = `email:${trimmedEmail}`;
    const { success, limit, remaining, reset } = await ratelimit.limit(identifier);

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', limit.toString());
    res.setHeader('X-RateLimit-Remaining', remaining.toString());
    res.setHeader('X-RateLimit-Reset', reset.toString());

    if (!success) {
      console.log(`[RATE_LIMIT] Email ${trimmedEmail} exceeded rate limit`);
      return res.status(429).json({
        error: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil((reset - Date.now()) / 1000)
      });
    }
  } catch (rateLimitError) {
    // If rate limiting fails, log but continue (fail open)
    console.error('[ERROR] Rate limit check failed:', rateLimitError.message);
    // In production, you might want to fail closed instead
  }

  // IP-based rate limiting (additional layer)
  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
  
  try {
    const ipIdentifier = `ip:${ip}`;
    const ipRateLimit = new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(20, '1 h'), // 20 requests per hour per IP
      prefix: 'turnkit_waitlist_ip',
    });

    const { success: ipSuccess } = await ipRateLimit.limit(ipIdentifier);

    if (!ipSuccess) {
      console.log(`[RATE_LIMIT] IP ${ip} exceeded rate limit`);
      return res.status(429).json({
        error: 'Too many requests from your network. Please try again later.'
      });
    }
  } catch (ipRateLimitError) {
    console.error('[ERROR] IP rate limit check failed:', ipRateLimitError.message);
  }

  // Submit to Resend
  try {
    const response = await fetch(
      'https://api.resend.com/contacts',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: trimmedEmail,
          unsubscribed: false,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log(`[SUCCESS] Contact added: ${trimmedEmail.substring(0, 3)}***`);
      return res.status(200).json({ success: true });
    } 
    
    // Handle specific Resend errors
    if (response.status === 400 && data.message?.includes('already exists')) {
      console.log(`[INFO] Contact already exists: ${trimmedEmail.substring(0, 3)}***`);
      // Return success to avoid revealing if email is already subscribed
      return res.status(200).json({ success: true });
    }

    if (response.status === 401) {
      console.error('[ERROR] Resend API authentication failed - check API key');
      return res.status(500).json({ error: 'Service configuration error' });
    }

    if (response.status === 404) {
      console.error('[ERROR] Resend audience not found - check AUDIENCE_ID');
      return res.status(500).json({ error: 'Service configuration error' });
    }

    // Generic error for other failures
    console.error(`[ERROR] Resend API error: ${response.status} - ${data.message || 'Unknown error'}`);
    return res.status(500).json({ error: 'Unable to process request. Please try again later.' });

  } catch (fetchError) {
    console.error('[ERROR] Network error calling Resend API:', fetchError.message);
    return res.status(500).json({ error: 'Service temporarily unavailable. Please try again later.' });
  }
}

/*
// Edge runtime config for better performance
export const config = {
  runtime: 'edge',
};
*/