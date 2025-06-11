// AI Recommendations API - Fixed to match real endpoints
import apiClient from './apiClient';

/**
 * AI Recommendations Service - Updated for real APIs
 */
export const recommendationService = {
  
  /**
   * Get recommendation history for a student with proper parameters
   * @param {string} studentId - Student ID (not used in real API - uses authenticated user)
   * @param {Object} filters - Filter options
   * @returns {Promise<Object>} Student recommendations history
   */
  async getStudentRecommendations(studentId = null, filters = {}) {
    try {
      // Build query parameters (all optional)
      const params = {};
      
      // Add filters if provided
      if (filters.course_id) params.course_id = parseInt(filters.course_id);
      if (filters.limit) params.limit = parseInt(filters.limit); // Ensure it's integer
      if (filters.purpose) params.purpose = filters.purpose;
      if (filters.date_from) params.date_from = filters.date_from;
      if (filters.date_to) params.date_to = filters.date_to;
      
      // Set default limit if not provided
      if (!params.limit) params.limit = 20;
      
      const response = await apiClient.get('/student/ai/quiz/recommendations/history', {
        params: params
      });
      
      return {
        success: response.data.success || true,
        data: response.data.data || response.data,
        meta: response.data.meta
      };
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch recommendations',
        data: { recommendations: [], total_count: 0 }
      };
    }
  },

  /**
   * Get detailed explanation for a specific recommendation
   * @param {string} recommendationId - Recommendation ID
   * @returns {Promise<Object>} Recommendation explanation
   */
  async getRecommendationExplanation(recommendationId) {
    try {
      const response = await apiClient.get(`/student/ai/quiz/explain/${recommendationId}`);
      
      return {
        success: response.data.success || true,
        data: response.data.data || response.data,
        meta: response.data.meta
      };
    } catch (error) {
      console.error('Error fetching recommendation explanation:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch recommendation explanation',
        data: null
      };
    }
  }
};

export default recommendationService;