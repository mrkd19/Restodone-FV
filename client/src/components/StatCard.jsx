import React from "react";
import PropTypes from "prop-types";
import "../assets/css/StatCard.css";

const StatCard = ({ title, value, change, icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <h3>{title}</h3>
        <p>{typeof value === "number" ? value.toLocaleString() : "N/A"}</p>
        <span>{change}</span>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  change: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default StatCard;
