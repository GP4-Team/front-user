// Exam Statistics API Service
import axios from 'axios';

/**
 * Exam Statistics Service
 * Handles exam statistics API calls with improved error handling
 */

// Create a separate axios instance for statistics to avoid global redirects
const statsApiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

// Add request interceptor for auth token
statsApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    const language = localStorage.getItem('language') || 'ar';
    config.headers['Accept-Language'] = language;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor with gentler error handling
statsApiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Don't redirect on 401 for statistics - just log and return error
    if (error.response?.status === 401) {
      console.warn('🔐 Statistics endpoint requires authentication - will use fallback calculation');
    }
    return Promise.reject(error);
  }
);

export const examStatisticsService = {
  
  /**
   * Get exam statistics for current user
   * @returns {Promise<Object>} Exam statistics data
   */
  async getExamStatistics() {
    try {
      console.log('📊 Attempting to fetch exam statistics...');
      const response = await statsApiClient.get('/examination/exam-statistics');
      
      console.log('✅ Successfully fetched exam statistics:', response);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.warn('⚠️ Failed to fetch exam statistics from API:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        endpoint: '/examination/exam-statistics'
      });
      
      // Don't treat this as a critical error - the UI will fall back to local calculation
      return {
        success: false,
        error: error.response?.data?.message || 'Statistics endpoint not available',
        status: error.response?.status,
        fallbackToLocal: true // Flag to indicate UI should use local calculation
      };
    }
  }
};

export default examStatisticsService;