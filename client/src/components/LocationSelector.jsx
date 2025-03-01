import React, { useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import "../assets/css/LocationSelector.css";

const LocationSelector = () => {
  // State to store the selected location
  const [location, setLocation] = useState("Your Location");
  // State to manage the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // State to manage the loading state for geolocation
  const [loading, setLoading] = useState(false);

  // List of popular cities
  const popularCities = [
    "Delhi NCR",
    "Mumbai",
    "Kochi",
    "Bangalore",
    "Chennai",
    "Pune",
  ];

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to use the current location of the user
  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=68af8dfae6d84401bcf3fb4652522c5f`
          );

          const city =
            response.data.results[0].components.city ||
            response.data.results[0].components.town ||
            response.data.results[0].components.village;

          setLocation(city || "Unknown Location");
        } catch (error) {
          console.error("Error fetching location:", error);
          alert("Unable to fetch location. Please try again.");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to access your location. Please check permissions.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="location-container">
      <div className="location-bar" onClick={toggleDropdown}>
        <FaMapMarkerAlt className="icon-location" />
        <span className="location-display">{location}</span>
        <div className="dropdown-icon">▼</div>
      </div>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <button onClick={useCurrentLocation} className="use-location-button">
            {loading ? "Locating..." : "Use Current Location"}
          </button>
          <div className="popular-cities">
            {popularCities.map((city, index) => (
              <div
                key={index}
                className="city-option"
                onClick={() => {
                  setLocation(city);
                  setIsDropdownOpen(false);
                }}
              >
                {city}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;