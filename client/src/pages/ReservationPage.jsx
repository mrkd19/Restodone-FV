import React, { useState, useEffect, useContext } from "react";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import "../assets/css/ReservationPage.css";

const ReservationPage = () => {
  const [reservations, setReservations] = useState([]);
  const { userId } = useContext(AuthContext); // ✅ Get logged-in user's ID

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/reservations", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const data = await response.json();

        console.log("All Reservations:", data); // Debugging
        console.log("Logged-in User ID:", userId); // Debugging

        // ✅ Filter reservations by the logged-in user ID
        const userReservations = data.filter((reservation) => reservation.user === userId);
        setReservations(userReservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    if (userId) fetchReservations();
  }, [userId]); // ✅ Re-run fetch when userId changes

  const handleCancel = async (id) => {
    console.log("Cancelling reservation with ID:", id); // Debugging

    try {
      const response = await fetch(`http://localhost:5000/api/reservations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.ok) {
        const data = await response.json(); // ✅ Get refund amount
        setReservations(reservations.filter((reservation) => reservation._id !== id));
        alert(`Reservation cancelled successfully! Refund: ${data.refund}%`);
      } else {
        alert("Error cancelling reservation.");
      }
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };

  return (
    <div className="reservation-container">
      <h2>Your Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <div className="reservation-list">
          {reservations.map((reservation) => {
            const currentTime = new Date();
            const reservationTime = new Date(`${reservation.date} ${reservation.time}`);
            const isPastReservation = currentTime > reservationTime; // ✅ Check if reservation has passed

            let refundMessage = "No refund";
            let refundClass = "no-refund";
            if ((reservationTime - currentTime) / (1000 * 60 * 60) > 2) {
              refundMessage = "Full Refund (100%)";
              refundClass = "full-refund";
            } else if ((reservationTime - currentTime) / (1000 * 60 * 60) > 1) {
              refundMessage = "Partial Refund (50%)";
              refundClass = "partial-refund";
            }

            return (
              <div key={reservation._id} className="reservation-card">
                <div className="image-container">
                  <img src={reservation.restaurantImage} alt={reservation.restaurantName} className="restaurant-image" />
                </div>
                <div className="reservation-details">
                  <h3>{reservation.restaurantName}</h3>
                  <p><FaCalendarAlt /> {reservation.date} at {reservation.time}</p>
                  <p>Guests: {reservation.guests}</p>
                  <p className={`parking-info ${isPastReservation ? "no" : "yes"}`}>
                    Parking Available: {isPastReservation ? "❌ No" : "✅ Yes"}
                  </p> {/* ✅ Show Yes before reservation, No after */}
                  <p className={`refund-info ${refundClass}`}>{refundMessage}</p>
                  <button onClick={() => handleCancel(reservation._id)} className="cancel-btn">
                    <FaTimes /> Cancel
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReservationPage;
