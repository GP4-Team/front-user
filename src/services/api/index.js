// src/services/api/index.js
/**
 * Central API services export
 */

// Import all API services
import coursesService from './courses.service';
import authService from './auth.service';
import materialsService from './materials.service';
import userService from './user.service';
import examsService from './exams.service';

// Import utilities
import { handleApiError, handleAuthError, retryApiCall } from '../utils/errorHandler';

// Export all services
export {
  coursesService,
  authService,
  materialsService,
  userService,
  examsService,
  handleApiError,
  handleAuthError,
  retryApiCall
};

// Default export with all services
export default {
  courses: coursesService,
  auth: authService,
  materials: materialsService,
  user: userService,
  exams: examsService,
  utils: {
    handleApiError,
    handleAuthError,
    retryApiCall
  }
};
