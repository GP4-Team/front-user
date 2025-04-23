import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * مكون تبويبات صفحة تفاصيل الكورس
 * @param {Object} props - خصائص المكون
 * @param {string} props.activeTab - التبويب النشط حالياً
 * @param {Function} props.setActiveTab - دالة لتغيير التبويب النشط
 * @returns {JSX.Element} - مكون تبويبات الكورس
 */
const CourseTabs = ({ activeTab, setActiveTab }) => {
  const { language } = useLanguage();
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;

  // قائمة التبويبات المتاحة
  const tabs = [
    { id: 'sections', label: { ar: 'الأقسام', en: 'Sections' } },
    { id: 'description', label: { ar: 'الوصف', en: 'Description' } },
    { id: 'instructor', label: { ar: 'المدرس', en: 'Instructor' } },
  ];

  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="container mx-auto px-4">
        <nav className="flex -mb-px space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-[#3949AB] text-[#3949AB]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {getText(tab.label.ar, tab.label.en)}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CourseTabs;