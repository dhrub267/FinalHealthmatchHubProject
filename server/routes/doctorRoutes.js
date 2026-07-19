const express = require("express");
const router = express.Router();

const {
  addDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ================= Admin Only =================

// Add Doctor
router.post("/", protect, authorizeRoles("admin"), addDoctor);

// Update Doctor
router.put("/:id", protect, authorizeRoles("admin"), updateDoctor);

// Delete Doctor
router.delete("/:id", protect, authorizeRoles("admin"), deleteDoctor);

// ================= Public / Logged-in =================

// Get All Doctors
router.get("/", getAllDoctors);

// Get Doctor By ID
router.get("/:id", getDoctorById);

module.exports = router;