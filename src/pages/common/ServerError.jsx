// src/pages/common/ServerError.jsx
import React, { useState } from 'react';

const ServerError = () => {
  const [isRetrying, setIsRetrying] = useState(false);
  
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
    <div className="min-h-[70vh] flex flex-col justify-center items-center px-4 py-12">
      <div className="text-center max-w-xl">
        <div className="mb-8">
          <svg className="h-32 w-32 text-red-500 mx-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90Z" stroke="currentColor" strokeWidth="4"/>
            <path d="M50 30V60" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
            <circle cx="50" cy="70" r="4" fill="currentColor"/>
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Server Error</h1>
        <h2 className="text-xl font-medium text-gray-700 mb-6">Something went wrong on our end</h2>
        
        <div className="h-1 w-20 bg-red-500 mx-auto mb-8"></div>
        
        <p className="text-gray-600 mb-6">
          We're experiencing technical difficulties at the moment. Our team has been 
          automatically notified and is working to fix the issue as quickly as possible.
        </p>
        
        <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-4 mb-8 text-left">
          <h3 className="font-medium text-red-800 mb-2">Possible causes:</h3>
          <ul className="text-red-700 space-y-2">
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
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-6 rounded-lg transition-colors shadow-sm"
          >
            Go Back
          </button>
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm flex items-center justify-center"
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
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm"
          >
            Go to Homepage
          </button>
        </div>
        
        <p className="text-gray-500 text-sm mt-8">
          Error Reference: <span className="font-mono bg-gray-100 p-1 rounded">ERR-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
        </p>
      </div>
    </div>
  );
};

export default ServerError;