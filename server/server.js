const dotenv = require("dotenv");

const result = dotenv.config();

console.log(result);
console.log("MONGODB_URI =", process.env.MONGODB_URI);

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});