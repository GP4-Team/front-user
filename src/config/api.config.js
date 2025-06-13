/**
 * API Configuration Center
 * Uses Environment Variables in a simple way
 */

// Get Base URL directly from .env
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://academy1.gp-app.tafra-tech.com/api';

// API Configuration
export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: 30000, // 30 seconds
};

// Function to get base URL directly
export const getBaseApiUrl = () => API_CONFIG.BASE_URL;

// Function to display current API information (for debugging)
export const logApiConfig = () => {
  console.group('🔧 API Configuration');
  console.log('Base URL:', API_CONFIG.BASE_URL);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Source:', process.env.REACT_APP_API_BASE_URL ? '.env file' : 'fallback');
  console.groupEnd();
};

// Log configuration on load (development only)
if (process.env.NODE_ENV === 'development') {
  logApiConfig();
}

export default API_CONFIG;