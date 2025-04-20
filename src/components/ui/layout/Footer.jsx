// src/components/ui/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { Instagram, Twitter, Facebook } from 'lucide-react';

/**
 * مكون تذييل الصفحة
 * يحتوي على شعار الموقع، وروابط مفيدة، ووسائل التواصل الاجتماعي
 */
const Footer = () => {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const { isDarkMode } = useTheme();
  
  // الحصول على النص باللغة الحالية
  const getText = (ar, en) => language === 'ar' ? ar : en;
  
  return (
    <footer className={`mt-auto py-8 ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-600'} border-t border-gray-200 dark:border-gray-800`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* الشعار والحقوق */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-2">
              <span className="text-3xl font-bold text-blue-500">ط</span>
              <span className="text-2xl font-bold text-gray-800 dark:text-white">فرة</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
              {getText('© 2025 طفرة تعليمية. جميع الحقوق محفوظة.', '© 2025 Educational Leap. All rights reserved.')}
            </p>
          </div>
          
          {/* وسائل التواصل الاجتماعي */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse mt-4 md:mt-0">
            <div className="text-sm font-medium">
              {getText('تابعنا على السوشيال ميديا', 'Follow us on social media')}
            </div>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>
        
        {/* الروابط المفيدة */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6 text-sm">
          <Link 
            to="/privacy-policy" 
            className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
          >
            {getText('سياسة الخصوصية', 'Privacy Policy')}
          </Link>
          <Link 
            to="/terms" 
            className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
          >
            {getText('شروط الاستخدام', 'Terms of Use')}
          </Link>
          <Link 
            to="/instructions" 
            className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
          >
            {getText('التعليمات', 'Instructions')}
          </Link>
          <button 
            onClick={toggleLanguage}
            className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            {language === 'ar' ? 'English' : 'العربية'}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;