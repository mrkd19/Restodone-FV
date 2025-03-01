import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers, FaUserCheck, FaCalendarAlt, FaChartLine } from "react-icons/fa";
import io from "socket.io-client"; // Import Socket.IO for real-time updates
import StatCard from "./StatCard";
import ReservationsTable from "./ReservationsTable";
import "../assets/css/Dashboard.css";

const socket = io("http://localhost:5000"); // Connect to backend WebSocket server

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalReservations: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStats({
          totalUsers: Number(response.data.totalUsers), // ✅ Convert to number
          activeUsers: Number(response.data.activeUsers),
          totalReservations: Number(response.data.totalReservations),
          totalRevenue: Number(response.data.totalRevenue),
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching statistics:", err.message);
        setError("Error fetching statistics");
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh data every 30 seconds

    // ✅ Listen for WebSocket updates
    socket.on("activeUsersUpdated", (count) => {
      setStats((prevStats) => ({
        ...prevStats,
        activeUsers: count,
      }));
    });

    return () => {
      clearInterval(interval);
      socket.off("activeUsersUpdated"); // Cleanup listener
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard Overview</h1>

      <div className="stats-grid">
        <StatCard title="Total Users" value={stats.totalUsers} change="+12%" icon={<FaUsers />} />
        <StatCard title="Active Users & Admins" value={stats.activeUsers} change="Real-time" icon={<FaUserCheck />} />
        <StatCard title="Total Reservations" value={stats.totalReservations} change="+15%" icon={<FaCalendarAlt />} />
        <StatCard title="Total Revenue" value={stats.totalRevenue} change="+5%" icon={<FaChartLine />} />
      </div>

      <div className="recent-section">
        <h2>Recent Reservations</h2>
        <ReservationsTable />
      </div>
    </div>
  );
};

export default Dashboard;
