// src/components/exam/ExamTimer.jsx
/**
 * مكون مؤقت الامتحان
 * Exam Timer Component
 */
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const ExamTimer = ({ 
  timeRemaining, 
  isRunning = true, 
  onTimeUp, 
  showWarnings = true 
}) => {
  const { isDarkMode } = useTheme();
  const { language, isRTL } = useLanguage();
  const [isWarning, setIsWarning] = useState(false);
  const [isCritical, setIsCritical] = useState(false);

  // تحديد حالات التحذير
  useEffect(() => {
    if (timeRemaining <= 60) { // آخر دقيقة
      setIsCritical(true);
      setIsWarning(false);
    } else if (timeRemaining <= 300) { // آخر 5 دقائق
      setIsWarning(true);
      setIsCritical(false);
    } else {
      setIsWarning(false);
      setIsCritical(false);
    }

    // إشعار انتهاء الوقت
    if (timeRemaining === 0 && onTimeUp) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  // تنسيق الوقت
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  // تحديد الألوان والأنماط
  const getTimerStyles = () => {
    if (isCritical) {
      return {
        bg: isDarkMode ? 'bg-red-900/50' : 'bg-red-100',
        border: 'border-red-500',
        text: isDarkMode ? 'text-red-400' : 'text-red-600',
        icon: '⚠️'
      };
    } else if (isWarning) {
      return {
        bg: isDarkMode ? 'bg-yellow-900/50' : 'bg-yellow-100',
        border: 'border-yellow-500',
        text: isDarkMode ? 'text-yellow-400' : 'text-yellow-600',
        icon: '⏰'
      };
    } else {
      return {
        bg: isDarkMode ? 'bg-green-900/50' : 'bg-green-100',
        border: 'border-green-500',
        text: isDarkMode ? 'text-green-400' : 'text-green-600',
        icon: '⏱️'
      };
    }
  };

  const styles = getTimerStyles();

  return (
    <div className={`fixed top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
      <div className={`${styles.bg} ${styles.border} border-2 rounded-lg p-4 shadow-lg backdrop-blur-sm transition-all duration-300 ${
        isCritical ? 'animate-pulse' : ''
      }`}>
        <div className="flex items-center gap-3">
          {/* أيقونة */}
          <div className="text-2xl">
            {styles.icon}
          </div>
          
          {/* الوقت المتبقي */}
          <div className="text-center">
            <div className={`text-xs font-medium ${styles.text} mb-1`}>
              {language === 'ar' ? 'الوقت المتبقي' : 'Time Remaining'}
            </div>
            <div className={`text-2xl font-bold font-mono ${styles.text}`}>
              {formatTime(timeRemaining)}
            </div>
          </div>
        </div>
        
        {/* شريط التقدم */}
        <div className={`mt-3 w-full h-2 rounded-full ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`}>
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${
              isCritical 
                ? 'bg-red-500' 
                : isWarning 
                  ? 'bg-yellow-500' 
                  : 'bg-green-500'
            }`}
            style={{ 
              width: `${Math.max(0, Math.min(100, (timeRemaining / 3600) * 100))}%` 
            }}
          />
        </div>
        
        {/* رسائل التحذير */}
        {showWarnings && (
          <>
            {isCritical && (
              <div className={`mt-2 text-xs ${styles.text} text-center animate-pulse`}>
                {language === 'ar' ? 'أقل من دقيقة واحدة!' : 'Less than 1 minute!'}
              </div>
            )}
            {isWarning && !isCritical && (
              <div className={`mt-2 text-xs ${styles.text} text-center`}>
                {language === 'ar' ? 'أقل من 5 دقائق' : 'Less than 5 minutes'}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ExamTimer;
