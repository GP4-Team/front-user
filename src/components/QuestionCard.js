// src/components/QuestionCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import AnswerOption from './AnswerOption';
import FlagButton from './FlagButton';

const QuestionCard = ({
  questionNumber,
  questionText,
  questionImage,
  difficulty,
  options,
  selectedAnswer,
  correctAnswer,
  showResult,
  isFlagged,
  onAnswerSelect,
  onFlagQuestion,
  rtl = true
}) => {
  const difficultyText = rtl ? 'متوسط' : 'Medium'; // example, would be dynamic
  const questionNumberText = rtl ? `السؤال رقم ${questionNumber}` : `Question ${questionNumber}`;
  
  return (
    <div className={`bg-white rounded-md p-6 shadow-sm mb-6 ${rtl ? 'rtl' : 'ltr'}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h2 className="text-lg font-bold text-gray-800 m-0">{questionNumberText}</h2>
          {difficulty && (
            <span className={`inline-block px-3 py-1 rounded-lg text-sm bg-gray-200 text-gray-800 ${rtl ? 'mr-0 ml-4' : 'mr-4 ml-0'}`}>
              {difficultyText}
            </span>
          )}
        </div>
        
        <FlagButton 
          isFlagged={isFlagged} 
          onClick={onFlagQuestion}
          rtl={rtl}
        />
      </div>
      
      <div className="mb-8">
        <p className="text-gray-800 mb-4">{questionText}</p>
        {questionImage && <img src={questionImage} alt="Question visual" className="max-w-full h-auto my-4 block" />}
      </div>
      
      <div className="mt-6">
        {options.map((option, index) => (
          <AnswerOption
            key={index}
            value={option.text}
            isSelected={selectedAnswer === option.id}
            isCorrect={showResult && correctAnswer === option.id}
            isIncorrect={showResult && selectedAnswer === option.id && correctAnswer !== option.id}
            showResult={showResult}
            onClick={() => onAnswerSelect(option.id)}
            rtl={rtl}
          />
        ))}
      </div>
    </div>
  );
};

QuestionCard.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  questionText: PropTypes.string.isRequired,
  questionImage: PropTypes.string,
  difficulty: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedAnswer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  correctAnswer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showResult: PropTypes.bool,
  isFlagged: PropTypes.bool,
  onAnswerSelect: PropTypes.func.isRequired,
  onFlagQuestion: PropTypes.func.isRequired,
  rtl: PropTypes.bool
};

export default QuestionCard;