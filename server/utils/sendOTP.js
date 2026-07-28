// // const nodemailer = require("nodemailer");

// // const transporter = nodemailer.createTransport({
// //   host: process.env.EMAIL_HOST,
// //   port: Number(process.env.EMAIL_PORT),
// //   secure: false,
// //   auth: {
// //     user: process.env.EMAIL_USER,
// //     pass: process.env.EMAIL_PASS,
// //   },
// // });

// // transporter.verify((error, success) => {
// //   if (error) {
// //     console.error("SMTP Verify Error:");
// //     console.error(error);
// //   } else {
// //     console.log("✅ SMTP Connected Successfully");
// //   }
// // });

// // const sendOTP = async (email, otp) => {
// //   try {
// //     console.log("Sending OTP to:", email);

// //     const info = await transporter.sendMail({
// //       from: `"HealthMatch Hub" <${process.env.EMAIL_FROM}>`,
// //       to: email,
// //       subject: "HealthMatch Hub - Email Verification OTP",
// //       html: `
// //         <h2>Email Verification</h2>
// //         <p>Your OTP is:</p>
// //         <h1>${otp}</h1>
// //         <p>Valid for 5 minutes.</p>
// //       `,
// //     });

// //     console.log("✅ Email Sent");
// //     console.log(info.messageId);
// //   } catch (err) {
// //     console.log("❌ Email Error");
// //     console.log(err);
// //     throw err;
// //   }
// // };

// // module.exports = sendOTP;

// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: Number(process.env.EMAIL_PORT),
//   secure: false,          // Port 587
//   requireTLS: true,
//   connectionTimeout: 30000,
//   greetingTimeout: 30000,
//   socketTimeout: 30000,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const sendOTP = async (email, otp) => {
//   try {
//     console.log("Sending OTP to:", email);

//     const info = await transporter.sendMail({
//       from: `"HealthMatch Hub" <${process.env.EMAIL_FROM}>`,
//       to: email,
//       subject: "HealthMatch Hub - Email Verification OTP",
//       html: `
//         <h2>Email Verification</h2>
//         <p>Your OTP is:</p>
//         <h1>${otp}</h1>
//         <p>Valid for 5 minutes.</p>
//       `,
//     });

//     console.log("✅ Email Sent");
//     console.log(info.messageId);
//   } catch (err) {
//     console.error("❌ Email Error");
//     console.error(err);
//     throw err;
//   }
// };

// module.exports = sendOTP;

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),

  secure: false,
  requireTLS: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

const sendOTP = async (email, otp) => {
  try {
    console.log("==================================");
    console.log("Sending OTP to:", email);
    console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
    console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("==================================");

    const info = await transporter.sendMail({
      from: `"HealthMatch Hub" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "HealthMatch Hub - Email Verification OTP",
      html: `
        <h2>Email Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>Valid for 5 minutes.</p>
      `,
    });

    console.log("✅ Email Sent Successfully");
    console.log(info.messageId);
  } catch (err) {
    console.error("❌ Email Error");
    console.error(err);
    throw err;
  }
};

module.exports = sendOTP;