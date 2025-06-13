import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Trophy, 
  Clock, 
  CheckCircle, 
  XCircle,
  RotateCcw,
  Eye,
  Home 
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import useOnlineExamQuestions from '../../hooks/api/useOnlineExamQuestions';

// Custom components to replace Ant Design
const CustomButton = ({ children, disabled, onClick, className, loading, ...props }) => (
  <button
    disabled={disabled || loading}
    onClick={onClick}
    className={`${className} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''} ${loading ? 'animate-pulse' : ''}`}
    {...props}
  >
    {loading ? (
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current"></div>
        <span>{children}</span>
      </div>
    ) : (
      children
    )}
  </button>
);

const CustomCard = ({ children, className, title }) => (
  <div className={className}>
    {title && <div className="text-lg font-semibold mb-4">{title}</div>}
    {children}
  </div>
);

const ProgressCircle = ({ percent, size = 120, strokeColor = '#3B82F6' }) => {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth="8"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold">{percent}%</div>
        <div className="text-xs text-gray-500">النتيجة</div>
      </div>
    </div>
  );
};

const ProgressBar = ({ percent, strokeColor = '#3B82F6', showInfo = true }) => (
  <div className="w-full">
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div 
        className="h-2.5 rounded-full transition-all duration-300" 
        style={{ 
          width: `${percent}%`, 
          backgroundColor: strokeColor 
        }}
      ></div>
    </div>
    {showInfo && (
      <div className="text-right mt-1 text-sm text-gray-600 dark:text-gray-400">
        {percent}%
      </div>
    )}
  </div>
);

const ExamResultsPage = () => {
  const { examId, attemptId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  
  // Use the online exam questions hook
  const {
    loading,
    error,
    examResults,
    resultsLoading,
    getResults,
    clearError
  } = useOnlineExamQuestions();
  
  // State from navigation (if available)
  const [navigationState, setNavigationState] = useState(location.state || null);
  const [retryLoading, setRetryLoading] = useState(false);

  // Color scheme
  const colors = {
    primaryDark: '#1A237F',
    primaryBase: '#3949AB',
    primaryLight: '#7986CB',
    purple: '#6B3DD2',
    accent: '#FFC107',
    textDark: '#37474F',
    bgLight: '#ECEFF1',
    white: '#FFFFFF',
    success: '#52C41A',
    error: '#FF4D4F',
    warning: '#FAAD14'
  };

  // Load exam results on component mount
  useEffect(() => {
    if (!isAuthenticated || !user) {
      console.error(language === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Please login first');
      navigate('/auth?mode=login');
      return;
    }

    if (!examId) {
      console.error(language === 'ar' ? 'معرف الامتحان مطلوب' : 'Exam ID is required');
      navigate('/exams');
      return;
    }

    // إذا لم يتم تمرير attemptId، استخدم 'latest'
    const targetAttemptId = attemptId || 'latest';
    
    console.log('📊 [ExamResultsPage] Using attempt ID:', targetAttemptId);

    const loadResults = async () => {
      try {
        clearError();
        console.log(`📊 Loading results for exam ${examId}, attempt ${targetAttemptId}`);
        
        const result = await getResults(examId, targetAttemptId);
        
        if (!result.success) {
          console.error(result.error || (language === 'ar' ? 'خطأ في تحميل النتائج' : 'Error loading results'));
        }
      } catch (error) {
        console.error('Error loading results:', error);
        console.error(language === 'ar' ? 'خطأ في الاتصال بالخادم' : 'Server connection error');
      }
    };

    loadResults();
  }, [examId, attemptId, isAuthenticated, user, language, navigate, getResults, clearError]);

  const handleRetryExam = () => {
    setRetryLoading(true);
    // Navigate back to exam details to start a new attempt
    navigate(`/exams/${examId}`);
  };

  const handleReviewExam = () => {
    // Navigate to review mode
    navigate(`/exams/${examId}/review/${attemptId || 'latest'}`);
  };

  const handleBackToExams = () => {
    navigate('/exams');
  };

  // Handle loading state
  if (loading || resultsLoading) {
    return (
      <div className={`flex items-center justify-center h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="mt-4 text-lg">
            {language === 'ar' ? 'جاري تحميل النتائج...' : 'Loading results...'}
          </p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className={`flex items-center justify-center h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">
            {language === 'ar' ? 'خطأ في تحميل النتائج' : 'Error Loading Results'}
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-x-4">
            <CustomButton 
              onClick={() => navigate(`/exams/${examId}`)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              {language === 'ar' ? 'العودة للامتحان' : 'Back to Exam'}
            </CustomButton>
            <CustomButton 
              onClick={handleBackToExams}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              {language === 'ar' ? 'العودة للامتحانات' : 'Back to Exams'}
            </CustomButton>
          </div>
        </div>
      </div>
    );
  }

  // Use results from API or navigation state as fallback
  const results = examResults || navigationState;
  
  if (!results) {
    return (
      <div className={`flex items-center justify-center h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📊</div>
          <h2 className="text-xl font-bold mb-2">
            {language === 'ar' ? 'لا توجد نتائج متاحة' : 'No Results Available'}
          </h2>
          <p className="text-gray-600 mb-4">
            {language === 'ar' ? 'لم نتمكن من العثور على نتائج هذا الامتحان' : 'We could not find results for this exam'}
          </p>
          <CustomButton 
            onClick={handleBackToExams}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            {language === 'ar' ? 'العودة للامتحانات' : 'Back to Exams'}
          </CustomButton>
        </div>
      </div>
    );
  }

  // Extract data from results
  const score = results.score || results.percentage || 0;
  const totalQuestions = results.totalQuestions || results.total_questions || 0;
  const correctAnswers = results.correctAnswers || results.correct_answers || 0;
  const incorrectAnswers = results.incorrectAnswers || results.incorrect_answers || 0;
  const timeSpent = results.timeSpent || results.time_spent || 0;
  const passingScore = results.passingScore || results.passing_score || 50;
  const passed = score >= passingScore;
  const examTitle = results.examData?.title || results.exam_title || results.examData?.name || 'الامتحان';

  // Format time spent
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
              passed 
                ? 'bg-green-100 text-green-600' 
                : 'bg-red-100 text-red-600'
            }`}>
              {passed ? <Trophy className="text-3xl" /> : <XCircle className="text-3xl" />}
            </div>
            
            <h2 className={`mb-2 text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {passed 
                ? (language === 'ar' ? 'تهانينا! لقد نجحت' : 'Congratulations! You Passed') 
                : (language === 'ar' ? 'للأسف، لم تنجح هذه المرة' : 'Sorry, You Did Not Pass This Time')
              }
            </h2>
            
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {examTitle}
            </p>
          </div>

          {/* Score Overview */}
          <CustomCard 
            className={`mb-6 p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-center">
                <ProgressCircle
                  percent={score}
                  size={120}
                  strokeColor={passed ? colors.success : colors.error}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2 text-green-600">
                    <CheckCircle className="w-6 h-6 mr-2" />
                    <span className="text-2xl font-bold">{correctAnswers}</span>
                    <span className="text-sm text-gray-500 ml-1">/ {totalQuestions}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? 'الإجابات الصحيحة' : 'Correct Answers'}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2 text-red-600">
                    <XCircle className="w-6 h-6 mr-2" />
                    <span className="text-2xl font-bold">{incorrectAnswers}</span>
                    <span className="text-sm text-gray-500 ml-1">/ {totalQuestions}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? 'الإجابات الخاطئة' : 'Incorrect Answers'}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2 text-blue-600">
                    <Clock className="w-6 h-6 mr-2" />
                    <span className="text-lg font-bold">{formatTime(timeSpent)}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? 'الوقت المستغرق' : 'Time Spent'}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2 text-yellow-600">
                    <Trophy className="w-6 h-6 mr-2" />
                    <span className="text-lg font-bold">{passingScore}%</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? 'النسبة المطلوبة' : 'Passing Score'}
                  </p>
                </div>
              </div>
            </div>
          </CustomCard>

          {/* Performance Analysis */}
          <CustomCard 
            title={language === 'ar' ? 'تحليل الأداء' : 'Performance Analysis'}
            className={`mb-6 p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {language === 'ar' ? 'معدل الإجابات الصحيحة' : 'Accuracy Rate'}
                    </span>
                    <span className="font-bold">{Math.round((correctAnswers / totalQuestions) * 100)}%</span>
                  </div>
                  <ProgressBar 
                    percent={Math.round((correctAnswers / totalQuestions) * 100)} 
                    strokeColor={colors.success}
                    showInfo={false}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {language === 'ar' ? 'التقدم نحو الهدف' : 'Progress to Target'}
                    </span>
                    <span className="font-bold">{Math.min(Math.round((score / passingScore) * 100), 100)}%</span>
                  </div>
                  <ProgressBar 
                    percent={Math.min(Math.round((score / passingScore) * 100), 100)} 
                    strokeColor={passed ? colors.success : colors.warning}
                    showInfo={false}
                  />
                </div>
              </div>
              
              <div className="text-center">
                <div className={`inline-block px-4 py-2 rounded-lg text-lg font-medium ${
                  passed 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {passed 
                    ? (language === 'ar' ? '✅ نجح' : '✅ Passed')
                    : (language === 'ar' ? '❌ لم ينجح' : '❌ Failed')
                  }
                </div>
                
                <div className="mt-4">
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {passed 
                      ? (language === 'ar' 
                        ? 'أحسنت! لقد تجاوزت النسبة المطلوبة بنجاح'
                        : 'Well done! You have successfully exceeded the required score')
                      : (language === 'ar'
                        ? `تحتاج إلى ${passingScore - score}% إضافية للنجاح`
                        : `You need ${passingScore - score}% more to pass`)
                    }
                  </p>
                </div>
              </div>
            </div>
          </CustomCard>

          {/* Actions */}
          <CustomCard 
            className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
          >
            <div className="text-center space-y-4">
              <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {language === 'ar' ? 'ماذا تريد أن تفعل الآن؟' : 'What would you like to do next?'}
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <CustomButton 
                  onClick={handleReviewExam}
                  className="flex items-center justify-center space-x-2 h-12 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors"
                >
                  <Eye className="w-5 h-5" />
                  <span>{language === 'ar' ? 'مراجعة الإجابات' : 'Review Answers'}</span>
                </CustomButton>
                
                <CustomButton 
                  loading={retryLoading}
                  onClick={handleRetryExam}
                  className="flex items-center justify-center space-x-2 h-12 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>{language === 'ar' ? 'إعادة المحاولة' : 'Try Again'}</span>
                </CustomButton>
                
                <CustomButton 
                  onClick={handleBackToExams}
                  className="flex items-center justify-center space-x-2 h-12 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span>{language === 'ar' ? 'العودة للامتحانات' : 'Back to Exams'}</span>
                </CustomButton>
              </div>
            </div>
          </CustomCard>

          {/* Show navigation state in development */}
          {process.env.NODE_ENV === 'development' && navigationState && (
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h5 className="text-sm font-medium mb-2">Debug - Navigation State</h5>
              <pre className="text-xs overflow-auto bg-gray-50 dark:bg-gray-900 p-2 rounded">
                {JSON.stringify(navigationState, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamResultsPage;