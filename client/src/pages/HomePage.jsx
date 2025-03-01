import React, { useEffect, useState } from 'react'; // Import React and hooks
import axios from 'axios'; // Import axios for HTTP requests
import HeroSection from '../components/HeroSection'; // Import HeroSection component
import QuickNavigation from '../components/QuickNavigation'; // Import QuickNavigation component
import MoodSection from '../components/MoodSection'; // Import MoodSection component
import FoodTrends from '../components/FoodTrends'; // Import FoodTrends component
import PopularCuisines from '../components/PopularCuisines'; // Import PopularCuisines component
import QuickActions from '../components/QuickActions'; // Import QuickActions component
import HomePageRestaurantCard from '../components/HomePageRestaurantCard'; // Import HomePageRestaurantCard component
import '../assets/css/HomePage.css'; // Import CSS for HomePage

/**
 * HomePage component renders the main layout of the home page. It displays a hero section,
 * quick navigation options, a list of top restaurants, mood selection, food trends, popular
 * cuisines, and quick actions. The component fetches the latest food trends from an API 
 * upon mounting and uses mock data to display restaurant cards. The restaurant data includes 
 * information such as name, image, rating, cuisine type, price range, location, opening/closing 
 * times, description, parking slots, and offers.
 */

const HomePage = () => { // Define HomePage component
  const [trends, setTrends] = useState([]); // State to store food trends

  const mockRestaurants = [ // Mock data for restaurants
    {
      id: 1,
      name: 'Café Kochi', // Restaurant name
      image: 'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=400', // Restaurant image URL
      rating: 4.6, // Restaurant rating
      cuisine: 'Italian', // Type of cuisine
      priceRange: '₹2340', // Price range
      priceNum: 2340,
      location: 'Marine Drive, Kochi', // Location
      open_time: '10:00', // Opening time
      close_time: '23:00', // Closing time
      description: 'A charming café offering authentic Italian cuisine.', // Description
      car_parking_slots: 20, // Number of car parking slots
      discount: '10% off on weekdays',
      menu: {
        starters: ['Bruschetta', 'Caprese Salad'],
        mains: ['Margherita Pizza', 'Spaghetti Carbonara'],
        desserts: ['Tiramisu', 'Panna Cotta'],
        beverages: ['Espresso', 'Cappuccino'],
      },
    },
    {
      id: 2,
      name: 'Ernakulam Bistro', // Restaurant name
      image: 'https://images.pexels.com/photos/1121782/pexels-photo-1121782.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=400', // Restaurant image URL
      rating: 4.5, // Restaurant rating
      cuisine: 'Asian', // Type of cuisine
      priceRange: '₹2000', // Price range
      priceNum: 2000,
      location: 'Ernakulam City Center', // Location
      open_time: '11:00', // Opening time
      close_time: '22:00', // Closing time
      description: 'A bistro with a variety of Asian delicacies.', // Description
      car_parking_slots: 15, // Number of car parking slots
      discount: '20% off on weekends',
      menu: {
        starters: ['Spring Rolls', 'Dumplings'],
        mains: ['Kung Pao Chicken', 'Sweet and Sour Pork'],
        desserts: ['Mango Pudding', 'Sesame Balls'],
        beverages: ['Jasmine Tea', 'Bubble Tea'],
      },
    },
    {
      id: 3,
      name: 'Muvattupuzha Delights', // Restaurant name
      image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=400', // Restaurant image URL
      rating: 4.7, // Restaurant rating
      cuisine: 'Indian', // Type of cuisine
      priceRange: '₹3760', // Price range
      priceNum: 3760,
      location: 'Main Road, Muvattupuzha', // Location
      open_time: '09:00', // Opening time
      close_time: '21:00', // Closing time
      description: 'A delightful Indian restaurant offering rich flavors.', // Description
      car_parking_slots: 25, // Number of car parking slots
      discount: '15% off for groups',
      menu: {
        starters: ['Samosa', 'Paneer Tikka'],
        mains: ['Butter Chicken', 'Chicken Biryani'],
        desserts: ['Gulab Jamun', 'Jalebi'],
        beverages: ['Masala Chai', 'Mango Lassi'],
      },
    },
  ];

  useEffect(() => { // useEffect hook to fetch trends on component mount
    const fetchTrends = async () => { // Async function to fetch trends
      try {
        const response = await axios.get('http://localhost:5000/api/new-trends'); // Fetch trends from API
        console.log('Fetched trends:', response.data); // Log fetched trends
        setTrends(response.data); // Update state with fetched trends
      } catch (error) {
        console.error('Error fetching trends:', error); // Log error if fetching fails
      }
    };

    fetchTrends(); // Call fetchTrends function
  }, []); // Empty dependency array to run effect only once

  return (
    <div className="homepage"> {/* Main container for the home page */}
      <HeroSection /> {/* Hero section for main banner */}
      <QuickNavigation /> {/* Quick navigation buttons */}

      <h1 className="top-restaurants-title">Top Restaurants</h1> {/* Title for top restaurants section */}
      <div className="homepage-restaurant-list"> {/* Grid layout for restaurant cards */}
        {mockRestaurants.map((restaurant, index) => ( // Map over mockRestaurants to render HomePageRestaurantCard components
          <HomePageRestaurantCard
            key={index} // Unique key for each restaurant card
            restaurant={restaurant} // Pass restaurant data as prop
          />
        ))}
      </div>

      <MoodSection /> {/* Mood selection section */}
      <FoodTrends trends={trends} /> {/* Food trends section */}
      <PopularCuisines /> {/* Popular cuisines section */}
      <QuickActions /> {/* Quick actions section */}
    </div>
  );
};

export default HomePage; // Export HomePage component
