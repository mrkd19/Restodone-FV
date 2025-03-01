import React from 'react'; // Import React library
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom for navigation
import { FaUtensils, FaRupeeSign, FaStar } from 'react-icons/fa'; // Import icons from react-icons library
import '../assets/css/RestaurantCard.css'; // Import CSS for styling the component

// Define the RestaurantCard component with destructured props
/**
 * RestaurantCard component displays a card with restaurant details.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.id - The unique identifier for the restaurant.
 * @param {string} props.name - The name of the restaurant.
 * @param {string} props.location - The location of the restaurant.
 * @param {string} props.cuisine - The type of cuisine the restaurant offers.
 * @param {number} props.priceForTwo - The average price for two people.
 * @param {number} props.rating - The rating of the restaurant.
 * @param {string} props.offers - The offers available at the restaurant.
 * @param {string} props.image - The URL of the restaurant's image.
 * @returns {JSX.Element} The RestaurantCard component.
 */
const RestaurantCard = ({ id, name, location, cuisine, priceForTwo, rating, offers, image }) => {
  const navigate = useNavigate(); // Initialize navigate function for navigation

  // Function to handle card click and navigate to restaurant details page
  const handleCardClick = () => {
    navigate(`/restaurant/${id}`); // Navigate to the restaurant details page with the restaurant id
  };

  // Return the JSX for the RestaurantCard component
  return (
    <div className="restodone-card" onClick={handleCardClick}> {/* Card container with click handler */}
      <div className="restodone-card-image"> {/* Container for the restaurant image */}
        <img src={image} alt={name} /> {/* Restaurant image */}
      </div>
      <div className="restodone-card-content"> {/* Container for the restaurant details */}
        <h3 className="restodone-card-name">{name}</h3> {/* Restaurant name */}
        <p className="restodone-card-location">{location}</p> {/* Restaurant location */}
        <div className="restodone-card-cuisine-price"> {/* Container for cuisine and price details */}
          <div className="restodone-card-cuisine"> {/* Cuisine details */}
            <FaUtensils /> {cuisine} {/* Cuisine icon and text */}
          </div>
          <div className="restodone-card-price"> {/* Price details */}
            <FaRupeeSign /> ₹{priceForTwo} for two {/* Price icon and text */}
          </div>
        </div>
        <div className="restodone-card-details"> {/* Container for rating and offers */}
          <span className="restodone-card-rating"> {/* Rating details */}
            <FaStar color="#FFD700" /> {rating} {/* Rating icon and text */}
          </span>
          <div className="restodone-card-offers"> {/* Offers details */}
            <span className="restodone-card-offer">{offers}</span> {/* Offers text */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard; // Export the RestaurantCard component as default