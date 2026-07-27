const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// NEW IMPORTS
const Otp = require("../models/Otp");
const sendOTP = require("../utils/sendOTP");
const otpGenerator = require("otp-generator");


// ================= Register User =================
// ================= Register User =================
const registerUser = async (req, res) => {
  try {
    console.log("===== REGISTER API CALLED =====");
    console.log(req.body);

    const { fullName, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });

    console.log("Generated OTP:", otp);

    // Delete old OTP
    await Otp.deleteMany({ email });

    // Save new OTP
    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    console.log("OTP Saved in Database");

    // Send OTP Email
    try {
      await sendOTP(email, otp);
      console.log("OTP Email Sent Successfully");
    } catch (mailError) {
      console.error("Email Error:", mailError);

      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email",
      });
    }

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

    // Generate JWT Token
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

    // Find OTP
    const otpRecord = await Otp.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Check Expiry
    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteMany({ email });

      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    // Check user already exists
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

    // Delete OTP
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  registerUser,
  verifyOTP,
  loginUser,
};