// src/hooks/useErrorHandler.js
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import { AUTH_ERRORS, handleApiRequest, handleAuthRequest, createErrorHandler } from '../utils/errors';

/**
 * هوك مخصص لمعالجة الأخطاء في التطبيق
 * يوفر طرقًا سهلة الاستخدام لمعالجة أخطاء API وأخطاء المصادقة
 */
const useErrorHandler = () => {
  const navigate = useNavigate();
  const toastContext = useToast();
  
  /**
   * معالجة استجابة API
   * @param {Function} apiCall - استدعاء API
   * @param {Object} options - خيارات المعالجة
   * @returns {Promise} - نتيجة الاستدعاء
   */
  const handleApiResponse = useCallback(
    (apiCall, options = {}) => {
      return handleApiRequest(apiCall, {
        toastContext,
        showToast: true,
        ...options,
      });
    },
    [toastContext]
  );
  
  /**
   * معالجة استجابة المصادقة
   * @param {Function} authCall - استدعاء خدمة المصادقة
   * @param {Object} options - خيارات المعالجة
   * @returns {Promise} - نتيجة الاستدعاء
   */
  const handleAuthResponse = useCallback(
    (authCall, options = {}) => {
      return handleAuthRequest(authCall, {
        toastContext,
        showToast: true,
        navigate,
        ...options,
      });
    },
    [toastContext, navigate]
  );
  
  /**
   * معالجة خطأ المصادقة
   * يعالج حالات خاصة مثل انتهاء صلاحية الجلسة
   * @param {Error} error - خطأ المصادقة
   */
  const handleAuthError = useCallback(
    (error) => {
      // التحقق من نوع خطأ المصادقة
      if (error?.type === AUTH_ERRORS.TOKEN_EXPIRED) {
        // عرض رسالة
        toastContext.showWarning('انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.', {
          title: 'الجلسة منتهية',
          duration: 5000,
        });
        
        // توجيه المستخدم إلى صفحة تسجيل الدخول
        navigate('/auth?mode=login&reason=expired_session');
      } else if (error?.type === AUTH_ERRORS.PERMISSION_DENIED) {
        // عرض رسالة
        toastContext.showError('ليس لديك الصلاحيات اللازمة للوصول إلى هذه الصفحة.', {
          title: 'غير مصرح',
          duration: 5000,
        });
        
        // توجيه المستخدم إلى صفحة غير مصرح
        navigate('/unauthorized');
      }
    },
    [toastContext, navigate]
  );
  
  /**
   * إنشاء معالج أخطاء مخصص
   * @param {Object} options - خيارات المعالج
   * @returns {Function} - دالة معالجة الخطأ
   */
  const createCustomErrorHandler = useCallback(
    (options = {}) => {
      return createErrorHandler({
        toastContext,
        showToast: true,
        ...options,
      });
    },
    [toastContext]
  );
  
  /**
   * اختصار لعرض خطأ كتوست
   * @param {Error} error - كائن الخطأ
   * @param {Object} toastOptions - خيارات التوست
   */
  const showErrorToast = useCallback(
    (error, toastOptions = {}) => {
      toastContext.showErrorToast(error, toastOptions);
    },
    [toastContext]
  );
  
  return {
    handleApiResponse,
    handleAuthResponse,
    handleAuthError,
    createCustomErrorHandler,
    showErrorToast,
  };
};

export default useErrorHandler;