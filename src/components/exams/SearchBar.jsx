// components/exams/SearchBar.jsx
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";

// Icon components
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const GridViewIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const ListViewIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);

const SearchBar = ({ 
  searchQuery, 
  setSearchQuery, 
  viewMode, 
  setViewMode, 
  setShowFilters, 
  translations 
}) => {
  const { isDarkMode } = useTheme();
  const { isRTL } = useLanguage();

  // Default translations if not provided
  const t = translations || {
    searchPlaceholder: isRTL ? "ابحث عن امتحان..." : "Search for an exam...",
    filterButton: isRTL ? "تصفية" : "Filter"
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-neutral-800" : "bg-white"
      } rounded-lg shadow-md mb-6 p-4 transform transition-all duration-300 hover:shadow-lg`}
    >
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder={t.searchPlaceholder || "ابحث عن امتحان..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full py-2 px-8 rounded-md border text-right ${
              isDarkMode
                ? "bg-neutral-700 border-neutral-600 text-white placeholder-gray-400"
                : "bg-[#F0F4F8] border-[#F0F4F8] text-[#37474F]"
            } focus:outline-none focus:ring-2 focus:ring-primary-base transition-all duration-300`}
          />
          <div
            className={`absolute right-3 top-2.5 ${
              isDarkMode ? "text-gray-400" : "text-gray-400"
            }`}
          >
            <SearchIcon className="w-4 h-4" />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(prev => !prev)}
            className={`${
              isDarkMode
                ? "bg-primary-dark hover:bg-primary-base"
                : "bg-[#3949AB] hover:bg-[#1A237E]"
            } text-white px-4 py-2 rounded-md flex items-center transition-all duration-300 hover:shadow-lg transform hover:scale-105`}
          >
            <FilterIcon className="mr-2 w-4 h-4" />
            <span>{t.filterButton || "تصفية"}</span>
          </button>

          <div
            className={`flex border rounded-md overflow-hidden ${
              isDarkMode ? "border-neutral-600" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 ${
                viewMode === "grid"
                  ? isDarkMode
                    ? "bg-primary-dark text-white"
                    : "bg-[#3949AB] text-white"
                  : isDarkMode
                  ? "bg-neutral-700 text-primary-light"
                  : "bg-[#F0F4F8] text-[#3949AB]"
              } transition-colors duration-300`}
            >
              <GridViewIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 ${
                viewMode === "list"
                  ? isDarkMode
                    ? "bg-primary-dark text-white"
                    : "bg-[#3949AB] text-white"
                  : isDarkMode
                  ? "bg-neutral-700 text-primary-light"
                  : "bg-[#F0F4F8] text-[#3949AB]"
              } transition-colors duration-300`}
            >
              <ListViewIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
