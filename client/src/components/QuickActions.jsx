import React, { useState } from 'react'; // Import React and useState hook
import { FaCalendarAlt, FaClock, FaUsers, FaGift } from 'react-icons/fa'; // Import icons from react-icons
import BookingModal from './BookingModal'; // Import BookingModal component
import '../assets/css/QuickActions.css'; // Import CSS for QuickActions

const QuickActions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [activeAction, setActiveAction] = useState(null); // State to manage the active action type

  const actions = [
    { icon: <FaCalendarAlt size={24} />, label: 'Reserve for Later', type: 'future' }, // Action for future reservations
    { icon: <FaClock size={24} />, label: 'Book for Today', type: 'today' }, // Action for today's bookings
    { icon: <FaUsers size={24} />, label: 'Group Booking', type: 'group' }, // Action for group bookings
    { icon: <FaGift size={24} />, label: 'Special Occasions', type: 'special' }, // Action for special occasions
  ];

  const handleActionClick = (type) => {
    setActiveAction(type); // Set the active action type
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setActiveAction(null); // Reset the active action type
  };

  return (
    <section className="quick-actions"> {/* Section container for quick actions */}
      <h2>Quick Actions</h2> {/* Section heading */}
      <div className="actions-grid"> {/* Grid container for action cards */}
        {actions.map((action, index) => (
          <div
            key={index} // Unique key for each action card
            className="action-card" // Class for styling action cards
            onClick={() => handleActionClick(action.type)} // Click handler for action cards
          >
            {action.icon} {/* Icon representing the action */}
            <span>{action.label}</span> {/* Label for the action */}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <BookingModal
          isOpen={isModalOpen} // Prop to control modal visibility
          onClose={handleCloseModal} // Prop for closing the modal
          type={activeAction} // Prop to pass the active action type
        />
      )}
    </section>
  );
};

export default QuickActions; // Export the QuickActions component

