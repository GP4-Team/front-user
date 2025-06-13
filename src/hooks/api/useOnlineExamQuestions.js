// hooks/api/useOnlineExamQuestions.js
import { useState, useCallback } from 'react';
import onlineExamQuestionsService from '../../services/api/onlineExamQuestionsService';

/**
 * Custom hook for managing online exam questions
 */
export const useOnlineExamQuestions = () => {
  // State management
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [examData, setExamData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [examStatus, setExamStatus] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [examResults, setExamResults] = useState(null);

  // Progress state
  const [submitLoading, setSubmitLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [resultsLoading, setResultsLoading] = useState(false);

  /**
   * Clear all state
   */
  const clearState = useCallback(() => {
    setExamData(null);
    setQuestions([]);
    setUserAnswers({});
    setExamStatus(null);
    setTimeRemaining(0);
    setExamResults(null);
    setError(null);
  }, []);

  /**
   * Initialize user answers for questions
   */
  const initializeAnswers = useCallback((questionsList, existingAnswers = {}) => {
    const initialAnswers = { ...existingAnswers };
    
    questionsList.forEach(question => {
      if (question.student_answer_id && !initialAnswers[question.id]) {
        // If question has a student_answer_id but no answer set, initialize as null
        initialAnswers[question.id] = null;
      }
    });
    
    setUserAnswers(initialAnswers);
    return initialAnswers;
  }, []);

  /**
   * Load exam questions based on action
   */
  const loadExamQuestions = useCallback(async (examId, action = 'start') => {
    setLoading(true);
    setError(null);
    
    try {
      console.log(`🔄 Loading exam questions for ${examId} with action: ${action}`);
      
      const response = await onlineExamQuestionsService.getExamQuestions(examId, action);
      
      if (response.success) {
        const data = response.data;
        
        // Set exam data
        setExamData(data);
        setExamStatus(data.status || action);
        
        // Set questions
        const questionsList = data.questions || [];
        setQuestions(questionsList);
        
        // Set time remaining
        const examTimeRemaining = data.time_remaining || data.duration_in_seconds || 0;
        console.log('🕒 [useOnlineExamQuestions] Setting time remaining:', {
          time_remaining: data.time_remaining,
          duration_in_seconds: data.duration_in_seconds,
          calculated: examTimeRemaining
        });
        setTimeRemaining(examTimeRemaining);
        
        // Initialize answers
        const existingAnswers = data.answers || {};
        const initializedAnswers = initializeAnswers(questionsList, existingAnswers);
        
        console.log('✅ Exam data loaded successfully:', {
          examId,
          action,
          questionsCount: questionsList.length,
          timeRemaining: data.time_remaining || data.duration || 0,
          existingAnswers: Object.keys(existingAnswers).length
        });
        
        return {
          success: true,
          data: data,
          questions: questionsList,
          answers: initializedAnswers
        };
      } else {
        // Handle specific error cases
        setError(response.error);
        setExamStatus(response.status);
        
        console.warn('⚠️ Failed to load exam questions:', response);
        
        return {
          success: false,
          error: response.error,
          status: response.status,
          examId: response.examId
        };
      }
    } catch (error) {
      console.error('❌ Error in loadExamQuestions:', error);
      setError(error.message || 'Failed to load exam questions');
      
      return {
        success: false,
        error: error.message || 'Failed to load exam questions'
      };
    } finally {
      setLoading(false);
    }
  }, [initializeAnswers]);

  /**
   * Start a new exam
   */
  const startExam = useCallback(async (examId) => {
    clearState();
    return await loadExamQuestions(examId, 'start');
  }, [clearState, loadExamQuestions]);

  /**
   * Retry an exam
   */
  const retryExam = useCallback(async (examId) => {
    clearState();
    return await loadExamQuestions(examId, 'retry');
  }, [clearState, loadExamQuestions]);

  /**
   * Continue an existing exam
   */
  const continueExam = useCallback(async (examId) => {
    return await loadExamQuestions(examId, 'continue');
  }, [loadExamQuestions]);

  /**
   * Review a completed exam
   */
  const reviewExam = useCallback(async (examId) => {
    return await loadExamQuestions(examId, 'revision');
  }, [loadExamQuestions]);

  /**
   * Update a single answer
   */
  const updateAnswer = useCallback((questionId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  }, []);

  /**
   * Update multiple answers at once
   */
  const updateAnswers = useCallback((answersObj) => {
    setUserAnswers(prev => ({
      ...prev,
      ...answersObj
    }));
  }, []);

  /**
   * Save exam progress (auto-save)
   */
  const saveProgress = useCallback(async (examId, timeRemainingSeconds = timeRemaining) => {
    setSaveLoading(true);
    
    try {
      const response = await onlineExamQuestionsService.saveExamProgress(
        examId, 
        userAnswers, 
        timeRemainingSeconds
      );
      
      console.log('💾 Progress saved:', response.success ? 'Success' : 'Failed');
      
      return response;
    } catch (error) {
      console.error('❌ Error saving progress:', error);
      return { success: false, error: error.message };
    } finally {
      setSaveLoading(false);
    }
  }, [userAnswers, timeRemaining]);

  /**
   * Submit individual answer for a question
   * @param {number} studentAnswerId - Student Answer ID (not question ID)
   * @param {any} answer - Answer value
   * @param {string} questionType - Question type
   * @returns {Promise<Object>} Submit response
   */
  const submitAnswer = useCallback(async (studentAnswerId, answer, questionType) => {
    try {
      if (!studentAnswerId) {
        throw new Error('Student Answer ID is required');
      }

      // Format answer data based on question type
      const answerData = onlineExamQuestionsService.formatAnswerData(questionType, answer);
      
      console.log(`📤 [useOnlineExamQuestions] Submitting answer for student_answer_id ${studentAnswerId}:`, {
        studentAnswerId,
        questionType,
        answer,
        formattedData: answerData
      });
      
      const response = await onlineExamQuestionsService.submitAnswer(
        studentAnswerId, 
        answerData
      );
      
      if (response.success) {
        console.log(`✅ [useOnlineExamQuestions] Answer submitted successfully for student_answer_id ${studentAnswerId}:`, response.data);
        
        // Find the corresponding question to update local state
        const question = questions.find(q => q.student_answer_id === studentAnswerId);
        if (question) {
          updateAnswer(question.id, answer);
          console.log(`🔄 [useOnlineExamQuestions] Updated local answer for question ${question.id}`);
        }
        
        return {
          success: true,
          data: {
            ...response.data,
            // Ensure we have the feedback data structure we expect
            is_correct: response.data?.is_correct || false,
            awarded_mark: response.data?.awarded_mark || 0,
            max_mark: response.data?.max_mark || 0,
            feedback: response.data?.feedback || null,
            correct_answer_id: response.data?.correct_answer_id || null,
            time_taken: response.data?.time_taken || 0
          },
          studentAnswerId
        };
      } else {
        console.error(`❌ [useOnlineExamQuestions] Failed to submit answer for student_answer_id ${studentAnswerId}:`, response.error);
        return {
          success: false,
          error: response.error || 'Failed to submit answer',
          studentAnswerId
        };
      }
    } catch (error) {
      console.error('❌ [useOnlineExamQuestions] Error submitting answer:', error);
      return {
        success: false,
        error: error.message || 'Failed to submit answer',
        studentAnswerId
      };
    }
  }, [questions, updateAnswer]);

  /**
   * Finish exam session
   * @param {number|string} passedExamId - Passed exam session ID
   * @returns {Promise<Object>} Finish response
   */
  const finishExam = useCallback(async (passedExamId) => {
    setSubmitLoading(true);
    setError(null);
    
    try {
      console.log(`🏁 Finishing exam session ${passedExamId}`);
      
      const response = await onlineExamQuestionsService.finishExam(passedExamId);
      
      if (response.success) {
        console.log('✅ Exam finished successfully');
        setExamStatus('completed');
        
        return {
          success: true,
          data: response.data,
          message: response.message
        };
      } else {
        setError(response.error);
        
        return {
          success: false,
          error: response.error,
          data: response.data
        };
      }
    } catch (error) {
      console.error('❌ Error finishing exam:', error);
      setError(error.message || 'Failed to finish exam');
      
      return {
        success: false,
        error: error.message || 'Failed to finish exam'
      };
    } finally {
      setSubmitLoading(false);
    }
  }, []);

  /**
   * Get detailed exam information
   * @param {number|string} examId - Exam ID
   * @returns {Promise<Object>} Exam details response
   */
  const getExamDetails = useCallback(async (examId) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log(`📊 [useOnlineExamQuestions] Getting exam details for exam ${examId}`);
      
      const response = await onlineExamQuestionsService.getExamDetails(examId);
      
      if (response.success) {
        console.log('✅ [useOnlineExamQuestions] Exam details loaded successfully:', response.data);
        
        return {
          success: true,
          data: response.data
        };
      } else {
        setError(response.error);
        
        return {
          success: false,
          error: response.error,
          data: response.data
        };
      }
    } catch (error) {
      console.error('❌ [useOnlineExamQuestions] Error getting exam details:', error);
      setError(error.message || 'Failed to get exam details');
      
      return {
        success: false,
        error: error.message || 'Failed to get exam details'
      };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get exam answers
   * @param {number|string} examId - Exam ID
   * @param {number|string} attemptId - Attempt ID
   * @returns {Promise<Object>} Answers response
   */
  const getAnswers = useCallback(async (examId, attemptId) => {
    setResultsLoading(true);
    setError(null);
    
    try {
      const response = await onlineExamQuestionsService.getExamAnswers(examId, attemptId);
      
      if (response.success) {
        return {
          success: true,
          data: response.data
        };
      } else {
        setError(response.error);
        
        return {
          success: false,
          error: response.error,
          data: response.data
        };
      }
    } catch (error) {
      console.error('❌ Error getting answers:', error);
      setError(error.message || 'Failed to get exam answers');
      
      return {
        success: false,
        error: error.message || 'Failed to get exam answers'
      };
    } finally {
      setResultsLoading(false);
    }
  }, []);

  /**
   * Check exam status
   */
  const checkExamStatus = useCallback(async (examId) => {
    try {
      const response = await onlineExamQuestionsService.checkExamStatus(examId);
      setExamStatus(response.status);
      
      return response;
    } catch (error) {
      console.error('❌ Error checking exam status:', error);
      return {
        success: false,
        error: error.message || 'Failed to check exam status'
      };
    }
  }, []);

  /**
   * Get answered questions count
   */
  const getAnsweredCount = useCallback(() => {
    return Object.values(userAnswers).filter(answer => 
      answer !== null && answer !== undefined && answer !== ''
    ).length;
  }, [userAnswers]);

  /**
   * Get progress percentage
   */
  const getProgressPercentage = useCallback(() => {
    if (questions.length === 0) return 0;
    
    const answeredCount = getAnsweredCount();
    return Math.round((answeredCount / questions.length) * 100);
  }, [questions.length, getAnsweredCount]);

  /**
   * Check if all questions are answered
   */
  const isAllAnswered = useCallback(() => {
    return questions.length > 0 && getAnsweredCount() === questions.length;
  }, [questions.length, getAnsweredCount]);

  /**
   * Clear errors
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Update time remaining
   */
  const updateTimeRemaining = useCallback((seconds) => {
    setTimeRemaining(seconds);
  }, []);

  return {
    // State
    loading,
    error,
    examData,
    questions,
    userAnswers,
    examStatus,
    timeRemaining,
    examResults,
    
    // Loading states
    submitLoading,
    saveLoading,
    resultsLoading,
    
    // Actions
    startExam,
    retryExam,
    continueExam,
    reviewExam,
    loadExamQuestions,
    
    // Answer management
    updateAnswer,
    updateAnswers,
    submitAnswer,
    
    // Progress and submission
    saveProgress,
    finishExam,
    getExamDetails,
    getAnswers,
    
    // Utilities
    checkExamStatus,
    getAnsweredCount,
    getProgressPercentage,
    isAllAnswered,
    clearError,
    clearState,
    updateTimeRemaining
  };
};

export default useOnlineExamQuestions;