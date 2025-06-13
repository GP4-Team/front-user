// src/services/api/exams.service.js
import api from '../api';
import { handleApiError } from '../utils/errorHandler';

/**
 * Online Exams Service - Handle all online exam operations
 * Updated to work with new examination endpoints with fallback mechanisms
 */
class ExamsService {
  /**
   * Get all available exams for the user
   * @param {Object} params - Query parameters (optional)
   * @param {number|string} examId - Specific exam ID (optional) for single exam fetch
   * @returns {Promise<Array>} Available exams with status
   */
  async getOnlineExams(params = {}, examId = null) {
    try {
      console.log('🎯 [ExamsService] === FETCHING AVAILABLE EXAMS ===');
      console.log('Parameters:', params);
      console.log('API Base URL:', api.defaults.baseURL);
      
      // Check if user is authenticated
      const authToken = localStorage.getItem('authToken');
      console.log('Auth token exists:', authToken ? 'YES' : 'NO');
      console.log('Auth token preview:', authToken ? authToken.substring(0, 20) + '...' : 'none');
      
      if (!authToken) {
        console.warn('⚠️ [ExamsService] No auth token found, returning empty array');
        return { exams: [] };
      }
      
      // If examId is provided, fetch specific exam
      if (examId) {
        return await this.getOnlineExamById(examId);
      }
      
      // Use the new available-exams endpoint
      const endpoint = '/examination/available-exams';
      console.log('🚀 [ExamsService] Making request to:', endpoint);
      
      const response = await api.get(endpoint, { params });
      
      console.log('✅ [ExamsService] SUCCESS with available-exams endpoint');
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(Object.entries(response.headers || {})));
      console.log('📦 [ExamsService] Raw response data:', response.data);
      console.log('Response data type:', typeof response.data);
      console.log('Response data keys:', response.data ? Object.keys(response.data) : 'none');
      
      // Parse the response
      const parsedData = this.parseExamsResponse(response.data);
      console.log('🔄 [ExamsService] Parsed data:', parsedData);
      
      if (parsedData && (parsedData.exams || Array.isArray(parsedData))) {
        const finalExams = parsedData.exams || parsedData;
        console.log('🎉 [ExamsService] Final exams array:', finalExams);
        console.log('📊 [ExamsService] Number of exams:', finalExams.length);
        
        if (finalExams.length > 0) {
          console.log('🔍 [ExamsService] First exam sample:', finalExams[0]);
        }
        
        return { exams: finalExams, ...parsedData };
      }
      
      // Fallback to other endpoints if the main one fails
      const fallbackEndpoints = [
        { url: '/examination/online-exams', method: 'get', params },
        { url: '/exams/online', method: 'get', params },
        { url: '/exams/user', method: 'get', params },
        { url: '/exams', method: 'get', params: { ...params, type: 'online' } }
      ];
      
      for (const [index, endpoint] of fallbackEndpoints.entries()) {
        try {
          console.log(`🚀 [ExamsService] Trying fallback endpoint ${index + 1}/${fallbackEndpoints.length}: ${endpoint.method.toUpperCase()} ${endpoint.url}`);
          console.log('Request params:', endpoint.params);
          
          let response;
          if (endpoint.method === 'post') {
            response = await api.post(endpoint.url, endpoint.params);
          } else {
            response = await api.get(endpoint.url, { params: endpoint.params });
          }
          
          console.log(`✅ [ExamsService] SUCCESS with fallback endpoint ${index + 1}: ${endpoint.url}`);
          console.log('Response status:', response.status);
          console.log('Response headers:', Object.fromEntries(Object.entries(response.headers || {})));
          console.log('📦 [ExamsService] Raw response data:', response.data);
          console.log('Response data type:', typeof response.data);
          console.log('Response data keys:', response.data ? Object.keys(response.data) : 'none');
          
          // Parse the response
          const parsedData = this.parseExamsResponse(response.data);
          console.log('🔄 [ExamsService] Parsed data:', parsedData);
          
          if (parsedData && (parsedData.exams || Array.isArray(parsedData))) {
            const finalExams = parsedData.exams || parsedData;
            console.log('🎉 [ExamsService] Final exams array:', finalExams);
            console.log('📊 [ExamsService] Number of exams:', finalExams.length);
            
            if (finalExams.length > 0) {
              console.log('🔍 [ExamsService] First exam sample:', finalExams[0]);
            }
            
            return parsedData;
          }
          
        } catch (endpointError) {
          console.warn(`⚠️ [ExamsService] Failed ${endpoint.method.toUpperCase()} ${endpoint.url}:`, {
            status: endpointError.response?.status,
            statusText: endpointError.response?.statusText,
            data: endpointError.response?.data,
            message: endpointError.message
          });
          
          // If it's the last fallback endpoint, we'll handle the error below
          if (index === fallbackEndpoints.length - 1) {
            throw endpointError;
          }
          
          // Otherwise, continue to next endpoint
          continue;
        }
      }
      
      // If all fallback endpoints failed, return empty array instead of throwing error
      console.warn('⚠️ [ExamsService] All fallback endpoints failed, returning empty array');
      return { exams: [] };
      
    } catch (error) {
      console.error('❌ [ExamsService] === ALL REQUESTS FAILED ===');
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: error.config ? {
          url: error.config.url,
          method: error.config.method,
          baseURL: error.config.baseURL,
          headers: error.config.headers
        } : 'No config'
      });
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        console.error('🚫 [ExamsService] Unauthorized - clearing auth tokens');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        return { exams: [] };
      } else if (error.response?.status === 404) {
        console.warn('🔍 [ExamsService] Endpoint not found - returning empty array');
        return { exams: [] };
      }
      
      // For other errors, still return empty array to prevent app crash
      console.warn('⚠️ [ExamsService] Returning empty array due to errors');
      return { exams: [] };
    }
  }

  /**
   * Parse different response formats from various endpoints
   * @param {Object} responseData - Raw response data
   * @returns {Object} Standardized format
   */
  parseExamsResponse(responseData) {
    if (!responseData) {
      return { exams: [] };
    }

    console.log('🔄 [ExamsService] Parsing response data:', responseData);
    console.log('Response data type:', typeof responseData);
    console.log('Response data keys:', Object.keys(responseData));

    // Direct array
    if (Array.isArray(responseData)) {
      console.log('📦 [ExamsService] Direct array detected');
      return { exams: responseData };
    }

    // New available-exams format
    if (responseData.success === true && responseData.data && Array.isArray(responseData.data)) {
      console.log('📦 [ExamsService] Available-exams format detected');
      // Transform the data to match our expected format
      const transformedExams = responseData.data.map(exam => ({
        id: exam.id || exam.exam_id,
        name: exam.name || exam.title,
        title: exam.name || exam.title,
        description: exam.description,
        courseName: exam.course?.name || exam.subject,
        subject: exam.course?.name || exam.subject,
        duration: exam.duration_formatted || exam.duration,
        numberOfQuestions: exam.question_number || exam.questions_count,
        questionNumber: exam.question_number || exam.questions_count,
        examCategory: exam.exam_category?.name || exam.category,
        educationLevel: exam.education_level?.name || exam.level,
        allowedChances: exam.allowed_chances,
        status: 'start', // Default status for available exams
        canTakeExam: true,
        availabilityStatus: 'available',
        actionButton: exam.action_button || 'ابدأ الامتحان',
        minPercentage: exam.min_percentage,
        startAt: exam.start_at,
        endAt: exam.end_at,
        timeRemaining: exam.time_remaining,
        ...exam // Include all original properties
      }));
      
      return {
        exams: transformedExams,
        total: responseData.pagination?.total || transformedExams.length,
        pagination: responseData.pagination,
        filters_applied: responseData.filters_applied,
        registered_courses_count: responseData.registered_courses_count
      };
    }

    // Laravel success response with single exam
    if (responseData.success === true && responseData.data && !Array.isArray(responseData.data)) {
      console.log('📦 [ExamsService] Single exam response detected');
      return { exams: [responseData.data] };
    }

    // Laravel success response with nested structure
    if (responseData.success === true) {
      if (responseData.data && Array.isArray(responseData.data.exams)) {
        console.log('📦 [ExamsService] Nested exams array detected');
        return responseData.data;
      } else if (responseData.data && Array.isArray(responseData.data.data)) {
        console.log('📦 [ExamsService] Double nested data detected');
        return { exams: responseData.data.data };
      } else if (!responseData.data) {
        console.log('📦 [ExamsService] Success but no data');
        return { exams: [] };
      }
    }

    // Object with exams property
    if (responseData.exams && Array.isArray(responseData.exams)) {
      console.log('📦 [ExamsService] Direct exams property detected');
      return responseData;
    }

    // Object with data property
    if (responseData.data && Array.isArray(responseData.data)) {
      console.log('📦 [ExamsService] Data array detected');
      return { exams: responseData.data };
    }

    // Default fallback
    console.warn('🤔 [ExamsService] Unknown response format, returning empty array');
    console.log('Fallback - Response structure:', {
      keys: Object.keys(responseData),
      hasData: !!responseData.data,
      hasExams: !!responseData.exams,
      dataType: typeof responseData.data,
      isArray: Array.isArray(responseData)
    });
    return { exams: [] };
  }

  /**
   * Get specific online exam details by ID with status calculation
   * @param {number|string} examId - Online Exam ID
   * @returns {Promise<Object>} Online exam details with calculated status
   */
  async getOnlineExamById(examId) {
    try {
      console.log('🎯 [ExamsService] === FETCHING EXAM BY ID ===');
      console.log('Requested exam ID:', examId);
      console.log('Exam ID type:', typeof examId);
      
      // Validate exam ID
      if (!examId) {
        throw new Error('Exam ID is required');
      }
      
      // Convert to integer to match backend expectations
      const numericId = parseInt(examId, 10);
      if (isNaN(numericId)) {
        throw new Error(`Invalid exam ID: ${examId}. Must be a valid number.`);
      }
      
      const endpoint = `/examination/online-exams/${numericId}`;
      console.log('🚀 [ExamsService] Making request to:', endpoint);
      
      const response = await api.get(endpoint);
      
      console.log('✅ [ExamsService] Exam by ID response:');
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      
      // Check if we got the correct exam ID back
      if (response.data && response.data.data && response.data.data.id) {
        const returnedId = response.data.data.id;
        console.log('Requested ID:', numericId, '| Returned ID:', returnedId);
        if (numericId !== parseInt(returnedId)) {
          console.warn('⚠️ [ExamsService] ID MISMATCH! Requested:', numericId, 'but got:', returnedId);
        } else {
          console.log('✅ [ExamsService] ID match confirmed');
        }
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ [ExamsService] Failed to get exam details for ID:', examId);
      console.error('Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      throw handleApiError(error, 'Failed to fetch online exam details');
    }
  }

  /**
   * Get all exams for the user (legacy support)
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>} User exams
   */
  async getUserExams(params = {}) {
    try {
      const response = await api.get('/exams/user', { params });
      return response.data;
    } catch (error) {
      console.error('❌ [ExamsService] Failed to get user exams:', error);
      // Return empty array instead of throwing error
      return { exams: [] };
    }
  }

  /**
   * Get specific exam details by ID (legacy support)
   * @param {number|string} examId - Exam ID
   * @returns {Promise<Object>} Exam details
   */
  async getExamById(examId) {
    try {
      // Convert to integer to match backend expectations
      const numericId = parseInt(examId, 10);
      if (isNaN(numericId)) {
        throw new Error(`Invalid exam ID: ${examId}. Must be a valid number.`);
      }
      
      const response = await api.get(`/exams/${numericId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch exam details');
    }
  }

  /**
   * Start an exam and get questions
   * @param {number|string} examId - Exam ID
   * @returns {Promise<Object>} Exam start response with questions
   */
  async startExam(examId) {
    try {
      // Convert to integer to match backend expectations
      const numericId = parseInt(examId, 10);
      if (isNaN(numericId)) {
        throw new Error(`Invalid exam ID: ${examId}. Must be a valid number.`);
      }
      
      const response = await api.post(`/exams/${numericId}/start`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to start exam');
    }
  }

  /**
   * Submit an answer during the exam
   * @param {number|string} examId - Exam ID
   * @param {number|string} questionId - Question ID
   * @param {any} answer - Answer data
   * @returns {Promise<Object>} Submit response
   */
  async submitAnswer(examId, questionId, answer) {
    try {
      // Convert to integers to match backend expectations
      const numericExamId = parseInt(examId, 10);
      const numericQuestionId = parseInt(questionId, 10);
      
      if (isNaN(numericExamId)) {
        throw new Error(`Invalid exam ID: ${examId}. Must be a valid number.`);
      }
      if (isNaN(numericQuestionId)) {
        throw new Error(`Invalid question ID: ${questionId}. Must be a valid number.`);
      }
      
      const response = await api.post(`/exams/${numericExamId}/questions/${numericQuestionId}/answer`, { 
        answer 
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to submit answer');
    }
  }

  /**
   * Submit the entire exam
   * @param {number|string} examId - Exam ID
   * @param {Object} answers - All answers
   * @returns {Promise<Object>} Exam submission result
   */
  async submitExam(examId, answers) {
    try {
      // Convert to integer to match backend expectations
      const numericId = parseInt(examId, 10);
      if (isNaN(numericId)) {
        throw new Error(`Invalid exam ID: ${examId}. Must be a valid number.`);
      }
      
      const response = await api.post(`/exams/${numericId}/submit`, { answers });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to submit exam');
    }
  }

  /**
   * Get exam results
   * @param {number|string} examId - Exam ID
   * @param {number|string} attemptId - Specific attempt ID (optional)
   * @returns {Promise<Object>} Exam results
   */
  async getExamResults(examId, attemptId = null) {
    try {
      // Convert to integers to match backend expectations
      const numericExamId = parseInt(examId, 10);
      if (isNaN(numericExamId)) {
        throw new Error(`Invalid exam ID: ${examId}. Must be a valid number.`);
      }
      
      let endpoint;
      if (attemptId !== null) {
        const numericAttemptId = parseInt(attemptId, 10);
        if (isNaN(numericAttemptId)) {
          throw new Error(`Invalid attempt ID: ${attemptId}. Must be a valid number.`);
        }
        endpoint = `/exams/${numericExamId}/attempts/${numericAttemptId}/results`;
      } else {
        endpoint = `/exams/${numericExamId}/results`;
      }
      
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch exam results');
    }
  }

  /**
   * Get all previous attempts for an exam
   * @param {number|string} examId - Exam ID
   * @returns {Promise<Array>} List of attempts
   */
  async getExamAttempts(examId) {
    try {
      // Convert to integer to match backend expectations
      const numericId = parseInt(examId, 10);
      if (isNaN(numericId)) {
        throw new Error(`Invalid exam ID: ${examId}. Must be a valid number.`);
      }
      
      const response = await api.get(`/exams/${numericId}/attempts`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch exam attempts');
    }
  }
}

// Export single instance of the service
export default new ExamsService();
