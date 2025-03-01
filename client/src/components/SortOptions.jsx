// Import React library
import React from 'react';
// Import CSS for styling
import '../assets/css/SortOptions.css';

// Define the SortOptions functional component
const SortOptions = ({ options, onSortChange }) => {
  return (
    // Container div for sort options
    <div className="sort-options">
      {/* Title for the sort options */}
      <h4 className="sort-title">Sort By</h4>
      {/* Dropdown select for sorting */}
      <select
        className="sort-select"
        // Handle change event to trigger onSortChange callback
        onChange={(e) => onSortChange(e.target.value)}
      >
        {/* Default option */}
        <option value="">Select</option>
        {/* Map through options and create an option element for each */}
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

// Export the SortOptions component as default
export default SortOptions;
