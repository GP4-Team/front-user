// src/services/homeApiService.js
import { materialsService, coursesService, examsService } from './api/index';
import api from './api';

/**
 * خدمة صفحة الهوم للتعامل مع APIs الحقيقية
 */
const HomeApiService = {
  /**
   * الحصول على الدورات المميزة
   * @returns {Promise} - Promise مع قائمة الدورات المميزة
   */
  getFeaturedCourses: async () => {
    try {
      return await coursesService.getFeaturedCourses();
    } catch (error) {
      console.error('Error fetching featured courses:', error);
      throw error;
    }
  },

  /**
   * الحصول على فئات الدورات
   * @returns {Promise} - Promise مع قائمة الفئات
   */
  getCategories: async () => {
    try {
      return await coursesService.getCategories();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  /**
   * الحصول على مستويات التعليم
   * @param {Object} params - معلمات إضافية
   * @returns {Promise} - Promise مع قائمة المستويات
   */
  getEducationLevels: async (params = {}) => {
    try {
      return await coursesService.getEducationLevels(params);
    } catch (error) {
      console.error('Error fetching education levels:', error);
      throw error;
    }
  },

  /**
   * الحصول على جميع الدورات مع pagination (مع إمكانية التصفية)
   * @param {Object} params - معلمات التصفية
   * @returns {Promise} - Promise مع قائمة الدورات
   */
  getAllCoursesPaginated: async (params = {}) => {
    try {
      return await coursesService.getAllCoursesPaginated(params);
    } catch (error) {
      console.error('Error fetching courses with pagination:', error);
      throw error;
    }
  },

  /**
   * البحث عن الدورات
   * @param {string} query - نص البحث
   * @returns {Promise} - Promise مع نتائج البحث
   */
  searchCourses: async (query) => {
    try {
      return await coursesService.searchCourses(query);
    } catch (error) {
      console.error('Error searching courses:', error);
      throw error;
    }
  },

  /**
   * الحصول على الدورات حسب المستوى
   * @param {number} levelId - معرف المستوى
   * @returns {Promise} - Promise مع قائمة الدورات
   */
  getCoursesByLevel: async (levelId) => {
    try {
      return await coursesService.getCoursesByLevel(levelId);
    } catch (error) {
      console.error('Error fetching courses by level:', error);
      throw error;
    }
  },

  /**
   * الحصول على محتوى الدورة
   * @param {number} courseId - معرف الدورة
   * @returns {Promise} - Promise مع محتوى الدورة
   */
  getCourseContent: async (courseId) => {
    try {
      return await coursesService.getCourseContent(courseId);
    } catch (error) {
      console.error('Error fetching course content:', error);
      throw error;
    }
  },

  /**
   * الحصول على تفاصيل مادة تعليمية محددة
   * @param {number} materialId - معرف المادة التعليمية
   * @returns {Promise} - Promise مع تفاصيل المادة
   */
  getMaterial: async (materialId) => {
    try {
      return await materialsService.getMaterialById(materialId);
    } catch (error) {
      console.error('Error fetching material:', error);
      throw error;
    }
  },

  /**
   * الحصول على الاختبارات المميزة
   * @returns {Promise} - Promise مع قائمة الاختبارات
   */
  getFeaturedExams: async () => {
    try {
      return await examsService.getFeaturedExams();
    } catch (error) {
      console.error('Error fetching featured exams:', error);
      throw error;
    }
  },

  /**
   * فلترة الكورسات حسب المستوى التعليمي (جديد)
   * @param {Object} params - معلمات الفلترة بما فهلا education_level_ids
   * @returns {Promise} - Promise مع قائمة الكورسات المفلترة
   */
  getFilteredCourses: async (params = {}) => {
    try {
      return await coursesService.getFilteredCourses(params);
    } catch (error) {
      console.error('Error fetching filtered courses:', error);
      throw error;
    }
  },

  /**
   * البحث في الكورسات (جديد)
   * @param {string} query - نص البحث
   * @param {Object} params - معلمات إضافية (page, per_page, إلخ)
   * @returns {Promise} - Promise مع نتائج البحث
   */
  searchCourses: async (query, params = {}) => {
    try {
      return await coursesService.searchCourses(query, params);
    } catch (error) {
      console.error('Error searching courses:', error);
      throw error;
    }
  },

  /**
   * الحصول على الدورات المسجل فيها المستخدم
   * @returns {Promise} - Promise مع قائمة الدورات
   */
  getEnrolledCourses: async () => {
    try {
      return await coursesService.getEnrolledCourses();
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      throw error;
    }
  },

  /**
   * فلترة الكورسات بالنظام الهرمي (جديد)
   * @param {Object} params - معلمات الفلترة بما فيها level_id و category_id
   * @returns {Promise} - Promise مع قائمة الكورسات المفلترة
   */
  getHierarchicalFilteredCourses: async (params = {}) => {
    try {
      return await coursesService.getHierarchicalFilteredCourses(params);
    } catch (error) {
      console.error('Error fetching hierarchical filtered courses:', error);
      throw error;
    }
  },

  /**
   * فلترة الكورسات حسب المستوى التعليمي (API جديد)
   * @param {number} educationalLevelId - معرف المستوى التعليمي
   * @param {Object} params - معلمات إضافية (page, per_page, إلخ)
   * @returns {Promise} - Promise مع قائمة الكورسات المفلترة
   */
  getCoursesByEducationalLevel: async (educationalLevelId, params = {}) => {
    try {
      return await coursesService.getCoursesByEducationalLevel(educationalLevelId, params);
    } catch (error) {
      console.error('Error fetching courses by educational level:', error);
      throw error;
    }
  }
};

export default HomeApiService;