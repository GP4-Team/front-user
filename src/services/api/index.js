// src/services/api/index.js
import AuthService from './auth.service';
import CoursesService from './courses.service';
import ExamsService from './exams.service';
import apiClient from './client';

// تصدير جميع خدمات API كحزمة واحدة
export {
  AuthService,
  CoursesService,
  ExamsService,
  apiClient
};