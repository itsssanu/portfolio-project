const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransporter({
  host: "smtp.resend.com",
  port: 465,
  secure: true,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,  // Change from EMAIL_PASS
  },
});

module.exports = transporter;