// src/contexts/ToastContext.jsx
import React, { createContext, useState, useContext, useCallback } from 'react';
import Toast, { TOAST_TYPES } from '../components/ui/feedback/Toast';

// إنشاء سياق التوست
const ToastContext = createContext(null);

/**
 * مزود سياق التوست
 * يسمح بإضافة وإزالة رسائل توست من أي مكان في التطبيق
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  
  /**
   * إضافة توست جديد
   * @param {Object} toast - بيانات التوست
   * @returns {string} - معرف التوست
   */
  const addToast = useCallback((toast) => {
    const id = Date.now().toString();
    setToasts((prevToasts) => [...prevToasts, { id, ...toast }]);
    return id;
  }, []);
  
  /**
   * إزالة توست
   * @param {string} id - معرف التوست المراد إزالته
   */
  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id));
  }, []);
  
  /**
   * اختصارات لأنواع التوست المختلفة
   */
  const showSuccess = useCallback((message, options = {}) => {
    return addToast({ type: TOAST_TYPES.SUCCESS, message, ...options });
  }, [addToast]);
  
  const showError = useCallback((message, options = {}) => {
    return addToast({ type: TOAST_TYPES.ERROR, message, ...options });
  }, [addToast]);
  
  const showWarning = useCallback((message, options = {}) => {
    return addToast({ type: TOAST_TYPES.WARNING, message, ...options });
  }, [addToast]);
  
  const showInfo = useCallback((message, options = {}) => {
    return addToast({ type: TOAST_TYPES.INFO, message, ...options });
  }, [addToast]);
  
  /**
   * عرض توست للإشعار بخطأ (مع معالجة كائن الخطأ)
   * @param {Error} error - كائن الخطأ
   * @param {Object} options - خيارات التوست
   */
  const showErrorToast = useCallback((error, options = {}) => {
    const message = error instanceof Error ? error.message : String(error);
    const title = options.title || 'خطأ';
    
    return showError(message, { title, ...options });
  }, [showError]);
  
  // توفير القيم للسياق
  const contextValue = {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showErrorToast,
  };
  
  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      
      {/* عرض التوست */}
      <div className="toast-container">
        {toasts.map(({ id, ...toastProps }) => (
          <Toast
            key={id}
            {...toastProps}
            onClose={() => removeToast(id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

/**
 * هوك مخصص لاستخدام سياق التوست
 * @returns {Object} - وظائف ومعلومات التوست
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast يجب استخدامه داخل ToastProvider');
  }
  
  return context;
};

export default ToastProvider;