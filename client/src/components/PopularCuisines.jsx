import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/PopularCuisines.css';

const PopularCuisines = () => {
  const navigate = useNavigate();

  // Array of popular cuisines with name and image
  const cuisines = [
    {
      name: "Italian", // Cuisine name
      image: "https://images.unsplash.com/photo-1498579397066-22750a3cb424?w=800&auto=format&fit=crop" // Cuisine image
    },
    {
      name: "Indian", // Cuisine name
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop" // Cuisine image
    },
    {
      name: "Chinese", // Cuisine name
      image: "https://images.unsplash.com/photo-1541696490-8744a5dc0228?w=800&auto=format&fit=crop" // Cuisine image
    },
    {
      name: "Japanese", // Cuisine name
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&auto=format&fit=crop" // Cuisine image
    }
  ];

  const handleCuisineClick = (cuisine) => {
    navigate(`/restaurants?cuisine=${cuisine}`);
  };

  return (
    <section className="popular-cuisines"> {/* Section container for popular cuisines */}
      <h2>Popular Cuisines</h2> {/* Section heading */}
      <div className="cuisines-grid"> {/* Grid container for cuisine cards */}
        {cuisines.map((cuisine, index) => {
          console.log(`Rendering cuisine card: ${cuisine.name}`); // Log each cuisine being rendered
          return (
            <div key={index} className="cuisine-card" onClick={() => handleCuisineClick(cuisine.name)}> {/* Individual card for each cuisine */}
              <img src={cuisine.image} alt={cuisine.name} className="cuisine-image" /> {/* Cuisine image */}
              <h3>{cuisine.name}</h3> {/* Cuisine name */}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PopularCuisines;
