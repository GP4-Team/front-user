// src/services/auth.js
import { setToken, removeToken, getToken } from '../utils/tokenHelpers';
import api from './api';

/**
 * Register a new user with the API
 * 
 * @param {Object} registerData - User registration data including name, email, password, etc.
 * @returns {Promise} - Response from the API
 */
export const registerUser = async (registerData) => {
  try {
    // Create the exact body structure required by the API
    const requestData = {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password
    };
    
    // Only include type if provided and valid
    if (registerData.type && ['moderator', 'instructor', 'student'].includes(registerData.type)) {
      requestData.type = registerData.type;
    }
    
    // Only include phone if provided and not empty
    if (registerData.phone && registerData.phone.trim() !== '') {
      requestData.phone = registerData.phone;
    }
    
    console.log('Attempting registration with:', requestData);
    
    // Call the API to register user
    const response = await api.post('/register', requestData);
    
    console.log('Registration response:', response);
    
    // Check for different response structures and handle them
    let userData, token;
    
    if (response.data && response.data.data) {
      // Standard response structure
      userData = response.data.data.user;
      token = response.data.data.token;
    } else if (response.data && response.data.token) {
      // Alternative response structure
      userData = response.data.user;
      token = response.data.token;
    } else if (response.data && response.data.access_token) {
      // OAuth-style response
      userData = response.data.user;
      token = response.data.access_token;
    }
    
    // Store token and user data if available
    if (token) {
      setToken(token);
      
      if (userData) {
        localStorage.setItem('userData', JSON.stringify(userData));
      }
    }
    
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      // Log full error details for debugging
      console.error('Registration API Error:', {
        status,
        data,
        headers: error.response.headers
      });
      
      // Return validation errors if available
      if (status === 422 && data && data.errors) {
        return Promise.reject({
          success: false,
          message: data.message || 'Invalid registration data',
          errors: data.errors
        });
      }
      
      // Handle server errors (500)
      if (status === 500) {
        return Promise.reject({
          success: false,
          message: data.message || 'Server configuration error. Please contact support.',
          statusCode: status
        });
      }
      
      // Handle other error responses
      return Promise.reject({
        success: false,
        message: data.message || 'Registration failed. Please try again.',
        statusCode: status
      });
    }
    
    // Handle network errors
    return Promise.reject({
      success: false,
      message: 'Failed to connect to the server. Please check your internet connection and try again.',
      error: error.message
    });
  }
};

/**
 * Login user with API
 * 
 * @param {string} login - Email or username
 * @param {string} password - User password
 * @param {boolean} remember - Whether to remember login
 * @returns {Promise} - Response from the API
 */
export const loginUser = async (login, password, remember = false) => {
  try {
    // Create the exact body structure required by the API
    const requestBody = {
      login: login,
      password: password,
      remember: remember
    };
    
    // Call the real API endpoint
    const response = await api.post('/login', requestBody);
    
    console.log('Login response:', response);
    
    // Check for the expected structure and fallback if needed
    let userData, token;
    
    if (response.data && response.data.data) {
      // Standard response structure
      userData = response.data.data.user;
      token = response.data.data.token;
    } else if (response.data && response.data.token) {
      // Alternative response structure
      userData = response.data.user;
      token = response.data.token;
    } else if (response.data && response.data.access_token) {
      // OAuth-style response
      userData = response.data.user;
      token = response.data.access_token;
    }
    
    // Store token and user data if available
    if (token) {
      setToken(token);
      
      if (userData) {
        localStorage.setItem('userData', JSON.stringify(userData));
      }
    }
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    
    if (error.response && error.response.data) {
      // Return error data from the server
      return Promise.reject({
        success: false,
        message: error.response.data.message || 'Login failed. Please check your credentials.',
        errors: error.response.data.errors || {}
      });
    }
    
    // Default error message
    return Promise.reject({
      success: false,
      message: 'Failed to connect to the server. Please try again later.'
    });
  }
};

/**
 * Log out current user
 * 
 * @returns {Promise} - Response from the API
 */
export const logoutUser = async () => {
  try {
    // Call the logout API endpoint
    try {
      await api.post('/logout');
    } catch (error) {
      console.warn('Logout API call failed, continuing with local logout:', error);
    }
    
    // Always remove token and user data from local storage
    removeToken();
    localStorage.removeItem('userData');
    
    return { success: true, message: 'Logged out successfully' };
  } catch (error) {
    // Even if there's an error, ensure token and user data are removed
    removeToken();
    localStorage.removeItem('userData');
    
    throw error;
  }
};

/**
 * Get the currently authenticated user
 * 
 * @returns {Promise} - User data
 */
export const getCurrentUser = async () => {
  try {
    // Try to get the current user data from the API
    const response = await api.get('/me');
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired, clear it
      removeToken();
      localStorage.removeItem('userData');
    }
    throw error;
  }
};

/**
 * Request password reset for an email
 * 
 * @param {string} email - User email
 * @returns {Promise} - Response from the API
 */
export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/forgot-password', { email });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw new Error('Failed to process your request. Please try again later.');
  }
};

/**
 * Reset password using token
 * 
 * @param {string} token - Reset token
 * @param {string} password - New password
 * @returns {Promise} - Response from the API
 */
export const resetPassword = async (token, password) => {
  try {
    const response = await api.post('/reset-password', { token, password });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw new Error('Failed to reset password. The link may have expired.');
  }
};