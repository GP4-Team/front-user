import React from 'react';
import { Radio, Input, Image } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const QuestionCard = ({ 
  question, 
  userAnswer, 
  onAnswerChange, 
  language, 
  isDarkMode, 
  isReview = false, 
  correctAnswer = null,
  colors = {
    primaryDark: '#1A237F',
    primaryBase: '#3949AB',
    primaryLight: '#7986CB',
    accent: '#FFC107',
    textDark: '#37474F',
    bgLight: '#ECEFF1',
    white: '#FFFFFF',
  },
  imageMaxWidth = 400
}) => {
  const handleMCQChange = (e) => {
    onAnswerChange(e.target.value);
  };

  const handleEssayChange = (e) => {
    onAnswerChange(e.target.value);
  };

  // Custom radio button style for the circular design with check/x mark
  const radioStyle = (optionId) => {
    const isSelected = optionId === userAnswer;
    
    if (!isReview) {
      return {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      };
    }

    // For review mode
    const isCorrect = optionId === correctAnswer;
    
    if (isSelected && isCorrect) {
      return {
        display: 'flex',
        alignItems: 'center',
        color: '#52c41a',
      };
    }
    
    if (isSelected && !isCorrect) {
      return {
        display: 'flex',
        alignItems: 'center',
        color: '#f5222d',
      };
    }
    
    if (!isSelected && isCorrect) {
      return {
        display: 'flex',
        alignItems: 'center',
        color: '#52c41a',
        opacity: 0.7,
      };
    }
    
    return {
      display: 'flex',
      alignItems: 'center',
    };
  };

  // Custom checkbox component to match the design
  const CustomRadio = ({ children, value, onChange, checked, disabled }) => {
    return (
      <label 
        className={`flex items-center cursor-pointer ${disabled && 'cursor-default'}`}
        onClick={() => !disabled && onChange && onChange({ target: { value } })}
      >
        <div 
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3
          ${checked 
            ? (isReview && value !== correctAnswer) 
              ? 'border-red-500 bg-red-50' 
              : 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 bg-white'}`}
        >
          {checked && (
            (isReview && value !== correctAnswer) 
              ? <CloseOutlined className="text-red-500 text-xs" />
              : <CheckOutlined className="text-blue-500 text-xs" />
          )}
        </div>
        <span className="text-base">{children}</span>
      </label>
    );
  };

  const renderOptions = () => {
    switch (question.type) {
      case 'mcq':
        return (
          <div className="w-full mt-6 space-y-4">
            {question.options.map((option) => {
              const isChecked = userAnswer === option.id;
              
              let optionClass = "p-4 rounded-lg transition-colors duration-200 shadow-sm border";
              
              if (isReview) {
                if (option.id === correctAnswer) {
                  optionClass += " border-green-500 bg-green-50";
                } else if (option.id === userAnswer && option.id !== correctAnswer) {
                  optionClass += " border-red-500 bg-red-50";
                } else {
                  optionClass += " border-gray-200";
                }
              } else {
                optionClass += isChecked 
                  ? " border-blue-500 bg-blue-50" 
                  : " border-gray-200 hover:border-blue-300";
              }
              
              if (isDarkMode) {
                optionClass = optionClass.replace("bg-green-50", "bg-green-900 border-green-700")
                  .replace("bg-red-50", "bg-red-900 border-red-700")
                  .replace("bg-blue-50", "bg-blue-900 border-blue-700")
                  .replace("border-gray-200", "border-gray-700")
                  .replace("hover:border-blue-300", "hover:border-blue-600");
              }
              
              return (
                <div key={option.id} className={optionClass}>
                  <CustomRadio
                    value={option.id}
                    checked={isChecked}
                    onChange={handleMCQChange}
                    disabled={isReview}
                  >
                    {option.text}
                  </CustomRadio>
                </div>
              );
            })}
          </div>
        );
        
      case 'true-false':
        return (
          <div className="w-full mt-6 space-y-4">
            {question.options.map((option) => {
              const isChecked = userAnswer === option.id;
              
              let optionClass = "p-4 rounded-lg transition-colors duration-200 shadow-sm border";
              
              if (isReview) {
                if (option.id === correctAnswer) {
                  optionClass += " border-green-500 bg-green-50";
                } else if (option.id === userAnswer && option.id !== correctAnswer) {
                  optionClass += " border-red-500 bg-red-50";
                } else {
                  optionClass += " border-gray-200";
                }
              } else {
                optionClass += isChecked 
                  ? " border-blue-500 bg-blue-50" 
                  : " border-gray-200 hover:border-blue-300";
              }
              
              if (isDarkMode) {
                optionClass = optionClass.replace("bg-green-50", "bg-green-900 border-green-700")
                  .replace("bg-red-50", "bg-red-900 border-red-700")
                  .replace("bg-blue-50", "bg-blue-900 border-blue-700")
                  .replace("border-gray-200", "border-gray-700")
                  .replace("hover:border-blue-300", "hover:border-blue-600");
              }
              
              return (
                <div key={option.id} className={optionClass}>
                  <CustomRadio
                    value={option.id}
                    checked={isChecked}
                    onChange={handleMCQChange}
                    disabled={isReview}
                  >
                    {option.text}
                  </CustomRadio>
                </div>
              );
            })}
          </div>
        );
        
      case 'essay':
        return (
          <div className="mt-6">
            <TextArea
              placeholder={language === 'ar' ? "اكتب إجابتك هنا..." : "Write your answer here..."}
              value={userAnswer}
              onChange={handleEssayChange}
              rows={6}
              disabled={isReview}
              className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-800'} rounded-lg p-4 text-base`}
              style={{ resize: 'vertical' }}
            />
            {isReview && correctAnswer && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800">
                  {language === 'ar' ? 'الإجابة النموذجية' : 'Model Answer'}:
                </h4>
                <p className="mt-2 text-green-700">{correctAnswer}</p>
              </div>
            )}
          </div>
        );
        
      default:
        return <p>Question type not supported.</p>;
    }
  };

  return (
    <div className="question-card">
      <div className="question-content mb-6">
        <p className="text-xl mb-4 font-medium">{question.text}</p>
        
        {question.image && (
          <div className="mt-4 flex justify-center mb-6">
            <Image
              src={question.image}
              alt="Question image"
              className="rounded-lg"
              style={{ maxWidth: `${imageMaxWidth}px`, maxHeight: '300px', objectFit: 'contain' }}
              preview={true}
              fallback="data:image/png;base64,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"
            />
          </div>
        )}
      </div>
      
      <div className="question-options">
        {renderOptions()}
      </div>
      
      <div className="mt-4 text-sm text-gray-500 flex justify-end">
        {!userAnswer ? (
          <span className="inline-flex items-center">
            <span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
            {language === 'ar' ? 'لم تتم الإجابة' : 'Not answered yet'}
          </span>
        ) : (
          <span className="inline-flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            {language === 'ar' ? 'تمت الإجابة' : 'Answered'}
          </span>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
