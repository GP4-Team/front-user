// src/services/examProgressService.js

/**
 * Exam Progress Service
 * Handles exam status calculation and progress tracking
 * Based on backend ExamProgressService logic
 */

export const EXAM_STATUS = {
  START: 'start',
  CONTINUE: 'continue', 
  REVISION: 'revision',
  RETRY: 'retry',
  UNAVAILABLE: 'unavailable',
  NONE: 'none'
};

export const EXAM_STATUS_LABELS = {
  [EXAM_STATUS.START]: {
    en: 'Start Exam',
    ar: 'بدء الامتحان'
  },
  [EXAM_STATUS.CONTINUE]: {
    en: 'Continue Exam',
    ar: 'متابعة الامتحان'
  },
  [EXAM_STATUS.REVISION]: {
    en: 'Review Answers',
    ar: 'مراجعة الإجابات'
  },
  [EXAM_STATUS.RETRY]: {
    en: 'Retry Exam',
    ar: 'إعادة المحاولة'
  },
  [EXAM_STATUS.UNAVAILABLE]: {
    en: 'Unavailable',
    ar: 'غير متاح'
  },
  [EXAM_STATUS.NONE]: {
    en: 'No Action',
    ar: 'لا يوجد إجراء'
  }
};

export const EXAM_STATUS_COLORS = {
  [EXAM_STATUS.START]: {
    light: 'bg-green-100 text-green-800 border-green-200',
    dark: 'bg-green-900/30 text-green-400 border-green-700'
  },
  [EXAM_STATUS.CONTINUE]: {
    light: 'bg-blue-100 text-blue-800 border-blue-200',
    dark: 'bg-blue-900/30 text-blue-400 border-blue-700'
  },
  [EXAM_STATUS.REVISION]: {
    light: 'bg-orange-100 text-orange-800 border-orange-200',
    dark: 'bg-orange-900/30 text-orange-400 border-orange-700'
  },
  [EXAM_STATUS.RETRY]: {
    light: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    dark: 'bg-yellow-900/30 text-yellow-400 border-yellow-700'
  },
  [EXAM_STATUS.UNAVAILABLE]: {
    light: 'bg-gray-100 text-gray-800 border-gray-200',
    dark: 'bg-gray-900/30 text-gray-400 border-gray-700'
  },
  [EXAM_STATUS.NONE]: {
    light: 'bg-gray-50 text-gray-600 border-gray-100',
    dark: 'bg-gray-800/30 text-gray-500 border-gray-600'
  }
};

/**
 * Get exam status label based on language
 * @param {string} status - Exam status
 * @param {string} language - Language code (en/ar)
 * @returns {string} Status label
 */
export const getExamStatusLabel = (status, language = 'en') => {
  return EXAM_STATUS_LABELS[status]?.[language] || EXAM_STATUS_LABELS[EXAM_STATUS.NONE][language];
};

/**
 * Get exam status colors based on theme
 * @param {string} status - Exam status
 * @param {boolean} isDarkMode - Theme mode
 * @returns {string} CSS classes for styling
 */
export const getExamStatusColors = (status, isDarkMode = false) => {
  const colors = EXAM_STATUS_COLORS[status] || EXAM_STATUS_COLORS[EXAM_STATUS.NONE];
  return isDarkMode ? colors.dark : colors.light;
};

/**
 * Determine if exam action button should be enabled
 * @param {string} status - Exam status
 * @returns {boolean} Whether button should be enabled
 */
export const isExamActionEnabled = (status) => {
  return [
    EXAM_STATUS.START,
    EXAM_STATUS.CONTINUE,
    EXAM_STATUS.REVISION,
    EXAM_STATUS.RETRY
  ].includes(status);
};

/**
 * Get exam action button type
 * @param {string} status - Exam status
 * @returns {string} Button variant/type
 */
export const getExamActionType = (status) => {
  switch (status) {
    case EXAM_STATUS.START:
    case EXAM_STATUS.RETRY:
      return 'primary';
    case EXAM_STATUS.CONTINUE:
      return 'warning';
    case EXAM_STATUS.REVISION:
      return 'info';
    default:
      return 'default';
  }
};

/**
 * Parse exam data received from API - Handle nested API response structure
 * @param {Object} examData - Raw exam data from API
 * @returns {Object} Formatted exam data
 */
export const parseExamData = (examData) => {
  if (!examData) {
    console.warn('⚠️ [parseExamData] Received null or undefined exam data');
    return null;
  }

  // Debug: Log the exact structure we received
  console.log('⚙️ [parseExamData] Raw exam data received:');
  console.log('Data keys:', Object.keys(examData));
  console.log('Full data:', JSON.stringify(examData, null, 2));

  // Handle nested API response structure
  // API returns: { success: true, data: { actual exam data } }
  const actualExamData = examData.data || examData;
  
  // Return the actual exam data with minimal processing
  const result = {
    // Keep original structure
    ...actualExamData,
    
    // Ensure we have these common fields for UI compatibility
    id: actualExamData.id,
    name: actualExamData.name,
    title: actualExamData.name, // Use name as title
    
    // Keep reference to original API response
    originalData: examData
  };

  console.log('✅ [parseExamData] Processed result:');
  console.log('Result keys:', Object.keys(result));
  console.log('Actual exam data extracted:', actualExamData);
  
  return result;
};

/**
 * Format exam duration for display
 * @param {number} duration - Duration in minutes
 * @param {string} language - Language code
 * @returns {string} Formatted duration string
 */
export const formatExamDuration = (duration, language = 'en') => {
  if (!duration) return language === 'ar' ? 'غير محدد' : 'Not specified';
  
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  
  if (language === 'ar') {
    if (hours > 0 && minutes > 0) {
      return `${hours} ساعة و ${minutes} دقيقة`;
    } else if (hours > 0) {
      return `${hours} ساعة`;
    } else {
      return `${minutes} دقيقة`;
    }
  } else {
    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  }
};

/**
 * Calculate exam progress percentage
 * @param {Object} examData - Exam data
 * @returns {number} Progress percentage (0-100)
 */
export const calculateExamProgress = (examData) => {
  if (!examData) return 0;
  
  const { status, timeRemaining, duration } = examData;
  
  switch (status) {
    case EXAM_STATUS.START:
      return 0;
    case EXAM_STATUS.CONTINUE:
      if (timeRemaining && duration) {
        return Math.round(((duration - timeRemaining) / duration) * 100);
      }
      return 50; // Default for in-progress
    case EXAM_STATUS.REVISION:
    case EXAM_STATUS.RETRY:
      return 100;
    default:
      return 0;
  }
};

/**
 * Check if exam is currently active/available
 * @param {Object} examData - Exam data
 * @returns {boolean} Whether exam is active
 */
export const isExamActive = (examData) => {
  if (!examData) return false;
  
  return [
    EXAM_STATUS.START,
    EXAM_STATUS.CONTINUE,
    EXAM_STATUS.REVISION,
    EXAM_STATUS.RETRY
  ].includes(examData.status);
};

export default {
  EXAM_STATUS,
  EXAM_STATUS_LABELS,
  EXAM_STATUS_COLORS,
  getExamStatusLabel,
  getExamStatusColors,
  isExamActionEnabled,
  getExamActionType,
  parseExamData,
  formatExamDuration,
  calculateExamProgress,
  isExamActive
};
