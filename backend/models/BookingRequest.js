const mongoose = require("mongoose");

const bookingRequestSchema = new mongoose.Schema({
  location: { type: String, default: "None" }, // ✅ Auto-fill if missing
  purpose: { type: String, default: "None" }, // ❌ No longer required
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // ❌ No longer required
  date: { type: String, default: "None" },
  time: { type: String, default: "None" },
  guests: { type: Number, default: 1 }, // ✅ Default at least 1 guest
  name: { type: String, required: true }, // ✅ Mandatory
  email: { type: String, default: "None" },
  phone: { type: String, required: true }, // ✅ Mandatory
  specialRequests: { type: String, default: "None" },
  occasion: { type: String, default: "None" },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  adminResponse: { type: String, default: "" },
  offerDetails: { type: String, default: "" }, // ✅ Admin can add manually
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BookingRequest", bookingRequestSchema);
