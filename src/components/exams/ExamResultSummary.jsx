import React from 'react';
import { Card, Progress, Typography, Button, Divider } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, TrophyOutlined, ClockCircleOutlined, LineChartOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const { Title, Text } = Typography;

const ExamResultSummary = ({ score, totalQuestions, correctAnswers, passingScore, timeSpent, onBackToExams, onRetakeExam, language, isDarkMode }) => {
  const isPassed = score >= passingScore;

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card 
      className={`shadow-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
      bordered={!isDarkMode}
    >
      <div className="text-center mb-4">
        <Title level={2} className={isDarkMode ? 'text-white' : ''}>
          {language === 'ar' ? 'نتائج الامتحان' : 'Exam Results'}
        </Title>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-6">
        <div className="text-center">
          <Progress
            type="circle"
            percent={score}
            status={isPassed ? "success" : "exception"}
            strokeColor={isPassed ? "#52c41a" : "#f5222d"}
            strokeWidth={10}
            width={120}
          />
          <div className="mt-2">
            <Text strong className={isDarkMode ? 'text-white' : ''}>
              {language === 'ar' ? 'نتيجتك' : 'Your Score'}
            </Text>
          </div>
        </div>

        <div className="text-center">
          <div className={`text-4xl font-bold mb-2 ${isPassed ? 'text-green-500' : 'text-red-500'}`}>
            {isPassed ? 
              (language === 'ar' ? 'ناجح' : 'PASSED') : 
              (language === 'ar' ? 'راسب' : 'FAILED')}
          </div>
          <div className="flex justify-center items-center">
            {isPassed ? 
              <CheckCircleFilled className="text-3xl text-green-500" /> : 
              <CloseCircleFilled className="text-3xl text-red-500" />}
          </div>
        </div>
      </div>

      <Divider className={isDarkMode ? 'bg-gray-600' : ''} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <LineChartOutlined className={`text-2xl mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-500'}`} />
          <div className="font-bold">{language === 'ar' ? 'الإجابات الصحيحة' : 'Correct Answers'}</div>
          <div className="text-xl font-semibold mt-1">
            {correctAnswers} / {totalQuestions}
          </div>
        </div>

        <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <ClockCircleOutlined className={`text-2xl mb-2 ${isDarkMode ? 'text-green-300' : 'text-green-500'}`} />
          <div className="font-bold">{language === 'ar' ? 'الوقت المستغرق' : 'Time Spent'}</div>
          <div className="text-xl font-semibold mt-1">
            {formatTime(timeSpent)}
          </div>
        </div>

        <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <TrophyOutlined className={`text-2xl mb-2 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-500'}`} />
          <div className="font-bold">{language === 'ar' ? 'النسبة المطلوبة' : 'Passing Score'}</div>
          <div className="text-xl font-semibold mt-1">
            {passingScore}%
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button 
          type="primary" 
          size="large"
          onClick={onBackToExams}
          className="mb-2 sm:mb-0"
        >
          {language === 'ar' ? 'العودة إلى الامتحانات' : 'Back to Exams'}
        </Button>
        <Button 
          size="large"
          onClick={onRetakeExam}
        >
          {language === 'ar' ? 'إعادة الامتحان' : 'Retake Exam'}
        </Button>
      </div>
    </Card>
  );
};

export default ExamResultSummary;
