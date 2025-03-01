import React, { useState, useEffect } from 'react'; // Import React and hooks
import { useLocation } from 'react-router-dom'; // Import useLocation hook from react-router-dom
import RestaurantList from '../components/RestaurantList'; // Import RestaurantList component
import FilterOptions from '../components/FilterOptions'; // Import FilterOptions component
import SortOptions from '../components/SortOptions'; // Import SortOptions component
import Pagination from '../components/Pagination'; // Import the Pagination component
import mockRestaurants from '../data/mockRestaurants.json'; // Import mock restaurant data

/**
 * RestaurantPage component
 *
 * This component renders the restaurant list page, including the list of restaurants, a filter
 * component to filter by cuisine, a sort component to sort by rating or price, and pagination
 * controls to navigate between pages of results.
 *
 * @returns {JSX.Element} The rendered component
 */
const RestaurantPage = () => {
  // State to hold filtered restaurants
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  // State to hold the current page number for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // State to hold the selected cuisine filter
  const [selectedCuisine, setSelectedCuisine] = useState('');
  // State to hold the selected sort option
  const [sortOption, setSortOption] = useState('');
  // Number of items to display per page
  const itemsPerPage = 10;
  // Hook to get the current location object
  const location = useLocation();

  // Effect to set the selected cuisine based on URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const cuisine = queryParams.get('cuisine');
    if (cuisine) {
      setSelectedCuisine(cuisine);
    }
  }, [location.search]);

  // Effect to filter and sort restaurants based on selected cuisine and sort option
  useEffect(() => {
    let filtered = mockRestaurants;

    if (selectedCuisine) {
      filtered = filtered.filter(restaurant => restaurant.cuisine === selectedCuisine);
    }

    if (sortOption === 'rating') {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'price') {
      filtered = filtered.sort((a, b) => a.priceNum - b.priceNum);
    }

    setFilteredRestaurants(filtered);
  }, [selectedCuisine, sortOption]);

  // Calculate the indices for the current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Slice the filtered restaurants to get the current page items
  const currentRestaurants = filteredRestaurants.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);

  // Handler to change the current page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handler to change the selected filter
  const handleFilterChange = (filterName, value) => {
    if (filterName === 'cuisine') {
      setSelectedCuisine(value);
    }
  };

  // Handler to change the selected sort option
  const handleSortChange = (value) => {
    setSortOption(value);
  };

  return (
    <div className="restaurant-page">
      <h1 style={{ textAlign: 'center' }}>Restaurants</h1>
      <FilterOptions
        filters={[
          { name: 'cuisine', label: 'Cuisine', options: [
            { value: 'Italian', label: 'Italian' },
            { value: 'Japanese', label: 'Japanese' },
            { value: 'Chinese', label: 'Chinese' },
            { value: 'Arabic', label: 'Arabic' },
            { value: 'Indian', label: 'Indian' },
            { value: 'Mediterranean', label: 'Mediterranean' },
            // Add more cuisines as needed
          ]}
        ]}
        onFilterChange={handleFilterChange}
      />
      <SortOptions
        options={[
          { value: 'rating', label: 'Rating' },
          { value: 'price', label: 'Price' },
        ]}
        onSortChange={handleSortChange}
      />
      <RestaurantList restaurants={currentRestaurants} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default RestaurantPage;