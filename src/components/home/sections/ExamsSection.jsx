import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useTheme } from "../../../contexts/ThemeContext";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";

const ExamsSection = ({ exams, translations, loading = false, error = null }) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const isArabic = language === "ar";

  // Show loading state
  if (loading) {
    return (
      <section className={`py-16 px-4 ${isDarkMode ? 'bg-[#121212]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-base mb-4"></div>
            <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
              {isArabic ? 'جاري تحميل الامتحانات...' : 'Loading exams...'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className={`py-16 px-4 ${isDarkMode ? 'bg-[#121212]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {isArabic ? 'خطأ في تحميل الامتحانات' : 'Error Loading Exams'}
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Don't render if no exams
  if (!exams || exams.length === 0) {
    return (
      <section className={`py-16 px-4 ${isDarkMode ? 'bg-[#121212]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {isArabic ? 'لا توجد امتحانات متاحة' : 'No exams available'}
            </h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {isArabic ? 'سيتم عرض الامتحانات هنا عندما تكون متاحة' : 'Exams will appear here when available'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 px-4 ${isDarkMode ? 'bg-[#121212]' : 'bg-gray-50'} relative overflow-hidden`}>
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary-light/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/5 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <span className={`text-sm rounded-md px-3 py-1 font-semibold inline-block mb-2 w-fit ${isDarkMode ? 'bg-accent/20 text-accent' : 'bg-accent/20 text-accent/80'}`}>
              {isArabic ? "الاختبارات" : "Exams"}
            </span>
            <h2 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-text-dark'}`}>
              {translations.upcomingExams || (isArabic ? "الاختبارات القادمة" : "Upcoming Exams")}
            </h2>
          </div>
          
          <Link to="/exams" className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-primary-base'} flex items-center hover:underline`}>
            {isArabic ? 'عرض الكل' : 'View All'}
            {isRTL ? (
              <ChevronLeft size={16} className="mr-1" />
            ) : (
              <ChevronRight size={16} className="ml-1" />
            )}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exams.slice(0, 3).map((exam, idx) => {
            console.log(`📋 [ExamsSection] Rendering exam ${idx + 1}:`, exam);
            // Helper function to get text from multilingual object or string
            const getExamText = (textObj) => {
              if (!textObj) return '';
              if (typeof textObj === 'string') return textObj;
              if (typeof textObj === 'object') {
                return textObj[language] || textObj.en || textObj.ar || '';
              }
              return '';
            };
            
            // Get status styling based on exam status
            let statusColor = '';
            let buttonClasses = '';
            let buttonText = '';
            
            switch (exam.status) {
              case 'start':
              case 'upcoming':
                statusColor = isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700';
                buttonClasses = 'bg-accent hover:bg-accent/90 text-[#37474F]';
                buttonText = isArabic ? 'ابدأ الامتحان' : 'Start Exam';
                break;
              case 'continue':
              case 'active':
                statusColor = isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700';
                buttonClasses = 'bg-primary-base hover:bg-primary-dark text-white';
                buttonText = isArabic ? 'متابعة الامتحان' : 'Continue Exam';
                break;
              case 'revision':
                statusColor = isDarkMode ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-700';
                buttonClasses = 'bg-orange-500 hover:bg-orange-600 text-white';
                buttonText = isArabic ? 'مراجعة الإجابات' : 'Review Answers';
                break;
              case 'retry':
                statusColor = isDarkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700';
                buttonClasses = 'bg-yellow-500 hover:bg-yellow-600 text-white';
                buttonText = isArabic ? 'إعادة المحاولة' : 'Retry Exam';
                break;
              case 'unavailable':
              case 'finished':
              default:
                statusColor = isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-700';
                buttonClasses = isDarkMode ? 'bg-gray-700 text-gray-300 cursor-not-allowed' : 'bg-gray-200 text-gray-700 cursor-not-allowed';
                buttonText = isArabic ? 'غير متاح' : 'Unavailable';
            }
            
            return (
              <div 
                key={exam.id || idx} 
                className={`rounded-xl overflow-hidden shadow-md transition-all hover:-translate-y-2 hover:shadow-xl ${isDarkMode ? 'bg-[#2D2D2D]' : 'bg-white'}`}
              >
                <div className={`p-5 flex items-start justify-between border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      getExamText(exam.courseName || exam.subject || '').toLowerCase().includes('physics') || getExamText(exam.courseName || exam.subject || '').includes('فيزياء')
                        ? isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                        : getExamText(exam.courseName || exam.subject || '').toLowerCase().includes('chemistry') || getExamText(exam.courseName || exam.subject || '').includes('كيمياء')
                          ? isDarkMode ? 'bg-green-900/30' : 'bg-green-100'
                          : isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'
                    }`}>
                      {/* Simple subject icon */}
                      <div className="w-6 h-6 bg-current opacity-30 rounded"></div>
                    </div>
                    <div className="ml-3">
                      <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {getExamText(exam.courseName || exam.subject) || (isArabic ? 'مقرر' : 'Course')}
                      </span>
                      <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-text-dark'}`}>
                        {getExamText(exam.name || exam.title) || (isArabic ? 'امتحان' : 'Exam')}
                      </h3>
                    </div>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${statusColor} self-start ml-2`}>
                    {getExamText(exam.examCategory) || (isArabic ? 'امتحان' : 'Exam')}
                  </span>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center justify-between mb-5">
                    <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Clock size={16} className="mr-2" />
                      <span>{exam.duration || 60} {isArabic ? 'دقيقة' : 'min'}</span>
                    </div>
                    <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 mr-2">
                        <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-1.12-2.5-2.5-2.5S6 10.62 6 12c0 .76.34 1.42.87 1.88L7 22l4-3 4 3 .13-8.12c.53-.46.87-1.12.87-1.88 0-1.38-1.12-2.5-2.5-2.5S11 10.62 11 12a2.5 2.5 0 002.5 2.5"></path>
                        <path d="M7 6h10M7 9h10"></path>
                      </svg>
                      <span>{exam.numberOfQuestions || 10} {isArabic ? 'سؤال' : 'questions'}</span>
                    </div>
                  </div>
                  
                  {exam.minPercentage && (
                    <div className="mb-4">
                      <div className={`px-3 py-1.5 rounded-md text-sm inline-block ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        {isArabic ? 'نسبة النجاح:' : 'Pass:'} {exam.minPercentage}%
                      </div>
                    </div>
                  )}
                  
                  <Link
                    to={`/exams/${exam.id}`}
                    className={`w-full py-2.5 text-sm font-medium rounded-lg transition-all block text-center ${
                      buttonClasses
                    } hover:-translate-y-0.5 shadow-sm hover:shadow-md`}
                  >
                    {buttonText}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExamsSection;
