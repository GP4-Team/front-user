import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

// Get subject icon for each category
const getSubjectIcon = (category, size = 24) => {
  const { Atom, Beaker, Calculator, Dna, Book } = require('lucide-react');
  
  if (category.toLowerCase().includes("physics") || 
      category.includes("فيزياء")) {
    return <Atom size={size} />;
  } else if (category.toLowerCase().includes("chemistry") || 
          category.includes("كيمياء")) {
    return <Beaker size={size} />;
  } else if (category.toLowerCase().includes("math") || 
          category.includes("رياضيات")) {
    return <Calculator size={size} />;
  } else if (category.toLowerCase().includes("biology") || 
          category.includes("أحياء")) {
    return <Dna size={size} />;
  } else {
    return <Book size={size} />;
  }
};

// Helper function to get text in current language
const getText = (textObj, language) => {
  // Check if textObj is undefined or not an object
  if (!textObj || typeof textObj !== 'object') {
    return textObj || '';
  }
  
  // Return the appropriate language version or fallback
  return textObj[language] || textObj.en || '';
};

const CourseCard = ({ course, isUserCourse = false, translations }) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const isArabic = language === 'ar';

  return (
    <Link 
      to={`/courses/${course.id}`} 
      className={`block rounded-xl overflow-hidden shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg ${isDarkMode ? 'bg-neutral-800' : 'bg-background-card-light'}`}
    >
      <div className="relative">
        <img 
          src={course.image} 
          alt={getText(course.title, language)} 
          className="w-full h-40 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/400x225/${isDarkMode ? '1E1E1E/7986CB' : 'FFFFFF/3949AB'}?text=${encodeURIComponent(getText(course.title, language))}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {course.badge && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium" style={{ 
            backgroundColor: course.badgeColor || '#3949AB',
            color: 'white' 
          }}>
            {getText(course.badge, language)}
          </div>
        )}
        
        {isUserCourse ? (
          <div className="absolute bottom-3 left-3 flex items-center">
            <div className={`px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm`}>
              {course.progress}% {isArabic ? 'مكتمل' : 'Complete'}
            </div>
          </div>
        ) : (
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className={i < Math.floor(course.rating) ? 'text-accent' : 'text-gray-300'} 
                    fill={i < Math.floor(course.rating) ? '#FFC107' : 'none'} 
                  />
                ))}
              </div>
              <span className="text-white text-xs ml-1">{course.rating}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-primary-dark/50' : 'bg-primary-light/30'}`}>
            {getSubjectIcon(getText(course.category, language), 14)}
          </div>
          <span className={`text-xs ${isDarkMode ? 'text-primary-light' : 'text-primary-base'} ml-2 rtl:mr-2 rtl:ml-0`}>
            {getText(course.category, language)}
          </span>
        </div>
        <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-text-light' : 'text-text-dark'}`}>
          {getText(course.title, language)}
        </h3>
        <p className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
          {getText(course.level, language)}
        </p>
        
        {isUserCourse ? (
          <div>
            <div className="mt-4">
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-accent h-2 rounded-full" 
                  style={{ width: `${course.progress}%` }} 
                />
              </div>
            </div>
            
            <button className="w-full mt-4 py-2 bg-primary-base hover:bg-primary-dark text-text-light rounded-lg font-medium text-sm">
              {translations.continueLearning}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center">
              <Users size={14} className={isDarkMode ? 'text-neutral-400' : 'text-neutral-500'} />
              <span className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'} ml-1 rtl:mr-1 rtl:ml-0`}>
                {course.students}
              </span>
            </div>
            <div className="flex items-center">
              <Clock size={14} className={isDarkMode ? 'text-neutral-400' : 'text-neutral-500'} />
              <span className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'} ml-1 rtl:mr-1 rtl:ml-0`}>
                {getText(course.duration, language) || '8 weeks'}
              </span>
            </div>
            <span className="text-xs font-medium text-state-success bg-state-success/10 px-2 py-0.5 rounded-full">
              {translations.free}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CourseCard;
