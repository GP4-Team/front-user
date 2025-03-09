// src/components/QuestionNavigation.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../context/ThemeContext'; // Adjust this import path as needed

const QuestionNavigation = ({
  questions,
  currentQuestion,
  onQuestionSelect,
  rtl = true
}) => {
  // Use the theme context instead of a prop
  const { isDarkMode } = useTheme();
  
  const navTitle = rtl ? 'الأسئلة' : 'Questions';
  
  const legendItems = [
    { type: 'current', label: rtl ? 'الحالي' : 'Current', color: isDarkMode ? 'bg-purple-500' : 'bg-purple-600' },
    { type: 'answered', label: rtl ? 'تمت الإجابة' : 'Answered', color: isDarkMode ? 'bg-green-400' : 'bg-green-500' },
    { type: 'flagged', label: rtl ? 'تم وضع علامة' : 'Flagged', color: isDarkMode ? 'bg-yellow-400' : 'bg-yellow-500' },
    { type: 'unanswered', label: rtl ? 'لم تتم الإجابة' : 'Unanswered', color: isDarkMode ? 'bg-gray-600' : 'bg-gray-300' }
  ];
  
  return (
    <div className={`p-4 ${isDarkMode ? 'bg-primary-dark' : 'bg-white'} shadow-sm rounded-md ${rtl ? 'rtl' : 'ltr'} transition-colors duration-300`}>
      <div className={`text-lg font-bold mb-4 text-center ${isDarkMode ? 'text-dark' : 'text-gray-800'} transition-colors duration-300`}>
        {navTitle}
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {questions.map((question, index) => {
          let bgColor = isDarkMode ? 'bg-primary-base' : 'bg-gray-200';
          let textColor = isDarkMode ? 'text-primary-lightest' : 'text-gray-800';
          
          if (index + 1 === currentQuestion) {
            bgColor = isDarkMode ? 'bg-purple-500' : 'bg-purple-600';
            textColor = 'text-white';
          } else if (question.answered) {
            bgColor = isDarkMode ? 'bg-accent-secondary' : 'bg-green-500';
            textColor = 'text-white';
          } else if (question.flagged) {
            bgColor = isDarkMode ? 'bg-yellow-400' : 'bg-yellow-500';
            textColor = isDarkMode ? 'text-primary-dark' : 'text-white';
          }
          
          return (
            <div
              key={index}
              className={`w-10 h-10 flex items-center justify-center rounded-sm ${bgColor} ${textColor} ${index + 1 === currentQuestion ? 'font-bold' : 'font-normal'} cursor-pointer transition-all hover:transform hover:scale-105`}
              onClick={() => onQuestionSelect(index + 1)}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
      
      <div className="mt-8">
        {legendItems.map(item => (
          <div key={item.type} className="flex items-center mb-2">
            <div className={`w-4 h-4 rounded-full ${item.color} ${rtl ? 'ml-2' : 'mr-2'} transition-colors duration-300`}></div>
            <div className={`text-sm ${isDarkMode ? 'text-primary-lightest' : 'text-gray-800'} transition-colors duration-300`}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

QuestionNavigation.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      answered: PropTypes.bool,
      flagged: PropTypes.bool
    })
  ).isRequired,
  currentQuestion: PropTypes.number.isRequired,
  onQuestionSelect: PropTypes.func.isRequired,
  rtl: PropTypes.bool
};

export default QuestionNavigation;