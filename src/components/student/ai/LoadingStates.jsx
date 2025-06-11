// src/components/student/ai/LoadingStates.jsx
import React from 'react';
import { AlertCircle, RefreshCw, Brain, WifiOff, BookOpen, Award, Megaphone, Lock } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * Loading, error, and empty states for the AI Portal
 */

// Loading Skeleton Component
export const LoadingSkeleton = () => {
  const { isRTL } = useLanguage();
  
  return (
    <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Weakness Card Skeleton */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 h-24 animate-pulse"></div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-20 animate-pulse"></div>
            ))}
          </div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-16 animate-pulse"></div>
        </div>
      </div>

      {/* Recommendations Section Skeleton */}
      <div className="space-y-4">
        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-8 w-64 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 h-20 animate-pulse"></div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-16 animate-pulse"></div>
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-16 animate-pulse"></div>
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-12 animate-pulse"></div>
                <div className="flex gap-3">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-lg h-12 animate-pulse"></div>
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-lg h-12 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Loading Component
export const LoadingState = () => {
  const { language, isRTL } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`flex flex-col items-center justify-center py-12 ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Animated Brain Icon */}
      <div className="relative mb-6">
        <Brain size={64} className="text-[#3949AB] animate-pulse" />
        <div className="absolute -top-2 -right-2">
          <div className="w-4 h-4 bg-[#FFC107] rounded-full animate-ping"></div>
        </div>
      </div>
      
      {/* Loading Text */}
      <h3 className="text-xl font-semibold text-[#37474F] dark:text-white mb-2">
        {isArabic ? 'جاري تحليل بياناتك...' : 'Analyzing your data...'}
      </h3>
      
      <p className="text-[#3949AB] dark:text-[#7986CB] text-center max-w-md">
        {isArabic 
          ? 'الذكاء الاصطناعي يقوم بتحليل أدائك وإعداد التوصيات المناسبة لك'
          : 'AI is analyzing your performance and preparing personalized recommendations'
        }
      </p>
      
      {/* Loading Indicator */}
      <div className="mt-6 flex space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-[#3949AB] rounded-full animate-bounce"
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: '0.6s'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

// Error State Component
export const ErrorState = ({ error, onRetry, showRetry = true }) => {
  const { language, isRTL } = useLanguage();
  const isArabic = language === 'ar';

  const getErrorIcon = () => {
    if (error?.includes('network') || error?.includes('connection')) {
      return <WifiOff size={64} className="text-red-500" />;
    }
    return <AlertCircle size={64} className="text-red-500" />;
  };

  const getErrorMessage = () => {
    if (error?.includes('401') || error?.includes('unauthorized')) {
      return isArabic ? 'انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.' : 'Session expired. Please login again.';
    }
    if (error?.includes('403') || error?.includes('forbidden')) {
      return isArabic ? 'ليس لديك صلاحية للوصول لهذه البيانات.' : 'You don\'t have permission to access this data.';
    }
    if (error?.includes('network') || error?.includes('connection')) {
      return isArabic ? 'فشل في الاتصال بالخادم. تحقق من اتصالك بالإنترنت.' : 'Failed to connect to server. Check your internet connection.';
    }
    return error || (isArabic ? 'حدث خطأ غير متوقع' : 'An unexpected error occurred');
  };

  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Error Icon */}
      <div className="mb-6">
        {getErrorIcon()}
      </div>
      
      {/* Error Title */}
      <h3 className="text-xl font-semibold text-[#37474F] dark:text-white mb-2">
        {isArabic ? 'حدث خطأ' : 'Something went wrong'}
      </h3>
      
      {/* Error Message */}
      <p className="text-[#37474F] dark:text-white text-center max-w-md mb-6">
        {getErrorMessage()}
      </p>
      
      {/* Retry Button */}
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className={`bg-[#3949AB] hover:bg-[#2E3192] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <RefreshCw size={18} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isArabic ? 'إعادة المحاولة' : 'Try Again'}
        </button>
      )}
    </div>
  );
};

// Empty State Component
export const EmptyState = ({ type = 'general' }) => {
  const { language, isRTL } = useLanguage();
  const isArabic = language === 'ar';

  const getEmptyContent = () => {
    switch (type) {
      case 'weaknesses':
        return {
          icon: <Award size={64} className="text-green-500" />,
          title: isArabic ? 'لا توجد نقاط ضعف' : 'No Weaknesses Found',
          message: isArabic ? 'رائع! لا توجد نقاط ضعف محددة في أدائك حالياً' : 'Great! No specific weaknesses found in your performance'
        };
      case 'recommendations':
        return {
          icon: <BookOpen size={64} className="text-blue-500" />,
          title: isArabic ? 'لا توجد توصيات متاحة' : 'No Recommendations Available',
          message: isArabic ? 'سيتم إنشاء توصيات مخصصة لك قريباً بناءً على أدائك' : 'Personalized recommendations will be generated soon based on your performance'
        };
      default:
        return {
          icon: <Brain size={64} className="text-[#3949AB]" />,
          title: isArabic ? 'لا توجد بيانات' : 'No Data Available',
          message: isArabic ? 'ابدأ بحل بعض الامتحانات لنتمكن من تحليل أدائك' : 'Start taking quizzes so we can analyze your performance'
        };
    }
  };

  const content = getEmptyContent();

  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Empty Icon */}
      <div className="mb-6">
        {content.icon}
      </div>
      
      {/* Empty Title */}
      <h3 className="text-xl font-semibold text-[#37474F] dark:text-white mb-2">
        {content.title}
      </h3>
      
      {/* Empty Message */}
      <p className="text-[#3949AB] dark:text-[#7986CB] text-center max-w-md">
        {content.message}
      </p>
    </div>
  );
};

// Auth Required State
export const AuthRequiredState = () => {
  const { language, isRTL } = useLanguage();
  const isArabic = language === 'ar';

  const handleLogin = () => {
    window.location.href = '/auth?mode=login';
  };

  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Auth Icon */}
      <div className="mb-6">
        <Lock size={64} className="text-[#3949AB]" />
      </div>
      
      {/* Auth Title */}
      <h3 className="text-xl font-semibold text-[#37474F] dark:text-white mb-2">
        {isArabic ? 'تسجيل الدخول مطلوب' : 'Login Required'}
      </h3>
      
      {/* Auth Message */}
      <p className="text-[#37474F] dark:text-white text-center max-w-md mb-6">
        {isArabic 
          ? 'يجب تسجيل الدخول للوصول إلى بوابة التحسين الذكي'
          : 'You need to login to access the AI improvement portal'
        }
      </p>
      
      {/* Login Button */}
      <button
        onClick={handleLogin}
        className="bg-[#3949AB] hover:bg-[#2E3192] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        {isArabic ? 'تسجيل الدخول' : 'Login'}
      </button>
    </div>
  );
};
