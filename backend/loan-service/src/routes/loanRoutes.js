const express = require("express");

const {
  createLoan,
  getAllLoans,
} = require("../controllers/loanController");

const authenticate = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

// Create Loan (with document upload)
router.post(
  "/",
  authenticate,
  upload.single("document"),
  createLoan
);

// Get All Loans
router.get("/", authenticate, getAllLoans);

module.exports = router;