// src/components/ExamSummary.jsx
import React from 'react';
import PropTypes from 'prop-types';

const ExamSummary = ({
  answered,
  flagged,
  skipped,
  totalQuestions,
  onContinue,
  onSubmit,
  rtl = true
}) => {
  const summaryTitle = rtl ? 'ملخص الامتحان' : 'Exam Summary';
  const continueText = rtl ? 'استمرار' : 'Continue';
  const submitText = rtl ? 'تسليم الامتحان' : 'Submit Exam';
  
  const stats = [
    { 
      type: 'answered', 
      value: answered, 
      label: rtl ? 'تمت الإجابة' : 'Answered',
      color: 'text-green-500'
    },
    { 
      type: 'flagged', 
      value: flagged, 
      label: rtl ? 'تم وضع علامة' : 'Flagged',
      color: 'text-purple-600'
    },
    { 
      type: 'skipped', 
      value: skipped, 
      label: rtl ? 'تم تخطيها' : 'Skipped',
      color: 'text-red-500'
    }
  ];
  
  return (
    <div className={`bg-white rounded-md p-6 shadow-sm ${rtl ? 'rtl' : 'ltr'} text-center`}>
      <h2 className="text-xl text-gray-800 mb-6">{summaryTitle}</h2>
      
      <div className="my-8 mx-auto max-w-xs">
        {/* Placeholder for illustration */}
        <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
          📊
        </div>
      </div>
      
      <div className="flex justify-around my-8">
        {stats.map(stat => (
          <div key={stat.type} className="text-center">
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-gray-700 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-center gap-4">
        <button 
          onClick={onContinue}
          className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          {continueText}
        </button>
        
        <button 
          onClick={onSubmit}
          className="px-6 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
        >
          {submitText}
        </button>
      </div>
    </div>
  );
};

ExamSummary.propTypes = {
  answered: PropTypes.number.isRequired,
  flagged: PropTypes.number.isRequired,
  skipped: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onContinue: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  rtl: PropTypes.bool
};

export default ExamSummary;