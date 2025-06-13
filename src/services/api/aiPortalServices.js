// src/services/api/aiPortalServices.js
/**
 * AI Portal Services - Complete integration with all AI APIs
 */
import api from '../api';

// ============ WEAKNESS PORTAL API ============
export class AIWeaknessService {
  /**
   * Get student weakness analysis from /student/ai/weakness/portal
   */
  async getStudentWeaknesses() {
    try {
      console.log('🧠 [AIWeaknessService] Getting student weaknesses...');
      
      const response = await api.get('/student/ai/weakness/portal');
      
      if (response.data && response.data.success) {
        console.log('✅ [AIWeaknessService] Weakness data loaded successfully');
        console.log('📊 [AIWeaknessService] Student ID:', response.data.data.student_id);
        console.log('📊 [AIWeaknessService] Weaknesses count:', response.data.data.weaknesses?.length || 0);
        console.log('📊 [AIWeaknessService] Overall score:', response.data.data.overall_score);
        
        return {
          success: true,
          data: response.data.data,
          meta: response.data.meta
        };
      }
      
      throw new Error(response.data?.message || 'Failed to load weakness data');
    } catch (error) {
      console.error('❌ [AIWeaknessService] Error loading weaknesses:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'خطأ في تحميل بيانات نقاط الضعف',
        status: error.response?.status
      };
    }
  }

  /**
   * Get quiz explanation from /student/ai/quiz/explain/{recommendationId}
   */
  async getQuizExplanation(recommendationId) {
    try {
      console.log(`🧠 [AIWeaknessService] Getting explanation for recommendation ${recommendationId}...`);
      
      const response = await api.get(`/student/ai/quiz/explain/${recommendationId}`, {
        params: { recommendationId }
      });
      
      if (response.data && response.data.success) {
        console.log('✅ [AIWeaknessService] Explanation loaded successfully');
        console.log('📊 [AIWeaknessService] AI confidence:', response.data.data.reasoning_details?.ai_confidence_level);
        
        return {
          success: true,
          data: response.data.data,
          meta: response.data.meta
        };
      }
      
      throw new Error(response.data?.message || 'Failed to load explanation');
    } catch (error) {
      console.error('❌ [AIWeaknessService] Error loading explanation:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'خطأ في تحميل شرح التوصية',
        status: error.response?.status
      };
    }
  }
}

// ============ COURSE SEARCH API ============
export class CourseSearchService {
  /**
   * Search courses from /courses/search/{searchTerm}
   */
  async searchCourses(searchTerm) {
    try {
      console.log(`🔍 [CourseSearchService] Searching courses for: "${searchTerm}"`);
      
      const response = await api.get(`/courses/search/${encodeURIComponent(searchTerm)}`);
      
      if (response.data && response.data.success) {
        console.log('✅ [CourseSearchService] Courses found:', response.data.data?.length || 0);
        
        return {
          success: true,
          data: response.data.data || [],
          total: response.data.data?.length || 0
        };
      }
      
      throw new Error(response.data?.message || 'Failed to search courses');
    } catch (error) {
      console.error('❌ [CourseSearchService] Error searching courses:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'خطأ في البحث عن الكورسات',
        status: error.response?.status,
        data: []
      };
    }
  }

  /**
   * Get available courses for quiz generation
   */
  async getAvailableCourses() {
    try {
      console.log('📚 [CourseSearchService] Getting available courses...');
      
      // You can implement this with a general search or specific endpoint
      const response = await api.get('/courses'); // Adjust endpoint as needed
      
      if (response.data && response.data.success) {
        console.log('✅ [CourseSearchService] Available courses loaded');
        
        return {
          success: true,
          data: response.data.data || []
        };
      }
      
      throw new Error(response.data?.message || 'Failed to load courses');
    } catch (error) {
      console.error('❌ [CourseSearchService] Error loading courses:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'خطأ في تحميل الكورسات',
        data: []
      };
    }
  }
}

// ============ QUIZ GENERATION API ============
export class AIQuizService {
  /**
   * Generate AI quiz from /student/ai/quiz/generate
   */
  async generateQuiz(quizData) {
    try {
      console.log('🤖 [AIQuizService] Generating AI quiz with data:', quizData);
      
      // Validate required fields
      if (!quizData.course_id) {
        throw new Error('Course ID is required');
      }
      
      if (!quizData.num_questions || quizData.num_questions < 1) {
        throw new Error('Number of questions must be at least 1');
      }
      
      if (!quizData.time_limit_minutes || quizData.time_limit_minutes < 5) {
        throw new Error('Time limit must be at least 5 minutes');
      }
      
      const response = await api.post('/student/ai/quiz/generate', {
        course_id: parseInt(quizData.course_id),
        num_questions: parseInt(quizData.num_questions),
        time_limit_minutes: parseInt(quizData.time_limit_minutes),
        allow_stretch: Boolean(quizData.allow_stretch)
      });
      
      if (response.data && response.data.success) {
        console.log('✅ [AIQuizService] Quiz generated successfully');
        console.log('📊 [AIQuizService] Online exam ID:', response.data.data.online_exam_id);
        console.log('📊 [AIQuizService] Questions count:', response.data.data.questions_count);
        console.log('📊 [AIQuizService] Duration:', response.data.data.duration_in_seconds, 'seconds');
        
        return {
          success: true,
          data: response.data.data,
          message: response.data.message
        };
      }
      
      throw new Error(response.data?.message || 'Failed to generate quiz');
    } catch (error) {
      console.error('❌ [AIQuizService] Error generating quiz:', error);
      
      // Handle validation errors
      if (error.response?.status === 422) {
        const validationErrors = error.response.data?.errors || {};
        const errorMessages = Object.values(validationErrors).flat();
        return {
          success: false,
          message: errorMessages.join(', ') || 'بيانات الامتحان غير صحيحة',
          errors: validationErrors,
          status: 422
        };
      }
      
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'خطأ في إنشاء الامتحان',
        status: error.response?.status
      };
    }
  }
}

// ============ RECOMMENDATIONS HISTORY API ============
export class RecommendationHistoryService {
  /**
   * Get quiz recommendations history from /student/ai/quiz/recommendations/history
   */
  async getRecommendationsHistory(filters = {}) {
    try {
      console.log('📜 [RecommendationHistoryService] Getting recommendations history with filters:', filters);
      
      const params = {};
      
      // Add optional filters
      if (filters.course_id) {
        params.course_id = parseInt(filters.course_id);
      }
      
      if (filters.limit) {
        params.limit = Math.min(Math.max(parseInt(filters.limit), 1), 50); // Between 1-50
      }
      
      if (filters.purpose && ['practice', 'assessment', 'review', 'challenge'].includes(filters.purpose)) {
        params.purpose = filters.purpose;
      }
      
      if (filters.date_from) {
        params.date_from = filters.date_from; // YYYY-MM-DD format
      }
      
      if (filters.date_to) {
        params.date_to = filters.date_to; // YYYY-MM-DD format
      }
      
      const response = await api.get('/student/ai/quiz/recommendations/history', { params });
      
      if (response.data && response.data.success) {
        console.log('✅ [RecommendationHistoryService] Recommendations loaded successfully');
        console.log('📊 [RecommendationHistoryService] Total recommendations:', response.data.data.total_count);
        console.log('📊 [RecommendationHistoryService] Returned recommendations:', response.data.data.recommendations?.length || 0);
        
        return {
          success: true,
          data: response.data.data,
          meta: response.data.meta
        };
      }
      
      throw new Error(response.data?.message || 'Failed to load recommendations history');
    } catch (error) {
      console.error('❌ [RecommendationHistoryService] Error loading recommendations:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'خطأ في تحميل تاريخ التوصيات',
        status: error.response?.status,
        data: { recommendations: [], total_count: 0 }
      };
    }
  }
}

// Create service instances
export const aiWeaknessService = new AIWeaknessService();
export const courseSearchService = new CourseSearchService();
export const aiQuizService = new AIQuizService();
export const recommendationHistoryService = new RecommendationHistoryService();

// Export default object with all services
const aiPortalServices = {
  weakness: aiWeaknessService,
  courseSearch: courseSearchService,
  quiz: aiQuizService,
  recommendations: recommendationHistoryService
};

export default aiPortalServices;
