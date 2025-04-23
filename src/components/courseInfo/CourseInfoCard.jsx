import React from 'react';
import { Clock, Book, FileText, CheckCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const CourseInfoCard = ({ course, getText, language, handleEnrollment }) => {
  const { isDarkMode } = useTheme();
  
  // الأيقونة المناسبة لكل نوع معلومة
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Clock':
        return <Clock size={18} className="text-[#3949AB]" />;
      case 'Book':
        return <Book size={18} className="text-[#3949AB]" />;
      case 'FileText':
        return <FileText size={18} className="text-[#3949AB]" />;
      default:
        return <CheckCircle size={18} className="text-[#3949AB]" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
      {/* زر الاشتراك */}
      <div className="p-6 border-b border-gray-100">
        <button
          onClick={handleEnrollment}
          className="w-full py-3 bg-[#3949AB] hover:bg-[#303F9F] text-white font-medium rounded-md transition-colors"
        >
          {language === "ar" ? "دخول للمادة" : "Enter the Course"}
        </button>
      </div>
      
      {/* معلومات الكورس */}
      <div className="p-6">
        <h3 className="font-bold text-gray-800 mb-4">
          {language === "ar" ? "معلومات المادة:" : "Course Information:"}
        </h3>
        
        <div className="space-y-4">
          {course.courseInfo.map((info, index) => (
            <div key={index} className="flex items-center">
              <div className="mr-3 text-[#3949AB]">
                {getIcon(info.icon)}
              </div>
              <span className="text-gray-700">{getText(info.title)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseInfoCard;