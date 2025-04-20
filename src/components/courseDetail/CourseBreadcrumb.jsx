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
    <span className="text-gray-400 mx-2">
      {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
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
    <nav className="flex items-center text-sm">
      <Link 
        to="/" 
        className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
      >
        <Home size={16} />
      </Link>
      
      <Separator />
      
      <Link 
        to="/courses" 
        className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
      >
        {language === "ar" ? "الدورات التعليمية" : "Courses"}
      </Link>
      
      <Separator />
      
      <Link 
        to={`/courses/${course.id}`} 
        className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 truncate max-w-[150px]"
      >
        {getText(course.title)}
      </Link>
      
      {currentSection && (
        <>
          <Separator />
          <span className="text-gray-500 dark:text-gray-400 truncate max-w-[100px]">
            {getText(currentSection.title)}
          </span>
        </>
      )}
      
      {currentLesson && (
        <>
          <Separator />
          <span className="text-blue-500 dark:text-blue-400 truncate max-w-[120px]">
            {getText(currentLesson.title)}
          </span>
        </>
      )}
    </nav>
  );
};

export default CourseBreadcrumb;
