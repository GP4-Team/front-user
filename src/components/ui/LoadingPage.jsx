// components/ui/LoadingPage.jsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const LoadingPage = ({ message, subMessage }) => {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  
  const defaultMessage = language === 'ar' ? 'جاري التحميل...' : 'Loading...';
  const defaultSubMessage = language === 'ar' ? 'نرجو الانتظار قليلاً' : 'Please wait a moment';
  
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${
      isDarkMode 
        ? 'bg-gray-900' 
        : 'bg-gray-50'
    }`}>
      <div className="text-center space-y-6">
        {/* Simple Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
        </div>
        
        {/* Main Message */}
        <div className={`text-xl font-medium ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          {message || defaultMessage}
        </div>
        
        {/* Sub Message */}
        <div className={`text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {subMessage || defaultSubMessage}
        </div>
        
        {/* Loading Spinner */}
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;