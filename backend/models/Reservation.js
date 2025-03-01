const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  restaurantId: { type: String, required: true },
  restaurantName: { type: String, required: true },
  restaurantImage: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  parkingSlots: { type: Number, required: true },
  selectedDishes: { type: [String], required: true }, // Add selectedDishes field
  bookedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" },
});

module.exports = mongoose.model("Reservation", reservationSchema);
