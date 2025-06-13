import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ClockCircleOutlined, FileTextOutlined, CheckCircleOutlined, TrophyOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useExamDetails } from '../../hooks/api/useExamDetails';
import ExamStatusBadge from '../../components/exams/ExamStatusBadge';
import { 
  formatExamDuration, 
  isExamActionEnabled,
  getExamStatusLabel,
  EXAM_STATUS 
} from '../../services/examProgressService';
import StartExamModal from '../../components/exams/StartExamModal';

// Custom components to replace Ant Design
const CustomButton = ({ children, disabled, onClick, className, ...props }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={className}
    {...props}
  >
    {children}
  </button>
);

const Title = ({ level, children, className, style }) => {
  const Tag = `h${level}`;
  return <Tag className={className} style={style}>{children}</Tag>;
};

const Paragraph = ({ children, className, style }) => (
  <p className={className} style={style}>{children}</p>
);

const Skeleton = ({ active, paragraph, isDarkMode }) => (
  <div className="animate-pulse">
    <div className={`h-4 rounded w-3/4 mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
    <div className="space-y-3">
      {[...Array(paragraph?.rows || 4)].map((_, i) => (
        <div key={i} className={`h-4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
      ))}
    </div>
  </div>
);

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
  
  // Use the exam details hook
  const { 
    examDetails, 
    fetchExamDetails, 
    loading, 
    error 
  } = useExamDetails();
  
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
        await fetchExamDetails(examId);
      } catch (err) {
        console.error('Error fetching exam details:', err);
      }
    };

    if (examId) {
      loadExamData();
    }
  }, [examId, fetchExamDetails]);

  const handleStartExam = () => {
    console.log('🔍 [ExamDetailsPage] handleStartExam - exam status:', examDetails?.status);
    console.log('🔍 [ExamDetailsPage] action_button:', examDetails?.action_button);
    console.log('🔍 [ExamDetailsPage] availability_status:', examDetails?.availability_status);
    
    // For revision status, go directly to review page
    if (examDetails?.status === EXAM_STATUS.REVISION || 
        examDetails?.status === 'review' ||
        examDetails?.action_button?.includes('مراجعة') || 
        examDetails?.action_button?.includes('Review')) {
      console.log('🔍 [ExamDetailsPage] Going directly to review page');
      navigate(`/exams/${examId}/review`);
      return;
    }
    
    // Only show modal if exam action is enabled and not revision
    if (examDetails && isExamActionEnabled(examDetails.status)) {
      console.log('🔍 [ExamDetailsPage] Showing start modal');
      setShowStartModal(true);
    }
  };

  const confirmStartExam = async () => {
    setShowStartModal(false);
    
    // Handle different actions based on status
    switch (examDetails?.status) {
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
        navigate(`/exams/${examId}/review`);
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto p-6 max-w-2xl">
          <Skeleton active paragraph={{ rows: 6 }} isDarkMode={isDarkMode} />
        </div>
      </div>
    );
  }

  if (error || !examDetails) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto p-6 max-w-2xl">
          <div className="text-center">
            <Title level={3} className={`mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {language === 'ar' ? 'لم يتم العثور على الامتحان' : 'Exam not found'}
            </Title>
            <Paragraph className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'ar' 
                ? error || 'لم نتمكن من العثور على الامتحان المطلوب.' 
                : error || 'We could not find the requested exam.'}
            </Paragraph>
            <CustomButton 
              onClick={() => navigate('/exams')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              {language === 'ar' ? 'العودة إلى الامتحانات' : 'Back to Exams'}
            </CustomButton>
          </div>
        </div>
      </div>
    );
  }

  // Get formatted data
  const examData = examDetails;
  const formattedDuration = formatExamDuration(examData.duration_in_seconds ? Math.round(examData.duration_in_seconds / 60) : examData.duration, language);
  const actionText = getExamStatusLabel(examData.status, language);
  const isActionEnabled = isExamActionEnabled(examData.status);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className="container mx-auto p-4 pt-24">
        <div className="max-w-3xl mx-auto">
          <div className={`rounded-xl shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            {/* Exam Title - Centered */}
            <div className="text-center p-8">
              <Title level={2} className={`mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`} style={{ fontSize: '28px', fontWeight: '700' }}>
                {examData.name || examData.title}
              </Title>
              <div className="p-8">
                <img 
                  src="/images/exam-note.svg" 
                  alt="Exam"
                  className="h-20 mx-auto opacity-80"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzE5NzZEMiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xNCAzdjRhMSAxIDAgMCAwIDEgMWg0Ij48L3BhdGg+PHBhdGggZD0iTTE3IDIxaC0xMGEyIDIgMCAwIDEtMi0yVjVhMiAyIDAgMCAxIDItMmg3bDUgNXYxMWEyIDIgMCAwIDEtMiAyeiI+PC9wYXRoPjxsaW5lIHgxPSI5IiB5MT0iOSIgeDI9IjE1IiB5Mj0iOSI+PC9saW5lPjxsaW5lIHgxPSI5IiB5MT0iMTMiIHgyPSIxNSIgeTI9IjEzIj48L2xpbmU+PGxpbmUgeDE9IjkiIHkxPSIxNyIgeDI9IjE1IiB5Mj0iMTciPjwvbGluZT48L3N2Zz4="
                  }}
                />
              </div>
              
              {/* Status Badge */}
              <div className="mb-6">
                <ExamStatusBadge status={examData.status} />
              </div>
              
              <Paragraph className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontSize: '16px' }}>
                {examData.description || (language === 'ar' ? 'امتحان في' : 'Exam in')} {examData.course?.name || examData.courseName}
              </Paragraph>
            </div>

            {/* Exam Details - Stats row */}
            <div className={`grid grid-cols-4 gap-4 p-6 mx-6 rounded-lg ${isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
              <div className="text-center">
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-2 uppercase tracking-wide`}>
                  {language === 'ar' ? 'مدة الامتحان' : 'Duration'}
                </div>
                <div className="flex items-center justify-center">
                  <ClockCircleOutlined className={`mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                  <span className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{formattedDuration}</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-2 uppercase tracking-wide`}>
                  {language === 'ar' ? 'عدد الأسئلة' : 'Questions'}
                </div>
                <div className="flex items-center justify-center">
                  <FileTextOutlined className={`mr-2 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
                  <span className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{examData.question_number || examData.numberOfQuestions || 0}</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-2 uppercase tracking-wide`}>
                  {language === 'ar' ? 'النسبة المطلوبة' : 'Required Score'}
                </div>
                <div className="flex items-center justify-center">
                  <TrophyOutlined className={`mr-2 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
                  <span className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{examData.min_percentage || examData.minPercentage || 50}%</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-2 uppercase tracking-wide`}>
                  {language === 'ar' ? 'المحاولات المتبقية' : 'Attempts Left'}
                </div>
                <div className="flex items-center justify-center">
                  <InfoCircleOutlined className={`mr-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-500'}`} />
                  <span className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {examData.allowed_chances ? 
                      (examData.allowed_chances - (examData.attempts_used || 0)) : 
                      (language === 'ar' ? 'غير محدد' : 'Unlimited')
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="text-center p-8">
              <CustomButton 
                disabled={!isActionEnabled}
                onClick={handleStartExam}
                className={`h-12 px-8 text-lg font-semibold rounded-lg transition-all duration-300 ${
                  isActionEnabled 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
                    : 'bg-gray-400 text-gray-600 opacity-50 cursor-not-allowed'
                }`}
              >
                {actionText}
              </CustomButton>
            </div>
          </div>

          {/* Previous Attempts Section */}
          {examData.lastAttempt && (
            <div className="mt-8">
              <Title level={4} className={`mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {language === 'ar' ? 'المحاولة الأخيرة' : 'Last Attempt'}
              </Title>
              
              <div className={`rounded-xl shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="grid grid-cols-3 gap-6 p-6 text-center">
                  <div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-2 uppercase tracking-wide`}>
                      {language === 'ar' ? 'النتيجة' : 'Score'}
                    </div>
                    <span 
                      className={`inline-block text-xl font-bold px-4 py-2 rounded-lg ${
                        (examData.lastAttempt.score || 0) >= (examData.min_percentage || examData.minPercentage || 50)
                          ? 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30' 
                          : 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30'
                      }`}
                    >
                      {examData.lastAttempt.score || 0}%
                    </span>
                  </div>
                  <div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-2 uppercase tracking-wide`}>
                      {language === 'ar' ? 'التاريخ' : 'Date'}
                    </div>
                    <div className={`text-base font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {examData.lastAttempt.date || new Date().toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}
                    </div>
                  </div>
                  <div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-2 uppercase tracking-wide`}>
                      {language === 'ar' ? 'الوقت المستغرق' : 'Time Spent'}
                    </div>
                    <div className={`text-base font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {examData.lastAttempt.timeSpent || (language === 'ar' ? 'غير متوفر' : 'N/A')}
                    </div>
                  </div>
                </div>
              </div>
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
    </div>
  );
};

export default ExamDetailsPage;
