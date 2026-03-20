const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mailRoutes = require("./routes/mailRoutes");

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST"],
}));

app.use(express.json());

// Health check — keeps Render free tier awake (ping this with UptimeRobot)
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

app.get("/", (req, res) => res.send("🚀 Portfolio API is running..."));

app.use("/api", mailRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));