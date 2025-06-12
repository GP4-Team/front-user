// src/components/exam/ExamNavigation.jsx
/**
 * مكون التنقل والتقدم في الامتحان
 * Exam Navigation and Progress Component
 */
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const ExamNavigation = ({ 
  currentQuestionIndex, 
  totalQuestions, 
  answers,
  questions,
  onQuestionSelect,
  onPrevious,
  onNext,
  canGoNext = true,
  canGoPrevious = true,
  showQuestionGrid = true
}) => {
  const { isDarkMode } = useTheme();
  const { language, isRTL } = useLanguage();

  // حساب التقدم
  const progress = {
    current: currentQuestionIndex + 1,
    total: totalQuestions,
    percentage: Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100),
    answered: Object.values(answers).filter(a => a.answer !== null).length
  };

  return (
    <div className={`w-full ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    } border-b-2 ${
      isDarkMode ? 'border-gray-700' : 'border-gray-200'
    } sticky top-0 z-40`}>
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* شريط التقدم الأساسي */}
        <div className="flex items-center justify-between mb-4">
          <div className={`text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {language === 'ar' 
              ? `السؤال ${progress.current} من ${progress.total}`
              : `Question ${progress.current} of ${progress.total}`
            }
          </div>
          
          <div className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {language === 'ar' 
              ? `تم الإجابة على ${progress.answered} من ${progress.total}`
              : `${progress.answered} of ${progress.total} answered`
            }
          </div>
        </div>

        {/* شريط التقدم المرئي */}
        <div className={`w-full h-3 rounded-full mb-4 ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`}>
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>

        {/* أزرار التنقل */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              canGoPrevious
                ? isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isRTL ? (
              <>
                <span className="mr-2">{language === 'ar' ? 'التالي' : 'Next'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>{language === 'ar' ? 'السابق' : 'Previous'}</span>
              </>
            )}
          </button>

          <div className={`text-center ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <div className="text-sm">
              {language === 'ar' ? 'التقدم:' : 'Progress:'} {progress.percentage}%
            </div>
          </div>

          <button
            onClick={onNext}
            disabled={!canGoNext}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              canGoNext
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isRTL ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>{language === 'ar' ? 'السابق' : 'Previous'}</span>
              </>
            ) : (
              <>
                <span className="mr-2">{language === 'ar' ? 'التالي' : 'Next'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* شبكة الأسئلة */}
        {showQuestionGrid && (
          <div className="mt-4">
            <div className={`text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {language === 'ar' ? 'الانتقال المباشر للأسئلة:' : 'Jump to question:'}
            </div>
            
            <div className="grid grid-cols-10 gap-2">
              {questions?.map((question, index) => {
                const isAnswered = answers[question.id]?.answer !== null;
                const isCurrent = index === currentQuestionIndex;
                
                return (
                  <button
                    key={question.id}
                    onClick={() => onQuestionSelect(index)}
                    className={`w-10 h-10 rounded-lg text-sm font-bold transition-all duration-200 ${
                      isCurrent
                        ? 'bg-blue-500 text-white ring-2 ring-blue-300'
                        : isAnswered
                          ? isDarkMode
                            ? 'bg-green-600 text-white hover:bg-green-500'
                            : 'bg-green-500 text-white hover:bg-green-600'
                          : isDarkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            
            {/* مفتاح الألوان */}
            <div className="flex justify-center gap-6 mt-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {language === 'ar' ? 'حالي' : 'Current'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {language === 'ar' ? 'مُجاب' : 'Answered'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className={`w-3 h-3 rounded ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}></div>
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {language === 'ar' ? 'غير مُجاب' : 'Unanswered'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamNavigation;
