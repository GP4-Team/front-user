// src/services/api/exams.service.js
import apiClient from './client';

/**
 * خدمات الامتحانات والاختبارات
 */
const ExamsService = {
  /**
   * الحصول على قائمة الامتحانات المتاحة
   * @param {Object} params - معلمات الاستعلام (الحالة، المادة، المستوى)
   * @returns {Promise} - Promise مع قائمة الامتحانات
   */
  getExams: async (params = {}) => {
    try {
      const response = await apiClient.get('/exams', { params });
      return response.data;
    } catch (error) {
      throw handleExamsError(error, 'جلب الامتحانات');
    }
  },

  /**
   * الحصول على تفاصيل امتحان معين
   * @param {string} examId - معرف الامتحان
   * @returns {Promise} - Promise مع تفاصيل الامتحان
   */
  getExamDetails: async (examId) => {
    try {
      const response = await apiClient.get(`/exams/${examId}`);
      return response.data;
    } catch (error) {
      throw handleExamsError(error, 'جلب تفاصيل الامتحان');
    }
  },

  /**
   * التسجيل في امتحان
   * @param {string} examId - معرف الامتحان
   * @returns {Promise} - Promise مع تأكيد التسجيل
   */
  registerForExam: async (examId) => {
    try {
      const response = await apiClient.post(`/exams/${examId}/register`);
      return response.data;
    } catch (error) {
      throw handleExamsError(error, 'التسجيل في الامتحان');
    }
  },

  /**
   * بدء الامتحان
   * @param {string} examId - معرف الامتحان
   * @returns {Promise} - Promise مع بيانات بدء الامتحان وأسئلته
   */
  startExam: async (examId) => {
    try {
      const response = await apiClient.post(`/exams/${examId}/start`);
      return response.data;
    } catch (error) {
      throw handleExamsError(error, 'بدء الامتحان');
    }
  },

  /**
   * الحصول على أسئلة الامتحان
   * @param {string} examId - معرف الامتحان
   * @returns {Promise} - Promise مع أسئلة الامتحان
   */
  getExamQuestions: async (examId) => {
    try {
      const response = await apiClient.get(`/exams/${examId}/questions`);
      return response.data;
    } catch (error) {
      throw handleExamsError(error, 'جلب أسئلة الامتحان');
    }
  },

  /**
   * تقديم إجابة على سؤال
   * @param {string} examId - معرف الامتحان
   * @param {string} questionId - معرف السؤال
   * @param {Object} answerData - بيانات الإجابة
   * @returns {Promise} - Promise مع تأكيد تقديم الإجابة
   */
  submitAnswer: async (examId, questionId, answerData) => {
    try {
      const response = await apiClient.post(`/exams/${examId}/questions/${questionId}/answer`, answerData);
      return response.data;
    } catch (error) {
      throw handleExamsError(error, 'تقديم الإجابة');
    }
  },

  /**
   * تقديم الامتحان بأكمله
   * @param {string} examId - معرف الامتحان
   * @returns {Promise} - Promise مع نتيجة الامتحان
   */
  submitExam: async (examId) => {
    try {
      const response = await apiClient.post(`/exams/${examId}/submit`);
      return response.data;
    } catch (error) {
      throw handleExamsError(error, 'تقديم الامتحان');
    }
  },

  /**
   * الحصول على نتائج امتحان
   * @param {string} examId - معرف الامتحان
   * @returns {Promise} - Promise مع نتائج الامتحان
   */
  getExamResults: async (examId) => {
    try {
      const response = await apiClient.get(`/exams/${examId}/results`);
      return response.data;
    } catch (error) {
      throw handleExamsError(error, 'جلب نتائج الامتحان');
    }
  },

  /**
   * الحصول على امتحانات المستخدم
   * @param {string} status - حالة الامتحان (upcoming, active, completed، أو جميعها)
   * @returns {Promise} - Promise مع امتحانات المستخدم
   */
  getUserExams: async (status = '') => {
    try {
      const params = status ? { status } : {};
      const response = await apiClient.get('/exams/user', { params });
      return response.data;
    } catch (error) {
      throw handleExamsError(error, 'جلب امتحانات المستخدم');
    }
  },

  /**
   * الحصول على الامتحانات الموصى بها
   * @returns {Promise} - Promise مع الامتحانات الموصى بها
   */
  getRecommendedExams: async () => {
    try {
      const response = await apiClient.get('/exams/recommended');
      return response.data;
    } catch (error) {
      throw handleExamsError(error, 'جلب الامتحانات الموصى بها');
    }
  }
};

/**
 * معالجة أخطاء الامتحانات وتنسيقها
 * @param {Error} error - خطأ الاستجابة
 * @param {string} operation - نوع العملية التي فشلت
 * @returns {Error} - خطأ منسق
 */
const handleExamsError = (error, operation) => {
  const errorMessage = error.response?.data?.message || `حدث خطأ أثناء ${operation}`;
  const errorCode = error.response?.status || 'UNKNOWN';
  
  const formattedError = new Error(errorMessage);
  formattedError.code = errorCode;
  
  return formattedError;
};

export default ExamsService;