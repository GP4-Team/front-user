// src/components/questions/MultipleChoiceQuestion.jsx
/**
 * مكون سؤال الاختيار من متعدد
 * Multiple Choice Question Component
 */
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const MultipleChoiceQuestion = ({ 
  question, 
  currentAnswer, 
  onAnswerChange, 
  onSubmit,
  disabled = false,
  showFeedback = false,
  questionNumber = 1,
  totalQuestions = 1
}) => {
  const { isDarkMode } = useTheme();
  const { language, isRTL } = useLanguage();
  const [selectedChoice, setSelectedChoice] = useState(currentAnswer || null);
  const [hasChanged, setHasChanged] = useState(false);

  // تحديث الاختيار المحدد عند تغيير الإجابة الحالية
  useEffect(() => {
    setSelectedChoice(currentAnswer || null);
  }, [currentAnswer]);

  const handleChoiceSelect = (choiceId) => {
    if (disabled) return;
    
    setSelectedChoice(choiceId);
    setHasChanged(true);
    onAnswerChange(choiceId);
  };

  const handleSubmit = () => {
    if (selectedChoice && onSubmit) {
      onSubmit(selectedChoice);
      setHasChanged(false);
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    } rounded-lg shadow-lg p-6`}>
      {/* رأس السؤال */}
      <div className="flex justify-between items-center mb-6">
        <div className={`text-sm font-medium ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {language === 'ar' ? `السؤال ${questionNumber} من ${totalQuestions}` : `Question ${questionNumber} of ${totalQuestions}`}
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          question.hardness === "1" 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            : question.hardness === "2"
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          {question.hardness === "1" 
            ? (language === 'ar' ? 'سهل' : 'Easy')
            : question.hardness === "2"
            ? (language === 'ar' ? 'متوسط' : 'Medium')
            : (language === 'ar' ? 'صعب' : 'Hard')
          }
        </div>
      </div>

      {/* نص السؤال */}
      <div className={`mb-6 p-4 rounded-lg ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
      }`}>
        <h2 className={`text-xl font-semibold mb-3 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        } ${isRTL ? 'text-right' : 'text-left'}`}>
          {question.text}
        </h2>
        
        {/* صورة السؤال إن وجدت */}
        {question.image && (
          <div className="mt-4">
            <img 
              src={question.image} 
              alt="Question illustration"
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}
        
        {/* معلومات إضافية */}
        {question.extra_info && (
          <div className={`mt-3 p-3 rounded ${
            isDarkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-50 text-blue-700'
          }`}>
            <p className="text-sm">{question.extra_info}</p>
          </div>
        )}
      </div>

      {/* الخيارات */}
      <div className="space-y-3 mb-6">
        {question.choices?.map((choice, index) => {
          const isSelected = selectedChoice === choice.id;
          const choiceLetter = String.fromCharCode(65 + index); // A, B, C, D
          
          return (
            <div
              key={choice.id}
              onClick={() => handleChoiceSelect(choice.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                disabled ? 'cursor-not-allowed opacity-60' : 'hover:shadow-md'
              } ${
                isSelected
                  ? isDarkMode
                    ? 'border-blue-500 bg-blue-900/30'
                    : 'border-blue-500 bg-blue-50'
                  : isDarkMode
                    ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                    : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                {/* دائرة الاختيار */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500'
                    : isDarkMode
                      ? 'border-gray-500'
                      : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  )}
                </div>
                
                {/* حرف الاختيار */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                  isSelected
                    ? 'bg-blue-500 text-white'
                    : isDarkMode
                      ? 'bg-gray-600 text-gray-300'
                      : 'bg-gray-100 text-gray-600'
                }`}>
                  {choiceLetter}
                </div>
                
                {/* نص الاختيار */}
                <div className={`flex-1 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                } ${isRTL ? 'text-right' : 'text-left'}`}>
                  {choice.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* أزرار التحكم */}
      <div className="flex justify-between items-center">
        <div className={`text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {question.course_idea?.name && (
            <span>{language === 'ar' ? 'المفهوم:' : 'Concept:'} {question.course_idea.name}</span>
          )}
        </div>
        
        <div className="flex gap-3">
          {/* زر الحفظ */}
          {hasChanged && (
            <button
              onClick={handleSubmit}
              disabled={!selectedChoice || disabled}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                selectedChoice && !disabled
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {language === 'ar' ? 'حفظ الإجابة' : 'Save Answer'}
            </button>
          )}
        </div>
      </div>

      {/* التغذية الراجعة */}
      {showFeedback && question.explanation_text && (
        <div className={`mt-6 p-4 rounded-lg ${
          isDarkMode ? 'bg-yellow-900/20 border border-yellow-800' : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <h4 className={`font-semibold mb-2 ${
            isDarkMode ? 'text-yellow-400' : 'text-yellow-800'
          }`}>
            {language === 'ar' ? 'التوضيح:' : 'Explanation:'}
          </h4>
          <p className={`text-sm ${
            isDarkMode ? 'text-yellow-300' : 'text-yellow-700'
          }`}>
            {question.explanation_text}
          </p>
        </div>
      )}
    </div>
  );
};

export default MultipleChoiceQuestion;
