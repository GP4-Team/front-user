import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const ExamProgress = ({ 
  percentage,
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
  
  // Ensuring the percentage is within 0-100 range
  const validPercentage = Math.min(Math.max(0, percentage), 100);
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1 text-sm font-medium">
        <span>
          {language === 'ar' ? 'التقدم في الامتحان' : 'Exam Progress'}
        </span>
        <span>
          {validPercentage.toFixed(0)}%
        </span>
      </div>
      <div 
        className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
      >
        <div
          className="h-2 rounded-full bg-indigo-600"
          style={{ 
            width: `${validPercentage}%`,
            backgroundColor: colors.primaryBase,
            transition: 'width 0.5s ease-in-out'
          }}
        ></div>
      </div>
    </div>
  );
};

export default ExamProgress;
