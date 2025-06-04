// src/services/utils/errorHandler.js
/**
 * Central API error handler utility
 */

/**
 * Handle API errors and convert them to user-friendly messages
 * @param {Error} error - API error object
 * @param {string} defaultMessage - Default error message
 * @returns {Error} Processed error object
 */
export const handleApiError = (error, defaultMessage = 'An unexpected error occurred') => {
  // Network error or no response
  if (!error.response) {
    return new Error('Failed to connect to server. Please check your internet connection.');
  }

  const { status, data } = error.response;
  let message = defaultMessage;

  // Handle different errors based on status code
  switch (status) {
    case 400:
      message = data?.message || 'Bad request';
      break;
    case 401:
      message = 'Unauthorized. Please login again';
      break;
    case 403:
      message = 'You do not have permission to access this content';
      break;
    case 404:
      message = 'The requested content was not found';
      break;
    case 422:
      // Validation errors
      if (data?.errors) {
        const validationErrors = Object.values(data.errors).flat();
        message = validationErrors.join(', ');
      } else {
        message = data?.message || 'Invalid data';
      }
      break;
    case 429:
      message = 'Too many requests. Please try again later';
      break;
    case 500:
      message = 'Server error. Please try again later';
      break;
    case 503:
      message = 'Service temporarily unavailable. Please try again later';
      break;
    default:
      message = data?.message || defaultMessage;
  }

  const apiError = new Error(message);
  apiError.status = status;
  apiError.originalError = error;
  apiError.validationErrors = status === 422 ? data?.errors : null;
  
  return apiError;
};

/**
 * Special handler for authentication errors
 * @param {Error} error - Authentication error
 * @returns {Error} Processed error
 */
export const handleAuthError = (error) => {
  if (!error.response) {
    return new Error('Failed to connect to server');
  }

  const { status, data } = error.response;
  
  switch (status) {
    case 401:
      return new Error('Invalid email or password');
    case 422:
      if (data?.errors) {
        const validationErrors = Object.values(data.errors).flat();
        return new Error(validationErrors.join(', '));
      }
      return new Error(data?.message || 'Invalid credentials');
    case 429:
      return new Error('Too many login attempts. Please try again later');
    default:
      return handleApiError(error, 'Authentication failed');
  }
};

/**
 * Create a loading state manager
 * @returns {Object} Loading state utilities
 */
export const createLoadingManager = () => {
  const loadingStates = new Map();

  return {
    setLoading: (key, isLoading) => {
      loadingStates.set(key, isLoading);
    },
    isLoading: (key) => {
      return loadingStates.get(key) || false;
    },
    clearAll: () => {
      loadingStates.clear();
    }
  };
};

/**
 * Retry function for failed API calls
 * @param {Function} apiCall - The API function to retry
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} delay - Delay between retries in ms
 * @returns {Promise} API call result
 */
export const retryApiCall = async (apiCall, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;
      
      // Don't retry on certain status codes
      if (error.response?.status === 401 || error.response?.status === 403 || error.response?.status === 404) {
        throw error;
      }
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
      }
    }
  }
  
  throw lastError;
};
