import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaChevronDown, FaUser, FaSignOutAlt, FaSignInAlt, FaCalendarAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import mockRestaurants from '../data/mockRestaurants.json';
import '../assets/css/Header.css';
import '../assets/css/SearchDropdown.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedInUser, userRole, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const dropdownRef = useRef(null);
  const profileTimeoutRef = useRef(null);

  // Handle user logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const results = mockRestaurants.filter(
        (restaurant) =>
          restaurant.restaurant_name.toLowerCase().includes(query.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  // Handle click outside of the dropdown to close it
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setFilteredResults([]);
    }
  };

  // Handle result click to clear search input and results
  const handleResultClick = () => {
    setSearchQuery('');
    setFilteredResults([]);
  };

  // Fix: Add delay before hiding dropdown
  const handleMouseEnter = () => {
    if (profileTimeoutRef.current) clearTimeout(profileTimeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    profileTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300); // Delay of 300ms before closing
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      setSearchQuery('');
      setFilteredResults([]);
    }
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo Section */}
        <div className="logo">
          <Link to="/">
            <h1 className="dm-serif-text-regular">RestoDone</h1> {/* Apply the font class */}
          </Link>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <FaSearch size={20} />
          <input
            type="text"
            placeholder="Search restaurants, cuisines..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {filteredResults.length > 0 && (
            <div ref={dropdownRef} className="search-dropdown">
              {filteredResults.map((result) => (
                <Link
                  key={result.id}
                  to={`/restaurant/${result.id}`}
                  className="dropdown-item"
                  onClick={handleResultClick}
                >
                  {result.restaurant_name} - {result.cuisine}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          {loggedInUser && userRole === 'admin' ? (
            <Link to="/admin" className="nav-link">Admin Dashboard</Link>
          ) : (
            <>
              <Link to="/prime" className="nav-link">Prime</Link>
              <Link to="/contact" className="nav-link">Contact Us</Link>
            </>
          )}
        </nav>

        {/* Profile Menu */}
        <div
          className="profile-menu"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className="profile-button">
            {loggedInUser ? loggedInUser : 'Guest'} <FaChevronDown size={14} />
          </button>
          <div className={`profile-dropdown ${isDropdownOpen ? 'active' : ''}`}>
            {loggedInUser ? (
              <>
                <Link to="/profile" className="dropdown-item">
                  <FaUser size={16} /> Profile
                </Link>
                <Link to="/reservations" className="dropdown-item">
                  <FaCalendarAlt size={16} /> Reservations
                </Link>
                <div className="divider"></div>
                <button onClick={handleLogout} className="dropdown-item">
                  <FaSignOutAlt size={16} /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="dropdown-item">
                <FaSignInAlt size={16} /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
