// src/data/mockExamsData/index.js

// استيراد البيانات الأساسية
export { mockExamStatistics } from './statistics';
export { mockAvailableExams } from './availableExams';
export { mockCompletedExams } from './completedExams';
export { mockExamQuestions, questionDisplaySettings } from './questions';

// استيراد الثوابت
export {
  EXAM_STATUS,
  ANSWER_DISPLAY_TYPE,
  QUESTION_TYPE,
  EDUCATION_LEVELS,
  SUBJECT_CATEGORIES,
  EXAM_CATEGORIES,
  DIFFICULTY_LEVELS
} from './constants';

// استيراد الـ utility functions
export {
  findExamById,
  getExamQuestions,
  filterExamsByStatus,
  filterExamsBySubject,
  filterExamsByEducationLevel,
  filterExamsByCategory,
  getAvailableSubjects,
  getAvailableCategories,
  getSubjectStatistics,
  sortExams,
  searchExams,
  applyFilters,
  calculateExamStatistics,
  getExamsByDateRange,
  groupExamsBySubject,
  groupExamsByStatus,
  getRecentExams,
  getAvailableExamsForStudent,
  validateExamData,
  formatExamForAPI
} from './utils';

/**
 * دالة موحدة للحصول على جميع بيانات الامتحانات
 */
export const getAllMockExamData = () => {
  return {
    statistics: mockExamStatistics,
    availableExams: mockAvailableExams,
    completedExams: mockCompletedExams,
    questions: mockExamQuestions,
    pagination: {
      total: mockCompletedExams.length,
      per_page: 10,
      current_page: 1,
      last_page: Math.ceil(mockCompletedExams.length / 10),
      from: 1,
      to: Math.min(10, mockCompletedExams.length)
    },
    summary: {
      total_completed: mockCompletedExams.length,
      passed_count: mockCompletedExams.filter(exam => exam.results?.passed).length,
      failed_count: mockCompletedExams.filter(exam => !exam.results?.passed).length
    }
  };
};

/**
 * دالة للحصول على بيانات وهمية متوافقة مع API
 */
export const getMockDataForAPI = () => {
  return {
    success: true,
    data: {
      statistics: mockExamStatistics,
      availableExams: mockAvailableExams,
      completedExams: mockCompletedExams,
      pagination: {
        total: mockCompletedExams.length,
        per_page: 10,
        current_page: 1,
        last_page: Math.ceil(mockCompletedExams.length / 10),
        from: 1,
        to: Math.min(10, mockCompletedExams.length)
      },
      summary: {
        total_completed: mockCompletedExams.length,
        passed_count: mockCompletedExams.filter(exam => exam.results?.passed).length,
        failed_count: mockCompletedExams.filter(exam => !exam.results?.passed).length
      }
    },
    errors: [] // لا توجد أخطاء في البيانات الوهمية
  };
};

/**
 * دالة لمحاكاة استجابة API للإحصائيات
 */
export const getMockStatisticsAPI = () => {
  return {
    success: true,
    data: mockExamStatistics
  };
};

/**
 * دالة لمحاكاة استجابة API للامتحانات المتاحة
 */
export const getMockAvailableExamsAPI = () => {
  return {
    success: true,
    data: mockAvailableExams
  };
};

/**
 * دالة لمحاكاة استجابة API للامتحانات المكتملة
 */
export const getMockCompletedExamsAPI = (params = {}) => {
  const { page = 1, per_page = 10 } = params;
  const startIndex = (page - 1) * per_page;
  const endIndex = startIndex + per_page;
  const paginatedExams = mockCompletedExams.slice(startIndex, endIndex);
  
  return {
    success: true,
    data: paginatedExams,
    pagination: {
      total: mockCompletedExams.length,
      per_page: per_page,
      current_page: page,
      last_page: Math.ceil(mockCompletedExams.length / per_page),
      from: startIndex + 1,
      to: Math.min(endIndex, mockCompletedExams.length)
    },
    summary: {
      total_completed: mockCompletedExams.length,
      passed_count: mockCompletedExams.filter(exam => exam.results?.passed).length,
      failed_count: mockCompletedExams.filter(exam => !exam.results?.passed).length
    }
  };
};

/**
 * دالة لمحاكاة تأخير API (للتجربة الواقعية)
 */
export const simulateAPIDelay = (ms = 1000) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * دالة لمحاكاة أخطاء API (للاختبار)
 */
export const simulateAPIError = (errorMessage = 'خطأ في الخادم') => {
  return {
    success: false,
    error: errorMessage,
    data: null
  };
};

/**
 * إعدادات التشغيل للبيانات الوهمية
 */
export const mockDataConfig = {
  enabled: true,
  networkDelay: {
    min: 500,
    max: 2000
  },
  errorRate: 0.1,
  possibleErrors: [
    'فشل في الاتصال بالخادم',
    'انتهت مهلة الطلب',
    'خطأ في قاعدة البيانات',
    'الخدمة غير متاحة مؤقتاً'
  ],
  logging: {
    enabled: true,
    level: 'info'
  }
};

/**
 * دالة مساعدة لتسجيل العمليات
 */
export const logMockOperation = (operation, data = null) => {
  if (!mockDataConfig.logging.enabled) return;
  
  const timestamp = new Date().toISOString();
  const logMessage = `[MOCK DATA] ${timestamp} - ${operation}`;
  
  console.log(logMessage, data || '');
};

/**
 * دالة محاكاة استجابة API مع معالجة شاملة
 */
export const simulateAPIResponse = async (operation, data = null, options = {}) => {
  const {
    forceError = false,
    customDelay = null,
    customErrorMessage = null
  } = options;
  
  // تسجيل العملية
  logMockOperation(`Starting ${operation}`, data);
  
  // محاكاة تأخير الشبكة
  const delay = customDelay !== null ? customDelay : 
    Math.random() * (mockDataConfig.networkDelay.max - mockDataConfig.networkDelay.min) + 
    mockDataConfig.networkDelay.min;
  
  await simulateAPIDelay(delay);
  
  // محاكاة أخطاء عشوائية
  const shouldError = forceError || (Math.random() < mockDataConfig.errorRate);
  
  if (shouldError) {
    const errorMessage = customErrorMessage || 
      mockDataConfig.possibleErrors[Math.floor(Math.random() * mockDataConfig.possibleErrors.length)];
    
    logMockOperation(`Error in ${operation}`, errorMessage);
    return simulateAPIError(errorMessage);
  }
  
  // نجاح العملية
  logMockOperation(`Success in ${operation}`);
  
  // إرجاع البيانات حسب نوع العملية
  switch (operation) {
    case 'getAllExamsData':
      return getMockDataForAPI();
    case 'getStatistics':
      return getMockStatisticsAPI();
    case 'getAvailableExams':
      return getMockAvailableExamsAPI();
    case 'getCompletedExams':
      return getMockCompletedExamsAPI(data);
    default:
      return {
        success: true,
        data: data || null
      };
  }
};

// تصدير افتراضي للاستخدام السهل
export default {
  statistics: mockExamStatistics,
  availableExams: mockAvailableExams,
  completedExams: mockCompletedExams,
  questions: mockExamQuestions,
  getAllData: getAllMockExamData,
  getForAPI: getMockDataForAPI,
  simulate: simulateAPIResponse,
  config: mockDataConfig
};
