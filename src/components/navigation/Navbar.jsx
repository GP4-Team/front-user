import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { Home } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const { language, toggleLanguage, isRTL } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();
  const isArabic = language === "ar";

  // Handle theme toggle with debugging
  const handleThemeToggle = () => {
    console.log("Toggle clicked, before:", isDarkMode);
    toggleTheme();
    console.log("After toggle function called");
  };

  // Function to check if a path is active
  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <header className="flex justify-between items-center py-4 px-8 bg-white dark:bg-[#1E1E1E] shadow-sm">
      {/* Logo */}
      <div className="flex items-center">
        <svg
          className={`w-9 h-9 ${isRTL ? "ml-2.5" : "mr-2.5"}`}
          viewBox="0 0 36 36"
        >
          <path d="M10 18 L18 12 L26 18 L18 24 Z" fill="#3949AB" />
          <line
            x1="18"
            y1="24"
            x2="18"
            y2="28"
            stroke="#3949AB"
            strokeWidth="2"
          />
        </svg>
        <span className="text-2xl font-extrabold font-cairo text-[#37474F] dark:text-white">
          Eduara
        </span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:block">
        <ul className="flex">
          {/* Explicit Home Link with Home Icon */}
          <li className="relative group mx-4">
            <Link
              to="/"
              className={`flex items-center font-medium transition-all hover:-translate-y-0.5 ${
                isActive("/")
                  ? "text-[#3949AB] border-b-2 border-[#3949AB] pb-1"
                  : "text-[#37474F] dark:text-white hover:text-[#3949AB]"
              }`}
            >
              <Home size={18} className="mr-1" />
              {isArabic ? "الرئيسية" : "Home"}
            </Link>
          </li>
          <li className="relative group mx-4">
            <Link
              to="/courses"
              className={`flex items-center font-medium transition-all hover:-translate-y-0.5 ${
                isActive("/courses")
                  ? "text-[#3949AB] border-b-2 border-[#3949AB] pb-1"
                  : "text-[#37474F] dark:text-white hover:text-[#3949AB]"
              }`}
            >
              {isArabic ? "الدورات" : "Courses"}
            </Link>
          </li>
          <li className="relative group mx-4">
            <Link
              to="/exams"
              className={`flex items-center font-medium transition-all hover:-translate-y-0.5 ${
                isActive("/exams")
                  ? "text-[#3949AB] border-b-2 border-[#3949AB] pb-1"
                  : "text-[#37474F] dark:text-white hover:text-[#3949AB]"
              }`}
            >
              {isArabic ? "الاختبارات" : "Exams"}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center">
        {/* Home Button - Direct link visible on all screens */}
        <Link
          to="/"
          className="mr-4 bg-[#3949AB] text-white p-2 rounded-full hover:bg-[#1A237E] transition-colors"
          aria-label="Go to Home page"
        >
          <Home size={18} />
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-[#F0F4F8] dark:bg-[#2D2D2D] rounded-full px-4 py-2 shadow-inner">
          <input
            type="text"
            placeholder={isArabic ? "بحث..." : "Search..."}
            className="bg-transparent border-none outline-none w-48 text-sm font-tajawal text-[#37474F] dark:text-white"
          />
          <svg
            className="w-4 h-4 text-[#7986CB] dark:text-[#AAAAAA] cursor-pointer"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          className="mx-4 text-[#7986CB] dark:text-[#AAAAAA] hover:text-[#3949AB] transition-colors"
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {isDarkMode ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="mx-4 text-[#7986CB] dark:text-[#AAAAAA] hover:text-[#3949AB] transition-colors"
          aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}
        >
          {isArabic ? "EN" : "عربي"}
        </button>

        {/* User Profile Button or Login Button */}
        <Link to="/profile" className="ml-4 flex items-center">
          <div className="w-8 h-8 bg-[#3949AB] rounded-full flex items-center justify-center text-white text-sm">
            AM
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
