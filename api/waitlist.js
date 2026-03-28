export default async function handler(req, res) {
  const allowedOrigins = ['https://turnkit.dev', 'https://www.turnkit.dev'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Content-Type validation
  if (!req.headers['content-type']?.includes('application/json')) {
    return res.status(415).json({ error: 'Content-Type must be application/json' });
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_AUDIENCE_ID) {
    console.error('Missing required environment variables');
    return res.status(500).json({ error: 'Service temporarily unavailable' });
  }

  const { email } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || email.length > 254 || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    const response = await fetch('https://api.resend.com/audiences/' + 
      process.env.RESEND_AUDIENCE_ID + '/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        unsubscribed: false
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Contact added successfully');
      return res.status(200).json({ success: true });
    } else {
      console.error('Resend API error:', response.status, data.message);
      return res.status(500).json({ error: 'Unable to process request' });
    }
  } catch (err) {
    console.error('Waitlist submission error:', err.message);
    return res.status(500).json({ error: 'Service temporarily unavailable' });
  }
}
