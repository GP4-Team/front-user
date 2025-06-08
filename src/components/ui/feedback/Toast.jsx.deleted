// src/components/ui/feedback/Toast.jsx
import React, { useState, useEffect, forwardRef } from 'react';
import { 
  CheckCircle, 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  X 
} from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * أنواع التنبيهات التي يدعمها مكون التوست
 */
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

/**
 * مكون التوست
 * يعرض رسائل ملاحظات قصيرة للمستخدم (نجاح، خطأ، تحذير، معلومات)
 */
const Toast = forwardRef(({
  type = TOAST_TYPES.INFO,
  title,
  message,
  duration = 5000,
  onClose,
  position = 'top-right',
  autoClose = true,
  className = '',
  ...props
}, ref) => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  
  // لاختيار الأيقونة المناسبة لنوع التوست
  const getIcon = () => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return <CheckCircle size={20} />;
      case TOAST_TYPES.ERROR:
        return <AlertCircle size={20} />;
      case TOAST_TYPES.WARNING:
        return <AlertTriangle size={20} />;
      case TOAST_TYPES.INFO:
      default:
        return <Info size={20} />;
    }
  };
  
  // لاختيار ألوان التوست استنادًا إلى نوعه والوضع (داكن/فاتح)
  const getStyles = () => {
    // الفئات الأساسية المشتركة لجميع أنواع التوست
    const baseClasses = `
      flex items-start rounded-lg shadow-lg p-4 transition-all duration-300 transform
      ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'}
    `;
    
    // فئات الموضع
    const positionClasses = {
      'top-right': 'fixed top-4 right-4',
      'top-left': 'fixed top-4 left-4',
      'bottom-right': 'fixed bottom-4 right-4',
      'bottom-left': 'fixed bottom-4 left-4',
      'top-center': 'fixed top-4 left-1/2 transform -translate-x-1/2',
      'bottom-center': 'fixed bottom-4 left-1/2 transform -translate-x-1/2',
    };
    
    // فئات النوع واللون
    let typeClasses;
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        typeClasses = isDarkMode
          ? 'bg-green-900/90 text-green-100 border border-green-800'
          : 'bg-green-50 text-green-800 border border-green-200';
        break;
      case TOAST_TYPES.ERROR:
        typeClasses = isDarkMode
          ? 'bg-red-900/90 text-red-100 border border-red-800'
          : 'bg-red-50 text-red-800 border border-red-200';
        break;
      case TOAST_TYPES.WARNING:
        typeClasses = isDarkMode
          ? 'bg-yellow-900/90 text-yellow-100 border border-yellow-800'
          : 'bg-yellow-50 text-yellow-800 border border-yellow-200';
        break;
      case TOAST_TYPES.INFO:
      default:
        typeClasses = isDarkMode
          ? 'bg-blue-900/90 text-blue-100 border border-blue-800'
          : 'bg-blue-50 text-blue-800 border border-blue-200';
    }
    
    return `${baseClasses} ${positionClasses[position]} ${typeClasses} ${className}`;
  };
  
  // لاختيار لون الأيقونة
  const getIconColor = () => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return 'text-green-500 dark:text-green-400';
      case TOAST_TYPES.ERROR:
        return 'text-red-500 dark:text-red-400';
      case TOAST_TYPES.WARNING:
        return 'text-yellow-500 dark:text-yellow-400';
      case TOAST_TYPES.INFO:
      default:
        return 'text-blue-500 dark:text-blue-400';
    }
  };
  
  // إغلاق التوست
  const handleClose = () => {
    setIsVisible(false);
    
    // نستخدم setTimeout لتأخير استدعاء onClose حتى تنتهي الحركة
    setTimeout(() => {
      if (onClose) onClose();
    }, 300); // مدة حركة الانتقال
  };
  
  // إغلاق تلقائي بعد المدة المحددة
  useEffect(() => {
    let timer;
    
    if (autoClose && duration > 0) {
      timer = setTimeout(() => {
        handleClose();
      }, duration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [autoClose, duration]);
  
  return (
    <div
      ref={ref}
      className={getStyles()}
      role="alert"
      {...props}
    >
      {/* أيقونة التوست */}
      <div className={`flex-shrink-0 ${getIconColor()} mr-3 mt-0.5`}>
        {getIcon()}
      </div>
      
      {/* محتوى التوست */}
      <div className="flex-1">
        {title && (
          <h4 className="font-medium">
            {title}
          </h4>
        )}
        {message && (
          <p className={`${title ? 'mt-1' : ''} text-sm opacity-90`}>
            {message}
          </p>
        )}
      </div>
      
      {/* زر الإغلاق */}
      <button
        onClick={handleClose}
        className={`ml-4 flex-shrink-0 focus:outline-none opacity-70 hover:opacity-100 transition-opacity ${getIconColor()}`}
        aria-label={language === 'ar' ? 'إغلاق' : 'Close'}
      >
        <X size={16} />
      </button>
    </div>
  );
});

Toast.displayName = 'Toast';

export default Toast;