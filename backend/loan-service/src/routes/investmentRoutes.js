const express = require("express");

const {
  investInLoan,
} = require("../controllers/investmentController");

const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// Invest in a loan
router.post("/:id", authenticate, investInLoan);

module.exports = router;