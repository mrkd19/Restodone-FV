const mongoose = require('mongoose');
const express = require('express');
const Reservation = require('../models/Reservation');
const User = require('../models/User'); // ✅ Import User model
const { authenticateToken } = require('../middlewares/authMiddleware');
const sendEmail = require('../utils/email'); // Import sendEmail utility

const router = express.Router();

// ✅ Save a new reservation (POST /api/reservations)
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { restaurantId, restaurantName, restaurantImage, date, time, guests, parkingSlots, selectedDishes } = req.body;

    if (!restaurantId || !restaurantName || !restaurantImage || !date || !time || !guests || !selectedDishes) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findById(req.user.id); // ✅ Fetch user from the database
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newReservation = new Reservation({
      user: user.id, // Store user ID
      restaurantId: restaurantId.toString(), // ✅ Store as a string
      restaurantName,
      restaurantImage,
      date,
      time,
      guests,
      parkingSlots: parkingSlots || 0, // ✅ Default to 0 if not provided
      selectedDishes,
    });

    await newReservation.save();

    // ✅ Send confirmation email to the user
    const emailText = `
Hello ${user.username},

Your reservation at **${restaurantName}** is confirmed.

📍 **Location**: ${restaurantName}
🗓️ **Date**: ${date}
⏰ **Time**: ${time}
👥 **Guests**: ${guests}

Thank you for choosing us! 🎉
`;

    if (user.email) {
      await sendEmail(user.email, "Your Reservation is Confirmed!", emailText);
    }

    res.status(201).json({ message: "Reservation successful", reservation: newReservation });
  } catch (error) {
    console.error("Reservation save error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Fetch user's reservations (GET /api/reservations)
router.get("/", authenticateToken, async (req, res) => {
  try {
    console.log("Fetching reservations for user ID:", req.user.id); // Debugging

    const reservations = await Reservation.find({ user: req.user.id });

    if (!reservations.length) {
      return res.status(404).json({ message: "No reservations found for this user." });
    }

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations", error: error.message });
  }
});

// ✅ Delete a reservation (DELETE /api/reservations/:id)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const reservation = await Reservation.findOne({ _id: req.params.id, user: req.user.id });

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    const currentTime = new Date();
    const reservationTime = new Date(`${reservation.date} ${reservation.time}`);
    const timeDiff = (reservationTime - currentTime) / (1000 * 60 * 60); // Convert milliseconds to hours

    let refundAmount = 0;
    if (timeDiff > 2) {
      refundAmount = 100; // ✅ Full refund
    } else if (timeDiff > 1) {
      refundAmount = 50; // ✅ 50% refund
    }

    await Reservation.deleteOne({ _id: req.params.id });

    res.json({ message: "Reservation cancelled", refund: refundAmount });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling reservation", error: error.message });
  }
});

module.exports = router;