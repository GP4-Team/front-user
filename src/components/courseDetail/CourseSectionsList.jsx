import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * مكون عرض قائمة أقسام ودروس المادة
 * @param {Object} props - خصائص المكون
 * @param {Array} props.sections - قائمة الأقسام
 * @param {Object} props.openSections - حالة الأقسام المفتوحة
 * @param {Function} props.toggleSection - وظيفة لفتح/إغلاق قسم
 * @param {Object} props.activeLesson - الدرس النشط حالياً
 * @param {Function} props.onSelectLesson - وظيفة اختيار درس
 * @returns {JSX.Element} - مكون قائمة الأقسام والدروس
 */
const CourseSectionsList = ({ 
  sections, 
  openSections, 
  toggleSection, 
  activeLesson, 
  onSelectLesson 
}) => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;
  
  return (
    <div className={`${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
      <h2 className={`px-4 py-3 font-bold border-b ${isDarkMode ? 'border-[#333333]' : 'border-gray-200'} text-[#37474F] dark:text-[#ECEFF1]`}>
        {getText('محتويات المادة', 'Course Contents')}
      </h2>
      
      {/* Sections List */}
      <div className="p-4">
        {/* Loop through sections */}
        {sections.map((section) => (
          <div 
            key={section.id} 
            className={`mb-3 border ${isDarkMode ? 'border-[#333333]' : 'border-gray-200'} rounded-md overflow-hidden`}
          >
            {/* Section Header */}
            <div 
            className={`flex justify-between items-center p-3 cursor-pointer ${
            isDarkMode 
            ? 'hover:bg-[#333333]' 
            : 'hover:bg-[#F5F7F9]'
            }`}
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center">
                <h3 className="font-medium text-[#37474F] dark:text-[#ECEFF1]">
                  {section.lessons && section.lessons.length > 0 
                    ? getText(section.lessons[0].title.ar, section.lessons[0].title.en)
                    : getText(section.title.ar, section.title.en)}
                </h3>
              </div>
              <div className="flex items-center">
                <span className="text-sm mr-2 text-[#37474F] dark:text-[#B0BEC5]">
                  {section.lessonsCount} {getText('درس', 'lessons')} • {section.applicationsCount} {getText('تطبيق', 'applications')}
                </span>
                {openSections[section.id] ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>
            </div>
            
            {/* Section Lessons */}
            {openSections[section.id] && (
              <div className={`${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-gray-50'}`}>
                {section.lessons.map((lesson) => (
                  <div 
                    key={lesson.id}
                    className={`flex items-center p-3 border-t ${
                      isDarkMode 
                        ? 'border-[#333333] hover:bg-[#3949AB]/20' 
                        : 'border-gray-200 hover:bg-[#F5F7F9]'
                    } cursor-pointer ${
                      activeLesson && activeLesson.id === lesson.id 
                        ? isDarkMode 
                          ? 'bg-[#1A237E]/20' 
                          : 'bg-[#ECEFF1]'
                        : ''
                    }`}
                    onClick={() => onSelectLesson(lesson)}
                  >
                    <div className="mr-3">{lesson.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-[#37474F] dark:text-[#F0F4F8]">{getText(lesson.title.ar, lesson.title.en)}</h4>
                      {lesson.duration && (
                        <p className={`text-xs text-[#37474F] dark:text-[#B0BEC5]`}>
                          {lesson.duration} {getText('دقيقة', 'min')}
                        </p>
                      )}
                    </div>
                    {lesson.status === 'completed' && (
                      <div className="h-2 w-2 rounded-full bg-[#81C784]"></div>
                    )}
                    {lesson.status === 'locked' && (
                      <div className="text-[#B0BEC5]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSectionsList;