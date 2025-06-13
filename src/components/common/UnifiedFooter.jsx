import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

const UnifiedFooter = () => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const isArabic = language === 'ar';
  
  // Helper function to get text based on language
  const getText = (ar, en) => isArabic ? ar : en;

  return (
    <footer className={`py-8 px-4 border-t ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <img 
              src="/Group 2.png" 
              alt="LearnNova Logo" 
              className="h-8 w-auto"
            />
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {getText("ليرننوفا", "LearnNova")}
            </h2>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:underline ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {getText("من نحن", "About Us")}
            </Link>
            
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors hover:underline ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {getText("اتصل بنا", "Contact Us")}
            </Link>
            
            <Link 
              to="/privacy" 
              className={`text-sm font-medium transition-colors hover:underline ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {getText("سياسة الخصوصية", "Privacy Policy")}
            </Link>
            
            <Link 
              to="/terms" 
              className={`text-sm font-medium transition-colors hover:underline ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {getText("شروط الاستخدام", "Terms of Service")}
            </Link>
          </div>
        </div>
        
        {/* Divider */}
        <div className={`my-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
        
        {/* Copyright */}
        <div className="text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {getText(
              "© 2025 ليرننوفا. جميع الحقوق محفوظة - منصة تعليمية متطورة لجميع المراحل الدراسية", 
              "© 2025 LearnNova. All rights reserved - Advanced educational platform for all academic levels"
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default UnifiedFooter;
