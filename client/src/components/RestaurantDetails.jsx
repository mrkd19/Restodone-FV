import React, { useEffect, useState, useCallback } from 'react';
import { FaStar, FaClock, FaCar } from 'react-icons/fa';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import mockRestaurants from '../data/mockRestaurants.json';
import '../assets/css/RestaurantDetails.css';
import '../assets/css/HomePageRestaurantCard.css';

const RestaurantDetails = () => {
  const { state: restaurantFromState } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('12:00');
  const [guests, setGuests] = useState(1);
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [activeTab, setActiveTab] = useState('offers');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [paymentData, setPaymentData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const retrieveRestaurantData = useCallback(() => {
    if (restaurantFromState) {
      setRestaurant(restaurantFromState);
    } else if (id) {
      const mockRestaurant = mockRestaurants.find((resto) => resto.id === parseInt(id, 10));
      if (mockRestaurant) {
        setRestaurant(mockRestaurant);
      }
    }
  }, [restaurantFromState, id]);

  useEffect(() => {
    retrieveRestaurantData();
  }, [retrieveRestaurantData]);

  const handleBookNow = () => {
    if (!localStorage.getItem("token")) {
      setShowLoginPopup(true);
      return;
    }
    setShowPaymentForm(true);
  };

  const handleClosePaymentForm = () => {
    setShowPaymentForm(false);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!restaurant || !restaurant.id) {
      alert("Error: Restaurant ID is missing.");
      return;
    }

    const reservationData = {
      restaurantId: restaurant.id.toString(),
      restaurantName: restaurant.name || restaurant.restaurant_name,
      restaurantImage: restaurant.image || restaurant.image_url,
      date: selectedDate,
      time: selectedTime,
      guests,
      selectedDishes,
    };

    try {
      const response = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Reservation successful!");
        setShowPaymentForm(false);
      } else {
        if (response.status === 401) {
          alert("Error: Unauthorized. Please log in.");
          navigate("/login");
        } else {
          alert("Error: " + data.message);
        }
      }
    } catch (error) {
      alert("Error processing reservation. Please try again.");
    }
  };

  const pricePerPerson = restaurant ? restaurant.priceNum / 2 : 0;
  const totalPrice = pricePerPerson * guests;

  const handleDishSelect = (dish) => {
    setSelectedDishes((prev) =>
      prev.includes(dish) ? prev.filter((item) => item !== dish) : [...prev, dish]
    );
  };

  const generateTimeSlots = (openTime, closeTime) => {
    const slots = [];
    let currentTime = parseInt(openTime.split(":")[0]);
    const closeHour = parseInt(closeTime.split(":")[0]);

    while (currentTime < closeHour) {
      slots.push(`${String(currentTime).padStart(2, "0")}:00`);
      currentTime++;
    }
    return slots;
  };

  const timeSlots = restaurant ? generateTimeSlots(restaurant.open_time, restaurant.close_time) : [];

  if (!restaurant) {
    return <div>No restaurant data available.</div>;
  }

  return (
    <div className="restaurant-details-container">
      {showLoginPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>You need to log in or sign up to reserve a restaurant.</h3>
            <div className="popup-buttons">
              <button onClick={() => navigate("/login")} className="popup-btn login-btn">Login</button>
              <button onClick={() => navigate("/signup")} className="popup-btn signup-btn">Sign Up</button>
            </div>
            <button className="popup-close-btn" onClick={() => setShowLoginPopup(false)}>✖</button>
          </div>
        </div>
      )}

      <div className="restaurant-grid">
        <div>
          <div className="restaurants-image-container">
            <img
              src={restaurant.image || restaurant.image_url}
              alt={restaurant.name || restaurant.restaurant_name}
              className="restaurants-image"
            />
          </div>

          <div className="restaurant-info">
            <h1 className="restaurant-name">
              {restaurant.name || restaurant.restaurant_name}
            </h1>
            <div className="restaurant-meta">
              <div className="rating">
                <FaStar className="rating-star" />
                <span>{restaurant.rating || "N/A"}</span>
              </div>
              <span className="meta-divider">•</span>
              <span>{restaurant.cuisine || "N/A"}</span>
              <span className="meta-divider">•</span>
              <span>{restaurant.location || "N/A"}</span>
            </div>

            <div className="restaurant-stats">
              <div className="stat-item">
                <FaClock className="stat-icon" />
                <div>
                  <p className="stat-label">Opening Hours</p>
                  <p className="stat-value">
                    {restaurant.open_time || "N/A"} - {restaurant.close_time || "N/A"}
                  </p>
                </div>
              </div>
              <div className="stat-item">
                <FaCar className="stat-icon" />
                <div>
                  <p className="stat-label">Parking</p>
                  <p className="stat-value">
                    {restaurant.car_parking_slots || 'N/A'} slots available
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="tabs">
            <div className="tab-list">
              {['offers', 'menu', 'photos', 'about'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="tab-content">
              {activeTab === 'offers' && (
                <div className="offers-section">
                  <h3 className="offers-title">Special Offers</h3>
                  <p className="offers-text">{restaurant.discount || 'No special offers available'}</p>
                </div>
              )}

              {activeTab === 'menu' && (
                <div className="menu-section">
                  <h3 className="menu-title">Menu</h3>
                  {restaurant.menu && Object.keys(restaurant.menu).map((category) => (
                    <div key={category} className="menu-category">
                      <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                      <ul>
                        {restaurant.menu[category].map((dish, index) => (
                          <li key={index} className="menu-item">
                            <input
                              type="checkbox"
                              checked={selectedDishes.includes(dish)}
                              onChange={() => handleDishSelect(dish)}
                            />
                            <label>{dish}</label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'photos' && (
                <div className="photos-section">
                  <h3 className="photos-title">Gallery</h3>
                  <img src={restaurant.image_url} alt={restaurant.restaurant_name} className="photo-image" />
                </div>
              )}

              {activeTab === 'about' && (
                <div className="about-section">
                  <h3 className="about-title">About</h3>
                  <p className="about-text">{restaurant.about || "No description available"}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="booking-section">
          <h2 className="booking-title">Make a Reservation</h2>
          <div className="booking-form">
            <div className="form-group">
              <label className="form-label">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="form-input"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Select Time</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="form-select"
              >
                {timeSlots.length > 0 ? (
                  timeSlots.map((time) => <option key={time} value={time}>{time}</option>)
                ) : (
                  <option disabled>No available slots</option>
                )}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Number of Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="form-select"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            <div className="price-summary">
              <p className="price-text"><strong>Price Per Person:</strong> ₹{pricePerPerson}</p>
              <p className="total-price"><strong>Total Price:</strong> ₹{totalPrice}</p>
            </div>

            <button onClick={handleBookNow} className="book-button">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {showPaymentForm && (
        <div className="payment-form-overlay">
          <div className="payment-form">
            <button className="close-button" onClick={handleClosePaymentForm}>✖️</button>
            <h2>Payment Details</h2>

            <p className="payment-price-display"><strong>Total Price:</strong> ₹{totalPrice}</p>

            <form onSubmit={handlePayment}>
              <div className="form-group">
                <label>Name on Card</label>
                <input type="text" name="nameOnCard" onChange={(e) => setPaymentData({ ...paymentData, nameOnCard: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={(e) => {
                    const formattedValue = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                    setPaymentData({ ...paymentData, cardNumber: formattedValue });
                  }}
                  maxLength="19"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="form-group">
                <label>Expiry Date (MM/YY)</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={(e) => {
                    const formattedValue = e.target.value.replace(/\D/g, '').replace(/^(\d{2})(\d{0,2})$/, '$1/$2');
                    setPaymentData({ ...paymentData, expiryDate: formattedValue });
                  }}
                  maxLength="5"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="form-group">
                <label>CVC</label>
                <input type="password" name="cvc" onChange={(e) => setPaymentData({ ...paymentData, cvc: e.target.value })} maxLength="3" placeholder="●●●" required />
              </div>
              <button type="submit" className="submit-button">Pay Now</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetails;
