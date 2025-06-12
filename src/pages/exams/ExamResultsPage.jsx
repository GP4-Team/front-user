import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Card, Row, Col, Progress, Statistic, Divider, Tag, List, Typography, Spin, message } from 'antd';
import { 
  TrophyOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  ReloadOutlined,
  EyeOutlined,
  HomeOutlined 
} from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import useOnlineExamQuestions from '../../hooks/api/useOnlineExamQuestions';

const { Title, Text, Paragraph } = Typography;

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
      message.error(language === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Please login first');
      navigate('/auth?mode=login');
      return;
    }

    if (!examId) {
      message.error(language === 'ar' ? 'معرف الامتحان مطلوب' : 'Exam ID is required');
      navigate('/exams');
      return;
    }

    if (!attemptId) {
      message.error(language === 'ar' ? 'معرف المحاولة مطلوب' : 'Attempt ID is required');
      navigate(`/exams/${examId}`);
      return;
    }

    const loadResults = async () => {
      try {
        clearError();
        console.log(`📊 Loading results for exam ${examId}, attempt ${attemptId}`);
        
        const result = await getResults(examId, attemptId);
        
        if (!result.success) {
          message.error(result.error || (language === 'ar' ? 'خطأ في تحميل النتائج' : 'Error loading results'));
        }
      } catch (error) {
        console.error('Error loading results:', error);
        message.error(language === 'ar' ? 'خطأ في الاتصال بالخادم' : 'Server connection error');
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
    navigate(`/exams/${examId}/questions/review`);
  };

  const handleBackToExams = () => {
    navigate('/exams');
  };

  // Handle loading state
  if (loading || resultsLoading) {
    return (
      <div className={`flex items-center justify-center h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
        <div className="text-center">
          <Spin size="large" />
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
            <Button type="primary" onClick={() => navigate(`/exams/${examId}`)}>
              {language === 'ar' ? 'العودة للامتحان' : 'Back to Exam'}
            </Button>
            <Button onClick={handleBackToExams}>
              {language === 'ar' ? 'العودة للامتحانات' : 'Back to Exams'}
            </Button>
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
          <Button type="primary" onClick={handleBackToExams}>
            {language === 'ar' ? 'العودة للامتحانات' : 'Back to Exams'}
          </Button>
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
              {passed ? <TrophyOutlined className="text-3xl" /> : <CloseCircleOutlined className="text-3xl" />}
            </div>
            
            <Title level={2} className={`mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {passed 
                ? (language === 'ar' ? 'تهانينا! لقد نجحت' : 'Congratulations! You Passed') 
                : (language === 'ar' ? 'للأسف، لم تنجح هذه المرة' : 'Sorry, You Did Not Pass This Time')
              }
            </Title>
            
            <Text className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {examTitle}
            </Text>
          </div>

          {/* Score Overview */}
          <Card 
            className={`mb-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
            bordered={!isDarkMode}
          >
            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} sm={12} md={8} className="text-center">
                <Progress
                  type="circle"
                  percent={score}
                  size={120}
                  strokeColor={passed ? colors.success : colors.error}
                  format={(percent) => (
                    <div>
                      <div className="text-2xl font-bold">{percent}%</div>
                      <div className="text-xs text-gray-500">
                        {language === 'ar' ? 'النتيجة' : 'Score'}
                      </div>
                    </div>
                  )}
                />
              </Col>
              
              <Col xs={24} sm={12} md={16}>
                <Row gutter={[16, 16]}>
                  <Col xs={12} sm={6}>
                    <Statistic
                      title={language === 'ar' ? 'الإجابات الصحيحة' : 'Correct Answers'}
                      value={correctAnswers}
                      suffix={`/ ${totalQuestions}`}
                      valueStyle={{ color: colors.success }}
                      prefix={<CheckCircleOutlined />}
                    />
                  </Col>
                  
                  <Col xs={12} sm={6}>
                    <Statistic
                      title={language === 'ar' ? 'الإجابات الخاطئة' : 'Incorrect Answers'}
                      value={incorrectAnswers}
                      suffix={`/ ${totalQuestions}`}
                      valueStyle={{ color: colors.error }}
                      prefix={<CloseCircleOutlined />}
                    />
                  </Col>
                  
                  <Col xs={12} sm={6}>
                    <Statistic
                      title={language === 'ar' ? 'الوقت المستغرق' : 'Time Spent'}
                      value={formatTime(timeSpent)}
                      prefix={<ClockCircleOutlined />}
                    />
                  </Col>
                  
                  <Col xs={12} sm={6}>
                    <Statistic
                      title={language === 'ar' ? 'النسبة المطلوبة' : 'Passing Score'}
                      value={passingScore}
                      suffix="%"
                      valueStyle={{ color: colors.warning }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>

          {/* Performance Analysis */}
          <Card 
            title={
              <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>
                {language === 'ar' ? 'تحليل الأداء' : 'Performance Analysis'}
              </span>
            }
            className={`mb-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
            bordered={!isDarkMode}
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Text>{language === 'ar' ? 'معدل الإجابات الصحيحة' : 'Accuracy Rate'}</Text>
                      <Text strong>{Math.round((correctAnswers / totalQuestions) * 100)}%</Text>
                    </div>
                    <Progress 
                      percent={Math.round((correctAnswers / totalQuestions) * 100)} 
                      strokeColor={colors.success}
                      showInfo={false}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Text>{language === 'ar' ? 'التقدم نحو الهدف' : 'Progress to Target'}</Text>
                      <Text strong>{Math.min(Math.round((score / passingScore) * 100), 100)}%</Text>
                    </div>
                    <Progress 
                      percent={Math.min(Math.round((score / passingScore) * 100), 100)} 
                      strokeColor={passed ? colors.success : colors.warning}
                      showInfo={false}
                    />
                  </div>
                </div>
              </Col>
              
              <Col xs={24} md={12}>
                <div className="text-center">
                  <Tag 
                    color={passed ? 'success' : 'error'} 
                    className="text-lg py-2 px-4 rounded-lg"
                  >
                    {passed 
                      ? (language === 'ar' ? '✅ نجح' : '✅ Passed')
                      : (language === 'ar' ? '❌ لم ينجح' : '❌ Failed')
                    }
                  </Tag>
                  
                  <div className="mt-4">
                    <Text className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {passed 
                        ? (language === 'ar' 
                          ? 'أحسنت! لقد تجاوزت النسبة المطلوبة بنجاح'
                          : 'Well done! You have successfully exceeded the required score')
                        : (language === 'ar'
                          ? `تحتاج إلى ${passingScore - score}% إضافية للنجاح`
                          : `You need ${passingScore - score}% more to pass`)
                      }
                    </Text>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>

          {/* Actions */}
          <Card 
            className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
            bordered={!isDarkMode}
          >
            <div className="text-center space-y-4">
              <Title level={4} className={isDarkMode ? 'text-white' : 'text-gray-800'}>
                {language === 'ar' ? 'ماذا تريد أن تفعل الآن؟' : 'What would you like to do next?'}
              </Title>
              
              <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={8}>
                  <Button 
                    type="primary" 
                    size="large" 
                    block
                    icon={<EyeOutlined />}
                    onClick={handleReviewExam}
                    style={{
                      backgroundColor: colors.primaryBase,
                      borderColor: colors.primaryBase,
                      height: '48px'
                    }}
                  >
                    {language === 'ar' ? 'مراجعة الإجابات' : 'Review Answers'}
                  </Button>
                </Col>
                
                <Col xs={24} sm={8}>
                  <Button 
                    type="default" 
                    size="large" 
                    block
                    icon={<ReloadOutlined />}
                    loading={retryLoading}
                    onClick={handleRetryExam}
                    style={{
                      backgroundColor: colors.purple,
                      borderColor: colors.purple,
                      color: 'white',
                      height: '48px'
                    }}
                  >
                    {language === 'ar' ? 'إعادة المحاولة' : 'Try Again'}
                  </Button>
                </Col>
                
                <Col xs={24} sm={8}>
                  <Button 
                    type="default" 
                    size="large" 
                    block
                    icon={<HomeOutlined />}
                    onClick={handleBackToExams}
                    style={{ height: '48px' }}
                  >
                    {language === 'ar' ? 'العودة للامتحانات' : 'Back to Exams'}
                  </Button>
                </Col>
              </Row>
            </div>
          </Card>

          {/* Show navigation state in development */}
          {process.env.NODE_ENV === 'development' && navigationState && (
            <Card 
              title="Debug - Navigation State" 
              className="mt-6 bg-gray-100"
              size="small"
            >
              <pre className="text-xs overflow-auto">
                {JSON.stringify(navigationState, null, 2)}
              </pre>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamResultsPage;