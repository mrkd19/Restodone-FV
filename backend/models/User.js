const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^[0-9]{10}$/, 'Phone number must be exactly 10 digits.'] 
  },
  restopoints: { type: Number, default: 0 },
  isPrime: { type: Boolean, default: false },
  primeExpiry: { type: Date },
  profilePicture: { type: String },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
  role: { type: String, enum: ["admin", "manager", "user"], default: "user" },
  lastLogin: { type: Date }
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  console.log("Hashing password in User.js:", this.password);
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Hash password before updating
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    update.password = await bcrypt.hash(update.password, 10);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
