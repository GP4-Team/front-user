import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

const HierarchicalFilter = ({ onFilterChange, currentFilters, isLoading = false }) => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  
  const getText = (ar, en) => (language === 'ar' ? ar : en);

  // بنية البيانات الهرمية للمراحل والصفوف
  const educationStructure = [
    {
      id: 1,
      category_id: 1,
      name: { ar: 'الابتدائية', en: 'Primary' },
      color: '#4CAF50',
      levels: [
        { id: 1, level_id: 1, name: { ar: 'الصف الاول الابتدائي', en: 'Grade 1' } },
        { id: 2, level_id: 2, name: { ar: 'الصف الثاني الابتدائي', en: 'Grade 2' } },
        { id: 3, level_id: 3, name: { ar: 'الصف الثالث الابتدائي', en: 'Grade 3' } },
        { id: 4, level_id: 4, name: { ar: 'الصف الرابع الابتدائي', en: 'Grade 4' } },
        { id: 5, level_id: 5, name: { ar: 'الصف الخامس الابتدائي', en: 'Grade 5' } },
        { id: 6, level_id: 6, name: { ar: 'الصف السادس الابتدائي', en: 'Grade 6' } }
      ]
    },
    {
      id: 2,
      category_id: 2,
      name: { ar: 'الاعدادية', en: 'Middle School' },
      color: '#FF9800',
      levels: [
        { id: 7, level_id: 7, name: { ar: 'الصف الاول الاعدادي', en: 'Grade 7' } },
        { id: 8, level_id: 8, name: { ar: 'الصف الثاني الاعدادي', en: 'Grade 8' } },
        { id: 9, level_id: 9, name: { ar: 'الصف الثالث الاعدادي', en: 'Grade 9' } }
      ]
    },
    {
      id: 3,
      category_id: 3,
      name: { ar: 'الثانوية', en: 'High School' },
      color: '#2196F3',
      levels: [
        { id: 10, level_id: 10, name: { ar: 'الصف الاول الثانوي', en: 'Grade 10' } },
        { id: 11, level_id: 11, name: { ar: 'الصف الثاني الثانوي', en: 'Grade 11' } },
        { id: 12, level_id: 12, name: { ar: 'الصف الثالث الثانوي', en: 'Grade 12' } }
      ]
    }
  ];

  // تبديل حالة توسع الفئة
  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // معالجة اختيار مستوى معين
  const handleLevelSelect = (level, category) => {
    console.log('🎯 Filter selection:', {
      educational_level_id: level.level_id, // الـ ID الرئيسي للـ API
      levelName: getText(level.name.ar, level.name.en),
      categoryName: getText(category.name.ar, category.name.en)
    });

    // إرسال البيانات للمكون الأب
    onFilterChange({
      type: 'hierarchical',
      educational_level_id: level.level_id, // الـ ID الرئيسي للـ API
      levelName: getText(level.name.ar, level.name.en),
      categoryName: getText(category.name.ar, category.name.en)
    });
  };

  // معالجة إعادة تعيين الفلاتر
  const handleReset = () => {
    onFilterChange({
      type: 'reset'
    });
  };

  if (isLoading) {
    return (
      <div className={'text-center py-4'}>
        <div className={'inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-indigo-600'}></div>
        <p className={'text-xs mt-2 text-gray-500'}>
          {getText('جاري تحميل المستويات...', 'Loading levels...')}
        </p>
      </div>
    );
  }

  return (
    <div className={'space-y-3'}>
      {/* خيار جميع المراحل */}
      <label className={'flex items-center cursor-pointer'}>
        <input
          type={'radio'}
          name={'education-level'}
          checked={!currentFilters.educational_level_id}
          onChange={handleReset}
          className={`mr-3 rtl:ml-3 rtl:mr-0 ${
            isDarkMode ? 'text-blue-400' : 'text-blue-600'
          }`}
        />
        <span className={`font-medium ${
          isDarkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          {getText('جميع المراحل', 'All Levels')}
        </span>
      </label>

      {/* المراحل التعليمية */}
      {educationStructure.map((category) => (
        <div key={category.id} className={'border-l-2 border-gray-200 dark:border-gray-700 pl-4 rtl:pr-4 rtl:pl-0 rtl:border-l-0 rtl:border-r-2'}>
          {/* عنوان الفئة فقط (بدون radio button) */}
          <div>
            {/* عنوان المرحلة */}
            <div className={'flex items-center py-2'}>
              <span
                className={'w-4 h-4 rounded-full mr-3 rtl:ml-3 rtl:mr-0'}
                style={{ backgroundColor: category.color }}
              ></span>
              <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {getText(category.name.ar, category.name.en)}
              </span>
            </div>
            
            {/* زر توسيع الصفوف */}
            <div
              className={'flex items-center cursor-pointer py-1 hover:bg-gray-50 dark:hover:bg-gray-800 rounded'}
              onClick={() => toggleCategory(category.id)}
            >
              <div className={'flex items-center flex-1 pl-8 rtl:pr-8 rtl:pl-0'}>
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {getText('عرض الصفوف', 'Show Grades')}
                </span>
              </div>
              {expandedCategories.has(category.id) ? (
                <ChevronDown size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
              ) : (
                <ChevronRight size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
              )}
            </div>
          </div>

          {/* الصفوف تحت كل فئة */}
          {expandedCategories.has(category.id) && (
            <div className={'ml-6 rtl:mr-6 rtl:ml-0 space-y-2 pb-2'}>
              {category.levels.map((level) => (
                <label key={level.id} className={'flex items-center cursor-pointer py-1'}>
                  <input
                    type={'radio'}
                    name={'education-level'}
                    checked={currentFilters.educational_level_id === level.level_id}
                    onChange={() => handleLevelSelect(level, category)}
                    className={`mr-3 rtl:ml-3 rtl:mr-0 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  />
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  } ${currentFilters.educational_level_id === level.level_id ? 'font-medium' : ''}`}>
                    {getText(level.name.ar, level.name.en)}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* زر إعادة تعيين */}
      {currentFilters.educational_level_id && (
        <button
          onClick={handleReset}
          className={`w-full mt-4 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            isDarkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
        >
          {getText('اعادة تعيين الفلتر', 'Reset Filter')}
        </button>
      )}
    </div>
  );
};

export default HierarchicalFilter;