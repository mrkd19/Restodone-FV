import React from "react";
import { FaTachometerAlt, FaUsers, FaCalendarAlt, FaStore, FaCog, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../assets/css/Sidebar.css";

const Sidebar = ({ setCurrentPage, currentPage }) => {
  const menuItems = [
    { id: "dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { id: "users", icon: <FaUsers />, label: "User Management" },
    { id: "reservations", icon: <FaCalendarAlt />, label: "Reservations" },
    { id: "restaurants", icon: <FaStore />, label: "Restaurants" },
    { id: "requests", icon: <FaClipboardList />, label: "Reservation Requests" },
    { id: "settings", icon: <FaCog />, label: "Settings" },
  ];

  return (
    <div className="sidebar-container">
      <div className="sidebar-logo">
        <Link to="/">
          <h2>Restodone</h2>
        </Link>
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={currentPage === item.id ? "active" : ""}
              onClick={() => setCurrentPage(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
