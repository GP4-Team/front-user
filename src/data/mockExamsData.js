// src/data/mockExamsData.js
// ملف موحد للبيانات الوهمية للامتحانات - يمكن استخدامه مباشرة

// استيراد جميع البيانات والوظائف من المجلد المقسم
export {
  // البيانات الأساسية
  mockExamStatistics,
  mockAvailableExams,
  mockCompletedExams,
  mockExamQuestions,
  
  // الثوابت
  EXAM_STATUS,
  ANSWER_DISPLAY_TYPE,
  QUESTION_TYPE,
  EDUCATION_LEVELS,
  SUBJECT_CATEGORIES,
  EXAM_CATEGORIES,
  DIFFICULTY_LEVELS,
  
  // الوظائف المساعدة
  findExamById,
  getExamQuestions,
  filterExamsByStatus,
  filterExamsBySubject,
  getAvailableSubjects,
  getSubjectStatistics,
  sortExams,
  searchExams,
  applyFilters,
  calculateExamStatistics,
  
  // وظائف محاكاة API
  getAllMockExamData,
  getMockDataForAPI,
  getMockStatisticsAPI,
  getMockAvailableExamsAPI,
  getMockCompletedExamsAPI,
  simulateAPIResponse,
  simulateAPIDelay,
  simulateAPIError,
  
  // الإعدادات
  mockDataConfig,
  logMockOperation,
  questionDisplaySettings
} from './mockExamsData/index';

// تصدير افتراضي للوصول السريع
import mockExamsDataDefault from './mockExamsData/index';
export default mockExamsDataDefault;
