// components/exams/ExamStatusBadge.jsx
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

export const ExamStatusBadge = ({ status }) => {
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
