// src/services/api/exams.service.js
import api from '../api';
import { handleApiError } from '../utils/errorHandler';

/**
 * Online Exams Service - Handle all online exam operations
 * Updated to work with new examination endpoints
 */
class ExamsService {
  /**
   * Get all online exams for the user
   * @param {Object} params - Query parameters (optional)
   * @returns {Promise<Array>} User online exams with status
   */
  async getOnlineExams(params = {}) {
    try {
      console.log('🎯 [ExamsService] === FETCHING ONLINE EXAMS ===');
      console.log('Parameters:', params);
      console.log('API Base URL:', api.defaults.baseURL);
      
      // Get user data from localStorage to extract user ID
      let userData = JSON.parse(localStorage.getItem('userData') || '{}');
      let userId = userData.id || userData.user_id || userData.student_id;
      
      console.log('User data from localStorage:', userData);
      console.log('Extracted user ID:', userId);
      console.log('Auth token present:', localStorage.getItem('authToken') ? 'Yes' : 'No');
      
      // If no user ID found, try to get it from the current user endpoint
      if (!userId) {
        console.warn('⚠️ [ExamsService] No user ID found in localStorage, fetching from /me endpoint...');
        try {
          const userResponse = await api.get('/me');
          const currentUser = userResponse.data.data;
          if (currentUser && currentUser.id) {
            userId = currentUser.id;
            console.log('✅ [ExamsService] Got user ID from /me endpoint:', userId);
            
            // Update localStorage with user data
            localStorage.setItem('userData', JSON.stringify(currentUser));
          } else {
            console.error('❌ [ExamsService] Could not get user ID from /me endpoint');
            throw new Error('User ID is required but not found. Please login again.');
          }
        } catch (userError) {
          console.error('❌ [ExamsService] Failed to get current user:', userError);
          throw new Error('Could not authenticate user. Please login again.');
        }
      }
      
      // Construct the GET URL with user ID as path parameter
      const endpoint = `/examination/online-exams/${userId}`;
      console.log('🚀 [ExamsService] Making GET request to:', endpoint);
      console.log('Query parameters:', params);
      
      // Use GET method with user ID in path and optional query parameters
      const response = await api.get(endpoint, { params });
      
      console.log('✅ [ExamsService] GET request successful!');
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      console.log('📦 [ExamsService] Raw response data:', response.data);
      
      // Handle different response structures
      if (response.data) {
        // Check if data is directly an array
        if (Array.isArray(response.data)) {
          console.log('📈 [ExamsService] Response is direct array with', response.data.length, 'items');
          return response.data;
        }
        // Check if data has exams property
        else if (response.data.exams && Array.isArray(response.data.exams)) {
          console.log('📈 [ExamsService] Response has exams property with', response.data.exams.length, 'items');
          return response.data;
        }
        // Check if data has data property
        else if (response.data.data && Array.isArray(response.data.data)) {
          console.log('📈 [ExamsService] Response has data property with', response.data.data.length, 'items');
          return { exams: response.data.data };
        }
        // Check if it's a Laravel API response with success flag
        else if (response.data.success === true && response.data.data) {
          console.log('📈 [ExamsService] Laravel success response with data');
          if (Array.isArray(response.data.data)) {
            return { exams: response.data.data };
          } else {
            return response.data.data;
          }
        }
        // Check if it's a Laravel API response with success flag but null/empty data
        else if (response.data.success === true && !response.data.data) {
          console.log('⚠️ [ExamsService] Laravel success response but no data');
          return { exams: [] };
        }
        // Check if it's an error response
        else if (response.data.success === false) {
          console.error('❌ [ExamsService] API returned error:', response.data.message);
          throw new Error(response.data.message || 'API returned error');
        }
        // Return the response as is
        else {
          console.log('🤔 [ExamsService] Unknown response structure, returning as is');
          console.log('Response data type:', typeof response.data);
          console.log('Response data keys:', Object.keys(response.data));
          return response.data;
        }
      }
      
      console.warn('⚠️ [ExamsService] Empty or invalid response');
      return { exams: [] };
    } catch (error) {
      console.error('❌ [ExamsService] === GET REQUEST FAILED ===');
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          params: error.config?.params,
          headers: error.config?.headers
        }
      });
      
      // Add more specific error handling
      if (error.response?.status === 401) {
        console.error('🚫 [ExamsService] Unauthorized - user might need to login again');
      } else if (error.response?.status === 403) {
        console.error('🚫 [ExamsService] Forbidden - user might not have permission');
      } else if (error.response?.status === 404) {
        console.error('🚫 [ExamsService] Not found - user might not have any exams or invalid user ID');
        // Return empty exams instead of throwing error for 404
        return { exams: [] };
      } else if (error.response?.status === 422) {
        console.error('🚫 [ExamsService] Validation error - invalid user ID or parameters:', error.response.data.errors);
      } else if (error.response?.status === 405) {
        console.error('🚫 [ExamsService] Method not allowed - endpoint might require different HTTP method');
      } else if (error.response?.status === 500) {
        console.error('🔥 [ExamsService] Server error - backend might have an issue');
      }
      
      throw handleApiError(error, 'Failed to fetch online exams');
    }
  }

  /**
   * Get specific online exam details by ID with status calculation
   * @param {number|string} examId - Online Exam ID
   * @returns {Promise<Object>} Online exam details with calculated status
   */
  async getOnlineExamById(examId) {
    try {
      const response = await api.get(`/examination/online-exams/${examId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch online exam details');
    }
  }

  /**
   * Get all exams for the user (legacy support)
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
   * Get featured exams (legacy support)
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
   * Get specific exam details by ID (legacy support)
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
