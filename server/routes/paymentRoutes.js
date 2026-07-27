// import express from "express";

// import {
//   createPayment,
//   getMyPayments,
//   getAllPayments,
//   verifyPayment,
// } from "../controllers/paymentController.js";

// import { protect } from "../middleware/authMiddleware.js";
// import { adminOnly } from "../middleware/roleMiddleware.js";

// const router = express.Router();

// // User
// router.post("/create", protect, createPayment);
// router.get("/my", protect, getMyPayments);

// // Admin
// router.get("/all", protect, adminOnly, getAllPayments);
// router.put("/verify/:id", protect, adminOnly, verifyPayment);

// export default router;


const express = require("express");

const {
  createPayment,
  getMyPayments,
  getAllPayments,
  verifyPayment,
} = require("../controllers/paymentController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// ================= User Routes =================

// Create Payment
router.post("/create", protect, createPayment);

// My Payment History
router.get("/my", protect, getMyPayments);

// ================= Admin Routes =================

// Get All Payments
router.get("/all", protect, authorizeRoles("admin"), getAllPayments);

// Verify Payment
router.put(
  "/verify/:id",
  protect,
  authorizeRoles("admin"),
  verifyPayment
);

module.exports = router;