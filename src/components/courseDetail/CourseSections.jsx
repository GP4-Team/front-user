import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * مكون أقسام ومحتوى الكورس
 * @param {Object} props - خصائص المكون
 * @param {Object} props.course - بيانات الكورس
 * @param {string} props.activeSectionId - معرف القسم المفتوح حالياً
 * @param {Function} props.toggleSection - دالة لتبديل حالة القسم
 * @returns {JSX.Element} - مكون أقسام الكورس
 */
const CourseSections = ({ course, activeSectionId, toggleSection }) => {
  const { language } = useLanguage();
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;

  // الحصول على أيقونة نوع المحتوى
  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" />
          <path d="M10 8L16 12L10 16V8Z" fill="currentColor" />
        </svg>;
      case 'pdf':
        return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z" fill="currentColor" />
          <path d="M12 12V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>;
      case 'text':
        return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>;
      case 'exam':
        return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5C15 5.53043 14.7893 6.03914 14.4142 6.41421C14.0391 6.78929 13.5304 7 13 7H11C10.4696 7 9.96086 6.78929 9.58579 6.41421C9.21071 6.03914 9 5.53043 9 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>;
      case 'image':
        return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
          <path d="M5 19L8.5 15.5L11 18L16 13L19 16V19C19 19 18 19 17 19H7C6 19 5 19 5 19Z" fill="currentColor" />
        </svg>;
      default:
        return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>;
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-[#37474F]">
        {getText('محتوى المعسكر', 'Course Content')}
      </h2>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="text-sm text-gray-600 p-4 border-b border-gray-100">
          {course.sections.length} {getText('أقسام', 'sections')} • {' '}
          {course.sections.reduce((acc, section) => acc + section.lessons, 0)} {getText('درس', 'lessons')} • {' '}
          {course.totalHours}h {course.totalMinutes}m {getText('إجمالي المدة', 'total duration')}
        </div>
        
        {course.sections.map((section) => (
          <div key={section.id} className="border-b border-gray-100 last:border-0">
            {/* Section header */}
            <button 
              className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex-1 font-medium text-[#37474F]">
                <h3>{getText(section.title.ar, section.title.en)}</h3>
                <div className="text-sm text-gray-500 mt-1">
                  {section.lessons} {getText('درس', 'lessons')} • {' '}
                  {section.applications} {getText('تطبيق', 'applications')} • {' '}
                  {section.duration}
                </div>
              </div>
              {activeSectionId === section.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {/* Section content */}
            {activeSectionId === section.id && (
              <div className="bg-white">
                {section.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-4 border-b border-gray-100 last:border-0 flex items-center hover:bg-gray-50 transition-colors"
                  >
                    <div className="mr-3 text-gray-500">
                      {getContentTypeIcon(item.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="font-medium text-gray-800">
                          {getText(item.title.ar, item.title.en)}
                        </h4>
                        {item.isPreview && (
                          <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-[#3949AB] rounded-full">
                            {getText('معاينة', 'Preview')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mr-3">
                      {item.duration}
                    </div>
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

export default CourseSections;