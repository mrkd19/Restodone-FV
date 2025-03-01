import React from 'react'; // Import React library
import '../assets/css/FilterOptions.css'; // Import CSS for styling

// Functional component that renders filter options
const FilterOptions = ({ filters, onFilterChange }) => {
  return (
    <div className="filter-options"> {/* Container for filter options */}
      <h4 className="filter-title">Filter By</h4> {/* Title for the filter section */}
      {filters.map((filter, index) => ( // Iterate over each filter
        <div key={index} className="filter-group"> {/* Container for each filter group */}
          <label htmlFor={filter.name} className="filter-label">{filter.label}</label> {/* Label for the filter */}
          <select
            id={filter.name}
            name={filter.name}
            className="filter-select"
            onChange={(e) => onFilterChange(filter.name, e.target.value)} // Handle filter change
          >
            <option value="">All</option> {/* Default option */}
            {filter.options.map((option, i) => ( // Iterate over each option in the filter
              <option key={i} value={option.value}>{option.label}</option> // Render each option
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default FilterOptions; // Export the component
