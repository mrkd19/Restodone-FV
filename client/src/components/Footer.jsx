import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaArrowCircleUp } from 'react-icons/fa';
import '../assets/css/Footer.css'; // Ensure correct import path

const Footer = () => {
  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Sections */}
        <div className="footer-sections">
          {/* Company Info */}
          <div className="footer-column">
            <h3>RestoDone</h3>
            <ul className="footer-links">
              <li><a href="/about">About Us</a></li>
              <li><a href="/food-blog">Food Blog</a></li>
              <li><a href="/contact-us">Contact Us</a></li>
              <li><a href="/careers">Careers</a></li>
            </ul>
          </div>

          {/* Discover */}
          <div className="footer-column">
            <h3>Discover</h3>
            <ul className="footer-links">
              <li><a href="/table-booking">Table Booking</a></li>
              <li><a href="/restaurants-near-me">Restaurants Near Me</a></li>
              <li><a href="/special-offers">Special Offers</a></li>
              <li><a href="/download-app">Download App</a></li>
            </ul>
          </div>

          {/* For You */}
          <div className="footer-column">
            <h3>For You</h3>
            <ul className="footer-links">
              <li><a href="/premium-access">Premium Access</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms-conditions">Terms & Conditions</a></li>
              <li><a href="/refer-earn">Refer & Earn</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h3>Get in Touch</h3>
            <div className="contact-details">
              <FaPhone className="contact-icon" />
              <span>1800 200 300</span>
            </div>
            <div className="social-icons">
              <a href="https://facebook.com"><FaFacebook className="social-icon" /></a>
              <a href="https://twitter.com"><FaTwitter className="social-icon" /></a>
              <a href="https://instagram.com"><FaInstagram className="social-icon" /></a>
              <a href="https://youtube.com"><FaYoutube className="social-icon" /></a>
            </div>
          </div>
        </div>

        {/* Popular Cities */}
        <div className="popular-cities">
          <h4>Popular Cities</h4>
          <p>Mumbai • Delhi • Bangalore • Chennai • Kerala • Kolkata • Hyderabad • Ahmedabad • Jaipur • Goa</p>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>© 2025 RestoDone. All rights reserved.</p>
          <button className="back-to-top" onClick={scrollToTop}>
            Back to top <FaArrowCircleUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
