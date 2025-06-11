// src/services/courseRegistrationService.js
import api from './api';

class CourseRegistrationService {
  /**
   * Get available courses for student registration
   * @returns {Promise} Response with available courses
   */
  async getAvailableCourses() {
    try {
      console.log('📚 Fetching available courses for registration...');
      
      // Add required parameters to avoid 422 validation error
      const params = {
        semester_id: 5, // Default current semester
        page: 1,
        per_page: 50
      };
      
      const response = await api.get('/student/available-courses', { params });
      
      console.log('✅ Available courses API response:', response.data);
      
      return {
        success: true,
        data: response.data.courses || response.data.data || response.data,
        pagination: response.data.pagination || null,
        total: response.data.total || 0
      };
    } catch (error) {
      console.error('❌ Error fetching available courses:', error);
      
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch available courses',
        status: error.response?.status
      };
    }
  }

  /**
   * Register student for selected courses
   * @param {Array} courseIds - Array of course IDs to register
   * @param {number} semesterId - Semester ID for registration
   * @returns {Promise} Response with registration results
   */
  async registerCourses(courseIds, semesterId = 5) {
    try {
      console.log('📝 Registering courses:', { course_ids: courseIds, semester_id: semesterId });
      
      const requestData = {
        course_ids: courseIds,
        semester_id: semesterId
      };
      
      const response = await api.post('/student/register-courses', requestData);
      
      console.log('✅ Course registration API response:', response.data);
      
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'Courses registered successfully',
        enrollments: response.data.data?.enrollments || response.data.enrollments || []
      };
    } catch (error) {
      console.error('❌ Error registering courses:', error);
      
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to register courses',
        status: error.response?.status,
        details: error.response?.data
      };
    }
  }

  /**
   * Get student's registered courses
   * @returns {Promise} Response with registered courses
   */
  async getRegisteredCourses() {
    try {
      console.log('📖 Fetching registered courses...');
      
      const response = await api.get('/student/registered-courses');
      
      console.log('✅ Registered courses API response:', response.data);
      
      return {
        success: true,
        data: response.data.courses || response.data.data || response.data,
        total: response.data.total || 0
      };
    } catch (error) {
      console.error('❌ Error fetching registered courses:', error);
      
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch registered courses',
        status: error.response?.status
      };
    }
  }

  /**
   * Unregister from a course
   * @param {number} courseId - Course ID to unregister from
   * @returns {Promise} Response with unregistration result
   */
  async unregisterCourse(courseId) {
    try {
      console.log('🗑️ Unregistering from course:', courseId);
      
      const response = await api.delete(`/student/unregister-course/${courseId}`);
      
      console.log('✅ Course unregistration API response:', response.data);
      
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'Course unregistered successfully'
      };
    } catch (error) {
      console.error('❌ Error unregistering course:', error);
      
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to unregister course',
        status: error.response?.status
      };
    }
  }

  /**
   * Get available semesters for registration
   * @returns {Promise} Response with available semesters
   */
  async getAvailableSemesters() {
    try {
      console.log('📅 Fetching available semesters...');
      
      const response = await api.get('/student/available-semesters');
      
      console.log('✅ Available semesters API response:', response.data);
      
      return {
        success: true,
        data: response.data.semesters || response.data.data || response.data,
        current: response.data.current_semester || null
      };
    } catch (error) {
      console.error('❌ Error fetching available semesters:', error);
      
      // Return default semester if API fails
      return {
        success: true,
        data: [
          { id: 5, name: 'Current Semester', is_current: true }
        ],
        current: { id: 5, name: 'Current Semester' }
      };
    }
  }
}

export default new CourseRegistrationService();