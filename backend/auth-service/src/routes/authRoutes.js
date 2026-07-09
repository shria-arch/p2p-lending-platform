const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

const authenticateUser = require("../middleware/authMiddleware");

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Route
router.get("/profile", authenticateUser, (req, res) => {
    return res.status(200).json({
        message: "Protected route accessed successfully.",
        user: req.user
    });
});

module.exports = router;