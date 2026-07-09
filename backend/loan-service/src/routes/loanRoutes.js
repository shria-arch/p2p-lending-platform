const express = require("express");
const router = express.Router();

const {
    createLoan,
    getAllLoans
} = require("../controllers/loanController");

const {
    investInLoan
} = require("../controllers/investmentController");

const authenticateUser = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ---------------------------
// Borrower Routes
// ---------------------------

// Create Loan
router.post(
    "/",
    authenticateUser,
    authorizeRoles("Borrower"),
    createLoan
);

// View All Loans
router.get(
    "/",
    authenticateUser,
    getAllLoans
);

// ---------------------------
// Investor Route
// ---------------------------

// Invest in a Loan
router.post(
    "/:id/invest",
    authenticateUser,
    authorizeRoles("Investor"),
    investInLoan
);

module.exports = router;