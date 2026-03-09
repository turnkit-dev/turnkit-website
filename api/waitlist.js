export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    const response = await fetch('https://api.resend.com/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();
    console.log('Resend response:', response.status, JSON.stringify(data));

    if (response.ok) {
      return res.status(200).json({ ok: true });
    } else {
      return res.status(500).json({ error: data });
    }
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed' });
  }
}
