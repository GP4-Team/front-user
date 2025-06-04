// src/services/api/materials.service.js
import api from '../api';
import { handleApiError } from '../utils/errorHandler';

/**
 * Materials Service - Handle all educational material operations
 */
class MaterialsService {
  /**
   * Get course materials/content
   * @param {number|string} courseId - Course ID
   * @returns {Promise<Array>} List of course materials
   */
  async getCourseContent(courseId) {
    try {
      const response = await api.get(`/materials/course/${courseId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch course materials');
    }
  }

  /**
   * Get specific material details
   * @param {number|string} materialId - Material ID
   * @returns {Promise<Object>} Material details
   */
  async getMaterialById(materialId) {
    try {
      const response = await api.get(`/materials/${materialId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch material details');
    }
  }

  /**
   * Update material progress
   * @param {number|string} materialId - Material ID
   * @param {Object} progressData - Progress information
   * @returns {Promise<Object>} Progress update result
   */
  async updateProgress(materialId, progressData) {
    try {
      const response = await api.post(`/materials/${materialId}/progress`, progressData);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to update material progress');
    }
  }

  /**
   * Get material progress
   * @param {number|string} materialId - Material ID
   * @returns {Promise<Object>} Material progress data
   */
  async getProgress(materialId) {
    try {
      const response = await api.get(`/materials/${materialId}/progress`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch material progress');
    }
  }

  /**
   * Mark material as completed
   * @param {number|string} materialId - Material ID
   * @returns {Promise<Object>} Completion result
   */
  async markAsCompleted(materialId) {
    try {
      const response = await api.post(`/materials/${materialId}/complete`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to mark material as completed');
    }
  }

  /**
   * Get material comments/discussions
   * @param {number|string} materialId - Material ID
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>} List of comments
   */
  async getComments(materialId, params = {}) {
    try {
      const response = await api.get(`/materials/${materialId}/comments`, { params });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch material comments');
    }
  }

  /**
   * Add comment to material
   * @param {number|string} materialId - Material ID
   * @param {string} comment - Comment text
   * @returns {Promise<Object>} Comment creation result
   */
  async addComment(materialId, comment) {
    try {
      const response = await api.post(`/materials/${materialId}/comments`, {
        comment
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to add comment');
    }
  }

  /**
   * Rate a material
   * @param {number|string} materialId - Material ID
   * @param {number} rating - Rating (1-5)
   * @param {string} review - Optional review text
   * @returns {Promise<Object>} Rating result
   */
  async rateMaterial(materialId, rating, review = '') {
    try {
      const response = await api.post(`/materials/${materialId}/rate`, {
        rating,
        review
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to rate material');
    }
  }

  /**
   * Download material file
   * @param {number|string} materialId - Material ID
   * @returns {Promise<Blob>} File blob
   */
  async downloadMaterial(materialId) {
    try {
      const response = await api.get(`/materials/${materialId}/download`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to download material');
    }
  }

  /**
   * Get material attachments
   * @param {number|string} materialId - Material ID
   * @returns {Promise<Array>} List of attachments
   */
  async getAttachments(materialId) {
    try {
      const response = await api.get(`/materials/${materialId}/attachments`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch material attachments');
    }
  }

  /**
   * Stream video material
   * @param {number|string} materialId - Material ID
   * @param {Object} options - Streaming options
   * @returns {Promise<Response>} Stream response
   */
  async streamVideo(materialId, options = {}) {
    try {
      const response = await api.get(`/materials/${materialId}/stream`, {
        responseType: 'stream',
        ...options
      });
      return response;
    } catch (error) {
      throw handleApiError(error, 'Failed to stream video');
    }
  }
}

// Export single instance of the service
export default new MaterialsService();
