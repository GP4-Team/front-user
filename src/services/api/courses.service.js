// src/services/api/courses.service.js
import apiClient from './client';

/**
 * خدمات الدورات التعليمية
 */
const CoursesService = {
  /**
   * الحصول على قائمة الدورات المميزة
   * @param {Object} params - معلمات الاستعلام (الصفحة، الحجم، إلخ)
   * @returns {Promise} - Promise مع قائمة الدورات
   */
  getFeaturedCourses: async (params = {}) => {
    try {
      const response = await apiClient.get('/courses/featured', { params });
      return response.data;
    } catch (error) {
      throw handleCoursesError(error, 'جلب الدورات المميزة');
    }
  },

  /**
   * البحث عن الدورات
   * @param {string} query - نص البحث
   * @param {Object} filters - عوامل التصفية (المادة، المستوى، إلخ)
   * @param {Object} pagination - معلمات الصفحات
   * @returns {Promise} - Promise مع نتائج البحث
   */
  searchCourses: async (query, filters = {}, pagination = { page: 1, limit: 20 }) => {
    try {
      const response = await apiClient.get('/courses/search', {
        params: {
          q: query,
          ...filters,
          ...pagination
        }
      });
      return response.data;
    } catch (error) {
      throw handleCoursesError(error, 'البحث عن الدورات');
    }
  },

  /**
   * الحصول على تفاصيل دورة معينة
   * @param {string} courseId - معرف الدورة
   * @returns {Promise} - Promise مع تفاصيل الدورة
   */
  getCourseDetails: async (courseId) => {
    try {
      const response = await apiClient.get(`/courses/${courseId}`);
      return response.data;
    } catch (error) {
      throw handleCoursesError(error, 'جلب تفاصيل الدورة');
    }
  },

  /**
   * الحصول على الدورات المسجل فيها المستخدم
   * @returns {Promise} - Promise مع الدورات المسجلة
   */
  getEnrolledCourses: async () => {
    try {
      const response = await apiClient.get('/courses/enrolled');
      return response.data;
    } catch (error) {
      throw handleCoursesError(error, 'جلب الدورات المسجلة');
    }
  },

  /**
   * التسجيل في دورة
   * @param {string} courseId - معرف الدورة
   * @returns {Promise} - Promise مع تأكيد التسجيل
   */
  enrollInCourse: async (courseId) => {
    try {
      const response = await apiClient.post(`/courses/${courseId}/enroll`);
      return response.data;
    } catch (error) {
      throw handleCoursesError(error, 'التسجيل في الدورة');
    }
  },

  /**
   * تحديث تقدم المستخدم في الدورة
   * @param {string} courseId - معرف الدورة
   * @param {string} contentId - معرف المحتوى
   * @param {Object} progressData - بيانات التقدم
   * @returns {Promise} - Promise مع تأكيد تحديث التقدم
   */
  updateCourseProgress: async (courseId, contentId, progressData) => {
    try {
      const response = await apiClient.post(`/courses/${courseId}/content/${contentId}/progress`, progressData);
      return response.data;
    } catch (error) {
      throw handleCoursesError(error, 'تحديث التقدم');
    }
  },

  /**
   * الحصول على الدورات حسب المادة الدراسية
   * @param {string} subject - المادة الدراسية (مثل: physics, chemistry, math)
   * @param {Object} params - معلمات الاستعلام الإضافية
   * @returns {Promise} - Promise مع قائمة الدورات
   */
  getCoursesBySubject: async (subject, params = {}) => {
    try {
      const response = await apiClient.get(`/courses/subject/${subject}`, { params });
      return response.data;
    } catch (error) {
      throw handleCoursesError(error, 'جلب دورات المادة');
    }
  },

  /**
   * الحصول على تقييمات ومراجعات الدورة
   * @param {string} courseId - معرف الدورة
   * @param {Object} params - معلمات الاستعلام
   * @returns {Promise} - Promise مع قائمة التقييمات
   */
  getCourseReviews: async (courseId, params = {}) => {
    try {
      const response = await apiClient.get(`/courses/${courseId}/reviews`, { params });
      return response.data;
    } catch (error) {
      throw handleCoursesError(error, 'جلب تقييمات الدورة');
    }
  },

  /**
   * إضافة تقييم للدورة
   * @param {string} courseId - معرف الدورة
   * @param {Object} reviewData - بيانات التقييم (النجوم، التعليق)
   * @returns {Promise} - Promise مع التقييم المنشور
   */
  addCourseReview: async (courseId, reviewData) => {
    try {
      const response = await apiClient.post(`/courses/${courseId}/reviews`, reviewData);
      return response.data;
    } catch (error) {
      throw handleCoursesError(error, 'إضافة تقييم');
    }
  }
};

/**
 * معالجة أخطاء الدورات وتنسيقها
 * @param {Error} error - خطأ الاستجابة
 * @param {string} operation - نوع العملية التي فشلت
 * @returns {Error} - خطأ منسق
 */
const handleCoursesError = (error, operation) => {
  const errorMessage = error.response?.data?.message || `حدث خطأ أثناء ${operation}`;
  const errorCode = error.response?.status || 'UNKNOWN';
  
  const formattedError = new Error(errorMessage);
  formattedError.code = errorCode;
  
  return formattedError;
};

export default CoursesService;