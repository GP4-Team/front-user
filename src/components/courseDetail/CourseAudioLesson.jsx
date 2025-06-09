// src/components/courseDetail/CourseAudioLesson.jsx
import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { Play, Info, X, Headphones } from "lucide-react";

const CourseAudioLesson = ({ lesson, materialDetails }) => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();

  // Helper function to get text based on language
  const getText = (obj) => {
    if (!obj) return "";
    return obj[language] || obj.en || "";
  };
  
  console.log('🎧 CourseAudioLesson received:', { lesson, materialDetails });
  
  // Get audio URL - prioritize materialDetails then lesson
  const getAudioUrl = () => {
    if (materialDetails?.media_url) {
      return materialDetails.media_url;
    }
    return lesson.url || lesson.audioUrl || lesson.media_url || lesson.materialData?.media_url;
  };
  
  // Get material info with fallbacks
  const materialInfo = {
    name: materialDetails?.name || getText(lesson.title),
    description: materialDetails?.description || getText(lesson.description),
    duration: materialDetails?.duration_in_seconds || lesson.duration_in_seconds,
    instructor: materialDetails?.user?.name || lesson.instructor,
    courseInfo: materialDetails?.course || lesson.courseInfo,
    courseIdea: materialDetails?.course_idea || lesson.courseIdea
  };
  
  const audioUrl = getAudioUrl();
  
  console.log('🎧 Audio URL:', audioUrl);

  return (
    <div className="p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">{materialInfo.name}</h2>
        
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
            {/* Real Audio Player */}
            <div className="max-w-2xl mx-auto">
              <div className="w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md p-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Headphones size={32} className="text-blue-500 dark:text-blue-400" />
                  </div>
                </div>
                
                {audioUrl ? (
                  <div className="space-y-4">
                    <audio
                      className="w-full"
                      controls
                      preload="metadata"
                    >
                      <source src={audioUrl} type="audio/mp3" />
                      <source src={audioUrl} type="audio/wav" />
                      <source src={audioUrl} type="audio/ogg" />
                      {language === 'ar' 
                        ? 'متصفحك لا يدعم تشغيل الصوت' 
                        : 'Your browser does not support the audio element.'}
                    </audio>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">0:00</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {materialInfo.duration ? `${Math.floor(materialInfo.duration / 60)}:دقيقة` : getText(lesson.duration)}
                      </span>
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
                      
                      <button className="p-4 rounded-full bg-gray-500 text-white cursor-not-allowed" disabled>
                        <Play size={24} />
                      </button>
                      
                      <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="5 4 15 12 5 20 5 4"></polygon>
                          <polygon points="15 4 15 20 20 12 15 4"></polygon>
                        </svg>
                      </button>
                    </div>
                    
                    <p className="text-gray-500 text-sm mt-4">
                      {language === 'ar' ? 'لا يوجد ملف صوتي متاح' : 'No audio file available'}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Material info */}
            <div className="mt-6">
              {/* Material description */}
              {materialInfo.description && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg max-w-2xl mx-auto">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {materialInfo.description}
                  </p>
                </div>
              )}
              
              {/* Material details grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm max-w-2xl mx-auto">
                {materialInfo.duration && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <div className="font-medium text-blue-700 dark:text-blue-300">
                      {language === 'ar' ? 'مدة التسجيل' : 'Recording Duration'}
                    </div>
                    <div className="text-blue-600 dark:text-blue-400">
                      {Math.floor(materialInfo.duration / 60)} دقيقة
                    </div>
                  </div>
                )}
                
                {materialInfo.instructor && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <div className="font-medium text-green-700 dark:text-green-300">
                      {language === 'ar' ? 'المدرس' : 'Instructor'}
                    </div>
                    <div className="text-green-600 dark:text-green-400">
                      {materialInfo.instructor}
                    </div>
                  </div>
                )}
                
                {materialInfo.courseInfo && (
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                    <div className="font-medium text-purple-700 dark:text-purple-300">
                      {language === 'ar' ? 'الكورس' : 'Course'}
                    </div>
                    <div className="text-purple-600 dark:text-purple-400">
                      {materialInfo.courseInfo.name}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Course idea if available */}
              {materialInfo.courseIdea && (
                <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg max-w-2xl mx-auto">
                  <h3 className="font-medium text-yellow-700 dark:text-yellow-300 mb-2">
                    {language === 'ar' ? 'موضوع الدرس' : 'Lesson Topic'}
                  </h3>
                  <p className="text-yellow-600 dark:text-yellow-400">
                    {materialInfo.courseIdea.name}
                  </p>
                  {materialInfo.courseIdea.description && (
                    <p className="text-yellow-500 dark:text-yellow-500 text-sm mt-1">
                      {materialInfo.courseIdea.description}
                    </p>
                  )}
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
