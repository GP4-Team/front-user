// src/components/courseDetail/CourseExamLesson.jsx
import React from 'react';
import { Star } from 'lucide-react';

const CourseExamLesson = ({ materialDetails, selectedLesson, language }) => {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-800 flex items-center justify-center mx-auto mb-4">
        <Star size={32} className="text-yellow-600 dark:text-yellow-400" />
      </div>
      <h3 className="text-xl font-medium mb-4 text-yellow-800 dark:text-yellow-200">
        {materialDetails?.title || selectedLesson.title}
      </h3>
      <p className="text-yellow-700 dark:text-yellow-300 mb-4">
        {materialDetails?.description || (language === "ar" ? "اختبار تقييمي لقياس فهمك للمادة" : "Assessment quiz to test your understanding")}
      </p>
      <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg">
        {language === "ar" ? "بدء الاختبار" : "Start Quiz"}
      </button>
    </div>
  );
};

export default CourseExamLesson;