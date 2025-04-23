// src/components/courseDetail/CourseSidebar.jsx
import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import {
  ChevronDown,
  ChevronUp,
  Play,
  FileText,
  Volume2,
  Image as ImageIcon,
  CheckCircle,
  Lock,
  Files
} from "lucide-react";

const CourseSidebar = ({ course, expandedSections, toggleSection, currentLesson, selectLesson }) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();

  // Helper function to get text based on language
  const getText = (obj) => {
    if (!obj) return "";
    return obj[language] || obj.en || "";
  };

  // Get icon based on lesson type
  const getLessonIcon = (lesson) => {
    switch (lesson.type) {
      case "video":
        return <Play size={18} className={`${isDarkMode ? "text-[#7986CB]" : "text-[#3949AB]"} mr-2 rtl:ml-2`} />;
      case "audio":
        return <Volume2 size={18} className={`${isDarkMode ? "text-[#7986CB]" : "text-[#3949AB]"} mr-2 rtl:ml-2`} />;
      case "image":
        return <ImageIcon size={18} className={`${isDarkMode ? "text-[#7986CB]" : "text-[#3949AB]"} mr-2 rtl:ml-2`} />;
      case "exam":
        return <Files size={18} className={`${isDarkMode ? "text-[#7986CB]" : "text-[#3949AB]"} mr-2 rtl:ml-2`} />;
      default:
        return <FileText size={18} className={`${isDarkMode ? "text-blue-400" : "text-blue-500"} mr-2 rtl:ml-2`} />;
    }
  };

  // Get status icon based on lesson status
  const getStatusIcon = (lesson) => {
    switch (lesson.status) {
      case "completed":
        return <CheckCircle size={18} className="text-[#81C784] ml-2 rtl:mr-2" />;
      case "locked":
        return <Lock size={18} className="text-[#B0BEC5] ml-2 rtl:mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="sticky top-32 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden max-h-[calc(100vh-150px)] overflow-y-auto">
      {/* Header with course info */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#1A237E] dark:bg-[#3949AB]/20 rounded-full flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0">
              <span className="text-[#FFC107] text-sm font-medium">
                {language === "ar" ? course.sections.length : course.sections.length}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-medium">
                {language === "ar" ? `${course.sections.length} قسم | ` : `${course.sections.length} Sections | `}
                {language === "ar" 
                  ? `${course.sections.reduce((acc, section) => acc + (section.lessons ? section.lessons.length : 0), 0)} درس` 
                  : `${course.sections.reduce((acc, section) => acc + (section.lessons ? section.lessons.length : 0), 0)} Lessons`
                }
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      {course.sections.map((section) => (
        <div key={section.id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
          {/* Section header */}
          <div 
            className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between ${
              expandedSections[section.id] ? "bg-gray-50 dark:bg-gray-700" : ""
            }`}
            onClick={() => toggleSection(section.id)}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#3949AB] rounded-full flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0">
                <span className="text-white text-sm font-medium">
                  {section.completed}/{section.lessons ? section.lessons.length : 0}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-[#37474F]">
                  {section.lessons && section.lessons.length > 0 ? getText(section.lessons[0].title) : getText(section.title)}
                </h3>
              </div>
            </div>
            <div>
              {expandedSections[section.id] ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </div>
          </div>

          {/* Lessons */}
          {expandedSections[section.id] && section.lessons && (
            <div className="px-4 pb-2">
              {section.lessons.map((lesson) => (
                <div 
                  key={lesson.id}
                  className={`py-3 px-2 flex items-center justify-between rounded-md cursor-pointer ${
                    currentLesson && currentLesson.id === lesson.id 
                      ? "bg-[#ECEFF1] dark:bg-[#1A237E]/20" 
                      : "hover:bg-[#F5F7F9] dark:hover:bg-[#3949AB]/20"
                  } transition-colors ${lesson.status === "locked" ? "opacity-70" : ""}`}
                  onClick={() => lesson.status !== "locked" && selectLesson(lesson)}
                >
                  <div className="flex items-center">
                    {getLessonIcon(lesson)}
                    <div>
                      <h4 className={`text-sm font-medium ${
                        lesson.status === "locked" ? "text-[#37474F] dark:text-[#F0F4F8]" : "text-[#37474F] dark:text-[#F0F4F8]"
                      }`}>
                        {getText(lesson.title)}
                      </h4>
                      {lesson.duration && (
                        <p className="text-xs text-[#37474F] dark:text-[#B0BEC5]">
                          {language === "ar" ? `(قدره ${getText(lesson.duration)})` : `(${getText(lesson.duration)})`}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    {getStatusIcon(lesson)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseSidebar;
