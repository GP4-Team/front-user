import React from 'react';
import { Clock, Book, FileText, Play } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * مكون رأس صفحة المادة
 * @param {Object} props - خصائص المكون
 * @param {Object} props.course - بيانات المادة
 * @returns {JSX.Element} - مكون رأس صفحة المادة
 */
const CourseHeader = ({ course }) => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;

  return (
    <div className={`${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} pb-8`}>
      <div className="container mx-auto px-4">
        {/* Course Header with image */}
        <div className="flex justify-end mb-2">
          <img 
            src={course.image || "/api/placeholder/400/250"}
            alt={getText(course.title.ar, course.title.en)}
            className="rounded-lg w-32 h-auto"
          />
        </div>
        
        {/* Course title */}
        <div className="text-right">
          <h1 className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
            {getText(course.title.ar, course.title.en)}
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            {getText("معسكر تجريبي لمنصة اديورا التعليمية 2025", "Experimental Camp for Eduara Educational Platform 2025")}
          </p>
          
          {/* Instructor info */}
          <div className="flex items-center justify-end mb-6">
            <div className="text-right ml-3">
              <p className="font-medium">{getText(course.instructor.ar, course.instructor.en)}</p>
              <p className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {getText("مدرسة كيمياء ثالثة ثانوي", "Chemistry Teacher - 3rd Secondary