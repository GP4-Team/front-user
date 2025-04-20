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
      {/* معلومات السعر والخصم */}
      <div className="p-6 border-b border-gray-100">
        {/* عرض السعر الأصلي والمخفض */}
        <div className="flex items-baseline mb-2">
          {course.price.discountPercentage > 0 ? (
            <>
              <span className="text-2xl font-bold text-[#3949AB] ml-2">
                {course.price.discountedAmount} {course.price.currency}
              </span>
              <span className="text-lg text-gray-500 line-through">
                {course.price.amount} {course.price.currency}
              </span>
              <span className="ml-2 bg-[#3949AB]/10 text-[#3949AB] px-2 py-0.5 rounded-md text-xs font-bold">
                {language === "ar" ? "خصم" : "Discount"} {course.price.discountPercentage}%
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-[#3949AB]">
              {course.price.amount === 0 
                ? (language === "ar" ? "مجاني" : "Free") 
                : `${course.price.amount} ${course.price.currency}`}
            </span>
          )}
        </div>
        
        {/* مدة انتهاء العرض إن وجد */}
        {course.price.discountPercentage > 0 && course.price.expiryTime && (
          <div className="text-sm text-red-600 mb-4 flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{language === "ar" ? "ينتهي الخصم في:" : "Discount ends in:"} {course.price.expiryTime}</span>
          </div>
        )}
        
        {/* زر الاشتراك */}
        <button
          onClick={handleEnrollment}
          className="w-full py-3 bg-[#3949AB] hover:bg-[#303F9F] text-white font-medium rounded-md transition-colors"
        >
          {language === "ar" ? "دخول للمعسكر" : "Enter the Camp"}
        </button>
      </div>
      
      {/* معلومات الكورس */}
      <div className="p-6">
        <h3 className="font-bold text-gray-800 mb-4">
          {language === "ar" ? "معلومات المعسكر:" : "Camp Information:"}
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