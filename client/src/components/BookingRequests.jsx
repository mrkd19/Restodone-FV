import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/BookingRequests.css"; // ✅ Add styling

const BookingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [reply, setReply] = useState({});
  const [offer, setOffer] = useState({});

  // ✅ Fetch reservation requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/admin/reservation-requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching reservation requests:", error);
      }
    };

    fetchRequests();
  }, []);

  // ✅ Handle Approve & Reject
  const handleAction = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/admin/reservation-requests/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Update UI after action
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status } : req))
      );
    } catch (error) {
      console.error(`Error updating request ${id}:`, error);
    }
  };

  // ✅ Handle Admin Reply
  const handleReply = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/admin/reservation-requests/${id}/reply`,
        {
          adminResponse: reply[id] || "",
          offerDetails: offer[id] || "",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Clear input after sending
      setReply((prev) => ({ ...prev, [id]: "" }));
      setOffer((prev) => ({ ...prev, [id]: "" }));

      alert("Reply sent, and email notification delivered!");
    } catch (error) {
      console.error("Error sending response:", error);
      alert("Failed to send reply.");
    }
  };

  return (
    <div className="booking-requests-container">
      <h2>Reservation Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Reply</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.name}</td>
                <td>{req.location}</td>
                <td>{req.date}</td>
                <td>{req.time}</td>
                <td>{req.guests}</td>
                <td>
                  <span className={`status ${req.status.toLowerCase()}`}>
                    {req.status}
                  </span>
                </td>
                <td>
                  {req.status === "Pending" && (
                    <>
                      <button className="approve-btn" onClick={() => handleAction(req._id, "Approved")}>
                        Approve
                      </button>
                      <button className="reject-btn" onClick={() => handleAction(req._id, "Rejected")}>
                        Reject
                      </button>
                    </>
                  )}
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Admin response"
                    value={reply[req._id] || ""}
                    onChange={(e) => setReply({ ...reply, [req._id]: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Special Offer (optional)"
                    value={offer[req._id] || ""}
                    onChange={(e) => setOffer({ ...offer, [req._id]: e.target.value })}
                  />
                  <button className="reply-btn" onClick={() => handleReply(req._id)}>
                    Send
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingRequests;
