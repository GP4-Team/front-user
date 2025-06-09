import React from 'react';
import { Users, Star, Award } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

const CourseInfoHeader = ({ course, getText }) => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm overflow-hidden mb-6`}>
      {/* Header Section with Image and Title */}
      <div className="flex flex-col lg:flex-row">
        {/* صورة الكورس - مصغرة */}
        <div className="relative lg:w-1/3 xl:w-1/4">
          <img 
            src={course.image} 
            alt={getText(course.title)}
            className="w-full h-48 lg:h-56 object-cover"
            onError={(e) => {
              e.target.src = 'https://academy1.gp-app.tafra-tech.com/images/material-holder.webp';
            }}
          />
          <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            {getText(course.badge)}
          </div>
        </div>
        
        {/* معلومات الكورس */}
        <div className="lg:w-2/3 xl:w-3/4 p-6 lg:p-8">
          {/* العنوان والوصف */}
          <div className="mb-6">
            <h1 className={`text-2xl lg:text-3xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {getText(course.title)}
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
              {getText(course.subtitle)}
            </p>
          </div>
          
          {/* معلومات سريعة */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {/* عدد الطلاب */}
            <div className={`flex items-center p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <Users size={20} className={`ml-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <div className={`font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {course.studentsCount}+
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {language === "ar" ? "طالب" : "Students"}
                </div>
              </div>
            </div>
            
            {/* التقييم */}
            <div className={`flex items-center p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
              <Star size={20} className={`ml-2 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              <div>
                <div className={`font-semibold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  {course.rating || 4.5}
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {language === "ar" ? "تقييم" : "Rating"}
                </div>
              </div>
            </div>
            
            {/* المستوى */}
            <div className={`flex items-center p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
              <Award size={20} className={`ml-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              <div>
                <div className={`font-semibold text-xs ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {getText(course.level)}
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {language === "ar" ? "المستوى" : "Level"}
                </div>
              </div>
            </div>
          </div>
          
          {/* معلومات المدرس */}
          <div className={`flex items-center p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border-l-4 border-purple-500`}>
            <img 
              src={course.instructorAvatar} 
              alt={getText(course.instructor)}
              className="w-12 h-12 rounded-full object-cover ml-4 ring-2 ring-purple-500 ring-offset-2"
              onError={(e) => {
                e.target.src = '/api/placeholder/48/48';
              }}
            />
            <div className="flex-1">
              <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {getText(course.instructor)}
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                {getText(course.subcategory)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInfoHeader;