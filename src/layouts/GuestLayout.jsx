// src/layouts/GuestLayout.jsx
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import UnifiedFooter from '../components/common/UnifiedFooter';

/**
 * GuestLayout component
 * Simple layout wrapper without header - individual pages use their own Navbar
 * Now uses the new UnifiedFooter component
 * 
 * @param {Object} props - Component props
 * @param {JSX.Element} props.children - Child components to render
 * @returns {JSX.Element} - Layout component
 */
const GuestLayout = ({ children }) => {
  const { isRTL } = useLanguage();
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header removed - using individual page Navbar instead */}
      
      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* New Unified Footer */}
      <UnifiedFooter />
    </div>
  );
};

export default GuestLayout;
