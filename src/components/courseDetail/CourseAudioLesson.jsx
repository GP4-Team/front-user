// src/components/courseDetail/CourseAudioLesson.jsx
import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { Play, Info, X, Headphones } from "lucide-react";

const CourseAudioLesson = ({ lesson }) => {
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
        
        {/* Audio locked message */}
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
            {/* Audio player placeholder */}
            <div className="max-w-2xl mx-auto">
              <div className="w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md p-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Headphones size={32} className="text-blue-500 dark:text-blue-400" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">0:00</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{getText(lesson.duration)}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-2 rounded-full w-0"></div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
                    <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="19 20 9 12 19 4 19 20"></polygon>
                        <polygon points="9 20 9 4 4 12 9 20"></polygon>
                      </svg>
                    </button>
                    
                    <button className="p-4 rounded-full bg-blue-500 text-white">
                      <Play size={24} />
                    </button>
                    
                    <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 4 15 12 5 20 5 4"></polygon>
                        <polygon points="15 4 15 20 20 12 15 4"></polygon>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Audio info */}
            <div className="mt-6">
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseAudioLesson;
