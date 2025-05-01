import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  User, Menu, X, Sun, Moon, Search, Globe, ChevronDown, 
  Home, BookOpen, GraduationCap, FileText, Bell
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
  const [showNotifications, setShowNotifications] = useState(false);
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
  const notificationsRef = useRef(null);
  const notificationBadgeRef = useRef(null);

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
    setShowNotifications(false);
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

    // Notification badge animation
    if (notificationBadgeRef.current) {
      gsap.fromTo(
        notificationBadgeRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.3)", delay: 1 }
      );
      
      // Pulse animation for notification badge
      gsap.to(
        notificationBadgeRef.current,
        { 
          scale: 1.2, 
          repeat: -1, 
          yoyo: true, 
          duration: 1.5,
          ease: "sine.inOut"
        }
      );
    }

    return () => {
      // Clean up animations
      gsap.killTweensOf([
        logoRef.current, 
        ...navItemsRef.current,
        actionsRef.current,
        notificationBadgeRef.current
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

  // Notifications dropdown animation
  useEffect(() => {
    if (notificationsRef.current) {
      if (showNotifications) {
        gsap.fromTo(
          notificationsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: "back.out(1.5)" }
        );
      } else {
        gsap.to(notificationsRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.2,
          ease: "power3.in"
        });
      }
    }
  }, [showNotifications]);

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
    subjects: isArabic ? 'المواد الدراسية' : 'Subjects',
    profile: isArabic ? 'الملف الشخصي' : 'Profile',
    myCourses: isArabic ? 'كورساتي' : 'My Courses',
    login: isArabic ? 'تسجيل الدخول' : 'Login',
    register: isArabic ? 'سجل مجاناً' : 'Register Free',
    logout: isArabic ? 'تسجيل الخروج' : 'Logout',
    search: isArabic ? 'بحث...' : 'Search...',
    notifications: isArabic ? 'الإشعارات' : 'Notifications',
    settings: isArabic ? 'الإعدادات' : 'Settings',
    newExam: isArabic ? 'امتحان جديد متاح' : 'New exam available',
    examToday: isArabic ? 'لديك امتحان اليوم' : 'You have an exam today',
    newCourse: isArabic ? 'تم إضافة كورس جديد' : 'New course added',
    viewAll: isArabic ? 'عرض الكل' : 'View all'
  };

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      title: translations.newExam,
      message: isArabic ? 'امتحان الكيمياء العضوية متاح الآن' : 'Organic Chemistry exam is now available',
      time: '5m',
      isNew: true
    },
    {
      id: 2,
      title: translations.examToday,
      message: isArabic ? 'تذكير: امتحان الفيزياء في الساعة 3 مساءً' : 'Reminder: Physics exam at 3 PM',
      time: '2h',
      isNew: true
    },
    {
      id: 3,
      title: translations.newCourse,
      message: isArabic ? 'تم إضافة كورس "أساسيات البرمجة" إلى المنصة' : 'Course "Programming Basics" has been added to the platform',
      time: '1d',
      isNew: false
    }
  ];

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
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="transform transition-transform duration-700 hover:rotate-180"
              >
                <path 
                  d="M12 2L5 6V10C5 15.5 8.1 20.6 12 22C15.9 20.6 19 15.5 19 10V6L12 2ZM16 10C16 14.1 13.9 18 12 19.5C10.1 18 8 14.1 8 10V7.3L12 5L16 7.3V10Z" 
                  fill={isDarkMode ? "rgb(121, 134, 203)" : "#3949AB"} 
                />
                <path 
                  d="M11 10H13V16H11V10ZM11 6H13V8H11V6Z" 
                  fill={isDarkMode ? "rgb(121, 134, 203)" : "#3949AB"} 
                />
              </svg>
            </div>
            <span className={`font-bold text-xl ${
              isDarkMode 
                ? 'text-text-light' 
                : (isScrolled ? 'text-primary-base' : 'text-text-light')
            }`}>
              Eduara
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
            <Link 
              ref={el => navItemsRef.current[3] = el}
              to="/subjects" 
              className={`${
                isDarkMode
                  ? 'text-neutral-200 hover:text-text-light'
                  : (isScrolled ? 'text-text-dark hover:text-primary-base' : 'text-text-light hover:text-accent')
              } transition-colors flex items-center gap-2 py-1 relative group`}
            >
              <GraduationCap size={18} />
              <span>{translations.subjects}</span>
              <span className={`absolute -bottom-1 ${isRTL ? 'right-0' : 'left-0'} w-0 h-0.5 ${isDarkMode ? 'bg-primary-light' : 'bg-accent'} transition-all duration-300 group-hover:w-full`}></span>
            </Link>
          </div>
          
          {/* Actions */}
          <div 
            ref={actionsRef}
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            {/* Search Box - Desktop Only */}
            <div className={`relative hidden lg:block ${
              isDarkMode 
                ? 'bg-neutral-800 text-text-light' 
                : (isScrolled ? 'bg-neutral-100 text-text-dark' : 'bg-primary-dark text-text-light')
            } rounded-full overflow-hidden px-3 py-1.5`}>
              <div className="flex items-center">
                <Search size={16} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                <input 
                  type="text" 
                  placeholder={translations.search}
                  className={`${
                    isDarkMode 
                      ? 'bg-neutral-800 text-text-light placeholder-neutral-400' 
                      : (isScrolled ? 'bg-neutral-100 text-text-dark placeholder-neutral-500' : 'bg-primary-dark text-text-light placeholder-neutral-300')
                  } text-sm border-none outline-none w-44`}
                />
              </div>
            </div>
            
            {/* Notifications - Only for logged in users */}
            {isAuthenticated && (
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-full focus:outline-none relative ${
                    isDarkMode 
                      ? 'hover:bg-neutral-800' 
                      : (isScrolled ? 'hover:bg-neutral-100' : 'hover:bg-primary-dark')
                  }`}
                  aria-label={translations.notifications}
                >
                  <Bell size={20} className="text-current" />
                  {/* Notification Badge */}
                  <span 
                    ref={notificationBadgeRef}
                    className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full"
                  >
                    2
                  </span>
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div 
                    ref={notificationsRef}
                    className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-80 ${
                      isDarkMode ? 'bg-background-card-dark border-neutral-700' : 'bg-background-card-light border-neutral-200'
                    } rounded-lg shadow-lg overflow-hidden border z-50`}
                  >
                    <div className={`flex justify-between items-center px-4 py-2 border-b ${
                      isDarkMode ? 'border-neutral-700' : 'border-neutral-200'
                    }`}>
                      <h3 className="font-medium">{translations.notifications}</h3>
                      <button className="text-xs text-primary-base dark:text-primary-light">
                        {translations.viewAll}
                      </button>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          className={`p-3 border-b last:border-b-0 ${
                            notification.isNew 
                              ? (isDarkMode ? 'bg-primary-dark/10' : 'bg-primary-light/10') 
                              : ''
                          } ${isDarkMode ? 'border-neutral-700 hover:bg-neutral-800' : 'border-neutral-200 hover:bg-neutral-50'} cursor-pointer transition-colors`}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <span className="text-xs text-neutral-500 dark:text-neutral-400">{notification.time}</span>
                          </div>
                          <p className="text-xs mt-1 text-neutral-600 dark:text-neutral-300">
                            {notification.message}
                          </p>
                          {notification.isNew && (
                            <span className="inline-block w-2 h-2 bg-primary-base rounded-full mt-1"></span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
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
            <Link 
              to="/subjects" 
              className={`mobile-menu-item px-4 py-2 rounded-md ${
                isDarkMode 
                  ? 'hover:bg-neutral-800' 
                  : 'hover:bg-primary-base hover:text-text-light'
              } transition-colors flex items-center gap-2`}
            >
              <GraduationCap size={18} />
              {translations.subjects}
            </Link>

            {/* Mobile Search Box */}
            <div className={`px-4 py-2`}>
              <div className={`flex items-center px-3 py-2 rounded-md ${
                isDarkMode 
                  ? 'bg-neutral-800' 
                  : 'bg-neutral-100'
              }`}>
                <Search size={16} className={`${isRTL ? 'ml-2' : 'mr-2'} text-neutral-500`} />
                <input 
                  type="text" 
                  placeholder={translations.search}
                  className={`${
                    isDarkMode 
                      ? 'bg-neutral-800 text-text-light placeholder-neutral-400' 
                      : 'bg-neutral-100 text-text-dark placeholder-neutral-500'
                  } text-sm border-none outline-none w-full`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
