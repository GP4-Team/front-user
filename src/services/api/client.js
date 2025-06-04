// src/services/api/client.js
import axios from 'axios';

// Extract base URL from environment variables or use default
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://academy1.gp-app.tafra-tech.com/api';

/**
 * Get the current host for multi-tenancy
 * @returns {string} - Hostname
 */
const getTenantHost = () => {
  return window.location.hostname;
};

/**
 * Get user preferred language from local storage
 * @returns {string} - Language code (default: ar)
 */
const getUserLanguage = () => {
  return localStorage.getItem('language') || 'ar';
};

/**
 * Create axios instance with default configuration
 * CORS Fix: Disabled withCredentials to avoid CORS issues
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest' // Important for Laravel
  },
  timeout: 30000, // 30 seconds timeout
  // CORS Fix: Disabled credentials mode
  withCredentials: false
});

// Intercept requests to add token and other information
apiClient.interceptors.request.use(
  (config) => {
    // Add token if available - fix the token key to match what's used in auth.js
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add preferred language
    config.headers['Accept-Language'] = getUserLanguage();
    
    // Add tenant host info (for multi-tenancy)
    config.headers['X-Tenant-Host'] = getTenantHost();
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept responses to handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle authentication errors
    if (response?.status === 401) {
      // If 401 (unauthorized), log out
      localStorage.removeItem('accessToken'); // Fixed token key
      localStorage.removeItem('userData');
      window.location.href = '/login?message=session_expired';
    }
    
    // Handle access denied
    if (response?.status === 403) {
      console.error('Access denied:', response.data?.message);
    }
    
    // Handle validation errors
    if (response?.status === 422) {
      console.error('Validation failed:', response.data?.errors);
    }
    
    // Handle tenant errors
    if (response?.status === 503) {
      // Tenant not found or in maintenance mode
      window.location.href = '/maintenance';
    }
    
    // Handle server errors
    if (response?.status === 500) {
      console.error('Server error:', response.data);
    }
    
    // Handle rate limiting
    if (response?.status === 429) {
      console.error('Rate limit exceeded. Please try again later.');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;