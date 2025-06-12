// src/components/courseDetail/CourseHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const CourseHeader = ({ courseInfo, language, isRTL, courseMaterials, materialDetails }) => {
  const getText = (obj) => {
    if (!obj) return "";
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.en || obj.ar || "";
  };

  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <Link 
          to="/courses" 
          className={`flex items-center text-blue-600 hover:text-blue-700 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          {isRTL ? <ArrowRight size={16} className="ml-1" /> : <ArrowLeft size={16} className="mr-1" />}
          {language === "ar" ? "العودة للكورسات" : "Back to Courses"}
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-2">
        {courseInfo ? getText(courseInfo.title) : (language === "ar" ? "كورس تعليمي" : "Educational Course")}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {courseInfo ? getText(courseInfo.description) : (language === "ar" ? "وصف الكورس" : "Course description")}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            {materialDetails?.instructor || courseInfo?.instructor || (language === "ar" ? "المدرس" : "Instructor")}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          {courseMaterials.length} {language === "ar" ? "درس" : "lessons"}
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;