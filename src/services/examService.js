// src/services/examService.js
/**
 * خدمات API للامتحانات الإلكترونية
 * Online Exam API Services
 */
import api from './api';

class ExamService {
  /**
   * جلب أسئلة الامتحان مع إدارة حالة الامتحان
   * Get exam questions with exam state management
   * This endpoint handles all exam states (start, continue, retry, revision)
   * @param {number} examId - معرف الامتحان
   * @returns {Promise} - بيانات الامتحان والأسئلة
   */
  async getExamQuestions(examId) {
    try {
      console.log(`📝 [ExamService] Getting exam questions for exam ${examId}`);
      console.log('🔄 [ExamService] This endpoint handles exam state automatically (start/continue/retry/revision)');
      
      const response = await api.post(`/examination/online-exams/${examId}/questions`);
      
      if (response.data && response.data.success) {
        console.log('✅ [ExamService] Exam questions loaded successfully');
        console.log(`📊 [ExamService] Exam Status: ${response.data.data.status}`);
        console.log(`⏱️ [ExamService] Duration: ${response.data.data.duration_in_seconds}s`);
        console.log(`❓ [ExamService] Questions: ${response.data.data.questions?.length || 0}`);
        
        return {
          success: true,
          data: response.data.data
        };
      }
      
      throw new Error(response.data?.message || 'Failed to load exam questions');
    } catch (error) {
      console.error('❌ [ExamService] Error loading exam questions:', error);
      
      // Handle specific error cases
      if (error.response?.status === 404) {
        return {
          success: false,
          message: 'الامتحان غير موجود أو غير متاح',
          status: 404
        };
      }
      
      if (error.response?.status === 403) {
        return {
          success: false,
          message: 'غير مصرح لك بالوصول لهذا الامتحان',
          status: 403
        };
      }
      
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'خطأ في تحميل الأسئلة',
        status: error.response?.status
      };
    }
  }

  /**
   * إرسال إجابة على سؤال
   * Submit answer for a question
   * @param {number} studentAnswerId - معرف إجابة الطالب
   * @param {object} answerData - بيانات الإجابة
   * @returns {Promise} - نتيجة الإرسال
   */
  async submitAnswer(studentAnswerId, answerData) {
    try {
      console.log(`📤 [ExamService] Submitting answer for student answer ID ${studentAnswerId}:`, answerData);
      
      // Validate required data
      if (!studentAnswerId) {
        throw new Error('Student answer ID is required');
      }
      
      if (!answerData || (!answerData.choice_id && !answerData.text)) {
        throw new Error('Answer data is required (choice_id or text)');
      }
      
      const response = await api.post(`/examination/submit-answer/${studentAnswerId}`, answerData);
      
      if (response.data && response.data.success) {
        console.log('✅ [ExamService] Answer submitted successfully');
        return {
          success: true,
          data: response.data.data
        };
      }
      
      throw new Error(response.data?.message || 'Failed to submit answer');
    } catch (error) {
      console.error('❌ [ExamService] Error submitting answer:', error);
      
      // Handle specific validation errors
      if (error.response?.status === 422) {
        const validationErrors = error.response.data?.errors || {};
        const errorMessages = Object.values(validationErrors).flat();
        return {
          success: false,
          message: errorMessages.join(', ') || 'بيانات الإجابة غير صحيحة',
          status: 422
        };
      }
      
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'خطأ في إرسال الإجابة',
        status: error.response?.status
      };
    }
  }

  /**
   * إنهاء الامتحان
   * Finish exam session
   * @param {number} passedExamId - معرف الجلسة المنقولة
   * @returns {Promise} - نتيجة إنهاء الامتحان
   */
  async finishExam(passedExamId) {
    try {
      console.log(`🏁 [ExamService] Finishing exam session ${passedExamId}`);
      
      const response = await api.post(`/examination/finish-exam/${passedExamId}`);
      
      if (response.data && response.data.success) {
        console.log('✅ [ExamService] Exam finished successfully');
        return {
          success: true,
          data: response.data.data
        };
      }
      
      throw new Error(response.data?.message || 'Failed to finish exam');
    } catch (error) {
      console.error('❌ [ExamService] Error finishing exam:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'خطأ في إنهاء الامتحان',
        status: error.response?.status
      };
    }
  }

  /**
   * جلب إجابات الامتحان
   * Get exam answers
   * @param {number} examId - معرف الامتحان
   * @param {number} attemptId - معرف المحاولة
   * @returns {Promise} - إجابات الامتحان
   */
  async getExamAnswers(examId, attemptId) {
    try {
      console.log(`📋 [ExamService] Getting answers for exam ${examId}, attempt ${attemptId}`);
      
      const response = await api.get(`/examination/exam-answers/${examId}/${attemptId}`);
      
      if (response.data && response.data.success) {
        console.log('✅ [ExamService] Answers loaded successfully');
        return {
          success: true,
          data: response.data.data
        };
      }
      
      throw new Error(response.data?.message || 'Failed to load exam answers');
    } catch (error) {
      console.error('❌ [ExamService] Error loading answers:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'خطأ في تحميل الإجابات',
        status: error.response?.status
      };
    }
  }

  /**
   * جلب نتائج الامتحان
   * Get exam results
   * @param {number} examId - معرف الامتحان
   * @param {number} attemptId - معرف المحاولة
   * @returns {Promise} - نتائج الامتحان
   */
  async getExamResults(examId, attemptId) {
    try {
      console.log(`🏆 [ExamService] Getting results for exam ${examId}, attempt ${attemptId}`);
      
      const response = await api.get(`/examination/exam-results/${examId}/${attemptId}`);
      
      if (response.data && response.data.success) {
        console.log('✅ [ExamService] Results loaded successfully');
        return {
          success: true,
          data: response.data.data
        };
      }
      
      throw new Error(response.data?.message || 'Failed to load exam results');
    } catch (error) {
      console.error('❌ [ExamService] Error loading results:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'خطأ في تحميل النتائج',
        status: error.response?.status
      };
    }
  }

  /**
   * تنسيق بيانات الإجابة حسب نوع السؤال
   * Format answer data based on question type
   * @param {string} questionType - نوع السؤال
   * @param {any} answer - الإجابة
   * @returns {object} - بيانات الإجابة المنسقة
   */
  formatAnswerData(questionType, answer) {
    switch (questionType) {
      case 'MultipleChoice':
      case 'TrueFalse':
        return {
          choice_id: parseInt(answer)
        };
      
      case 'KeywordsEssay':
      case 'Essay':
        return {
          text: answer.toString()
        };
      
      default:
        console.warn(`Unknown question type: ${questionType}`);
        return {
          choice_id: parseInt(answer)
        };
    }
  }

  /**
   * التحقق من صحة الإجابة
   * Validate answer format
   * @param {string} questionType - نوع السؤال
   * @param {any} answer - الإجابة
   * @returns {boolean} - صحة التنسيق
   */
  validateAnswer(questionType, answer) {
    if (!answer && answer !== 0) {
      return false;
    }

    switch (questionType) {
      case 'MultipleChoice':
      case 'TrueFalse':
        return !isNaN(parseInt(answer)) && parseInt(answer) > 0;
      
      case 'KeywordsEssay':
      case 'Essay':
        return typeof answer === 'string' && answer.trim().length > 0;
      
      default:
        return false;
    }
  }
}

// تصدير كـ singleton
const examService = new ExamService();
export default examService;
