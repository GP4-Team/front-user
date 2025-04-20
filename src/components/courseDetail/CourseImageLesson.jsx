// src/components/courseDetail/CourseImageLesson.jsx
import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { Image as ImageIcon } from "lucide-react";

const CourseImageLesson = ({ lesson }) => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();

  // Helper function to get text based on language
  const getText = (obj) => {
    if (!obj) return "";
    return obj[language] || obj.en || "";
  };

  return (
    <div className="p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">{getText(lesson.title)}</h2>
        
        {/* Image placeholder */}
        <div className="relative w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
          <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <ImageIcon size={64} className="text-gray-400 dark:text-gray-500" />
          </div>
          <div className="p-4 border-t dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {language === "ar" ? "انقر لفتح الصورة بحجم أكبر" : "Click to open image in full size"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseImageLesson;
