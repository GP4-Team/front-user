import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock, Users, Award } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useRealExamination } from '../../hooks/api/useRealExamination';

const ExamsSection = ({ translations }) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const isArabic = language === 'ar';
  const sectionRef = useRef(null);

  // Use the real examination hook
  const { 
    loading,
    error,
    availableExams,
    fetchAllExamData
  } = useRealExamination();
  
  // Load exam data when component mounts
  useEffect(() => {
    fetchAllExamData();
  }, [fetchAllExamData]);

  // Limit to first 6 exams for home page display (same as courses)
  const examData = Array.isArray(availableExams) ? availableExams.slice(0, 6) : [];

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

  // Get status color and text
  const getStatusStyle = (exam) => {
    const buttonText = exam.action_button || exam.availability_status || exam.status || getText('غير محدد', 'Unknown');
    
    // تحديد اللون بناءً على نص الزر أو الحالة
    if (buttonText.includes('بدء') || buttonText.includes('Start') || buttonText.includes('start')) {
      return {
        text: buttonText,
        className: 'bg-green-500 hover:bg-green-600 text-white'
      };
    } else if (buttonText.includes('متابعة') || buttonText.includes('Continue') || buttonText.includes('continue')) {
      return {
        text: buttonText,
        className: 'bg-blue-500 hover:bg-blue-600 text-white'
      };
    } else if (buttonText.includes('إعادة') || buttonText.includes('Retry') || buttonText.includes('retry')) {
      return {
        text: buttonText,
        className: 'bg-orange-500 hover:bg-orange-600 text-white'
      };
    } else if (buttonText.includes('مراجعة') || buttonText.includes('Review') || buttonText.includes('revision')) {
      return {
        text: buttonText,
        className: 'bg-purple-500 hover:bg-purple-600 text-white'
      };
    } else if (buttonText.includes('منتهي') || buttonText.includes('انتهى') || buttonText.includes('Ended') || buttonText.includes('ended')) {
      return {
        text: buttonText,
        className: 'bg-red-500 hover:bg-red-600 text-white'
      };
    } else if (buttonText.includes('النتائج') || buttonText.includes('Results') || buttonText.includes('results')) {
      return {
        text: buttonText,
        className: 'bg-indigo-500 hover:bg-indigo-600 text-white'
      };
    } else {
      return {
        text: buttonText,
        className: 'bg-gray-500 hover:bg-gray-600 text-white'
      };
    }
  };

  // Handle exam card click
  const handleExamClick = (examId) => {
    navigate(`/exams/${examId}`);
  };

  // Render exam card (similar to course card structure)
  const renderExamCard = (exam, idx) => {
    const statusStyle = getStatusStyle(exam);
    
    return (
      <div 
        key={exam.id || idx}
        onClick={() => handleExamClick(exam.id)}
        className={`${isDarkMode ? 'bg-[#1E1E1E] text-[#E0E0E0]' : 'bg-white text-[#37474F]'} rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 hover:scale-[1.02] group cursor-pointer`}
      >
        {/* صورة الامتحان أو أيقونة */}
        <div className="relative overflow-hidden">
          <div className={`w-full h-48 flex items-center justify-center ${
            isDarkMode ? 'bg-gradient-to-br from-[#3949AB] to-[#1A237E]' : 'bg-gradient-to-br from-[#3949AB] to-[#7986CB]'
          }`}>
            <div className="text-6xl text-white opacity-80">
              {getSubjectIcon(exam.course)}
            </div>
          </div>
          
          {/* Overlay effect on hover */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </div>
        
        {/* معلومات الامتحان */}
        <div className="p-4">
          <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-white group-hover:text-[#7986CB]' : 'text-[#37474F] group-hover:text-[#3949AB]'} transition-colors duration-300 ${isRTL ? 'text-right' : 'text-left'}`}>
            {exam.name || getText('امتحان بدون اسم', 'Unnamed Exam')}
          </h3>
          
          <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} ${isRTL ? 'text-right' : 'text-left'}`}>
            {typeof exam.course === 'string' ? exam.course : exam.course?.name || getText('عام', 'General')}
          </p>

          {exam.description && (
            <p className={`text-sm mb-3 line-clamp-2 transition-colors duration-300 ${isDarkMode ? 'text-[#AAAAAA] group-hover:text-[#E0E0E0]' : 'text-gray-600 group-hover:text-gray-700'} ${isRTL ? 'text-right' : 'text-left'}`}>
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
            onClick={(e) => {
              e.stopPropagation();
              handleExamClick(exam.id);
            }}
            className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${statusStyle.className}`}
          >
            {statusStyle.text}
          </button>
        </div>
      </div>
    );
  };

  return (
    <section 
      ref={sectionRef}
      className={`py-12 px-4 ${isDarkMode ? 'bg-[#121212]' : 'bg-neutral-50'}`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#37474F]'} ${isRTL ? 'text-right' : 'text-left'}`}>
            {translations?.upcomingExams || getText('الامتحانات القادمة', 'Upcoming Exams')}
          </h2>
          <Link to="/exams" className={`text-sm font-medium ${isDarkMode ? 'text-[#7986CB]' : 'text-[#3949AB]'} flex items-center hover:underline`}>
            {getText('عرض الكل', 'View All')}
            {isRTL ? (
              <ChevronLeft size={16} className="mr-1" />
            ) : (
              <ChevronRight size={16} className="ml-1" />
            )}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Loading state - show 6 skeleton cards to match the exam limit
            [1, 2, 3, 4, 5, 6].map((_, idx) => (
              <div key={idx} className={`rounded-lg overflow-hidden shadow-md ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}>
                <div className="w-full h-48 bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                <div className="p-4 animate-pulse">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-3/4"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-4 w-2/3"></div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                  <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
            ))
          ) : error ? (
            // Error state
            <div className="col-span-3 text-center py-10">
              <div className={`${isDarkMode ? 'text-red-400' : 'text-red-600'} text-lg mb-2`}>
                {getText('خطأ في تحميل الامتحانات', 'Error loading exams')}
              </div>
              <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                {error}
              </div>
            </div>
          ) : examData.length > 0 ? (
            // Render exam cards
            examData.map((exam, idx) => renderExamCard(exam, idx))
          ) : (
            // No exams state  
            <div className="col-span-3 text-center py-10">
              <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-lg mb-4`}>
                {getText('لا توجد امتحانات متاحة حالياً', 'No exams available at the moment')}
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {getText('سيتم عرض أول 6 امتحانات فقط في الصفحة الرئيسية', 'Only the first 6 exams are shown on the homepage')}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExamsSection;