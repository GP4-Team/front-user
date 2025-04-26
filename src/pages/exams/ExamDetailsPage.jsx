import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Skeleton, Card, Row, Col, Tag, List, Typography } from 'antd';
import { ClockCircleOutlined, FileTextOutlined, CheckCircleOutlined, TrophyOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import StartExamModal from '../../components/exams/StartExamModal';

const { Title, Text, Paragraph } = Typography;

// This would come from an API
const mockExamData = {
  id: 'exam-123',
  title: 'امتحان تجريبي 1',
  subtitle: 'يجب أن تحصل على نسبة 35% على الأقل في الامتحان',
  timeLimit: 10, // minutes
  passingScore: 35,
  totalQuestions: 9,
  attempts: {
    remaining: 'غير محدود',
    total: null
  },
  image: '/images/exam.jpg',
  previousAttempts: [
    { date: '2025-03-15', score: 75, timeSpent: '8:22', answers: '7/9' },
    { date: '2025-03-10', score: 30, timeSpent: '5:45', answers: '3/9' },
  ]
};

const ExamDetailsPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  
  const [examData, setExamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showStartModal, setShowStartModal] = useState(false);

  // Color scheme from the provided image
  const colors = {
    primaryDark: '#1A237F',
    primaryBase: '#3949AB',
    primaryLight: '#7986CB',
    purple: '#6B3DD2',    // Purple color for buttons
    accent: '#FFC107',
    textDark: '#37474F',
    bgLight: '#ECEFF1',
    white: '#FFFFFF',
  };

  // Simulating API call to get exam data
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        // In a real app, you would fetch from an API
        // const response = await examService.getExamById(examId);
        // setExamData(response.data);
        
        // Simulating API delay
        setTimeout(() => {
          setExamData(mockExamData);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching exam data:', error);
        setIsLoading(false);
      }
    };

    fetchExamData();
  }, [examId]);

  const handleStartExam = () => {
    setShowStartModal(true);
  };

  const confirmStartExam = () => {
    setShowStartModal(false);
    navigate(`/exams/${examId}/questions`);
  };

  const cancelStartExam = () => {
    setShowStartModal(false);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  if (!examData) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <Title level={3}>{language === 'ar' ? 'لم يتم العثور على الامتحان' : 'Exam not found'}</Title>
          <Paragraph>
            {language === 'ar' 
              ? 'لم نتمكن من العثور على الامتحان المطلوب. يرجى التحقق من الرابط والمحاولة مرة أخرى.' 
              : 'We could not find the requested exam. Please check the link and try again.'}
          </Paragraph>
          <Button type="primary" onClick={() => navigate('/exams')}>
            {language === 'ar' ? 'العودة إلى الامتحانات' : 'Back to Exams'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`container mx-auto p-4 mt-24 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
      <div className="max-w-3xl mx-auto">
        <Card 
          className={`shadow-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
          bordered={!isDarkMode}
        >
          {/* Exam Title - Centered */}
          <div className="text-center mb-6">
            <Title level={2} className={isDarkMode ? 'text-white' : ''} style={{ fontSize: '24px' }}>
              {examData.title}
            </Title>
            <div className="p-12">
              <img 
                src="/images/exam-note.svg" 
                alt="Exam"
                className="h-24 mx-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzE5NzZEMiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xNCAzdjRhMSAxIDAgMCAwIDEgMWg0Ij48L3BhdGg+PHBhdGggZD0iTTE3IDIxaC0xMGEyIDIgMCAwIDEtMi0yVjVhMiAyIDAgMCAxIDItMmg3bDUgNXYxMWEyIDIgMCAwIDEtMiAyeiI+PC9wYXRoPjxsaW5lIHgxPSI5IiB5MT0iOSIgeDI9IjE1IiB5Mj0iOSI+PC9saW5lPjxsaW5lIHgxPSI5IiB5MT0iMTMiIHgyPSIxNSIgeTI9IjEzIj48L2xpbmU+PGxpbmUgeDE9IjkiIHkxPSIxNyIgeDI9IjE1IiB5Mj0iMTciPjwvbGluZT48L3N2Zz4="
                }}
              />
            </div>
            <Paragraph className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontSize: '16px' }}>
              {examData.subtitle}
            </Paragraph>
          </div>

          {/* Exam Details - Stats row */}
          <div className="grid grid-cols-4 gap-2 mb-8 mt-6 text-center">
            <div>
              <div className="text-sm text-gray-500 mb-1">مدة الامتحان</div>
              <div className="flex items-center justify-center">
                <ClockCircleOutlined className="mr-1 text-gray-400" />
                <span className="font-bold">{examData.timeLimit} دقائق</span>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 mb-1">عدد الأسئلة</div>
              <div className="flex items-center justify-center">
                <FileTextOutlined className="mr-1 text-gray-400" />
                <span className="font-bold">{examData.totalQuestions}</span>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 mb-1">النسبة المطلوبة</div>
              <div className="flex items-center justify-center">
                <TrophyOutlined className="mr-1 text-gray-400" />
                <span className="font-bold">{examData.passingScore}%</span>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 mb-1">المحاولات المتبقية</div>
              <div className="flex items-center justify-center">
                <InfoCircleOutlined className="mr-1 text-gray-400" />
                <span className="font-bold">{examData.attempts.remaining}</span>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <Button 
              type="primary" 
              size="large" 
              onClick={handleStartExam}
              style={{ 
                backgroundColor: colors.purple, // Changed to purple
                borderColor: colors.purple,     // Changed to purple
                borderRadius: '8px',
                height: '40px',
                fontSize: '16px',
                width: '180px',
              }}
            >
              {language === 'ar' ? 'بدء الامتحان' : 'Start Exam'}
            </Button>
          </div>
        </Card>

        {/* Previous Attempts Section */}
        {examData.previousAttempts.length > 0 && (
          <div className="mt-8">
            <Title level={4} className={`mb-4 ${isDarkMode ? 'text-white' : ''}`}>
              {language === 'ar' ? 'المحاولات السابقة' : 'Previous Attempts'}
            </Title>
            
            <Card className={`shadow-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-4">التاريخ</th>
                    <th className="text-center py-2 px-4">النتيجة</th>
                    <th className="text-center py-2 px-4">الإجابات</th>
                    <th className="text-right py-2 px-4">الوقت المستغرق</th>
                  </tr>
                </thead>
                <tbody>
                  {examData.previousAttempts.map((attempt, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-3 px-4">{attempt.date}</td>
                      <td className="py-3 px-4 text-center">
                        <span 
                          className={`px-2 py-1 rounded-md ${
                            attempt.score >= examData.passingScore 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {attempt.score}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">{attempt.answers}</td>
                      <td className="py-3 px-4 text-right">{attempt.timeSpent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        )}
      </div>

      {/* Start Exam Confirmation Modal */}
      {showStartModal && (
        <StartExamModal
          onConfirm={confirmStartExam}
          onCancel={cancelStartExam}
          language={language}
          colors={colors}
        />
      )}
    </div>
  );
};

export default ExamDetailsPage;
