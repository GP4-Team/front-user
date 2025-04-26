import React from 'react';
import { Button, Card, Row, Col, Typography } from 'antd';
import { ClockCircleOutlined, FileTextOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const { Title, Text, Paragraph } = Typography;

const ExamDetails = ({ examData, onStartExam, language, isDarkMode }) => {
  return (
    <Card 
      className={`shadow-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
      bordered={!isDarkMode}
    >
      <div className="text-center mb-6">
        <Title level={2} className={isDarkMode ? 'text-white' : ''}>
          {examData.title}
        </Title>
        <Paragraph className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
          {examData.description}
        </Paragraph>
      </div>

      <div className="mb-8 flex justify-center">
        <img
          src={examData.image || "/images/exam.svg"}
          alt="Exam"
          className="h-48 object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRTVFN0VCIi8+CjxwYXRoIGQ9Ik0xMDQgODZINjhWMTE0SDEwNFY4NloiIGZpbGw9IiM0Qjc1Q0IiLz4KPHBhdGggZD0iTTEzMiA4Nkg5NlYxMTRIMTMyVjg2WiIgZmlsbD0iIzRCNzVDQiIvPgo8cGF0aCBkPSJNMTA0IDExNEg2OFYxNDJIMTA0VjExNFoiIGZpbGw9IiM0Qjc1Q0IiLz4KPHBhdGggZD0iTTEzMiAxMTRIOTZWMTQySDEzMlYxMTRaIiBmaWxsPSIjNEI3NUNCIi8+Cjwvc3ZnPgo=";
          }}
        />
      </div>

      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} sm={12} md={6}>
          <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <ClockCircleOutlined className={`text-2xl mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-500'}`} />
            <div className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>
              {language === 'ar' ? 'مدة الامتحان' : 'Duration'}
            </div>
            <div className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-blue-600'}`}>
              {examData.time} {language === 'ar' ? 'دقائق' : 'minutes'}
            </div>
          </div>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
            <FileTextOutlined className={`text-2xl mb-2 ${isDarkMode ? 'text-green-300' : 'text-green-500'}`} />
            <div className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>
              {language === 'ar' ? 'عدد الأسئلة' : 'Questions'}
            </div>
            <div className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-green-600'}`}>
              {examData.questions.length}
            </div>
          </div>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
            <TrophyOutlined className={`text-2xl mb-2 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-500'}`} />
            <div className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>
              {language === 'ar' ? 'النسبة المطلوبة' : 'Passing Score'}
            </div>
            <div className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-yellow-600'}`}>
              {examData.passingScore}%
            </div>
          </div>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
            <UserOutlined className={`text-2xl mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-500'}`} />
            <div className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>
              {language === 'ar' ? 'محاولات متبقية' : 'Remaining Attempts'}
            </div>
            <div className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-purple-600'}`}>
              {examData.attempts?.remaining || (language === 'ar' ? 'غير محدود' : 'Unlimited')}
            </div>
          </div>
        </Col>
      </Row>

      <div className="text-center">
        <Button 
          type="primary" 
          size="large" 
          onClick={onStartExam}
          className="px-8 py-2 h-auto text-lg"
        >
          {language === 'ar' ? 'بدء الامتحان' : 'Start Exam'}
        </Button>
      </div>
    </Card>
  );
};

export default ExamDetails;
