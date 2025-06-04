// components/exams/ExamCard.jsx
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";

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

const ExamCard = ({ exam, index, toggleFavorite, handleSelectExam, favoriteExams, translations }) => {
  const { isDarkMode } = useTheme();
  const { isRTL, language } = useLanguage();
  
  const isFavorite = favoriteExams.includes(exam.id);
  
  // Determine header color based on subject
  const headerColor =
    exam.subject === (isRTL ? "قواعد البيانات" : "Database")
      ? isDarkMode
        ? "bg-blue-700"
        : "bg-[#3949AB]"
      : exam.subject === (isRTL ? "أساسيات و مفاهيم في التيار الكهربي" : "Basics & Concepts in Electric Current")
      ? isDarkMode
        ? "bg-yellow-700"
        : "bg-[#FFC107]"
      : isDarkMode
      ? "bg-indigo-700"
      : "bg-[#7986CB]";

  // Status text and color
  const statusText =
    exam.status === "available"
      ? translations.statusAvailable
      : exam.status === "in-progress"
      ? translations.statusInProgress
      : translations.statusCompleted;

  const statusColor =
    exam.status === "available"
      ? isDarkMode
        ? "bg-green-900/50 text-green-400"
        : "bg-green-100 text-green-800"
      : exam.status === "in-progress"
      ? isDarkMode
        ? "bg-blue-900/50 text-blue-400"
        : "bg-blue-100 text-blue-800"
      : isDarkMode
      ? "bg-gray-800/50 text-gray-400"
      : "bg-gray-100 text-gray-800";

  return (
    <div
      key={exam.id}
      className={`rounded-lg shadow-md overflow-hidden ${
        isDarkMode
          ? "bg-neutral-800 text-text-light"
          : "bg-white text-[#37474F]"
      } mb-4 
        transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl
        ${index % 2 === 0 ? "animate-float-slow" : "animate-float"}`}
      onClick={() => handleSelectExam(exam)}
    >
      {/* Purple background header strip with gradient */}
      <div
        className={`h-1.5 ${headerColor} bg-gradient-to-r from-opacity-50 to-opacity-100`}
      ></div>

      <div className={`relative p-4 ${isRTL ? "text-right" : "text-left"}`}>
        {/* Subject badge with animation */}
        <div
          className={`absolute ${isRTL ? "right-4" : "left-4"} top-4 px-2 py-1 rounded-md text-xs font-medium text-white ${headerColor} 
          transition-all duration-500 hover:shadow-lg hover:scale-105`}
        >
          {exam.subject}
        </div>

        {/* Bookmark icon */}
        <div className={`absolute ${isRTL ? "left-4" : "right-4"} top-4`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(exam.id);
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
          className={`mt-8 mb-3 text-xl font-bold ${
            isDarkMode ? "text-text-light" : "text-[#37474F]"
          } ${isRTL ? "text-right" : "text-left"}`}
        >
          {exam.title}
        </h3>

        {/* Status badge */}
        <div
          className={`inline-block px-2 py-1 rounded-full text-xs ${statusColor} mb-3 transition-all duration-300 hover:scale-105`}
        >
          {statusText}
        </div>

        {/* Exam details - date/time and duration/questions */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className={`flex items-center ${isRTL ? "justify-end" : "justify-start"}`}>
            <CalendarIcon
              className={`${
                isDarkMode ? "text-primary-light" : "text-[#3949AB]"
              } ${isRTL ? "" : "mr-2"}`}
            />
            <div
              className={`${
                isDarkMode ? "text-primary-light" : "text-[#3949AB]"
              } ${isRTL ? "ml-2" : ""}`}
            >
              <p className={`text-sm ${isRTL ? "text-right" : "text-left"}`}>{exam.date}</p>
              <p className={`text-sm ${isRTL ? "text-right" : "text-left"}`}>{exam.time}</p>
            </div>
          </div>

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
              <p className={`text-xs ${isRTL ? "text-right" : "text-left"}`}>
                {exam.duration} {translations.minutes}
              </p>
              <p className={`text-xs ${isRTL ? "text-right" : "text-left"}`}>
                {exam.numberOfQuestions} {translations.questions}
              </p>
            </div>
          </div>
        </div>

        {/* Exam button */}
        <div className="text-center mt-4">
          <button
            className={`${
              isDarkMode
                ? "bg-primary-dark hover:bg-primary-base"
                : "bg-[#3949AB] hover:bg-[#1A237E]"
            } 
              text-white px-6 py-2 rounded-md inline-flex items-center transition-all duration-300
              hover:shadow-lg transform hover:scale-105`}
          >
            {isRTL ? (
              <>
                <span className="mx-2">
                  {exam.status === "finished" ? translations.viewDetails : translations.openExam}
                </span>
                <ArrowLeftIcon />
              </>
            ) : (
              <>
                <ChevronRightIcon className="mr-2" />
                <span>
                  {exam.status === "finished" ? translations.viewDetails : translations.openExam}
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
