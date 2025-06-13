import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Clock, Users, Award, BookOpen } from 'lucide-react';
import useOnlineExamQuestions from '../../hooks/api/useOnlineExamQuestions';

/**
 * مكون بطاقة الامتحان المبسط
 * @param {Object} exam - بيانات الامتحان
 * @returns {JSX.Element} - مكون بطاقة الامتحان
 */
const SimplifiedExamCard = ({ exam }) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const { getExamDetails } = useOnlineExamQuestions();
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;

  // Get subject icon
  const getSubjectIcon = (courseName) => {
    if (!courseName) return '📚';
    const courseStr = typeof courseName === 'string' ? courseName : courseName?.name || '';
    const course = courseStr.toLowerCase();
    if (course.includes('رياضيات') || course.includes('math')) {
      return '📐';
    } else if (course.includes('فيزياء') || course.includes('physics')) {
      return '⚛️';
    } else if (course.includes('كيمياء') || course.includes('chemistry')) {
      return '🧪';
    } else if (course.includes('أحياء') || course.includes('biology')) {
      return '🧬';
    } else if (course.includes('عربي') || course.includes('arabic')) {
      return '📖';
    } else if (course.includes('إنجليز') || course.includes('english')) {
      return '🇬🇧';
    } else {
      return '📚';
    }
  };

  // Format duration
  const formatDuration = (seconds) => {
    if (!seconds) return getText('غير محدد', 'Not specified');
    const minutes = Math.round(seconds / 60);
    return getText(`${minutes} دقيقة`, `${minutes} min`);
  };

  // Get status color and text based on API response
  const getStatusStyle = (exam) => {
    const buttonText = exam.action_button || exam.availability_status || exam.status || getText('غير محدد', 'Unknown');
    
    // تحديد اللون والإجراء بناءً على نص الزر من API
    if (buttonText.includes('بدء') || buttonText.includes('Start') || buttonText.includes('start')) {
      return {
        text: buttonText,
        className: 'bg-green-500 hover:bg-green-600 text-white',
        action: 'start'
      };
    } else if (buttonText.includes('متابعة') || buttonText.includes('Continue') || buttonText.includes('continue')) {
      return {
        text: buttonText,
        className: 'bg-blue-500 hover:bg-blue-600 text-white',
        action: 'continue'
      };
    } else if (buttonText.includes('إعادة') || buttonText.includes('Retry') || buttonText.includes('retry')) {
      return {
        text: buttonText,
        className: 'bg-orange-500 hover:bg-orange-600 text-white',
        action: 'retry'
      };
    } else if (buttonText.includes('مراجعة') || buttonText.includes('Review') || buttonText.includes('revision')) {
      return {
        text: buttonText,
        className: 'bg-purple-500 hover:bg-purple-600 text-white',
        action: 'review'
      };
    } else if (buttonText.includes('منتهي') || buttonText.includes('انتهى') || buttonText.includes('Ended') || buttonText.includes('ended')) {
      return {
        text: buttonText,
        className: 'bg-red-500 hover:bg-red-600 text-white cursor-not-allowed',
        action: 'ended'
      };
    } else if (buttonText.includes('النتائج') || buttonText.includes('Results') || buttonText.includes('results')) {
      return {
        text: buttonText,
        className: 'bg-indigo-500 hover:bg-indigo-600 text-white',
        action: 'results'
      };
    } else {
      return {
        text: buttonText,
        className: 'bg-gray-500 hover:bg-gray-600 text-white',
        action: 'unknown'
      };
    }
  };

  // Handle button click - always navigate to exam details page
  const handleButtonClick = async (e, action) => {
    e.preventDefault();
    e.stopPropagation();
    
    // أولاً: استدعاء API بيانات الامتحان
    console.log(`📎 [SimplifiedExamCard] Button clicked for exam ${exam.id}, action: ${action}`);
    console.log('📎 [SimplifiedExamCard] Fetching exam details before navigation...');
    
    try {
      const response = await getExamDetails(exam.id);
      
      if (response.success) {
        console.log('✅ [SimplifiedExamCard] Exam details loaded successfully:', response.data);
        
        // دائماً الذهاب لصفحة تفاصيل الامتحان
        console.log('📋 [SimplifiedExamCard] Navigating to exam details page...');
        window.location.href = `/exams/${exam.id}`;
      } else {
        console.error('❌ [SimplifiedExamCard] Failed to get exam details:', response.error);
        // حتى في حالة فشل الاستدعاء، الذهاب لصفحة تفاصيل الامتحان
        window.location.href = `/exams/${exam.id}`;
      }
    } catch (error) {
      console.error('❌ [SimplifiedExamCard] Error calling exam details API:', error);
      // في حالة حدوث خطأ، الذهاب لصفحة تفاصيل الامتحان
      window.location.href = `/exams/${exam.id}`;
    }
  };

  const statusStyle = getStatusStyle(exam);
  
  return (
    <Link to={`/exams/${exam.id}`} className="block">
      <div className={`${isDarkMode ? 'bg-[#1E1E1E] text-[#E0E0E0]' : 'bg-white text-[#37474F]'} rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 hover:scale-[1.02] group`}>
        
        {/* رأس البطاقة */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex items-center flex-1">
              <div className={`text-2xl ${isRTL ? 'ml-3' : 'mr-3'}`}>
                {getSubjectIcon(exam.course)}
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-white group-hover:text-[#7986CB]' : 'text-[#37474F] group-hover:text-[#3949AB]'} transition-colors duration-300 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {exam.name || getText('امتحان بدون اسم', 'Unnamed Exam')}
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} ${isRTL ? 'text-right' : 'text-left'}`}>
                  {typeof exam.course === 'string' ? exam.course : exam.course?.name || getText('عام', 'General')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* معلومات الامتحان */}
        <div className="p-4">
          {/* الوصف */}
          {exam.description && (
            <p className={`text-sm mb-4 line-clamp-2 transition-colors duration-300 ${isDarkMode ? 'text-[#AAAAAA] group-hover:text-[#E0E0E0]' : 'text-gray-600 group-hover:text-gray-700'} ${isRTL ? 'text-right' : 'text-left'}`}>
              {exam.description}
            </p>
          )}

          {/* الإحصائيات */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className={`flex items-center justify-center mb-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                <Clock size={16} className={`${isRTL ? 'ml-1' : 'mr-1'}`} />
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {formatDuration(exam.duration_in_seconds)}
              </div>
            </div>
            <div className="text-center">
              <div className={`flex items-center justify-center mb-1 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                <Users size={16} className={`${isRTL ? 'ml-1' : 'mr-1'}`} />
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {exam.question_number || 0} {getText('سؤال', 'Q')}
              </div>
            </div>
            <div className="text-center">
              <div className={`flex items-center justify-center mb-1 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                <Award size={16} className={`${isRTL ? 'ml-1' : 'mr-1'}`} />
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {exam.min_percentage || 50}%
              </div>
            </div>
          </div>

          {/* معلومات إضافية */}
          {exam.education_level && (
            <div className="mb-3">
              <span className={`inline-block px-2 py-1 text-xs rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                {typeof exam.education_level === 'string' ? exam.education_level : exam.education_level?.name || getText('غير محدد', 'Not specified')}
              </span>
            </div>
          )}

          {/* زر الحالة */}
          <button
            onClick={(e) => handleButtonClick(e, statusStyle.action)}
            disabled={statusStyle.action === 'ended'}
            className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${statusStyle.className} ${statusStyle.action === 'ended' ? 'opacity-60' : ''}`}
          >
            {statusStyle.text}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default SimplifiedExamCard;