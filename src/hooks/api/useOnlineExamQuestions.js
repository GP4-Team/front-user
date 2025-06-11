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
        setTimeRemaining(data.time_remaining || data.duration || 0);
        
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
   * Submit exam answers
   */
  const submitExam = useCallback(async (examId) => {
    setSubmitLoading(true);
    setError(null);
    
    try {
      console.log(`📤 Submitting exam ${examId} with answers:`, userAnswers);
      
      const response = await onlineExamQuestionsService.submitExamAnswers(examId, userAnswers);
      
      if (response.success) {
        console.log('✅ Exam submitted successfully');
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
      console.error('❌ Error submitting exam:', error);
      setError(error.message || 'Failed to submit exam');
      
      return {
        success: false,
        error: error.message || 'Failed to submit exam'
      };
    } finally {
      setSubmitLoading(false);
    }
  }, [userAnswers]);

  /**
   * Get exam results
   */
  const getResults = useCallback(async (examId) => {
    setResultsLoading(true);
    setError(null);
    
    try {
      const response = await onlineExamQuestionsService.getExamResults(examId);
      
      if (response.success) {
        setExamResults(response.data);
        
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
      console.error('❌ Error getting results:', error);
      setError(error.message || 'Failed to get exam results');
      
      return {
        success: false,
        error: error.message || 'Failed to get exam results'
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
    
    // Progress and submission
    saveProgress,
    submitExam,
    getResults,
    
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