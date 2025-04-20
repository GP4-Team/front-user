import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * مكون رأس صفحة تفاصيل الكورس
 * @param {Object} props - خصائص المكون
 * @param {Object} props.course - بيانات الكورس
 * @returns {JSX.Element} - مكون رأس صفحة تفاصيل الكورس
 */
const CourseHeader = ({ course }) => {
  const { language } = useLanguage();
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;

  return (
    <div className="md:w-2/3">
      {/* Navigation */}
      <div className="mb-4">
        <Link to="/courses" className="text-[#3949AB] hover:underline text-sm">
          {getText('الكورسات', 'Courses')} {' > '}
        </Link>
        <span className="text-gray-600 text-sm">
          {getText(course.title.ar, course.title.en)}
        </span>
      </div>
      
      <h1 className="text-3xl font-bold text-[#37474F] mb-4">
        {getText(course.title.ar, course.title.en)}
      </h1>
      
      <p className="text-gray-600 mb-4">
        {getText(course.description.ar, course.description.en)}
      </p>
            
      
      {/* Course meta */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Rating */}
        <div className="flex items-center">
          <div className="flex items-center text-[#FFC107]">
            <Star size={16} fill="#FFC107" />
            <Star size={16} fill="#FFC107" />
            <Star size={16} fill="#FFC107" />
            <Star size={16} fill="#FFC107" />
            <Star size={16} fill="none" />
          </div>
          <span className="ml-1 text-xl font-semibold text-[#3949AB]">
            {course.rating.toFixed(1)}
          </span>
          <span className="ml-1 text-gray-500 text-sm">
            ({course.reviews} {getText('مراجعة', 'reviews')})
          </span>
        </div>
        
        {/* Students */}
        <div className="flex items-center text-gray-600">
          <Users size={16} className="mr-1" />
          <span>{course.totalStudents} {getText('طالب', 'students')}</span>
        </div>
        
        {/* Duration */}
        <div className="flex items-center text-gray-600">
          <Clock size={16} className="mr-1" />
          <span>{course.totalHours} {getText('ساعة', 'hours')} {course.totalMinutes} {getText('دقيقة', 'minutes')}</span>
        </div>
        
        {/* Last updated */}
        <div className="text-gray-600 text-sm">
          {getText('آخر تحديث:', 'Last updated:')} {course.lastUpdated}
        </div>
      </div>
      
      {/* Instructor */}
      <div className="flex items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
        <img 
          src={course.instructor.avatar} 
          alt={getText(course.instructor.name.ar, course.instructor.name.en)} 
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="font-bold text-lg">{getText(course.instructor.name.ar, course.instructor.name.en)}</h3>
          <p className="text-gray-600">{getText(course.instructor.title.ar, course.instructor.title.en)}</p>
          <div className="flex items-center mt-1">
            <Star size={14} fill="#FFC107" />
            <span className="ml-1 text-sm text-gray-600">{course.instructor.rating} • {course.instructor.totalStudents} {getText('طالب', 'students')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;