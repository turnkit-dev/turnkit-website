import { NextResponse, type NextRequest } from 'next/server';

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

    if (!name) {
      return NextResponse.json({ success: false, error: 'Name is required.' }, { status: 400 });
    }
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (!details) {
      return NextResponse.json({ success: false, error: 'Please describe what you need.' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ success: false, error: 'Support email is not configured yet.' }, { status: 500 });
    }

    const context = body.context ?? {};
    const requestTypeLabel = intent === 'downgrade' ? 'downgrade' : 'custom plan';
    const subject = `TurnKit ${requestTypeLabel} request from ${name}`;
    const supportToEmail = process.env.SUPPORT_TO_EMAIL?.trim() || defaultSupportToEmail;
    const text = [
      `Request Type: ${requestTypeLabel}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Game ID: ${context.gameId ?? '-'}`,
      `Current CCU: ${context.currentCcu ?? '-'}`,
      `Current Modules: ${context.currentModules ?? '-'}`,
      '',
      'Message:',
      details,
    ].join('\n');

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
    });

    if (!response.ok) {
      const raw = await response.text();
      return NextResponse.json({ success: false, error: raw || 'Failed to send support request.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Thanks. We will get back to you soon.' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Failed to send support request.' }, { status: 500 });
  }
}
