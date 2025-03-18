// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const EduaraLogo = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200" className="h-12 w-auto">
      {/* Simple graduation cap icon - with modern muted colors */}
      <path d="M70 90 L110 70 L150 90 L110 110 Z" fill={isDarkMode ? "#607D8B" : "#546E7A"} />
      <line x1="110" y1="110" x2="110" y2="130" stroke={isDarkMode ? "#607D8B" : "#546E7A"} strokeWidth="3" strokeLinecap="round" />
      <circle cx="110" cy="130" r="4" fill={isDarkMode ? "#607D8B" : "#546E7A"} />
      <circle cx="110" cy="90" r="3" fill={isDarkMode ? "#81C784" : "#A5D6A7"} opacity="0.9" />
      
      {/* Simple yet modern wordmark - Eduara only with modern color */}
      <text x="170" y="105" fontFamily="Arial, sans-serif" fontSize="42" fontWeight="bold" fill={isDarkMode ? "#ECEFF1" : "#455A64"}>Eduara</text>
      
      {/* Enhanced accent line - subtle complementary color */}
      <line x1="170" y1="120" x2="240" y2="120" stroke={isDarkMode ? "#81C784" : "#A5D6A7"} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};

const Footer = ({ language = 'en' }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <footer className={`${isDarkMode ? 'bg-primary-dark' : 'bg-gray-100'} pt-16 pb-6 relative transition-colors duration-300`}>
      {/* Wave pattern at the top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg className="w-full" height="30" viewBox="0 0 1200 30" preserveAspectRatio="none">
          <path 
            d="M0,0 C100,10 200,25 300,20 C400,15 500,5 600,10 C700,15 800,25 900,20 C1000,15 1100,5 1200,10 L1200,30 L0,30 Z" 
            fill={isDarkMode ? '#263238' : '#fff'}
            className="transition-colors duration-300"
          />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          {/* Logo */}
          <div className="mb-8 md:mb-0">
            <Link to="/">
              <EduaraLogo />
            </Link>
          </div>
          
          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            <div className={`${isDarkMode ? 'text-dark' : 'text-gray-800'} font-medium ml-2 transition-colors duration-300`}>
              {language === 'ar' ? 'تابعنا على السوشيال ميديا' : 'Follow us on social media'}
            </div>
            
            <a href="#" className={`w-9 h-9 rounded-full ${isDarkMode ? 'bg-primary-light hover:bg-primary-lightest' : 'bg-white hover:bg-gray-50'} flex items-center justify-center shadow-sm transition-colors duration-300`}>
              <svg className={`w-5 h-5 ${isDarkMode ? 'text-dark' : 'text-gray-700'} transition-colors duration-300`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            
            <a href="#" className={`w-9 h-9 rounded-full ${isDarkMode ? 'bg-primary-light hover:bg-primary-lightest' : 'bg-white hover:bg-gray-50'} flex items-center justify-center shadow-sm transition-colors duration-300`}>
              <svg className={`w-5 h-5 ${isDarkMode ? 'text-dark' : 'text-gray-700'} transition-colors duration-300`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            
            <a href="#" className={`w-9 h-9 rounded-full ${isDarkMode ? 'bg-primary-light hover:bg-primary-lightest' : 'bg-white hover:bg-gray-50'} flex items-center justify-center shadow-sm transition-colors duration-300`}>
              <svg className={`w-5 h-5 ${isDarkMode ? 'text-dark' : 'text-gray-700'} transition-colors duration-300`} fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* Bottom bar with copyright and links */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-200 dark:border-primary-light pt-6">
          <div className={`text-sm ${isDarkMode ? 'text-primary-lightest' : 'text-gray-500'} mb-4 md:mb-0 flex items-center transition-colors duration-300`}>
            © 2025 Eduara. All rights reserved.
            <span className="ml-2 text-accent-primary" aria-hidden="true">
              <svg className={`inline-block w-5 h-5 ${isDarkMode ? 'text-accent-secondary' : 'text-accent-primary'} transition-colors duration-300`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/privacy" className={`text-sm ${isDarkMode ? 'text-primary-lightest hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-300`}>
              Privacy Policy
            </Link>
            <Link to="/terms" className={`text-sm ${isDarkMode ? 'text-primary-lightest hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-300`}>
              Terms of Use
            </Link>
            <Link to="/instructions" className={`text-sm ${isDarkMode ? 'text-primary-lightest hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-300`}>
              Instructions
            </Link>
            
            {/* Language selector */}
            <div className="relative">
              <select 
                className={`appearance-none ${isDarkMode ? 'bg-primary-base text-white' : 'bg-primary-base text-white'} py-1 pl-3 pr-8 rounded-md text-sm transition-colors duration-300`}
                defaultValue="english"
              >
                <option value="english">ENGLISH</option>
                <option value="arabic">العربية</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;