require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

console.log("AWS_BUCKET_NAME =", process.env.p2p-lending-shria-2026 );
console.log("AWS_REGION =", process.env.Europe (Stockholm) eu-north-1);

const loanRoutes = require("./routes/loanRoutes");


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