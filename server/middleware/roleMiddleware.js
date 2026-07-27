const authorizeRoles = (...roles) => {
  return (req, res, next) => {

    console.log("========== ROLE CHECK ==========");
    console.log("User Role :", req.user.role);
    console.log("Allowed Roles :", roles);

    // Check if user's role is allowed
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access Denied. You are not authorized.",
      });
    }

    next();
  };
};

module.exports = authorizeRoles;