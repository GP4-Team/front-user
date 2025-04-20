// src/hooks/api/useCourses.js
import { useState, useCallback, useEffect } from 'react';
import { CoursesService } from '../../services/api/index';

/**
 * هوك مخصص لإدارة عمليات الدورات التعليمية
 * يوفر وظائف للتعامل مع الدورات التعليمية، وجلبها وإدارتها
 */
export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * جلب الدورات المميزة
   * @param {Object} params - معلمات الاستعلام
   * @returns {Promise} - Promise مع قائمة الدورات
   */
  const fetchFeaturedCourses = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);

    try {
      const data = await CoursesService.getFeaturedCourses(params);
      setCourses(data.courses || data);
      return data;
    } catch (err) {
      setError(err.message || 'فشل جلب الدورات المميزة');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * البحث عن الدورات
   * @param {string} query - نص البحث
   * @param {Object} filters - عوامل التصفية
   * @param {Object} pagination - معلمات الصفحات
   * @returns {Promise} - Promise مع نتائج البحث
   */
  const searchCourses = useCallback(async (query, filters = {}, pagination = {}) => {
    setLoading(true);
    setError(null);

    try {
      const data = await CoursesService.searchCourses(query, filters, pagination);
      setCourses(data.courses || data);
      return data;
    } catch (err) {
      setError(err.message || 'فشل البحث عن الدورات');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * جلب تفاصيل دورة محددة
   * @param {string} courseId - معرف الدورة
   * @returns {Promise} - Promise مع تفاصيل الدورة
   */
  const fetchCourseDetails = useCallback(async (courseId) => {
    setLoading(true);
    setError(null);

    try {
      const data = await CoursesService.getCourseDetails(courseId);
      setCourseDetails(data);
      return data;
    } catch (err) {
      setError(err.message || 'فشل جلب تفاصيل الدورة');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * جلب الدورات المسجل فيها المستخدم
   * @returns {Promise} - Promise مع الدورات المسجلة
   */
  const fetchEnrolledCourses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await CoursesService.getEnrolledCourses();
      setEnrolledCourses(data.courses || data);
      return data;
    } catch (err) {
      setError(err.message || 'فشل جلب الدورات المسجلة');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * التسجيل في دورة
   * @param {string} courseId - معرف الدورة
   * @returns {Promise} - Promise مع تأكيد التسجيل
   */
  const enrollInCourse = useCallback(async (courseId) => {
    setLoading(true);
    setError(null);

    try {
      const data = await CoursesService.enrollInCourse(courseId);
      // تحديث قائمة الدورات المسجلة
      fetchEnrolledCourses().catch(console.error);
      return data;
    } catch (err) {
      setError(err.message || 'فشل التسجيل في الدورة');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchEnrolledCourses]);

  /**
   * تحديث تقدم المستخدم في الدورة
   * @param {string} courseId - معرف الدورة
   * @param {string} contentId - معرف المحتوى
   * @param {Object} progressData - بيانات التقدم
   * @returns {Promise} - Promise مع تأكيد تحديث التقدم
   */
  const updateProgress = useCallback(async (courseId, contentId, progressData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await CoursesService.updateCourseProgress(courseId, contentId, progressData);
      // تحديث تفاصيل الدورة إذا كانت معروضة حاليًا
      if (courseDetails && courseDetails.id === courseId) {
        fetchCourseDetails(courseId).catch(console.error);
      }
      return data;
    } catch (err) {
      setError(err.message || 'فشل تحديث التقدم');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [courseDetails, fetchCourseDetails]);

  /**
   * جلب الدورات حسب المادة الدراسية
   * @param {string} subject - المادة الدراسية
   * @param {Object} params - معلمات الاستعلام الإضافية
   * @returns {Promise} - Promise مع قائمة الدورات
   */
  const fetchCoursesBySubject = useCallback(async (subject, params = {}) => {
    setLoading(true);
    setError(null);

    try {
      const data = await CoursesService.getCoursesBySubject(subject, params);
      setCourses(data.courses || data);
      return data;
    } catch (err) {
      setError(err.message || 'فشل جلب دورات المادة');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * جلب تقييمات دورة
   * @param {string} courseId - معرف الدورة
   * @param {Object} params - معلمات الاستعلام
   * @returns {Promise} - Promise مع قائمة التقييمات
   */
  const fetchCourseReviews = useCallback(async (courseId, params = {}) => {
    setLoading(true);
    setError(null);

    try {
      return await CoursesService.getCourseReviews(courseId, params);
    } catch (err) {
      setError(err.message || 'فشل جلب تقييمات الدورة');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * إضافة تقييم لدورة
   * @param {string} courseId - معرف الدورة
   * @param {Object} reviewData - بيانات التقييم
   * @returns {Promise} - Promise مع التقييم المنشور
   */
  const addReview = useCallback(async (courseId, reviewData) => {
    setLoading(true);
    setError(null);

    try {
      return await CoursesService.addCourseReview(courseId, reviewData);
    } catch (err) {
      setError(err.message || 'فشل إضافة التقييم');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // إعادة الدوال والحالات
  return {
    courses,
    courseDetails,
    enrolledCourses,
    loading,
    error,
    fetchFeaturedCourses,
    searchCourses,
    fetchCourseDetails,
    fetchEnrolledCourses,
    enrollInCourse,
    updateProgress,
    fetchCoursesBySubject,
    fetchCourseReviews,
    addReview,
    clearError: () => setError(null)
  };
};

export default useCourses;