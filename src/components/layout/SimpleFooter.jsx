import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const SimpleFooter = () => {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer 
      className={`py-6 px-4 ${
        isDarkMode 
          ? 'bg-background-card-dark text-neutral-400' 
          : 'bg-background-card-light text-neutral-600'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className={`${isDarkMode ? 'bg-neutral-800' : 'bg-white'} rounded-full h-8 w-8 flex items-center justify-center mr-2 rtl:ml-2 rtl:mr-0 shadow-sm`}>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 2L5 6V10C5 15.5 8.1 20.6 12 22C15.9 20.6 19 15.5 19 10V6L12 2ZM16 10C16 14.1 13.9 18 12 19.5C10.1 18 8 14.1 8 10V7.3L12 5L16 7.3V10Z" 
                  fill={isDarkMode ? "#7986CB" : "#3949AB"} 
                />
                <path 
                  d="M11 10H13V16H11V10ZM11 6H13V8H11V6Z" 
                  fill={isDarkMode ? "#7986CB" : "#3949AB"} 
                />
              </svg>
            </div>
            <p className="text-sm">
              &copy; {currentYear} Eduara. {isArabic ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
            </p>
          </div>
          
          <div className="flex space-x-4 rtl:space-x-reverse text-sm">
            <Link 
              to="/about" 
              className={`hover:${isDarkMode ? 'text-primary-light' : 'text-primary-base'}`}
            >
              {isArabic ? 'من نحن' : 'About'}
            </Link>
            <Link 
              to="/privacy" 
              className={`hover:${isDarkMode ? 'text-primary-light' : 'text-primary-base'}`}
            >
              {isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <Link 
              to="/terms" 
              className={`hover:${isDarkMode ? 'text-primary-light' : 'text-primary-base'}`}
            >
              {isArabic ? 'شروط الاستخدام' : 'Terms of Service'}
            </Link>
            <Link 
              to="/contact" 
              className={`hover:${isDarkMode ? 'text-primary-light' : 'text-primary-base'}`}
            >
              {isArabic ? 'اتصل بنا' : 'Contact'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
