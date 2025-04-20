// src/components/courseDetail/CourseVideoLesson.jsx
import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { Play, Info, X } from "lucide-react";

const CourseVideoLesson = ({ lesson }) => {
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
        {/* Video locked message */}
        {lesson.viewsRemaining === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
                <X size={40} className="text-red-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
              {language === "ar" ? "عذراً، لقد تم استنفاذ جميع المشاهدات المتاحة" : "Sorry, you've used all available views"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {language === "ar"
                ? `لقد استخدمت الحد الأقصى المسموح به من المشاهدات لهذا الدرس`
                : `You've used the maximum allowed views for this lesson`}
            </p>
            <div className="flex items-center mt-2">
              <Info size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {language === "ar" ? `الحد الأقصى للمشاهدات: ${lesson.maxViews}` : `Maximum views: ${lesson.maxViews}`}
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* Video player placeholder */}
            <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/80 flex items-center justify-center cursor-pointer hover:bg-blue-600/80 transition-colors">
                  <Play size={32} className="text-white ml-1" />
                </div>
              </div>
              {lesson.instructor && (
                <div className="absolute top-4 left-4 text-white text-sm font-medium">
                  {lesson.instructor}
                </div>
              )}
            </div>

            {/* Video controls and info */}
            <div className="text-center mt-6">
              <h2 className="text-2xl font-bold mb-4">{getText(lesson.title)}</h2>
              {lesson.viewsRemaining && lesson.maxViews && (
                <div className="mb-6">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {language === "ar"
                      ? `هذا الدرس محدد بعدد مشاهدات ${lesson.maxViews} ${lesson.maxViews}`
                      : `This lesson is limited to ${lesson.maxViews} ${lesson.maxViews} views`}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {language === "ar" ? `${lesson.viewsRemaining} مرات مشاهدة متبقية` : `${lesson.viewsRemaining} views remaining`}
                  </div>
                </div>
              )}
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors">
                {language === "ar" ? "شاهد الدرس" : "Watch Lesson"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseVideoLesson;
