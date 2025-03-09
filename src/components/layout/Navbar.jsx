// src/components/navigation/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

// Custom SVG Logo component
const EduaraLogo = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 250" className="h-14 w-auto">
      {/* Simple graduation cap icon with modern muted colors */}
      <path d="M70 140 L150 100 L230 140 L150 180 Z" fill={isDarkMode ? "#607D8B" : "#546E7A"} />
      <line x1="150" y1="180" x2="150" y2="220" stroke={isDarkMode ? "#607D8B" : "#546E7A"} strokeWidth="3" strokeLinecap="round" />
      <circle cx="150" cy="220" r="7" fill={isDarkMode ? "#607D8B" : "#546E7A"} />
      <circle cx="150" cy="140" r="5" fill={isDarkMode ? "#81C784" : "#A5D6A7"} opacity="0.9" />
      
      {/* Simple yet modern wordmark - Eduara only with modern color */}
      <text x="245" y="155" fontFamily="Arial, sans-serif" fontSize="70" fontWeight="bold" fill={isDarkMode ? "#ECEFF1" : "#455A64"}>Eduara</text>
      
      {/* Enhanced accent line - subtle complementary color */}
      <line x1="245" y1="175" x2="340" y2="175" stroke={isDarkMode ? "#81C784" : "#A5D6A7"} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
};

const Navbar = () => {
  const { toggleTheme, isDarkMode } = useTheme();
  
  return (
    <header className="bg-white dark:bg-dark-card shadow-md py-3 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <EduaraLogo />
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-8">
            <li className="relative group">
              <Link to="#" className="flex items-center text-text-dark dark:text-dark font-medium hover:text-primary-base dark:hover:text-primary-lightest transition-colors">
                Educational Stages
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </li>
            <li className="relative group">
              <Link to="#" className="flex items-center text-text-dark dark:text-dark font-medium hover:text-primary-base dark:hover:text-primary-lightest transition-colors">
                Study Subjects
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </li>
            <li>
              <Link to="/instructions" className="text-text-dark dark:text-dark font-medium hover:text-primary-base dark:hover:text-primary-lightest transition-colors">
                Instructions
              </Link>
            </li>
            <li>
              <Link to="/leaderboard" className="text-text-dark dark:text-dark font-medium hover:text-primary-base dark:hover:text-primary-lightest transition-colors">
                Leaderboard
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Actions Area */}
        <div className="flex items-center space-x-4">
          {/* Search Box */}
          <div className="hidden md:flex items-center bg-bg-light dark:bg-primary-dark rounded-full px-3 py-1">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none focus:outline-none text-sm w-36 dark:text-dark dark:placeholder-primary-lightest"
            />
            <button type="submit" className="text-primary-base dark:text-primary-lightest">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="p-1 focus:outline-none text-primary-base dark:text-primary-lightest"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          
          {/* Login Button */}
          {/* <Link 
            to="/auth"
            className="flex items-center text-primary-base dark:text-primary-lightest font-medium hover:text-primary-dark dark:hover:text-white transition-colors"
          >
            <span className="mr-1">→</span> Login
          </Link> */}
          
          {/* Join Button */}
          <Link 
            to="/auth"
            className="bg-accent-primary dark:bg-accent-secondary text-text-dark dark:text-text-dark font-bold py-2 px-5 rounded-full border-2 border-dashed border-primary-dark dark:border-primary-lightest border-opacity-20 dark:border-opacity-20 hover:bg-accent-secondary dark:hover:bg-accent-primary transition-colors"
          >
            Join us!
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;