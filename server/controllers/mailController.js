const transporter = require("../config/mailConfig");

exports.sendMail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const mailOptions = {
      from: `"${name}" <${process.env.FROM_EMAIL || 'noreply@yourdomain.com'}>`,
      to: process.env.TO_EMAIL || 'anuperumal153@gmail.com',
      replyTo: email,
      subject: `Portfolio: ${subject}`,
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p style="white-space: pre-line;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).json({ success: true, message: 'Email sent!' });
  } catch (error) {
    console.error('SendMail error:', error.message, error.code, error.responseCode);
    res.status(500).json({ success: false, error: error.message });
  }
};