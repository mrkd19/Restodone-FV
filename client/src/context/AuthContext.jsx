import React, { createContext, useState, useEffect, useCallback } from 'react'; // Import necessary modules from React
import axios from 'axios'; // Import axios for making HTTP requests
import io from "socket.io-client"; // ✅ Import WebSockets
const socket = io("http://localhost:5000"); // ✅ Connect to WebSocket server

export const AuthContext = createContext(); // Create a new context for authentication

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // State to store the user's role
  const [loggedInUser, setLoggedInUser] = useState(null); // State to store the logged-in user's username
  const [userId, setUserId] = useState(null); // Store user ID for tracking reservations

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    if (token) {
      fetchUserDetails(token); // Fetch user details if token exists
    }
  }, []); // ✅ Run only once on mount

  const updateToken = useCallback(() => {
    const newToken = localStorage.getItem('token');
    if (newToken) {
      fetchUserDetails(newToken);
    }
  }, []); // ✅ Stable reference

  useEffect(() => {
    window.addEventListener('storage', updateToken); // ✅ Listen for token changes
    return () => window.removeEventListener('storage', updateToken);
  }, [updateToken]); // ✅ Include updateToken in dependency array

  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }, // Set the authorization header with the token
      });
      const { role, username, _id } = response.data; // Destructure role, username, and _id from response data
      setUserRole(role); // Set the user's role
      setLoggedInUser(username); // Set the logged-in user's username
      setUserId(_id); // ✅ Store user ID

      socket.emit("userLoggedIn", _id); // ✅ Notify backend that an admin/user logged in
    } catch (error) {
      console.error('Error fetching user details:', error); // Log any errors
    }
  };

  const login = async (role, username, token) => {
    localStorage.setItem("token", token); // Store token in local storage
    localStorage.setItem("role", role); // Store role in local storage
    localStorage.setItem("username", username); // Store username in local storage
    setUserRole(role); // Set the user's role
    setLoggedInUser(username); // Set the logged-in user's username
  };

  const logout = () => {
    localStorage.clear();
    setUserRole(null);
    setLoggedInUser(null);
    setUserId(null);
    socket.disconnect(); // ✅ Remove user/admin from active users list
    window.location.reload(); // ✅ Ensure UI refresh
  };

  return (
    <AuthContext.Provider value={{ userRole, loggedInUser, userId, login, logout }}> 
      {/* Provide the context values to children */}
      {children} 
      {/* Render children components */}
    </AuthContext.Provider>
  );
};