const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// OTP Imports
const Otp = require("../models/Otp");
const sendOTP = require("../utils/sendOTP");
const otpGenerator = require("otp-generator");

// ================= Register User =================
const registerUser = async (req, res) => {
  try {
    console.log("\n========== REGISTER API CALLED ==========");
    console.log("Request Body:", req.body);

    const { fullName, email, password, role } = req.body;

    // Check if user already exists
    console.log("1. Checking existing user...");
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    console.log("2. Existing user check completed");

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });

    console.log("3. OTP Generated:", otp);

    // Delete old OTP
    await Otp.deleteMany({ email });
    console.log("4. Old OTP deleted");

    // Save OTP
    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    console.log("5. OTP Saved in Database");

    // Send OTP Email
    console.log("6. Calling sendOTP...");
    await sendOTP(email, otp);

    console.log("7. OTP Email Sent Successfully");

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully. Please verify your email.",
    });

  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Login User =================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate JWT
    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ================= Verify OTP =================
const verifyOTP = async (req, res) => {
  try {
    const { fullName, email, password, role, otp } = req.body;

    // Check OTP
    const otpRecord = await Otp.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Check OTP Expiry
    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteMany({ email });

      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,

      // Never allow frontend to create admin
      role: role === "doctor" ? "doctor" : "patient",
    });

    // Delete OTP after successful verification
    await Otp.deleteMany({ email });

    // Generate Token
    const token = generateToken(user);

    const { password: _, ...userData } = user._doc;

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      token,
      user: userData,
    });

  } catch (error) {
    console.error("Verify OTP Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Export Controllers =================
module.exports = {
  registerUser,
  verifyOTP,
  loginUser,
};