// src/pages/auth/Login.jsx
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTenant } from '../../contexts/TenantContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import LoginForm from '../../components/auth/LoginForm';

/**
 * Login Page Component
 * Handles user login with API integration, multi-tenancy, multi-language, and theme support
 * 
 * @returns {JSX.Element} - Login page component
 */
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const { tenant } = useTenant();
  const { language, toggleLanguage, isRTL } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();
  
  // Extract redirect URL from query parameters or use default
  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get('redirect') || '/dashboard';
  
  // State for login message (e.g., "Your session has expired")
  const [loginMessage, setLoginMessage] = useState({
    type: '',
    text: ''
  });
  
  // Check for message in URL parameters or location state
  useEffect(() => {
    const messageParam = searchParams.get('message');
    const stateMessage = location.state?.message;
    
    if (messageParam === 'session_expired') {
      setLoginMessage({
        type: 'warning',
        text: language === 'ar' ? 'انتهت صلاحية جلستك. يرجى تسجيل الدخول مرة أخرى.' : 'Your session has expired. Please log in again.'
      });
    } else if (stateMessage) {
      setLoginMessage({
        type: 'info',
        text: stateMessage
      });
    }
  }, [location, language]);
  
  // If user is already authenticated, redirect to intended destination
  if (!isLoading && isAuthenticated) {
    return <Navigate to={redirectUrl} replace />;
  }
  
  /**
   * Handle successful login
   * 
   * @param {Object} response - Login API response
   */
  const handleLoginSuccess = (response) => {
    setLoginMessage({
      type: 'success',
      text: response.message || (language === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Login successful!')
    });
    
    // Redirect to dashboard or specified redirect URL
    setTimeout(() => {
      navigate(redirectUrl);
    }, 1000);
  };
  
  /**
   * Handle login error
   * 
   * @param {Object} error - Error object
   */
  const handleLoginError = (error) => {
    setLoginMessage({
      type: 'error',
      text: error.message || (language === 'ar' ? 'فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك.' : 'Login failed. Please check your credentials.')
    });
  };
  
  // Text based on selected language
  const labels = {
    signIn: language === 'ar' ? 'تسجيل الدخول' : 'Sign In',
    welcomeBack: language === 'ar' ? 'مرحباً بعودتك!' : 'Welcome Back!',
    noAccount: language === 'ar' ? 'ليس لديك حساب؟' : 'Don\'t have an account?',
    createAccount: language === 'ar' ? 'إنشاء حساب جديد' : 'Create Account',
    language: language === 'ar' ? 'English' : 'العربية',
    darkMode: language === 'ar' ? 'الوضع المظلم' : 'Dark Mode',
    lightMode: language === 'ar' ? 'الوضع المضيء' : 'Light Mode',
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Language and Theme Toggle */}
      <div className="fixed top-4 right-4 flex space-x-4 rtl:space-x-reverse">
        <button
          onClick={toggleLanguage}
          className={`px-3 py-1 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} shadow-sm`}
        >
          {labels.language}
        </button>
        <button
          onClick={toggleTheme}
          className={`px-3 py-1 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} shadow-sm`}
          aria-label={isDarkMode ? labels.lightMode : labels.darkMode}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
      
      <div className="max-w-md w-full space-y-8">
        {/* Tenant branding */}
        <div className="text-center">
          {tenant.logo && (
            <img
              className="mx-auto h-16 w-auto"
              src={tenant.logo}
              alt={tenant.name}
            />
          )}
          <h2 className={`mt-6 text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {labels.welcomeBack}
          </h2>
          <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {labels.noAccount}{' '}
            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              {labels.createAccount}
            </a>
          </p>
        </div>
        
        {/* Login message */}
        {loginMessage.text && (
          <div className={`rounded-md p-4 ${
            loginMessage.type === 'success' ? 'bg-green-50 text-green-800 dark:bg-green-800 dark:text-green-100 border border-green-400' :
            loginMessage.type === 'error' ? 'bg-red-50 text-red-800 dark:bg-red-800 dark:text-red-100 border border-red-400' : 
            loginMessage.type === 'warning' ? 'bg-yellow-50 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100 border border-yellow-400' :
            'bg-blue-50 text-blue-800 dark:bg-blue-800 dark:text-blue-100 border border-blue-400'
          }`}>
            <p className="text-sm font-medium">{loginMessage.text}</p>
          </div>
        )}
        
        {/* Login form */}
        <LoginForm
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      </div>
    </div>
  );
};

export default Login;