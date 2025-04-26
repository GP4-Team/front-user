import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Layout, Image, Tooltip } from 'antd';
import { ClockCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import ExamTimer from '../../components/exams/ExamTimer';
import ExamProgress from '../../components/exams/ExamProgress';
import QuestionNavigation from '../../components/exams/QuestionNavigation';
import QuestionCard from '../../components/exams/QuestionCard';
import NavigationButtons from '../../components/exams/NavigationButtons';
import ExamCompletionModal from '../../components/exams/ExamCompletionModal';

const { Content } = Layout;

// This would come from an API
const mockExamData = {
  id: 'exam-123',
  title: 'تدريب الباب الأول',
  time: 600, // 10 minutes in seconds
  passingScore: 70,
  questions: [
    {
      id: 1,
      text: 'أوجد قراءة التيار الذي بالشكل',
      image: '/images/exams/question1.png',
      type: 'mcq',
      options: [
        { id: 'a', text: '15 أمبير' },
        { id: 'b', text: '20 أمبير' },
        { id: 'c', text: '25 أمبير' },
        { id: 'd', text: '10 أمبير' }
      ],
      correctAnswer: 'a'
    },
    {
      id: 2,
      text: 'حدد العبارة الصحيحة؟',
      type: 'true-false',
      options: [
        { id: 'true', text: 'صحيح' },
        { id: 'false', text: 'خطأ' }
      ],
      correctAnswer: 'true'
    },
    {
      id: 3,
      text: 'اشرح كيف يعمل المحول الكهربائي؟',
      type: 'essay',
      correctAnswer: null // No direct correct answer for essays
    },
    {
      id: 4,
      text: 'ما هي وحدة قياس الطاقة الكهربائية؟',
      type: 'mcq',
      options: [
        { id: 'a', text: 'Watt' },
        { id: 'b', text: 'Joule' },
        { id: 'c', text: 'kWh' },
        { id: 'd', text: 'Ampere' }
      ],
      correctAnswer: 'c'
    },
    {
      id: 5,
      text: 'وصل الدوائر الكهربائية على التوازي يزيد من التيار الكلي.',
      type: 'true-false',
      options: [
        { id: 'true', text: 'صحيح' },
        { id: 'false', text: 'خطأ' }
      ],
      correctAnswer: 'true'
    }
  ]
};

const ExamQuestionsPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  
  const [examData, setExamData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isExamEnded, setIsExamEnded] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulating API call to get exam data
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        // In a real app, you would fetch from an API
        // const response = await examService.getExamById(examId);
        // setExamData(response.data);
        setExamData(mockExamData);
        setTimeRemaining(mockExamData.time);
        
        // Initialize user answers
        const initialAnswers = {};
        mockExamData.questions.forEach(q => {
          initialAnswers[q.id] = null;
        });
        setUserAnswers(initialAnswers);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching exam data:', error);
        setIsLoading(false);
      }
    };

    fetchExamData();
  }, [examId]);

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < examData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToQuestion = (index) => {
    if (index >= 0 && index < examData?.questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  const handleEndExam = () => {
    setShowCompletionModal(true);
  };

  const confirmEndExam = () => {
    setIsExamEnded(true);
    setShowCompletionModal(false);
    
    // Save answers to API and navigate to results
    // examService.submitExam(examId, userAnswers).then(() => {
    navigate(`/exams/${examId}/results`, { 
      state: { 
        examData: examData,
        userAnswers: userAnswers,
        timeSpent: examData.time - timeRemaining
      } 
    });
    // });
  };

  const cancelEndExam = () => {
    setShowCompletionModal(false);
  };

  const handleTimeEnd = () => {
    setIsExamEnded(true);
    
    // Auto-submit and navigate to results
    navigate(`/exams/${examId}/results`, { 
      state: { 
        examData: examData,
        userAnswers: userAnswers,
        timeSpent: examData.time
      } 
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner"></div>
        <p className="mt-4">جاري تحميل الامتحان...</p>
      </div>
    );
  }

  if (!examData) {
    return <div>لم يتم العثور على الامتحان.</div>;
  }

  const currentQuestion = examData.questions[currentQuestionIndex];
  const progressPercentage = 
    (Object.values(userAnswers).filter(answer => answer !== null).length / 
    examData.questions.length) * 100;

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

  // Calculate the number of answered questions
  const answeredQuestionsCount = Object.values(userAnswers).filter(answer => answer !== null && answer !== undefined).length;
  const allQuestionsAnswered = answeredQuestionsCount === examData.questions.length;

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
          <div className="w-full md:w-56">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {language === 'ar' ? 'الأسئلة' : 'Questions'}
              </h2>
            </div>
            <div className={`sticky top-32 rounded-lg shadow-md p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <QuestionNavigation 
                questions={examData.questions}
                currentIndex={currentQuestionIndex}
                userAnswers={userAnswers}
                onQuestionSelect={goToQuestion}
                colors={colors}
              />
              
              {/* End Exam Button - Fixed at the bottom of the navigation */}
              <div className="mt-6 pt-3 border-t border-gray-200">
                <Button 
                  type="primary"
                  onClick={handleEndExam}
                  className="flex items-center justify-center"
                  icon={<LogoutOutlined />}
                  style={endExamButtonStyle}
                >
                  {language === 'ar' ? 'إنهاء الامتحان' : 'End Exam'}
                </Button>
                
                {/* Show extra indicator if all questions are answered */}
                {allQuestionsAnswered && (
                  <div className="mt-2 text-center text-green-500 text-xs font-semibold">
                    {language === 'ar' 
                      ? 'تمت الإجابة على جميع الأسئلة!' 
                      : 'All questions answered!'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main question area */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {language === 'ar' ? `السؤال ${currentQuestionIndex + 1}` : `Question ${currentQuestionIndex + 1}`}
              </h1>
              <div className="flex items-center space-x-4">
                <ExamTimer 
                  initialTime={timeRemaining} 
                  onTimeEnd={handleTimeEnd} 
                  isExamEnded={isExamEnded}
                  colors={colors}
                />
              </div>
            </div>
            
            <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              {/* Question */}
              <QuestionCard 
                question={currentQuestion}
                userAnswer={userAnswers[currentQuestion.id]}
                onAnswerChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
                language={language}
                isDarkMode={isDarkMode}
                colors={colors}
                imageMaxWidth={400} // Control image size
              />

              <div className="mt-8">
                <NavigationButtons 
                  currentQuestionIndex={currentQuestionIndex}
                  totalQuestions={examData.questions.length}
                  onPrevious={goToPreviousQuestion}
                  onNext={goToNextQuestion}
                  language={language}
                  colors={colors}
                />
                
                {/* Extra End Exam button for better visibility */}
                {(currentQuestionIndex === examData.questions.length - 1 || allQuestionsAnswered) && (
                  <div className="flex justify-center mt-6">
                    <Button 
                      type="primary"
                      onClick={handleEndExam}
                      className="flex items-center"
                      icon={<LogoutOutlined />}
                      style={floatingEndExamButtonStyle}
                    >
                      {language === 'ar' ? 'إنهاء الامتحان' : 'End Exam'}
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
        />
      )}
    </Layout>
  );
};

export default ExamQuestionsPage;
