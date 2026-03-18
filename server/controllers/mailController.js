const transporter = require("../config/mailConfig");

exports.sendMail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio: ${subject}`,
      html: `
      <div style="font-family: Arial; padding: 20px;">
        <p style="white-space: pre-line;">
          ${message}
        </p>

      </div>
    `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};