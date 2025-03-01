import React, { useState } from 'react';
import axios from 'axios'; // ✅ Import axios
import { FaTimes, FaCalendarAlt, FaClock, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import '../assets/css/BookingModal.css';

const BookingModal = ({ isOpen, onClose, type }) => {
  // State to hold form data
  const [formData, setFormData] = useState({
    location: '',  // ✅ Added Location field
    date: '',
    time: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    occasion: '',
    specialRequests: ''
  });

  // Handler to update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Updated handleSubmit to send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Ensure only `name` and `phone` are required
    if (!formData.name || !formData.phone) {
      alert("Please enter your name and phone number.");
      return;
    }

    // ✅ Auto-fill missing fields with "None"
    const requestData = {
      location: formData.location || "None",
      time: formData.time || "None",
      guests: formData.guests || 1, // ✅ Default at least 1 guest
      name: formData.name,
      email: formData.email || "None",
      phone: formData.phone,
      date: formData.date || "None",
      specialRequests: formData.specialRequests || "None",
      occasion: formData.occasion || "None",
    };

    try {
      console.log("📤 Sending booking request:", requestData); // ✅ Debugging

      const response = await axios.post("http://localhost:5000/api/admin/booking-requests", requestData);
      console.log("✅ Booking request saved:", response.data);

      alert("Booking request submitted successfully!");
      onClose();
    } catch (error) {
      console.error("❌ Error submitting booking request:", error.response ? error.response.data : error.message);
      alert("Failed to submit request. Please check console logs.");
    }
  };

  // Function to get the modal title based on the booking type
  const getModalTitle = () => {
    switch (type) {
      case 'future':
        return 'Reserve for Later';
      case 'today':
        return 'Book for Today';
      case 'group':
        return 'Group Booking';
      case 'special':
        return 'Special Occasion Booking';
      default:
        return 'Make a Reservation';
    }
  };

  // Return null if the modal is not open
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modalt-content">
        <div className="modal-header">
          <h2>{getModalTitle()}</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            {/* ✅ New Location Field (Before Date) */}
            <div className="form-group">
              <label>
                <FaMapMarkerAlt /> Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter preferred location"
              />
            </div>

            {(type === 'future' || type === 'today') && (
              <div className="form-group">
                <label>
                  <FaCalendarAlt /> Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={type === 'today' ? new Date().toISOString().split('T')[0] : undefined}
                />
              </div>
            )}

            <div className="form-group">
              <label>
                <FaClock /> Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                <FaUsers /> Number of Guests
              </label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
              >
                {[...Array(20)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {type === 'special' && (
              <div className="form-group full-width">
                <label>Occasion</label>
                <select
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                >
                  <option value="">Select an occasion</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="engagement">Engagement</option>
                  <option value="business">Business Dinner</option>
                  <option value="other">Other</option>
                </select>
              </div>
            )}

            <div className="form-group full-width">
              <label>Special Requests</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
