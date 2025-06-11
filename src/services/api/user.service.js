// src/services/api/user.service.js
import api from '../api';
import { handleApiError } from '../utils/errorHandler';

/**
 * User Service - Handle all user profile operations
 */
class UserService {
  /**
   * Get current user profile
   * @returns {Promise<Object>} User profile data
   */
  async getProfile() {
    try {
      const response = await api.get('/me');
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch user profile');
    }
  }

  /**
   * Get student profile with complete academic information
   * This method calls the specific student profile endpoint: GET /api/student/profile
   * @returns {Promise<Object>} Student profile data with courses, exams, and academic info
   */
  async getStudentProfile() {
    try {
      // Make request to the student profile endpoint
      const response = await api.get('/student/profile', {
        headers: {
          'Accept-Language': 'ar', // Ensure Arabic language preference
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      // Return the response data
      return response.data;
    } catch (error) {
      // Enhanced error handling for student profile
      const errorMessage = error.response?.data?.message || 'Failed to fetch student profile';
      console.error('Student Profile API Error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers
      });
      
      throw handleApiError(error, errorMessage);
    }
  }

  /**
   * Get student registered courses
   * This method calls the registered courses endpoint: GET /api/student/registered-courses
   * @returns {Promise<Object>} Registered courses data with semester and course details
   */
  async getStudentRegisteredCourses() {
    try {
      console.log('📚 Fetching student registered courses...');
      
      // Make request to the student registered courses endpoint
      const response = await api.get('/student/registered-courses', {
        headers: {
          'Accept-Language': 'ar', // Ensure Arabic language preference
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      console.log('✅ Student registered courses received:', response.data);
      
      // Return the response data
      return response.data;
    } catch (error) {
      // Enhanced error handling for registered courses
      const errorMessage = error.response?.data?.message || 'Failed to fetch student registered courses';
      console.error('Student Registered Courses API Error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers
      });
      
      throw handleApiError(error, errorMessage);
    }
  }

  /**
   * Update user profile
   * @param {Object} profileData - Updated profile data
   * @returns {Promise<Object>} Updated profile
   */
  async updateProfile(profileData) {
    try {
      const response = await api.put('/profile', profileData);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to update profile');
    }
  }

  /**
   * Update user avatar/profile picture
   * @param {File} imageFile - Image file to upload
   * @returns {Promise<Object>} Upload result
   */
  async updateAvatar(imageFile) {
    try {
      const formData = new FormData();
      formData.append('avatar', imageFile);
      
      const response = await api.post('/profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to update avatar');
    }
  }

  /**
   * Change user password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @param {string} confirmPassword - Password confirmation
   * @returns {Promise<Object>} Change result
   */
  async changePassword(currentPassword, newPassword, confirmPassword) {
    try {
      const response = await api.post('/profile/change-password', {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to change password');
    }
  }

  /**
   * Update user preferences
   * @param {Object} preferences - User preferences
   * @returns {Promise<Object>} Update result
   */
  async updatePreferences(preferences) {
    try {
      const response = await api.put('/profile/preferences', preferences);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to update preferences');
    }
  }

  /**
   * Get user dashboard statistics
   * @returns {Promise<Object>} Dashboard stats
   */
  async getDashboardStats() {
    try {
      const response = await api.get('/profile/dashboard-stats');
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch dashboard statistics');
    }
  }

  /**
   * Get user enrolled courses
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>} Enrolled courses
   */
  async getEnrolledCourses(params = {}) {
    try {
      const response = await api.get('/profile/enrolled-courses', { params });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch enrolled courses');
    }
  }

  /**
   * Get user exam history
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>} Exam history
   */
  async getExamHistory(params = {}) {
    try {
      const response = await api.get('/profile/exam-history', { params });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch exam history');
    }
  }

  /**
   * Get user achievements
   * @returns {Promise<Array>} User achievements
   */
  async getAchievements() {
    try {
      const response = await api.get('/profile/achievements');
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch achievements');
    }
  }

  /**
   * Get user certificates
   * @returns {Promise<Array>} User certificates
   */
  async getCertificates() {
    try {
      const response = await api.get('/profile/certificates');
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch certificates');
    }
  }

  /**
   * Download certificate
   * @param {number|string} certificateId - Certificate ID
   * @returns {Promise<Blob>} Certificate file
   */
  async downloadCertificate(certificateId) {
    try {
      const response = await api.get(`/profile/certificates/${certificateId}/download`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to download certificate');
    }
  }

  /**
   * Get user notifications
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>} User notifications
   */
  async getNotifications(params = {}) {
    try {
      const response = await api.get('/profile/notifications', { params });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch notifications');
    }
  }

  /**
   * Mark notification as read
   * @param {number|string} notificationId - Notification ID
   * @returns {Promise<Object>} Update result
   */
  async markNotificationAsRead(notificationId) {
    try {
      const response = await api.put(`/profile/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to mark notification as read');
    }
  }

  /**
   * Mark all notifications as read
   * @returns {Promise<Object>} Update result
   */
  async markAllNotificationsAsRead() {
    try {
      const response = await api.put('/profile/notifications/mark-all-read');
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to mark all notifications as read');
    }
  }

  /**
   * Delete notification
   * @param {number|string} notificationId - Notification ID
   * @returns {Promise<Object>} Delete result
   */
  async deleteNotification(notificationId) {
    try {
      const response = await api.delete(`/profile/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to delete notification');
    }
  }

  /**
   * Get user activity log
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>} Activity log
   */
  async getActivityLog(params = {}) {
    try {
      const response = await api.get('/profile/activity-log', { params });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch activity log');
    }
  }

  /**
   * Update notification preferences
   * @param {Object} preferences - Notification preferences
   * @returns {Promise<Object>} Update result
   */
  async updateNotificationPreferences(preferences) {
    try {
      const response = await api.put('/profile/notification-preferences', preferences);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to update notification preferences');
    }
  }

  /**
   * Deactivate user account
   * @param {string} reason - Deactivation reason
   * @returns {Promise<Object>} Deactivation result
   */
  async deactivateAccount(reason) {
    try {
      const response = await api.post('/profile/deactivate', { reason });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to deactivate account');
    }
  }

  /**
   * Export user data
   * @returns {Promise<Blob>} Exported data file
   */
  async exportUserData() {
    try {
      const response = await api.get('/profile/export-data', {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to export user data');
    }
  }
}

// Export single instance of the service
export default new UserService();
