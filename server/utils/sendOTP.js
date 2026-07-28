const axios = require("axios");

const sendOTP = async (email, otp) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "HealthMatch Hub",
          email: process.env.EMAIL_FROM,
        },
        to: [
          {
            email: email,
          },
        ],
        subject: "HealthMatch Hub - Email Verification OTP",
        htmlContent: `
          <h2>Email Verification</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
          <p>Valid for 5 minutes.</p>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log("✅ Email Sent Successfully");
    console.log(response.data);
  } catch (err) {
    console.error("❌ Email Error");

    if (err.response) {
      console.error(err.response.data);
    } else {
      console.error(err.message);
    }

    throw err;
  }
};

module.exports = sendOTP;