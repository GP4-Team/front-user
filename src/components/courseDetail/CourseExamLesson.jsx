// src/components/courseDetail/CourseExamLesson.jsx
import React from 'react';
import { useLanguage } from "../../contexts/LanguageContext";
import { Star } from 'lucide-react';

const CourseExamLesson = ({ lesson, materialDetails }) => {
  const { language } = useLanguage();

  // Translation function
  const getText = (arText, enText) => {
    return language === "ar" ? arText : enText;
  };

  // Helper function to get text based on language from object
  const getTextFromObj = (obj) => {
    if (!obj) return "";
    return obj[language] || obj.en || obj.ar || "";
  };

  // Get material info with fallbacks
  const materialInfo = {
    name: materialDetails?.name || getTextFromObj(lesson.title),
    description: materialDetails?.description || getTextFromObj(lesson.description),
    instructor: materialDetails?.user?.name || lesson.instructor,
    courseInfo: materialDetails?.course || lesson.courseInfo,
    courseIdea: materialDetails?.course_idea || lesson.courseIdea
  };

  return (
    <div className="p-4">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-800 flex items-center justify-center mx-auto mb-4">
          <Star size={32} className="text-yellow-600 dark:text-yellow-400" />
        </div>
        <h3 className="text-xl font-medium mb-4 text-yellow-800 dark:text-yellow-200">
          {materialInfo.name}
        </h3>
        <p className="text-yellow-700 dark:text-yellow-300 mb-4">
          {materialInfo.description || getText("اختبار تقييمي لقياس فهمك للمادة", "Assessment quiz to test your understanding")}
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition-colors">
          {getText("بدء الاختبار", "Start Quiz")}
        </button>
        
        {/* Additional exam info */}
        {(materialInfo.instructor || materialInfo.courseInfo) && (
          <div className="mt-6 pt-4 border-t border-yellow-200 dark:border-yellow-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {materialInfo.instructor && (
                <div className="text-yellow-700 dark:text-yellow-300">
                  <span className="font-medium">{getText("المدرس:", "Instructor:")}</span> {materialInfo.instructor}
                </div>
              )}
              {materialInfo.courseInfo && (
                <div className="text-yellow-700 dark:text-yellow-300">
                  <span className="font-medium">{getText("الكورس:", "Course:")}</span> {materialInfo.courseInfo.name}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseExamLesson;
