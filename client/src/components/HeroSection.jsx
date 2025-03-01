import React, { useState } from 'react';
import { FiMapPin, FiNavigation, FiChevronDown } from 'react-icons/fi';
import axios from 'axios';
import '../assets/css/HeroSection.css';

const HeroSection = () => {
  const [isLocationOpen, setIsLocationOpen] = useState(false); // State to control the visibility of the location dropdown menu
  const [selectedLocation, setSelectedLocation] = useState('Select Location'); // State to store the currently selected location
  const [loading, setLoading] = useState(false); // State to control loading state for current location

  const locations = [
    'Delhi',
    'Mumbai',
    'Kochi',
    'Bangalore',
    'Chennai',
  ]; // Array of predefined locations available for selection

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

          setSelectedLocation(city || "Unknown Location");
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
    <div className="hero-section"> {/* Container for the hero section */}
      <div className="hero-content"> {/* Wrapper for text and interactive elements */}
        <h1 className="hero-title">Book Your Perfect Dining Experience</h1> {/* Main heading */}
        <p className="hero-description">Discover and reserve tables at the best restaurants in town</p> {/* Supporting description */}

        <div className="location-selector"> {/* Container for location selection dropdown */}
          <div
            className="location-button" // Button to toggle the dropdown menu
            onClick={() => {
              console.log(`Dropdown menu state before click: ${isLocationOpen}`); // Debug: Log state before toggling
              setIsLocationOpen(!isLocationOpen);
              console.log(`Dropdown menu state after click: ${!isLocationOpen}`); // Debug: Log state after toggling
            }}
          >
            <FiMapPin size={20} /> {/* Location icon */}
            <span>{selectedLocation}</span> {/* Display the selected location */}
            <FiChevronDown size={20} /> {/* Dropdown arrow icon */}
          </div>

          {isLocationOpen && ( // Conditional rendering for the dropdown menu
            <div className="location-dropdown"> {/* Dropdown menu container */}
              <div
                className="current-location-option" // Option to use the user's current location
                onClick={useCurrentLocation}
              >
                <FiNavigation size={18} /> {/* Icon for current location */}
                <span>{loading ? "Locating..." : "Use my current location"}</span>
              </div>
              <div className="location-divider"></div> {/* Divider for better UI separation */}
              {locations.map((location, index) => (
                <div
                  key={index} // Unique key for each location
                  className="location-option" // Option to select a predefined location
                  onClick={() => {
                    console.log(`Selected location: ${location}`); // Debug: Log the selected location
                    setSelectedLocation(location); // Update the selected location
                    setIsLocationOpen(false); // Close the dropdown menu
                  }}
                >
                  {location} {/* Display location name */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
