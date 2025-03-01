import React from "react";
import { FaSignOutAlt, FaBell, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../assets/css/HeaderAdmin.css";

const HeaderAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="admin-header-container">
      <div className="admin-search-bar">
        <FaSearch size={20} />
        <input type="text" placeholder="Search..." className="admin-search-input" />
      </div>
      <div className="admin-header-right">
        <div className="admin-notifications">
          <FaBell size={20} />
          <span className="admin-notification-badge">3</span>
        </div>
        {/* ✅ Replaced admin profile with logout button */}
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </header>
  );
};

export default HeaderAdmin;
