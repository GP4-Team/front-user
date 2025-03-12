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
      <path d="M70 140 L150 100 L230 140 L150 180 Z" fill={isDarkMode ? "#3949AB" : "#1A237E"} />
      <line x1="150" y1="180" x2="150" y2="220" stroke={isDarkMode ? "#3949AB" : "#1A237E"} strokeWidth="3" strokeLinecap="round" />
      <circle cx="150" cy="220" r="7" fill={isDarkMode ? "#3949AB" : "#1A237E"} />
      <circle cx="150" cy="140" r="5" fill={isDarkMode ? "#FFC107" : "#FFC107"} opacity="0.9" />
      
      {/* Simple yet modern wordmark - Eduara only with modern color */}
      <text x="245" y="155" fontFamily="Arial, sans-serif" fontSize="70" fontWeight="bold" fill={isDarkMode ? "#FFFFFF" : "#37474F"}>Eduara</text>
      
      {/* Enhanced accent line - subtle complementary color */}
      <line x1="245" y1="175" x2="340" y2="175" stroke={isDarkMode ? "#FFC107" : "#FFC107"} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
};

const Navbar = () => {
  const { toggleTheme, isDarkMode } = useTheme();
  const [language, setLanguage] = React.useState('ar'); // Default to Arabic
  
  // Toggle between Arabic and English
  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };
  
  // Apply RTL direction for Arabic
  React.useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);
  
  return (
    <header className="bg-white dark:bg-dark-card shadow-md py-3 sticky top-0 z-50 transition-colors duration-200" dir={language === 'ar' ? 'rtl' : 'ltr'}>
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
              <Link to="/courses" className="flex items-center text-text-dark dark:text-dark font-medium hover:text-primary-base dark:hover:text-primary-lightest transition-colors">
                {language === 'ar' ? 'المقررات' : 'Courses'}
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${language === 'ar' ? 'mr-1' : 'ml-1'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </li>
            <li className="relative group">
              <Link to="/exams" className="flex items-center text-text-dark dark:text-dark font-medium hover:text-primary-base dark:hover:text-primary-lightest transition-colors">
                {language === 'ar' ? 'الامتحانات' : 'Exams'}
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${language === 'ar' ? 'mr-1' : 'ml-1'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Actions Area */}
        <div className="flex items-center space-x-4">
          {/* Search Box */}
          <div className="hidden md:flex items-center bg-f0f4f8 dark:bg-primary-dark rounded-full px-3 py-1">
            <input
              type="text"
              placeholder={language === 'ar' ? "بحث..." : "Search..."}
              className="bg-transparent border-none focus:outline-none text-sm w-36 dark:text-dark dark:placeholder-primary-lightest"
            />
            <button type="submit" className="text-primary-base dark:text-primary-lightest">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          
          {/* Language Toggle */}
          <button 
            onClick={toggleLanguage} 
            className="p-1 focus:outline-none text-3949ab dark:text-7986cb"
            aria-label={language === 'ar' ? "Switch to English" : "التبديل إلى العربية"}
          >
            {language === 'ar' ? 'EN' : 'عربي'}
          </button>
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="p-1 focus:outline-none text-3949ab dark:text-7986cb"
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
          
          {/* Join Button */}
          <Link 
            to="/auth"
            className="bg-ffc107 dark:bg-ffc107 text-37474f dark:text-37474f font-bold py-2 px-5 rounded-full border-2 border-dashed border-1a237e dark:border-7986cb border-opacity-20 dark:border-opacity-20 hover:bg-ffca28 dark:hover:bg-ffca28 transition-colors"
          >
            {language === 'ar' ? 'انضم إلينا!' : 'Join us!'}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;