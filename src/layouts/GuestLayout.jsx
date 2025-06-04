// src/layouts/GuestLayout.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useTenant } from '../contexts/TenantContext';
import { logoutUser } from '../services/auth';

/**
 * GuestLayout component
 * Unified layout for both guests and authenticated users
 * Matches the exact navbar from the courses page in Arabic
 * 
 * @param {Object} props - Component props
 * @param {JSX.Element} props.children - Child components to render
 * @returns {JSX.Element} - Layout component
 */
const GuestLayout = ({ children }) => {
  const navigate = useNavigate();
  const { language, toggleLanguage, isRTL } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const { tenant } = useTenant();
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  // Text based on selected language
  const labels = {
    home: language === 'ar' ? 'الرئيسية' : 'Home',
    courses: language === 'ar' ? 'الكورسات' : 'Courses',
    exams: language === 'ar' ? 'الامتحانات' : 'Exams',
    subjects: language === 'ar' ? 'المواد الدراسية' : 'Subjects',
    search: language === 'ar' ? 'بحث...' : 'Search...',
    login: language === 'ar' ? 'تسجيل الدخول' : 'Login',
    register: language === 'ar' ? 'سجل مجاناً' : 'Register Free',
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header - Exactly matching the courses page navbar in Arabic */}
      <header className="bg-gray-900 text-white border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Right side in Arabic */}
            <div className={`flex items-center ${isRTL ? 'order-2' : 'order-1'}`}>
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-white">Eduara</span>
                <svg className="h-6 w-6 text-indigo-400 ml-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-8v2h2v-2h-2zm0-8v6h2V6h-2z"></path>
                </svg>
              </Link>
            </div>
            
            {/* Navigation Links - Center */}
            <nav className={`flex items-center space-x-6 rtl:space-x-reverse mx-auto ${isRTL ? 'order-1' : 'order-2'}`}>
              <Link 
                to="/" 
                className="flex items-center text-white hover:text-gray-300 px-3 py-2 text-sm font-medium"
              >
                <svg className="h-5 w-5 rtl:ml-1 ltr:mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                {labels.home}
              </Link>
              
              <Link 
                to="/courses" 
                className="flex items-center text-white hover:text-gray-300 px-3 py-2 text-sm font-medium"
              >
                <svg className="h-5 w-5 rtl:ml-1 ltr:mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                {labels.courses}
              </Link>
              
              <Link 
                to="/exams" 
                className="flex items-center text-white hover:text-gray-300 px-3 py-2 text-sm font-medium"
              >
                <svg className="h-5 w-5 rtl:ml-1 ltr:mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  <path d="M9 14l2 2 4-4"></path>
                </svg>
                {labels.exams}
              </Link>
              
              <Link 
                to="/subjects" 
                className="flex items-center text-white hover:text-gray-300 px-3 py-2 text-sm font-medium"
              >
                <svg className="h-5 w-5 rtl:ml-1 ltr:mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 6.25278V19.2528M12 6.25278L6.25 10.0028M12 6.25278L17.75 10.0028M6.25 10.0028V17.5028L12 21.2528L17.75 17.5028V10.0028M6.25 10.0028L12 13.7528L17.75 10.0028M12 2.75278L2.75 8.00278L12 13.2528L21.25 8.00278L12 2.75278Z"></path>
                </svg>
                {labels.subjects}
              </Link>
            </nav>
            
            {/* Right side elements - Search, language, theme, and auth */}
            <div className={`flex items-center space-x-4 rtl:space-x-reverse ${isRTL ? 'order-3' : 'order-3'}`}>
              {/* Search */}
              <div className="relative">
                <input 
                  type="text" 
                  className="w-32 pl-8 rtl:pl-3 rtl:pr-8 py-1 bg-gray-800 border border-gray-700 rounded-md text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500" 
                  placeholder={labels.search}
                />
                <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 flex items-center pl-2 rtl:pr-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
              </div>
              
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="text-gray-300 hover:text-white p-1 rounded-full"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                )}
              </button>
              
              {/* Language toggle */}
              <button
                onClick={toggleLanguage}
                className="text-gray-300 hover:text-white p-1 rounded-full"
                aria-label="Toggle language"
              >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </button>
              
              {/* Auth buttons */}
              {isAuthenticated && user ? (
                <div className="flex items-center">
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-gray-300 text-sm font-medium"
                  >
                    {user.name?.split(' ')[0] || 'User'} (خروج)
                  </button>
                </div>
              ) : (
                <div className="flex flex-row-reverse items-center space-x-2 rtl:space-x-reverse">
                  {isRTL ? (
                    <>
                      <Link
                        to="/register"
                        className="ml-2 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 rounded-md px-3 py-1 text-sm font-medium"
                      >
                        {labels.register}
                      </Link>
                      <Link
                        to="/login"
                        className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-md px-3 py-1 text-sm font-medium"
                      >
                        {labels.login}
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="mr-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md px-3 py-1 text-sm font-medium"
                      >
                        {labels.login}
                      </Link>
                      <Link
                        to="/register"
                        className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 rounded-md px-3 py-1 text-sm font-medium"
                      >
                        {labels.register}
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="py-4 bg-gray-800 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm">
            <p>&copy; {new Date().getFullYear()} {tenant.name || 'Eduara'}. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GuestLayout;