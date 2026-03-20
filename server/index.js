const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mailRoutes = require("./routes/mailRoutes");
const transporter = require("./config/mailConfig");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api", mailRoutes);

// Root health check
app.get("/", (req, res) => {
  res.json({
    envLoaded: {
      resendKey: process.env.RESEND_API_KEY ? "✅" : "❌",
      fromEmail: process.env.FROM_EMAIL ? "✅" : "❌",
      toEmail: process.env.TO_EMAIL ? "✅" : "❌",
    },
    message: "Backend ready!"
  });
});

// SMTP test endpoint
app.get("/api/test-smtp", async (req, res) => {
  try {
    await transporter.verify();
    res.json({ smtp: "✅ Connected!", message: "Ready to send emails." });
  } catch (error) {
    console.error('SMTP verify error:', error.message);
    res.status(500).json({ smtp: "❌ Failed", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});