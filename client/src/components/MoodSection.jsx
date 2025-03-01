import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaUsers, FaCoffee, FaMoon } from 'react-icons/fa';
import '../assets/css/MoodSection.css';

const MoodSection = () => {
  const navigate = useNavigate(); // Hook for navigation

  const moods = [
    { icon: <FaHeart size={24} />, label: 'Romantic', description: 'Perfect for date night' }, // Romantic mood option
    { icon: <FaUsers size={24} />, label: 'Family', description: 'Group-friendly places' }, // Family mood option
    { icon: <FaCoffee size={24} />, label: 'Casual', description: 'Relaxed atmosphere' }, // Casual mood option
    { icon: <FaMoon size={24} />, label: 'Fine Dining', description: 'Special occasions' }, // Fine Dining mood option
  ];

  const handleMoodClick = (mood) => {
    navigate(`/restaurants?mood=${mood}`); // Navigate to restaurants page with selected mood
  };

  return (
    <section className="mood-section"> {/* Section for dining mood options */}
      <h2>What's Your Dining Mood?</h2> {/* Section heading */}
      <div className="mood-grid"> {/* Grid container for mood options */}
        {moods.map((mood, index) => {
          console.log(`Rendering mood card: ${mood.label}`); // Log each mood card rendering
          return (
            <div key={index} className="mood-card" onClick={() => handleMoodClick(mood.label)}> {/* Individual card for each mood */}
              {mood.icon} {/* Icon representing the mood */}
              <h3>{mood.label}</h3> {/* Label for the mood */}
              <p>{mood.description}</p> {/* Description for the mood */}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MoodSection;