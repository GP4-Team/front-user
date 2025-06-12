// src/components/courseDetail/LessonContent.jsx
import React from 'react';
import { Loader } from 'lucide-react';
import CourseVideoLesson from './CourseVideoLesson';
import CourseAudioLesson from './CourseAudioLesson';
import CourseImagePdfLesson from './CourseImagePdfLesson';
import CourseExamLesson from './CourseExamLesson';

const LessonContent = ({ 
  selectedLesson, 
  materialDetails, 
  isMaterialLoading, 
  language, 
  isRTL 
}) => {
  if (!selectedLesson) return null;
  
  if (isMaterialLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4" size={32} />
          <p>{language === "ar" ? "جاري تحميل المحتوى..." : "Loading content..."}</p>
        </div>
      </div>
    );
  }

  switch (selectedLesson.type) {
    case "video":
      return <CourseVideoLesson materialDetails={materialDetails} language={language} isRTL={isRTL} />;
    
    case "audio":
      return <CourseAudioLesson materialDetails={materialDetails} language={language} isRTL={isRTL} />;
    
    case "pdf":
    case "image":
      return <CourseImagePdfLesson materialDetails={materialDetails} language={language} isRTL={isRTL} />;
    
    case "exam":
      return <CourseExamLesson materialDetails={materialDetails} selectedLesson={selectedLesson} language={language} />;
    
    default:
      return (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
          <h3 className="text-xl font-medium mb-4">{materialDetails?.title || selectedLesson.title}</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {materialDetails?.description || (language === "ar" ? "محتوى تعليمي" : "Educational content")}
          </p>
        </div>
      );
  }
};

export default LessonContent;