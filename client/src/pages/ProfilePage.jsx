import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaCrown, FaTrophy, FaCheck, FaTimes, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../assets/css/ProfilePage.css"; // Import CSS for styling

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await response.json();
        setUser(data);
        setUpdatedUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedUser),
      });
      const data = await response.json();
      setUser(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Personal Information</h2>
        <button onClick={() => setIsEditing(!isEditing)} className="edit-btn">
          <FaEdit /> Edit
        </button>
      </div>

      <div className="profile-info">
        <div className="info-item">
          <FaUser className="icon" />
          <span>Name: {isEditing ? <input type="text" name="username" value={updatedUser.username || ""} onChange={handleInputChange} /> : user.username}</span>
        </div>
        <div className="info-item">
          <FaEnvelope className="icon" />
          <span>Email: {isEditing ? <input type="email" name="email" value={updatedUser.email || ""} onChange={handleInputChange} /> : user.email}</span>
        </div>
        <div className="info-item">
          <FaPhone className="icon" />
          <span>Phone: {isEditing ? <input type="text" name="phone" value={updatedUser.phone || ""} onChange={handleInputChange} /> : user.phone}</span>
        </div>
      </div>

      {isEditing && <button onClick={saveProfile} className="save-btn">Save</button>}

      <div className="cards-container">
        <div className="card restopoints-card">
          <FaTrophy className="card-icon" />
          <h3>RestoPoints</h3>
          <p>{user.restopoints || 0} points</p>
        </div>
        <div className="card prime-card">
          <FaCrown className="card-icon" />
          <h3>Prime Status</h3>
          <span className={user.isPrime ? "status-active" : "status-inactive"}>
            {user.isPrime ? <FaCheck /> : <FaTimes />} {user.isPrime ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;