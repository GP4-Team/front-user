// src/services/examService.js
import api from './api';
import { handleApiError } from './utils/errorHandler';

/**
 * Exam Service - Handle all exam operations using the correct API base
 */
class ExamService {
  /**
   * Get all exams for the user
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>} User exams
   */
  async getUserExams(params = {}) {
    try {
      const response = await api.get('/exams/user', { params });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch user exams');
    }
  }

  /**
   * Get featured exams
   * @param {number} limit - Number of exams to fetch
   * @returns {Promise<Array>} Featured exams
   */
  async getFeaturedExams(limit = 6) {
    try {
      const response = await api.get('/exams/featured', { 
        params: { limit } 
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch featured exams');
    }
  }

  /**
   * Get specific exam details by ID
   * @param {number|string} examId - Exam ID
   * @returns {Promise<Object>} Exam details
   */
  async getExamById(examId) {
    try {
      const response = await api.get(`/exams/${examId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch exam details');
    }
  }

  /**
   * Start an exam and get questions
   * @param {number|string} examId - Exam ID
   * @returns {Promise<Object>} Exam start response with questions
   */
  async startExam(examId) {
    try {
      const response = await api.post(`/exams/${examId}/start`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to start exam');
    }
  }

  /**
   * Get exam questions
   * @param {number|string} examId - Exam ID
   * @returns {Promise<Array>} List of questions
   */
  async getExamQuestions(examId) {
    try {
      const response = await api.get(`/exams/${examId}/questions`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch exam questions');
    }
  }

  /**
   * Submit an answer during the exam
   * @param {number|string} examId - Exam ID
   * @param {number|string} questionId - Question ID
   * @param {any} answer - Answer data
   * @returns {Promise<Object>} Submit response
   */
  async submitAnswer(examId, questionId, answer) {
    try {
      const response = await api.post(`/exams/${examId}/questions/${questionId}/answer`, { 
        answer 
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to submit answer');
    }
  }

  /**
   * Save answer without submitting (draft)
   * @param {number|string} examId - Exam ID
   * @param {number|string} questionId - Question ID
   * @param {any} answer - Answer data
   * @returns {Promise<Object>} Save response
   */
  async saveAnswer(examId, questionId, answer) {
    try {
      const response = await api.post(`/exams/${examId}/questions/${questionId}/save`, { 
        answer 
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to save answer');
    }
  }

  /**
   * Submit the entire exam
   * @param {number|string} examId - Exam ID
   * @param {Object} answers - All answers
   * @returns {Promise<Object>} Exam submission result
   */
  async submitExam(examId, answers) {
    try {
      const response = await api.post(`/exams/${examId}/submit`, { answers });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to submit exam');
    }
  }

  /**
   * Get exam results
   * @param {number|string} examId - Exam ID
   * @param {number|string} attemptId - Specific attempt ID (optional)
   * @returns {Promise<Object>} Exam results
   */
  async getExamResults(examId, attemptId = null) {
    try {
      const endpoint = attemptId 
        ? `/exams/${examId}/attempts/${attemptId}/results`
        : `/exams/${examId}/results`;
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch exam results');
    }
  }

  /**
   * Get all previous attempts for an exam
   * @param {number|string} examId - Exam ID
   * @returns {Promise<Array>} List of attempts
   */
  async getExamAttempts(examId) {
    try {
      const response = await api.get(`/exams/${examId}/attempts`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch exam attempts');
    }
  }

  /**
   * Get exam statistics
   * @param {number|string} examId - Exam ID
   * @returns {Promise<Object>} Exam statistics
   */
  async getExamStats(examId) {
    try {
      const response = await api.get(`/exams/${examId}/stats`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch exam statistics');
    }
  }

  /**
   * Get exam progress during an active session
   * @param {number|string} examId - Exam ID
   * @returns {Promise<Object>} Current exam progress
   */
  async getExamProgress(examId) {
    try {
      const response = await api.get(`/exams/${examId}/progress`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch exam progress');
    }
  }

  /**
   * Pause an exam
   * @param {number|string} examId - Exam ID
   * @returns {Promise<Object>} Pause response
   */
  async pauseExam(examId) {
    try {
      const response = await api.post(`/exams/${examId}/pause`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to pause exam');
    }
  }

  /**
   * Resume a paused exam
   * @param {number|string} examId - Exam ID
   * @returns {Promise<Object>} Resume response
   */
  async resumeExam(examId) {
    try {
      const response = await api.post(`/exams/${examId}/resume`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to resume exam');
    }
  }

  /**
   * Get exam time remaining
   * @param {number|string} examId - Exam ID
   * @returns {Promise<Object>} Time remaining data
   */
  async getTimeRemaining(examId) {
    try {
      const response = await api.get(`/exams/${examId}/time-remaining`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch time remaining');
    }
  }

  /**
   * Flag a question for review
   * @param {number|string} examId - Exam ID
   * @param {number|string} questionId - Question ID
   * @param {boolean} flagged - Flag status
   * @returns {Promise<Object>} Flag response
   */
  async flagQuestion(examId, questionId, flagged = true) {
    try {
      const response = await api.post(`/exams/${examId}/questions/${questionId}/flag`, { 
        flagged 
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to flag question');
    }
  }

  /**
   * Search/filter exams
   * @param {Object} filters - Search filters
   * @returns {Promise<Array>} Filtered exams
   */
  async searchExams(filters = {}) {
    try {
      const response = await api.get('/exams/search', { params: filters });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to search exams');
    }
  }
}

// Export single instance
const examService = new ExamService();
export default examService;
