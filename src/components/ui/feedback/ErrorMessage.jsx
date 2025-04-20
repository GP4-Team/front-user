// src/components/ui/feedback/ErrorMessage.jsx
import React from 'react';
import { AlertTriangle, AlertCircle, X, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTheme } from '../../../contexts/ThemeContext';
import ErrorHandler from '../../../utils/errors/ErrorHandler';
import AppError from '../../../utils/errors/AppError';

/**
 * مكون رسالة الخطأ
 * يعرض رسائل خطأ بتنسيق متناسق مع إمكانية إعادة المحاولة والإغلاق
 */
const ErrorMessage = ({
  error,
  onRetry,
  onClose,
  variant = 'standard',
  showDetails = false,
  className = '',
}) => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  
  // إذا لم يكن هناك خطأ، لا تعرض شيئًا
  if (!error) return null;
  
  // تحويل الخطأ إلى خطأ التطبيق إذا لم يكن كذلك بالفعل
  const appError = error instanceof AppError ? error : ErrorHandler.handleError(error);
  
  // الحصول على رسالة الخطأ الودية للمستخدم
  const errorMessage = ErrorHandler.getUserFriendlyMessage(appError, {
    language,
    includeDetails: showDetails,
  });
  
  // تحديد ما إذا كان الخطأ قابل لإعادة المحاولة
  const isRetryable = appError.isRetryable() && onRetry;
  
  // تحديد أنماط المكون وألوانه
  const getStyles = () => {
    const baseClasses = 'rounded-lg overflow-hidden transition-all p-4 flex items-start';
    
    let variantClasses;
    switch (variant) {
      case 'toast':
        variantClasses = 'shadow-lg fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full';
        break;
      case 'inline':
        variantClasses = 'border text-sm';
        break;
      case 'banner':
        variantClasses = 'w-full';
        break;
      case 'standard':
      default:
        variantClasses = 'border';
    }
    
    // ألوان الخطأ
    const colorClasses = isDarkMode 
      ? 'bg-red-900/40 border-red-800 text-red-200' 
      : 'bg-red-50 border-red-200 text-red-800';
    
    return `${baseClasses} ${variantClasses} ${colorClasses} ${className}`;
  };
  
  // تحديد الأيقونة المناسبة
  const Icon = variant === 'toast' ? AlertCircle : AlertTriangle;
  
  return (
    <div className={getStyles()}>
      {/* أيقونة الخطأ */}
      <div className="flex-shrink-0 mr-3 mt-0.5">
        <Icon size={variant === 'inline' ? 16 : 20} className="text-red-500 dark:text-red-400" />
      </div>
      
      {/* محتوى الخطأ */}
      <div className="flex-1">
        <p className="font-medium">
          {errorMessage}
        </p>
        
        {/* إظهار تفاصيل إضافية إذا تم تمكين ذلك */}
        {showDetails && appError.data && (
          <div className="mt-2 text-xs opacity-80">
            <pre className="whitespace-pre-wrap break-all">
              {JSON.stringify(appError.data, null, 2)}
            </pre>
          </div>
        )}
        
        {/* أزرار الإجراءات */}
        {(isRetryable || onClose) && (
          <div className="mt-3 flex space-x-3 rtl:space-x-reverse">
            {isRetryable && (
              <button
                onClick={onRetry}
                className="flex items-center text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
              >
                <RefreshCw size={14} className="mr-1" />
                {language === 'ar' ? 'إعادة المحاولة' : 'Retry'}
              </button>
            )}
            
            {onClose && (
              <button
                onClick={onClose}
                className="flex items-center text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
              >
                <X size={14} className="mr-1" />
                {language === 'ar' ? 'إغلاق' : 'Dismiss'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;