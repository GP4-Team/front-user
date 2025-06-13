// src/services/api/examDetailsService.js
/**
 * خدمة API لجلب تفاصيل الامتحان الفردي
 * Online Exam Details API Service
 */
import api from '../api';

class ExamDetailsService {
  /**
   * جلب تفاصيل الامتحان مع حالة الطالب
   * Get exam details with student status
   * @param {number} examId - معرف الامتحان
   * @returns {Promise} - تفاصيل الامتحان
   */
  async getExamDetails(examId) {
    try {
      console.log(`📋 [ExamDetailsService] Getting details for exam ${examId}`);
      
      // Try GET method first (newer API)
      const response = await api.get(`/examination/online-exams/${examId}`);
      
      if (response.data && response.data.success) {
        console.log('✅ [ExamDetailsService] Exam details loaded successfully (GET method)');
        console.log(`📊 [ExamDetailsService] Exam Status: ${response.data.data.status}`);
        console.log(`📝 [ExamDetailsService] Exam Name: ${response.data.data.name}`);
        
        return {
          success: true,
          data: response.data.data
        };
      }
      
      throw new Error(response.data?.message || 'Failed to load exam details');
    } catch (error) {
      console.error('❌ [ExamDetailsService] GET method failed, trying POST method:', error);
      
      // Fallback to POST method if GET fails
      try {
        const postResponse = await api.post('/examination/online-exams', {
          id: parseInt(examId)
        });
        
        if (postResponse.data && postResponse.data.success) {
          console.log('✅ [ExamDetailsService] Exam details loaded successfully (POST method)');
          console.log(`📊 [ExamDetailsService] Exam Status: ${postResponse.data.data.status}`);
          console.log(`📝 [ExamDetailsService] Exam Name: ${postResponse.data.data.name}`);
          
          return {
            success: true,
            data: postResponse.data.data
          };
        }
        
        throw new Error(postResponse.data?.message || 'Failed to load exam details');
      } catch (postError) {
        console.error('❌ [ExamDetailsService] Both GET and POST methods failed:', postError);
        
        // Handle specific error cases
        if (postError.response?.status === 404) {
          return {
            success: false,
            message: 'الامتحان غير موجود أو غير متاح',
            status: 404
          };
        }
        
        if (postError.response?.status === 403) {
          return {
            success: false,
            message: 'غير مصرح لك بالوصول لهذا الامتحان',
            status: 403
          };
        }
        
        if (postError.response?.status === 422) {
          return {
            success: false,
            message: 'معرف الامتحان غير صحيح',
            status: 422
          };
        }
        
        return {
          success: false,
          message: postError.response?.data?.message || postError.message || 'خطأ في تحميل تفاصيل الامتحان',
          status: postError.response?.status
        };
      }
    }
  }

  /**
   * جلب تفاصيل الامتحان باستخدام POST method
   * Get exam details using POST method
   * @param {number} examId - معرف الامتحان
   * @returns {Promise} - تفاصيل الامتحان
   */
  async getExamDetailsPost(examId) {
    try {
      console.log(`📋 [ExamDetailsService] Getting details for exam ${examId} using POST method`);
      
      const response = await api.post('/examination/online-exams', {
        id: parseInt(examId)
      });
      
      if (response.data && response.data.success) {
        console.log('✅ [ExamDetailsService] Exam details loaded successfully');
        console.log(`📊 [ExamDetailsService] Exam Status: ${response.data.data.status}`);
        console.log(`📝 [ExamDetailsService] Exam Name: ${response.data.data.name}`);
        
        return {
          success: true,
          data: response.data.data
        };
      }
      
      throw new Error(response.data?.message || 'Failed to load exam details');
    } catch (error) {
      console.error('❌ [ExamDetailsService] Error loading exam details:', error);
      
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
      
      if (error.response?.status === 422) {
        return {
          success: false,
          message: 'معرف الامتحان غير صحيح',
          status: 422
        };
      }
      
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'خطأ في تحميل تفاصيل الامتحان',
        status: error.response?.status
      };
    }
  }
}

// تصدير كـ singleton
const examDetailsService = new ExamDetailsService();
export default examDetailsService;
