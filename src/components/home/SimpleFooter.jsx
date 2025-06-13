import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { colors } from '../../utils/colors';

/**
 * مكون Footer بسيط مع اسم إديورا والروابط الاجتماعية
 * @returns {JSX.Element} - مكون Footer البسيط
 */
const SimpleFooter = () => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;

  // السنة الحالية
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${
      isDarkMode 
        ? 'bg-[#1E1E1E] border-[#333333] text-[#E0E0E0]' 
        : 'bg-white border-gray-200 text-[#37474F]'
    } py-6 border-t`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Branding */}
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src="/Group 2.png" 
              alt="LearnNova Logo" 
              className="w-8 h-8 mr-2 object-contain"
            />
            <span className={`text-xl font-bold font-cairo ${
              isDarkMode ? 'text-[#7986CB]' : 'text-[#37474F]'
            }`}>
              LearnNova
            </span>
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a 
              href="#" 
              className={`${
                isDarkMode 
                  ? 'text-[#AAAAAA] hover:text-[#7986CB]' 
                  : 'text-gray-500 hover:text-[#3949AB]'
              } transition-colors p-2`}
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="#" 
              className={`${
                isDarkMode 
                  ? 'text-[#AAAAAA] hover:text-[#7986CB]' 
                  : 'text-gray-500 hover:text-[#3949AB]'
              } transition-colors p-2`}
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="#" 
              className={`${
                isDarkMode 
                  ? 'text-[#AAAAAA] hover:text-[#7986CB]' 
                  : 'text-gray-500 hover:text-[#3949AB]'
              } transition-colors p-2`}
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
          </div>
          
          {/* Copyright */}
          <div className={`text-sm ${
            isDarkMode ? 'text-[#AAAAAA]' : 'text-gray-500'
          }`}>
            {getText(
              `© ${currentYear} ليرننوفا. جميع الحقوق محفوظة`,
              `© ${currentYear} LearnNova. All rights reserved`
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;