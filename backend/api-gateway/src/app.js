const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

app.use(
    "/api/auth",
    createProxyMiddleware({
        target: "http://localhost:3001",
        changeOrigin: true,
    })
);

app.get("/", (req, res) => {
    res.json({
        message: "API Gateway is running!"
    });
});

module.exports = app;