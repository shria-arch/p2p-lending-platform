const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const investmentRoutes = require("./routes/investmentRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Investment Routes
app.use("/api/investments", investmentRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Investment Service is running!",
  });
});

module.exports = app;