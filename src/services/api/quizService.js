// Quiz Generation API - Fixed to match real endpoints
import apiClient from './apiClient';

/**
 * Quiz Service - Updated for real AI Portal APIs
 */
export const quizService = {
  
  /**
   * Generate a new quiz using AI recommendations - REAL API
   * @param {Object} quizData - Quiz parameters from form
   * @returns {Promise<Object>} Generated quiz result
   */
  async generateQuiz(quizData) {
    try {
      // Prepare data according to real API schema
      const requestData = {
        course_id: parseInt(quizData.course_id), // Required
        num_questions: parseInt(quizData.num_questions) || 5,
        time_limit_minutes: parseInt(quizData.time_limit_minutes) || 20,
        allow_stretch: quizData.allow_stretch !== false // Default true
      };

      const response = await apiClient.post('/student/ai/quiz/generate', requestData);
      
      return {
        success: response.data.success || true,
        data: response.data.data || response.data,
        message: 'Quiz generated successfully',
        meta: response.data.meta
      };
    } catch (error) {
      console.error('Error generating quiz:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to generate quiz',
        errors: error.response?.data?.errors || null,
        validationErrors: error.response?.data?.errors || null
      };
    }
  },

  /**
   * Create a custom exam - Legacy function (keeping for compatibility)
   * Maps to the new generate quiz API
   * @param {Object} examData - Exam parameters from form
   * @returns {Promise<Object>} Created exam result
   */
  async createExam(examData) {
    try {
      // Map old exam format to new quiz format
      const quizData = {
        course_id: examData.course_id || 1, // Default course if not provided
        num_questions: examData.num_questions || 5,
        time_limit_minutes: examData.time_limit_minutes || 20,
        allow_stretch: examData.allow_stretch !== false
      };

      // Use the generate quiz API
      return await this.generateQuiz(quizData);
    } catch (error) {
      console.error('Error creating exam:', error);
      return {
        success: false,
        error: error.message || 'Failed to create exam'
      };
    }
  },

  /**
   * Helper function to get available courses for quiz generation
   * Note: This would need a separate API call to get courses
   * @returns {Promise<Object>} Available courses
   */
  async getAvailableCourses() {
    try {
      // This might need a different API endpoint to get courses
      // For now, return empty array
      return {
        success: true,
        data: [],
        message: 'No courses API available yet'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch courses'
      };
    }
  }
};

export default quizService;