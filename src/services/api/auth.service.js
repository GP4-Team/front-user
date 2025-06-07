// src/services/api/auth.service.js
import api from '../api';
import { handleAuthError } from '../utils/errorHandler';
import { setToken, removeToken, getToken, isTokenExpired } from '../../utils/tokenHelpers';

/**
 * Authentication Service - Handle all authentication operations
 */
class AuthService {
  /**
   * User login
   * @param {string} login - Email or username
   * @param {string} password - User password
   * @param {boolean} remember - Remember login
   * @returns {Promise<Object>} Login response
   */
  async login(login, password, remember = false) {
    try {
      const response = await api.post('/login', {
        login,
        password,
        remember
      });

      // Extract user data and token from response
      const { data } = response;
      let userData, token;

      if (data && data.data) {
        // Standard response structure
        userData = data.data.user;
        token = data.data.token;
      } else if (data && data.token) {
        // Alternative response structure
        userData = data.user;
        token = data.token;
      } else if (data && data.access_token) {
        // OAuth-style response
        userData = data.user;
        token = data.access_token;
      }

      // Store token and user data if available
      if (token) {
        setToken(token);
        
        if (userData) {
          localStorage.setItem('userData', JSON.stringify(userData));
        }
      }

      return data;
    } catch (error) {
      throw handleAuthError(error);
    }
  }

  /**
   * User registration
   * @param {Object} userData - Registration data
   * @returns {Promise<Object>} Registration response
   */
  async register(userData) {
    try {
      const requestData = {
        name: userData.name,
        email: userData.email,
        password: userData.password
      };

      // Add optional fields if provided
      if (userData.phone && userData.phone.trim() !== '') {
        requestData.phone = userData.phone;
      }

      if (userData.type && ['moderator', 'instructor', 'student'].includes(userData.type)) {
        requestData.type = userData.type;
      }

      const response = await api.post('/register', requestData);

      // Extract user data and token from response
      const { data } = response;
      let userData_response, token;

      if (data && data.data) {
        userData_response = data.data.user;
        token = data.data.token;
      } else if (data && data.token) {
        userData_response = data.user;
        token = data.token;
      } else if (data && data.access_token) {
        userData_response = data.user;
        token = data.access_token;
      }

      // Store token and user data if available
      if (token) {
        setToken(token);
        
        if (userData_response) {
          localStorage.setItem('userData', JSON.stringify(userData_response));
        }
      }

      return data;
    } catch (error) {
      throw handleAuthError(error);
    }
  }

  /**
   * User logout
   * @returns {Promise<Object>} Logout response
   */
  async logout() {
    try {
      // Call logout endpoint
      await api.post('/logout');
      
      // Always clear local storage
      removeToken();
      localStorage.removeItem('userData');
      
      return { success: true, message: 'Logged out successfully' };
    } catch (error) {
      // Even if API call fails, clear local storage
      removeToken();
      localStorage.removeItem('userData');
      
      // Don't throw error for logout, just log it
      console.warn('Logout API call failed:', error);
      return { success: true, message: 'Logged out locally' };
    }
  }

  /**
   * Get current user data
   * @returns {Promise<Object>} Current user data
   */
  async getCurrentUser() {
    try {
      const response = await api.get('/me');
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Token is invalid or expired, clear it
        removeToken();
        localStorage.removeItem('userData');
      }
      throw handleAuthError(error);
    }
  }

  /**
   * Verify email
   * @param {Object} verificationData - Email verification data
   * @returns {Promise<Object>} Verification response
   */
  async verifyEmail(verificationData = {}) {
    try {
      const response = await api.post('/email/verify', verificationData);
      return response.data;
    } catch (error) {
      throw handleAuthError(error);
    }
  }

  /**
   * Resend email verification
   * @returns {Promise<Object>} Resend response
   */
  async resendEmailVerification() {
    try {
      const response = await api.post('/email/resend');
      return response.data;
    } catch (error) {
      throw handleAuthError(error);
    }
  }

  /**
   * Verify phone number
   * @param {Object} verificationData - Phone verification data
   * @returns {Promise<Object>} Verification response
   */
  async verifyPhone(verificationData = {}) {
    try {
      const response = await api.post('/phone/verify', verificationData);
      return response.data;
    } catch (error) {
      throw handleAuthError(error);
    }
  }

  /**
   * Resend phone verification
   * @returns {Promise<Object>} Resend response
   */
  async resendPhoneVerification() {
    try {
      const response = await api.post('/phone/resend');
      return response.data;
    } catch (error) {
      throw handleAuthError(error);
    }
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated() {
    const token = getToken();
    return !!token && !isTokenExpired(token);
  }

  /**
   * Get stored user data
   * @returns {Object|null} User data or null
   */
  getStoredUser() {
    try {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      return null;
    }
  }

  /**
   * Update stored user data
   * @param {Object} userData - Updated user data
   */
  updateStoredUser(userData) {
    try {
      localStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  }

  /**
   * Clear all authentication data
   */
  clearAuthData() {
    removeToken();
    localStorage.removeItem('userData');
  }
}

// Export single instance of the service
export default new AuthService();
