import React, { createContext, useContext, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';

// Create a context
const ToastContext = createContext();

// Toast types
const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Default duration in ms
const DEFAULT_DURATION = 5000;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  
  // Remove a toast by ID
  const removeToast = useCallback((id) => {
    // Animate toast out
    const toastElement = document.getElementById(`toast-${id}`);
    if (toastElement) {
      gsap.to(toastElement, {
        opacity: 0,
        x: 100,
        duration: 0.3,
        onComplete: () => {
          setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
        }
      });
    } else {
      setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    }
  }, []);
  
  // Create a toast
  const createToast = useCallback((message, type, options = {}) => {
    const id = Date.now();
    
    // Create the toast
    const toast = {
      id,
      message,
      type: TOAST_TYPES[type.toUpperCase()] || TOAST_TYPES.INFO,
      title: options.title || null,
      duration: options.duration || DEFAULT_DURATION,
    };
    
    // Add to toasts list
    setToasts(prevToasts => [...prevToasts, toast]);
    
    // Auto-remove after duration (if not 0 or null)
    if (toast.duration) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration);
    }
    
    return id;
  }, [removeToast]);
  
  // Shorthand methods
  const showSuccess = useCallback((message, options) => {
    return createToast(message, TOAST_TYPES.SUCCESS, options);
  }, [createToast]);
  
  const showError = useCallback((message, options) => {
    return createToast(message, TOAST_TYPES.ERROR, options);
  }, [createToast]);
  
  const showWarning = useCallback((message, options) => {
    return createToast(message, TOAST_TYPES.WARNING, options);
  }, [createToast]);
  
  const showInfo = useCallback((message, options) => {
    return createToast(message, TOAST_TYPES.INFO, options);
  }, [createToast]);
  
  // Value to be provided
  const contextValue = {
    toasts,
    showToast: createToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
  
  // Get toast icon based on type
  const getToastIcon = (type) => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-500 dark:text-green-400">
            <circle cx="12" cy="12" r="10" className="fill-current text-green-100 dark:text-green-900" />
            <path d="M9 12l2 2 4-4" className="stroke-current text-green-500 dark:text-green-400" strokeWidth="2" fill="none" />
          </svg>
        );
      case TOAST_TYPES.ERROR:
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-500 dark:text-red-400">
            <circle cx="12" cy="12" r="10" className="fill-current text-red-100 dark:text-red-900" />
            <path d="M15 9l-6 6M9 9l6 6" className="stroke-current text-red-500 dark:text-red-400" strokeWidth="2" />
          </svg>
        );
      case TOAST_TYPES.WARNING:
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-yellow-500 dark:text-yellow-400">
            <circle cx="12" cy="12" r="10" className="fill-current text-yellow-100 dark:text-yellow-900" />
            <path d="M12 8v4M12 16h.01" className="stroke-current text-yellow-500 dark:text-yellow-400" strokeWidth="2" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-500 dark:text-blue-400">
            <circle cx="12" cy="12" r="10" className="fill-current text-blue-100 dark:text-blue-900" />
            <path d="M12 8v4M12 16h.01" className="stroke-current text-blue-500 dark:text-blue-400" strokeWidth="2" />
          </svg>
        );
    }
  };
  
  // Get toast background color based on type
  const getToastBgColor = (type) => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800';
      case TOAST_TYPES.ERROR:
        return 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800';
      case TOAST_TYPES.WARNING:
        return 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800';
      default:
        return 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800';
    }
  };
  
  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className={`flex items-start p-4 rounded-lg shadow-lg border ${getToastBgColor(toast.type)} transform transition-all duration-300 opacity-0`}
            style={{ animationFillMode: 'forwards' }}
            ref={el => {
              if (el) {
                gsap.fromTo(
                  el,
                  { opacity: 0, x: 100 },
                  { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
                );
              }
            }}
          >
            <div className="flex-shrink-0 mr-3">
              {getToastIcon(toast.type)}
            </div>
            <div className="flex-1 mr-2">
              {toast.title && (
                <h4 className="text-sm font-semibold mb-1">
                  {toast.title}
                </h4>
              )}
              <p className="text-sm">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Custom hook for using the toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;
