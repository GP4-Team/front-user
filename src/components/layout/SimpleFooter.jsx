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
              <img 
                src="/Group 2.png" 
                alt="LearnNova Logo" 
                className="w-5 h-5 object-contain"
              />
            </div>
            <p className="text-sm">
              &copy; {currentYear} LearnNova. {isArabic ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
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
