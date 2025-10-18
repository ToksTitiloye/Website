// File path for Vercel: /api/contact.js
// Sends form submissions to your email using Resend (https://resend.com)
// 1) npm i resend
// 2) In Vercel dashboard, set env vars: RESEND_API_KEY, TO_EMAIL, FROM_EMAIL (e.g. "Toks Coaching <no-reply@yourdomain.com>")
// 3) Deploy. The front-end posts to /api/contact.

import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, email, game, rank, message } = req.body || {};
    if (!name || !email || !game || !rank || !message) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const html = `
      <div style="font-family:system-ui,Segoe UI,Roboto,Arial">
        <h2>New Coaching Enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Game:</strong> ${escapeHtml(game)}</p>
        <p><strong>Rank:</strong> ${escapeHtml(rank)}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;background:#f6f7f9;padding:12px;border-radius:8px">${escapeHtml(message)}</pre>
      </div>
    `;

    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      reply_to: email,
      subject: 'New Coaching Enquiry',
      html,
    });

    return res.status(200).json({ message: 'Message sent! Check your inbox.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to send message.' });
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
