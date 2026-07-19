const Appointment = require("../models/Appointment");

// ================= Book Appointment =================
const bookAppointment = async (req, res) => {
  try {
    const {
      doctor,
      hospital,
      appointmentDate,
      appointmentTime,
      reason,
    } = req.body;

    // Duplicate Booking Check
    const existingAppointment = await Appointment.findOne({
      doctor,
      appointmentDate,
      appointmentTime,
      status: { $ne: "Cancelled" },
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: "This time slot is already booked.",
      });
    }

    // Create Appointment
    const appointment = await Appointment.create({
      patient: req.user.id,
      doctor,
      hospital,
      appointmentDate,
      appointmentTime,
      reason,
    });

    res.status(201).json({
      success: true,
      message: "Appointment Booked Successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Get All Appointments =================
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "fullName email")
      .populate("doctor", "fullName specialization")
      .populate("hospital", "name city");

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Get My Appointments =================
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user.id,
    })
      .populate("doctor", "fullName specialization")
      .populate("hospital", "name city");

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Update Appointment Status =================
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Allowed Status
    const allowedStatus = [
      "Pending",
      "Confirmed",
      "Completed",
      "Cancelled",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Appointment Status",
      });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    appointment.status = status;

    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment Status Updated Successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ================= Cancel Appointment =================
// ================= Cancel Appointment =================
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    appointment.status = "Cancelled";

    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment Cancelled Successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  bookAppointment,
  getAllAppointments,
  getMyAppointments,
  updateAppointmentStatus,
  cancelAppointment,
};