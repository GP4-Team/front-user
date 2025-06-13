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
              {translations.upcomingExams || (isArabic ? "الاختبارات المتاحة" : "Available Exams")}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.slice(0, 6).map((exam, idx) => {
            console.log(`📋 [ExamsSection] Rendering exam ${idx + 1}:`, exam);
            
            // Extract values directly from actual API response
            const examName = exam.name || '';
            const courseName = exam.course?.name || '';
            const duration = exam.duration_formatted || '';
            const questionCount = exam.question_number || 0;
            const examCategory = exam.exam_category?.name || '';
            const educationLevel = exam.education_level?.name || '';
            const availabilityStatus = exam.availability_status || '';
            const actionButton = exam.action_button || '';
            const canTakeExam = exam.can_take_exam;
            const minPercentage = exam.min_percentage;
            const examStatus = exam.status || '';
            const timeRemaining = exam.time_remaining || '';
            
            // Log the actual exam data
            console.log(`🔍 [ExamsSection] Exam ${idx + 1} details:`, {
              id: exam.id,
              name: examName,
              course: courseName,
              status: examStatus,
              availabilityStatus: availabilityStatus,
              actionButton: actionButton,
              canTakeExam: canTakeExam,
              timeRemaining: timeRemaining
            });
            
            // Get status styling based on actual exam status from API
            let statusColor = '';
            let buttonClasses = '';
            let buttonText = actionButton; // Use actual button text from API
            
            // Handle different statuses based on API response
            switch (examStatus) {
              case 'start':
              case 'available':
                statusColor = isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700';
                buttonClasses = 'bg-accent hover:bg-accent/90 text-[#37474F]';
                if (!buttonText) buttonText = isArabic ? 'ابدأ الامتحان' : 'Start Exam';
                break;
              case 'continue':
              case 'active':
                statusColor = isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700';
                buttonClasses = 'bg-primary-base hover:bg-primary-dark text-white';
                if (!buttonText) buttonText = isArabic ? 'متابعة الامتحان' : 'Continue Exam';
                break;
              case 'ended':
                statusColor = isDarkMode ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-700';
                if (canTakeExam) {
                  buttonClasses = 'bg-orange-500 hover:bg-orange-600 text-white';
                } else {
                  buttonClasses = 'bg-blue-500 hover:bg-blue-600 text-white';
                }
                if (!buttonText) buttonText = isArabic ? 'عرض النتائج' : 'View Results';
                break;
              case 'retry':
                statusColor = isDarkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700';
                buttonClasses = 'bg-yellow-500 hover:bg-yellow-600 text-white';
                if (!buttonText) buttonText = isArabic ? 'إعادة المحاولة' : 'Retry Exam';
                break;
              case 'unavailable':
              case 'finished':
              default:
                statusColor = isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-700';
                buttonClasses = isDarkMode ? 'bg-gray-700 text-gray-300 cursor-not-allowed' : 'bg-gray-200 text-gray-700 cursor-not-allowed';
                if (!buttonText) buttonText = isArabic ? 'غير متاح' : 'Unavailable';
            }
            
            // Determine subject icon background color
            const getSubjectColor = () => {
              if (courseName.toLowerCase().includes('physics') || courseName.includes('فيزياء')) {
                return isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100';
              } else if (courseName.toLowerCase().includes('chemistry') || courseName.includes('كيمياء')) {
                return isDarkMode ? 'bg-green-900/30' : 'bg-green-100';
              } else if (courseName.toLowerCase().includes('math') || courseName.includes('رياضيات') || courseName.includes('جبر')) {
                return isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100';
              } else if (courseName.toLowerCase().includes('arabic') || courseName.includes('عربي') || courseName.includes('أدب')) {
                return isDarkMode ? 'bg-red-900/30' : 'bg-red-100';
              } else if (courseName.toLowerCase().includes('anatomy') || courseName.includes('تشريح')) {
                return isDarkMode ? 'bg-pink-900/30' : 'bg-pink-100';
              } else {
                return isDarkMode ? 'bg-gray-900/30' : 'bg-gray-100';
              }
            };
            
            return (
              <div 
                key={exam.id || idx} 
                className={`rounded-xl overflow-hidden shadow-md transition-all hover:-translate-y-2 hover:shadow-xl ${isDarkMode ? 'bg-[#2D2D2D]' : 'bg-white'}`}
              >
                <div className={`p-5 flex items-start justify-between border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getSubjectColor()}`}>
                      {/* Simple subject icon */}
                      <div className="w-6 h-6 bg-current opacity-30 rounded"></div>
                    </div>
                    <div className="ml-3">
                      <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {courseName || (isArabic ? 'مقرر' : 'Course')}
                      </span>
                      <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-text-dark'}`}>
                        {examName || (isArabic ? 'امتحان' : 'Exam')}
                      </h3>
                    </div>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${statusColor} self-start ml-2`}>
                    {availabilityStatus || examCategory || (isArabic ? 'امتحان' : 'Exam')}
                  </span>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center justify-between mb-5">
                    <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Clock size={16} className="mr-2" />
                      <span>{duration || '60 min'}</span>
                    </div>
                    <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 mr-2">
                        <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-1.12-2.5-2.5-2.5S6 10.62 6 12c0 .76.34 1.42.87 1.88L7 22l4-3 4 3 .13-8.12c.53-.46.87-1.12.87-1.88 0-1.38-1.12-2.5-2.5-2.5S11 10.62 11 12a2.5 2.5 0 002.5 2.5"></path>
                        <path d="M7 6h10M7 9h10"></path>
                      </svg>
                      <span>{questionCount} {isArabic ? 'سؤال' : 'questions'}</span>
                    </div>
                  </div>
                  
                  {/* Display additional exam info */}
                  <div className="mb-4 space-y-2">
                    {minPercentage && (
                      <div className={`px-3 py-1.5 rounded-md text-sm inline-block mr-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        {isArabic ? 'نسبة النجاح:' : 'Pass:'} {minPercentage}%
                      </div>
                    )}
                    
                    {educationLevel && (
                      <div className={`px-3 py-1.5 rounded-md text-sm inline-block ${isDarkMode ? 'bg-blue-800/30' : 'bg-blue-100'}`}>
                        {educationLevel}
                      </div>
                    )}
                  </div>
                  
                  {/* Time remaining info */}
                  {timeRemaining && timeRemaining !== "Exam ended" && (
                    <div className="mb-4">
                      <div className={`px-3 py-1.5 rounded-md text-sm ${isDarkMode ? 'bg-yellow-800/30 text-yellow-300' : 'bg-yellow-100 text-yellow-700'}`}>
                        {isArabic ? 'الوقت المتبقي:' : 'Time remaining:'} {timeRemaining}
                      </div>
                    </div>
                  )}
                  
                  {/* Navigation to exam details page */}
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
