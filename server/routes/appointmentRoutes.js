const express = require("express");
const router = express.Router();

const {
  bookAppointment,
  getAllAppointments,
  getMyAppointments,
  updateAppointmentStatus,
  cancelAppointment,
} = require("../controllers/appointmentController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ================= Patient =================

// Book Appointment
router.post(
  "/",
  protect,
  authorizeRoles("patient"),
  bookAppointment
);

// My Appointments
router.get(
  "/my",
  protect,
  authorizeRoles("patient"),
  getMyAppointments
);

// ================= Admin =================

// Get All Appointments
router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getAllAppointments
);

// Update Status
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateAppointmentStatus
);

// Cancel Appointment
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  cancelAppointment
);

module.exports = router;