import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * مكون تفاصيل الكورس (ماذا ستتعلم والمتطلبات)
 * @param {Object} props - خصائص المكون
 * @param {Object} props.course - بيانات الكورس
 * @returns {JSX.Element} - مكون تفاصيل الكورس
 */
const CourseDetails = ({ course }) => {
  const { language } = useLanguage();
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;

  return (
    <div className="mt-8">
      {/* What You Will Learn */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-[#37474F]">
          {getText('ماذا ستتعلم', 'What You Will Learn')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {course.whatYouWillLearn.map((item, index) => (
            <div key={index} className="flex">
              <div className="mr-3 text-[#3949AB]">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <Check size={16} />
                </div>
              </div>
              <p className="text-gray-700">
                {getText(item.ar, item.en)}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Requirements */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-[#37474F]">
          {getText('المتطلبات', 'Requirements')}
        </h2>
        
        <ul className="space-y-3">
          {course.requirements.map((item, index) => (
            <li key={index} className="flex items-start">
              <div className="mr-3 text-[#3949AB] mt-1">
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="3" fill="currentColor"/>
                </svg>
              </div>
              <p className="text-gray-700">
                {getText(item.ar, item.en)}
              </p>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Description */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4 text-[#37474F]">
          {getText('وصف الكورس', 'Course Description')}
        </h2>
        
        <div className="text-gray-700 whitespace-pre-line">
          {getText(course.longDescription.ar, course.longDescription.en)}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;