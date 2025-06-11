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
      
      const response = await api.get('/student/available-courses');
      
      console.log('✅ Available courses API response:', response.data);
      
      // Handle different response structures
      let courses = [];
      if (response.data.courses) {
        courses = response.data.courses;
      } else if (response.data.data) {
        courses = response.data.data;
      } else if (Array.isArray(response.data)) {
        courses = response.data;
      }
      
      return {
        success: true,
        data: courses,
        semester: response.data.semester || null,
        total: courses.length || 0
      };
    } catch (error) {
      console.error('❌ Error fetching available courses:', error);
      
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'فشل في تحميل المواد المتاحة',
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
      
      // Validate input
      if (!Array.isArray(courseIds) || courseIds.length === 0) {
        throw new Error('يجب اختيار مادة واحدة على الأقل');
      }
      
      const requestData = {
        course_ids: courseIds,
        semester_id: semesterId
      };
      
      const response = await api.post('/student/register-courses', requestData);
      
      console.log('✅ Course registration API response:', response.data);
      
      // Handle different success response structures
      const message = response.data.message || 
                     response.data.msg || 
                     `تم تسجيل ${courseIds.length} مادة بنجاح`;
      
      return {
        success: true,
        data: response.data,
        message: message,
        enrollments: response.data.data?.enrollments || 
                    response.data.enrollments || 
                    response.data.data || 
                    [],
        registered_count: courseIds.length
      };
    } catch (error) {
      console.error('❌ Error registering courses:', error);
      
      // Add detailed error logging
      console.log('🔍 === DETAILED ERROR ANALYSIS ===');
      console.log('Error status:', error.response?.status);
      console.log('Error response data (JSON):', JSON.stringify(error.response?.data, null, 2));
      console.log('Error response headers:', error.response?.headers);
      console.log('Request that failed:', {
        url: error.config?.url,
        method: error.config?.method,
        data: JSON.parse(error.config?.data || '{}')
      });
      console.log('================================');
      
      // Handle different error response structures
      let errorMessage = 'فشل في تسجيل المواد';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
        console.log('📝 Backend message:', error.response.data.message);
      } else if (error.response?.data?.errors) {
        // Handle validation errors
        const errors = error.response.data.errors;
        console.log('⚠️ Validation errors object:', errors);
        
        if (typeof errors === 'object') {
          // Log each validation error
          Object.keys(errors).forEach(field => {
            console.log(`❌ Field "${field}":`, errors[field]);
          });
          errorMessage = Object.values(errors).flat().join(', ');
        } else {
          errorMessage = errors;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return {
        success: false,
        error: errorMessage,
        status: error.response?.status,
        details: error.response?.data,
        validation_errors: error.response?.data?.errors || null,
        full_error_response: error.response  // For complete debugging
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
          { id: 5, name: 'الفصل الدراسي الحالي', is_current: true }
        ],
        current: { id: 5, name: 'الفصل الدراسي الحالي' }
      };
    }
  }
}

export default new CourseRegistrationService();