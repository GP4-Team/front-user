// components/exams/ExamStatusBadge.jsx
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { getExamStatusLabel, getExamStatusColors, EXAM_STATUS } from "../../services/examProgressService";

export const ExamStatusBadge = ({ status, className = "" }) => {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();

  // Get status text and colors
  const statusText = getExamStatusLabel(status, language);
  const statusColors = getExamStatusColors(status, isDarkMode);

  // Status icons
  const getStatusIcon = (status) => {
    switch (status) {
      case EXAM_STATUS.START:
        return (
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 rtl:mr-0 rtl:ml-2 animate-pulse"></span>
        );
      case EXAM_STATUS.CONTINUE:
        return (
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 rtl:mr-0 rtl:ml-2 animate-pulse"></span>
        );
      case EXAM_STATUS.REVISION:
        return (
          <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 rtl:mr-0 rtl:ml-2"></span>
        );
      case EXAM_STATUS.RETRY:
        return (
          <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 rtl:mr-0 rtl:ml-2"></span>
        );
      case EXAM_STATUS.UNAVAILABLE:
        return (
          <span className="w-2 h-2 bg-gray-500 rounded-full mr-2 rtl:mr-0 rtl:ml-2"></span>
        );
      default:
        return null;
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200 ${statusColors} ${className}`}
    >
      {getStatusIcon(status)}
      {statusText}
    </span>
  );
};

// Legacy component for backward compatibility
export const LegacyExamStatusBadge = ({ status }) => {
  const { isDarkMode } = useTheme();

  let badgeColor = "";
  let statusText = "";

  switch (status) {
    case "available":
      badgeColor = isDarkMode
        ? "bg-green-800 text-green-200"
        : "bg-green-100 text-green-800";
      statusText = "متاح";
      break;
    case "in-progress":
      badgeColor = isDarkMode
        ? "bg-primary-light text-neutral-white"
        : "bg-primary-light bg-opacity-20 text-primary-base";
      statusText = "جاري";
      break;
    case "finished":
      badgeColor = isDarkMode
        ? "bg-accent text-neutral-dark"
        : "bg-accent bg-opacity-20 text-neutral-dark";
      statusText = "منتهي";
      break;
    default:
      badgeColor = isDarkMode
        ? "bg-neutral-light text-neutral-white"
        : "bg-neutral-light text-neutral-dark";
      statusText = "غير معروف";
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badgeColor}`}
    >
      {status === "available" && (
        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
      )}
      {status === "in-progress" && (
        <span className="w-2 h-2 bg-primary-light rounded-full mr-2"></span>
      )}
      {status === "finished" && (
        <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
      )}
      {statusText}
    </span>
  );
};

export default ExamStatusBadge;
