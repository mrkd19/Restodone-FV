import React from 'react';
import '../assets/css/Pagination.css'; // Ensure correct import path

// Pagination component to handle page navigation
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Function to generate the page numbers to be displayed
  const getPages = () => {
    const pages = [];
    if (currentPage > 1) {
      pages.push('«'); // Previous page indicator
    }
    pages.push(1); // First page

    if (currentPage > 3) {
      pages.push('...'); // Ellipsis for skipped pages
    }

    // Generate page numbers around the current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...'); // Ellipsis for skipped pages
    }

    pages.push(totalPages); // Last page

    if (currentPage < totalPages) {
      pages.push('»'); // Next page indicator
    }

    return pages;
  };

  // Function to handle page click events
  const handleClick = (page) => {
    if (page === '«') {
      onPageChange(currentPage - 1); // Go to previous page
    } else if (page === '»') {
      onPageChange(currentPage + 1); // Go to next page
    } else if (page !== '...') {
      onPageChange(page); // Go to specific page
    }
  };

  return (
    <div className="pagination-container">
      {getPages().map((page, index) => (
        <button
          key={index}
          className={`pagination-button ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
          onClick={() => handleClick(page)}
          disabled={page === '...' || page === currentPage}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;