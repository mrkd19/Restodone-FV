const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Get user profile data
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile data
router.put('/me', authenticateToken, async (req, res) => {
  try {
    const { username, email, phone } = req.body;

    // Ensure phone number is exactly 10 digits
    if (phone && !/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: 'Phone number must be exactly 10 digits.' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username, email, phone },
      { new: true }
    ).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;