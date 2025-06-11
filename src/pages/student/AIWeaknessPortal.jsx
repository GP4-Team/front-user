import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, Sparkles, TrendingUp, ArrowRight, Settings, AlertCircle,
  Plus, BookOpen, Target, Clock, Zap, CheckCircle, Loader, Eye,
  BarChart3, Calendar, Award, TrendingDown, Info, X
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { aiWeaknessService, recommendationService, quizService } from '../../services/api/index';

// Import components
import Navbar from '../../components/navigation/Navbar';
import { 
  LoadingState, 
  ErrorState, 
  EmptyState, 
  AuthRequiredState,
  LoadingSkeleton 
} from '../../components/student/ai/LoadingStates';

/**
 * AI Weakness Portal Page - Updated to match real APIs exactly
 */
const AIWeaknessPortal = () => {
  const navigate = useNavigate();
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const isArabic = language === 'ar';

  // State management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weaknessData, setWeaknessData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [recommendationExplanation, setRecommendationExplanation] = useState(null);
  const [explanationLoading, setExplanationLoading] = useState(false);

  // Quiz generation form state - Updated for real API
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [quizFormData, setQuizFormData] = useState({
    course_id: '',
    num_questions: 5,
    time_limit_minutes: 20,
    allow_stretch: true
  });
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizError, setQuizError] = useState('');
  const [quizSuccess, setQuizSuccess] = useState('');

  // Static course data - In real app, this should come from courses API
  const availableCourses = [
    { id: 1, name: isArabic ? 'الرياضيات الأساسية' : 'Basic Mathematics' },
    { id: 2, name: isArabic ? 'الرياضيات المتقدمة' : 'Advanced Mathematics' },
    { id: 3, name: isArabic ? 'الفيزياء' : 'Physics' },
    { id: 4, name: isArabic ? 'الكيمياء' : 'Chemistry' },
    { id: 5, name: isArabic ? 'الأحياء' : 'Biology' },
    { id: 6, name: isArabic ? 'اللغة الإنجليزية' : 'English Language' },
    { id: 7, name: isArabic ? 'اللغة العربية' : 'Arabic Language' }
  ];

  // Fetch data using real APIs
  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated || !user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch data from real APIs - no studentId needed as APIs use authenticated user
        const [weaknessResult, recommendationResult] = await Promise.allSettled([
          aiWeaknessService.getStudentWeaknesses(),
          recommendationService.getStudentRecommendations()
        ]);

        // Handle weakness data
        if (weaknessResult.status === 'fulfilled' && weaknessResult.value.success) {
          setWeaknessData(weaknessResult.value.data);
        } else {
          console.error('Failed to fetch weakness data:', weaknessResult.reason);
          setWeaknessData(null);
        }

        // Handle recommendations
        if (recommendationResult.status === 'fulfilled' && recommendationResult.value.success) {
          const recData = recommendationResult.value.data;
          setRecommendations(recData.recommendations || []);
        } else {
          console.error('Failed to fetch recommendations:', recommendationResult.reason);
          setRecommendations([]);
        }

      } catch (err) {
        console.error('Error fetching data:', err);
        setError(isArabic ? 'حدث خطأ في تحميل البيانات' : 'Error loading data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, user?.id]);

  // Handle quiz form submission - Updated for real API
  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    setQuizLoading(true);
    setQuizError('');
    setQuizSuccess('');

    try {
      // Validate required fields for real API
      if (!quizFormData.course_id) {
        throw new Error(isArabic ? 'يرجى اختيار المادة' : 'Please select a course');
      }

      if (quizFormData.num_questions < 1 || quizFormData.num_questions > 20) {
        throw new Error(isArabic ? 'عدد الأسئلة يجب أن يكون بين 1 و 20' : 'Number of questions must be between 1 and 20');
      }

      if (quizFormData.time_limit_minutes < 5 || quizFormData.time_limit_minutes > 120) {
        throw new Error(isArabic ? 'وقت الامتحان يجب أن يكون بين 5 و 120 دقيقة' : 'Time limit must be between 5 and 120 minutes');
      }

      // Generate quiz using real API
      const result = await quizService.generateQuiz(quizFormData);

      if (result.success) {
        setQuizSuccess(
          isArabic 
            ? `تم إنشاء الامتحان بنجاح! رقم الامتحان: ${result.data.passed_exam_id}` 
            : `Quiz generated successfully! Exam ID: ${result.data.passed_exam_id}`
        );
        
        // Reset form
        setQuizFormData({
          course_id: '',
          num_questions: 5,
          time_limit_minutes: 20,
          allow_stretch: true
        });
        setShowQuizForm(false);
        
        // Refresh recommendations after creating quiz
        setTimeout(async () => {
          try {
            const newRecommendations = await recommendationService.getStudentRecommendations();
            if (newRecommendations.success) {
              setRecommendations(newRecommendations.data.recommendations || []);
            }
          } catch (error) {
            console.error('Error refreshing recommendations:', error);
          }
        }, 1000);
      } else {
        // Handle validation errors from API
        if (result.errors) {
          const errorMessages = Object.values(result.errors).flat();
          throw new Error(errorMessages.join(', '));
        }
        throw new Error(result.error || (isArabic ? 'فشل في إنشاء الامتحان' : 'Failed to generate quiz'));
      }
    } catch (error) {
      console.error('Error generating quiz:', error);
      setQuizError(error.message || (isArabic ? 'حدث خطأ في إنشاء الامتحان' : 'Error generating quiz'));
    } finally {
      setQuizLoading(false);
    }
  };

  // Handle recommendation explanation
  const handleViewExplanation = async (recommendationId) => {
    try {
      setSelectedRecommendation(recommendationId);
      setExplanationLoading(true);
      
      const result = await aiWeaknessService.getQuizExplanation(recommendationId);
      
      if (result.success) {
        setRecommendationExplanation(result.data);
      } else {
        console.error('Failed to fetch explanation:', result.error);
        setRecommendationExplanation(null);
      }
    } catch (error) {
      console.error('Error fetching explanation:', error);
      setRecommendationExplanation(null);
    } finally {
      setExplanationLoading(false);
    }
  };

  // Calculate stats from real data
  const weaknessStats = {
    averageScore: weaknessData?.weaknesses?.[0]?.average_score || 0,
    totalAttempts: weaknessData?.weaknesses?.[0]?.attempts || 0,
    overallScore: weaknessData?.overall_score || 0,
    hasWeaknesses: weaknessData?.weaknesses?.length > 0,
    weaknessCount: weaknessData?.weaknesses?.length || 0,
    improvementAreas: weaknessData?.improvement_areas?.length || 0
  };

  const recommendationStats = {
    totalRecommendations: recommendations.length,
    averageQuestions: recommendations.length > 0 
      ? Math.round(recommendations.reduce((sum, r) => sum + (r.num_questions || 0), 0) / recommendations.length)
      : 0,
    hasRecommendations: recommendations.length > 0,
    lastRecommendation: recommendations.length > 0 ? recommendations[0].created_at : null
  };

  // Page translations
  const translations = {
    pageTitle: isArabic ? 'بوابة التحسين الذكي' : 'AI Improvement Portal',
    pageSubtitle: isArabic ? 'اكتشف نقاط ضعفك وأنشئ امتحانات مخصصة لتحسين أدائك' : 'Discover your weaknesses and create custom quizzes to improve your performance',
    generateQuiz: isArabic ? 'إنشاء امتحان ذكي' : 'Generate Smart Quiz',
    course: isArabic ? 'المادة' : 'Course',
    numQuestions: isArabic ? 'عدد الأسئلة' : 'Number of Questions',
    timeLimit: isArabic ? 'وقت الامتحان (دقيقة)' : 'Time Limit (minutes)',
    allowStretch: isArabic ? 'السماح بتمديد الصعوبة' : 'Allow Difficulty Stretching',
    cancel: isArabic ? 'إلغاء' : 'Cancel',
    generate: isArabic ? 'إنشاء الامتحان' : 'Generate Quiz',
    generating: isArabic ? 'جاري الإنشاء...' : 'Generating...',
    selectCourse: isArabic ? 'اختر المادة' : 'Select Course',
    viewExplanation: isArabic ? 'عرض الشرح' : 'View Explanation',
    recommendationsHistory: isArabic ? 'تاريخ التوصيات' : 'Recommendations History',
    weaknessAnalysis: isArabic ? 'تحليل نقاط الضعف' : 'Weakness Analysis',
    averageScore: isArabic ? 'متوسط النتائج' : 'Average Score',
    totalAttempts: isArabic ? 'إجمالي المحاولات' : 'Total Attempts',
    overallPerformance: isArabic ? 'الأداء العام' : 'Overall Performance',
    avgQuestions: isArabic ? 'متوسط الأسئلة' : 'Avg Questions',
    noWeaknessData: isArabic ? 'لا توجد بيانات نقاط ضعف متاحة' : 'No weakness data available',
    noRecommendations: isArabic ? 'لا توجد توصيات متاحة' : 'No recommendations available',
    needsImprovement: isArabic ? 'يحتاج تحسين' : 'Needs Improvement',
    average: isArabic ? 'متوسط' : 'Average',
    good: isArabic ? 'جيد' : 'Good',
    excellent: isArabic ? 'ممتاز' : 'Excellent'
  };

  // Performance level helper
  const getPerformanceLevel = (score) => {
    if (score >= 85) return { text: translations.excellent, color: 'green' };
    if (score >= 70) return { text: translations.good, color: 'blue' };
    if (score >= 50) return { text: translations.average, color: 'yellow' };
    return { text: translations.needsImprovement, color: 'red' };
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // If not authenticated, show auth required state
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#121212]' : 'bg-[#F0F4F8]'} ${isRTL ? 'rtl font-tajawal' : 'ltr'}`}>
        <Navbar />
        <div className="pt-20">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <AuthRequiredState />
          </div>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#121212]' : 'bg-[#F0F4F8]'} ${isRTL ? 'rtl font-tajawal' : 'ltr'}`}>
        <Navbar />
        <div className="pt-20">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <LoadingSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#121212]' : 'bg-[#F0F4F8]'} ${isRTL ? 'rtl font-tajawal' : 'ltr'}`}>
      <Navbar />
      
      {/* Main Content */}
      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''} mb-4`}>
              <Brain size={40} className={`${isRTL ? 'ml-3' : 'mr-3'} text-[#3949AB]`} />
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                {translations.pageTitle}
              </h1>
              <Sparkles size={32} className={`${isRTL ? 'mr-3' : 'ml-3'} text-[#FFC107] animate-pulse`} />
            </div>
            <p className="text-lg text-[#3949AB] dark:text-[#7986CB] max-w-3xl mx-auto">
              {translations.pageSubtitle}
            </p>
          </div>

          {/* Success/Error Messages */}
          {quizSuccess && (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center">
                <CheckCircle size={20} className="text-green-600 dark:text-green-400 mr-2" />
                <span className="text-green-800 dark:text-green-300">{quizSuccess}</span>
              </div>
            </div>
          )}

          {quizError && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center">
                <AlertCircle size={20} className="text-red-600 dark:text-red-400 mr-2" />
                <span className="text-red-800 dark:text-red-300">{quizError}</span>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center">
                <AlertCircle size={20} className="text-red-600 dark:text-red-400 mr-2" />
                <span className="text-red-800 dark:text-red-300">{error}</span>
              </div>
            </div>
          )}

          {/* Key Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Average Score */}
            <div className={`${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} rounded-xl p-6 shadow-lg border-l-4 border-[#3949AB]`}>
              <div className="flex items-center justify-between mb-3">
                <BarChart3 size={24} className="text-[#3949AB]" />
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                  {weaknessStats.averageScore.toFixed(1)}%
                </div>
              </div>
              <div className="text-sm font-medium text-[#3949AB] dark:text-[#7986CB]">
                {translations.averageScore}
              </div>
              <div className={`text-xs mt-1 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                {weaknessStats.hasWeaknesses ? 
                  (isArabic ? 'من آخر تحليل' : 'From latest analysis') : 
                  (isArabic ? 'لا توجد بيانات' : 'No data available')
                }
              </div>
            </div>

            {/* Total Attempts */}
            <div className={`${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} rounded-xl p-6 shadow-lg border-l-4 border-[#FF9800]`}>
              <div className="flex items-center justify-between mb-3">
                <Target size={24} className="text-[#FF9800]" />
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                  {weaknessStats.totalAttempts}
                </div>
              </div>
              <div className="text-sm font-medium text-[#FF9800]">
                {translations.totalAttempts}
              </div>
              <div className={`text-xs mt-1 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                {isArabic ? 'محاولات مسجلة' : 'Recorded attempts'}
              </div>
            </div>

            {/* Recommendations Count */}
            <div className={`${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} rounded-xl p-6 shadow-lg border-l-4 border-[#4CAF50]`}>
              <div className="flex items-center justify-between mb-3">
                <Sparkles size={24} className="text-[#4CAF50]" />
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                  {recommendationStats.totalRecommendations}
                </div>
              </div>
              <div className="text-sm font-medium text-[#4CAF50]">
                {isArabic ? 'التوصيات' : 'Recommendations'}
              </div>
              <div className={`text-xs mt-1 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                {isArabic ? 'متاحة للمراجعة' : 'Available for review'}
              </div>
            </div>

            {/* Average Questions */}
            <div className={`${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} rounded-xl p-6 shadow-lg border-l-4 border-[#9C27B0]`}>
              <div className="flex items-center justify-between mb-3">
                <BookOpen size={24} className="text-[#9C27B0]" />
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                  {recommendationStats.averageQuestions}
                </div>
              </div>
              <div className="text-sm font-medium text-[#9C27B0]">
                {translations.avgQuestions}
              </div>
              <div className={`text-xs mt-1 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                {isArabic ? 'لكل توصية' : 'Per recommendation'}
              </div>
            </div>
          </div>

          {/* Weakness Analysis Section */}
          {weaknessStats.hasWeaknesses ? (
            <div className="mb-8">
              <div className={`${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-[#37474F]'} flex items-center gap-2`}>
                    <TrendingDown size={24} className="text-[#F44336]" />
                    {translations.weaknessAnalysis}
                  </h2>
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                    weaknessStats.averageScore >= 85 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                      : weaknessStats.averageScore >= 70 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                        : weaknessStats.averageScore >= 50 
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                  }`}>
                    {getPerformanceLevel(weaknessStats.averageScore).text}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Score Visualization */}
                  <div>
                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#37474F]'} mb-4`}>
                      {isArabic ? 'تفاصيل الأداء' : 'Performance Details'}
                    </h3>
                    
                    {/* Progress Circle */}
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative w-32 h-32">
                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-gray-300 dark:text-gray-700"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - weaknessStats.averageScore / 100)}`}
                            className={`transition-all duration-1000 ${
                              weaknessStats.averageScore >= 70 ? 'text-green-500' :
                              weaknessStats.averageScore >= 50 ? 'text-yellow-500' : 'text-red-500'
                            }`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                            {weaknessStats.averageScore.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Attempts Info */}
                    <div className="text-center">
                      <p className={`text-sm ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'} mb-2`}>
                        {isArabic 
                          ? `تم التقييم على أساس ${weaknessStats.totalAttempts} محاولة`
                          : `Evaluated based on ${weaknessStats.totalAttempts} attempts`
                        }
                      </p>
                      {weaknessData?.last_analysis && (
                        <p className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                          {isArabic ? 'آخر تحليل:' : 'Last analysis:'} {formatDate(weaknessData.last_analysis)}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Recommendations & Areas */}
                  <div>
                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#37474F]'} mb-4`}>
                      {isArabic ? 'التوصيات والمناطق المطلوب تحسينها' : 'Recommendations & Improvement Areas'}
                    </h3>
                    
                    {/* Main Recommendation */}
                    {weaknessData.weaknesses[0]?.recommendation && (
                      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-start gap-3">
                          <Info size={20} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                              {isArabic ? 'التوصية الرئيسية' : 'Main Recommendation'}
                            </h4>
                            <p className="text-blue-700 dark:text-blue-300 text-sm">
                              {weaknessData.weaknesses[0].recommendation}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Improvement Areas */}
                    {weaknessData.improvement_areas && weaknessData.improvement_areas.length > 0 && (
                      <div>
                        <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-[#37474F]'} mb-3`}>
                          {isArabic ? 'المناطق المطلوب تحسينها' : 'Areas for Improvement'}
                        </h4>
                        <div className="space-y-2">
                          {weaknessData.improvement_areas.map((area, index) => (
                            <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${
                              isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'
                            }`}>
                              <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                              <span className={`text-sm ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                                {area}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* No improvement areas message */}
                    {(!weaknessData.improvement_areas || weaknessData.improvement_areas.length === 0) && (
                      <div className="text-center py-6">
                        <Award size={48} className="mx-auto text-green-500 mb-3" />
                        <p className={`text-sm ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                          {isArabic 
                            ? 'لا توجد مناطق محددة تحتاج تحسين حالياً'
                            : 'No specific areas need improvement currently'
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-8">
              <div className={`${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} rounded-xl p-8 shadow-lg text-center`}>
                <TrendingUp size={64} className="mx-auto text-[#3949AB] mb-4" />
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-[#37474F]'} mb-2`}>
                  {translations.noWeaknessData}
                </h3>
                <p className={`${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  {isArabic 
                    ? 'ابدأ في حل الامتحانات للحصول على تحليل مفصل لأدائك'
                    : 'Start taking exams to get detailed analysis of your performance'
                  }
                </p>
              </div>
            </div>
          )}

          {/* Quiz Generation Section - Updated for Real API */}
          <div className="mb-8">
            <div className={`${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-[#37474F]'} flex items-center gap-2`}>
                  <Zap size={24} className="text-[#FFC107]" />
                  {translations.generateQuiz}
                </h2>
                {!showQuizForm && (
                  <button
                    onClick={() => setShowQuizForm(true)}
                    className="bg-gradient-to-r from-[#3949AB] to-[#5E35B1] hover:from-[#2E3192] hover:to-[#4527A0] text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg"
                  >
                    <Plus size={20} />
                    {translations.generateQuiz}
                  </button>
                )}
              </div>

              {showQuizForm ? (
                <form onSubmit={handleQuizSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Course Selection - Required */}
                    <div>
                      <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#37474F]'} mb-2`}>
                        {translations.course} *
                      </label>
                      <select
                        value={quizFormData.course_id}
                        onChange={(e) => setQuizFormData({...quizFormData, course_id: parseInt(e.target.value)})}
                        className={`w-full px-4 py-3 border rounded-lg ${
                          isDarkMode 
                            ? 'bg-neutral-800 border-neutral-700 text-white' 
                            : 'bg-white border-neutral-300 text-[#37474F]'
                        } focus:ring-2 focus:ring-[#3949AB] focus:border-transparent transition-all`}
                        required
                      >
                        <option value="">{translations.selectCourse}</option>
                        {availableCourses.map(course => (
                          <option key={course.id} value={course.id}>
                            {course.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Number of Questions */}
                    <div>
                      <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#37474F]'} mb-2`}>
                        {translations.numQuestions} (1-20)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={quizFormData.num_questions}
                        onChange={(e) => setQuizFormData({...quizFormData, num_questions: parseInt(e.target.value)})}
                        className={`w-full px-4 py-3 border rounded-lg ${
                          isDarkMode 
                            ? 'bg-neutral-800 border-neutral-700 text-white' 
                            : 'bg-white border-neutral-300 text-[#37474F]'
                        } focus:ring-2 focus:ring-[#3949AB] focus:border-transparent transition-all`}
                      />
                    </div>

                    {/* Time Limit */}
                    <div>
                      <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#37474F]'} mb-2`}>
                        {translations.timeLimit} (5-120)
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="120"
                        value={quizFormData.time_limit_minutes}
                        onChange={(e) => setQuizFormData({...quizFormData, time_limit_minutes: parseInt(e.target.value)})}
                        className={`w-full px-4 py-3 border rounded-lg ${
                          isDarkMode 
                            ? 'bg-neutral-800 border-neutral-700 text-white' 
                            : 'bg-white border-neutral-300 text-[#37474F]'
                        } focus:ring-2 focus:ring-[#3949AB] focus:border-transparent transition-all`}
                      />
                    </div>

                    {/* Allow Stretch */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="allow_stretch"
                        checked={quizFormData.allow_stretch}
                        onChange={(e) => setQuizFormData({...quizFormData, allow_stretch: e.target.checked})}
                        className="mr-3 h-4 w-4 text-[#3949AB] focus:ring-[#3949AB] border-neutral-300 rounded"
                      />
                      <label htmlFor="allow_stretch" className={`text-sm ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                        {translations.allowStretch}
                      </label>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex items-center justify-end gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowQuizForm(false);
                        setQuizError('');
                      }}
                      className={`px-6 py-3 border rounded-lg transition-colors ${
                        isDarkMode 
                          ? 'border-neutral-700 text-white hover:bg-neutral-800' 
                          : 'border-neutral-300 text-[#37474F] hover:bg-neutral-100'
                      }`}
                    >
                      {translations.cancel}
                    </button>
                    <button
                      type="submit"
                      disabled={quizLoading}
                      className={`px-6 py-3 bg-gradient-to-r from-[#3949AB] to-[#5E35B1] text-white rounded-lg hover:from-[#2E3192] hover:to-[#4527A0] transition-all flex items-center gap-2 shadow-lg ${
                        quizLoading ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105'
                      }`}
                    >
                      {quizLoading ? (
                        <>
                          <Loader size={18} className="animate-spin" />
                          {translations.generating}
                        </>
                      ) : (
                        <>
                          <Zap size={18} />
                          {translations.generate}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <BookOpen size={48} className="mx-auto text-[#3949AB] mb-4" />
                  <p className={`text-lg ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'} mb-2`}>
                    {isArabic 
                      ? 'أنشئ امتحان ذكي مخصص باستخدام الذكاء الاصطناعي'
                      : 'Create a smart custom quiz using AI'
                    }
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {isArabic 
                      ? 'اختر المادة وعدد الأسئلة ووقت الامتحان'
                      : 'Select course, number of questions and time limit'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Recommendations History Section */}
          {recommendationStats.hasRecommendations ? (
            <div className="mb-8">
              <div className={`${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-[#37474F]'} flex items-center gap-2`}>
                    <Calendar size={24} className="text-[#4CAF50]" />
                    {translations.recommendationsHistory}
                  </h2>
                  <div className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    {recommendationStats.totalRecommendations} {isArabic ? 'توصية' : 'recommendations'}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.map((recommendation, index) => (
                    <div key={recommendation.recommendation_id || index} className={`border rounded-xl p-5 transition-all hover:shadow-lg ${
                      isDarkMode ? 'border-neutral-700 hover:border-neutral-600' : 'border-neutral-200 hover:border-neutral-300'
                    }`}>
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#37474F]'} mb-1`}>
                            {recommendation.course_name || `${isArabic ? 'امتحان' : 'Exam'} ${index + 1}`}
                          </h3>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            recommendation.primary_purpose === 'reinforcement' 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                              : recommendation.primary_purpose === 'practice'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                                : 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'
                          }`}>
                            {recommendation.primary_purpose === 'reinforcement' ? (isArabic ? 'تعزيز' : 'Reinforcement') :
                             recommendation.primary_purpose === 'practice' ? (isArabic ? 'تدريب' : 'Practice') :
                             (isArabic ? 'تقييم' : 'Assessment')}
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#3949AB] dark:text-[#7986CB]">
                            {isArabic ? 'الأسئلة:' : 'Questions:'}
                          </span>
                          <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                            {recommendation.num_questions}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#3949AB] dark:text-[#7986CB]">
                            {isArabic ? 'التاريخ:' : 'Date:'}
                          </span>
                          <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                            {formatDate(recommendation.created_at)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#3949AB] dark:text-[#7986CB]">
                            {isArabic ? 'رقم التوصية:' : 'ID:'}
                          </span>
                          <span className={`font-mono text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            {recommendation.recommendation_id?.slice(-8) || 'N/A'}
                          </span>
                        </div>
                        
                        {/* Focus Areas */}
                        {recommendation.focus_area_names && recommendation.focus_area_names.length > 0 && (
                          <div>
                            <span className="text-[#3949AB] dark:text-[#7986CB] text-sm">
                              {isArabic ? 'المناطق المركزة:' : 'Focus Areas:'}
                            </span>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {recommendation.focus_area_names.map((area, idx) => (
                                <span key={idx} className={`text-xs px-2 py-1 rounded ${
                                  isDarkMode ? 'bg-neutral-700 text-neutral-300' : 'bg-neutral-100 text-neutral-700'
                                }`}>
                                  {area}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* View Explanation Button */}
                      {recommendation.recommendation_id && (
                        <button
                          onClick={() => handleViewExplanation(recommendation.recommendation_id)}
                          className="w-full bg-gradient-to-r from-[#3949AB]/10 to-[#5E35B1]/10 hover:from-[#3949AB]/20 hover:to-[#5E35B1]/20 text-[#3949AB] text-sm font-medium py-3 px-4 rounded-lg transition-all border border-[#3949AB]/20 hover:border-[#3949AB]/30 flex items-center justify-center gap-2"
                        >
                          <Eye size={16} />
                          {translations.viewExplanation}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-8">
              <div className={`${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} rounded-xl p-8 shadow-lg text-center`}>
                <Calendar size={64} className="mx-auto text-[#3949AB] mb-4" />
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-[#37474F]'} mb-2`}>
                  {translations.noRecommendations}
                </h3>
                <p className={`${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  {isArabic 
                    ? 'أنشئ امتحان ذكي أولاً للحصول على توصيات مخصصة'
                    : 'Generate a smart quiz first to get personalized recommendations'
                  }
                </p>
              </div>
            </div>
          )}

          {/* Recommendation Explanation Modal */}
          {selectedRecommendation && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className={`${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} rounded-xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl`}>
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
                  <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-[#37474F]'} flex items-center gap-2`}>
                    <Info size={24} className="text-[#3949AB]" />
                    {isArabic ? 'شرح التوصية المفصل' : 'Detailed Recommendation Explanation'}
                  </h3>
                  <button
                    onClick={() => {
                      setSelectedRecommendation(null);
                      setRecommendationExplanation(null);
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
                    }`}
                  >
                    <X size={20} className={isDarkMode ? 'text-neutral-400' : 'text-neutral-600'} />
                  </button>
                </div>
                
                {/* Modal Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
                  {explanationLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader size={32} className="animate-spin text-[#3949AB]" />
                      <span className={`ml-3 ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                        {isArabic ? 'جاري تحميل الشرح...' : 'Loading explanation...'}
                      </span>
                    </div>
                  ) : recommendationExplanation ? (
                    <div className="space-y-6">
                      {/* Main Explanation */}
                      <div>
                        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#37474F]'} mb-3 flex items-center gap-2`}>
                          <BookOpen size={20} className="text-blue-500" />
                          {isArabic ? 'الشرح الأساسي' : 'Main Explanation'}
                        </h4>
                        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-neutral-800' : 'bg-blue-50'} border border-blue-200 dark:border-blue-800`}>
                          <p className={`${isDarkMode ? 'text-neutral-300' : 'text-blue-800'}`}>
                            {recommendationExplanation.explanation || (isArabic ? 'لا يتوفر شرح' : 'No explanation available')}
                          </p>
                        </div>
                      </div>
                      
                      {/* Learning Objectives */}
                      {recommendationExplanation.learning_objectives && recommendationExplanation.learning_objectives.length > 0 && (
                        <div>
                          <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#37474F]'} mb-3 flex items-center gap-2`}>
                            <Target size={20} className="text-green-500" />
                            {isArabic ? 'أهداف التعلم' : 'Learning Objectives'}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {recommendationExplanation.learning_objectives.map((objective, index) => (
                              <div key={index} className={`p-3 rounded-lg ${isDarkMode ? 'bg-neutral-800' : 'bg-green-50'} border border-green-200 dark:border-green-800`}>
                                <div className="flex items-start gap-2">
                                  <CheckCircle size={16} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className={`text-sm ${isDarkMode ? 'text-neutral-300' : 'text-green-800'}`}>
                                    {objective}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Time Management */}
                      {recommendationExplanation.time_management && recommendationExplanation.time_management.length > 0 && (
                        <div>
                          <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#37474F]'} mb-3 flex items-center gap-2`}>
                            <Clock size={20} className="text-orange-500" />
                            {isArabic ? 'إدارة الوقت' : 'Time Management'}
                          </h4>
                          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-neutral-800' : 'bg-orange-50'} border border-orange-200 dark:border-orange-800`}>
                            <ul className="space-y-2">
                              {recommendationExplanation.time_management.map((time, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <Clock size={14} className="text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0" />
                                  <span className={`text-sm ${isDarkMode ? 'text-neutral-300' : 'text-orange-800'}`}>
                                    {time}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Reasoning Details */}
                      {recommendationExplanation.reasoning_details && (
                        <div>
                          <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#37474F]'} mb-3 flex items-center gap-2`}>
                            <Brain size={20} className="text-purple-500" />
                            {isArabic ? 'تفاصيل التفكير الذكي' : 'AI Reasoning Details'}
                          </h4>
                          <div className="space-y-4">
                            {/* Personalization Factors */}
                            {recommendationExplanation.reasoning_details.personalization_factors && recommendationExplanation.reasoning_details.personalization_factors.length > 0 && (
                              <div>
                                <h5 className={`text-sm font-medium ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'} mb-2`}>
                                  {isArabic ? 'عوامل التخصيص:' : 'Personalization Factors:'}
                                </h5>
                                <div className="grid gap-2">
                                  {recommendationExplanation.reasoning_details.personalization_factors.map((factor, index) => (
                                    <div key={index} className={`text-xs p-2 rounded ${isDarkMode ? 'bg-purple-900/20 text-purple-300' : 'bg-purple-100 text-purple-800'}`}>
                                      • {factor}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Difficulty Rationale */}
                            {recommendationExplanation.reasoning_details.difficulty_rationale && (
                              <div>
                                <h5 className={`text-sm font-medium ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'} mb-2`}>
                                  {isArabic ? 'مبرر مستوى الصعوبة:' : 'Difficulty Rationale:'}
                                </h5>
                                <div className={`text-xs p-3 rounded-lg ${isDarkMode ? 'bg-purple-900/20 text-purple-300' : 'bg-purple-100 text-purple-800'}`}>
                                  {recommendationExplanation.reasoning_details.difficulty_rationale}
                                </div>
                              </div>
                            )}

                            {/* AI Confidence Level */}
                            {recommendationExplanation.reasoning_details.ai_confidence_level && (
                              <div>
                                <h5 className={`text-sm font-medium ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'} mb-2`}>
                                  {isArabic ? 'مستوى ثقة الذكاء الاصطناعي:' : 'AI Confidence Level:'}
                                </h5>
                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                  recommendationExplanation.reasoning_details.ai_confidence_level === 'high'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                                    : recommendationExplanation.reasoning_details.ai_confidence_level === 'medium'
                                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                                }`}>
                                  {recommendationExplanation.reasoning_details.ai_confidence_level === 'high' ? (isArabic ? 'عالية' : 'High') :
                                   recommendationExplanation.reasoning_details.ai_confidence_level === 'medium' ? (isArabic ? 'متوسطة' : 'Medium') :
                                   (isArabic ? 'منخفضة' : 'Low')}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Expected Outcomes */}
                      {recommendationExplanation.expected_outcomes && recommendationExplanation.expected_outcomes.length > 0 && (
                        <div>
                          <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#37474F]'} mb-3 flex items-center gap-2`}>
                            <TrendingUp size={20} className="text-blue-500" />
                            {isArabic ? 'النتائج المتوقعة' : 'Expected Outcomes'}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {recommendationExplanation.expected_outcomes.map((outcome, index) => (
                              <div key={index} className={`p-3 rounded-lg ${isDarkMode ? 'bg-neutral-800' : 'bg-blue-50'} border border-blue-200 dark:border-blue-800`}>
                                <div className="flex items-start gap-2">
                                  <ArrowRight size={16} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                  <span className={`text-sm ${isDarkMode ? 'text-neutral-300' : 'text-blue-800'}`}>
                                    {outcome}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
                      <p className={`${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                        {isArabic ? 'فشل في تحميل الشرح' : 'Failed to load explanation'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIWeaknessPortal;