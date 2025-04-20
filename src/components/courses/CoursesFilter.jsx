import React from 'react';
import { Filter } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * مكون فلترة الكورسات
 * @param {Object} props - خصائص المكون
 * @param {Object} props.filters - حالة الفلاتر الحالية
 * @param {Function} props.onFilterChange - دالة التعامل مع تغيير الفلاتر
 * @returns {JSX.Element} - مكون فلترة الكورسات
 */
const CoursesFilter = ({ filters, onFilterChange }) => {
  const { language } = useLanguage();
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;
  
  // قائمة المراحل الدراسية (للمرحلة الثانوية فقط)
  const educationalLevels = [
    { id: 'grade10', arName: 'الصف الأول الثانوي', enName: '1st Grade Secondary' },
    { id: 'grade11', arName: 'الصف الثاني الثانوي', enName: '2nd Grade Secondary' },
    { id: 'grade12', arName: 'الصف الثالث الثانوي', enName: '3rd Grade Secondary' },
  ];
  
  // قائمة الأسعار
  const priceOptions = [
    { id: 'free', arName: 'مجاني', enName: 'Free' },
    { id: 'paid', arName: 'مدفوع', enName: 'Paid' },
  ];
  
  // قائمة التصنيفات
  const categoryOptions = [
    { id: 'chapters', arName: 'أبواب', enName: 'Chapters' },
    { id: 'months', arName: 'شهور', enName: 'Months' },
    { id: 'classes', arName: 'حصص', enName: 'Classes' },
  ];
  
  /**
   * تغيير فلتر المرحلة الدراسية
   * @param {string} levelId - معرف المرحلة الدراسية
   */
  const handleLevelChange = (levelId) => {
    onFilterChange('level', levelId);
  };
  
  /**
   * تغيير فلتر السعر
   * @param {string} priceId - معرف خيار السعر
   */
  const handlePriceChange = (priceId) => {
    onFilterChange('price', priceId);
  };
  
  /**
   * تغيير فلتر التصنيف
   * @param {string} categoryId - معرف التصنيف
   */
  const handleCategoryChange = (categoryId) => {
    onFilterChange('category', categoryId);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-h-screen overflow-y-auto">
      {/* عنوان الفلاتر */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">{getText('الفلتر', 'Filter')}</h3>
        <Filter size={20} className="text-[#3949AB]" />
      </div>
      
      {/* قسم المرحلة الدراسية */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">{getText('المرحلة الدراسية', 'Educational Level')}</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
          {educationalLevels.map((level) => (
            <label key={level.id} className="flex items-center cursor-pointer">
              <input
              type="radio"
              name="educationalLevel"
              value={level.id}
              checked={filters.level === level.id}
              onChange={() => handleLevelChange(level.id)}
              className="form-radio h-4 w-4 text-[#3949AB] focus:ring-[#3949AB] border-gray-300"
              />
              <span className="ms-2 text-sm">{getText(level.arName, level.enName)}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* قسم السعر */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">{getText('السعر', 'Price')}</h4>
        <div className="space-y-2">
          {priceOptions.map((option) => (
            <label key={option.id} className="flex items-center cursor-pointer">
              <input
              type="radio"
              name="price"
              value={option.id}
              checked={filters.price === option.id}
              onChange={() => handlePriceChange(option.id)}
              className="form-radio h-4 w-4 text-[#3949AB] focus:ring-[#3949AB] border-gray-300"
              />
              <span className="ms-2 text-sm">{getText(option.arName, option.enName)}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* قسم التصنيفات */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">{getText('التصنيفات', 'Categories')}</h4>
        <div className="space-y-2">
          {categoryOptions.map((category) => (
            <label key={category.id} className="flex items-center cursor-pointer">
              <input
              type="radio"
              name="category"
              value={category.id}
              checked={filters.category === category.id}
              onChange={() => handleCategoryChange(category.id)}
              className="form-radio h-4 w-4 text-[#3949AB] focus:ring-[#3949AB] border-gray-300"
              />
              <span className="ms-2 text-sm">{getText(category.arName, category.enName)}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* زر إعادة تعيين */}
      <button
        onClick={() => {
          onFilterChange('reset');
        }}
        className="w-full bg-gray-200 hover:bg-gray-300 text-[#37474F] font-medium py-2 px-4 rounded-md transition duration-200"
      >
        {getText('إعادة تعيين', 'Reset')}
      </button>
    </div>
  );
};

export default CoursesFilter;