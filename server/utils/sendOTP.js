const nodemailer = require("nodemailer");

const sendOTP = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"HealthMatch Hub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "HealthMatch Hub - Email Verification OTP",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Email Verification</h2>
          <p>Your OTP for HealthMatch Hub is:</p>

          <h1 style="color:#0d6efd;">${otp}</h1>

          <p>This OTP is valid for 5 minutes.</p>

          <p>Please do not share it with anyone.</p>

          <br>

          <b>HealthMatch Hub Team</b>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ OTP Email Sent Successfully");
  } catch (error) {
    console.log("❌ Email Error:", error.message);
    throw error;
  }
};

module.exports = sendOTP;