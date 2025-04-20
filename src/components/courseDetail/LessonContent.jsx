import React from 'react';
import { FileText, FileAudio, FileCheck, FileVideo, Image } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * مكون عرض محتوى الدرس بناءً على نوعه
 * @param {Object} props - خصائص المكون
 * @param {Object} props.lesson - بيانات الدرس
 * @returns {JSX.Element} - مكون عرض محتوى الدرس
 */
const LessonContent = ({ lesson }) => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;
  
  if (!lesson) {
    return (
      <div className="p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <h3 className="text-lg font-medium mb-2">
          {getText('لم يتم اختيار درس', 'No Lesson Selected')}
        </h3>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {getText(
            'يرجى اختيار درس من القائمة للبدء في التعلم',
            'Please select a lesson from the menu to start learning'
          )}
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Lesson Title */}
      <div className={`border-b p-4 ${isDarkMode ? 'border-[#333333]' : 'border-gray-200'}`}>
        <h2 className="text-xl font-bold">{getText(lesson.title.ar, lesson.title.en)}</h2>
      </div>
      
      {/* Lesson Content */}
      <div className="p-4">
        {lesson.type === 'video' && (
          <div className="mb-4">
            <div className="relative pb-16:9 h-0" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded"
                src={lesson.content.videoUrl}
                title={getText(lesson.title.ar, lesson.title.en)}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
        
        {lesson.type === 'audio' && (
          <div className="mb-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center">
            <div className="w-32 h-32 mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <FileAudio size={48} className="text-white" />
            </div>
            <audio 
              controls 
              className="w-full"
              src={lesson.content.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"}
            >
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
        
        {lesson.type === 'image' && (
          <div className="mb-4 text-center">
            <img 
              src={lesson.content.imageUrl || "/api/placeholder/800/500"} 
              alt={getText(lesson.title.ar, lesson.title.en)}
              className="max-w-full h-auto rounded-lg mx-auto"
            />
          </div>
        )}
        
        {lesson.type === 'pdf' && (
          <div className="mb-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
            <FileText size={64} className={`mx-auto mb-4 ${isDarkMode ? 'text-[#7986CB]' : 'text-[#3949AB]'}`} />
            <h3 className="font-bold mb-2">{getText('مستند PDF', 'PDF Document')}</h3>
            <p className="text-sm mb-4">
              {getText(
                'يمكنك تنزيل المستند من خلال الضغط على الزر أدناه',
                'You can download the document by clicking the button below'
              )}
            </p>
            <button className={`px-4 py-2 rounded ${
              isDarkMode 
                ? 'bg-[#3949AB] hover:bg-[#1A237E] text-white' 
                : 'bg-[#3949AB] hover:bg-[#1A237E] text-white'
            }`}>
              {getText('تنزيل PDF', 'Download PDF')}
            </button>
          </div>
        )}
        
        {lesson.type === 'exam' && (
          <div className="mb-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
            <FileCheck size={64} className={`mx-auto mb-4 ${isDarkMode ? 'text-[#7986CB]' : 'text-[#3949AB]'}`} />
            <h3 className="font-bold mb-2">{getText('امتحان', 'Exam')}</h3>
            <p className="text-sm mb-4">
              {getText(
                'استعد لاختبار معلوماتك! اضغط على الزر أدناه لبدء الامتحان',
                'Get ready to test your knowledge! Click the button below to start the exam'
              )}
            </p>
            <button className={`px-4 py-2 rounded ${
              isDarkMode 
                ? 'bg-[#3949AB] hover:bg-[#1A237E] text-white' 
                : 'bg-[#3949AB] hover:bg-[#1A237E] text-white'
            }`}>
              {getText('ابدأ الامتحان', 'Start Exam')}
            </button>
          </div>
        )}
        
        {/* Lesson Description */}
        <div className={`mt-4 p-4 rounded ${isDarkMode ? 'bg-[#262626]' : 'bg-gray-50'}`}>
          <h3 className="font-bold mb-2">{getText('وصف الدرس', 'Lesson Description')}</h3>
          <p className="text-sm">
            {lesson.content.description && getText(
              lesson.content.description.ar, 
              lesson.content.description.en
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default LessonContent;