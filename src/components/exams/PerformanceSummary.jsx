// components/exams/PerformanceSummary.jsx
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";

const ChevronDownIcon = () => (
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
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const PerformanceSummary = ({ examStats, statsVisible, setStatsVisible, statsLoading, statsError, translations }) => {
  const { isDarkMode } = useTheme();
  const { isRTL } = useLanguage();
  
  // Default translations if not provided
  const t = translations || {
    performanceSummary: "ملخص الأداء",
    totalExams: "إجمالي الامتحانات",
    completedExams: "الامتحانات المكتملة",
    pendingExams: "امتحانات معلقة",
    averageResults: "متوسط النتائج",
    highestScore: "أعلى نتيجة"
  };

  // Determine color for average score (green if >=70%, red otherwise)
  const getScoreColor = (score) => {
    if (score >= 70) {
      return isDarkMode ? "text-green-400" : "text-green-500";
    } else {
      return isDarkMode ? "text-red-400" : "text-red-500";
    }
  };
  
  return (
    <div
      className={`${
        isDarkMode ? "bg-neutral-800 border-neutral-700" : "bg-white"
      } rounded-lg shadow-md mb-6 overflow-hidden transform transition-all duration-300 hover:shadow-lg performance-summary`}
    >
      <div
        className={`flex ${isRTL ? "flex-row-reverse" : "flex-row"} justify-between items-center p-4 border-b ${
          isDarkMode ? "border-neutral-700" : "border-gray-200"
        }`}
        onClick={() => setStatsVisible(!statsVisible)}
        role="button"
        aria-expanded={statsVisible}
        aria-controls="stats-content"
      >
        <h2
          className={`text-lg font-bold ${
            isDarkMode ? "text-text-light" : "text-[#37474F]"
          } ${isRTL ? "text-right mr-0" : "text-left ml-0"}`}
        >
          {t.performanceSummary}
        </h2>
        
        <button
          className={`${
            isDarkMode ? "text-primary-light" : "text-[#3949AB]"
          } transition-transform duration-300 ${
            statsVisible ? "rotate-180" : ""
          }`}
        >
          <ChevronDownIcon />
        </button>
      </div>

      <div
        id="stats-content"
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          statsVisible ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6">
          {/* Loading State */}
          {statsLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-base mr-3"></div>
              <span className={isDarkMode ? "text-neutral-300" : "text-neutral-600"}>
                {t.loadingStats || "Loading statistics..."}
              </span>
            </div>
          )}

          {/* Error State */}
          {statsError && !statsLoading && (
            <div className={`p-4 rounded-lg border ${
              isDarkMode ? "bg-red-900/20 border-red-800 text-red-300" : "bg-red-50 border-red-200 text-red-700"
            }`}>
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">
                  {t.statsError || "Error loading statistics"}
                </span>
              </div>
              <p className="text-sm opacity-75">
                {statsError.includes('student_course_enrollments') 
                  ? (t.fallbackMessage || "Using fallback calculation from available exam data")
                  : statsError
                }
              </p>
            </div>
          )}

          {/* Stats Grid - Show when not loading */}
          {!statsLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {/* Total Exams */}
            <div className="p-4 transform transition-all duration-500 hover:scale-105">
              <div
                className={`text-4xl font-bold ${
                  isDarkMode ? "text-text-light" : "text-[#37474F]"
                }`}
              >
                {examStats.totalExams}
              </div>
              <div
                className={`text-sm ${
                  isDarkMode ? "text-primary-light" : "text-[#3949AB]"
                } ${isRTL ? "text-right" : "text-left"}`}
              >
                {t.totalExams}
              </div>
            </div>

            {/* Completed Exams */}
            <div className="p-4 transform transition-all duration-500 hover:scale-105">
              <div
                className={`text-4xl font-bold ${
                  isDarkMode ? "text-text-light" : "text-[#37474F]"
                }`}
              >
                {examStats.completedExams}
              </div>
              <div
                className={`text-sm ${
                  isDarkMode ? "text-primary-light" : "text-[#3949AB]"
                } ${isRTL ? "text-right" : "text-left"}`}
              >
                {t.completedExams}
              </div>
            </div>

            {/* Pending Exams */}
            <div className="p-4 transform transition-all duration-500 hover:scale-105">
              <div
                className={`text-4xl font-bold ${
                  isDarkMode ? "text-text-light" : "text-[#37474F]"
                }`}
              >
                {examStats.pendingExams}
              </div>
              <div
                className={`text-sm ${
                  isDarkMode ? "text-primary-light" : "text-[#3949AB]"
                } ${isRTL ? "text-right" : "text-left"}`}
              >
                {t.pendingExams}
              </div>
            </div>

            {/* Average Score */}
            <div className="p-4 transform transition-all duration-500 hover:scale-105">
              <div
                className={`text-4xl font-bold ${getScoreColor(examStats.averageScore)}`}
              >
                {examStats.averageScore}%
              </div>
              <div
                className={`text-sm ${
                  isDarkMode ? "text-primary-light" : "text-[#3949AB]"
                } ${isRTL ? "text-right" : "text-left"}`}
              >
                {t.averageResults}
              </div>
            </div>

            {/* Highest Score */}
            <div className="p-4 transform transition-all duration-500 hover:scale-105">
              <div
                className={`text-4xl font-bold ${
                  isDarkMode ? "text-green-400" : "text-green-500"
                }`}
              >
                {examStats.highestScore}%
              </div>
              <div
                className={`text-sm ${
                  isDarkMode ? "text-primary-light" : "text-[#3949AB]"
                } ${isRTL ? "text-right" : "text-left"}`}
              >
                {t.highestScore}
              </div>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceSummary;
