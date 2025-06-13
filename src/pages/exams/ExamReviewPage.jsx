import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  Eye,
  Award,
  Home,
  RotateCcw
} from 'lucide-react';

// Import API services
import onlineExamQuestionsService from '../../services/api/onlineExamQuestionsService';

const ExamReviewPage = () => {
  const { examId, attemptId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { language, isRTL } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  
  // State management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [examData, setExamData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Helper function for translations
  const getText = (ar, en) => language === 'ar' ? ar : en;

  // Load exam answers on component mount
  useEffect(() => {
    const loadExamAnswers = async () => {
      if (!isAuthenticated || !user) {
        navigate('/auth?mode=login');
        return;
      }

      if (!examId) {
        setError(getText('معرف الامتحان مطلوب', 'Exam ID is required'));
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Use latest attempt if attemptId not provided
        const targetAttemptId = attemptId || 'latest';
        
        console.log(`📋 Loading exam answers for exam ${examId}, attempt ${targetAttemptId}`);
        
        const response = await onlineExamQuestionsService.getExamAnswers(examId, targetAttemptId);
        
        if (response.success && response.data) {
          setExamData(response.data.exam_info || {});
          setQuestions(response.data.questions || []);
          
          console.log('✅ Exam answers loaded successfully:', {
            examInfo: response.data.exam_info,
            questionsCount: response.data.questions?.length || 0
          });
        } else {
          throw new Error(response.error || getText('خطأ في تحميل إجابات الامتحان', 'Error loading exam answers'));
        }
      } catch (err) {
        console.error('❌ Error loading exam answers:', err);
        setError(err.message || getText('خطأ في الاتصال بالخادم', 'Server connection error'));
      } finally {
        setLoading(false);
      }
    };

    loadExamAnswers();
  }, [examId, attemptId, isAuthenticated, user, navigate, language, getText]);

  // Handle navigation
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuestionJump = (index) => {
    setCurrentQuestionIndex(index);
  };

  // Get current question
  const currentQuestion = questions[currentQuestionIndex];

  // Format choice text safely
  const formatChoiceText = (choice) => {
    if (typeof choice === 'string') return choice;
    return choice?.text || choice?.choice_text || getText('خيار غير محدد', 'Unknown choice');
  };

  // Get answer status
  const getAnswerStatus = (question) => {
    if (!question.student_answer) {
      return {
        status: 'unanswered',
        icon: <XCircle className="w-5 h-5 text-gray-400" />,
        bgColor: 'bg-gray-100 dark:bg-gray-800',
        textColor: 'text-gray-600 dark:text-gray-400',
        label: getText('لم تتم الإجابة', 'Not Answered')
      };
    }

    const isCorrect = question.is_correct || question.student_answer?.is_correct;
    
    if (isCorrect) {
      return {
        status: 'correct',
        icon: <CheckCircle className="w-5 h-5 text-green-600" />,
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        textColor: 'text-green-700 dark:text-green-400',
        label: getText('إجابة صحيحة', 'Correct Answer')
      };
    } else {
      return {
        status: 'incorrect',
        icon: <XCircle className="w-5 h-5 text-red-600" />,
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        textColor: 'text-red-700 dark:text-red-400',
        label: getText('إجابة خاطئة', 'Incorrect Answer')
      };
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-lg">{getText('جاري تحميل مراجعة الامتحان...', 'Loading exam review...')}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">
            {getText('خطأ في تحميل المراجعة', 'Error Loading Review')}
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-x-4">
            <button 
              onClick={() => navigate(`/exams/${examId}`)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              {getText('العودة للامتحان', 'Back to Exam')}
            </button>
            <button 
              onClick={() => navigate('/exams')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              {getText('العودة للامتحانات', 'Back to Exams')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No questions state
  if (!questions || questions.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h2 className="text-xl font-bold mb-2">
            {getText('لا توجد أسئلة للمراجعة', 'No Questions to Review')}
          </h2>
          <p className="text-gray-600 mb-4">
            {getText('لم نتمكن من العثور على أسئلة هذا الامتحان', 'We could not find questions for this exam')}
          </p>
          <button 
            onClick={() => navigate('/exams')}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            {getText('العودة للامتحانات', 'Back to Exams')}
          </button>
        </div>
      </div>
    );
  }

  const answerStatus = getAnswerStatus(currentQuestion);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-10`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/exams')}
                className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <Home className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold">
                  {getText('مراجعة الامتحان', 'Exam Review')}
                </h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {examData?.name || getText('امتحان', 'Exam')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`px-4 py-2 rounded-lg ${answerStatus.bgColor}`}>
                <div className="flex items-center space-x-2">
                  {answerStatus.icon}
                  <span className={`text-sm font-medium ${answerStatus.textColor}`}>
                    {answerStatus.label}
                  </span>
                </div>
              </div>
              
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {getText(
                  `سؤال ${currentQuestionIndex + 1} من ${questions.length}`,
                  `Question ${currentQuestionIndex + 1} of ${questions.length}`
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Questions Navigation */}
            <div className="lg:col-span-1">
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 sticky top-24`}>
                <h3 className="font-bold text-lg mb-4">
                  {getText('الأسئلة', 'Questions')}
                </h3>
                <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                  {questions.map((question, index) => {
                    const status = getAnswerStatus(question);
                    const isActive = index === currentQuestionIndex;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleQuestionJump(index)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? 'ring-2 ring-indigo-500 ring-offset-2'
                            : ''
                        } ${
                          status.status === 'correct'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : status.status === 'incorrect'
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                        } hover:scale-110`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}>
                
                {/* Question Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">
                      {getText(`السؤال ${currentQuestionIndex + 1}`, `Question ${currentQuestionIndex + 1}`)}
                    </h2>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${answerStatus.bgColor} ${answerStatus.textColor}`}>
                      {answerStatus.label}
                    </div>
                  </div>
                  
                  {/* Question Text */}
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} mb-6`}>
                    <p className="text-lg leading-relaxed" dir={isRTL ? 'rtl' : 'ltr'}>
                      {currentQuestion.question_text || currentQuestion.text || getText('نص السؤال غير متوفر', 'Question text not available')}
                    </p>
                  </div>
                </div>

                {/* Choices for Multiple Choice and True/False */}
                {(currentQuestion.question_type === 'MultipleChoice' || currentQuestion.question_type === 'TrueFalse') && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">
                      {getText('الخيارات', 'Choices')}
                    </h3>
                    <div className="space-y-3">
                      {currentQuestion.choices?.map((choice, index) => {
                        const isStudentAnswer = currentQuestion.student_answer?.choice_id === choice.id;
                        const isCorrectAnswer = choice.is_correct;
                        
                        let choiceStyle = '';
                        if (isCorrectAnswer) {
                          choiceStyle = 'border-green-500 bg-green-50 dark:bg-green-900/20';
                        } else if (isStudentAnswer && !isCorrectAnswer) {
                          choiceStyle = 'border-red-500 bg-red-50 dark:bg-red-900/20';
                        } else {
                          choiceStyle = `border-gray-200 dark:border-gray-700 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`;
                        }
                        
                        return (
                          <div key={choice.id} className={`p-4 rounded-lg border-2 ${choiceStyle}`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                                  isCorrectAnswer
                                    ? 'bg-green-500 text-white'
                                    : isStudentAnswer && !isCorrectAnswer
                                    ? 'bg-red-500 text-white'
                                    : `${isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'}`
                                }`}>
                                  {String.fromCharCode(65 + index)}
                                </div>
                                <span className="text-lg">
                                  {formatChoiceText(choice)}
                                </span>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                {isCorrectAnswer && (
                                  <div className="flex items-center space-x-1 text-green-600">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="text-sm font-medium">
                                      {getText('الإجابة الصحيحة', 'Correct Answer')}
                                    </span>
                                  </div>
                                )}
                                {isStudentAnswer && (
                                  <div className={`flex items-center space-x-1 ${
                                    isCorrectAnswer ? 'text-green-600' : 'text-red-600'
                                  }`}>
                                    <Eye className="w-5 h-5" />
                                    <span className="text-sm font-medium">
                                      {getText('اختيارك', 'Your Choice')}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Answer for Essay Questions */}
                {currentQuestion.question_type === 'Essay' && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">
                      {getText('إجابتك', 'Your Answer')}
                    </h3>
                    <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                      <p className="whitespace-pre-wrap">
                        {currentQuestion.student_answer?.text || getText('لم تتم الإجابة على هذا السؤال', 'This question was not answered')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Feedback Section */}
                {currentQuestion.feedback && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">
                      {getText('التوضيح', 'Explanation')}
                    </h3>
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                      <p className="text-blue-800 dark:text-blue-300">
                        {currentQuestion.feedback}
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      currentQuestionIndex === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-600'
                        : 'bg-gray-500 hover:bg-gray-600 text-white'
                    }`}
                  >
                    {isRTL ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
                    <span>{getText('السؤال السابق', 'Previous Question')}</span>
                  </button>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => navigate(`/exams/${examId}`)}
                      className="flex items-center space-x-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
                    >
                      <RotateCcw className="w-5 h-5" />
                      <span>{getText('إعادة المحاولة', 'Try Again')}</span>
                    </button>
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === questions.length - 1}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      currentQuestionIndex === questions.length - 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-600'
                        : 'bg-gray-500 hover:bg-gray-600 text-white'
                    }`}
                  >
                    <span>{getText('السؤال التالي', 'Next Question')}</span>
                    {isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamReviewPage;