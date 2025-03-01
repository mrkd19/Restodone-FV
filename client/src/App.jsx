import React from 'react'; // Removed useContext since it's not used
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components from react-router-dom
import { AuthProvider } from './context/AuthContext'; // Removed AuthContext since it's not used
import Header from './components/Header'; // Import Header component
import HomePage from './pages/HomePage'; // Import HomePage component
import LoginPage from './pages/LoginPage'; // Import LoginPage component
import SignupPage from './pages/SignupPage'; // Import SignupPage component
import AdminPage from './pages/AdminPage'; // Import AdminPage component
import RestaurantPage from './pages/RestaurantPage'; // Import RestaurantPage component
import ProfilePage from './pages/ProfilePage'; // Import ProfilePage component
import RestaurantDetails from './components/RestaurantDetails'; // Import RestaurantDetails component
import PrimePage from './pages/PrimePage'; // Import PrimePage component
import Footer from './components/Footer'; // Import Footer component
import ContactPage from './components/ContactPage'; // Import ContactPage component
import ReservationPage from './pages/ReservationPage'; // Import ReservationPage

const App = () => {
  return (
    <AuthProvider> {/* Wrap the application with AuthProvider for authentication context */}
      <Router> {/* Wrap the application with Router for routing */}
        <Header /> {/* Render the Header component */}
        <div className="content"> {/* Main content area */}
          <Routes> {/* Define the routes for the application */}
            <Route exact path="/" element={<HomePage />} /> {/* Route for HomePage */}
            <Route path="/login" element={<LoginPage />} /> {/* Route for LoginPage */}
            <Route path="/signup" element={<SignupPage />} /> {/* Route for SignupPage */}
            <Route path="/admin" element={<AdminPage />} /> {/* Route for AdminPage */}
            <Route path="/restaurants" element={<RestaurantPage />} /> {/* Route for RestaurantPage */}
            <Route path="/profile" element={<ProfilePage />} /> {/* Route for ProfilePage */}
            <Route path="/restaurant/:id" element={<RestaurantDetails />} /> {/* Route for RestaurantDetails */}
            <Route path="/prime" element={<PrimePage />} /> {/* Route for PrimePage */}
            <Route path="/contact" element={<ContactPage />} /> {/* Route for ContactPage */}
            <Route path="/reservations" element={<ReservationPage />} /> {/* Add Reservations route */}
          </Routes>
        </div>
        <Footer /> {/* Render the Footer component */}
      </Router>
    </AuthProvider>
  );
};

export default App; // Export the App component as the default export



