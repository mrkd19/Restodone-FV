const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  restaurant_name: { type: String, required: true },
  location: { type: String, required: true },
  cuisine: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 }, // ✅ Ensure valid rating range (0-5)
  open_time: { type: String, required: true },
  close_time: { type: String, required: true },
  car_parking_slots: { type: Number, required: true, min: 0 }, // ✅ Prevent negative parking slots
  image_url: { type: String, required: true },
  price: { type: String, required: true },
  priceNum: { type: Number, required: true, min: 0 }, // ✅ Ensure price is non-negative
  discount: { type: String, default: "" }, // ✅ Make discount optional
  mood: { type: [String], required: true },
  menu: {
    starters: { type: [String], default: [] },
    mains: { type: [String], default: [] },
    specials: { type: [String], default: [] },
    desserts: { type: [String], default: [] },
    beverages: { type: [String], default: [] }
  },
  about: { type: String, required: true },
}, { timestamps: true }); // ✅ Automatically store createdAt and updatedAt

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;