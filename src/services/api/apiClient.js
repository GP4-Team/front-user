// Base API configuration for services
import axios from 'axios';
import { getBaseApiUrl } from '../../config/api.config';

// Debug flag for API client
const DEBUG_API = true;

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: getBaseApiUrl(),
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Language': 'ar' // Default to Arabic as requested
  },
});

// Request interceptor to add auth token and language
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token
    const token = localStorage.getItem('accessToken'); // Fixed: use accessToken instead of authToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add language preference (can be overridden per request)
    const language = localStorage.getItem('language') || 'ar';
    config.headers['Accept-Language'] = language;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle common HTTP errors
    if (error.response) {
      const { status, data } = error.response;
      const endpoint = error.config?.url || 'unknown';
      
      console.log(`🌐 API Error on ${endpoint}:`, { status, data: data?.message || data });
      
      switch (status) {
        case 401:
          // Unauthorized - but be smarter about redirects
          console.warn('🔐 Unauthorized access detected');
          
          // Don't redirect immediately for non-critical endpoints
          const nonCriticalEndpoints = [
            '/examination/exam-statistics',
            '/user/preferences',
            '/dashboard/widgets',
            '/notifications'
          ];
          
          const isNonCritical = nonCriticalEndpoints.some(path => endpoint.includes(path));
          
          if (isNonCritical) {
            console.warn(`⚠️ Non-critical endpoint ${endpoint} failed auth - not redirecting`);
          } else {
            // Only redirect for critical endpoints
            console.error(`🚫 Critical endpoint ${endpoint} failed auth - redirecting to login`);
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            
            // Add delay to prevent abrupt redirects
            setTimeout(() => {
              if (window.location.pathname !== '/auth') {
                window.location.href = '/auth?mode=login';
              }
            }, 1000);
          }
          break;
        case 403:
          // Forbidden
          console.error('🚫 Access forbidden:', data?.message || 'No permission');
          break;
        case 404:
          // Not found
          console.error('🔍 Resource not found:', data?.message || 'Endpoint not found');
          break;
        case 422:
          // Validation error
          console.error('📝 Validation error:', data?.errors || data?.message);
          break;
        case 500:
          // Server error
          console.error('💥 Server error:', data?.message || 'Internal server error');
          break;
        default:
          console.error('❌ API Error:', data?.message || 'Unknown error');
      }
    } else if (error.request) {
      // Network error
      console.error('🌐 Network error:', error.message);
    } else {
      // Request setup error
      console.error('⚙️ Request error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;