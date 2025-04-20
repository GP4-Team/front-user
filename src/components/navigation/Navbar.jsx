import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Menu, X, Sun, Moon, Search, Globe, ChevronDown, Home, BookOpen, GraduationCap, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { colors } from '../../utils/colors';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, toggleLanguage, isRTL } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // تتبع التمرير لتغيير خلفية الـ navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // إغلاق القائمة عند الانتقال بين الصفحات
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isDarkMode 
        ? (isScrolled ? 'bg-[#121212] shadow-md' : 'bg-[#1E1E1E] text-white') 
        : (isScrolled ? 'bg-white shadow-md' : `bg-[${colors.primaryBase}] text-white`)
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className={`${isDarkMode ? 'bg-[#333333]' : 'bg-white'} rounded-full h-8 w-8 flex items-center justify-center mr-2`}>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 2L5 6V10C5 15.5 8.1 20.6 12 22C15.9 20.6 19 15.5 19 10V6L12 2ZM16 10C16 14.1 13.9 18 12 19.5C10.1 18 8 14.1 8 10V7.3L12 5L16 7.3V10Z" 
                  fill={isDarkMode ? colors.primaryLight : colors.primaryBase} 
                />
                <path 
                  d="M11 10H13V16H11V10ZM11 6H13V8H11V6Z" 
                  fill={isDarkMode ? colors.primaryLight : colors.primaryBase} 
                />
              </svg>
            </div>
            <span className={`font-bold text-xl ${
              isDarkMode 
                ? 'text-white' 
                : (isScrolled ? `text-[${colors.primaryBase}]` : 'text-white')
            }`}>
              Eduara
            </span>
          </Link>
          
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <Link 
              to="/" 
              className={`${
                isDarkMode
                  ? 'text-gray-200 hover:text-white'
                  : (isScrolled ? `text-[${colors.textDark}] hover:text-[${colors.primaryBase}]` : 'text-white hover:text-[#FFC107]')
              } transition-colors flex items-center gap-2`}
            >
              <Home size={18} />
              {language === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
            <Link 
              to="/courses" 
              className={`${
                isDarkMode
                  ? 'text-gray-200 hover:text-white'
                  : (isScrolled ? `text-[${colors.textDark}] hover:text-[${colors.primaryBase}]` : 'text-white hover:text-[#FFC107]')
              } transition-colors flex items-center gap-2`}
            >
              <BookOpen size={18} />
              {language === 'ar' ? 'الكورسات' : 'Courses'}
            </Link>
            <Link 
              to="/exams" 
              className={`${
                isDarkMode
                  ? 'text-gray-200 hover:text-white'
                  : (isScrolled ? `text-[${colors.textDark}] hover:text-[${colors.primaryBase}]` : 'text-white hover:text-[#FFC107]')
              } transition-colors flex items-center gap-2`}
            >
              <FileText size={18} />
              {language === 'ar' ? 'الامتحانات' : 'Exams'}
            </Link>
            <Link 
              to="/subjects" 
              className={`${
                isDarkMode
                  ? 'text-gray-200 hover:text-white'
                  : (isScrolled ? `text-[${colors.textDark}] hover:text-[${colors.primaryBase}]` : 'text-white hover:text-[#FFC107]')
              } transition-colors flex items-center gap-2`}
            >
              <GraduationCap size={18} />
              {language === 'ar' ? 'المواد الدراسية' : 'Subjects'}
            </Link>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {/* Buttons */}
            <button 
              className="p-2 rounded-full focus:outline-none" 
              onClick={toggleLanguage}
              aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              <Globe size={20} className="text-current" />
            </button>
            
            <button 
              className="p-2 rounded-full focus:outline-none" 
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun size={20} className="text-current" />
              ) : (
                <Moon size={20} className="text-current" />
              )}
            </button>
            
            {/* Profile or Login */}
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  className={`flex items-center space-x-1 rtl:space-x-reverse ${
                    isDarkMode 
                      ? 'hover:bg-[#333333]' 
                      : (isScrolled ? 'hover:bg-gray-100' : `hover:bg-[${colors.primaryDark}]`)
                  } rounded-full p-1 focus:outline-none transition-colors`}
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <img 
                    src={user?.avatar || "/api/placeholder/40/40"} 
                    alt="Profile" 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <ChevronDown size={16} className="text-current" />
                </button>
                
                {/* Dropdown for profile */}
                {isProfileMenuOpen && (
                  <div className={`absolute right-0 mt-2 w-48 ${
                    isDarkMode ? 'bg-[#1E1E1E] text-white border border-[#333333]' : 'bg-white text-[#37474F] border border-gray-200'
                  } rounded-md shadow-lg py-1 z-10`}>
                    <Link 
                      to="/profile" 
                      className={`block px-4 py-2 text-sm ${
                        isDarkMode ? 'hover:bg-[#333333]' : 'hover:bg-gray-100'
                      }`}
                    >
                      {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
                    </Link>
                    <Link 
                      to="/courses/enrolled" 
                      className={`block px-4 py-2 text-sm ${
                        isDarkMode ? 'hover:bg-[#333333]' : 'hover:bg-gray-100'
                      }`}
                    >
                      {language === 'ar' ? 'كورساتي' : 'My Courses'}
                    </Link>
                    <button 
                      onClick={logout}
                      className={`block w-full text-left px-4 py-2 text-sm text-red-600 ${
                        isDarkMode ? 'hover:bg-[#333333]' : 'hover:bg-gray-100'
                      }`}
                    >
                      {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Link
                  to="/auth?mode=login"
                  className={`${
                    isDarkMode 
                      ? 'text-[#7986CB] border border-[#7986CB] hover:bg-[#7986CB] hover:text-[#121212]' 
                      : (isScrolled 
                          ? `text-[${colors.primaryBase}] border border-[${colors.primaryBase}] hover:bg-[${colors.primaryBase}] hover:text-white` 
                          : 'text-white border border-white hover:bg-white hover:text-[#3949AB]')
                  } px-4 py-1.5 rounded-md transition-colors`}
                >
                  {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
                </Link>
                <Link
                  to="/auth?mode=register"
                  className={`${
                    isDarkMode 
                      ? 'bg-[#7986CB] text-[#121212] hover:bg-[#3949AB] hover:text-white' 
                      : (isScrolled 
                          ? `bg-[${colors.primaryBase}] text-white hover:bg-[${colors.primaryDark}]` 
                          : `bg-white text-[${colors.primaryBase}] hover:bg-[${colors.accent}] hover:text-white`)
                  } px-4 py-1.5 rounded-md transition-colors`}
                >
                  {language === 'ar' ? 'سجل مجاناً' : 'Register Free'}
                </Link>
              </div>
            )}
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-md focus:outline-none" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X size={24} className="text-current" />
              ) : (
                <Menu size={24} className="text-current" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden border-t ${
            isDarkMode ? 'border-[#333333]' : 'border-gray-200'
          } py-4`}>
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-md ${
                  isDarkMode 
                    ? 'hover:bg-[#333333]' 
                    : `hover:bg-[${colors.primaryBase}] hover:text-white`
                } transition-colors flex items-center gap-2`}
              >
                <Home size={18} />
                {language === 'ar' ? 'الرئيسية' : 'Home'}
              </Link>
              <Link 
                to="/courses" 
                className={`px-4 py-2 rounded-md ${
                  isDarkMode 
                    ? 'hover:bg-[#333333]' 
                    : `hover:bg-[${colors.primaryBase}] hover:text-white`
                } transition-colors flex items-center gap-2`}
              >
                <BookOpen size={18} />
                {language === 'ar' ? 'الكورسات' : 'Courses'}
              </Link>
              <Link 
                to="/exams" 
                className={`px-4 py-2 rounded-md ${
                  isDarkMode 
                    ? 'hover:bg-[#333333]' 
                    : `hover:bg-[${colors.primaryBase}] hover:text-white`
                } transition-colors flex items-center gap-2`}
              >
                <FileText size={18} />
                {language === 'ar' ? 'الامتحانات' : 'Exams'}
              </Link>
              <Link 
                to="/subjects" 
                className={`px-4 py-2 rounded-md ${
                  isDarkMode 
                    ? 'hover:bg-[#333333]' 
                    : `hover:bg-[${colors.primaryBase}] hover:text-white`
                } transition-colors flex items-center gap-2`}
              >
                <GraduationCap size={18} />
                {language === 'ar' ? 'المواد الدراسية' : 'Subjects'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;