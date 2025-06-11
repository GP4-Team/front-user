// src/components/courseDetail/CourseVideoLesson.jsx
import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { Play, Info, X } from "lucide-react";

const CourseVideoLesson = ({ lesson, materialDetails }) => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();

  // Helper function to get text based on language
  const getText = (obj) => {
    if (!obj) return "";
    return obj[language] || obj.en || "";
  };
  
  console.log('🎥 CourseVideoLesson received:', { lesson, materialDetails });
  
  // Get video URL - prioritize materialDetails then lesson
  const getVideoUrl = () => {
    if (materialDetails?.media_url) {
      return materialDetails.media_url;
    }
    return lesson.url || lesson.videoUrl || lesson.media_url || lesson.materialData?.media_url;
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
  
  // Check if it's a YouTube URL
  const isYouTubeUrl = (url) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  };
  
  // Convert YouTube URL to embed format
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    
    let videoId = null;
    
    // Extract video ID from different YouTube URL formats
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0];
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0` : null;
  };
  
  const videoUrl = getVideoUrl();
  const embedUrl = isYouTubeUrl(videoUrl) ? getYouTubeEmbedUrl(videoUrl) : videoUrl;
  
  console.log('🔗 Video URLs:', { original: videoUrl, embed: embedUrl });

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
            {/* Real Video Player */}
            <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={materialInfo.name}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              ) : videoUrl ? (
                <video
                  className="w-full h-full object-contain"
                  controls
                  preload="metadata"
                >
                  <source src={videoUrl} type="video/mp4" />
                  <source src={videoUrl} type="video/webm" />
                  <source src={videoUrl} type="video/ogg" />
                  {language === 'ar' 
                    ? 'متصفحك لا يدعم تشغيل الفيديو' 
                    : 'Your browser does not support the video tag.'}
                </video>
              ) : (
                // Fallback placeholder
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-500/80 flex items-center justify-center mb-4 mx-auto">
                      <Play size={32} className="text-white ml-1" />
                    </div>
                    <p className="text-white">
                      {language === 'ar' ? 'لا يوجد فيديو متاح' : 'No video available'}
                    </p>
                  </div>
                </div>
              )}
              {materialInfo.instructor && (
                <div className="absolute top-4 left-4 bg-black/50 text-white text-sm font-medium px-2 py-1 rounded">
                  {materialInfo.instructor}
                </div>
              )}
            </div>

            {/* Material info and description */}
            <div className="text-center mt-6">
              <h2 className="text-2xl font-bold mb-4">{materialInfo.name}</h2>
              
              {/* Material description */}
              {materialInfo.description && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {materialInfo.description}
                  </p>
                </div>
              )}
              
              {/* Material details grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
                {materialInfo.duration && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <div className="font-medium text-blue-700 dark:text-blue-300">
                      {language === 'ar' ? 'مدة الفيديو' : 'Video Duration'}
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
                <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
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

export default CourseVideoLesson;
