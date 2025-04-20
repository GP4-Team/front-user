import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * مكون Footer بسيط مع اسم إديورا والروابط الاجتماعية
 * @returns {JSX.Element} - مكون Footer البسيط
 */
const SimpleFooter = () => {
  const { language } = useLanguage();
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;

  // السنة الحالية
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Branding */}
          <div className="flex items-center mb-4 md:mb-0">
            <svg className="w-8 h-8 mr-2" viewBox="0 0 36 36">
              <path d="M10 18 L18 12 L26 18 L18 24 Z" fill="#3949AB" />
              <line x1="18" y1="24" x2="18" y2="28" stroke="#3949AB" strokeWidth="2" />
            </svg>
            <span className="text-xl font-bold font-cairo text-[#37474F]">
              Eduara
            </span>
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a 
              href="#" 
              className="text-gray-500 hover:text-[#3949AB] transition-colors p-2"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-[#3949AB] transition-colors p-2"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-[#3949AB] transition-colors p-2"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-sm text-gray-500">
            {getText(
              `© ${currentYear} إديورا. جميع الحقوق محفوظة`,
              `© ${currentYear} Eduara. All rights reserved`
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;