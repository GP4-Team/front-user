import React from 'react';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';

const NavigationButtons = ({ 
  currentQuestionIndex, 
  totalQuestions, 
  onPrevious, 
  onNext, 
  language,
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
  
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  // Handle RTL for Arabic
  const prevIcon = language === 'ar' ? <RightOutlined /> : <LeftOutlined />;
  const nextIcon = language === 'ar' ? <LeftOutlined /> : <RightOutlined />;
  
  return (
    <div className="flex justify-between items-center">
      <Button 
        onClick={onPrevious}
        disabled={isFirstQuestion}
        icon={prevIcon}
        className={`flex items-center hover:bg-gray-100 ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700'}`}
        style={{
          height: '40px',
          borderRadius: '8px',
        }}
      >
        {language === 'ar' ? 'السابق' : 'Previous'}
      </Button>
      
      <div className="text-sm font-medium">
        <span className={`px-3 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}>
          {currentQuestionIndex + 1} / {totalQuestions}
        </span>
      </div>
      
      <Button 
        onClick={onNext}
        disabled={isLastQuestion}
        className="flex items-center"
        style={{
          height: '40px',
          borderRadius: '8px',
          borderColor: '#3949AB',
          color: '#3949AB',
          backgroundColor: 'transparent',
        }}
      >
        {language === 'ar' ? 'التالي' : 'Next'} {nextIcon}
      </Button>
    </div>
  );
};

export default NavigationButtons;
