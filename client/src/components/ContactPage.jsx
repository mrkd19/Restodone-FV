import React from 'react';
import '../assets/css/ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      {/* Page Heading */}
      <h1 className="contact-heading">Contact Us</h1>
      <div className="contact-info">
        {/* Booking related queries */}
        <p className="contact-item">
          <strong>For booking related queries/issues:</strong> Kindly call our 24 hours concierge at <strong>+1 123 456 7890</strong> or mail us at <strong>booking@restodone.com</strong>.
        </p>
        {/* Other queries */}
        <p className="contact-item">
          <strong>For any other query:</strong> Including requests for listing your restaurants on the Restodone platform or opting out of our programs, you can reach us at:
        </p>
        <ul>
          <li>India: <strong>contact.india@restodone.com</strong></li>
          <li>UAE: <strong>contact.uae@restodone.com</strong></li>
          <li>Phone (India & UAE): <strong>+91 9876543210</strong></li>
        </ul>
        {/* Dubai Customers */}
        <p className="contact-item">
          <strong>For Dubai Customers:</strong>
        </p>
        <ul>
          <li><strong>Name of the company:</strong> Restodone Global DMCC</li>
          <li><strong>Email address:</strong> dubai@restodone.com</li>
          <li><strong>Phone number:</strong> +971 555 123 456</li>
          <li><strong>Office Address:</strong></li>
          <li>Unit No: 4587</li>
          <li>DMCC Executive Tower</li>
          <li>Level No 3</li>
          <li>Gold & Diamond Park</li>
          <li>Dubai, United Arab Emirates</li>
        </ul>
      </div>
      {/* Contact Form */}
      <form className="contact-form">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="Enter your name" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" required />

        <label htmlFor="message">Message</label>
        <textarea id="message" rows="5" placeholder="Enter your message"></textarea>

        <button type="submit" className="submit-button">Send Message</button>
      </form>
    </div>
  );
};

export default ContactPage;
