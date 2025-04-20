// src/components/courses/SimplifiedCourseCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { colors } from '../../utils/colors';

/**
 * مكون بطاقة الكورس المبسط
 * @param {Object} course - بيانات الكورس
 * @returns {JSX.Element} - مكون بطاقة الكورس
 */
const SimplifiedCourseCard = ({ course }) => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;
  
  return (
    <Link to={`/courses/${course.id}`} className="block">
      <div className={`${isDarkMode ? 'bg-[#1E1E1E] text-[#E0E0E0]' : 'bg-white text-[#37474F]'} rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 hover:scale-[1.02] group`}>
        {/* صورة الكورس */}
        <div className="relative overflow-hidden">
          <img 
            src={course.image || "/api/placeholder/400/225"} 
            alt={getText(course.title.ar, course.title.en)}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay effect on hover */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </div>
        
        {/* معلومات الكورس */}
        <div className="p-4">
          <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-white group-hover:text-[#7986CB]' : 'text-[#37474F] group-hover:text-[#3949AB]'} transition-colors duration-300`}>
            {getText(course.title.ar, course.title.en)}
          </h3>
          
          <p className={`text-sm mb-2 line-clamp-2 transition-colors duration-300 ${isDarkMode ? 'text-[#AAAAAA] group-hover:text-[#E0E0E0]' : 'text-gray-600 group-hover:text-gray-700'}`}>
            {course.description && getText(course.description.ar, course.description.en)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SimplifiedCourseCard;