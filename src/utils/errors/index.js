// src/utils/errors/index.js
import AppError from './AppError';
import ErrorHandler from './ErrorHandler';
import { 
  ERROR_TYPES,
  AUTH_ERRORS,
  NETWORK_ERRORS,
  SERVER_ERRORS,
  DATA_ERRORS, 
  COURSE_ERRORS,
  EXAM_ERRORS,
  PAYMENT_ERRORS,
  FILE_ERRORS,
  OTHER_ERRORS 
} from './ErrorTypes';

// تصدير جميع مكونات معالجة الخطأ
export {
  AppError,
  ErrorHandler,
  ERROR_TYPES,
  AUTH_ERRORS,
  NETWORK_ERRORS,
  SERVER_ERRORS,
  DATA_ERRORS,
  COURSE_ERRORS,
  EXAM_ERRORS,
  PAYMENT_ERRORS,
  FILE_ERRORS,
  OTHER_ERRORS
};

/**
 * دالة مساعدة لمعالجة أخطاء API
 * تستخدم في محاولة/استثناء لمعالجة الطلبات بشكل متسق
 * @param {Function} apiCall - استدعاء API async
 * @param {Object} options - خيارات المعالجة
 * @returns {Promise<Object>} - نتيجة الاستدعاء أو يرمي بخطأ
 */
export const handleApiRequest = async (apiCall, options = {}) => {
  const { 
    onSuccess, 
    onError, 
    defaultErrorMessage = 'حدث خطأ أثناء معالجة طلبك',
    showToast = false,
    toastContext = null 
  } = options;
  
  try {
    const response = await apiCall();
    
    if (onSuccess) {
      onSuccess(response);
    }
    
    return response;
  } catch (error) {
    // تحويل الخطأ إلى AppError
    const appError = error instanceof AppError 
      ? error 
      : ErrorHandler.handleAxiosError(error);
    
    // تسجيل الخطأ
    ErrorHandler.logError(appError);
    
    // إظهار رسالة توست إذا لزم الأمر
    if (showToast && toastContext) {
      const { showErrorToast } = toastContext;
      showErrorToast(appError);
    }
    
    // معالجة الخطأ
    if (onError) {
      onError(appError);
    }
    
    throw appError;
  }
};

/**
 * دالة مساعدة لمعالجة أخطاء المصادقة
 * @param {Function} authCall - استدعاء خدمة المصادقة
 * @param {Object} options - خيارات المعالجة
 * @returns {Promise<Object>} - نتيجة الاستدعاء أو يرمي بخطأ
 */
export const handleAuthRequest = async (authCall, options = {}) => {
  const { 
    onSuccess, 
    onError, 
    operation = 'auth',
    showToast = false,
    toastContext = null,
    navigate = null,
    redirectPath = null
  } = options;
  
  try {
    const response = await authCall();
    
    if (onSuccess) {
      onSuccess(response);
    }
    
    // التوجيه التلقائي بعد المصادقة الناجحة
    if (navigate && redirectPath) {
      navigate(redirectPath);
    }
    
    return response;
  } catch (error) {
    // تحويل الخطأ إلى AppError
    const appError = error instanceof AppError 
      ? error 
      : ErrorHandler.handleAuthError(error, operation);
    
    // تسجيل الخطأ
    ErrorHandler.logError(appError, { operation });
    
    // إظهار رسالة توست إذا لزم الأمر
    if (showToast && toastContext) {
      const { showErrorToast } = toastContext;
      showErrorToast(appError);
    }
    
    // معالجة الخطأ
    if (onError) {
      onError(appError);
    }
    
    throw appError;
  }
};

/**
 * دالة مساعدة لإنشاء معالج خطأ مخصص لاستخدامه مع محاولة/استثناء
 * @param {Object} options - خيارات المعالج
 * @returns {Function} - دالة معالجة الخطأ
 */
export const createErrorHandler = (options = {}) => {
  const { 
    defaultMessage = 'حدث خطأ',
    context = {},
    showToast = false,
    toastContext = null,
    onError = null
  } = options;
  
  return (error) => {
    // تحويل الخطأ إلى AppError
    const appError = error instanceof AppError 
      ? error.withInfo(context)
      : ErrorHandler.handleError(error, defaultMessage).withInfo(context);
    
    // تسجيل الخطأ
    ErrorHandler.logError(appError, context);
    
    // إظهار رسالة توست إذا لزم الأمر
    if (showToast && toastContext) {
      const { showErrorToast } = toastContext;
      showErrorToast(appError);
    }
    
    // معالج مخصص
    if (onError) {
      onError(appError);
    }
    
    return appError;
  };
};

export default {
  AppError,
  ErrorHandler,
  ERROR_TYPES,
  handleApiRequest,
  handleAuthRequest,
  createErrorHandler,
};