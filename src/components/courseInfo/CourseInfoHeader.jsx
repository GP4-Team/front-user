import React from 'react';
import { Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const CourseInfoHeader = ({ course, getText }) => {
  const { language } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      {/* صورة الكورس */}
      <div className="relative">
        <img 
          src={course.image} 
          alt={getText(course.title)}
          className="w-full h-auto object-cover"
        />
        <div className="absolute top-4 left-4 bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-bold">
          {getText(course.badge)}
        </div>
      </div>
      
      {/* معلومات الكورس */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2 text-[#37474F]">{getText(course.title)}</h1>
        <p className="text-sm text-[#37474F] mb-4">{getText(course.subtitle)}</p>
        
        {/* معلومات إضافية */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center">
            <Users size={16} className="mr-1 text-[#37474F]" />
            <span className="text-sm text-[#37474F]">
              {course.studentsCount}+ {language === "ar" ? "طالب" : "students"}
            </span>
          </div>
        </div>
        
        {/* معلومات المدرس */}
        <div className="flex items-center">
          <img 
            src={course.instructorAvatar} 
            alt={getText(course.instructor)}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <p className="font-medium text-[#37474F]">{getText(course.instructor)}</p>
            <p className="text-sm text-[#3949AB]">{getText(course.subcategory)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInfoHeader;