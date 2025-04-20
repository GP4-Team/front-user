// src/components/ui/cards/ExamCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTheme } from '../../../contexts/ThemeContext';
import Button from '../buttons/Button';

/**
 * مكون لعرض بطاقة امتحان
 * يستخدم لعرض معلومات الامتحان في قائمة الامتحانات
 */
const ExamCard = ({
  exam,
  onRegister,
  onStart,
  onViewResults,
  className = '',
}) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  
  // استخراج بيانات الامتحان
  const {
    id,
    title,
    subject,
    level,
    duration,
    questionsCount,
    status,
    date,
  } = exam;
  
  // الحصول على النص بلغة المستخدم
  const getText = (textObj) => {
    if (!textObj || typeof textObj !== 'object') {
      return textObj || '';
    }
    
    return textObj[language] || textObj.en || '';
  };
  
  // الحصول على أيقونة المادة
  const getSubjectIcon = () => {
    const subjectText = getText(subject).toLowerCase();
    
    if (subjectText.includes('physics') || subjectText.includes('فيزياء')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      );
    } else if (subjectText.includes('chemistry') || subjectText.includes('كيمياء')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M9 3h6m-3-1v2M9.5 8h5c.28 0 .5.22.5.5v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2c0-.28.22-.5.5-.5zM8 8H7c-1.1 0-2 .9-2 2v9a3 3 0 003 3h8a3 3 0 003-3v-9c0-1.1-.9-2-2-2h-1" />
        </svg>
      );
    } else if (subjectText.includes('math') || subjectText.includes('رياضيات')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M19 5H5v14h14V5z" />
          <path d="M5 12h14M12 5v14" />
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 01-2.5-2.5z" />
          <path d="M12 6v4M9 8h6" />
        </svg>
      );
    }
  };
  
  // تحديد لون حالة الامتحان وزر الإجراء
  const getStatusInfo = () => {
    // تحديد اللون حسب الحالة
    let statusColor = '';
    let actionButton = null;
    
    if (status === 'upcoming') {
      statusColor = isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700';
      actionButton = (
        <Button 
          variant="primary" 
          fullWidth 
          onClick={() => onRegister(id)}
          className="mt-4"
        >
          {language === 'ar' ? 'التسجيل' : 'Register'}
        </Button>
      );
    } else if (status === 'active') {
      statusColor = isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700';
      actionButton = (
        <Button 
          variant="warning" 
          fullWidth 
          onClick={() => onStart(id)}
          className="mt-4"
        >
          {language === 'ar' ? 'ابدأ الآن' : 'Start Now'}
        </Button>
      );
    } else {
      statusColor = isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-700';
      actionButton = (
        <Button 
          variant="secondary" 
          fullWidth 
          onClick={() => onViewResults(id)}
          className="mt-4"
        >
          {language === 'ar' ? 'عرض النتائج' : 'View Results'}
        </Button>
      );
    }
    
    return { statusColor, actionButton };
  };
  
  const { statusColor, actionButton } = getStatusInfo();
  
  // تعيين الفئات الرئيسية
  const cardClasses = [
    'rounded-xl overflow-hidden shadow-md',
    isDarkMode ? 'bg-[#2D2D2D]' : 'bg-white',
    className
  ].join(' ');
  
  return (
    <div className={cardClasses}>
      {/* رأس البطاقة */}
      <div className={`p-4 flex items-start justify-between border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'
          }`}>
            {getSubjectIcon()}
          </div>
          <div className="ml-3">
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {getText(subject)}
            </span>
            <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
              <Link to={`/exams/${id}`}>
                {getText(title)}
              </Link>
            </h3>
          </div>
        </div>
        
        {/* تاريخ/حالة الامتحان */}
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
          {getText(date)}
        </span>
      </div>
      
      {/* محتوى البطاقة */}
      <div className="p-4">
        {/* معلومات الامتحان */}
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <Clock size={14} className="mr-1" />
            <span>{getText(duration)}</span>
          </div>
          <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 mr-1">
              <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-1.12-2.5-2.5-2.5S6 10.62 6 12c0 .76.34 1.42.87 1.88L7 22l4-3 4 3 .13-8.12c.53-.46.87-1.12.87-1.88 0-1.38-1.12-2.5-2.5-2.5S11 10.62 11 12a2.5 2.5 0 002.5 2.5"></path>
              <path d="M7 6h10M7 9h10"></path>
            </svg>
            <span>{questionsCount} {language === 'ar' ? 'سؤال' : 'questions'}</span>
          </div>
        </div>
        
        {/* المستوى الدراسي */}
        <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {getText(level)}
        </p>
        
        {/* زر الإجراء */}
        {actionButton}
      </div>
    </div>
  );
};

export default ExamCard;