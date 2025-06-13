// Online Exam Questions Service
import apiClient from './apiClient';

/**
 * Online Exam Questions Service
 * Handles fetching exam questions based on different exam states
 */
export const onlineExamQuestionsService = {
  
  /**
   * Get detailed exam information with current status
   * @param {number|string} examId - The exam ID
   * @returns {Promise<Object>} Exam details with current status
   */
  async getExamDetails(examId) {
    try {
      // Convert examId to integer
      const examIdInt = parseInt(examId);
      
      console.log(`📊 Fetching exam details for exam ${examIdInt}`);
      console.log('📊 API endpoint:', `/examination/online-exams/${examIdInt}`);
      
      // Use the correct API endpoint that gets exam details with current status
      const response = await apiClient.get(`/examination/online-exams/${examIdInt}`);
      
      console.log('✅ Exam details response:', response);
      console.log('✅ Exam details data structure:', JSON.stringify(response.data || response, null, 2));
      
      return {
        success: true,
        data: response.data || response,
        examId: examIdInt
      };
    } catch (error) {
      console.error('❌ Error fetching exam details:', error);
      console.error('❌ Error response:', error.response?.data);
      console.error('❌ Error status:', error.response?.status);
      console.error('❌ Error headers:', error.response?.headers);
      
      const errorResponse = error.response?.data;
      
      return {
        success: false,
        error: errorResponse?.message || error.message || 'Failed to get exam details',
        examId: parseInt(examId),
        data: errorResponse?.data || null,
        httpStatus: error.response?.status
      };
    }
  },
  
  /**
   * Get questions for an online exam based on student's current exam status
   * @param {number|string} examId - The exam ID
   * @param {string} action - The action type ('start', 'retry', 'continue', 'revision')
   * @returns {Promise<Object>} Exam questions data
   */
  async getExamQuestions(examId, action = 'start') {
    try {
      console.log(`📝 Fetching exam questions for exam ${examId} with action: ${action}`);
      
      const response = await apiClient.post(`/examination/online-exams/${examId}/questions`, {
        action: action
      });
      
      console.log('✅ Exam questions response:', response);
      
      // Handle successful response
      if (response.success !== false) {
        return {
          success: true,
          data: response.data || response,
          message: response.message || 'Questions loaded successfully',
          examId: examId,
          action: action
        };
      } else {
        // Handle specific error cases
        return {
          success: false,
          error: response.message || 'Failed to get exam questions',
          status: response.data?.status || 'error',
          examId: response.data?.exam_id || examId,
          data: response.data || null
        };
      }
    } catch (error) {
      console.error('❌ Error fetching exam questions:', error);
      
      // Handle different error scenarios
      const errorResponse = error.response?.data;
      
      if (errorResponse) {
        return {
          success: false,
          error: errorResponse.message || 'Failed to get exam questions',
          status: errorResponse.data?.status || 'error',
          examId: errorResponse.data?.exam_id || examId,
          data: errorResponse.data || null,
          httpStatus: error.response?.status
        };
      }
      
      return {
        success: false,
        error: error.message || 'Network error occurred',
        status: 'network_error',
        examId: examId,
        data: null
      };
    }
  },

  /**
   * Start a new exam session
   * @param {number|string} examId - The exam ID
   * @returns {Promise<Object>} Exam questions data
   */
  async startExam(examId) {
    return this.getExamQuestions(examId, 'start');
  },

  /**
   * Retry an exam (new attempt)
   * @param {number|string} examId - The exam ID
   * @returns {Promise<Object>} Exam questions data
   */
  async retryExam(examId) {
    return this.getExamQuestions(examId, 'retry');
  },

  /**
   * Continue an existing exam session
   * @param {number|string} examId - The exam ID
   * @returns {Promise<Object>} Exam questions data
   */
  async continueExam(examId) {
    return this.getExamQuestions(examId, 'continue');
  },

  /**
   * Get exam for revision (review completed exam)
   * @param {number|string} examId - The exam ID
   * @returns {Promise<Object>} Exam questions data
   */
  async reviewExam(examId) {
    return this.getExamQuestions(examId, 'revision');
  },

  /**
   * Check exam availability and status
   * @param {number|string} examId - The exam ID
   * @returns {Promise<Object>} Exam status info
   */
  async checkExamStatus(examId) {
    try {
      console.log(`🔍 Checking exam status for exam ${examId}`);
      
      // First try to get questions to check status
      const response = await this.getExamQuestions(examId, 'continue');
      
      if (response.success) {
        return {
          success: true,
          status: 'available',
          examId: examId,
          message: 'Exam is available'
        };
      } else {
        return {
          success: false,
          status: response.status || 'unavailable',
          examId: response.examId || examId,
          message: response.error || 'Exam is not available'
        };
      }
    } catch (error) {
      console.error('❌ Error checking exam status:', error);
      
      return {
        success: false,
        status: 'error',
        examId: examId,
        message: error.message || 'Failed to check exam status'
      };
    }
  },

  /**
   * Submit individual answer for a question
   * @param {number|string} studentAnswerId - The student answer ID
   * @param {Object} answerData - The answer data (choice_id or text)
   * @returns {Promise<Object>} Submit response
   */
  async submitAnswer(studentAnswerId, answerData) {
    try {
      console.log(`📤 [submitAnswer] Submitting answer for student answer ID ${studentAnswerId}:`, answerData);
      console.log(`📤 [submitAnswer] API endpoint: /examination/submit-answer/${studentAnswerId}`);
      
      const response = await apiClient.post(`/examination/submit-answer/${studentAnswerId}`, answerData);
      
      console.log('✅ [submitAnswer] Raw API response:', response);
      console.log('✅ [submitAnswer] Response data structure:', JSON.stringify(response.data || response, null, 2));
      
      // Extract the response data - the API might return data in different structures
      const responseData = response.data || response;
      
      return {
        success: true,
        data: {
          // Main feedback data
          is_correct: responseData.is_correct || false,
          awarded_mark: responseData.awarded_mark || 0,
          max_mark: responseData.max_mark || 0,
          time_taken: responseData.time_taken || 0,
          
          // Additional feedback information
          feedback: responseData.feedback || null,
          correct_answer_id: responseData.correct_answer_id || null,
          correct_answer: responseData.correct_answer || null,
          
          // Raw response for debugging
          ...responseData
        },
        message: responseData.message || 'Answer submitted successfully',
        studentAnswerId: studentAnswerId
      };
    } catch (error) {
      console.error('❌ [submitAnswer] Error submitting answer:', error);
      console.error('❌ [submitAnswer] Error response:', error.response?.data);
      console.error('❌ [submitAnswer] Error status:', error.response?.status);
      
      const errorResponse = error.response?.data;
      
      return {
        success: false,
        error: errorResponse?.message || error.message || 'Failed to submit answer',
        studentAnswerId: studentAnswerId,
        data: errorResponse?.data || null,
        httpStatus: error.response?.status
      };
    }
  },

  /**
   * Finish exam session
   * @param {number|string} passedExamId - The passed exam session ID
   * @returns {Promise<Object>} Finish response
   */
  async finishExam(passedExamId) {
    try {
      console.log(`🏁 Finishing exam session ${passedExamId}`);
      
      const response = await apiClient.post(`/examination/finish-exam/${passedExamId}`);
      
      console.log('✅ Finish exam response:', response);
      
      return {
        success: true,
        data: response.data || response,
        message: response.message || 'Exam finished successfully',
        passedExamId: passedExamId
      };
    } catch (error) {
      console.error('❌ Error finishing exam:', error);
      
      const errorResponse = error.response?.data;
      
      return {
        success: false,
        error: errorResponse?.message || error.message || 'Failed to finish exam',
        passedExamId: passedExamId,
        data: errorResponse?.data || null,
        httpStatus: error.response?.status
      };
    }
  },

  /**
   * Save exam progress (auto-save during exam)
   * @param {number|string} examId - The exam ID
   * @param {Object} answers - Current answers
   * @param {number} timeRemaining - Time remaining in seconds
   * @returns {Promise<Object>} Save response
   */
  async saveExamProgress(examId, answers, timeRemaining) {
    try {
      console.log(`💾 Saving progress for exam ${examId}`);
      
      const response = await apiClient.post(`/examination/online-exams/${examId}/save-progress`, {
        answers: answers,
        time_remaining: timeRemaining
      });
      
      return {
        success: true,
        data: response.data || response,
        message: 'Progress saved successfully',
        examId: examId
      };
    } catch (error) {
      console.error('❌ Error saving progress:', error);
      
      // Don't throw errors for progress saving - it's not critical
      return {
        success: false,
        error: error.message || 'Failed to save progress',
        examId: examId
      };
    }
  },

  /**
   * Get exam results - DEPRECATED
   * This function is no longer available as results page has been removed
   * @param {number|string} examId - The exam ID
   * @param {number|string} attemptId - The attempt ID (not used with new API)
   * @returns {Promise<Object>} Deprecated response
   */
  async getExamResults(examId, attemptId) {
    console.warn('getExamResults is deprecated. Results page has been removed. Use review functionality instead.');
    return {
      success: false,
      error: 'Results functionality has been removed. Please use review page instead.',
      examId: parseInt(examId),
      attemptId: attemptId,
      data: null
    };
  },

  /**
   * Get exam answers for review
   * @param {number|string} examId - The exam ID
   * @param {number|string} attemptId - The attempt ID (not used with current API)
   * @returns {Promise<Object>} Exam answers for review
   */
  async getExamAnswers(examId, attemptId) {
    try {
      // Convert examId to integer
      const examIdInt = parseInt(examId);
      
      console.log(`📋 Fetching exam for review: exam ${examIdInt}`);
      console.log('📋 API endpoint:', `/examination/online-exams/${examIdInt}/questions`);
      
      // Use the questions API with revision action to get exam for review
      const response = await apiClient.post(`/examination/online-exams/${examIdInt}/questions`, {
        action: 'revision'
      });
      
      console.log('✅ Exam review response:', response);
      console.log('✅ Exam review data structure:', JSON.stringify(response.data || response, null, 2));
      
      return {
        success: true,
        data: response.data || response,
        examId: examIdInt,
        attemptId: attemptId
      };
    } catch (error) {
      console.error('❌ Error fetching exam for review:', error);
      console.error('❌ Error response:', error.response?.data);
      console.error('❌ Error status:', error.response?.status);
      console.error('❌ Error headers:', error.response?.headers);
      
      const errorResponse = error.response?.data;
      
      return {
        success: false,
        error: errorResponse?.message || error.message || 'Failed to get exam for review',
        examId: parseInt(examId),
        attemptId: attemptId,
        data: errorResponse?.data || null,
        httpStatus: error.response?.status
      };
    }
  },

  /**
   * Format answer data based on question type
   * @param {string} questionType - Question type (MultipleChoice, TrueFalse, etc.)
   * @param {any} answer - The answer value
   * @returns {Object} Formatted answer data
   */
  formatAnswerData(questionType, answer) {
    console.log(`📋 [formatAnswerData] Formatting answer:`, { questionType, answer });
    
    // Normalize question type names
    const normalizedType = questionType?.toLowerCase();
    
    switch (normalizedType) {
      case 'multiplechoice':
      case 'mcq':
      case 'truefalse':
      case 'true-false':
        const choiceId = parseInt(answer);
        console.log(`📋 [formatAnswerData] Formatted choice answer:`, { choice_id: choiceId });
        return {
          choice_id: choiceId
        };
      
      case 'keywordsessay':
      case 'essay':
        const textAnswer = answer ? answer.toString().trim() : '';
        console.log(`📋 [formatAnswerData] Formatted essay answer:`, { text: textAnswer });
        return {
          text: textAnswer
        };
      
      default:
        console.warn(`⚠️ [formatAnswerData] Unknown question type: ${questionType}, defaulting to choice_id`);
        return {
          choice_id: parseInt(answer)
        };
    }
  }
};

export default onlineExamQuestionsService;