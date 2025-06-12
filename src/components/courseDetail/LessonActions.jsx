// src/components/courseDetail/LessonActions.jsx
import React from 'react';
import { Download } from 'lucide-react';

const LessonActions = ({ 
  selectedLesson, 
  courseMaterials, 
  setCourseMaterials, 
  setSelectedLesson, 
  materialDetails, 
  language, 
  isRTL 
}) => {
  return (
    <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {materialDetails?.url && (
            <a
              href={materialDetails.url}
              download
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <Download size={16} className={isRTL ? "ml-2" : "mr-2"} />
              {language === "ar" ? "تحميل المادة" : "Download"}
            </a>
          )}
          
          {materialDetails?.description && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {materialDetails.description}
            </div>
          )}
        </div>
        
        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
          <button 
            onClick={() => {
              const currentIndex = courseMaterials.findIndex(m => m.id === selectedLesson.id);
              if (currentIndex > 0) {
                setSelectedLesson(courseMaterials[currentIndex - 1]);
              }
            }}
            disabled={courseMaterials.findIndex(m => m.id === selectedLesson.id) === 0}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {language === "ar" ? "السابق" : "Previous"}
          </button>
          
          <button 
            onClick={() => {
              // Mark lesson as complete logic here
              const updatedMaterials = courseMaterials.map(m => 
                m.id === selectedLesson.id ? {...m, isCompleted: !m.isCompleted} : m
              );
              setCourseMaterials(updatedMaterials);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {selectedLesson.isCompleted 
              ? (language === "ar" ? "إعادة المشاهدة" : "Rewatch")
              : (language === "ar" ? "تم الانتهاء" : "Mark Complete")
            }
          </button>
          
          <button 
            onClick={() => {
              const currentIndex = courseMaterials.findIndex(m => m.id === selectedLesson.id);
              if (currentIndex < courseMaterials.length - 1) {
                setSelectedLesson(courseMaterials[currentIndex + 1]);
              }
            }}
            disabled={courseMaterials.findIndex(m => m.id === selectedLesson.id) === courseMaterials.length - 1}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {language === "ar" ? "التالي" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonActions;