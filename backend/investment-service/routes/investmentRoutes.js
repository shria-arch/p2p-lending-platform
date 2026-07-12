const express = require("express");

const {
  createInvestment,
  getMyInvestments,
} = require("../controllers/investmentController");

const router = express.Router();

router.post("/", createInvestment);

router.get("/my-investments", getMyInvestments);

module.exports = router;