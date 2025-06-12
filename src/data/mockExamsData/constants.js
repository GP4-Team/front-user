// src/data/mockExamsData/constants.js
import { EXAM_STATUS } from '../../services/examProgressService';

/**
 * Answer Display Types - تحديد متى وكيف تظهر الإجابات
 */
export const ANSWER_DISPLAY_TYPE = {
  IMMEDIATE: 'immediate',      // تظهر الإجابة الصحيحة فوراً بعد الإجابة
  POST_EXAM: 'post_exam',     // تظهر الإجابات الصحيحة بعد انتهاء الامتحان
  ANSWERS_ONLY: 'answers_only' // تظهر إجاباتي فقط بدون الإجابات الصحيحة
};

/**
 * Question Types - أنواع الأسئلة
 */
export const QUESTION_TYPE = {
  MULTIPLE_CHOICE: 'multiple_choice',
  TRUE_FALSE: 'true_false',
  FILL_BLANK: 'fill_blank',
  ESSAY: 'essay'
};

/**
 * Education Levels - المستويات التعليمية
 */
export const EDUCATION_LEVELS = {
  ELEMENTARY: 'elementary',
  MIDDLE: 'middle', 
  HIGH: 'high',
  UNIVERSITY: 'university'
};

/**
 * Subject Categories - فئات المواد
 */
export const SUBJECT_CATEGORIES = {
  SCIENCE: 'science',
  MATH: 'math',
  LANGUAGE: 'language',
  COMPUTER: 'computer',
  ENGINEERING: 'engineering'
};

/**
 * Exam Categories - فئات الامتحانات
 */
export const EXAM_CATEGORIES = {
  DAILY: 'اختبار يومي',
  WEEKLY: 'امتحان أسبوعي',
  MONTHLY: 'تقييم شهري',
  MIDTERM: 'امتحان نصف الفصل',
  FINAL: 'امتحان نهائي',
  PLACEMENT: 'اختبار تحديد مستوى',
  RETRY: 'إعادة امتحان',
  SPECIALTY: 'امتحان تخصص'
};

/**
 * Difficulty Levels - مستويات الصعوبة
 */
export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};

// إعادة تصدير حالات الامتحان من examProgressService
export { EXAM_STATUS };
