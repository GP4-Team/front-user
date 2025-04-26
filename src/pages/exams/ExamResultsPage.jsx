import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Typography, Divider, List, Tabs } from 'antd';
import { ClockCircleOutlined, TrophyOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import QuestionCard from '../../components/exams/QuestionCard';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const ExamResultsPage = () => {
  const { examId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  
  const [examData, setExamData] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('summary');

  // Color scheme from the provided images
  const colors = {
    primaryDark: '#1A237F',
    primaryBase: '#3949AB', 
    primaryLight: '#7986CB',
    purple: '#6B3DD2',   // Purple color from screenshots
    accent: '#FFC107',
    textDark: '#37474F',
    bgLight: '#ECEFF1',
    white: '#FFFFFF',
  };

  // Get data from location state or fetch from API
  useEffect(() => {
    const fetchResultData = async () => {
      try {
        if (location.state?.examData && location.state?.userAnswers) {
          setExamData(location.state.examData);
          setUserAnswers(location.state.userAnswers);
          setTimeSpent(location.state.timeSpent || 0);
          
          // Calculate score
          let correctCount = 0;
          const answeredQuestions = Object.keys(location.state.userAnswers).filter(
            id => location.state.userAnswers[id] !== null && location.state.userAnswers[id] !== undefined
          ).length;
          
          location.state.examData.questions.forEach(question => {
            if (question.type !== 'essay' && 
                location.state.userAnswers[question.id] === question.correctAnswer) {
              correctCount++;
            }
          });
          
          // Prevent division by zero
          const calculatedScore = answeredQuestions > 0
            ? Math.round((correctCount / location.state.examData.questions.length) * 100)
            : 0;
          
          setScore(calculatedScore);
          
          setIsLoading(false);
        } else {
          // Fetch from API if not available in location state
          // const response = await examService.getExamResults(examId);
          // setExamData(response.data.examData);
          // setUserAnswers(response.data.userAnswers);
          // setTimeSpent(response.data.timeSpent);
          // setScore(response.data.score);
          
          // For demo purposes, navigate back to exams
          navigate('/exams');
        }
      } catch (error) {
        console.error('Error fetching exam results:', error);
        setIsLoading(false);
      }
    };

    fetchResultData();
  }, [examId, location.state, navigate]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Determine pass/fail status dynamically based on score comparison
  const isPassed = score >= (examData?.passingScore || 0);

  const backToExams = () => {
    navigate('/exams');
  };

  const retakeExam = () => {
    navigate(`/exams/${examId}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="spinner"></div>
        <p className="mt-4">{language === 'ar' ? 'جاري تحميل النتائج...' : 'Loading results...'}</p>
      </div>
    );
  }

  if (!examData) {
    return (
      <div className="container mx-auto p-6 text-center">
        <Title level={3}>{language === 'ar' ? 'لم يتم العثور على النتائج' : 'Results not found'}</Title>
        <Button type="primary" onClick={backToExams}>
          {language === 'ar' ? 'العودة إلى الامتحانات' : 'Back to Exams'}
        </Button>
      </div>
    );
  }

  // Calculate correct answers
  const correctAnswers = examData.questions.filter(
    q => q.type !== 'essay' && userAnswers[q.id] === q.correctAnswer
  ).length;
  
  const totalQuestions = examData.questions.filter(q => q.type !== 'essay').length;
  
  // Ensure score percentage is calculated correctly
  const scorePercentage = Math.min(Math.round((correctAnswers / totalQuestions) * 100), 100);

  // Button styles matching the screenshots
  const primaryButtonStyle = {
    backgroundColor: colors.purple,
    borderColor: colors.purple,
    borderRadius: '8px',
    color: 'white',
    height: '40px',
    fontWeight: 'medium',
    paddingLeft: '16px',
    paddingRight: '16px',
  };

  const secondaryButtonStyle = {
    backgroundColor: 'white',
    borderColor: '#E0E0E0',
    borderRadius: '8px',
    color: '#333333',
    height: '40px',
    fontWeight: 'medium',
    paddingLeft: '16px',
    paddingRight: '16px',
  };

  return (
    <div className={`container mx-auto p-4 mt-20 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
      {/* Results Summary Card */}
      <Card 
        className={`shadow-md mb-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
        bordered={!isDarkMode}
      >
        <div className="text-center mb-6">
          <Title level={2} className={isDarkMode ? 'text-white' : ''}>
            {language === 'ar' ? 'نتائج الامتحان' : 'Exam Results'}
          </Title>
          <Text className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            {examData.title}
          </Text>
        </div>

        {/* Result circle with pass/fail status */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-gray-200 flex items-center justify-center">
              <div 
                className="absolute top-0 left-0 w-32 h-32 rounded-full border-4 border-transparent"
                style={{
                  borderTopColor: isPassed ? '#52c41a' : '#f5222d',
                  transform: `rotate(${Math.min(scorePercentage, 100) * 3.6}deg)`,
                  transition: 'transform 1s ease-in-out',
                  borderRadius: '50%',
                }}
              ></div>
              
              <div className="text-center">
                {isPassed ? (
                  <CheckOutlined className="text-2xl text-green-500" />
                ) : (
                  <CloseOutlined className="text-2xl text-red-500" />
                )}
              </div>
            </div>
            
            <div className="absolute -right-2 -top-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm">
              {isPassed ? 
                (language === 'ar' ? 'ناجح' : 'PASS') : 
                (language === 'ar' ? 'راسب' : 'FAIL')}
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <Text className="text-lg">{language === 'ar' ? 'درجتك' : 'Your Score'}</Text>
        </div>

        {/* Result statistics */}
        <div className="grid grid-cols-3 gap-2 mb-8">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <ClockCircleOutlined className="text-blue-500 mr-2" />
              <Text className="text-sm">{language === 'ar' ? 'الوقت المستغرق' : 'Time Spent'}</Text>
            </div>
            <Text className="text-lg font-bold">{formatTime(timeSpent)}</Text>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <CheckOutlined className="text-green-500 mr-2" />
              <Text className="text-sm">{language === 'ar' ? 'الإجابات الصحيحة' : 'Correct Answers'}</Text>
            </div>
            <Text className="text-lg font-bold">{correctAnswers} / {totalQuestions}</Text>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <TrophyOutlined className="text-yellow-500 mr-2" />
              <Text className="text-sm">{language === 'ar' ? 'النسبة المطلوبة' : 'Passing Score'}</Text>
            </div>
            <Text className="text-lg font-bold">{examData.passingScore}%</Text>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button 
            className="rounded-lg"
            style={secondaryButtonStyle}
            onClick={retakeExam}
          >
            {language === 'ar' ? 'إعادة الامتحان' : 'Retake Exam'}
          </Button>
          <Button 
            type="primary" 
            className="rounded-lg"
            style={primaryButtonStyle}
            onClick={backToExams}
          >
            {language === 'ar' ? 'العودة إلى الامتحانات' : 'Back to Exams'}
          </Button>
        </div>
      </Card>

      {/* Detailed Results */}
      <Card 
        className={`shadow-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
        bordered={!isDarkMode}
      >
        <Title level={3} className={`mb-4 text-right ${isDarkMode ? 'text-white' : ''}`}>
          {language === 'ar' ? 'مراجعة الإجابات' : 'Review Answers'}
        </Title>

        <List
          itemLayout="vertical"
          dataSource={examData.questions}
          renderItem={(question, index) => {
            const userAnswer = userAnswers[question.id];
            const isCorrect = question.type !== 'essay' && userAnswer === question.correctAnswer;
            const isAnswered = userAnswer !== null && userAnswer !== undefined;
            
            let statusIcon;
            let statusClass;
            
            if (question.type === 'essay') {
              statusIcon = <span className="w-5 h-5 rounded-full inline-block border-2 border-gray-400"></span>;
              statusClass = "text-gray-500";
            } else if (!isAnswered) {
              statusIcon = <CloseOutlined className="w-5 h-5" />;
              statusClass = "text-gray-500";
            } else if (isCorrect) {
              statusIcon = <CheckOutlined className="w-5 h-5" />;
              statusClass = "text-green-500";
            } else {
              statusIcon = <CloseOutlined className="w-5 h-5" />;
              statusClass = "text-red-500";
            }
            
            return (
              <List.Item
                key={question.id}
                className={`p-4 rounded-lg mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
              >
                <div className="flex items-start">
                  <div className={`mr-4 mt-1 ${statusClass}`}>{statusIcon}</div>
                  <div className="flex-grow">
                    <QuestionCard
                      question={question}
                      userAnswer={userAnswer}
                      correctAnswer={question.correctAnswer}
                      onAnswerChange={() => {}} // No changes in review mode
                      language={language}
                      isDarkMode={isDarkMode}
                      isReview={true}
                      colors={colors}
                    />
                  </div>
                </div>
              </List.Item>
            );
          }}
        />
      </Card>
    </div>
  );
};

export default ExamResultsPage;
