// Fallback Examination Service - For when real API is not available
import { mockExamsData } from '../../data/mockData';

/**
 * Fallback Examination Service - Returns mock data when real API fails
 */
const fallbackExaminationService = {
  
  /**
   * Get exam statistics (mock data)
   * @returns {Promise<Object>} Mock exam statistics data
   */
  async getExamStatistics() {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        success: true,
        data: {
          totalExams: 15,
          completedExams: 8,
          averageScore: 75.5,
          highestScore: 92,
          pendingExams: 7
        },
        meta: {
          source: 'fallback',
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Error in fallback exam statistics:', error);
      return {
        success: false,
        error: 'Failed to fetch fallback exam statistics',
        data: {
          totalExams: 0,
          completedExams: 0,
          averageScore: 0,
          highestScore: 0,
          pendingExams: 0
        }
      };
    }
  },

  /**
   * Get available exams (mock data)
   * @returns {Promise<Object>} Mock available exams data
   */
  async getAvailableExams() {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const availableExams = [
        {
          id: 1,
          name: "تقييم الكيمياء العامة - الدرس 3",
          description: "اختبار تقييمي شامل للكيمياء العامة",
          question_number: 20,
          duration_formatted: "45:00",
          allowed_chances: 2,
          remaining_chances: 2,
          course: { name: "الكيمياء العامة" },
          education_level: { name: "الصف الأول الثانوي" },
          exam_category: { name: "تقييم مستمر" },
          status: "available",
          difficulty: "متوسط"
        },
        {
          id: 2,
          name: "اختبار الرياضيات - الجبر",
          description: "اختبار في الجبر والمعادلات",
          question_number: 15,
          duration_formatted: "30:00",
          allowed_chances: 3,
          remaining_chances: 3,
          course: { name: "الرياضيات" },
          education_level: { name: "الصف الثاني الثانوي" },
          exam_category: { name: "اختبار شهري" },
          status: "available",
          difficulty: "سهل"
        }
      ];
      
      return {
        success: true,
        data: availableExams,
        meta: {
          source: 'fallback',
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Error in fallback available exams:', error);
      return {
        success: false,
        error: 'Failed to fetch fallback available exams',
        data: []
      };
    }
  },

  /**
   * Get completed exams (mock data)
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} Mock completed exams data
   */
  async getCompletedExams(params = {}) {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const completedExams = [
        {
          id: 3,
          name: "الاختبار النهائي - الفيزياء",
          description: "الاختبار النهائي للفصل الدراسي",
          question_number: 25,
          duration_formatted: "1:30:00",
          allowed_chances: 1,
          remaining_chances: 0,
          course: { name: "الفيزياء" },
          education_level: { name: "الصف الثالث الثانوي" },
          exam_category: { name: "اختبار نهائي" },
          status: "completed",
          score: 85,
          grade: "جيد جداً",
          completed_at: "2024-11-20T10:30:00Z",
          time_taken: "1:15:30"
        },
        {
          id: 4,
          name: "تقييم الأدب العربي - الشعر",
          description: "تقييم في الشعر العربي القديم",
          question_number: 18,
          duration_formatted: "40:00",
          allowed_chances: 2,
          remaining_chances: 1,
          course: { name: "الأدب العربي" },
          education_level: { name: "الصف الثالث الثانوي" },
          exam_category: { name: "تقييم مستمر" },
          status: "completed",
          score: 78,
          grade: "جيد",
          completed_at: "2024-11-18T14:20:00Z",
          time_taken: "35:45"
        }
      ];
      
      return {
        success: true,
        data: completedExams,
        pagination: {
          total: completedExams.length,
          per_page: 10,
          current_page: 1,
          last_page: 1,
          from: 1,
          to: completedExams.length
        },
        summary: {
          total_completed: completedExams.length,
          passed_count: 2,
          failed_count: 0
        },
        meta: {
          source: 'fallback',
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Error in fallback completed exams:', error);
      return {
        success: false,
        error: 'Failed to fetch fallback completed exams',
        data: [],
        pagination: {
          total: 0,
          per_page: 10,
          current_page: 1,
          last_page: 0,
          from: 1,
          to: 0
        },
        summary: {
          total_completed: 0,
          passed_count: 0,
          failed_count: 0
        }
      };
    }
  },

  /**
   * Get all exams data (combines available and completed)
   * @returns {Promise<Object>} All mock exams data
   */
  async getAllExamsData() {
    try {
      const [statisticsResult, availableResult, completedResult] = await Promise.allSettled([
        this.getExamStatistics(),
        this.getAvailableExams(),
        this.getCompletedExams()
      ]);

      const statistics = statisticsResult.status === 'fulfilled' && statisticsResult.value.success 
        ? statisticsResult.value.data 
        : {
            totalExams: 0,
            completedExams: 0,
            averageScore: 0,
            highestScore: 0,
            pendingExams: 0
          };

      const availableExams = availableResult.status === 'fulfilled' && availableResult.value.success 
        ? availableResult.value.data 
        : [];

      const completedExamsData = completedResult.status === 'fulfilled' && completedResult.value.success 
        ? completedResult.value 
        : { 
            data: [], 
            pagination: {
              total: 0,
              per_page: 10,
              current_page: 1,
              last_page: 0,
              from: 1,
              to: 0
            },
            summary: {
              total_completed: 0,
              passed_count: 0,
              failed_count: 0
            }
          };

      return {
        success: true,
        data: {
          statistics,
          availableExams,
          completedExams: completedExamsData.data,
          pagination: completedExamsData.pagination,
          summary: completedExamsData.summary
        },
        meta: {
          source: 'fall