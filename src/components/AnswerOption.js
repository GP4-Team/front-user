import React from 'react';
import PropTypes from 'prop-types';

const AnswerOption = ({
  value,
  isSelected,
  isCorrect,
  isIncorrect,
  showResult,
  onClick,
  rtl = true
}) => {
  // Determine background and border colors based on state
  let bgColor = 'bg-white';
  let borderColor = 'border-gray-300';
  
  if (isCorrect && showResult) {
    bgColor = 'bg-green-50';
    borderColor = 'border-green-500';
  } else if (isSelected && isIncorrect && showResult) {
    bgColor = 'bg-red-50';
    borderColor = 'border-red-500';
  } else if (isSelected) {
    bgColor = 'bg-purple-50';
    borderColor = 'border-purple-600';
  }
  
  // Determine radio button styles
  let radioBgColor = 'bg-transparent';
  let radioBorderColor = 'border-gray-500';
  
  if (isCorrect && showResult) {
    radioBgColor = isSelected ? 'bg-green-500' : 'bg-transparent';
    radioBorderColor = 'border-green-500';
  } else if (isSelected && isIncorrect && showResult) {
    radioBgColor = 'bg-red-500';
    radioBorderColor = 'border-red-500';
  } else if (isSelected) {
    radioBgColor = 'bg-purple-600';
    radioBorderColor = 'border-purple-600';
  }

  return (
    <div
      className={`flex items-center p-4 mb-2 rounded-md border-2 ${borderColor} ${bgColor} cursor-pointer transition-all hover:${isSelected ? 'bg-purple-100' : 'bg-gray-50'} ${rtl ? 'rtl' : 'ltr'}`}
      onClick={onClick}
    >
      <div
        className={`w-5 h-5 rounded-full border-2 ${radioBorderColor} flex items-center justify-center ${rtl ? 'ml-4' : 'mr-4'}`}
      >
        {(isSelected || (isCorrect && showResult)) && (
          <div className={`w-2.5 h-2.5 rounded-full ${radioBgColor}`}></div>
        )}
      </div>
      <div className="text-gray-800 flex-1">{value}</div>
      {showResult && (isCorrect || (isSelected && isIncorrect)) && (
        <div className={`${rtl ? 'mr-4' : 'ml-4'} ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
          {isCorrect ? '✓' : '✗'}
        </div>
      )}
    </div>
  );
};

AnswerOption.propTypes = {
  value: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  isCorrect: PropTypes.bool,
  isIncorrect: PropTypes.bool,
  showResult: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  rtl: PropTypes.bool
};

export default AnswerOption;