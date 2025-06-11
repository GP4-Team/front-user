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
   * Submit exam answers
   * @param {number|string} examId - The exam ID
   * @param {Object} answers - The answers object
   * @returns {Promise<Object>} Submit response
   */
  async submitExamAnswers(examId, answers) {
    try {
      console.log(`📤 Submitting answers for exam ${examId}:`, answers);
      
      const response = await apiClient.post(`/examination/online-exams/${examId}/submit`, {
        answers: answers
      });
      
      console.log('✅ Submit response:', response);
      
      return {
        success: true,
        data: response.data || response,
        message: response.message || 'Answers submitted successfully',
        examId: examId
      };
    } catch (error) {
      console.error('❌ Error submitting answers:', error);
      
      const errorResponse = error.response?.data;
      
      return {
        success: false,
        error: errorResponse?.message || error.message || 'Failed to submit answers',
        examId: examId,
        data: errorResponse?.data || null
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
   * @returns {Promise<Object>} Exam results
   */
  async getExamResults(examId) {
    try {
      console.log(`📊 Fetching results for exam ${examId}`);
      
      const response = await apiClient.get(`/examination/online-exams/${examId}/results`);
      
      console.log('✅ Results response:', response);
      
      return {
        success: true,
        data: response.data || response,
        examId: examId
      };
    } catch (error) {
      console.error('❌ Error fetching results:', error);
      
      const errorResponse = error.response?.data;
      
      return {
        success: false,
        error: errorResponse?.message || error.message || 'Failed to get exam results',
        examId: examId,
        data: errorResponse?.data || null
      };
    }
  }
};

export default onlineExamQuestionsService;