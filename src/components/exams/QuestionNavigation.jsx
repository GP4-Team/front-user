import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { CheckOutlined } from '@ant-design/icons';

const QuestionNavigation = ({ 
  questions, 
  currentIndex, 
  userAnswers, 
  onQuestionSelect,
  colors = {
    primaryDark: '#1A237F',
    primaryBase: '#3949AB',
    primaryLight: '#7986CB',
    accent: '#FFC107',
    textDark: '#37474F',
    bgLight: '#ECEFF1',
    white: '#FFFFFF',
  }
}) => {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();

  const getQuestionState = (questionId) => {
    const answer = userAnswers[questionId];
    if (answer === null || answer === undefined) return 'unanswered';
    return 'answered';
  };

  const getButtonStyle = (index, questionId) => {
    const isCurrentQuestion = index === currentIndex;
    const state = getQuestionState(questionId);
    
    // Base styles for all buttons
    let baseClasses = 'flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200';
    
    // Current question
    if (isCurrentQuestion) {
      return `${baseClasses} ${isDarkMode 
        ? `bg-indigo-600 text-white` 
        : `bg-indigo-600 text-white`} shadow-md`;
    }
    
    // Answered question
    if (state === 'answered') {
      return `${baseClasses} ${isDarkMode 
        ? 'bg-green-600 text-white' 
        : 'bg-green-500 text-white'}`;
    }
    
    // Unanswered question
    return `${baseClasses} ${isDarkMode 
      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`;
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {questions.map((question, index) => (
          <button
            key={question.id}
            onClick={() => onQuestionSelect(index)}
            className={getButtonStyle(index, question.id)}
            aria-label={`Question ${index + 1}`}
          >
            {index + 1}
            {getQuestionState(question.id) === 'answered' && (
              <CheckOutlined className="ml-1 text-xs" />
            )}
          </button>
        ))}
      </div>
      
      <div className="mt-6 space-y-3 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
          <span>
            {language === 'ar' ? 'لم تتم الإجابة' : 'Not answered'}
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span>
            {language === 'ar' ? 'تمت الإجابة' : 'Answered'}
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-indigo-600 mr-2"></div>
          <span>
            {language === 'ar' ? 'السؤال الحالي' : 'Current question'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigation;
