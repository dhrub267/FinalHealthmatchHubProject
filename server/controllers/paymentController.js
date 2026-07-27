const Appointment = require("../models/Appointment");
const Payment = require("../models/Payment");

// ================= Create Payment =================
const createPayment = async (req, res) => {
  try {
    const { appointment, amount } = req.body;

    const transactionId = "TXN" + Date.now();

    const payment = await Payment.create({
      user: req.user._id,
      appointment,
      amount,
      transactionId,
      paymentMethod: "PhonePe QR",
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Payment Submitted Successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= My Payments =================
const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      user: req.user._id,
    })
      .populate("appointment")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Admin All Payments =================
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user", "name email")
      .populate("appointment")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Verify Payment =================
const verifyPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment Not Found",
      });
    }

    // payment.status = "Paid";

    // await payment.save();
    payment.status = "Paid";
    await payment.save();

const appointment = await Appointment.findById(payment.appointment);

if (appointment) {
  appointment.paymentStatus = "Paid";
  appointment.status = "Confirmed";
  await appointment.save();
}

    res.status(200).json({
      success: true,
      message: "Payment Verified Successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPayment,
  getMyPayments,
  getAllPayments,
  verifyPayment,
};