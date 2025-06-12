// src/components/courseDetail/LessonSidebar.jsx
import React from 'react';
import { Book, Play, FileText, Headphones, Star, Image as ImageIcon } from 'lucide-react';

const LessonSidebar = ({ 
  courseMaterials, 
  selectedLesson, 
  setSelectedLesson, 
  language, 
  isRTL 
}) => {
  const getLessonIcon = (type) => {
    switch (type) {
      case "video":
        return <Play size={16} />;
      case "pdf":
        return <FileText size={16} />;
      case "image":
        return <ImageIcon size={16} />;
      case "audio":
        return <Headphones size={16} />;
      case "exam":
        return <Star size={16} />;
      default:
        return <Book size={16} />;
    }
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="font-semibold mb-4">
          {language === "ar" ? "محتوى الكورس" : "Course Content"}
        </h3>
        
        {courseMaterials.length === 0 ? (
          <div className="text-center py-8">
            <Book size={32} className="mx-auto mb-2 text-gray-400" />
            <p className="text-gray-500 text-sm">
              {language === "ar" ? "لا توجد مواد متاحة" : "No materials available"}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {courseMaterials.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson)}
                disabled={!lesson.isUnlocked}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedLesson?.id === lesson.id
                    ? 'bg-blue-100 dark:bg-blue-900/50 border border-blue-300 dark:border-blue-700'
                    : lesson.isUnlocked
                    ? 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                    : 'bg-gray-50 dark:bg-gray-700 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                    <div className={`p-1 rounded ${
                      lesson.isCompleted 
                        ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                        : selectedLesson?.id === lesson.id
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                        : 'bg-gray-100 dark:bg-gray-600 text-gray-500'
                    }`}>
                      {getLessonIcon(lesson.type)}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${
                        !lesson.isUnlocked ? 'text-gray-400' : ''
                      }`}>
                        {lesson.title}
                      </p>
                      <p className="text-xs text-gray-500">{lesson.duration}</p>
                    </div>
                  </div>
                  
                  {lesson.isCompleted && (
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  
                  {!lesson.isUnlocked && (
                    <div className="w-4 h-4">
                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonSidebar;