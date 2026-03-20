const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// HTTP API - NO SMTP timeouts
const sendEmail = async (mailOptions) => {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: mailOptions.from,
      to: [mailOptions.to],
      reply_to: mailOptions.replyTo,
      subject: mailOptions.subject,
      html: mailOptions.html,
    }),
  });
  return response.json();
};

// Send mail endpoint
app.post("/api/send-mail", async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  try {
    const result = await sendEmail({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.TO_EMAIL || 'anuperumal153@gmail.com',
      replyTo: email,
      subject: `Portfolio: ${subject}`,
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>New Contact Form</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong><br>${message}</p>
        </div>
      `,
    });
    
    console.log('Resend response:', result);
    res.json({ success: true, message: 'Email sent!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health checks
app.get("/", (req, res) => {
  res.json({
    envLoaded: {
      resendKey: process.env.RESEND_API_KEY ? "✅" : "❌",
      fromEmail: process.env.FROM_EMAIL ? "✅" : "❌",
      toEmail: process.env.TO_EMAIL ? "✅" : "❌",
    },
    status: "Backend ready!"
  });
});

app.get("/api/test-smtp", (req, res) => {
  res.json({ api: "✅ HTTP API ready!", smtp: "Not used" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});