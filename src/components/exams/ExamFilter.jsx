import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Filter, X } from 'lucide-react';

/**
 * مكون فلتر الامتحانات
 * @param {Object} filters - الفلاتر الحالية
 * @param {Function} onFilterChange - دالة تغيير الفلاتر
 * @param {Function} onReset - دالة إعادة التعيين
 * @param {boolean} isLoading - حالة التحميل
 * @returns {JSX.Element} - مكون فلتر الامتحانات
 */
const ExamFilter = ({ filters, onFilterChange, onReset, isLoading }) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;

  // حالات الامتحانات المتاحة
  const statusOptions = [
    { value: 'all', label: getText('جميع الامتحانات', 'All Exams') },
    { value: 'start', label: getText('جاهز للبدء', 'Ready to Start') },
    { value: 'continue', label: getText('في المتابعة', 'Continue') },
    { value: 'retry', label: getText('إعادة المحاولة', 'Retry') },
    { value: 'revision', label: getText('مراجعة', 'Revision') },
    { value: 'ended', label: getText('منتهي', 'Ended') },
    { value: 'results', label: getText('عرض النتائج', 'View Results') }
  ];

  // معالجة تغيير الفلتر
  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...filters,
      [filterType]: value
    };
    onFilterChange(newFilters);
  };

  // معالجة إعادة التعيين
  const handleReset = () => {
    onReset();
  };

  // التحقق من وجود فلاتر نشطة
  const hasActiveFilters = filters.status !== 'all' || filters.category !== 'all' || filters.level !== 'all';

  return (
    <div className="space-y-4">
      {/* رأس الفلتر */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={18} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {getText('فلترة الامتحانات', 'Filter Exams')}
          </h3>
        </div>
        
        {/* زر إعادة التعيين */}
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            disabled={isLoading}
            className={`flex items-center gap-1 px-2 py-1 text-xs rounded-md transition-colors ${
              isDarkMode
                ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <X size={14} />
            {getText('مسح', 'Clear')}
          </button>
        )}
      </div>

      {/* مؤشر التحميل */}
      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
          {getText('جاري التطبيق...', 'Applying...')}
        </div>
      )}

      {/* فلتر الحالة */}
      <div className="space-y-2">
        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ${isRTL ? 'text-right' : 'text-left'} block`}>
          {getText('حالة الامتحان', 'Exam Status')}
        </label>
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          disabled={isLoading}
          className={`w-full p-2 border rounded-md text-sm transition-colors ${
            isDarkMode
              ? 'bg-[#333333] border-[#444444] text-white focus:border-[#7986CB]'
              : 'bg-white border-gray-300 text-gray-900 focus:border-[#3949AB]'
          } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
            isDarkMode ? 'focus:ring-[#7986CB]' : 'focus:ring-[#3949AB]'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${isRTL ? 'text-right' : 'text-left'}`}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* فلتر الفئة (يمكن إضافته لاحقاً) */}
      <div className="space-y-2">
        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ${isRTL ? 'text-right' : 'text-left'} block`}>
          {getText('فئة الامتحان', 'Exam Category')}
        </label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          disabled={isLoading}
          className={`w-full p-2 border rounded-md text-sm transition-colors ${
            isDarkMode
              ? 'bg-[#333333] border-[#444444] text-white focus:border-[#7986CB]'
              : 'bg-white border-gray-300 text-gray-900 focus:border-[#3949AB]'
          } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
            isDarkMode ? 'focus:ring-[#7986CB]' : 'focus:ring-[#3949AB]'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <option value="all">{getText('جميع الفئات', 'All Categories')}</option>
          <option value="quiz">{getText('اختبار قصير', 'Quiz')}</option>
          <option value="midterm">{getText('امتحان نصف الفصل', 'Midterm')}</option>
          <option value="final">{getText('امتحان نهائي', 'Final Exam')}</option>
          <option value="assignment">{getText('تكليف', 'Assignment')}</option>
        </select>
      </div>

      {/* فلتر المستوى (يمكن إضافته لاحقاً) */}
      <div className="space-y-2">
        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ${isRTL ? 'text-right' : 'text-left'} block`}>
          {getText('المستوى التعليمي', 'Education Level')}
        </label>
        <select
          value={filters.level}
          onChange={(e) => handleFilterChange('level', e.target.value)}
          disabled={isLoading}
          className={`w-full p-2 border rounded-md text-sm transition-colors ${
            isDarkMode
              ? 'bg-[#333333] border-[#444444] text-white focus:border-[#7986CB]'
              : 'bg-white border-gray-300 text-gray-900 focus:border-[#3949AB]'
          } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
            isDarkMode ? 'focus:ring-[#7986CB]' : 'focus:ring-[#3949AB]'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <option value="all">{getText('جميع المستويات', 'All Levels')}</option>
          <option value="elementary">{getText('المرحلة الابتدائية', 'Elementary')}</option>
          <option value="middle">{getText('المرحلة المتوسطة', 'Middle School')}</option>
          <option value="high">{getText('المرحلة الثانوية', 'High School')}</option>
          <option value="university">{getText('الجامعة', 'University')}</option>
        </select>
      </div>

      {/* معلومات الفلاتر النشطة */}
      {hasActiveFilters && (
        <div className={`mt-4 p-3 rounded-md ${isDarkMode ? 'bg-[#333333]' : 'bg-gray-50'}`}>
          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
            {getText('الفلاتر النشطة:', 'Active Filters:')}
          </div>
          <div className="flex flex-wrap gap-1">
            {filters.status !== 'all' && (
              <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                {statusOptions.find(opt => opt.value === filters.status)?.label}
              </span>
            )}
            {filters.category !== 'all' && (
              <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}>
                {getText('فئة:', 'Category:')} {filters.category}
              </span>
            )}
            {filters.level !== 'all' && (
              <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-800'}`}>
                {getText('مستوى:', 'Level:')} {filters.level}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamFilter;