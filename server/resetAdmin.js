const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

async function resetAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = await User.findOneAndUpdate(
      { email: "admin@example.com" },
      {
        password: hashedPassword,
        role: "admin",
      },
      { new: true }
    );

    if (!admin) {
      console.log("Admin not found.");
    } else {
      console.log("✅ Admin password reset successfully.");
      console.log("Email: admin@example.com");
      console.log("Password: 123456");
    }

    mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
}

resetAdmin();