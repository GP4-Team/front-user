import React from 'react';
import { Clock, FileText, Book } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * مكون بطاقة الكورس في صفحة التفاصيل
 * @param {Object} props - خصائص المكون
 * @param {Object} props.course - بيانات الكورس
 * @returns {JSX.Element} - مكون بطاقة الكورس
 */
const CourseCard = ({ course }) => {
  const { language } = useLanguage();
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;

  return (
    <div className="md:w-1/3">
      <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
        {/* Course Image */}
        <div className="relative">
          <img 
            src={course.image} 
            alt={getText(course.title.ar, course.title.en)}
            className="w-full object-cover h-48"
          />
          
          {/* Badge */}
          <div className="absolute top-0 right-0 bg-[#3949AB] text-white py-1 px-3 text-sm font-bold">
            {getText(course.level.ar, course.level.en)}
          </div>
        </div>
        
        {/* Card Content */}
        <div className="p-6">
          {/* Price */}
          <div className="mb-6 text-center">
            {course.price.current === 0 ? (
              <div className="text-green-600 font-bold text-xl mb-2">
                {getText('مجاني', 'Free')}
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-center">
                  <span className="text-[#3949AB] font-bold text-2xl">
                    {course.price.current} {course.price.currency}
                  </span>
                  {course.price.original > course.price.current && (
                    <span className="text-gray-400 line-through ml-2">
                      {course.price.original} {course.price.currency}
                    </span>
                  )}
                </div>
                {course.price.discount && (
                  <div className="text-green-600 text-sm mt-1">
                    {course.price.discount} {getText('خصم', 'discount')}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Enroll Button */}
          <button className="w-full bg-[#3949AB] text-white py-3 rounded-md font-medium transition-all hover:bg-[#303F9F] hover:shadow-md mb-4">
            {getText('اشترك في المعسكر', 'Enroll in Camp')}
          </button>
          
          {/* Add to Cart */}
          <button className="w-full border border-[#3949AB] text-[#3949AB] py-3 rounded-md font-medium transition-all hover:bg-blue-50 mb-6">
            {getText('إضافة لعربة التسوق', 'Add to Cart')}
          </button>
          
          {/* Course Includes */}
          <div className="text-gray-600">
            <h4 className="font-medium mb-2 text-[#37474F]">
              {getText('يتضمن المعسكر:', 'This camp includes:')}
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>{course.totalHours} {getText('ساعة', 'hours')} {course.totalMinutes} {getText('دقيقة', 'minutes')}</span>
              </li>
              <li className="flex items-center">
                <FileText size={16} className="mr-2" />
                <span>{course.sections.reduce((acc, section) => acc + section.lessons, 0)} {getText('درس', 'lessons')}</span>
              </li>
              <li className="flex items-center">
                <Book size={16} className="mr-2" />
                <span>{getText('موارد قابلة للتنزيل', 'Downloadable resources')}</span>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 3V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.92993 4.93005L6.33993 6.34005" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.6599 17.66L19.0699 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.92993 19.07L6.33993 17.66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.6599 6.34005L19.0699 4.93005" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{getText('وصول مدى الحياة', 'Lifetime access')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;