const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  autoApproval: { type: Boolean, default: false },
  darkMode: { type: Boolean, default: false },
  maxReservationsPerUser: { type: Number, default: 1 },
  emailNotifications: { type: Boolean, default: false },
  pushNotifications: { type: Boolean, default: false },
  notificationEvents: {
    newReservations: { type: Boolean, default: false },
    cancellations: { type: Boolean, default: false },
    userRegistrations: { type: Boolean, default: false },
    reservationUpdates: { type: Boolean, default: false },
    adminAlerts: { type: Boolean, default: false }
  },
  language: { type: String, default: "en" },
  primaryColor: { type: String, default: "#007bff" },
  fontStyle: { type: String, default: "Sans-serif" },
  passwordPolicy: {
    minLength: { type: Number, default: 8 },
    requireUppercase: { type: Boolean, default: true },
    requireNumbers: { type: Boolean, default: true },
    requireSpecialChars: { type: Boolean, default: false },
    expirationDays: { type: Number, default: 90 },
    disableExpiration: { type: Boolean, default: false }
  }
});

module.exports = mongoose.model("Settings", settingsSchema);
