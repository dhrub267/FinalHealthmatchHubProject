const Doctor = require("../models/Doctor");
const Hospital = require("../models/Hospital");

// ================= Add Doctor =================
const addDoctor = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      specialization,
      experience,
      qualification,
      hospital,
      consultationFee,
      available,
    } = req.body;

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor already exists",
      });
    }

    // Check Hospital Exists
    const hospitalExists = await Hospital.findById(hospital);

    if (!hospitalExists) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    // Create Doctor
    const doctor = await Doctor.create({
      fullName,
      email,
      phone,
      specialization,
      experience,
      qualification,
      hospital,
      consultationFee,
      available,
    });

    res.status(201).json({
      success: true,
      message: "Doctor Added Successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Get All Doctors =================
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate(
      "hospital",
      "name city address"
    );

    res.status(200).json({
      success: true,
      count: doctors.length,
      doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Get Doctor By ID =================
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate(
      "hospital",
      "name city address"
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Update Doctor =================
const updateDoctor = async (req, res) => {
  try {
    // If hospital is being updated, verify it exists
    if (req.body.hospital) {
      const hospitalExists = await Hospital.findById(req.body.hospital);

      if (!hospitalExists) {
        return res.status(404).json({
          success: false,
          message: "Hospital not found",
        });
      }
    }

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("hospital", "name city address");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor Updated Successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Delete Doctor =================
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};