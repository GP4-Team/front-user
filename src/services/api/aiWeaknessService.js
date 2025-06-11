// AI Weakness Analysis API - Fixed to match real endpoints
import apiClient from './apiClient';

/**
 * AI Weakness Analysis Service - Updated for real APIs
 */
export const aiWeaknessService = {
  
  /**
   * Get student weakness analysis from real portal endpoint
   * @param {string} studentId - Student ID (not used in real API - uses authenticated user)
   * @returns {Promise<Object>} Weakness analysis data
   */
  async getStudentWeaknesses(studentId = null) {
    try {
      // Real API doesn't need studentId - uses authenticated user
      const response = await apiClient.get('/student/ai/weakness/portal');
      
      return {
        success: response.data.success || true,
        data: response.data.data || response.data,
        meta: response.data.meta
      };
    } catch (error) {
      console.error('Error fetching student weaknesses:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch weakness analysis',
        data: null
      };
    }
  },

  /**
   * Get quiz explanation for a recommendation
   * @param {string} recommendationId - Recommendation ID
   * @returns {Promise<Object>} Quiz explanation data
   */
  async getQuizExplanation(recommendationId) {
    try {
      const response = await apiClient.get(`/student/ai/quiz/explain/${recommendationId}`);
      
      return {
        success: response.data.success || true,
        data: response.data.data || response.data,
        meta: response.data.meta
      };
    } catch (error) {
      console.error('Error fetching quiz explanation:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch quiz explanation',
        data: null
      };
    }
  }
};

export default aiWeaknessService;