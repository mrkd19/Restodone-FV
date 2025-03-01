import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserPlus, FaTrash } from "react-icons/fa";
import "../assets/css/UserManagement.css";
import moment from "moment";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loginEvents, setLoginEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false); // ✅ Separate state for Login Events Popup
  const [isAddUserPopupOpen, setIsAddUserPopupOpen] = useState(false); // ✅ Separate state for Add User Popup

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching users");
      setLoading(false);
    }
  };

  const fetchLoginEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/login-events", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setLoginEvents(response.data);
      setIsLoginPopupOpen(true); // ✅ Open login events popup
    } catch (error) {
      console.error("Error fetching login events:", error);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/admin/users/${id}`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      fetchUsers();
    } catch (err) {
      setError("Error updating role");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchUsers();
    } catch (err) {
      setError("Error deleting user");
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/users", newUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setIsAddUserPopupOpen(false); // ✅ Close Add User popup
      setNewUser({ username: "", email: "", password: "", phone: "", role: "user" });
      fetchUsers();
    } catch (err) {
      setError("Error adding user");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-management-container">
      <h1>User Management</h1>
      <div className="button-container"> {/* ✅ Flex container for buttons */}
        <button onClick={fetchLoginEvents} className="view-login-btn">
          View Login Events
        </button>
        <button className="add-user-btn" onClick={() => setIsAddUserPopupOpen(true)}>
          <FaUserPlus /> Add User
        </button>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Last Login</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <select value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value)}>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="user">User</option>
                </select>
              </td>
              <td>{user.lastLogin ? moment(user.lastLogin).format("MM/DD/YYYY HH:mm") : "Never Logged In"}</td>
              <td>
                <button onClick={() => handleDeleteUser(user._id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Add User Popup */}
      {isAddUserPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Add New User</h2>
            <form onSubmit={handleAddUser}>
              <input type="text" placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} required />
              <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
              <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} required />
              <input type="text" placeholder="Phone Number" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} required />
              <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </select>
              <button type="submit">Add User</button>
            </form>
            <button className="popup-close-btn" onClick={() => setIsAddUserPopupOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {/* ✅ Login Events Popup */}
      {isLoginPopupOpen && (
        <div className="popup-overlay full-screen">
          <div className="popup full-screen">
            <button className="popup-close-btn" onClick={() => setIsLoginPopupOpen(false)}>✖</button>
            <h2>Login Events</h2>
            <table className="login-events-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>IP Address</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {loginEvents.map((event) => (
                  <tr key={event._id}>
                    <td>{event.user ? event.user.username : 'Unknown User'}</td>
                    <td>{event.role}</td>
                    <td>{event.ip}</td>
                    <td>{new Date(event.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
