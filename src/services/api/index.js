// Central API exports for all services
import apiClient from './apiClient';

// Import examination service - الخدمة الأساسية المطلوبة
import examinationServiceDefault from './examinationService';

// Import legacy API safely
let api;
try {
  api = require('../api').default;
} catch (e) {
  console.warn('Legacy api not found, using apiClient as fallback');
  api = apiClient;
}

// Import other services safely
let authService, coursesService, examsService, materialsService, userService, weaknessService;
let aiWeaknessService, quizService, recommendationService, examStatisticsService;

try {
  authService = require('./auth.service').default;
} catch (e) { 
  console.warn('auth.service not found'); 
  authService = null;
}

try {
  coursesService = require('./courses.service').default;
} catch (e) { 
  console.warn('courses.service not found'); 
  coursesService = null;
}

try {
  examsService = require('./exams.service').default;
} catch (e) { 
  console.warn('exams.service not found'); 
  examsService = null;
}

try {
  materialsService = require('./materials.service').default;
} catch (e) { 
  console.warn('materials.service not found'); 
  materialsService = null;
}

try {
  userService = require('./user.service').default;
} catch (e) { 
  console.warn('user.service not found'); 
  userService = null;
}

try {
  weaknessService = require('./weakness.service').default;
} catch (e) { 
  console.warn('weakness.service not found'); 
  weaknessService = null;
}

// AI Services (optional)
try {
  const aiWeaknessModule = require('./aiWeaknessService');
  aiWeaknessService = aiWeaknessModule.default || aiWeaknessModule.aiWeaknessService;
} catch (e) { 
  console.warn('aiWeaknessService not found'); 
  aiWeaknessService = null;
}

try {
  const quizModule = require('./quizService');
  quizService = quizModule.default || quizModule.quizService;
} catch (e) { 
  console.warn('quizService not found'); 
  quizService = null;
}

try {
  const recommendationModule = require('./recommendationService');
  recommendationService = recommendationModule.default || recommendationModule.recommendationService;
} catch (e) { 
  console.warn('recommendationService not found'); 
  recommendationService = null;
}

try {
  const examStatsModule = require('./examStatisticsService');
  examStatisticsService = examStatsModule.default || examStatsModule.examStatisticsService;
} catch (e) { 
  console.warn('examStatisticsService not found'); 
  examStatisticsService = null;
}

// CSRF token functions for backward compatibility
export const initCsrfToken = async () => {
  try {
    await api.get('/sanctum/csrf-cookie');
    return true;
  } catch (error) {
    console.error('Failed to initialize CSRF token:', error);
    return false;
  }
};

export const refreshCsrfToken = async () => {
  try {
    await api.get('/sanctum/csrf-cookie');
    return true;
  } catch (error) {
    console.error('Failed to refresh CSRF token:', error);
    return false;
  }
};

export const testApiConnection = async () => {
  try {
    const response = await api.get('/test');
    return {
      success: true,
      data: response.data,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
};

// Export all existing services
export {
  // Legacy services
  authService,
  coursesService,
  examsService,
  materialsService,
  userService,
  weaknessService,
  
  // AI services
  aiWeaknessService,
  quizService,
  recommendationService,
  examStatisticsService,
  
  // Main examination service
  examinationServiceDefault as examinationService,
  
  // API Client
  apiClient
};

// Default export with all services
export default {
  // Legacy services
  auth: authService,
  courses: coursesService,
  exams: examsService,
  materials: materialsService,
  user: userService,
  weakness: weaknessService,
  
  // AI services
  aiWeakness: aiWeaknessService,
  quiz: quizService,
  recommendation: recommendationService,
  examStatistics: examStatisticsService,
  
  // Main examination service
  examination: examinationServiceDefault,
  
  // API clients
  client: apiClient,
  api: api,
  
  // Utility functions
  initCsrfToken,
  refreshCsrfToken,
  testApiConnection
};
