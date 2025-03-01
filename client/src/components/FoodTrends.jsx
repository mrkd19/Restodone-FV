import React from 'react';
import '../assets/css/FoodTrends.css';

const FoodTrends = () => {
  // Array of food trends, each with a title, image URL, and description
  const trends = [
    {
      title: "Farm to Table", // Trend title
      image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&auto=format&fit=crop", // Image URL for the trend
      description: "Experience organic and locally sourced cuisine", // Description of the trend
    },
    {
      title: "Modern Fusion", // Trend title
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&auto=format&fit=crop", // Image URL for the trend
      description: "Where tradition meets innovation", // Description of the trend
    },
    {
      title: "Authentic Regional", // Trend title
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop", // Image URL for the trend
      description: "Discover local flavors and specialties", // Description of the trend
    },
  ];

  return (
    <section className="food-trends"> {/* Section container for the entire food trends component */}
      <h2>Current Food Trends</h2> {/* Heading for the section */}
      <div className="trends-grid"> {/* Container that organizes trend cards in a grid layout */}
        {trends.map((trend, index) => {
          console.log(`Rendering trend card: ${trend.title}`); // Log trend title during rendering
          return (
            <div key={index} className="trend-card"> {/* Individual card for each trend */}
              <img 
                src={trend.image} 
                alt={trend.title} 
                className="trend-image" 
                onLoad={() => console.log(`Image loaded for trend: ${trend.title}`)} // Log when the image loads
              /> {/* Image representing the trend with descriptive alt text */}
              <div className="trend-info"> {/* Container for the title and description */}
                <h3>{trend.title}</h3> {/* Display the trend title */}
                <p>{trend.description}</p> {/* Display the trend description */}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FoodTrends;
