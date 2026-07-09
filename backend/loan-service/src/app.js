const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const loanRoutes = require("./routes/loanRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Loan Routes
app.use("/api/loans", loanRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Loan Service is running!"
    });
});

module.exports = app;