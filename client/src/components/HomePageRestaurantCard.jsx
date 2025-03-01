import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../assets/css/HomePageRestaurantCard.css';

const HomePageRestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleBookNow = () => {
    navigate(`/restaurant/${restaurant.id}`, { state: restaurant }); // Navigate to restaurant details page
  };

  return (
    <div className="homepage-restaurant-card" onClick={handleBookNow}> {/* Card container with click handler */}
      <div className="homepage-restaurant-image"> {/* Image container */}
        <img src={restaurant.image} alt={restaurant.name} /> {/* Restaurant image */}
      </div>
      <div className="homepage-restaurant-info"> {/* Info container */}
        <h3>{restaurant.name}</h3> {/* Restaurant name */}
        <div className="homepage-restaurant-details"> {/* Details container */}
          <span className="homepage-restaurant-rating"> {/* Rating */}
            <FaStar size={16} color="#FFD700" /> {/* Star icon */}
            {restaurant.rating}
          </span>
          <span className="homepage-restaurant-cuisine">{restaurant.cuisine}</span> {/* Cuisine */}
          <span className="homepage-restaurant-price">{restaurant.priceRange}</span> {/* Price range */}
        </div>
        <p className="homepage-restaurant-location">{restaurant.location}</p> {/* Location */}
        <button
          className="homepage-restaurant-book-button"
          onClick={handleBookNow} // Book Now button click handler
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default HomePageRestaurantCard;
