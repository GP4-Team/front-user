import React from 'react';
import { Clock, Book, FileText, CheckCircle, Play, Users } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const CourseInfoCard = ({ course, getText, language, handleEnrollment }) => {
  const { isDarkMode } = useTheme();
  
  // الأيقونة المناسبة لكل نوع معلومة
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Clock':
        return <Clock size={16} className="text-blue-500" />;
      case 'Book':
        return <Book size={16} className="text-green-500" />;
      case 'FileText':
        return <FileText size={16} className="text-purple-500" />;
      default:
        return <CheckCircle size={16} className="text-blue-500" />;
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden sticky top-24 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      {/* زر الاشتراك الرئيسي */}
      <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600">
        <button
          onClick={handleEnrollment}
          className="w-full py-3 bg-white hover:bg-gray-50 text-purple-600 font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-sm flex items-center justify-center"
        >
          <Play size={18} className="ml-2" />
          {language === "ar" ? "ابدأ التعلم الآن" : "Start Learning Now"}
        </button>
      </div>
      
      {/* معلومات الكورس */}
      <div className="p-4">
        <h3 className={`font-bold text-lg mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {language === "ar" ? "معلومات المادة" : "Course Information"}
        </h3>
        
        <div className="space-y-3">
          {course.courseInfo.map((info, index) => (
            <div key={index} className={`flex items-center p-2 rounded-md ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors duration-200`}>
              <div className="ml-3">
                {getIcon(info.icon)}
              </div>
              <span className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                {getText(info.title)}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* إحصائيات سريعة */}
      <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700 bg-gray-800/30' : 'border-gray-100 bg-gray-50/30'}`}>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className={`text-xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              {course.studentsCount}+
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {language === "ar" ? "طالب" : "Students"}
            </div>
          </div>
          <div className="text-center">
            <div className={`text-xl font-bold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
              {course.rating || 4.5}
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {language === "ar" ? "تقييم" : "Rating"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInfoCard;