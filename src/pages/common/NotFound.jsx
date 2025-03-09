// src/pages/common/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const NotFoundPage = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-dark text-dark' : 'bg-bg-light text-text-dark'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
        <h1 className={`text-9xl font-bold ${isDarkMode ? 'text-accent-primary' : 'text-accent-primary'}`}>404</h1>
        <h2 className="text-4xl font-bold mt-8 mb-6">Page Not Found</h2>
        <p className="text-xl max-w-md mb-10">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className={`px-8 py-3 rounded-full ${
            isDarkMode 
              ? 'bg-primary-base hover:bg-primary-light' 
              : 'bg-primary-dark hover:bg-primary-base'
          } text-white font-medium transition-colors duration-300`}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;