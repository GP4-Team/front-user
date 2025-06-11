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
              fallback="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzE5NzZEMiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iMyIgcng9IjIiLz48cGF0aCBkPSJtOSAxMmwtMi0yIDQtNCA2IDYiLz48L3N2Zz4="
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
