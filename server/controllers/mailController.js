const transporter = require("../config/mailConfig");

exports.sendMail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate all fields present
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: "All fields are required.",
    });
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: "Invalid email address.",
    });
  }

  try {
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,  // ← fixed: sender must be YOUR email, not the visitor's
      to: process.env.EMAIL_USER,
      replyTo: email,                                           // ← visitor's email goes here so you can reply to them
      subject: `Portfolio: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #0f172a; margin-top: 0;">New Contact Form Message</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 80px;"><strong>Name</strong></td>
              <td style="padding: 8px 0; color: #0f172a;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;"><strong>Email</strong></td>
              <td style="padding: 8px 0;">
                <a href="mailto:${email}" style="color: #14b8a6;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;"><strong>Subject</strong></td>
              <td style="padding: 8px 0; color: #0f172a;">${subject}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <p style="color: #64748b; margin-bottom: 6px;"><strong>Message</strong></p>
          <p style="color: #0f172a; white-space: pre-line; line-height: 1.7;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });

  } catch (error) {
    console.error("Mail error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to send email. Please try again later.",
    });
  }
};