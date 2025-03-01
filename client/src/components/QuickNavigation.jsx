// Import React library
import React from 'react';
// Import useNavigate hook from react-router-dom for navigation
import { useNavigate } from 'react-router-dom';
// Import icons from react-icons library
import { FaCoffee, FaSun, FaUtensils, FaWineGlassAlt } from 'react-icons/fa';
// Import CSS for styling
import '../assets/css/QuickNavigation.css';

// Define QuickNavigation functional component
const QuickNavigation = () => {
  // Initialize navigate function
  const navigate = useNavigate();

  // Define navigation items with icons and labels
  const navItems = [
    { icon: <FaCoffee />, label: 'Breakfast' },
    { icon: <FaSun />, label: 'Lunch' },
    { icon: <FaUtensils />, label: 'Dinner' },
    { icon: <FaWineGlassAlt />, label: 'Fine Dining' },
  ];

  // Handle navigation item click event
  const handleNavItemClick = () => {
    // Navigate to /restaurants route
    navigate('/restaurants');
  };

  // Render the component
  return (
    // Container for quick navigation
    <div className="quick-navigation-container">
      {/* Quick navigation items */}
      <div className="quick-navigation">
        {/* Map through navItems and render each item */}
        {navItems.map((item, index) => (
          // Navigation item with click event handler
          <div key={index} className="nav-item" onClick={handleNavItemClick}>
            {/* Render icon */}
            {item.icon}
            {/* Render label */}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export QuickNavigation component as default export
export default QuickNavigation;
