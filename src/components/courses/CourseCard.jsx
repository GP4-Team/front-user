import React from 'react';
import { Book } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * مكون بطاقة الكورس
 * @param {Object} course - بيانات الكورس
 * @returns {JSX.Element} - مكون بطاقة الكورس
 */
const CourseCard = ({ course }) => {
  const { language } = useLanguage();
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;
  
  // استخراج رمز الكورس وتحويله إلى حروف كبيرة
  const courseCode = course.code?.toUpperCase() || '';
  
  return (
<Link to={`/courses/${course.id}`} className="block">
<div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 hover:scale-[1.02] group">
        {/* صورة الكورس */}
        <div className="relative overflow-hidden">
          <img 
            src={course.image || "/api/placeholder/400/225"} 
            alt={getText(course.title.ar, course.title.en)}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* شريط مميز للكورس حسب النوع */}
          <div 
            className={`absolute top-0 ${language === 'ar' ? 'right-0' : 'left-0'} py-2 px-3 text-white font-bold transition-all duration-300 group-hover:py-3`}
            style={{ backgroundColor: course.badgeColor || '#3949AB' }}
          >
            <span className="text-sm">{course.level && getText(course.level.ar, course.level.en)}</span>
          </div>
          
          {/* Overlay effect on hover */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </div>
        
        {/* معلومات المدرس */}
        <div className="flex items-center p-4 border-b border-gray-100">
          <img 
            src={course.instructorAvatar || "/api/placeholder/40/40"} 
            alt={course.instructor && getText(course.instructor.ar, course.instructor.en)}
            className="w-10 h-10 rounded-full object-cover mr-3 transition-transform duration-300 group-hover:scale-110"
          />
          <div className="text-sm">
            <p className="font-medium">{course.instructor && getText(course.instructor.ar, course.instructor.en)}</p>
            <p className="text-gray-500">{course.instructorTitle && getText(course.instructorTitle.ar, course.instructorTitle.en)}</p>
          </div>
        </div>
        
        {/* معلومات الكورس */}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 text-[#37474F] group-hover:text-[#3949AB] transition-colors duration-300">
            {getText(course.title.ar, course.title.en)}
          </h3>
          
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 transition-colors duration-300 group-hover:text-gray-700">
            {course.description && getText(course.description.ar, course.description.en)}
          </p>
          
          {/* تصنيف الكورس والسعر */}
          <div className="flex justify-between items-center">
            {/* التصنيف */}
            <div className="flex items-center text-gray-700 text-sm">
              <Book size={16} className="mr-1 transition-transform duration-300 group-hover:scale-125" />
              <span>{course.category && getText(course.category.ar, course.category.en)}</span>
            </div>
            
            {/* السعر */}
            <div className="flex items-center">
              <div className="bg-blue-100 text-[#3949AB] p-1 rounded text-xs font-bold mr-2 transition-all duration-300 group-hover:bg-[#3949AB] group-hover:text-white">
                {courseCode}
              </div>
              <div className={`${course.price?.amount === 0 ? 'bg-green-100 text-green-600 group-hover:bg-green-600' : 'bg-[#3949AB] text-white'} py-1 px-3 rounded-md text-sm font-medium transition-all duration-300 group-hover:shadow-md ${course.price?.amount === 0 ? 'group-hover:text-white' : ''}`}>
                {course.price?.amount === 0 
                  ? getText('مجاني', 'Free') 
                  : `${course.price?.amount} ${course.price?.currency}`
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;