// src/components/courseDetail/CourseBreadcrumb.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";

const CourseBreadcrumb = ({ course, currentLesson }) => {
  const { language, isRTL } = useLanguage();

  // Helper function to get text based on language
  const getText = (obj) => {
    if (!obj) return "";
    return obj[language] || obj.en || "";
  };

  const Separator = () => (
    <span className="flex items-center text-gray-300 dark:text-gray-600 mx-2">
      {isRTL ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
    </span>
  );

  // Find the current section
  let currentSection = null;
  if (currentLesson) {
    for (const section of course.sections) {
      if (section.lessons && section.lessons.some(lesson => lesson.id === currentLesson.id)) {
        currentSection = section;
        break;
      }
    }
  }

  return (
    <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400" dir={isRTL ? 'rtl' : 'ltr'}>
      <Link 
        to="/" 
        className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <Home size={16} />
      </Link>
      
      <Separator />
      
      <Link 
        to="/courses" 
        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
      >
        {language === "ar" ? "الدورات التعليمية" : "Courses"}
      </Link>
      
      <Separator />
      
      <span className="text-gray-700 dark:text-gray-300 font-semibold truncate max-w-[200px]">
        {getText(course.title)}
      </span>
      
      {currentLesson && (
        <>
          <Separator />
          <span className="text-blue-600 dark:text-blue-400 font-medium truncate max-w-[150px]">
            {getText(currentLesson.title)}
          </span>
        </>
      )}
    </nav>
  );
};

export default CourseBreadcrumb;
