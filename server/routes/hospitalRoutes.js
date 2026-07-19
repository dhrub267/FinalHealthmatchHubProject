const express = require("express");
const router = express.Router();

const {
  addHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitalController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Admin Only
router.post("/", protect, authorizeRoles("admin"), addHospital);
router.put("/:id", protect, authorizeRoles("admin"), updateHospital);
router.delete("/:id", protect, authorizeRoles("admin"), deleteHospital);

// Public
router.get("/", getAllHospitals);
router.get("/:id", getHospitalById);

module.exports = router;