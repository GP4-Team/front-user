import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Video, Music, FileQuestion } from 'lucide-react';

const CourseSections = ({ sections, getText, language }) => {
  const [expandedSections, setExpandedSections] = useState(
    sections.reduce((acc, section) => {
      acc[section.id] = section.expanded || false;
      return acc;
    }, {})
  );

  // تبديل حالة قسم (مفتوح أو مغلق)
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // الأيقونة المناسبة لكل نوع درس
  const getLessonIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video size={18} className="text-blue-500" />;
      case 'audio':
        return <Music size={18} className="text-blue-500" />;
      case 'exam':
        return <FileQuestion size={18} className="text-orange-500" />;
      default:
        return <FileText size={18} className="text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="p-6">
        {sections.map((section) => (
          <div key={section.id} className="mb-4 border border-gray-200 rounded-md overflow-hidden">
            {/* عنوان القسم */}
            <div 
              className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center">
                {expandedSections[section.id] ? (
                  <ChevronUp size={20} className="text-gray-500 mr-2" />
                ) : (
                  <ChevronDown size={20} className="text-gray-500 mr-2" />
                )}
                <h3 className="font-medium text-gray-800">{getText(section.title)}</h3>
              </div>
              <div className="text-sm text-gray-500">
                <span>{section.lessonsCount} {language === "ar" ? "درس" : "lessons"}</span>
                {section.exercisesCount > 0 && (
                  <span className="ml-2">• {section.exercisesCount} {language === "ar" ? "تطبيق" : "exercises"}</span>
                )}
              </div>
            </div>
            
            {/* محتوى القسم (يظهر عند التوسيع) */}
            {expandedSections[section.id] && section.lessons && section.lessons.length > 0 && (
              <div className="border-t border-gray-200">
                {section.lessons.map((lesson) => (
                  <div 
                    key={lesson.id}
                    className="flex justify-between items-center p-4 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center">
                      <div className="mr-3">
                        {getLessonIcon(lesson.type)}
                      </div>
                      <span className="text-gray-700">{getText(lesson.title)}</span>
                    </div>
                    {/* يمكن إضافة معلومات إضافية هنا مثل المدة أو عدد النقاط */}
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