const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,   // your full Gmail address
    pass: process.env.EMAIL_PASS,   // NOT your Gmail password — see below
  },
});

module.exports = transporter;