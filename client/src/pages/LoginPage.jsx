import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SignInForm from '../components/SignInForm';

const LoginPage = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // ✅ Now used properly
  const { login } = useContext(AuthContext);

  const handleSubmit = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      console.log("Login Response:", response.data); // ✅ Debugging

      const { token, role, username } = response.data;

      if (response.data.message === "Login successful") {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", username);
        login(role, username, token);
        navigate("/"); // ✅ Redirect to home page instead of full refresh
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      setMessage(error.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div>
      <SignInForm onSubmit={handleSubmit} />
      {message && <p>{message}</p>}
      <p>
        If you are not signed up, <Link to="/signup">click here</Link> to sign up.
      </p>
    </div>
  );
};

export default LoginPage;
