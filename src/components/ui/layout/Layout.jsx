// src/components/ui/layout/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * مكون التخطيط الرئيسي للتطبيق
 * يتضمن شريط التنقل والمحتوى الرئيسي وتذييل الصفحة
 */
const Layout = ({ children }) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  
  return (
    <div
      className={`min-h-screen flex flex-col ${isRTL ? 'rtl' : 'ltr'} ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      } ${isRTL ? 'font-tajawal' : 'font-sans'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      lang={language}
    >
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;