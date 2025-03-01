const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// Authenticate Token Middleware
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }
    req.user = decoded; // Attach user data to request
    next();
  });
};

// New Middleware: Allow Only Admins
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

// Logout User Middleware
const logoutUser = async (req, res) => {
  try {
    if (req.user) {
      await User.findByIdAndUpdate(req.user.id, { isActive: false });
      req.app.get('io').emit("activeUsersUpdated", await User.countDocuments({ isActive: true }));
    }
    res.status(200).json({ message: "User logged out successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error logging out.", error: error.message });
  }
};

module.exports = { authenticateToken, authorizeAdmin, logoutUser };
