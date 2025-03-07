import { useState } from 'react';

const NotFoundPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);



  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
        <h1 className="text-9xl font-bold text-yellow-400">404</h1>
        <h2 className="text-4xl font-bold mt-8 mb-6">Page Not Found</h2>
        <p className="text-xl max-w-md mb-10">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <a 
          href="/home" 
          className="px-8 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors duration-300"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;