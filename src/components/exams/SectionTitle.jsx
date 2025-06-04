// components/exams/SectionTitle.jsx
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";

const SectionTitle = ({ title, count }) => {
  const { isDarkMode } = useTheme();
  const { isRTL } = useLanguage();

  return (
    <div className={`flex items-center ${isRTL ? "justify-end" : "justify-between"} mb-4`}>
      <h2
        className={`text-xl font-bold ${
          isDarkMode ? "text-text-light" : "text-[#37474F]"
        } section-title ${isRTL ? "text-right order-1 ml-3" : "text-left order-0 mr-3"}`}
      >
        {title}
      </h2>
      
      <span
        className={`${
          isDarkMode ? "bg-primary-dark" : "bg-[#4C1C95]"
        } text-white text-sm px-2 py-1 rounded-full ${isRTL ? "order-0" : "order-1"}`}
      >
        {count}
      </span>
    </div>
  );
};

export default SectionTitle;
