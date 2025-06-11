// src/components/auth/ProtectedComponent.jsx
import React from 'react';
import { LogIn, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

const ProtectedComponent = ({ 
  children, 
  fallback = null, 
  requireAuth = true,
  showLoginButton = true,
  message = null 
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();

  const texts = {
    loginRequired: {
      ar: 'يجب تسجيل الدخول أولاً',
      en: 'Please login first to access this feature'
    },
    loginButton: {
      ar: 'تسجيل الدخول',
      en: 'Login'
    },
    loading: {
      ar: 'جاري التحقق من تسجيل الدخول...',
      en: 'Checking authentication...'
    }
  };

  const getText = (key) => texts[key]?.[language] || texts[key]?.en || '';

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">
          {getText('loading')}
        </span>
      </div>
    );
  }

  // If authentication is not required, always show children
  if (!requireAuth) {
    return children;
  }

  // If user is authenticated, show children
  if (isAuthenticated && user) {
    return children;
  }

  // If custom fallback is provided, use it
  if (fallback) {
    return fallback;
  }

  // Default fallback: show login prompt
  return (
    <div className={`text-center py-12 ${
      isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
    } rounded-lg border-2 border-dashed ${
      isDarkMode ? 'border-gray-600' : 'border-gray-300'
    }`}>
      <AlertTriangle className={`h-12 w-12 mx-auto mb-4 ${
        isDarkMode ? 'text-orange-400' : 'text-orange-500'
      }`} />
      <h3 className={`text-lg font-medium mb-2 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        {message || getText('loginRequired')}
      </h3>
      
      {showLoginButton && (
        <button
          onClick={() => {
            // Store current location for redirect after login
            localStorage.setItem('redirectAfterLogin', window.location.pathname);
            window.location.href = '/auth?mode=login';
          }}
          className={`inline-flex items-center gap-2 px-6 py-2 rounded-lg text-white font-medium transition-colors ${
            isDarkMode
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          <LogIn className="h-4 w-4" />
          {getText('loginButton')}
        </button>
      )}
    </div>
  );
};

export default ProtectedComponent;