import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import "../assets/css/ReservationsTable.css";

const ReservationsTable = () => {
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/reservations", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const updateReservationStatus = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/admin/reservations/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      fetchReservations();
    } catch (error) {
      console.error(`Error updating reservation to ${status}:`, error);
    }
  };

  const deleteReservation = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/reservations/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchReservations();
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReservations = reservations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(reservations.length / itemsPerPage);

  return (
    <div className="reservations-container">
      <h2 className="reservations-title">Reservations</h2>
      <table className="reservations-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Restaurant</th>
            <th>Date</th>
            <th>Time</th>
            <th>Guests</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentReservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.user?.username || "Unknown User"}</td>
              <td>{reservation.restaurantName}</td>
              <td>{reservation.date}</td>
              <td>{reservation.time}</td>
              <td>{reservation.guests}</td>
              <td className={reservation.status === "confirmed" ? "status-confirmed" : "status-pending"}>
                {reservation.status}
              </td>
              <td>
                <button className="btn-approve" onClick={() => updateReservationStatus(reservation._id, "confirmed")}>
                  <FaCheck />
                </button>
                <button className="btn-reject" onClick={() => updateReservationStatus(reservation._id, "cancelled")}>
                  <FaTimes />
                </button>
                <button className="btn-delete" onClick={() => deleteReservation(reservation._id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`pagination-button ${index + 1 === currentPage ? "active" : ""}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="pagination-button"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReservationsTable;
