// src/services/api.js
import axios from 'axios';
import { getToken, isTokenExpired, removeToken } from '../utils/tokenHelpers';
import { getBaseApiUrl } from '../config/api.config';

// Get API base URL from configuration (supports environment variables)
const API_BASE_URL = getBaseApiUrl();

// CSRF token management
let csrfToken = null;

/**
 * Get CSRF token from cookies
 * @returns {string|null} CSRF token or null
 */
const getCsrfTokenFromCookie = () => {
  try {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; XSRF-TOKEN=`);
    if (parts.length === 2) {
      const token = parts.pop().split(';').shift();
      return decodeURIComponent(token);
    }
    return null;
  } catch (error) {
    console.error('Error reading CSRF token from cookie:', error);
    return null;
  }
};

/**
 * Initialize CSRF token for Laravel Sanctum
 * @returns {Promise<boolean>} Success status
 */
export const initCsrfToken = async () => {
  try {
    console.log('🔄 Initializing CSRF token for Laravel Sanctum...');
    
    // For development, skip CSRF if CORS is blocking
    if (window.location.hostname === 'localhost') {
      console.log('🛠️ Development mode: CSRF token skipped due to CORS limitations');
      return true;
    }
    
    // Create a separate axios instance for CSRF requests
    const csrfApi = axios.create({
      baseURL: API_BASE_URL.replace('/api', ''), // Remove /api for sanctum endpoint
      withCredentials: true, // Important for CSRF cookies
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      timeout: 10000
    });
    
    // Call sanctum/csrf-cookie endpoint
    await csrfApi.get('/sanctum/csrf-cookie');
    
    // Get the CSRF token from cookies
    csrfToken = getCsrfTokenFromCookie();
    
    if (csrfToken) {
      console.log('✅ CSRF token initialized successfully');
      return true;
    } else {
      console.warn('⚠️ CSRF token not found in cookies');
      return false;
    }
  } catch (error) {
    console.error('❌ Failed to initialize CSRF token:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return false;
  }
};

/**
 * Create an Axios instance with default configuration
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    // Removed X-Requested-With to avoid CORS preflight in development
  },
  timeout: 30000, // 30 seconds timeout for slow connections
  withCredentials: window.location.hostname !== 'localhost' // Only enable for production to avoid CORS issues
});

/**
 * Handle request interceptor for authentication and CSRF
 */
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    
    // Don't add Authorization header to login/register endpoints (they don't need existing tokens)
    // But DO add it to logout/me endpoints (they require valid tokens)
    const noTokenEndpoints = ['/login', '/register'];
    const requiresTokenEndpoint = noTokenEndpoints.some(endpoint => 
      config.url === endpoint && config.url?.indexOf('student') === -1
    );
    
    // Get token from local storage
    const token = getToken();
    
    // Add token to authorization header if available (but not for login/register endpoints)
    if (token && !requiresTokenEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Authorization header added');
    } else if (requiresTokenEndpoint) {
      console.log('🚫 Skipping Authorization header for login/register endpoint');
    } else {
      console.log('⚠️ No token available');
    }
    
    // Add CSRF token for state-changing requests (only in production)
    if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase())) {
      // Skip CSRF in development to avoid CORS issues
      if (window.location.hostname !== 'localhost') {
        const currentCsrfToken = getCsrfTokenFromCookie();
        if (currentCsrfToken) {
          config.headers['X-XSRF-TOKEN'] = currentCsrfToken;
          console.log('🛡️ CSRF token attached to request');
        } else {
          console.warn('⚠️ No CSRF token available for state-changing request');
        }
      } else {
        console.log('🛠️ Development mode: Skipping CSRF token to avoid CORS issues');
      }
    }
    
    // Add X-Requested-With header for Laravel recognition (but not for login/register endpoints in development)
    const isDevelopment = window.location.hostname === 'localhost';
    
    if (!isDevelopment || !requiresTokenEndpoint) {
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      console.log('🏷️ X-Requested-With header added');
    } else {
      console.log('🚫 Skipping X-Requested-With for login/register endpoint in development');
    }
    
    console.log('📋 Request headers:', {
      'Authorization': config.headers.Authorization ? 'Bearer ***' : 'Not set',
      'Content-Type': config.headers['Content-Type'],
      'Accept': config.headers['Accept'],
      'X-Requested-With': config.headers['X-Requested-With']
    });
    
    if (config.data) {
      console.log('📤 Request data:', config.data);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

/**
 * Handle response interceptor for error handling and logging
 */
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - Status: ${response.status}`);
    
    if (response.data) {
      console.log('📥 Response data:', response.data);
    }
    
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Log error details
    console.error(`❌ ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url} failed:`);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
    
    // Handle CSRF token mismatch
    if (error.response && error.response.status === 419) {
      console.warn('🔄 CSRF token mismatch, refreshing token...');
      try {
        await initCsrfToken();
        console.log('✨ CSRF token refreshed, retrying request...');
        return api.request(originalRequest);
      } catch (csrfError) {
        console.error('❌ Failed to refresh CSRF token:', csrfError);
      }
    }
    
    // Handle token expiration or authentication errors
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      console.warn('🚫 Authentication failed, clearing tokens...');
      
      // Handle authentication error
      removeToken();
      localStorage.removeItem('userData');
      
      // Don't redirect during API calls, let components handle it
      console.log('🚑 Authentication error - component should handle redirect');
      
      return Promise.reject(error);
    }
    
    // Handle server errors with detailed logging
    if (error.response && error.response.status === 500) {
      console.error('🔥 Server error (500):', error.response.data);
      if (error.response.data?.message?.includes('guard')) {
        console.error('🛡️ Possible auth guard configuration issue in Laravel');
      }
    }
    
    // Handle tenant not found or maintenance mode
    if (error.response && error.response.status === 503) {
      console.error('🚧 Service unavailable (503). Tenant might be in maintenance mode.');
    }
    
    // Handle rate limiting
    if (error.response && error.response.status === 429) {
      console.error('🚀 Rate limit exceeded (429). Please try again later.');
    }
    
    // Handle validation errors
    if (error.response && error.response.status === 422) {
      console.warn('⚠️ Validation errors (422):', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

/**
 * Utility function to test API connection
 * @returns {Promise<Object>} Connection test result
 */
export const testApiConnection = async () => {
  try {
    console.log('🧪 Testing API connection...');
    
    // First initialize CSRF token
    const csrfResult = await initCsrfToken();
    
    const result = {
      baseURL: API_BASE_URL,
      timestamp: new Date().toISOString(),
      csrfToken: csrfResult,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept-Language': localStorage.getItem('language') || 'ar',
        'X-Tenant-Domain': window.location.hostname,
        'User-Agent': 'LMS-Frontend/1.0'
      }
    };
    
    console.log('📋 API Configuration:', result);
    return result;
  } catch (error) {
    console.error('❌ API connection test failed:', error);
    throw error;
  }
};

/**
 * Force refresh CSRF token
 * @returns {Promise<boolean>} Success status
 */
export const refreshCsrfToken = async () => {
  console.log('🔄 Force refreshing CSRF token...');
  csrfToken = null;
  return await initCsrfToken();
};

export default api;