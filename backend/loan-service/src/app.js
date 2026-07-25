require("dotenv").config();

const express = require("express");
const cors = require("cors");

const loanRoutes = require("./routes/loanRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Loan Routes
app.use("/api/loans", loanRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Loan Service is running!",
  });
});

module.exports = app;