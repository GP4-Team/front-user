// src/services/api/availableExams.service.js
import api from '../api';
import { handleApiError } from '../utils/errorHandler';

/**
 * Available Exams Service - Handle available exams API operations
 * This service specifically handles the /examination/available-exams endpoint
 */
class AvailableExamsService {
  /**
   * Get all available exams from the available-exams endpoint
   * @param {Object} params - Query parameters (optional)
   * @returns {Promise<Object>} Available exams response
   */
  async getAvailableExams(params = {}) {
    try {
      console.log('🎯 [AvailableExamsService] === FETCHING AVAILABLE EXAMS ===');
      console.log('Parameters:', params);
      console.log('API Base URL:', api.defaults.baseURL);
      
      // Check if user is authenticated
      const authToken = localStorage.getItem('authToken');
      console.log('Auth token exists:', authToken ? 'YES' : 'NO');
      
      if (!authToken) {
        console.warn('⚠️ [AvailableExamsService] No auth token found, returning empty response');
        return {
          success: true,
          data: [],
          pagination: {
            total: 0,
            per_page: 10,
            current_page: 1,
            last_page: 1,
            from: 0,
            to: 0
          },
          filters_applied: [],
          registered_courses_count: 0
        };
      }
      
      // Make request to available-exams endpoint
      const endpoint = '/examination/available-exams';
      console.log('🚀 [AvailableExamsService] Making request to:', endpoint);
      
      const response = await api.get(endpoint, { params });
      
      console.log('✅ [AvailableExamsService] SUCCESS');
      console.log('Response status:', response.status);
      console.log('📦 [AvailableExamsService] Raw response data:', response.data);
      
      return response.data;
      
    } catch (error) {
      console.error('❌ [AvailableExamsService] === REQUEST FAILED ===');
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        console.error('🚫 [AvailableExamsService] Unauthorized - clearing auth tokens');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
      
      // Return empty response structure to prevent app crash
      return {
        success: false,
        data: [],
        pagination: {
          total: 0,
          per_page: 10,
          current_page: 1,
          last_page: 1,
          from: 0,
          to: 0
        },
        filters_applied: [],
        registered_courses_count: 0,
        error: error.message || 'فشل في جلب الامتحانات المتاحة'
      };
    }
  }

  /**
   * Transform available exams data to match the expected format
   * @param {Array} availableExamsData - Raw exams data from API
   * @returns {Array} Transformed exams data
   */
  transformAvailableExams(availableExamsData) {
    if (!Array.isArray(availableExamsData)) {
      console.warn('⚠️ [AvailableExamsService] Invalid data format, expected array');
      return [];
    }

    return availableExamsData.map(exam => ({
      // Core exam properties
      id: exam.id,
      name: exam.name,
      title: exam.name, // Alias for compatibility
      description: exam.description,
      
      // Course information
      courseName: exam.course?.name,
      subject: exam.course?.name,
      
      // Exam details
      duration: exam.duration_formatted,
      numberOfQuestions: exam.question_number,
      questionNumber: exam.question_number, // Alias for compatibility
      
      // Categories and levels
      examCategory: exam.exam_category?.name,
      educationLevel: exam.education_level?.name,
      
      // Exam settings
      allowedChances: exam.allowed_chances,
      minPercentage: exam.min_percentage,
      
      // Timing
      startAt: exam.start_at,
      endAt: exam.end_at,
      timeRemaining: exam.time_remaining,
      
      // Status (default for available exams)
      status: 'start',
      canTakeExam: true,
      availabilityStatus: 'available',
      actionButton: 'ابدأ الامتحان',
      
      // Keep original data for reference
      originalData: exam
    }));
  }
}

// Export single instance of the service
export default new AvailableExamsService();
