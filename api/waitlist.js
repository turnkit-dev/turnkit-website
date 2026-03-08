import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    await resend.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: '457b6dd6-695e-40ae-b43f-512efa17d251', 
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Waitlist Error:', err);
    return res.status(500).json({ error: 'Failed to join waitlist' });
  }
}
