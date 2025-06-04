// src/services/api/courses.service.js
import api from '../api';
import { handleApiError } from '../utils/errorHandler';

/**
 * Courses Service - Handle all course operations
 */
class CoursesService {
  /**
   * Get all courses with filtering options
   * @param {Object} params - Filter parameters (category, level, search, page, limit)
   * @returns {Promise<Object>} List of courses with metadata
   */
  async getAllCourses(params = {}) {
    try {
      const response = await api.get('/courses', { params });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch courses');
    }
  }

  /**
   * Get featured courses
   * @param {number} limit - Number of courses requested
   * @returns {Promise<Array>} List of featured courses
   */
  async getFeaturedCourses(limit = 6) {
    try {
      const response = await api.get('/courses/featured', { 
        params: { limit } 
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch featured courses');
    }
  }

  /**
   * Get all courses (alternative endpoint)
   * @returns {Promise<Array>} All available courses
   */
  async getAllCoursesComplete() {
    try {
      const response = await api.get('/courses/all');
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch all courses');
    }
  }

  /**
   * Get specific course details
   * @param {number|string} courseId - Course ID
   * @returns {Promise<Object>} Course details
   */
  async getCourseById(courseId) {
    try {
      const response = await api.get(`/courses/${courseId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch course details');
    }
  }

  /**
   * Get course content (materials)
   * @param {number|string} courseId - Course ID
   * @returns {Promise<Array>} List of course materials
   */
  async getCourseContent(courseId) {
    try {
      const response = await api.get(`/materials/course/${courseId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch course content');
    }
  }

  /**
   * Get specific material details
   * @param {number|string} materialId - Material ID
   * @returns {Promise<Object>} Material details
   */
  async getMaterialById(materialId) {
    try {
      const response = await api.get(`/materials/${materialId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch material details');
    }
  }

  /**
   * Search courses
   * @param {string} query - Search query
   * @param {Object} filters - Additional filters
   * @returns {Promise<Array>} Search results
   */
  async searchCourses(query = '', filters = {}) {
    try {
      const endpoint = query ? `/courses/search/${encodeURIComponent(query)}` : '/courses/search';
      const response = await api.get(endpoint, { params: filters });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to search courses');
    }
  }

  /**
   * Filter courses
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Array>} Filtered courses
   */
  async filterCourses(filters = {}) {
    try {
      const response = await api.get('/courses/filter', { params: filters });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to filter courses');
    }
  }

  /**
   * Get courses by education level
   * @param {number|string} levelId - Education level ID
   * @param {Object} params - Additional parameters
   * @returns {Promise<Array>} List of courses
   */
  async getCoursesByLevel(levelId, params = {}) {
    try {
      const response = await api.get(`/courses/by-level/${levelId}`, { params });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch courses by level');
    }
  }

  /**
   * Get course categories
   * @returns {Promise<Array>} List of categories
   */
  async getCategories() {
    try {
      const response = await api.get('/courses/education-categories');
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch course categories');
    }
  }

  /**
   * Get education levels
   * @returns {Promise<Array>} List of education levels
   */
  async getEducationLevels() {
    try {
      const response = await api.get('/courses/education-levels');
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch education levels');
    }
  }

  /**
   * Get enrolled courses for current user
   * @returns {Promise<Array>} List of enrolled courses
   */
  async getEnrolledCourses() {
    try {
      const response = await api.get('/courses/enrolled');
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch enrolled courses');
    }
  }

  /**
   * Enroll in a course
   * @param {number|string} courseId - Course ID
   * @returns {Promise<Object>} Enrollment result
   */
  async enrollCourse(courseId) {
    try {
      const response = await api.post(`/courses/${courseId}/enroll`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to enroll in course');
    }
  }

  /**
   * Unenroll from a course
   * @param {number|string} courseId - Course ID
   * @returns {Promise<Object>} Unenrollment result
   */
  async unenrollCourse(courseId) {
    try {
      const response = await api.delete(`/courses/${courseId}/enroll`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to unenroll from course');
    }
  }

  /**
   * Rate a course
   * @param {number|string} courseId - Course ID
   * @param {number} rating - Rating (1-5)
   * @param {string} review - Text review
   * @returns {Promise<Object>} Rating result
   */
  async rateCourse(courseId, rating, review = '') {
    try {
      const response = await api.post(`/courses/${courseId}/rate`, {
        rating,
        review
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to rate course');
    }
  }

  /**
   * Get course reviews
   * @param {number|string} courseId - Course ID
   * @param {Object} params - Page parameters
   * @returns {Promise<Object>} List of reviews
   */
  async getCourseReviews(courseId, params = {}) {
    try {
      const response = await api.get(`/courses/${courseId}/reviews`, { params });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch course reviews');
    }
  }

  /**
   * Track user progress in course
   * @param {number|string} courseId - Course ID
   * @returns {Promise<Object>} User progress
   */
  async getCourseProgress(courseId) {
    try {
      const response = await api.get(`/courses/${courseId}/progress`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch course progress');
    }
  }

  /**
   * Update user progress in material
   * @param {number|string} materialId - Material ID
   * @param {Object} progressData - Progress data
   * @returns {Promise<Object>} Update result
   */
  async updateProgress(materialId, progressData) {
    try {
      const response = await api.post(`/materials/${materialId}/progress`, progressData);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to update progress');
    }
  }
}

// Export single instance of the service
export default new CoursesService();
