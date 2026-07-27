const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  // Check Authorization Header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("========== JWT DECODED ==========");
      console.log(decoded);

      // Save decoded data in req.user
      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "No Token Provided",
    });
  }
};

module.exports = protect;