// src/components/admin/ExamTitlePreview.jsx
/**
 * مكون لمعاينة تحسينات أسماء الامتحانات
 * Component for previewing exam title improvements
 */
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import {
  formatExamTitle,
  getCardExamTitle,
  getExamSubtitle,
  getShortExamTitle
} from '../../utils/examTitleFormatter';

const ExamTitlePreview = ({ examNames = [] }) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const [showPreview, setShowPreview] = useState(false);

  // أمثلة على أسماء الامتحانات
  const sampleNames = [
    "تقييم الجبر الأساسي - الدرس 6",
    "الاختبار النهائي - الكيمياء العامة",
    "تقييم التفاضل والتكامل - الدرس 1",
    "الاختبار النهائي - الأدب العربي",
    "اختبار قصير - الكيمياء العامة",
    "اختبار نصف الفصل - الأدب العربي"
  ];

  const namesToPreview = examNames.length > 0 ? examNames : sampleNames;

  if (!showPreview) {
    return (
      <div className={`p-4 rounded-lg border ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <button
          onClick={() => setShowPreview(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          🎯 {language === 'ar' ? 'معاينة تحسينات الأسماء' : 'Preview Name Improvements'}
        </button>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-lg border ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          🎯 {language === 'ar' ? 'معاينة تحسينات الأسماء' : 'Name Improvements Preview'}
        </h3>
        <button
          onClick={() => setShowPreview(false)}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>
      </div>

      <div className="space-y-4">
        {namesToPreview.map((name, index) => {
          const cardTitle = getCardExamTitle(name, language);
          const subtitle = getExamSubtitle(name, language);
          const shortTitle = getShortExamTitle(name, language);
          const fullTitle = formatExamTitle(name, language);

          return (
            <div key={index} className={`p-4 rounded border ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              {/* الاسم الأصلي */}
              <div className={`text-sm mb-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {language === 'ar' ? 'الأصلي:' : 'Original:'} "{name}"
              </div>

              {/* التحسينات */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className={`text-xs font-medium mb-1 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {language === 'ar' ? 'عنوان البطاقة:' : 'Card Title:'}
                  </div>
                  <div className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {cardTitle}
                  </div>
                  {subtitle && (
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {subtitle}
                    </div>
                  )}
                </div>

                <div>
                  <div className={`text-xs font-medium mb-1 ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`}>
                    {language === 'ar' ? 'العنوان المختصر:' : 'Short Title:'}
                  </div>
                  <div className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {shortTitle}
                  </div>
                  
                  <div className={`text-xs font-medium mt-2 mb-1 ${
                    isDarkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}>
                    {language === 'ar' ? 'العنوان الكامل:' : 'Full Title:'}
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {fullTitle}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* تبديل اللغة للمعاينة */}
      <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
        <div className="text-sm text-gray-500 mb-2">
          {language === 'ar' ? 'جرب تبديل اللغة لرؤية الترجمات:' : 'Try switching language to see translations:'}
        </div>
        <div className="space-y-2">
          <div>
            <strong>{language === 'ar' ? 'بالعربية:' : 'In Arabic:'}</strong> {getCardExamTitle(namesToPreview[0], 'ar')}
          </div>
          <div>
            <strong>{language === 'ar' ? 'بالإنجليزية:' : 'In English:'}</strong> {getCardExamTitle(namesToPreview[0], 'en')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamTitlePreview;
