/**
 * Exam Utilities
 * Helper functions for exam functionality
 */

/**
 * Format question type for display
 * @param {string} questionType - The question type from API
 * @param {string} language - Current language ('ar' or 'en')
 * @returns {string} Formatted question type
 */
export const formatQuestionType = (questionType, language = 'en') => {
  const types = {
    'MultipleChoice': {
      ar: 'اختيار من متعدد',
      en: 'Multiple Choice'
    },
    'TrueFalse': {
      ar: 'صح أو خطأ',
      en: 'True/False'
    },
    'KeywordsEssay': {
      ar: 'مقال',
      en: 'Essay'
    },
    'Essay': {
      ar: 'مقال',
      en: 'Essay'
    },
    'mcq': {
      ar: 'اختيار من متعدد',
      en: 'Multiple Choice'
    },
    'true-false': {
      ar: 'صح أو خطأ',
      en: 'True/False'
    },
    'essay': {
      ar: 'مقال',
      en: 'Essay'
    }
  };

  return types[questionType]?.[language] || questionType;
};

/**
 * Format difficulty level for display
 * @param {string|number} hardness - The difficulty level
 * @param {string} language - Current language ('ar' or 'en')
 * @returns {Object} Formatted difficulty with color and text
 */
export const formatDifficulty = (hardness, language = 'en') => {
  const difficulties = {
    "1": {
      ar: { text: 'سهل', color: 'green' },
      en: { text: 'Easy', color: 'green' }
    },
    "2": {
      ar: { text: 'متوسط', color: 'yellow' },
      en: { text: 'Medium', color: 'yellow' }
    },
    "3": {
      ar: { text: 'صعب', color: 'red' },
      en: { text: 'Hard', color: 'red' }
    }
  };

  return difficulties[hardness?.toString()]?.[language] || { text: hardness, color: 'gray' };
};

/**
 * Calculate progress percentage
 * @param {number} answeredCount - Number of answered questions
 * @param {number} totalQuestions - Total number of questions
 * @returns {number} Progress percentage (0-100)
 */
export const calculateProgress = (answeredCount, totalQuestions) => {
  if (totalQuestions === 0) return 0;
  return Math.round((answeredCount / totalQuestions) * 100);
};

/**
 * Format time remaining
 * @param {number} seconds - Time remaining in seconds
 * @param {string} language - Current language ('ar' or 'en')
 * @returns {string} Formatted time string
 */
export const formatTimeRemaining = (seconds, language = 'en') => {
  if (seconds <= 0) return language === 'ar' ? 'انتهى الوقت' : 'Time Up';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return language === 'ar' 
      ? `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      : `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Get question navigation status
 * @param {Object} question - Question object
 * @param {Object} userAnswers - User answers object
 * @returns {string} Status ('answered', 'current', 'unanswered')
 */
export const getQuestionStatus = (question, userAnswers, currentQuestionId = null) => {
  const hasAnswer = userAnswers[question.id] !== null && 
                   userAnswers[question.id] !== undefined && 
                   userAnswers[question.id] !== '';
  
  if (question.id === currentQuestionId) return 'current';
  if (hasAnswer) return 'answered';
  return 'unanswered';
};

/**
 * Validate answer format
 * @param {string} questionType - Type of question
 * @param {any} answer - Answer value
 * @returns {boolean} True if answer format is valid
 */
export const validateAnswerFormat = (questionType, answer) => {
  if (answer === null || answer === undefined) return false;
  
  switch (questionType.toLowerCase()) {
    case 'multiplechoice':
    case 'mcq':
    case 'truefalse':
    case 'true-false':
      return typeof answer === 'number' || (typeof answer === 'string' && !isNaN(parseInt(answer)));
    
    case 'essay':
    case 'keywordsessay':
      return typeof answer === 'string' && answer.trim().length > 0;
    
    default:
      return true;
  }
};

/**
 * Get feedback message based on correctness
 * @param {boolean} isCorrect - Whether the answer is correct
 * @param {string} language - Current language ('ar' or 'en')
 * @returns {Object} Feedback object with message and icon
 */
export const getFeedbackMessage = (isCorrect, language = 'en') => {
  if (isCorrect) {
    return {
      message: language === 'ar' ? '🎉 إجابة صحيحة!' : '🎉 Correct!',
      icon: '✅',
      type: 'success'
    };
  } else {
    return {
      message: language === 'ar' ? '❌ إجابة خاطئة' : '❌ Incorrect',
      icon: '❌',
      type: 'error'
    };
  }
};

/**
 * Calculate exam score
 * @param {Object} userAnswers - User answers
 * @param {Array} questions - Questions array
 * @returns {Object} Score calculation
 */
export const calculateExamScore = (userAnswers, questions) => {
  let totalQuestions = questions.length;
  let answeredQuestions = 0;
  let correctAnswers = 0;
  let totalMarks = 0;
  let awardedMarks = 0;

  questions.forEach(question => {
    const userAnswer = userAnswers[question.id];
    
    if (userAnswer !== null && userAnswer !== undefined && userAnswer !== '') {
      answeredQuestions++;
    }
    
    // Add marks calculation if available
    if (question.marks) {
      totalMarks += question.marks;
    }
    
    // Check if answer is correct (this would depend on your API structure)
    if (question.correct_answer && userAnswer === question.correct_answer) {
      correctAnswers++;
      if (question.marks) {
        awardedMarks += question.marks;
      }
    }
  });

  return {
    totalQuestions,
    answeredQuestions,
    correctAnswers,
    totalMarks,
    awardedMarks,
    percentage: totalMarks > 0 ? Math.round((awardedMarks / totalMarks) * 100) : 0,
    completionRate: Math.round((answeredQuestions / totalQuestions) * 100)
  };
};

/**
 * Debounce function for auto-save
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Generate exam summary for submission
 * @param {Object} examData - Exam data
 * @param {Object} userAnswers - User answers
 * @param {number} timeSpent - Time spent in seconds
 * @returns {Object} Exam summary
 */
export const generateExamSummary = (examData, userAnswers, timeSpent) => {
  const questions = examData.questions || [];
  const score = calculateExamScore(userAnswers, questions);
  
  return {
    examId: examData.id,
    examTitle: examData.title,
    totalQuestions: questions.length,
    answeredQuestions: score.answeredQuestions,
    timeSpent: timeSpent,
    timeAllowed: examData.duration_in_seconds,
    submissionTime: new Date().toISOString(),
    completionRate: score.completionRate,
    userAnswers: userAnswers
  };
};

export default {
  formatQuestionType,
  formatDifficulty,
  calculateProgress,
  formatTimeRemaining,
  getQuestionStatus,
  validateAnswerFormat,
  getFeedbackMessage,
  calculateExamScore,
  debounce,
  generateExamSummary
};
