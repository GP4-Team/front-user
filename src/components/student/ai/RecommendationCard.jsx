// src/components/student/ai/RecommendationCard.jsx
import React from 'react';
import { Clock, BookOpen, Target, ChevronRight, Play, Info } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * Component to display quiz recommendation cards
 * Shows recommendation details and allows user to start quiz or view explanation
 */
const RecommendationCard = ({ 
  recommendation, 
  onStartQuiz, 
  onViewDetails,
  isLoading = false 
}) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const isArabic = language === 'ar';

  const translations = {
    questions: {
      ar: 'أسئلة',
      en: 'Questions'
    },
    minutes: {
      ar: 'دقائق',
      en: 'minutes'
    },
    reinforcement: {
      ar: 'تعزيز',
      en: 'Reinforcement'
    },
    practice: {
      ar: 'تدريب',
      en: 'Practice'
    },
    assessment: {
      ar: 'تقييم',
      en: 'Assessment'
    },
    startQuiz: {
      ar: 'ابدأ الامتحان',
      en: 'Start Quiz'
    },
    viewDetails: {
      ar: 'عرض التفاصيل',
      en: 'View Details'
    },
    created: {
      ar: 'تم الإنشاء',
      en: 'Created'
    },
    estimatedTime: {
      ar: 'الوقت المتوقع',
      en: 'Estimated Time'
    },
    purpose: {
      ar: 'الهدف',
      en: 'Purpose'
    }
  };

  const getText = (key) => translations[key]?.[language] || translations[key]?.en || '';

  // Get purpose translation
  const getPurposeText = (purpose) => {
    const purposeMap = {
      'reinforcement': getText('reinforcement'),
      'practice': getText('practice'),
      'assessment': getText('assessment')
    };
    return purposeMap[purpose] || purpose;
  };

  // Calculate estimated time (2 minutes per question)
  const estimatedTime = Math.max(2, (recommendation.num_questions || 1) * 2);

  // Format creation date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get purpose color
  const getPurposeColor = (purpose) => {
    const colorMap = {
      'reinforcement': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      'practice': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'assessment': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
    };
    return colorMap[purpose] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  };

  return (
    <div className={`bg-white dark:bg-[#1E1E1E] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Header with course name */}
      <div className="bg-gradient-to-r from-[#3949AB] to-[#5E35B1] px-6 py-4">
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div>
            <h3 className="text-white font-semibold text-lg">
              {recommendation.course_name || (isArabic ? 'مادة دراسية' : 'Academic Course')}
            </h3>
            <p className="text-[#C5CAE9] text-sm">
              {getText('created')}: {formatDate(recommendation.created_at)}
            </p>
          </div>
          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPurposeColor(recommendation.primary_purpose)}`}>
              {getPurposeText(recommendation.primary_purpose)}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Quiz Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Number of Questions */}
          <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] rounded-lg p-4">
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} mb-2`}>
              <BookOpen size={18} className={`${isRTL ? 'ml-2' : 'mr-2'} text-[#3949AB] dark:text-[#7986CB]`} />
              <span className="text-sm text-[#3949AB] dark:text-[#7986CB] font-medium">
                {getText('questions')}
              </span>
            </div>
            <div className="text-2xl font-bold text-[#37474F] dark:text-white">
              {recommendation.num_questions || 0}
            </div>
          </div>

          {/* Estimated Time */}
          <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] rounded-lg p-4">
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} mb-2`}>
              <Clock size={18} className={`${isRTL ? 'ml-2' : 'mr-2'} text-[#3949AB] dark:text-[#7986CB]`} />
              <span className="text-sm text-[#3949AB] dark:text-[#7986CB] font-medium">
                {getText('estimatedTime')}
              </span>
            </div>
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-2xl font-bold text-[#37474F] dark:text-white">
                {estimatedTime}
              </span>
              <span className="text-sm text-[#3949AB] dark:text-[#7986CB] ml-1">
                {getText('minutes')}
              </span>
            </div>
          </div>
        </div>

        {/* Purpose and Target */}
        <div className="mb-6">
          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} mb-3`}>
            <Target size={18} className={`${isRTL ? 'ml-2' : 'mr-2'} text-[#3949AB] dark:text-[#7986CB]`} />
            <span className="text-sm font-medium text-[#37474F] dark:text-white">
              {getText('purpose')}:
            </span>
          </div>
          <p className="text-sm text-[#37474F] dark:text-white bg-[#F0F4F8] dark:bg-[#2D2D2D] rounded-lg p-3">
            {getPurposeText(recommendation.primary_purpose)} - {isArabic 
              ? 'تم تصميم هذا الامتحان خصيصاً لتحسين أدائك في المواضيع التي تحتاج إلى تطوير'
              : 'This quiz is specifically designed to improve your performance in topics that need development'
            }
          </p>
        </div>

        {/* Action Buttons */}
        <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Start Quiz Button */}
          <button
            onClick={() => onStartQuiz(recommendation)}
            disabled={isLoading}
            className={`flex-1 bg-[#3949AB] hover:bg-[#2E3192] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''} group-hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              <>
                <Play size={18} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                {getText('startQuiz')}
              </>
            )}
          </button>

          {/* View Details Button */}
          <button
            onClick={() => onViewDetails(recommendation)}
            className={`bg-[#F0F4F8] dark:bg-[#2D2D2D] hover:bg-[#E1E5E9] dark:hover:bg-[#3D3D3D] text-[#3949AB] dark:text-[#7986CB] font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <Info size={18} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
            {getText('viewDetails')}
          </button>
        </div>

        {/* Quiz ID for debugging (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-3 pt-3 border-t border-[#F0F4F8] dark:border-[#2D2D2D]">
            <p className="text-xs text-[#3949AB] dark:text-[#7986CB]">
              ID: {recommendation.recommendation_id}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationCard;
