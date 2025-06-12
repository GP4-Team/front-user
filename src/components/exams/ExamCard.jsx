// components/exams/ExamCard.jsx
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import ExamStatusBadge from "./ExamStatusBadge";
import { 
  getExamStatusLabel, 
  isExamActionEnabled, 
  getExamActionType,
  formatExamDuration,
  EXAM_STATUS 
} from "../../services/examProgressService";
import { 
  getCardExamTitle, 
  getExamSubtitle 
} from "../../utils/examTitleFormatter";

// Icon components
const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const BookmarkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
);

const BookmarkFilledIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const FileTextIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
    <path d="M17 21h-10a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"></path>
    <line x1="9" y1="9" x2="15" y2="9"></line>
    <line x1="9" y1="13" x2="15" y2="13"></line>
    <line x1="9" y1="17" x2="10" y2="17"></line>
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const ExamCard = ({ exam, index, toggleFavorite, handleSelectExam, favoriteExams, translations, isOnlineExam = false }) => {
  const { isDarkMode } = useTheme();
  const { isRTL, language } = useLanguage();
  
  const isFavorite = favoriteExams?.includes(exam.id) || false;
  
  // استخدام البيانات مباشرة من API الجديد
  const examData = {
    id: exam.id,
    title: exam.name,
    subject: exam.course?.name,
    status: exam.status, // pending, active, ended
    availabilityStatus: exam.availability_status, // متاح، منتهي، etc
    actionButton: exam.action_button, // عرض النتائج، بدء الامتحان، etc
    canTakeExam: exam.can_take_exam,
    duration: exam.duration_formatted,
    numberOfQuestions: exam.question_number,
    category: exam.exam_category?.name,
    description: exam.description,
    minPercentage: exam.min_percentage,
    allowedChances: exam.allowed_chances,
    educationLevel: exam.education_level?.name,
    timeRemaining: exam.time_remaining,
    startAt: exam.start_at,
    endAt: exam.end_at,
    courseCode: exam.course?.code
  };
  
  // استخدام المُنسق الجديد للأسماء
  const formattedTitle = getCardExamTitle(examData.title, language);
  const examSubtitle = getExamSubtitle(examData.title, language);
  
  // تحديد لون الهيدر بناءً على المادة
  const headerColor = examData.subject === "الجبر الأساسي"
    ? isDarkMode ? "bg-blue-700" : "bg-[#3949AB]"
    : examData.subject === "الأدب العربي"
    ? isDarkMode ? "bg-green-700" : "bg-[#4CAF50]"
    : examData.subject === "أساسيات التشريح"
    ? isDarkMode ? "bg-purple-700" : "bg-[#9C27B0]"
    : isDarkMode ? "bg-indigo-700" : "bg-[#7986CB]";

  // استخدام بيانات الحالة من API مباشرة
  const actionText = examData.actionButton || (
    examData.canTakeExam 
      ? (language === 'ar' ? 'بدء الامتحان' : 'Start Exam')
      : (language === 'ar' ? 'غير متاح' : 'Not Available')
  );
  
  const isActionEnabled = examData.canTakeExam;
  
  // استخدام المدة مباشرة من API
  const formattedDuration = examData.duration;

  return (
    <div
      key={examData.id}
      className={`rounded-lg shadow-md overflow-hidden ${
        isDarkMode
          ? "bg-neutral-800 text-text-light"
          : "bg-white text-[#37474F]"
      } mb-4 
        transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl
        ${index % 2 === 0 ? "animate-float-slow" : "animate-float"}`}
      onClick={() => handleSelectExam(examData)}
    >
      {/* Header strip with gradient */}
      <div
        className={`h-1.5 ${headerColor} bg-gradient-to-r from-opacity-50 to-opacity-100`}
      ></div>

      <div className={`relative p-4 ${isRTL ? "text-right" : "text-left"}`}>
        {/* Subject badge */}
        <div
          className={`absolute ${isRTL ? "right-4" : "left-4"} top-4 px-2 py-1 rounded-md text-xs font-medium text-white ${headerColor} 
          transition-all duration-500 hover:shadow-lg hover:scale-105`}
        >
          {examData.subject || examData.courseName}
        </div>

        {/* Bookmark icon */}
        <div className={`absolute ${isRTL ? "left-4" : "right-4"} top-4`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite && toggleFavorite(examData.id);
            }}
            className={`${
              isDarkMode
                ? "text-gray-500 hover:text-[#FFC107]"
                : "text-gray-400 hover:text-[#FFC107]"
            } 
              transition-colors duration-200 transform hover:scale-110 hover:rotate-12`}
          >
            {isFavorite ? (
              <BookmarkFilledIcon className="w-5 h-5 text-[#FFC107]" />
            ) : (
              <BookmarkIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Exam title */}
        <h3
          className={`mt-8 mb-2 text-xl font-bold ${
            isDarkMode ? "text-text-light" : "text-[#37474F]"
          } ${isRTL ? "text-right" : "text-left"}`}
        >
          {formattedTitle || examData.title || exam.name || 'اسم الامتحان غير متوفر'}
        </h3>
        
        {/* Exam subtitle - نوع الامتحان */}
        {examSubtitle && (
          <p className={`text-sm mb-3 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          } ${isRTL ? "text-right" : "text-left"}`}>
            {examSubtitle}
          </p>
        )}
        
        {/* Status badge - استخدام حالة الامتحان من API */}
        <div className="inline-block px-3 py-1 rounded-full text-sm mb-3 transition-all duration-300 hover:scale-105">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            examData.status === 'ended' 
              ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              : examData.status === 'active'
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              : examData.status === 'pending'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
          }`}>
            {examData.availabilityStatus}
          </span>
        </div>

        {/* Exam details - duration and questions */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className={`flex items-center ${isRTL ? "justify-end" : "justify-start"}`}>
            <ClockIcon
              className={`${
                isDarkMode ? "text-primary-light" : "text-[#3949AB]"
              } ${isRTL ? "" : "mr-2"}`}
            />
            <div
              className={`${
                isDarkMode ? "text-primary-light" : "text-[#3949AB]"
              } ${isRTL ? "ml-2" : ""}`}
            >
              <p className={`text-sm ${isRTL ? "text-right" : "text-left"}`}>
                {formattedDuration}
              </p>
              {examData.minPercentage && (
                <p className={`text-xs ${isRTL ? "text-right" : "text-left"}`}>
                  {language === 'ar' ? 'نسبة النجاح:' : 'Pass:'} {examData.minPercentage}%
                </p>
              )}
            </div>
          </div>

          <div className={`flex items-center ${isRTL ? "justify-end" : "justify-start"}`}>
            <FileTextIcon
              className={`${
                isDarkMode ? "text-primary-light" : "text-[#3949AB]"
              } ${isRTL ? "" : "mr-2"}`}
            />
            <div
              className={`${
                isDarkMode ? "text-primary-light" : "text-[#3949AB]"
              } ${isRTL ? "ml-2" : ""}`}
            >
              <p className={`text-xs ${isRTL ? "text-right" : "text-left"}`}>
                {examData.numberOfQuestions || 0} {translations?.questions || (language === 'ar' ? 'أسئلة' : 'questions')}
              </p>
              {examData.allowedChances && (
                <p className={`text-xs ${isRTL ? "text-right" : "text-left"}`}>
                  {language === 'ar' ? 'المحاولات:' : 'Attempts:'} {examData.allowedChances}
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* معلومات إضافية من API */}
        {examData.timeRemaining && examData.timeRemaining !== 'Exam ended' && (
          <div className={`text-center mb-3 p-2 rounded ${
            isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'
          }`}>
            <p className={`text-sm font-medium ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              {language === 'ar' ? 'الوقت المتبقي:' : 'Time Remaining:'} {examData.timeRemaining}
            </p>
          </div>
        )}

        {/* Action button */}
        <div className="text-center mt-4">
          <button
            disabled={!isActionEnabled}
            className={`${
              isActionEnabled
                ? isDarkMode
                  ? "bg-primary-dark hover:bg-primary-base"
                  : "bg-[#3949AB] hover:bg-[#1A237E]"
                : "bg-gray-400 cursor-not-allowed"
            } 
              text-white px-6 py-2 rounded-md inline-flex items-center transition-all duration-300
              hover:shadow-lg transform ${
                isActionEnabled ? "hover:scale-105" : ""
              }`}
          >
            {isRTL ? (
              <>
                <span className="mx-2">
                  {actionText}
                </span>
                <ArrowLeftIcon />
              </>
            ) : (
              <>
                <ChevronRightIcon className="mr-2" />
                <span>
                  {actionText}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamCard;
