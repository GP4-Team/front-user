import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Skeleton, Card, Row, Col, Tag, List, Typography } from 'antd';
import { ClockCircleOutlined, FileTextOutlined, CheckCircleOutlined, TrophyOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useExams } from '../../hooks/api/useExams';
import ExamStatusBadge from '../../components/exams/ExamStatusBadge';
import { 
  formatExamDuration, 
  isExamActionEnabled,
  getExamStatusLabel,
  EXAM_STATUS 
} from '../../services/examProgressService';
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
  
  // Use the new online exams hook
  const { 
    onlineExamDetails, 
    fetchOnlineExamDetails, 
    loading, 
    error 
  } = useExams();
  
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

  // Fetch exam data using real API
  useEffect(() => {
    const loadExamData = async () => {
      try {
        await fetchOnlineExamDetails(examId);
      } catch (err) {
        console.error('Error fetching exam details:', err);
      }
    };

    if (examId) {
      loadExamData();
    }
  }, [examId, fetchOnlineExamDetails]);

  const handleStartExam = () => {
    // Only show modal if exam action is enabled
    if (onlineExamDetails && isExamActionEnabled(onlineExamDetails.status)) {
      setShowStartModal(true);
    }
  };

  const confirmStartExam = async () => {
    setShowStartModal(false);
    
    // Handle different actions based on status
    switch (onlineExamDetails?.status) {
      case EXAM_STATUS.START:
        navigate(`/exams/${examId}/questions`);
        break;
      case EXAM_STATUS.RETRY:
        navigate(`/exams/${examId}/questions`);
        break;
      case EXAM_STATUS.CONTINUE:
        navigate(`/exams/${examId}/questions?continue=true`);
        break;
      case EXAM_STATUS.REVISION:
        navigate(`/exams/${examId}/questions/review`);
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  if (error || !onlineExamDetails) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <Title level={3}>{language === 'ar' ? 'لم يتم العثور على الامتحان' : 'Exam not found'}</Title>
          <Paragraph>
            {language === 'ar' 
              ? error || 'لم نتمكن من العثور على الامتحان المطلوب.' 
              : error || 'We could not find the requested exam.'}
          </Paragraph>
          <Button type="primary" onClick={() => navigate('/exams')}>
            {language === 'ar' ? 'العودة إلى الامتحانات' : 'Back to Exams'}
          </Button>
        </div>
      </div>
    );
  }

  // Get formatted data
  const examData = onlineExamDetails;
  const formattedDuration = formatExamDuration(examData.duration, language);
  const actionText = getExamStatusLabel(examData.status, language);
  const isActionEnabled = isExamActionEnabled(examData.status);

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
              {examData.name || examData.title}
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
            
            {/* Status Badge */}
            <div className="mb-4">
              <ExamStatusBadge status={examData.status} />
            </div>
            
            <Paragraph className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontSize: '16px' }}>
              {examData.description || (language === 'ar' ? 'امتحان في' : 'Exam in')} {examData.courseName}
            </Paragraph>
          </div>

          {/* Exam Details - Stats row */}
          <div className="grid grid-cols-4 gap-2 mb-8 mt-6 text-center">
            <div>
              <div className="text-sm text-gray-500 mb-1">
                {language === 'ar' ? 'مدة الامتحان' : 'Duration'}
              </div>
              <div className="flex items-center justify-center">
                <ClockCircleOutlined className="mr-1 text-gray-400" />
                <span className="font-bold">{formattedDuration}</span>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 mb-1">
                {language === 'ar' ? 'عدد الأسئلة' : 'Questions'}
              </div>
              <div className="flex items-center justify-center">
                <FileTextOutlined className="mr-1 text-gray-400" />
                <span className="font-bold">{examData.numberOfQuestions || 0}</span>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 mb-1">
                {language === 'ar' ? 'النسبة المطلوبة' : 'Required Score'}
              </div>
              <div className="flex items-center justify-center">
                <TrophyOutlined className="mr-1 text-gray-400" />
                <span className="font-bold">{examData.minPercentage || 50}%</span>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 mb-1">
                {language === 'ar' ? 'المحاولات المتبقية' : 'Attempts Left'}
              </div>
              <div className="flex items-center justify-center">
                <InfoCircleOutlined className="mr-1 text-gray-400" />
                <span className="font-bold">
                  {examData.allowedChances ? 
                    (examData.allowedChances - (examData.attemptsUsed || 0)) : 
                    (language === 'ar' ? 'غير محدد' : 'Unlimited')
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <Button 
              type="primary" 
              size="large" 
              disabled={!isActionEnabled}
              onClick={handleStartExam}
              style={{ 
                backgroundColor: isActionEnabled ? colors.purple : undefined,
                borderColor: isActionEnabled ? colors.purple : undefined,
                borderRadius: '8px',
                height: '40px',
                fontSize: '16px',
                width: '180px',
                opacity: isActionEnabled ? 1 : 0.6
              }}
            >
              {actionText}
            </Button>
          </div>
        </Card>

        {/* Previous Attempts Section */}
        {examData.lastAttempt && (
          <div className="mt-8">
            <Title level={4} className={`mb-4 ${isDarkMode ? 'text-white' : ''}`}>
              {language === 'ar' ? 'المحاولة الأخيرة' : 'Last Attempt'}
            </Title>
            
            <Card className={`shadow-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    {language === 'ar' ? 'النتيجة' : 'Score'}
                  </div>
                  <span 
                    className={`text-lg font-bold px-2 py-1 rounded-md ${
                      (examData.lastAttempt.score || 0) >= (examData.minPercentage || 50)
                        ? 'text-green-600 bg-green-100' 
                        : 'text-red-600 bg-red-100'
                    }`}
                  >
                    {examData.lastAttempt.score || 0}%
                  </span>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    {language === 'ar' ? 'التاريخ' : 'Date'}
                  </div>
                  <div className="text-sm">
                    {examData.lastAttempt.date || new Date().toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    {language === 'ar' ? 'الوقت المستغرق' : 'Time Spent'}
                  </div>
                  <div className="text-sm">
                    {examData.lastAttempt.timeSpent || (language === 'ar' ? 'غير متوفر' : 'N/A')}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Start Exam Confirmation Modal */}
      {showStartModal && (
        <StartExamModal
          onConfirm={confirmStartExam}
          onCancel={() => setShowStartModal(false)}
          language={language}
          colors={colors}
          examStatus={examData.status}
          examTitle={examData.name || examData.title}
        />
      )}
    </div>
  );
};

export default ExamDetailsPage;
