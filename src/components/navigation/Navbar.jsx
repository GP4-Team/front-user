import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  User, Menu, X, Sun, Moon, Globe, ChevronDown, 
  Home, BookOpen, FileText, Brain
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import gsap from 'gsap';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, toggleLanguage, isRTL } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isArabic = language === 'ar';
  
  // Refs for GSAP animations
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const navLinksRef = useRef(null);
  const actionsRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef([]);

  // Handle scroll for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menus when navigating between pages
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  // GSAP animations
  useEffect(() => {
    // Initial load animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(
      logoRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    );
    
    // Animate nav links with stagger
    if (navItemsRef.current.length > 0) {
      tl.fromTo(
        navItemsRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.4 },
        "-=0.2"
      );
    }
    
    tl.fromTo(
      actionsRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4 },
      "-=0.2"
    );

    return () => {
      // Clean up animations
      gsap.killTweensOf([
        logoRef.current, 
        ...navItemsRef.current,
        actionsRef.current
      ]);
    };
  }, [isScrolled]);

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        
        // Animate menu items with stagger
        const menuItems = mobileMenuRef.current.querySelectorAll('.mobile-menu-item');
        gsap.fromTo(
          menuItems,
          { x: isRTL ? 50 : -50, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.1, duration: 0.3, ease: "back.out(1.2)" }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        });
      }
    }
  }, [isMenuOpen, isRTL]);



  // Profile dropdown animation
  useEffect(() => {
    const profileMenu = document.querySelector('.profile-dropdown');
    if (profileMenu) {
      if (isProfileMenuOpen) {
        gsap.fromTo(
          profileMenu,
          { y: 20, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.5)" }
        );
      } else {
        gsap.to(profileMenu, {
          y: 20,
          opacity: 0,
          scale: 0.95,
          duration: 0.2,
          ease: "power3.in"
        });
      }
    }
  }, [isProfileMenuOpen]);

  // Translations object
  const translations = {
    home: isArabic ? 'الرئيسية' : 'Home',
    courses: isArabic ? 'الكورسات' : 'Courses',
    exams: isArabic ? 'الامتحانات' : 'Exams',
    // subjects: isArabic ? 'المواد الدراسية' : 'Subjects', // Removed
    profile: isArabic ? 'الملف الشخصي' : 'Profile',
    myCourses: isArabic ? 'كورساتي' : 'My Courses',
    login: isArabic ? 'تسجيل الدخول' : 'Login',
    register: isArabic ? 'سجل مجاناً' : 'Register Free',
    logout: isArabic ? 'تسجيل الخروج' : 'Logout'
    // search: isArabic ? 'بحث...' : 'Search...' // Removed
  };



  // Check if we should show navbar (not on auth pages)
  if (location.pathname.startsWith('/auth')) {
    return null; // Don't render navbar on auth pages
  }

  return (
    <header 
      ref={navbarRef}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isDarkMode 
          ? (isScrolled ? 'bg-background-dark shadow-lg' : 'bg-background-card-dark/70 backdrop-blur-md') 
          : (isScrolled ? 'bg-background-card-light shadow-lg' : 'bg-primary-base/95 backdrop-blur-md')
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link ref={logoRef} to="/" className="flex items-center">
            <div className={`${isDarkMode ? 'bg-neutral-800' : 'bg-background-card-light'} rounded-full h-10 w-10 flex items-center justify-center mr-2 rtl:ml-2 rtl:mr-0 shadow-md`}>
              <img 
                src="/Group 2.png" 
                alt="LearnNova Logo" 
                className="w-6 h-6 object-contain"
              />
            </div>
            <span className={`font-bold text-xl ${
              isDarkMode 
                ? 'text-text-light' 
                : (isScrolled ? 'text-primary-base' : 'text-text-light')
            }`}>
              LearnNova
            </span>
          </Link>
          
          {/* Desktop Nav Links */}
          <div 
            ref={navLinksRef}
            className="hidden md:flex items-center space-x-6 rtl:space-x-reverse"
          >
            <Link 
              ref={el => navItemsRef.current[0] = el}
              to="/" 
              className={`${
                isDarkMode
                  ? 'text-neutral-200 hover:text-text-light'
                  : (isScrolled ? 'text-text-dark hover:text-primary-base' : 'text-text-light hover:text-accent')
              } transition-colors flex items-center gap-2 py-1 relative group`}
            >
              <Home size={18} />
              <span>{translations.home}</span>
              <span className={`absolute -bottom-1 ${isRTL ? 'right-0' : 'left-0'} w-0 h-0.5 ${isDarkMode ? 'bg-primary-light' : 'bg-accent'} transition-all duration-300 group-hover:w-full`}></span>
            </Link>
            <Link 
              ref={el => navItemsRef.current[1] = el}
              to="/courses" 
              className={`${
                isDarkMode
                  ? 'text-neutral-200 hover:text-text-light'
                  : (isScrolled ? 'text-text-dark hover:text-primary-base' : 'text-text-light hover:text-accent')
              } transition-colors flex items-center gap-2 py-1 relative group`}
            >
              <BookOpen size={18} />
              <span>{translations.courses}</span>
              <span className={`absolute -bottom-1 ${isRTL ? 'right-0' : 'left-0'} w-0 h-0.5 ${isDarkMode ? 'bg-primary-light' : 'bg-accent'} transition-all duration-300 group-hover:w-full`}></span>
            </Link>
            <Link 
              ref={el => navItemsRef.current[2] = el}
              to="/exams" 
              className={`${
                isDarkMode
                  ? 'text-neutral-200 hover:text-text-light'
                  : (isScrolled ? 'text-text-dark hover:text-primary-base' : 'text-text-light hover:text-accent')
              } transition-colors flex items-center gap-2 py-1 relative group`}
            >
              <FileText size={18} />
              <span>{translations.exams}</span>
              <span className={`absolute -bottom-1 ${isRTL ? 'right-0' : 'left-0'} w-0 h-0.5 ${isDarkMode ? 'bg-primary-light' : 'bg-accent'} transition-all duration-300 group-hover:w-full`}></span>
            </Link>
          </div>
          
          {/* Actions */}
          <div 
            ref={actionsRef}
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            {/* Search Box - Removed as requested */}
            {/* Desktop search box removed */}

            
            {/* Language Toggle */}
            <button 
              className={`p-2 rounded-full focus:outline-none ${
                isDarkMode 
                  ? 'hover:bg-neutral-800' 
                  : (isScrolled ? 'hover:bg-neutral-100' : 'hover:bg-primary-dark')
              }`}
              onClick={toggleLanguage}
              aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              <Globe size={20} className="text-current" />
            </button>
            
            {/* Theme Toggle */}
            <button 
              className={`p-2 rounded-full focus:outline-none ${
                isDarkMode 
                  ? 'hover:bg-neutral-800' 
                  : (isScrolled ? 'hover:bg-neutral-100' : 'hover:bg-primary-dark')
              }`}
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
                      ? 'hover:bg-neutral-800' 
                      : (isScrolled ? 'hover:bg-neutral-100' : 'hover:bg-primary-dark')
                  } rounded-full p-1 focus:outline-none transition-colors`}
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <img 
                    src={user?.avatar || "/api/placeholder/40/40"} 
                    alt="Profile" 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  
                  {/* اسم المستخدم - مخفي على الموبايل */}
                  <div className="hidden sm:flex flex-col items-start rtl:items-end">
                    <span className={`text-sm font-medium leading-tight ${
                      isDarkMode ? 'text-text-light' : (isScrolled ? 'text-text-dark' : 'text-text-light')
                    }`}>
                      {user?.name ? user.name : (isArabic ? 'مرحباً' : 'Welcome')}
                    </span>
                    <span className={`text-xs opacity-75 leading-tight ${
                      isDarkMode ? 'text-neutral-300' : (isScrolled ? 'text-neutral-600' : 'text-neutral-200')
                    }`}>
                      {user?.type || (isArabic ? 'طالب' : 'Student')}
                    </span>
                  </div>
                  
                  <ChevronDown size={16} className="text-current" />
                </button>
                
                {isProfileMenuOpen && (
                  <div className={`profile-dropdown absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-48 ${
                    isDarkMode ? 'bg-background-card-dark text-text-light border border-neutral-800' : 'bg-background-card-light text-text-dark border border-neutral-200'
                  } rounded-md shadow-lg py-1 z-10`}>
                    <Link 
                      to="/profile" 
                      className={`block px-4 py-2 text-sm ${
                        isDarkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
                      }`}
                    >
                      {translations.profile}
                    </Link>
                    <Link 
                      to="/courses/enrolled" 
                      className={`block px-4 py-2 text-sm ${
                        isDarkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
                      }`}
                    >
                      {translations.myCourses}
                    </Link>
                    <Link 
                      to="/student/ai-portal" 
                      className={`block px-4 py-2 text-sm ${
                        isDarkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
                      }`}
                    >
                      {isArabic ? 'بوابة التحسين الذكي' : 'AI Improvement Portal'}
                    </Link>
                    <button 
                      onClick={logout}
                      className={`block w-full text-left px-4 py-2 text-sm text-state-error ${
                        isDarkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
                      }`}
                    >
                      {translations.logout}
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
                      ? 'text-primary-light border border-primary-light hover:bg-primary-light hover:text-background-dark' 
                      : (isScrolled 
                          ? 'text-primary-base border border-primary-base hover:bg-primary-base hover:text-text-light' 
                          : 'text-text-light border border-text-light hover:bg-text-light hover:text-primary-base')
                  } px-4 py-1.5 rounded-md transition-colors`}
                >
                  {translations.login}
                </Link>
                <Link
                  to="/auth?mode=register"
                  className={`${
                    isDarkMode 
                      ? 'bg-primary-light text-background-dark hover:bg-primary-base hover:text-text-light' 
                      : (isScrolled 
                          ? 'bg-primary-base text-text-light hover:bg-primary-dark' 
                          : 'bg-accent text-text-dark hover:bg-secondary-base hover:text-text-light')
                  } px-4 py-1.5 rounded-md transition-colors`}
                >
                  {translations.register}
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
        <div 
          ref={mobileMenuRef}
          className={`md:hidden overflow-hidden ${isMenuOpen ? 'border-t' : 'h-0 border-t-0'} ${
            isDarkMode ? 'border-neutral-800' : 'border-neutral-200'
          }`}
        >
          <div className="flex flex-col space-y-1 py-3">
            <Link 
              to="/" 
              className={`mobile-menu-item px-4 py-2 rounded-md ${
                isDarkMode 
                  ? 'hover:bg-neutral-800' 
                  : 'hover:bg-primary-base hover:text-text-light'
              } transition-colors flex items-center gap-2`}
            >
              <Home size={18} />
              {translations.home}
            </Link>
            <Link 
              to="/courses" 
              className={`mobile-menu-item px-4 py-2 rounded-md ${
                isDarkMode 
                  ? 'hover:bg-neutral-800' 
                  : 'hover:bg-primary-base hover:text-text-light'
              } transition-colors flex items-center gap-2`}
            >
              <BookOpen size={18} />
              {translations.courses}
            </Link>
            <Link 
              to="/exams" 
              className={`mobile-menu-item px-4 py-2 rounded-md ${
                isDarkMode 
                  ? 'hover:bg-neutral-800' 
                  : 'hover:bg-primary-base hover:text-text-light'
              } transition-colors flex items-center gap-2`}
            >
              <FileText size={18} />
              {translations.exams}
            </Link>
            {/* Subjects link removed as requested */}
            {isAuthenticated && (
              <Link 
                to="/student/ai-portal" 
                className={`mobile-menu-item px-4 py-2 rounded-md ${
                  isDarkMode 
                    ? 'hover:bg-neutral-800' 
                    : 'hover:bg-primary-base hover:text-text-light'
                } transition-colors flex items-center gap-2`}
              >
                <Brain size={18} />
                {isArabic ? 'بوابة التحسين الذكي' : 'AI Improvement Portal'}
              </Link>
            )}

            {/* Mobile Search Box - Removed as requested */}
            {/* Mobile search removed */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
