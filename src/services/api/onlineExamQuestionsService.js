// Online Exam Questions Service
import apiClient from './apiClient';

/**
 * Online Exam Questions Service
 * Handles fetching exam questions based on different exam states
 */
export const onlineExamQuestionsService = {
  
  /**
   * Get questions for an online exam based on student's current exam status
   * @param {number|string} examId - The exam ID
   * @param {string} action - The action type ('start', 'retry', 'continue', 'revision')
   * @returns {Promise<Object>} Exam questions data
   */
  async getExamQuestions(examId, action = 'start') {
    try {
      console.log(`📝 Fetching exam questions for exam ${examId} with action: ${action}`);
      
      const response = await apiClient.post(`/examination/online-exams/${examId}/questions`, {
        action: action
      });
      
      console.log('✅ Exam questions response:', response);
      
      // Handle successful response
      if (response.success !== false) {
        return {
          success: true,
          data: response.data || response,
          message: response.message || 'Questions loaded successfully',
          examId: examId,
          action: action
        };
      } else {
        // Handle specific error cases
        return {
          success: false,
          error: response.message || 'Failed to get exam questions',
          status: response.data?.status || 'error',
          examId: response.data?.exam_id || examId,
          data: response.data || null
        };
      }
    } catch (error) {
      console.error('❌ Error fetching exam questions:', error);
      
      // Handle different error scenarios
      const errorResponse = error.response?.data;
      
      if (errorResponse) {
        return {
          success: false,
          error: errorResponse.message || 'Failed to get exam questions',
          status: errorResponse.data?.status || 'error',
          examId: errorResponse.data?.exam_id || examId,
          data: errorResponse.data || null,
          httpStatus: error.response?.status
        };
      }
      
      return {
        success: false,
        error: error.message || 'Network error occurred',
        status: 'network_error',
        examId: examId,
        data: null
      };
    }
  },

  /**
   * Start a new exam session
   * @param {number|string} examId - The exam ID
   * @returns {Promise<Object>} Exam questions data
   */
  async startExam(examId) {
    return this.getExamQuestions(examId, 'start');
  },

  /**
   * Retry an exam (new attempt)
   * @param {number|string} examId - The exam ID
   * @returns {Promise<Object>} Exam questions data
   */
  async retryExam(examId) {
    return this.getExamQuestions(examId, 'retry');
  },

  /**
   * Continue an existing exam session
   * @param {number|string} examId - The exam ID
   * @returns {Promise<Object>} Exam questions data
   */
  async continueExam(examId) {
    return this.getExamQuestions(examId, 'continue');
  },

  /**
   * Get exam for revision (review completed exam)
   * @param {number|string} examId - The exam ID
   * @returns {Promise<Object>} Exam questions data
   */
  async reviewExam(examId) {
    return this.getExamQuestions(examId, 'revision');
  },

  /**
   * Check exam availability and status
   * @param {number|string} examId - The exam ID
   * @returns {Promise<Object>} Exam status info
   */
  async checkExamStatus(examId) {
    try {
      console.log(`🔍 Checking exam status for exam ${examId}`);
      
      // First try to get questions to check status
      const response = await this.getExamQuestions(examId, 'continue');
      
      if (response.success) {
        return {
          success: true,
          status: 'available',
          examId: examId,
          message: 'Exam is available'
        };
      } else {
        return {
          success: false,
          status: response.status || 'unavailable',
          examId: response.examId || examId,
          message: response.error || 'Exam is not available'
        };
      }
    } catch (error) {
      console.error('❌ Error checking exam status:', error);
      
      return {
        success: false,
        status: 'error',
        examId: examId,
        message: error.message || 'Failed to check exam status'
      };
    }
  },

  /**
   * Submit individual answer for a question
   * @param {number|string} studentAnswerId - The student answer ID
   * @param {Object} answerData - The answer data (choice_id or text)
   * @returns {Promise<Object>} Submit response
   */
  async submitAnswer(studentAnswerId, answerData) {
    try {
      console.log(`📤 Submitting answer for student answer ID ${studentAnswerId}:`, answerData);
      
      const response = await apiClient.post(`/examination/submit-answer/${studentAnswerId}`, answerData);
      
      console.log('✅ Submit answer response:', response);
      
      return {
        success: true,
        data: response.data || response,
        message: response.message || 'Answer submitted successfully',
        studentAnswerId: studentAnswerId
      };
    } catch (error) {
      console.error('❌ Error submitting answer:', error);
      
      const errorResponse = error.response?.data;
      
      return {
        success: false,
        error: errorResponse?.message || error.message || 'Failed to submit answer',
        studentAnswerId: studentAnswerId,
        data: errorResponse?.data || null,
        httpStatus: error.response?.status
      };
    }
  },

  /**
   * Finish exam session
   * @param {number|string} passedExamId - The passed exam session ID
   * @returns {Promise<Object>} Finish response
   */
  async finishExam(passedExamId) {
    try {
      console.log(`🏁 Finishing exam session ${passedExamId}`);
      
      const response = await apiClient.post(`/examination/finish-exam/${passedExamId}`);
      
      console.log('✅ Finish exam response:', response);
      
      return {
        success: true,
        data: response.data || response,
        message: response.message || 'Exam finished successfully',
        passedExamId: passedExamId
      };
    } catch (error) {
      console.error('❌ Error finishing exam:', error);
      
      const errorResponse = error.response?.data;
      
      return {
        success: false,
        error: errorResponse?.message || error.message || 'Failed to finish exam',
        passedExamId: passedExamId,
        data: errorResponse?.data || null,
        httpStatus: error.response?.status
      };
    }
  },

  /**
   * Save exam progress (auto-save during exam)
   * @param {number|string} examId - The exam ID
   * @param {Object} answers - Current answers
   * @param {number} timeRemaining - Time remaining in seconds
   * @returns {Promise<Object>} Save response
   */
  async saveExamProgress(examId, answers, timeRemaining) {
    try {
      console.log(`💾 Saving progress for exam ${examId}`);
      
      const response = await apiClient.post(`/examination/online-exams/${examId}/save-progress`, {
        answers: answers,
        time_remaining: timeRemaining
      });
      
      return {
        success: true,
        data: response.data || response,
        message: 'Progress saved successfully',
        examId: examId
      };
    } catch (error) {
      console.error('❌ Error saving progress:', error);
      
      // Don't throw errors for progress saving - it's not critical
      return {
        success: false,
        error: error.message || 'Failed to save progress',
        examId: examId
      };
    }
  },

  /**
   * Get exam results
   * @param {number|string} examId - The exam ID
   * @param {number|string} attemptId - The attempt ID
   * @returns {Promise<Object>} Exam results
   */
  async getExamResults(examId, attemptId) {
    try {
      console.log(`📊 Fetching results for exam ${examId}, attempt ${attemptId}`);
      
      const response = await apiClient.get(`/examination/exam-results/${examId}/${attemptId}`);
      
      console.log('✅ Results response:', response);
      
      return {
        success: true,
        data: response.data || response,
        examId: examId,
        attemptId: attemptId
      };
    } catch (error) {
      console.error('❌ Error fetching results:', error);
      
      const errorResponse = error.response?.data;
      
      return {
        success: false,
        error: errorResponse?.message || error.message || 'Failed to get exam results',
        examId: examId,
        attemptId: attemptId,
        data: errorResponse?.data || null,
        httpStatus: error.response?.status
      };
    }
  },

  /**
   * Get exam answers
   * @param {number|string} examId - The exam ID
   * @param {number|string} attemptId - The attempt ID
   * @returns {Promise<Object>} Exam answers
   */
  async getExamAnswers(examId, attemptId) {
    try {
      console.log(`📋 Fetching answers for exam ${examId}, attempt ${attemptId}`);
      
      const response = await apiClient.get(`/examination/exam-answers/${examId}/${attemptId}`);
      
      console.log('✅ Answers response:', response);
      
      return {
        success: true,
        data: response.data || response,
        examId: examId,
        attemptId: attemptId
      };
    } catch (error) {
      console.error('❌ Error fetching answers:', error);
      
      const errorResponse = error.response?.data;
      
      return {
        success: false,
        error: errorResponse?.message || error.message || 'Failed to get exam answers',
        examId: examId,
        attemptId: attemptId,
        data: errorResponse?.data || null,
        httpStatus: error.response?.status
      };
    }
  },

  /**
   * Format answer data based on question type
   * @param {string} questionType - Question type (MultipleChoice, TrueFalse, etc.)
   * @param {any} answer - The answer value
   * @returns {Object} Formatted answer data
   */
  formatAnswerData(questionType, answer) {
    switch (questionType) {
      case 'MultipleChoice':
      case 'TrueFalse':
        return {
          choice_id: parseInt(answer)
        };
      
      case 'KeywordsEssay':
      case 'Essay':
        return {
          text: answer.toString()
        };
      
      default:
        console.warn(`Unknown question type: ${questionType}`);
        return {
          choice_id: parseInt(answer)
        };
    }
  }
};

export default onlineExamQuestionsService;