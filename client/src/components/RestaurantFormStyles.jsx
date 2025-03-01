import React, { useState } from "react";
import "../assets/css/RestaurantFormStyles.css";

const cuisineOptions = [
  "Italian", "Chinese", "Indian", "Japanese", "Mexican", "American", "French", "Thai", "Mediterranean", "Other"
];

const ambienceOptions = [
  "Fine Dining", "Romantic", "Family", "Casual", "Modern", "Traditional", "Outdoor", "Cozy", "Business", "Live Music"
];

export default function RestaurantForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState(initialData || {
    restaurant_name: "",
    location: "",
    cuisine: "",
    rating: "",
    price: "",
    open_time: "",
    close_time: "",
    car_parking_slots: "",
    image_url: "",
    discount: "",
    about: "",
    menu: {
      starters: [],
      mains: [],
      specials: [],
      desserts: [],
      beverages: []
    },
    mood: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmbienceChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      mood: prev.mood.includes(value)
        ? prev.mood.filter((item) => item !== value)
        : [...prev.mood, value],
    }));
  };

  const handleMenuChange = (section, index, value) => {
    setFormData((prev) => {
      const newMenu = { ...prev.menu };
      newMenu[section][index] = value;
      return { ...prev, menu: newMenu };
    });
  };

  const addMenuItem = (section) => {
    setFormData((prev) => {
      const newMenu = { ...prev.menu };
      newMenu[section].push("");
      return { ...prev, menu: newMenu };
    });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.restaurant_name) newErrors.restaurant_name = "Name is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.cuisine) newErrors.cuisine = "Please select a cuisine";
    if (!formData.rating) newErrors.rating = "Rating is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.open_time) newErrors.open_time = "Opening time required";
    if (!formData.close_time) newErrors.close_time = "Closing time required";
    if (formData.car_parking_slots < 0) newErrors.car_parking_slots = "Invalid parking slots";
    if (!formData.about) newErrors.about = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="restaurant-form-container">
      <h2>{initialData ? "Edit Restaurant" : "Add New Restaurant"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Name</label>
          <input type="text" name="restaurant_name" value={formData.restaurant_name} onChange={handleChange} />
          {errors.restaurant_name && <div className="error-message">{errors.restaurant_name}</div>}
        </div>
        
        <div className="form-field">
          <label>Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} />
          {errors.location && <div className="error-message">{errors.location}</div>}
        </div>
        
        <div className="form-field">
          <label>Cuisine</label>
          <select name="cuisine" value={formData.cuisine} onChange={handleChange}>
            <option value="">Select cuisine</option>
            {cuisineOptions.map((cuisine) => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </select>
          {errors.cuisine && <div className="error-message">{errors.cuisine}</div>}
        </div>

        <div className="form-group-row">
          <div className="form-field">
            <label>Rating</label>
            <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="0" max="5" step="0.1" />
            {errors.rating && <div className="error-message">{errors.rating}</div>}
          </div>
          <div className="form-field">
            <label>Price</label>
            <input type="text" name="price" value={formData.price} onChange={handleChange} />
            {errors.price && <div className="error-message">{errors.price}</div>}
          </div>
        </div>

        <div className="form-group-row">
          <div className="form-field">
            <label>Opening Time</label>
            <input type="time" name="open_time" value={formData.open_time} onChange={handleChange} />
            {errors.open_time && <div className="error-message">{errors.open_time}</div>}
          </div>
          <div className="form-field">
            <label>Closing Time</label>
            <input type="time" name="close_time" value={formData.close_time} onChange={handleChange} />
            {errors.close_time && <div className="error-message">{errors.close_time}</div>}
          </div>
        </div>

        <div className="form-field">
          <label>Car Parking Slots</label>
          <input type="number" name="car_parking_slots" value={formData.car_parking_slots} onChange={handleChange} />
          {errors.car_parking_slots && <div className="error-message">{errors.car_parking_slots}</div>}
        </div>

        <div className="form-field">
          <label>Image URL</label>
          <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} />
        </div>

        <div className="form-field">
          <label>Discount</label>
          <input type="text" name="discount" value={formData.discount} onChange={handleChange} />
        </div>

        <div className="form-field">
          <label>About</label>
          <textarea name="about" value={formData.about} onChange={handleChange}></textarea>
          {errors.about && <div className="error-message">{errors.about}</div>}
        </div>

        <div className="form-field">
          <label>Menu</label>
          {["starters", "mains", "specials", "desserts", "beverages"].map((section) => (
            <div key={section}>
              <label>{section.charAt(0).toUpperCase() + section.slice(1)}</label>
              {formData.menu[section].map((item, index) => (
                <input
                  key={index}
                  type="text"
                  value={item}
                  onChange={(e) => handleMenuChange(section, index, e.target.value)}
                />
              ))}
              <button type="button" onClick={() => addMenuItem(section)}>Add {section.slice(0, -1)}</button>
            </div>
          ))}
        </div>

        <div className="form-field">
          <label>Ambience</label>
          <div className="checkbox-group">
            {ambienceOptions.map((option) => (
              <label key={option} className="checkbox-label">
                <input type="checkbox" checked={formData.mood.includes(option)} onChange={() => handleAmbienceChange(option)} />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Submit</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
