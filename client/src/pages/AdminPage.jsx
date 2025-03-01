import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import HeaderAdmin from "../components/HeaderAdmin";
import Dashboard from "../components/Dashboard";
import UserManagement from "../components/UserManagement";
import Reservations from "../components/ReservationsTable";
import Restaurants from "../components/RestaurantsAdmin";
import Settings from "../components/SettingsAdmin";
import BookingRequests from "../components/BookingRequests"; // ✅ Import BookingRequests
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/AdminPage.css";

const AdminPage = () => {
  const { userRole } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userRole !== "admin") return; // ✅ Ensures effect runs only for admins

    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdminData(response.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setError("Failed to load admin data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [userRole]);

  if (userRole !== "admin") {
    return <Navigate to="/" />;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // ✅ Updated renderPage to include "Reservation Requests"
  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard data={adminData} />;
      case "users":
        return <UserManagement />;
      case "reservations":
        return <Reservations />;
      case "restaurants":
        return <Restaurants />;
      case "requests": // ✅ New Case for Reservation Requests
        return <BookingRequests />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin-container">
      <Sidebar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <div className="admin-content">
        <HeaderAdmin />
        {renderPage()}
      </div>
    </div>
  );
};

export default AdminPage;
