// src/pages/common/ServerError.jsx
import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ServerError = () => {
  const [isRetrying, setIsRetrying] = useState(false);
  const { isDarkMode, colors } = useTheme();
  
  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  
  const handleGoBack = () => {
    window.history.back();
  };
  
  const handleGoHome = () => {
    window.location.href = '/';
  };
  
  return (
    <div className={`min-h-[70vh] flex flex-col justify-center items-center px-4 py-12 ${isDarkMode ? 'bg-dark' : 'bg-bg-light'} transition-colors duration-300`}>
      <div className="text-center max-w-xl">
        <div className="mb-8">
          <svg className={`h-32 w-32 ${isDarkMode ? 'text-primary-light' : 'text-primary-base'} mx-auto transition-colors duration-300`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90Z" stroke="currentColor" strokeWidth="4"/>
            <path d="M50 30V60" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
            <circle cx="50" cy="70" r="4" fill="currentColor"/>
          </svg>
        </div>
        
        <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-dark' : 'text-text-dark'} mb-2 transition-colors duration-300`}>Server Error</h1>
        <h2 className={`text-xl font-medium ${isDarkMode ? 'text-primary-lightest' : 'text-primary-dark'} mb-6 transition-colors duration-300`}>Something went wrong on our end</h2>
        
        <div className={`h-1 w-20 ${isDarkMode ? 'bg-accent-secondary' : 'bg-accent-primary'} mx-auto mb-8 transition-colors duration-300`}></div>
        
        <p className={`${isDarkMode ? 'text-primary-lightest' : 'text-primary-base'} mb-6 transition-colors duration-300`}>
          We're experiencing technical difficulties at the moment. Our team has been 
          automatically notified and is working to fix the issue as quickly as possible.
        </p>
        
        <div className={`${isDarkMode ? 'bg-primary-dark/20 border-primary-light' : 'bg-primary-lightest/20 border-primary-base'} border-l-4 rounded-r-lg p-4 mb-8 text-left transition-colors duration-300`}>
          <h3 className={`font-medium ${isDarkMode ? 'text-dark' : 'text-text-dark'} mb-2 transition-colors duration-300`}>Possible causes:</h3>
          <ul className={`${isDarkMode ? 'text-primary-lightest' : 'text-primary-dark'} space-y-2 transition-colors duration-300`}>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Server maintenance or overload
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Temporary network connectivity issues
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Application database or service disruption
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
          <button
            onClick={handleGoBack}
            className={`${isDarkMode ? 'bg-primary-dark border-primary-light text-dark hover:bg-primary-base' : 'bg-white border-primary-lightest text-text-dark hover:bg-bg-light'} border font-medium py-3 px-6 rounded-lg transition-colors shadow-sm`}
          >
            Go Back
          </button>
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className={`${isDarkMode ? 'bg-primary-base hover:bg-primary-dark' : 'bg-primary-base hover:bg-primary-dark'} text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm flex items-center justify-center`}
          >
            {isRetrying ? (
              <>
                <div className="animate-spin h-5 w-5 mr-2 border-t-2 border-b-2 border-white rounded-full"></div>
                Retrying...
              </>
            ) : (
              <>
                Try Again
              </>
            )}
          </button>
          <button
            onClick={handleGoHome}
            className={`${isDarkMode ? 'bg-accent-secondary hover:bg-accent-primary text-text-dark' : 'bg-accent-secondary hover:bg-accent-primary text-text-dark'} font-medium py-3 px-6 rounded-lg transition-colors shadow-sm`}
          >
            Go to Homepage
          </button>
        </div>
        
        <p className={`${isDarkMode ? 'text-primary-light' : 'text-primary-light'} text-sm mt-8 transition-colors duration-300`}>
          Error Reference: <span className={`font-mono ${isDarkMode ? 'bg-primary-dark/30' : 'bg-primary-lightest/30'} p-1 rounded transition-colors duration-300`}>ERR-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
        </p>
      </div>
    </div>
  );
};

export default ServerError;