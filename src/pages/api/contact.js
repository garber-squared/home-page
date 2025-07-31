// api/contact.js
import nodemailer from 'nodemailer';

console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL);
console.log('CONTACT_PASS:', process.env.CONTACT_PASS);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your SMTP provider
    auth: {
      user: process.env.CONTACT_EMAIL,
      pass: process.env.CONTACT_PASS,
    },
  });

  await transporter.sendMail({
    from: email,
    to: process.env.CONTACT_EMAIL,
    subject: `New message from ${name}`,
    text: message,
  });

  res.status(200).json({ success: true });
}
