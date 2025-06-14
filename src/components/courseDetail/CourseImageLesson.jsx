// src/components/courseDetail/CourseImageLesson.jsx
import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { Image as ImageIcon } from "lucide-react";

const CourseImageLesson = ({ lesson, materialDetails }) => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();

  // Translation function
  const getText = (arText, enText) => {
    return language === "ar" ? arText : enText;
  };

  // Helper function to get text based on language from object
  const getTextFromObj = (obj) => {
    if (!obj) return "";
    return obj[language] || obj.en || obj.ar || "";
  };
  
  console.log('🖼️ CourseImageLesson received:', { lesson, materialDetails });
  
  // Get media URL - prioritize materialDetails then lesson
  const getMediaUrl = () => {
    if (materialDetails?.media_url) {
      return materialDetails.media_url;
    }
    return lesson.url || lesson.imageUrl || lesson.pdfUrl || lesson.media_url || lesson.materialData?.media_url;
  };
  
  // Get material info with fallbacks
  const materialInfo = {
    name: materialDetails?.name || getTextFromObj(lesson.title),
    description: materialDetails?.description || getTextFromObj(lesson.description),
    type: materialDetails?.type || lesson.originalType || lesson.type,
    pages: materialDetails?.number_of_pages || lesson.pages,
    instructor: materialDetails?.user?.name || lesson.instructor,
    courseInfo: materialDetails?.course || lesson.courseInfo,
    courseIdea: materialDetails?.course_idea || lesson.courseIdea
  };
  
  const mediaUrl = getMediaUrl();
  const isPdf = materialInfo.type === 'Pdf' || lesson.type === 'pdf';
  const isImage = materialInfo.type === 'Image' || lesson.type === 'image';
  
  console.log('🔗 Media info:', { mediaUrl, isPdf, isImage, type: materialInfo.type });

  return (
    <div className="p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">{materialInfo.name}</h2>
        
        {/* Media Content Viewer */}
        <div className="relative w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
          {mediaUrl ? (
            <>
              {isPdf ? (
                // PDF Viewer
                <div className="w-full">
                  <iframe
                    src={mediaUrl}
                    title={materialInfo.name}
                    className="w-full h-[600px] border-0"
                    type="application/pdf"
                  />
                  <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {getText('ملف PDF', 'PDF Document')}
                          </p>
                          {materialInfo.pages && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {materialInfo.pages} {getText('صفحة', 'pages')}
                            </p>
                          )}
                        </div>
                      </div>
                      <a
                        href={mediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
                      >
                        {getText('تحميل', 'Download')}
                      </a>
                    </div>
                  </div>
                </div>
              ) : isImage ? (
                // Image Viewer
                <div className="w-full">
                  <img
                    src={mediaUrl}
                    alt={materialInfo.name}
                    className="w-full h-auto max-h-[600px] object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden aspect-[4/3] bg-gray-100 dark:bg-gray-700 items-center justify-center">
                    <div className="text-center">
                      <ImageIcon size={64} className="text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                      <p className="text-gray-500 dark:text-gray-400">
                        {getText('فشل في تحميل الصورة', 'Failed to load image')}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                          <ImageIcon size={16} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {getText('صورة تعليمية', 'Educational Image')}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {getText('انقر للتكبير', 'Click to enlarge')}
                          </p>
                        </div>
                      </div>
                      <a
                        href={mediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
                      >
                        {getText('فتح', 'Open')}
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                // Generic Document Viewer
                <div className="w-full">
                  <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 font-medium">
                        {materialInfo.name}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        {getText('مستند تعليمي', 'Educational Document')}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 border-t dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {getText('انقر لفتح المستند', 'Click to open document')}
                      </p>
                      <a
                        href={mediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
                      >
                        {getText('فتح', 'Open')}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            // No media available
            <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <div className="text-center">
                <ImageIcon size={64} className="text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  {getText('لا يوجد محتوى متاح', 'No content available')}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  {materialInfo.name}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Material Information */}
        <div className="mt-8 max-w-4xl mx-auto">
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
            {materialInfo.type && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <div className="font-medium text-blue-700 dark:text-blue-300">
                  {getText('نوع المحتوى', 'Content Type')}
                </div>
                <div className="text-blue-600 dark:text-blue-400">
                  {isPdf ? getText('ملف PDF', 'PDF Document') :
                   isImage ? getText('صورة', 'Image') :
                   getText('مستند', 'Document')}
                </div>
              </div>
            )}
            
            {materialInfo.pages && (
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <div className="font-medium text-purple-700 dark:text-purple-300">
                  {getText('عدد الصفحات', 'Number of Pages')}
                </div>
                <div className="text-purple-600 dark:text-purple-400">
                  {materialInfo.pages} {getText('صفحة', 'pages')}
                </div>
              </div>
            )}
            
            {materialInfo.instructor && (
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <div className="font-medium text-green-700 dark:text-green-300">
                  {getText('المدرس', 'Instructor')}
                </div>
                <div className="text-green-600 dark:text-green-400">
                  {materialInfo.instructor}
                </div>
              </div>
            )}
          </div>
          
          {/* Course idea if available */}
          {materialInfo.courseIdea && (
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h3 className="font-medium text-yellow-700 dark:text-yellow-300 mb-2">
                {getText('موضوع الدرس', 'Lesson Topic')}
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
      </div>
    </div>
  );
};

export default CourseImageLesson;
