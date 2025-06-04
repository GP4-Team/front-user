// src/services/api/exams.service.js
import api from '../api';
import { handleApiError } from '../utils/errorHandler';

/**
 * Exams Service - Handle all exam operations
 */
class ExamsService {
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
}

// Export single instance of the service
export default new ExamsService();
