import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Layout, Image, Tooltip, message, Spin } from 'antd';
import { ClockCircleOutlined, SendOutlined, SaveOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import useOnlineExamQuestions from '../../hooks/api/useOnlineExamQuestions';
import ExamTimer from '../../components/exams/ExamTimer';
import ExamProgress from '../../components/exams/ExamProgress';
import QuestionNavigation from '../../components/exams/QuestionNavigation';
import QuestionCard from '../../components/exams/QuestionCard';
import NavigationButtons from '../../components/exams/NavigationButtons';
import ExamCompletionModal from '../../components/exams/ExamCompletionModal';

const { Content } = Layout;

const ExamQuestionsPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  
  // Use the online exam questions hook
  const {
    loading,
    error,
    examData,
    questions,
    userAnswers,
    examStatus,
    timeRemaining,
    submitLoading,
    saveLoading,
    startExam,
    retryExam,
    continueExam,
    reviewExam,
    updateAnswer,
    saveProgress,
    finishExam,
    getAnsweredCount,
    getProgressPercentage,
    isAllAnswered,
    clearError,
    updateTimeRemaining
  } = useOnlineExamQuestions();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isExamEnded, setIsExamEnded] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(Date.now());
  const [autoSaveInterval, setAutoSaveInterval] = useState(null);

  // Load exam data based on URL parameters
  useEffect(() => {
    if (!isAuthenticated || !user) {
      message.error(language === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Please login first');
      navigate('/auth?mode=login');
      return;
    }

    if (!examId) {
      message.error(language === 'ar' ? 'معرف الامتحان مطلوب' : 'Exam ID is required');
      navigate('/exams');
      return;
    }

    const loadExam = async () => {
      try {
        clearError();
        
        // Determine action based on URL parameters
        const urlParams = new URLSearchParams(location.search);
        const isContinue = urlParams.get('continue') === 'true';
        const isReview = location.pathname.includes('/review');
        
        let result;
        
        if (isReview) {
          result = await reviewExam(examId);
        } else if (isContinue) {
          result = await continueExam(examId);
        } else {
          // Default to start exam
          result = await startExam(examId);
        }
        
        if (!result.success) {
          if (result.status === 'unavailable') {
            message.error(result.error || (language === 'ar' ? 'هذا الامتحان غير متاح حالياً' : 'This exam is not available'));
            navigate(`/exams/${examId}`);
          } else {
            message.error(result.error || (language === 'ar' ? 'خطأ في تحميل الامتحان' : 'Error loading exam'));
          }
        }
      } catch (error) {
        console.error('Error loading exam:', error);
        message.error(language === 'ar' ? 'خطأ في الاتصال بالخادم' : 'Server connection error');
      }
    };

    loadExam();
  }, [examId, location.search, location.pathname, isAuthenticated, user, language, navigate, startExam, continueExam, reviewExam, clearError]);

  // Auto-save functionality
  useEffect(() => {
    if (examData && !isExamEnded && examStatus !== 'revision') {
      // Set up auto-save every 30 seconds
      const interval = setInterval(async () => {
        const now = Date.now();
        if (now - lastSaveTime > 30000) { // Only save if 30 seconds have passed
          const result = await saveProgress(examId, timeRemaining);
          if (result.success) {
            setLastSaveTime(now);
            console.log('💾 Auto-saved progress');
          }
        }
      }, 30000);
      
      setAutoSaveInterval(interval);
      
      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }
  }, [examData, isExamEnded, examStatus, examId, timeRemaining, saveProgress, lastSaveTime]);

  // Manual save on answer change
  useEffect(() => {
    if (examData && Object.keys(userAnswers).length > 0) {
      const saveTimeout = setTimeout(async () => {
        const result = await saveProgress(examId, timeRemaining);
        if (result.success) {
          setLastSaveTime(Date.now());
        }
      }, 2000); // Save 2 seconds after last answer change
      
      return () => clearTimeout(saveTimeout);
    }
  }, [userAnswers, examData, examId, timeRemaining, saveProgress]);

  const handleAnswerChange = (questionId, answer) => {
    updateAnswer(questionId, answer);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToQuestion = (index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  const handleEndExam = () => {
    setShowCompletionModal(true);
  };

  const confirmEndExam = async () => {
    setIsExamEnded(true);
    setShowCompletionModal(false);
    
    try {
      // Get passed exam ID from exam data
      const passedExamId = examData?.passed_exam_id;
      
      if (!passedExamId) {
        message.error(language === 'ar' ? 'لم يتم العثور على معرف جلسة الامتحان' : 'Could not find exam session ID');
        setIsExamEnded(false);
        return;
      }
      
      // Finish exam session
      const result = await finishExam(passedExamId);
      
      if (result.success) {
        message.success(language === 'ar' ? 'تم إنهاء الامتحان بنجاح' : 'Exam finished successfully');
        
        // Navigate to results page with attempt ID
        navigate(`/exams/${examId}/results/${passedExamId}`, { 
          state: { 
            examData: examData,
            userAnswers: userAnswers,
            timeSpent: (examData?.duration_in_seconds || 0) - timeRemaining,
            submissionData: result.data
          } 
        });
      } else {
        message.error(result.error || (language === 'ar' ? 'خطأ في إنهاء الامتحان' : 'Error finishing exam'));
        setIsExamEnded(false);
      }
    } catch (error) {
      console.error('Error finishing exam:', error);
      message.error(language === 'ar' ? 'خطأ في الاتصال بالخادم' : 'Server connection error');
      setIsExamEnded(false);
    }
  };

  const cancelEndExam = () => {
    setShowCompletionModal(false);
  };

  const handleTimeEnd = async () => {
    setIsExamEnded(true);
    
    try {
      // Get passed exam ID from exam data
      const passedExamId = examData?.passed_exam_id;
      
      if (passedExamId) {
        // Auto-finish when time ends
        const result = await finishExam(passedExamId);
        
        message.info(language === 'ar' ? 'انتهى الوقت المحدد وتم إنهاء الامتحان' : 'Time is up, exam has been finished');
        
        // Navigate to results page with attempt ID
        navigate(`/exams/${examId}/results/${passedExamId}`, { 
          state: { 
            examData: examData,
            userAnswers: userAnswers,
            timeSpent: examData?.duration_in_seconds || 0,
            submissionData: result.data,
            timeUp: true
          } 
        });
      } else {
        message.error(language === 'ar' ? 'لم يتم العثور على معرف جلسة الامتحان' : 'Could not find exam session ID');
      }
    } catch (error) {
      console.error('Error auto-finishing exam:', error);
      message.error(language === 'ar' ? 'خطأ في إنهاء الامتحان التلقائي' : 'Error auto-finishing exam');
    }
  };

  // دالة للحصول على الإجابة الصحيحة للسؤال
  const getCorrectAnswerForQuestion = (questionId) => {
    const question = questions.find(q => q.id === questionId);
    if (!question || !question.choices) return null;
    
    // البحث عن الإجابة الصحيحة في الـ choices
    // يمكن أن تكون محددة في الـ API أو نحتاج لتحديدها حسب البيانات المتوفرة
    // هذا مثال - قد نحتاج لتعديله حسب بنية البيانات الفعلية
    const correctChoice = question.choices.find(choice => choice.is_correct);
    return correctChoice ? correctChoice.id : null;
  };

  // Handle loading state
  if (loading) {
    return (
      <div className={`flex items-center justify-center h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-lg">
            {language === 'ar' ? 'جاري تحميل الامتحان...' : 'Loading exam...'}
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
            {language === 'ar' ? 'خطأ في تحميل الامتحان' : 'Error Loading Exam'}
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-x-4">
            <Button type="primary" onClick={() => navigate(`/exams/${examId}`)}>
              {language === 'ar' ? 'العودة لتفاصيل الامتحان' : 'Back to Exam Details'}
            </Button>
            <Button onClick={() => navigate('/exams')}>
              {language === 'ar' ? 'العودة للامتحانات' : 'Back to Exams'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle no questions state
  if (!questions || questions.length === 0) {
    return (
      <div className={`flex items-center justify-center h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h2 className="text-xl font-bold mb-2">
            {language === 'ar' ? 'لا توجد أسئلة متاحة' : 'No Questions Available'}
          </h2>
          <p className="text-gray-600 mb-4">
            {language === 'ar' ? 'هذا الامتحان لا يحتوي على أسئلة حالياً' : 'This exam currently has no questions'}
          </p>
          <Button type="primary" onClick={() => navigate(`/exams/${examId}`)}>
            {language === 'ar' ? 'العودة' : 'Go Back'}
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = getProgressPercentage();
  const answeredQuestionsCount = getAnsweredCount();
  const allQuestionsAnswered = isAllAnswered();

  // Color scheme from the provided image
  const colors = {
    primaryDark: '#1A237F', // Primary Dark
    primaryBase: '#3949AB', // Primary Base
    primaryLight: '#7986CB', // Primary Light
    purple: '#6B3DD2',     // Purple from screenshots
    accent: '#FFC107',     // Accent/Yellow
    textDark: '#37474F',   // Text Dark
    bgLight: '#ECEFF1',    // Background Light
    white: '#FFFFFF',      // White
  };

  // Style for end exam button matching screenshots
  const endExamButtonStyle = {
    backgroundColor: colors.purple,
    borderColor: colors.purple,
    color: 'white',
    width: '100%',
    height: '48px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '8px',
  };
  
  // Style for floating end exam button
  const floatingEndExamButtonStyle = {
    backgroundColor: colors.purple,
    borderColor: colors.purple,
    color: 'white',
    height: '48px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '8px',
    paddingLeft: '24px',
    paddingRight: '24px',
  };

  return (
    <Layout className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Progress bar at the very top */}
      <div className={`fixed top-16 left-0 right-0 z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="text-sm">
            {language === 'ar' ? 'التقدم في الامتحان' : 'Exam Progress'}
          </div>
          <div className="text-sm">
            {progressPercentage.toFixed(0)}%
          </div>
        </div>
        <div 
          className="h-1 transition-all duration-300"
          style={{ 
            width: `${progressPercentage}%`,
            backgroundColor: colors.purple 
          }}
        ></div>
      </div>

      {/* Main content - pushed down further to account for header + progress bar */}
      <Content className="container mx-auto px-4 pt-32 pb-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Side panel with question navigation */}
          <div className={`w-full md:w-56 ${language === 'ar' ? 'md:order-2' : 'md:order-1'}`}>
            <div className={`flex items-center justify-between mb-4 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`} style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
              <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} ${language === 'ar' ? 'text-right font-arabic' : 'text-left'}`}>
                {language === 'ar' ? 'الأسئلة' : 'Questions'}
              </h2>
            </div>
            <div className={`sticky top-32 rounded-lg shadow-md p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
              <QuestionNavigation 
                questions={questions}
                currentIndex={currentQuestionIndex}
                userAnswers={userAnswers}
                onQuestionSelect={goToQuestion}
                colors={colors}
              />
              
              {/* End Exam Button - Fixed at the bottom of the navigation */}
              <div className="mt-6 pt-3 border-t border-gray-200 dark:border-gray-600">
                {examStatus !== 'revision' ? (
                  <Button 
                    type="primary"
                    loading={submitLoading}
                    onClick={handleEndExam}
                    className={`flex items-center justify-center w-full h-12 text-base font-bold rounded-lg transition-all duration-200 hover:scale-105 ${language === 'ar' ? 'font-arabic' : ''}`}
                    icon={<SendOutlined />}
                    style={{
                      backgroundColor: colors.purple,
                      borderColor: colors.purple,
                      color: 'white',
                      direction: language === 'ar' ? 'rtl' : 'ltr'
                    }}
                    disabled={isExamEnded}
                  >
                    <span className={language === 'ar' ? 'text-right' : 'text-left'}>
                      {submitLoading 
                        ? (language === 'ar' ? 'جاري الإرسال...' : 'Submitting...') 
                        : (language === 'ar' ? 'سبميت' : 'Submit')
                      }
                    </span>
                  </Button>
                ) : (
                  <Button 
                    type="default"
                    onClick={() => navigate(`/exams/${examId}`)}
                    className={`flex items-center justify-center w-full h-12 text-base font-bold rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'} ${language === 'ar' ? 'font-arabic' : ''}`}
                    style={{
                      direction: language === 'ar' ? 'rtl' : 'ltr'
                    }}
                  >
                    <span className={language === 'ar' ? 'text-right' : 'text-left'}>
                      {language === 'ar' ? 'العودة للامتحان' : 'Back to Exam'}
                    </span>
                  </Button>
                )}
                
                {/* Show extra indicator if all questions are answered */}
                {allQuestionsAnswered && examStatus !== 'revision' && (
                  <div className={`mt-2 text-center text-green-500 text-xs font-semibold ${language === 'ar' ? 'text-right' : 'text-left'}`} style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
                    {language === 'ar' 
                      ? 'تمت الإجابة على جميع الأسئلة!' 
                      : 'All questions answered!'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main question area */}
          <div className={`flex-1 ${language === 'ar' ? 'md:order-1' : 'md:order-2'}`}>
            <div className={`flex items-center justify-between mb-4 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`} style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
              <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} ${language === 'ar' ? 'text-right font-arabic' : 'text-left'}`}>
                {language === 'ar' ? `السؤال ${currentQuestionIndex + 1}` : `Question ${currentQuestionIndex + 1}`}
              </h1>
              <div className={`flex items-center space-x-4 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
                {/* Timer ومعلومات الامتحان */}
                {saveLoading && (
                  <Tooltip title={language === 'ar' ? 'جاري الحفظ...' : 'Saving...'}>
                    <SaveOutlined className="text-blue-500 animate-spin" />
                  </Tooltip>
                )}
                <ExamTimer 
                  initialTime={timeRemaining || examData?.duration_in_seconds || 0} 
                  onTimeEnd={handleTimeEnd} 
                  isExamEnded={isExamEnded}
                  colors={colors}
                  onTimeUpdate={updateTimeRemaining}
                />
              </div>
            </div>
            
            <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`} style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
              {/* Question */}
              <QuestionCard 
                question={currentQuestion}
                userAnswer={userAnswers[currentQuestion.id]}
                onAnswerChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
                language={language}
                isDarkMode={isDarkMode}
                colors={colors}
                imageMaxWidth={400}
                isReviewMode={examStatus === 'revision'}
                examSettings={examData?.exam_settings}
                correctAnswer={examData?.exam_settings?.show_correct_answers_directly ? 
                  getCorrectAnswerForQuestion(currentQuestion.id) : null}
              />

              <div className="mt-8">
                <NavigationButtons 
                  currentQuestionIndex={currentQuestionIndex}
                  totalQuestions={questions.length}
                  onPrevious={goToPreviousQuestion}
                  onNext={goToNextQuestion}
                  language={language}
                  colors={colors}
                />
                
                {/* Extra Submit button for better visibility */}
                {(currentQuestionIndex === questions.length - 1 || allQuestionsAnswered) && examStatus !== 'revision' && (
                  <div className={`flex justify-center mt-6 ${language === 'ar' ? 'text-right' : 'text-left'}`} style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
                    <Button 
                      type="primary"
                      loading={submitLoading}
                      onClick={handleEndExam}
                      className={`flex items-center px-6 py-3 text-base font-bold rounded-lg transition-all duration-200 hover:scale-105 ${language === 'ar' ? 'font-arabic' : ''}`}
                      icon={<SendOutlined />}
                      style={{
                        backgroundColor: colors.purple,
                        borderColor: colors.purple,
                        color: 'white',
                        height: '48px',
                        direction: language === 'ar' ? 'rtl' : 'ltr'
                      }}
                      disabled={isExamEnded}
                    >
                      <span className={language === 'ar' ? 'text-right mr-2' : 'text-left ml-2'}>
                        {submitLoading 
                          ? (language === 'ar' ? 'جاري الإرسال...' : 'Submitting...') 
                          : (language === 'ar' ? 'سبميت' : 'Submit')
                        }
                      </span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Content>

      {showCompletionModal && (
        <ExamCompletionModal 
          onConfirm={confirmEndExam} 
          onCancel={cancelEndExam}
          language={language}
          colors={colors}
          loading={submitLoading}
          answeredCount={answeredQuestionsCount}
          totalQuestions={questions.length}
        />
      )}
    </Layout>
  );
};

export default ExamQuestionsPage;