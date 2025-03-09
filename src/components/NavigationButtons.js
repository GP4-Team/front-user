import React from 'react';
import PropTypes from 'prop-types';

const NavigationButtons = ({
  onPrevious,
  onNext,
  onEnd,
  hasPrevious,
  hasNext,
  rtl = true
}) => {
  const prevText = rtl ? 'السابق' : 'Previous';
  const nextText = rtl ? 'التالي' : 'Next';
  const endText = rtl ? 'إنهاء الامتحان' : 'End Exam';
  
  return (
    <div className={`flex justify-between mt-8 ${rtl ? 'rtl' : 'ltr'}`}>
      <div>
        <button 
          onClick={onPrevious} 
          disabled={!hasPrevious}
          className={`flex items-center justify-center px-4 py-2 rounded-lg bg-gray-500 text-white ${!hasPrevious ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-600'}`}
        >
          {prevText} {rtl ? '➡️' : '⬅️'}
        </button>
        
        <button 
          onClick={onNext} 
          disabled={!hasNext}
          className={`flex items-center justify-center px-4 py-2 rounded-lg bg-gray-500 text-white ${!hasNext ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-600'} ${rtl ? 'mr-4' : 'ml-4'}`}
        >
          {rtl ? '⬅️' : '➡️'} {nextText}
        </button>
      </div>
      
      <button 
        onClick={onEnd} 
        className="flex items-center justify-center px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
      >
        {endText}
      </button>
    </div>
  );
};

NavigationButtons.propTypes = {
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
  hasPrevious: PropTypes.bool,
  hasNext: PropTypes.bool,
  rtl: PropTypes.bool
};

export default NavigationButtons;