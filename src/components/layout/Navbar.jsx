import { useState } from 'react';

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`py-4 px-6 md:px-12 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <span className="text-2xl font-bold tracking-tight">Skilloo</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/" className="font-medium hover:text-gray-600 transition-colors duration-200">Home</a>
          <a href="/courses" className="font-medium hover:text-gray-600 transition-colors duration-200">Courses</a>
          <a href="/mentors" className="font-medium hover:text-gray-600 transition-colors duration-200">Mentors</a>
          <a href="/about" className="font-medium hover:text-gray-600 transition-colors duration-200">About</a>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="/login" className="font-medium hover:text-gray-600 transition-colors duration-200">Sign In</a>
          <a 
            href="/register" 
            className="px-5 py-2 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            Get Started
          </a>
          
          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300" 
          onClick={toggleMenu}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden mt-4 py-4 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <a href="/" className="block py-2 px-4 font-medium hover:bg-gray-100 hover:text-gray-900">Home</a>
          <a href="/courses" className="block py-2 px-4 font-medium hover:bg-gray-100 hover:text-gray-900">Courses</a>
          <a href="/mentors" className="block py-2 px-4 font-medium hover:bg-gray-100 hover:text-gray-900">Mentors</a>
          <a href="/about" className="block py-2 px-4 font-medium hover:bg-gray-100 hover:text-gray-900">About</a>
          
          <div className="mt-4 pt-4 border-t border-gray-300">
            <a href="/login" className="block py-2 px-4 font-medium hover:bg-gray-100 hover:text-gray-900">Sign In</a>
            <a href="/register" className="block py-2 px-4 font-medium hover:bg-gray-100 hover:text-gray-900">Get Started</a>
            
            {/* Dark Mode Toggle - Mobile */}
            <div className="py-2 px-4">
              <button 
                onClick={toggleDarkMode} 
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;