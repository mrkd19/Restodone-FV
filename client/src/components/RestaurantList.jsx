import React from 'react'; // Import React
import RestaurantCard from './RestaurantCard'; // Import RestaurantCard component
import '../assets/css/RestaurantList.css'; // Import CSS for styling

/**
 * RestaurantList component
 *
 * This component renders a list of restaurant cards based on the array of restaurant
 * objects passed as a prop. If no restaurants are available, it renders a message
 * indicating that no restaurants are available.
 *
 * @prop {Array} restaurants - Array of restaurant objects
 * @returns {JSX.Element} The rendered component
 */
const RestaurantList = ({ restaurants }) => { // Define RestaurantList component with restaurants prop
  return (
    <div className="restaurant-list"> {/* Container for the restaurant list */}
      {restaurants.length > 0 ? ( // Check if there are restaurants
        restaurants.map((restaurant) => ( // Map through restaurants array
          <RestaurantCard
            key={restaurant.id} // Unique key for each restaurant
            id={restaurant.id} // Pass restaurant id
            name={restaurant.restaurant_name} // Pass restaurant name
            location={restaurant.location} // Pass restaurant location
            cuisine={restaurant.cuisine} // Pass restaurant cuisine
            priceForTwo={restaurant.priceNum} // Pass price for two
            rating={restaurant.rating} // Pass restaurant rating
            offers={restaurant.discount} // Pass restaurant offers
            image={restaurant.image_url} // Pass restaurant image URL
          />
        ))
      ) : (
        <p className="no-restaurants">No restaurants available</p> // Message if no restaurants
      )}
    </div>
  );
};

export default RestaurantList; // Export RestaurantList component
