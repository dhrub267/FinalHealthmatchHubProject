const express = require("express");
const router = express.Router();

const {
  registerUser,
  verifyOTP,
  loginUser,
} = require("../controllers/authController");

// Register (Send OTP)
router.post("/register", registerUser);

// Verify OTP & Create Account
router.post("/verify-otp", verifyOTP);

// Login
router.post("/login", loginUser);

module.exports = router;