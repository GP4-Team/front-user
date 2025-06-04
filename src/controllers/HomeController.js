// src/controllers/HomeController.js
import HomeApiService from '../services/homeApiService';

/**
 * متحكم صفحة الهوم للتعامل مع APIs الحقيقية
 */
const HomeController = {
  /**
   * الحصول على بيانات صفحة الهوم
   * يجمع بيانات الدورات المميزة، الفئات، والاختبارات المميزة
   * 
   * @returns {Promise} - Promise مع بيانات صفحة الهوم
   */
  getHomePageData: async () => {
    try {
      // استدعاء جميع الـ APIs المطلوبة بشكل متوازي
      const [
        featuredCoursesResponse,
        categoriesResponse,
        featuredExamsResponse
      ] = await Promise.allSettled([
        HomeApiService.getFeaturedCourses(),
        HomeApiService.getCategories(),
        HomeApiService.getFeaturedExams()
      ]);
      
      // تحضير البيانات الناتجة
      const result = {
        success: true,
        featuredCourses: {
          success: featuredCoursesResponse.status === 'fulfilled',
          data: featuredCoursesResponse.status === 'fulfilled' ? featuredCoursesResponse.value.data : [],
          error: featuredCoursesResponse.status === 'rejected' ? featuredCoursesResponse.reason : null
        },
        categories: {
          success: categoriesResponse.status === 'fulfilled',
          data: categoriesResponse.status === 'fulfilled' ? categoriesResponse.value.data : [],
          error: categoriesResponse.status === 'rejected' ? categoriesResponse.reason : null
        },
        featuredExams: {
          success: featuredExamsResponse.status === 'fulfilled',
          data: featuredExamsResponse.status === 'fulfilled' ? featuredExamsResponse.value.data : [],
          error: featuredExamsResponse.status === 'rejected' ? featuredExamsResponse.reason : null
        }
      };
      
      return result;
    } catch (error) {
      console.error('Error fetching home page data:', error);
      
      // إعادة الخطأ للتعامل معه في المكونات
      return {
        success: false,
        error: error.message || 'حدث خطأ أثناء جلب بيانات الصفحة الرئيسية'
      };
    }
  },
  
  /**
   * الحصول على بيانات دورات المستخدم
   * تستخدم فقط للمستخدمين المسجلين دخول
   * 
   * @returns {Promise} - Promise مع دورات المستخدم
   */
  getUserCoursesData: async () => {
    try {
      const response = await HomeApiService.getEnrolledCourses();
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching user courses:', error);
      
      return {
        success: false,
        error: error.message || 'حدث خطأ أثناء جلب دورات المستخدم'
      };
    }
  },
  
  /**
   * البحث في الدورات
   * 
   * @param {string} query - نص البحث
   * @returns {Promise} - Promise مع نتائج البحث
   */
  searchCourses: async (query) => {
    try {
      if (!query.trim()) {
        return {
          success: true,
          data: []
        };
      }
      
      const response = await HomeApiService.searchCourses(query);
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error searching courses:', error);
      
      return {
        success: false,
        error: error.message || 'حدث خطأ أثناء البحث عن الدورات'
      };
    }
  },
  
  /**
   * الحصول على دورات حسب المستوى
   * 
   * @param {number} levelId - معرف المستوى
   * @returns {Promise} - Promise مع الدورات
   */
  getCoursesByLevel: async (levelId) => {
    try {
      const response = await HomeApiService.getCoursesByLevel(levelId);
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching courses by level:', error);
      
      return {
        success: false,
        error: error.message || 'حدث خطأ أثناء جلب الدورات حسب المستوى'
      };
    }
  }
};

export default HomeController;