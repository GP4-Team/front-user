// src/components/student/ai/WeaknessCard.jsx
import React from 'react';
import { AlertTriangle, Target, TrendingDown, RotateCcw, Lightbulb, Brain } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * Component to display student weakness information
 * Shows score, attempts, and recommendations in a card format
 */
const WeaknessCard = ({ weakness, stats }) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const isArabic = language === 'ar';

  // Get score color based on performance
  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
    return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
  };

  // Get progress bar color
  const getProgressColor = (score) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const score = weakness?.average_score || 0;
  const attempts = weakness?.attempts || 0;
  const recommendation = weakness?.recommendation || '';

  const translations = {
    title: {
      ar: 'تحليل نقاط الضعف',
      en: 'Weakness Analysis'
    },
    currentScore: {
      ar: 'النتيجة الحالية',
      en: 'Current Score'
    },
    totalAttempts: {
      ar: 'إجمالي المحاولات',
      en: 'Total Attempts'
    },
    recommendation: {
      ar: 'التوصية',
      en: 'Recommendation'
    },
    improvementNeeded: {
      ar: 'التحسن المطلوب',
      en: 'Improvement Needed'
    },
    weak: {
      ar: 'ضعيف',
      en: 'Weak'
    },
    average: {
      ar: 'متوسط',
      en: 'Average'
    },
    good: {
      ar: 'جيد',
      en: 'Good'
    },
    noData: {
      ar: 'لا توجد بيانات ضعف متاحة',
      en: 'No weakness data available'
    }
  };

  const getText = (key) => translations[key]?.[language] || translations[key]?.en || '';

  // If no weakness data
  if (!weakness) {
    return (
      <div className={`bg-white dark:bg-[#1E1E1E] rounded-xl shadow-md p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <Brain size={48} className="text-[#3949AB] dark:text-[#7986CB]" />
          </div>
          <h3 className="text-lg font-semibold text-[#37474F] dark:text-white mb-2">
            {getText('noData')}
          </h3>
          <p className="text-sm text-[#3949AB] dark:text-[#7986CB]">
            {isArabic ? 'سيتم عرض تحليل نقاط ضعفك هنا عند توفر البيانات' : 'Your weakness analysis will appear here when data is available'}
          </p>
        </div>
      </div>
    );
  }

  const getPerformanceLevel = (score) => {
    if (score >= 70) return getText('good');
    if (score >= 50) return getText('average');
    return getText('weak');
  };

  const improvementNeeded = Math.max(0, 70 - score);

  return (
    <div className={`bg-white dark:bg-[#1E1E1E] rounded-xl shadow-md overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3949AB] to-[#5E35B1] p-6 text-white">
        <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Brain size={28} className={`${isRTL ? 'ml-3' : 'mr-3'} text-white`} />
          <h2 className="text-xl font-bold">
            {getText('title')}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Score Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Current Score */}
          <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] rounded-lg p-4">
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} mb-2`}>
              <Target size={18} className={`${isRTL ? 'ml-2' : 'mr-2'} text-[#3949AB] dark:text-[#7986CB]`} />
              <span className="text-sm text-[#3949AB] dark:text-[#7986CB] font-medium">
                {getText('currentScore')}
              </span>
            </div>
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-2xl font-bold text-[#37474F] dark:text-white">
                {score.toFixed(1)}%
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ml-2 ${getScoreColor(score)}`}>
                {getPerformanceLevel(score)}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(score)}`}
                style={{ width: `${Math.min(score, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Total Attempts */}
          <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] rounded-lg p-4">
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} mb-2`}>
              <RotateCcw size={18} className={`${isRTL ? 'ml-2' : 'mr-2'} text-[#3949AB] dark:text-[#7986CB]`} />
              <span className="text-sm text-[#3949AB] dark:text-[#7986CB] font-medium">
                {getText('totalAttempts')}
              </span>
            </div>
            <span className="text-2xl font-bold text-[#37474F] dark:text-white">
              {attempts}
            </span>
            <p className="text-xs text-[#3949AB] dark:text-[#7986CB] mt-1">
              {isArabic ? 'محاولة' : 'attempts'}
            </p>
          </div>

          {/* Improvement Needed */}
          <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] rounded-lg p-4">
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} mb-2`}>
              <TrendingDown size={18} className={`${isRTL ? 'ml-2' : 'mr-2'} text-[#3949AB] dark:text-[#7986CB]`} />
              <span className="text-sm text-[#3949AB] dark:text-[#7986CB] font-medium">
                {getText('improvementNeeded')}
              </span>
            </div>
            <span className="text-2xl font-bold text-[#37474F] dark:text-white">
              {improvementNeeded.toFixed(1)}%
            </span>
            <p className="text-xs text-[#3949AB] dark:text-[#7986CB] mt-1">
              {isArabic ? 'للوصول للهدف' : 'to reach goal'}
            </p>
          </div>
        </div>

        {/* Recommendation Section */}
        {recommendation && (
          <div className="bg-gradient-to-r from-[#FFC107]/10 to-[#FF9800]/10 dark:from-[#FFC107]/20 dark:to-[#FF9800]/20 border border-[#FFC107]/30 rounded-lg p-4">
            <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`${isRTL ? 'ml-3' : 'mr-3'} mt-0.5`}>
                <div className="w-8 h-8 bg-[#FFC107] rounded-full flex items-center justify-center">
                  <Lightbulb size={18} className="text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-[#37474F] dark:text-white mb-2">
                  {getText('recommendation')}:
                </h4>
                <p className="text-sm text-[#37474F] dark:text-white">
                  {isArabic ? 'ركز على التدريب الإضافي في هذا المجال' : recommendation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Additional Stats if available */}
        {stats && (
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] rounded-lg p-3">
              <div className="text-lg font-bold text-[#37474F] dark:text-white">
                {stats.weaknessCount}
              </div>
              <div className="text-xs text-[#3949AB] dark:text-[#7986CB]">
                {isArabic ? 'نقاط ضعف' : 'Weaknesses'}
              </div>
            </div>
            <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] rounded-lg p-3">
              <div className="text-lg font-bold text-[#37474F] dark:text-white">
                {stats.overallScore}%
              </div>
              <div className="text-xs text-[#3949AB] dark:text-[#7986CB]">
                {isArabic ? 'التقييم العام' : 'Overall Score'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeaknessCard;
