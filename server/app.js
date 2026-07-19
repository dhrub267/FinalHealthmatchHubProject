const appointmentRoutes = require("./routes/appointmentRoutes");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");

const protect = require("./middleware/authMiddleware");
const authorizeRoles = require("./middleware/roleMiddleware");

const app = express();

// ================= Middleware =================
app.use(cors());
app.use(express.json());

// ================= API Routes =================
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/appointments", appointmentRoutes);
// ================= Home Route =================
app.get("/", (req, res) => {
  res.send("HealthMatch Hub API is Running 🚀");
});

// ================= Protected Route =================
app.get("/api/profile", protect, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Protected Route",
    user: req.user,
  });
});

// ================= Admin Route =================
app.get("/api/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
    user: req.user,
  });
});

// ================= Doctor Route =================
app.get("/api/doctor", protect, authorizeRoles("doctor"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome Doctor",
    user: req.user,
  });
});

// ================= Patient Route =================
app.get("/api/patient", protect, authorizeRoles("patient"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome Patient",
    user: req.user,
  });
});

module.exports = app;