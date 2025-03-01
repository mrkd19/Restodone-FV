const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Reservation = require("../models/Reservation");
const Restaurant = require("../models/Restaurant");
const Settings = require("../models/Settings");
const LoginEvent = require("../models/LoginEvent"); // ✅ Import LoginEvent Model
const BookingRequest = require("../models/BookingRequest"); // ✅ Import BookingRequest Model
const bcrypt = require("bcrypt");
const { authenticateToken, authorizeAdmin } = require("../middlewares/authMiddleware");
const sendEmail = require('../utils/email'); // ✅ Import sendEmail utility

// Admin-only route to fetch all users
router.get("/users", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

// Fetch Admin Dashboard Statistics
router.get("/dashboard", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const totalReservations = await Reservation.countDocuments();

    const reservations = await Reservation.find();
    const totalRevenue = reservations.reduce((sum, r) => sum + (r.totalPrice || 0), 0);

    res.json({
      totalUsers: Number(totalUsers), // ✅ Ensure numeric values
      activeUsers: Number(activeUsers),
      totalReservations: Number(totalReservations),
      totalRevenue: Number(totalRevenue),
    });

    req.app.get("io").emit("activeUsersUpdated", activeUsers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard statistics", error: error.message });
  }
});

// Fetch All Reservations (Admin Only)
router.get("/reservations", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("user", "username").select("-__v");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations", error: error.message });
  }
});

// ✅ Fetch Login Events
router.get("/login-events", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const events = await LoginEvent.find()
      .populate("user", "username email")
      .sort({ timestamp: -1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching login events", error: error.message });
  }
});

// Update Reservation Status
router.patch("/reservations/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updatedReservation);
  } catch (error) {
    res.status(500).json({ message: "Error updating reservation", error: error.message });
  }
});

// Delete Reservation
router.delete("/reservations/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting reservation", error: error.message });
  }
});

// ✅ Update User Role
router.patch("/users/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    if (!["admin", "manager", "user"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-password");
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User role updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user role", error: error.message });
  }
});

// ✅ Delete User
router.delete("/users/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
});

// ✅ Add New User
router.post("/users", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { username, email, password, phone, role } = req.body;
    if (!username || !email || !password || !phone || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, phone, role });

    await newUser.save();
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error: error.message });
  }
});

// ✅ Fetch All Restaurants
router.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurants", error: error.message });
  }
});

// ✅ Add New Restaurant
router.post("/restaurants", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    await newRestaurant.save();
    res.status(201).json({ message: "Restaurant added successfully", restaurant: newRestaurant });
  } catch (error) {
    res.status(500).json({ message: "Error adding restaurant", error: error.message });
  }
});

// ✅ Update Restaurant
router.put("/restaurants/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json({ message: "Restaurant updated successfully", restaurant: updatedRestaurant });
  } catch (error) {
    res.status(500).json({ message: "Error updating restaurant", error: error.message });
  }
});

// ✅ Delete Restaurant
router.delete("/restaurants/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting restaurant", error: error.message });
  }
});

// ✅ Fetch Admin Settings
router.get("/settings", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      // ✅ If no settings exist, create default settings
      settings = new Settings();
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching settings", error: error.message });
  }
});

// ✅ Update Admin Settings
router.patch("/settings", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      return res.status(404).json({ message: "Settings not found" });
    }

    Object.assign(settings, req.body); // ✅ Merge updated settings
    await settings.save();

    res.json({ message: "Settings updated successfully", settings });
  } catch (error) {
    res.status(500).json({ message: "Error updating settings", error: error.message });
  }
});

// ✅ 1️⃣ Fetch All Reservation Requests
router.get("/reservation-requests", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const requests = await BookingRequest.find().sort({ createdAt: -1 }); // Show latest requests first
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservation requests", error: error.message });
  }
});

// ✅ 2️⃣ Approve or Reject a Reservation Request
router.patch("/reservation-requests/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedRequest = await BookingRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Reservation request not found" });
    }

    res.json({ message: `Reservation ${status.toLowerCase()} successfully`, updatedRequest });
  } catch (error) {
    res.status(500).json({ message: "Error updating reservation request", error: error.message });
  }
});

// ✅ 3️⃣ Send Admin Response or Offer
router.post("/reservation-requests/:id/reply", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { adminResponse, offerDetails } = req.body;

    // ✅ Find the reservation request
    const bookingRequest = await BookingRequest.findById(req.params.id);
    if (!bookingRequest) {
      return res.status(404).json({ message: "Reservation request not found" });
    }

    // ✅ Update admin response & offer details
    bookingRequest.adminResponse = adminResponse;
    bookingRequest.offerDetails = offerDetails;
    await bookingRequest.save();

    // ✅ Send email to the user
    const emailText = `Hello ${bookingRequest.name},\n\nAdmin Response: ${adminResponse}\nSpecial Offer: ${offerDetails}\n\nThank you!`;
    
    if (bookingRequest.email && bookingRequest.email !== "None") {
      await sendEmail(bookingRequest.email, "Your Booking Request Update", emailText);
    }

    res.json({ message: "Response sent successfully, email delivered!", updatedRequest: bookingRequest });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending response", error: error.message });
  }
});

// ✅ 4️⃣ Save a new Booking Request (Fixed Route)
router.post("/booking-requests", async (req, res) => {
  try {
    console.log("Received request data:", req.body); // ✅ Debugging

    // ✅ Validate only `name` and `phone`
    const { name, phone } = req.body;
    if (!name || !phone) {
      console.error("❌ Missing required fields:", req.body);
      return res.status(400).json({ message: "Name and phone number are required." });
    }

    // ✅ Automatically fill missing fields with "None"
    const newRequest = new BookingRequest({
      location: req.body.location || "None",
      time: req.body.time || "None",
      guests: req.body.guests || 1, // ✅ Defaults to 1 guest if missing
      name,
      email: req.body.email || "None",
      phone,
      date: req.body.date || "None",
      specialRequests: req.body.specialRequests || "None",
      occasion: req.body.occasion || "None",
      purpose: req.body.purpose || "None", // ✅ Auto-fill if missing
      user: req.body.user || null, // ✅ Auto-fill if missing
    });

    await newRequest.save();
    console.log("✅ Booking request saved successfully!", newRequest);

    res.status(201).json({ message: "Booking request saved!", request: newRequest });
  } catch (error) {
    console.error("❌ Error saving booking request:", error.message);
    res.status(500).json({ message: "Error saving booking request", error: error.message });
  }
});

module.exports = router;