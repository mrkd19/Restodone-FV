import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaStar } from "react-icons/fa";
import RestaurantForm from "./RestaurantFormStyles";
import "../assets/css/RestaurantsAdmin.css";
import mockRestaurants from "../data/mockRestaurants.json";

const RestaurantsAdmin = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    loadMockData();
  }, []);

  // ✅ Load mock data or localStorage data
  const loadMockData = () => {
    const storedRestaurants = localStorage.getItem("restaurants");
    if (storedRestaurants) {
      setRestaurants(JSON.parse(storedRestaurants));
    } else {
      setRestaurants(mockRestaurants);
      localStorage.setItem("restaurants", JSON.stringify(mockRestaurants));
    }
  };

  // ✅ Add or Edit Restaurant
  const handleFormSubmit = (newRestaurant) => {
    let updatedRestaurants;
    if (isEditing) {
      updatedRestaurants = restaurants.map((restaurant) =>
        restaurant.id === currentRestaurant.id ? newRestaurant : restaurant
      );
      setSuccessMessage("Restaurant updated successfully!");
    } else {
      const newId = restaurants.length > 0 ? Math.max(...restaurants.map((r) => r.id)) + 1 : 1;
      updatedRestaurants = [...restaurants, { ...newRestaurant, id: newId }];
      setSuccessMessage("Restaurant added successfully!");
    }
    setRestaurants(updatedRestaurants);
    localStorage.setItem("restaurants", JSON.stringify(updatedRestaurants));
    setIsFormVisible(false);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // ✅ Delete Restaurant
  const handleDeleteRestaurant = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this restaurant?");
    if (confirmed) {
      const updatedRestaurants = restaurants.filter((r) => r.id !== id);
      setRestaurants(updatedRestaurants);
      localStorage.setItem("restaurants", JSON.stringify(updatedRestaurants));
    }
  };

  // ✅ Search Restaurants
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.restaurant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Sort Restaurants
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortOrder) {
      case "alphabetical-asc":
        return a.restaurant_name.localeCompare(b.restaurant_name);
      case "alphabetical-desc":
        return b.restaurant_name.localeCompare(a.restaurant_name);
      case "price-asc":
        return a.priceNum - b.priceNum;
      case "price-desc":
        return b.priceNum - a.priceNum;
      case "rating-desc":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // ✅ Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRestaurants = sortedRestaurants.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedRestaurants.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="admin-restaurants-container">
      <div className="admin-restaurants-header">
        <h1>Restaurants</h1>
        <button className="admin-add-restaurant-btn" onClick={() => setIsFormVisible(true)}>
          <FaPlus /> Add Restaurant
        </button>
      </div>

      <div className="admin-filters">
        {/* ✅ Search Bar */}
        <input
          type="text"
          placeholder="Search for restaurants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-search-bar"
        />

        {/* ✅ Sorting Dropdown */}
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="admin-sort-dropdown">
          <option value="">Sort By</option>
          <option value="alphabetical-asc">Alphabetical (A-Z)</option>
          <option value="alphabetical-desc">Alphabetical (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="rating-desc">Rating (High to Low)</option>
        </select>
      </div>

      {successMessage && <div className="success-message">{successMessage}</div>}

      {isFormVisible && (
        <RestaurantForm
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormVisible(false)}
          initialData={currentRestaurant}
        />
      )}

      <div className="admin-restaurants-grid">
        {currentRestaurants.map((restaurant) => (
          <div key={restaurant.id} className="admin-restaurant-card">
            <div className="admin-restaurant-image">
              <img src={restaurant.image_url} alt={restaurant.restaurant_name} />
              <div className="admin-restaurant-actions">
                <button
                  className="admin-edit-btn"
                  onClick={() => {
                    setIsFormVisible(true);
                    setIsEditing(true);
                    setCurrentRestaurant(restaurant);
                  }}
                >
                  <FaEdit />
                </button>
                <button className="admin-delete-btn" onClick={() => handleDeleteRestaurant(restaurant.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="admin-restaurant-info">
              <h3>{restaurant.restaurant_name}</h3>
              <p>{restaurant.location}</p>
              <span className="admin-rating">
                <FaStar /> {restaurant.rating}
              </span>
              <p>{restaurant.about}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Pagination Controls */}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default RestaurantsAdmin;