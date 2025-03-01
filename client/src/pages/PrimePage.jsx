import React from "react"; // Import React
import { FaCheck, FaStar, FaMapMarkerAlt, FaGift, FaChevronRight } from "react-icons/fa"; // Import icons
import "../assets/css/PrimePage.css"; // Import CSS for styling

/**
 * The PrimePage component renders the main page for the RestoDone Prime feature.
 *
 * It renders a hero banner with a heading, subtitle, and description, followed by
 * a section to select a membership plan, a section to explain how the feature
 * works, and a section to display featured restaurants that support Prime.
 *
 * The component does not accept any props.
 */

function PrimePage() {
  return (
    <div className="prime-page">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="highlight-text">Resto</span>Done
            <span className="prime-text"> PRIME</span>
          </h1>
          <p className="hero-subtitle">
            Guaranteed <span className="highlight-text">25% OFF</span>
          </p>
          <p className="hero-description">DINE LIKE A VIP</p>
        </div>
      </div>

      {/* Membership Plans */}
      <div className="membership-section">
        <h2 className="section-title">Select a Membership Plan</h2>
        <div className="plans-container">
          <PlanCard months={1} price={149} isPopular={false} /> {/* 1-month plan */}
          <PlanCard months={12} price={999} isPopular={true} /> {/* 12-month plan */}
          <PlanCard months={3} price={399} isPopular={false} /> {/* 3-month plan */}
        </div>
      </div>

      {/* How It Works */}
      <div className="how-it-works-section">
        <h2 className="section-title">It's Super Easy to Use!</h2>
        <div className="steps-container">
          <StepCard title="Step 1" description="Become a Prime Member" icon={<FaStar />} /> {/* Step 1 */}
          <StepCard title="Step 2" description="Book a restaurant with a Prime tag" icon={<FaMapMarkerAlt />} /> {/* Step 2 */}
          <StepCard title="Step 3" description="Show your Prime tag at the restaurant" icon={<FaGift />} /> {/* Step 3 */}
          <StepCard title="Step 4" description="Get your bill with an instant discount" icon={<FaCheck />} /> {/* Step 4 */}
        </div>
      </div>

      {/* Featured Restaurants */}
      <div className="featured-section">
        <h2 className="section-title">Explore Prime Restaurants and Bars</h2>
        <div className="restaurants-container">
          <RestaurantCard name="Latest Recipe" location="Le Meridien, Kochi" discount={25} /> {/* Restaurant 1 */}
          <RestaurantCard name="Theravadu Multi-Cuisine" location="Crown Plaza, Kochi" discount={25} /> {/* Restaurant 2 */}
          <RestaurantCard name="Hey Punjab" location="MG Road, Kochi" discount={25} /> {/* Restaurant 3 */}
        </div>
      </div>
    </div>
  );
}

/**
 * PlanCard component
 *
 * @param {number} months Number of months in the plan
 * @param {number} price Price of the plan
 * @param {boolean} isPopular Whether this plan is the most popular one
 * @returns {JSX.Element} Rendered PlanCard component
 */
function PlanCard({ months, price, isPopular }) {
  return (
    <div className={`plan-card ${isPopular ? "popular-plan" : ""}`}> {/* Plan card */}
      {isPopular && <div className="badge">Best Value</div>} {/* Badge for popular plan */}
      <h3>{months} Month{months > 1 ? "s" : ""}</h3> {/* Plan duration */}
      <p className="price">₹{price}</p> {/* Plan price */}
      <button className="proceed-button">Proceed</button> {/* Proceed button */}
    </div>
  );
}

/**
 * StepCard
 *
 * This component renders a step in a process, displaying an icon, title, and description.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title of the step.
 * @param {string} props.description - A brief description of the step.
 * @param {JSX.Element} props.icon - An icon representing the step.
 *
 * @returns {JSX.Element} The rendered step card component.
 */

function StepCard({ title, description, icon }) {
  return (
    <div className="step-card"> {/* Step card */}
      <div className="step-icon">{icon}</div> {/* Step icon */}
      <h3>{title}</h3> {/* Step title */}
      <p>{description}</p> {/* Step description */}
    </div>
  );
}

/**
 * RestaurantCard
 *
 * This component renders a card displaying information about a restaurant. 
 * It includes the restaurant's name, location, and the discount percentage offered.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.name - The name of the restaurant.
 * @param {string} props.location - The location of the restaurant.
 * @param {number} props.discount - The discount percentage offered by the restaurant.
 * 
 * @returns {JSX.Element} The rendered restaurant card component.
 */

function RestaurantCard({ name, location, discount }) {
  return (
    <div className="restaurant-card"> {/* Restaurant card */}
      <h3>{name}</h3> {/* Restaurant name */}
      <p>{location}</p> {/* Restaurant location */}
      <div className="discount-section">
        <span>{discount}% OFF</span> {/* Discount */}
        <button className="book-now-button">Book Now <FaChevronRight /></button> {/* Book now button */}
      </div>
    </div>
  );
}

export default PrimePage; // Export component

