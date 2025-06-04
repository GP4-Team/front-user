// src/utils/apiTester.js
import api from '../services/api';

/**
 * اختبار نقاط نهاية API للتأكد من أنها تعمل
 */
const ApiTester = {
  /**
   * اختبار نقطة نهاية محددة
   * 
   * @param {string} endpoint - نقطة النهاية المراد اختبارها
   * @param {Object} params - المعلمات الاختيارية للطلب
   * @returns {Promise} - Promise مع نتيجة الاختبار
   */
  testEndpoint: async (endpoint, params = {}) => {
    try {
      const startTime = new Date().getTime();
      const response = await api.get(endpoint, { params });
      const endTime = new Date().getTime();
      
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
        duration: `${endTime - startTime}ms`,
        endpoint
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        statusCode: error.response?.status,
        data: error.response?.data,
        endpoint
      };
    }
  },
  
  /**
   * اختبار جميع نقاط النهاية الرئيسية
   * 
   * @returns {Promise} - Promise مع نتائج جميع الاختبارات
   */
  testAllEndpoints: async () => {
    // قائمة بنقاط النهاية الرئيسية التي نريد اختبارها
    const endpoints = [
      '/courses',
      '/courses/featured',
      '/courses/education-categories',
      '/courses/education-levels',
      '/materials/course/1' // اختبار مع معرف دورة محدد
    ];
    
    // اختبار كل نقطة نهاية بشكل متوازٍ
    const results = await Promise.all(
      endpoints.map(endpoint => ApiTester.testEndpoint(endpoint))
    );
    
    return {
      allTests: results,
      summary: {
        total: results.length,
        success: results.filter(result => result.success).length,
        failed: results.filter(result => !result.success).length
      }
    };
  }
};

export default ApiTester;