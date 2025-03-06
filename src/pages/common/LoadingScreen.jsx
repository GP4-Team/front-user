// src/components/common/LoadingScreen.jsx
import React from 'react';

const LoadingScreen = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-6"></div>
        <h2 className="text-xl font-medium text-gray-700">{message}</h2>
        <p className="text-gray-500 mt-2">Please wait while we set things up for you</p>
      </div>
    </div>
  );
};

export default LoadingScreen;