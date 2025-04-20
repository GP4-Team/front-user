import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const FooterSection = () => {
  const { language } = useLanguage();
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;

  return (
    <footer className="bg-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Top wave pattern */}
        <div className="w-full mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
            <path fill="#f0f7ff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,90.7C640,96,800,96,960,85.3C1120,75,1280,53,1360,42.7L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
          </svg>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8">
          {/* Logo and social */}
          <div className="mb-8 md:mb-0 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end mb-4">
              <h2 className="text-2xl font-bold text-blue-500">
                {getText("طفرة", "Tafra")}
              </h2>
            </div>
            
            <div className="flex items-center justify-center md:justify-end space-x-4">
              <span className="text-gray-600 text-sm">
                {getText("تابعنا على السوشيال ميديا", "Follow us on social media")}
              </span>
              <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          {/* Footer links */}
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors text-sm">
              {getText("سياسة الخصوصية", "Privacy Policy")}
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors text-sm">
              {getText("شروط الاستخدام", "Terms of Use")}
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors text-sm">
              {getText("التعليمات", "Instructions")}
            </a>
            <div className="relative">
              <select 
                className="appearance-none bg-blue-900 text-white px-3 py-1 rounded text-sm font-medium pr-8"
                defaultValue="ar"
              >
                <option value="ar">{getText("العربية", "Arabic")}</option>
                <option value="en">{getText("الإنجليزية", "English")}</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            {getText("© 2025 طفرة تعليمية. جميع الحقوق محفوظة", "© 2025 Tafra Educational. All rights reserved")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;