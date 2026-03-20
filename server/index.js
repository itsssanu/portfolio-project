const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mailRoutes = require("./routes/mailRoutes");

const app = express();

app.use(cors({
  origin: "*",
}));
app.use(express.json());

app.use("/api", mailRoutes);

app.get("/", (req, res) => {
  res.json({
    emailUser: process.env.EMAIL_USER ? "✅ loaded" : "❌ missing",
    emailPass: process.env.EMAIL_PASS ? "✅ loaded" : "❌ missing",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});