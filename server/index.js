const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mailRoutes = require("./routes/mailRoutes");

const app = express();

app.use(cors({
  origin: "*", // allow all (for now)
}));
app.use(express.json());

app.use("/api", mailRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});