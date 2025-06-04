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

const PerformanceSummary = ({ examStats, statsVisible, setStatsVisible, translations }) => {
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
        </div>
      </div>
    </div>
  );
};

export default PerformanceSummary;
