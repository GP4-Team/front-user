// src/services/api/weakness.service.js
import apiClient from './client';

/**
 * Student AI Weakness Portal Service
 * Handles all API calls related to student weakness analysis and quiz recommendations
 */
class WeaknessService {
  /**
   * Get student weakness analysis data
   * @returns {Promise<Object>} Weakness analysis data
   */
  async getWeaknessPortal() {
    try {
      const response = await apiClient.get('/student/ai/weakness/portal');
      return {
        success: true,
        data: response.data.data,
        meta: response.data.meta
      };
    } catch (error) {
      console.error('Error fetching weakness portal data:', error);
      throw {
        success: false,
        error: error.response?.data?.message || 'فشل في تحميل بيانات نقاط الضعف',
        status: error.response?.status
      };
    }
  }

  /**
   * Get quiz recommendations history
   * @returns {Promise<Object>} Quiz recommendations data
   */
  async getQuizRecommendationsHistory() {
    try {
      const response = await apiClient.get('/student/ai/quiz/recommendations/history');
      return {
        success: true,
        data: response.data.data,
        meta: response.data.meta
      };
    } catch (error) {
      console.error('Error fetching quiz recommendations:', error);
      throw {
        success: false,
        error: error.response?.data?.message || 'فشل في تحميل التوصيات',
        status: error.response?.status
      };
    }
  }

  /**
   * Get explanation for a specific recommendation
   * @param {string} recommendationId - The recommendation ID
   * @returns {Promise<Object>} Recommendation explanation data
   */
  async getRecommendationExplanation(recommendationId) {
    try {
      const response = await apiClient.get(`/student/ai/quiz/explain/${recommendationId}`);
      return {
        success: true,
        data: response.data.data,
        meta: response.data.meta
      };
    } catch (error) {
      console.error('Error fetching recommendation explanation:', error);
      throw {
        success: false,
        error: error.response?.data?.message || 'فشل في تحميل تفاصيل التوصية',
        status: error.response?.status
      };
    }
  }

  /**
   * Get all data needed for the weakness portal in one call
   * @returns {Promise<Object>} Combined data from all endpoints
   */
  async getPortalData() {
    const result = {
      success: false,
      weakness: null,
      recommendations: [],
      meta: {},
      errors: []
    };

    try {
      // Try to get weakness data first (main data)
      try {
        const weaknessData = await this.getWeaknessPortal();
        if (weaknessData.success) {
          result.weakness = weaknessData.data;
          result.meta.weakness = weaknessData.meta;
          result.success = true; // At least we have main data
        }
      } catch (error) {
        console.error('Failed to fetch weakness data:', error);
        result.errors.push({ type: 'weakness', error: error.error || error.message });
      }

      // Try to get recommendations (optional)
      try {
        const recommendationsData = await this.getQuizRecommendationsHistory();
        if (recommendationsData.success) {
          result.recommendations = recommendationsData.data.recommendations || [];
          result.meta.recommendations = recommendationsData.meta;
        }
      } catch (error) {
        console.warn('Failed to fetch recommendations (optional):', error);
        result.errors.push({ type: 'recommendations', error: error.error || error.message });
        // Don't fail the whole operation if recommendations fail
      }

      return result;
    } catch (error) {
      console.error('Error in getPortalData:', error);
      throw {
        success: false,
        error: error.error || 'فشل في تحميل بيانات البوابة',
        status: error.status,
        errors: result.errors
      };
    }
  }
}

export default new WeaknessService();
