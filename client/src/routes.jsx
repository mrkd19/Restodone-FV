import React from 'react'; // Import React
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import necessary components from react-router-dom
import HomePage from './pages/HomePage'; // Import HomePage component
import RestaurantDetailsPage from './pages/RestaurantDetailsPage'; // Import RestaurantDetailsPage component
import ReservationPage from './pages/ReservationPage'; // Import ReservationPage component
import SearchResultsPage from './pages/SearchResultsPage'; // Import SearchResultsPage component
import AboutPage from './pages/AboutPage'; // Import AboutPage component
import Offers from './pages/Offers'; // Import the Offers page

const AppRoutes = () => { // Define AppRoutes component
  return (
    <Router> {/* Wrap Routes in Router */}
      <Routes> {/* Define Routes */}
        <Route path="/" element={<HomePage />} /> {/* Route for HomePage */}
        <Route path="/restaurant/:id" element={<RestaurantDetailsPage />} /> {/* Route for RestaurantDetailsPage */}
        <Route path="/reservation" element={localStorage.getItem("token") ? <ReservationPage /> : <Navigate to="/login" />} /> {/* Route for ReservationPage */}
        <Route path="/search" element={<SearchResultsPage />} /> {/* Route for SearchResultsPage */}
        <Route path="/about" element={<AboutPage />} /> {/* Route for AboutPage */}
        <Route path="/offers" element={<Offers />} /> {/* Add route for Offers page */}
      </Routes>
    </Router>
  );
};

export default AppRoutes; // Export AppRoutes component