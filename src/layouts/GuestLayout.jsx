// src/layouts/GuestLayout.jsx
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useTenant } from '../contexts/TenantContext';

/**
 * GuestLayout component
 * Simple layout wrapper without header - individual pages use their own Navbar
 * 
 * @param {Object} props - Component props
 * @param {JSX.Element} props.children - Child components to render
 * @returns {JSX.Element} - Layout component
 */
const GuestLayout = ({ children }) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const { tenant } = useTenant();

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header removed - using individual page Navbar instead */}
      
      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className={`py-4 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm">
            <p>&copy; {new Date().getFullYear()} {tenant.name || 'Eduara'}. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GuestLayout;
