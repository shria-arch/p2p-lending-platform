const express = require("express");

const {
    createLoan,
    getAllLoans
} = require("../controllers/loanController");

const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, createLoan);

router.get("/", authenticate, getAllLoans);

module.exports = router;