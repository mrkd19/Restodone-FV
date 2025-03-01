const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const LoginEvent = require('../models/LoginEvent'); // ✅ Import LoginEvent Model
require('dotenv').config();

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    const emailLower = email.toLowerCase();

    console.log("Before Saving: ", password); // ✅ Debugging

    const existingUser = await User.findOne({ email: emailLower });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // ✅ Do NOT hash the password manually (User.js will handle it)
    const user = new User({ username, email: emailLower, password, phone });
    await user.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login route - Includes Role in Response
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const emailLower = email.toLowerCase();

  try {
    const user = await User.findOne({ email: emailLower });

    if (!user) {
      console.log("User not found with email:", emailLower); // ✅ Debugging
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("User Found in Database:", user);
    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch); // ✅ Debugging

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // ✅ Store login event
    const userIp = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    await LoginEvent.create({ user: user._id, role: user.role, ip: userIp });

    // ✅ Auto-delete old records (keep latest 100)
    const totalLogins = await LoginEvent.countDocuments();
    if (totalLogins > 100) {
      await LoginEvent.findOneAndDelete({}, { sort: { timestamp: 1 } });
    }

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      username: user.username,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
