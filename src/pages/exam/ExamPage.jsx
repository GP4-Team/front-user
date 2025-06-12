// src/pages/exam/ExamPage.jsx
/**
 * صفحة الامتحان الرئيسية
 * Main Exam Page
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import useExamSession from '../../hooks/useExamSession';

// Components
import ExamTimer from '../../components/exam/ExamTimer';
import ExamNavigation from '../../components/exam/ExamNavigation';
import MultipleChoiceQuestion from '../../components/questions/MultipleChoiceQuestion';
import TrueFalseQuestion from '../../components/questions/TrueFalseQuestion';

const ExamPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { language, isRTL } = useLanguage();
  const { isAuthenticated } = useAuth();

  // استخدام hook إدارة الامتحان
  const {
    examData,
    currentQuestion,
    currentQuestionIndex,
    answers,
    progress,
    timeRemaining,
    formattedTimeRemaining,
    examFinished,
    loading,
    error,
    submitting,
    updateAnswer,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    handleExamEnd,
    retryLoad
  } = useExamSession(examId);

  // State محلي للتحكم في الواجهة
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState(null);

  // تحديث الإجابة المحلية عند تغيير السؤال
  useEffect(() => {
    if (currentQuestion && answers[currentQuestion.id]) {
      setCurrentAnswer(answers[currentQuestion.id].answer);
    } else {
      setCurrentAnswer(null);
    }
  }, [currentQuestion, answers]);

  // التحقق من الصلاحية
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth?mode=login');
      return;
    }
  }, [isAuthenticated, navigate]);

  // معالجة تغيير الإجابة
  const handleAnswerChange = (answer) => {
    if (currentQuestion) {
      setCurrentAnswer(answer);
      updateAnswer(currentQuestion.id, answer);
    }
  };

  // معالجة إرسال الإجابة
  const handleAnswerSubmit = async (answer) => {
    if (currentQuestion && answer !== null) {
      try {
        await submitAnswer(currentQuestion.id, answer, currentQuestion.type);
      } catch (err) {
        console.error('Error submitting answer:', err);
      }
    }
  };

  // معالجة انتهاء الوقت
  const handleTimeUp = () => {
    handleExamEnd();
  };

  // معالجة إنهاء الامتحان يدوياً
  const handleFinishExam = () => {
    setShowSubmitConfirm(true);
  };

  // تأكيد إنهاء الامتحان
  const confirmFinishExam = () => {
    setShowSubmitConfirm(false);
    handleExamEnd();
  };

  // إلغاء إنهاء الامتحان
  const cancelFinishExam = () => {
    setShowSubmitConfirm(false);
  };

  // عرض حالة التحميل
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
            {language === 'ar' ? 'جاري تحميل الامتحان...' : 'Loading exam...'}
          </p>
        </div>
      </div>
    );
  }

  // عرض حالة الخطأ
  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {language === 'ar' ? 'خطأ في تحميل الامتحان' : 'Error Loading Exam'}
          </h2>
          <p className={`text-lg mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {error}
          </p>
          <button 
            onClick={retryLoad}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            {language === 'ar' ? 'إعادة المحاولة' : 'Try Again'}
          </button>
        </div>
      </div>
    );
  }

  // عرض حالة انتهاء الامتحان
  if (examFinished) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-green-500 text-6xl mb-4">✅</div>
          <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {language === 'ar' ? 'انتهى الامتحان' : 'Exam Finished'}
          </h2>
          <p className={`text-lg mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'ar' 
              ? 'تم إرسال إجاباتك بنجاح. سيتم الانتقال للنتائج قريباً...' 
              : 'Your answers have been submitted successfully. Redirecting to results...'
            }
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  // التحقق من وجود البيانات
  if (!examData || !currentQuestion) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
            {language === 'ar' ? 'لا توجد أسئلة متاحة' : 'No questions available'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    } ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* مؤقت الامتحان */}
      <ExamTimer 
        timeRemaining={timeRemaining}
        onTimeUp={handleTimeUp}
        showWarnings={true}
      />

      {/* شريط التنقل والتقدم */}
      <ExamNavigation 
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={examData.questions.length}
        answers={answers}
        questions={examData.questions}
        onQuestionSelect={goToQuestion}
        onPrevious={previousQuestion}
        onNext={nextQuestion}
        canGoNext={currentQuestionIndex < examData.questions.length - 1}
        canGoPrevious={currentQuestionIndex > 0}
        showQuestionGrid={true}
      />

      {/* منطقة السؤال الرئيسية */}
      <div className="pt-8 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* عرض السؤال حسب النوع */}
          {currentQuestion.type === 'MultipleChoice' && (
            <MultipleChoiceQuestion 
              question={currentQuestion}
              currentAnswer={currentAnswer}
              onAnswerChange={handleAnswerChange}
              onSubmit={handleAnswerSubmit}
              disabled={submitting}
              showFeedback={examData.exam_settings?.show_correct_answers_directly}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={examData.questions.length}
            />
          )}
          
          {currentQuestion.type === 'TrueFalse' && (
            <TrueFalseQuestion 
              question={currentQuestion}
              currentAnswer={currentAnswer}
              onAnswerChange={handleAnswerChange}
              onSubmit={handleAnswerSubmit}
              disabled={submitting}
              showFeedback={examData.exam_settings?.show_correct_answers_directly}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={examData.questions.length}
            />
          )}
        </div>
      </div>

      {/* شريط أدوات سفلي */}
      <div className={`fixed bottom-0 left-0 right-0 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-t-2 p-4 z-40`}>
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {language === 'ar' ? 'الامتحان:' : 'Exam:'} {examData.exam_name}
          </div>
          
          <div className="flex gap-3">
            {/* زر إنهاء الامتحان */}
            <button
              onClick={handleFinishExam}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {language === 'ar' ? 'إنهاء الامتحان' : 'Finish Exam'}
            </button>
          </div>
        </div>
      </div>

      {/* مودال تأكيد إنهاء الامتحان */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`max-w-md mx-auto p-6 rounded-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {language === 'ar' ? 'تأكيد إنهاء الامتحان' : 'Confirm Exam Submission'}
            </h3>
            
            <p className={`text-lg mb-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {language === 'ar' 
                ? 'هل أنت متأكد من أنك تريد إنهاء الامتحان وإرسال إجاباتك؟'
                : 'Are you sure you want to finish the exam and submit your answers?'
              }
            </p>
            
            <div className={`mb-4 p-3 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {language === 'ar' ? 'الأسئلة المُجابة:' : 'Questions Answered:'}
                </span>
                <span className={`font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {progress?.answered || 0} / {progress?.total || 0}
                </span>
              </div>
              
              <div className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {language === 'ar' ? 'الوقت المتبقي:' : 'Time Remaining:'} {formattedTimeRemaining}
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelFinishExam}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              
              <button
                onClick={confirmFinishExam}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {language === 'ar' ? 'إنهاء الامتحان' : 'Finish Exam'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamPage;
