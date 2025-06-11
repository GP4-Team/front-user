// src/components/student/ai/ExplanationPanel.jsx
import React from 'react';
import { 
  X, 
  Brain, 
  Target, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  BookOpen,
  Lightbulb
} from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * Modal panel to display detailed explanation of quiz recommendation
 * Shows AI reasoning, learning objectives, and expected outcomes
 */
const ExplanationPanel = ({ 
  recommendation, 
  details, 
  isOpen, 
  onClose,
  isLoading = false 
}) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const isArabic = language === 'ar';

  const translations = {
    title: {
      ar: 'تفاصيل التوصية الذكية',
      en: 'AI Recommendation Details'
    },
    close: {
      ar: 'إغلاق',
      en: 'Close'
    },
    aiExplanation: {
      ar: 'شرح الذكاء الاصطناعي',
      en: 'AI Explanation'
    },
    learningObjectives: {
      ar: 'أهداف التعلم',
      en: 'Learning Objectives'
    },
    expectedOutcomes: {
      ar: 'النتائج المتوقعة',
      en: 'Expected Outcomes'
    },
    timeManagement: {
      ar: 'إدارة الوقت',
      en: 'Time Management'
    },
    personalizationFactors: {
      ar: 'عوامل التخصيص',
      en: 'Personalization Factors'
    },
    difficultyRationale: {
      ar: 'منطق مستوى الصعوبة',
      en: 'Difficulty Rationale'
    },
    topicSelection: {
      ar: 'اختيار المواضيع',
      en: 'Topic Selection'
    },
    confidenceLevel: {
      ar: 'مستوى الثقة',
      en: 'Confidence Level'
    },
    loading: {
      ar: 'جاري تحميل التفاصيل...',
      en: 'Loading details...'
    },
    errorLoading: {
      ar: 'فشل في تحميل التفاصيل',
      en: 'Failed to load details'
    },
    high: {
      ar: 'عالي',
      en: 'High'
    },
    medium: {
      ar: 'متوسط',
      en: 'Medium'
    },
    low: {
      ar: 'منخفض',
      en: 'Low'
    }
  };

  const getText = (key) => translations[key]?.[language] || translations[key]?.en || '';

  const getConfidenceColor = (level) => {
    const colorMap = {
      'high': 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400',
      'medium': 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400',
      'low': 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
    };
    return colorMap[level] || colorMap['medium'];
  };

  const getConfidenceText = (level) => {
    return getText(level) || level;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white dark:bg-[#1E1E1E] rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3949AB] to-[#5E35B1] px-6 py-4">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Brain size={28} className={`${isRTL ? 'ml-3' : 'mr-3'} text-[#FFC107]`} />
              <h2 className="text-xl font-bold text-white">
                {getText('title')}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-[#FFC107] transition-colors p-1"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3949AB] mx-auto mb-4"></div>
                <p className="text-[#37474F] dark:text-white">
                  {getText('loading')}
                </p>
              </div>
            </div>
          ) : !details ? (
            <div className="text-center py-12">
              <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
              <p className="text-[#37474F] dark:text-white">
                {getText('errorLoading')}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* AI Explanation */}
              <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] rounded-lg p-6">
                <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} mb-4`}>
                  <Lightbulb size={20} className={`${isRTL ? 'ml-2' : 'mr-2'} text-[#3949AB] dark:text-[#7986CB]`} />
                  <h3 className="text-lg font-semibold text-[#37474F] dark:text-white">
                    {getText('aiExplanation')}
                  </h3>
                </div>
                <p className="text-[#37474F] dark:text-white leading-relaxed">
                  {details.explanation || (isArabic 
                    ? 'تم اختيار هذه الأسئلة بناءً على تحليل أدائك الحالي وتحديد المجالات التي تحتاج إلى تحسين.'
                    : 'These questions were selected based on analysis of your current performance and identifying areas that need improvement.'
                  )}
                </p>

                {/* Confidence Level */}
                {details.reasoning_details?.ai_confidence_level && (
                  <div className="mt-4">
                    <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm text-[#3949AB] dark:text-[#7986CB] font-medium">
                        {getText('confidenceLevel')}:
                      </span>
                      <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(details.reasoning_details.ai_confidence_level)}`}>
                        {getConfidenceText(details.reasoning_details.ai_confidence_level)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Learning Objectives */}
              {details.learning_objectives && details.learning_objectives.length > 0 && (
                <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] rounded-lg p-6">
                  <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} mb-4`}>
                    <Target size={20} className={`${isRTL ? 'ml-2' : 'mr-2'} text-[#3949AB] dark:text-[#7986CB]`} />
                    <h3 className="text-lg font-semibold text-[#37474F] dark:text-white">
                      {getText('learningObjectives')}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {details.learning_objectives.map((objective, index) => (
                      <li key={index} className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <CheckCircle size={16} className={`${isRTL ? 'ml-2' : 'mr-2'} mt-0.5 text-green-500`} />
                        <span className="text-[#37474F] dark:text-white text-sm">
                          {objective}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Expected Outcomes */}
              {details.expected_outcomes && details.expected_outcomes.length > 0 && (
                <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] rounded-lg p-6">
                  <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} mb-4`}>
                    <TrendingUp size={20} className={`${isRTL ? 'ml-2' : 'mr-2'} text-[#3949AB] dark:text-[#7986CB]`} />
                    <h3 className="text-lg font-semibold text-[#37474F] dark:text-white">
                      {getText('expectedOutcomes')}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {details.expected_outcomes.map((outcome, index) => (
                      <li key={index} className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <CheckCircle size={16} className={`${isRTL ? 'ml-2' : 'mr-2'} mt-0.5 text-blue-500`} />
                        <span className="text-[#37474F] dark:text-white text-sm">
                          {outcome}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Time Management */}
              {details.time_management && details.time_management.length > 0 && (
                <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] rounded-lg p-6">
                  <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} mb-4`}>
                    <Clock size={20} className={`${isRTL ? 'ml-2' : 'mr-2'} text-[#3949AB] dark:text-[#7986CB]`} />
                    <h3 className="text-lg font-semibold text-[#37474F] dark:text-white">
                      {getText('timeManagement')}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {details.time_management.map((timeInfo, index) => (
                      <li key={index} className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Clock size={16} className={`${isRTL ? 'ml-2' : 'mr-2'} mt-0.5 text-[#FFC107]`} />
                        <span className="text-[#37474F] dark:text-white text-sm">
                          {timeInfo}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Advanced Details */}
              {details.reasoning_details && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Personalization Factors */}
                  {details.reasoning_details.personalization_factors && (
                    <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] rounded-lg p-4">
                      <h4 className="font-semibold text-[#37474F] dark:text-white mb-3">
                        {getText('personalizationFactors')}
                      </h4>
                      <ul className="space-y-1">
                        {details.reasoning_details.personalization_factors.map((factor, index) => (
                          <li key={index} className="text-sm text-[#37474F] dark:text-white">
                            • {factor}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Topic Selection Logic */}
                  {details.reasoning_details.topic_selection_logic && (
                    <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] rounded-lg p-4">
                      <h4 className="font-semibold text-[#37474F] dark:text-white mb-3">
                        {getText('topicSelection')}
                      </h4>
                      <ul className="space-y-1">
                        {details.reasoning_details.topic_selection_logic.map((logic, index) => (
                          <li key={index} className="text-sm text-[#37474F] dark:text-white">
                            • {logic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Difficulty Rationale */}
              {details.reasoning_details?.difficulty_rationale && (
                <div className="bg-gradient-to-r from-[#FFC107]/10 to-[#FF9800]/10 dark:from-[#FFC107]/20 dark:to-[#FF9800]/20 border border-[#FFC107]/30 rounded-lg p-4">
                  <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} mb-3`}>
                    <BookOpen size={18} className={`${isRTL ? 'ml-2' : 'mr-2'} text-[#FFC107]`} />
                    <h4 className="font-semibold text-[#37474F] dark:text-white">
                      {getText('difficultyRationale')}
                    </h4>
                  </div>
                  <p className="text-sm text-[#37474F] dark:text-white">
                    {details.reasoning_details.difficulty_rationale}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] px-6 py-4">
          <div className={`flex justify-end ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={onClose}
              className="bg-[#3949AB] hover:bg-[#2E3192] text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              {getText('close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplanationPanel;
