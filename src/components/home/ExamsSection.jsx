import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock, Users, Award } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  getExamStatusLabel, 
  getExamStatusColors, 
  isExamActionEnabled,
  formatExamDuration 
} from '../../services/examProgressService';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Debug flag - set to true to see debug info in console
const DEBUG = true;

// Get subject icon for each category
const getSubjectIcon = (category, size = 24) => {
  const { Atom, Beaker, Calculator, Dna, Book } = require('lucide-react');
  
  const categoryLower = (category || '').toLowerCase();
  
  if (categoryLower.includes("physics") || categoryLower.includes("فيزياء")) {
    return <Atom size={size} />;
  } else if (categoryLower.includes("chemistry") || categoryLower.includes("كيمياء")) {
    return <Beaker size={size} />;
  } else if (categoryLower.includes("math") || categoryLower.includes("رياضيات")) {
    return <Calculator size={size} />;
  } else if (categoryLower.includes("biology") || categoryLower.includes("أحياء")) {
    return <Dna size={size} />;
  } else {
    return <Book size={size} />;
  }
};

const ExamsSection = ({ exams = [], translations, loading = false, error = null }) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const isArabic = language === 'ar';
  const sectionRef = useRef(null);
  const examRefs = useRef([]);
  
  // Ensure exams is always an array even if null or undefined is passed
  const examData = Array.isArray(exams) ? exams : [];
  
  // Enhanced debug logging
  useEffect(() => {
    if (DEBUG) {
      console.log('🏠 === ExamsSection DEBUG INFO ===');
      console.log('Raw exams prop:', exams);
      console.log('Processed examData:', examData);
      console.log('ExamData length:', examData.length);
      console.log('ExamData type:', typeof examData);
      console.log('Loading state:', loading);
      console.log('Error state:', error);
      console.log('Language:', language);
      console.log('Is Arabic:', isArabic);
      
      // Log each individual exam
      if (examData.length > 0) {
        console.log('📋 Individual exams:');
        examData.forEach((exam, index) => {
          console.log(`Exam ${index + 1}:`, {
            originalData: exam,
            id: exam?.id,
            name: exam?.name || exam?.title,
            subject: exam?.subject || exam?.course_name,
            duration: exam?.duration || exam?.duration_time,
            questionsCount: exam?.numberOfQuestions || exam?.questions_count || exam?.number_of_questions,
            status: exam?.status,
            category: exam?.examCategory || exam?.category,
            allKeys: Object.keys(exam || {})
          });
        });
      } else {
        console.log('❌ No exams to display');
      }
      console.log('=====================================');
    }
  }, [exams, examData, loading, error, language, isArabic]);

  // Show detailed exam information when rendering cards
  const renderExamCard = (exam, idx) => {
    if (DEBUG) {
      console.log(`🎯 Rendering exam card ${idx + 1}:`, {
        rawExam: exam,
        extractedData: {
          id: exam?.id,
          name: exam?.name,
          description: exam?.description,
          questionNumber: exam?.question_number,
          duration: exam?.duration_in_seconds,
          course: exam?.course,
          educationLevel: exam?.education_level,
          examCategory: exam?.exam_category,
          status: exam?.status,
          statusInfo: exam?.status_info
        }
      });
    }

    // Extract exam data based on real API structure - handle nested data
    const examData = exam?.data || exam; // Extract the actual exam data
    const examId = examData?.id;
    const examName = examData?.name;
    const examDescription = examData?.description;
    const examQuestionsCount = examData?.question_number;
    const examDurationSeconds = examData?.duration_in_seconds;
    const examDurationMinutes = examDurationSeconds ? Math.round(examDurationSeconds / 60) : null;
    const examCourse = examData?.course?.name;
    const examEducationLevel = examData?.education_level?.name;
    const examCategory = examData?.exam_category?.name;
    const examStatus = examData?.status;
    const examStatusInfo = examData?.status_info;
    const examAllowedChances = examData?.allowed_chances;
    const examMinPercentage = examData?.min_percentage;
    const examStartAt = examData?.start_at;
    const examEndAt = examData?.end_at;

    // Only show card if we have essential data
    if (!examName && !examId) {
      console.warn('⚠️ Skipping exam card - missing essential data:', exam);
      return null;
    }

    // Get status styling and labels - use real status from API
    const statusColors = getExamStatusColors(examStatus, isDarkMode);
    const statusLabel = examStatusInfo?.button_text || getExamStatusLabel(examStatus, language);
    const isActionEnabled = !examStatusInfo?.disabled && isExamActionEnabled(examStatus);
    const formattedDuration = formatExamDuration(examDurationMinutes, language);
    
    // Use status info from API for button styling
    let actionButtonClass = '';
    if (examStatusInfo?.disabled) {
      actionButtonClass = isDarkMode ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' : 'bg-neutral-100 text-neutral-400 cursor-not-allowed';
    } else {
      switch (examStatusInfo?.button_color) {
        case 'primary':
          actionButtonClass = 'bg-primary-base hover:bg-primary-dark text-text-light';
          break;
        case 'secondary':
          actionButtonClass = isDarkMode ? 'bg-neutral-700 hover:bg-neutral-600 text-neutral-300' : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-700';
          break;
        case 'success':
          actionButtonClass = 'bg-green-600 hover:bg-green-700 text-white';
          break;
        case 'warning':
          actionButtonClass = 'bg-yellow-600 hover:bg-yellow-700 text-white';
          break;
        case 'danger':
          actionButtonClass = 'bg-red-600 hover:bg-red-700 text-white';
          break;
        default:
          actionButtonClass = 'bg-primary-base hover:bg-primary-dark text-text-light';
      }
    }

    return (
      <div 
        key={examId || idx}
        ref={el => examRefs.current[idx] = el}
        className={`rounded-xl overflow-hidden shadow-md transition-transform hover:-translate-y-1 duration-300 ${isDarkMode ? 'bg-neutral-800' : 'bg-background-card-light'}`}
      >
        <div className={`p-4 flex items-start justify-between border-b ${isDarkMode ? 'border-neutral-700' : 'border-neutral-100'}`}>
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              (examCourse || '').toLowerCase().includes('رياضيات') || (examCourse || '').toLowerCase().includes('math')
                ? isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                : (examCourse || '').toLowerCase().includes('فيزياء') || (examCourse || '').toLowerCase().includes('physics')
                  ? isDarkMode ? 'bg-primary-dark/30' : 'bg-primary-light/30'
                  : (examCourse || '').toLowerCase().includes('كيمياء') || (examCourse || '').toLowerCase().includes('chemistry')
                    ? isDarkMode ? 'bg-green-900/30' : 'bg-green-100'
                    : isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'
            }`}>
              {getSubjectIcon(examCourse || 'general', 20)}
            </div>
            <div className="ml-3 rtl:mr-3 rtl:ml-0">
              <span className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {examCourse || (isArabic ? 'عام' : 'General')}
              </span>
              <h3 className={`font-bold ${isDarkMode ? 'text-text-light' : 'text-text-dark'}`}>
                {examName}
              </h3>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors}`}>
            {statusLabel}
          </span>
        </div>
        
        <div className="p-4">
          {/* Description */}
          {examDescription && (
            <p className={`text-sm mb-3 ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
              {examDescription}
            </p>
          )}
          
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <Clock size={14} className="mr-1 rtl:ml-1 rtl:mr-0" />
              <span>{formattedDuration}</span>
            </div>
            <div className={`flex items-center text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <Users size={14} className="mr-1 rtl:ml-1 rtl:mr-0" />
              <span>{examQuestionsCount || 0} {isArabic ? 'سؤال' : 'questions'}</span>
            </div>
          </div>
          
          {/* Education Level */}
          {examEducationLevel && (
            <div className="flex items-center mb-3">
              <Award size={14} className={`mr-1 rtl:ml-1 rtl:mr-0 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`} />
              <p className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                {examEducationLevel}
              </p>
            </div>
          )}

          {/* Category */}
          {examCategory && (
            <div className={`text-xs mb-3 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
              {isArabic ? `نوع الاختبار: ${examCategory}` : `Category: ${examCategory}`}
            </div>
          )}

          {/* Attempts and pass percentage info */}
          <div className={`text-xs mb-3 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-500'} space-y-1`}>
            {examAllowedChances && (
              <div>
                {isArabic ? `عدد المحاولات المسموحة: ${examAllowedChances}` : `Allowed attempts: ${examAllowedChances}`}
              </div>
            )}
            {examMinPercentage && (
              <div>
                {isArabic ? `النسبة المطلوبة للنجاح: ${examMinPercentage}%` : `Passing percentage: ${examMinPercentage}%`}
              </div>
            )}
          </div>

          {/* Status description */}
          {examStatusInfo?.description && (
            <div className={`text-xs mb-3 p-2 rounded ${isDarkMode ? 'bg-neutral-900 text-neutral-400' : 'bg-neutral-50 text-neutral-600'}`}>
              {examStatusInfo.description}
            </div>
          )}
          
          <button 
            disabled={!isActionEnabled}
            className={`w-full py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${actionButtonClass}`}
          >
            {statusLabel}
          </button>
        </div>
      </div>
    );
  };

  return (
    <section 
      ref={sectionRef}
      id="exams-section-container"
      className={`py-12 px-4 ${isDarkMode ? 'bg-background-dark' : 'bg-neutral-50'}`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-text-light' : 'text-text-dark'}`}>
            {translations.upcomingExams}
          </h2>
          <Link to="/exams" className={`text-sm font-medium ${isDarkMode ? 'text-primary-light' : 'text-primary-base'} flex items-center hover:underline`}>
            {isArabic ? 'عرض الكل' : 'View All'}
            {isRTL ? (
              <ChevronLeft size={16} className="mr-1" />
            ) : (
              <ChevronRight size={16} className="ml-1" />
            )}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            // Loading state
            [1, 2, 3].map((_, idx) => (
              <div key={idx} className={`rounded-xl overflow-hidden shadow-md ${isDarkMode ? 'bg-neutral-800' : 'bg-background-card-light'}`}>
                <div className="p-4 animate-pulse">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    <div className="ml-3 rtl:mr-3 rtl:ml-0 flex-1">
                      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                    <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                </div>
              </div>
            ))
          ) : error ? (
            // Error state
            <div className="col-span-3 text-center py-10">
              <div className={`${isDarkMode ? 'text-red-400' : 'text-red-600'} text-lg mb-2`}>
                {isArabic ? 'خطأ في تحميل الاختبارات' : 'Error loading exams'}
              </div>
              <div className={`${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'} text-sm`}>
                {error}
              </div>
            </div>
          ) : examData.length > 0 ? (
            // Render exam cards
            examData.map((exam, idx) => renderExamCard(exam, idx)).filter(card => card !== null)
          ) : (
            // No exams state  
            <div className="col-span-3 text-center py-10">
              <div className={`${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'} text-lg mb-4`}>
                {isArabic ? 'لا توجد اختبارات متاحة حالياً' : 'No exams available at the moment'}
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
                {isArabic ? 'لم يتم إرجاع أي امتحانات من الـ API' : 'No exams returned from API'}
              </p>
              {DEBUG && (
                <div className={`mt-4 p-4 text-xs ${isDarkMode ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-100 text-neutral-600'} rounded`}>
                  <p className="font-semibold mb-2">{isArabic ? 'تفاصيل التشخيص:' : 'Debug info:'}</p>
                  <p>Total exams received: {examData.length}</p>
                  <p>Loading state: {loading ? 'true' : 'false'}</p>
                  <p>Error state: {error || 'none'}</p>
                  <p>Exams prop type: {typeof exams}</p>
                  <p>Exams is array: {Array.isArray(exams) ? 'true' : 'false'}</p>
                  {exams && (
                    <details className="mt-2">
                      <summary className="cursor-pointer">Raw exams data</summary>
                      <pre className="mt-2 text-xs overflow-auto max-h-40">
                        {JSON.stringify(exams, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExamsSection;
