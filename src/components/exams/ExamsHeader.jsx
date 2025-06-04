// components/exams/ExamsHeader.jsx
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";

const ExamsHeader = ({ title }) => {
  const { isDarkMode } = useTheme();
  const { isRTL } = useLanguage();
  
  return (
    <h1
      className={`text-3xl font-bold mb-6 ${
        isRTL ? "text-right mr-0" : "text-left ml-0"
      } ${
        isDarkMode ? "text-white" : "text-[#4C1C95]"
      }`}
      style={{ 
        marginBottom: '2rem',
        marginTop: '1rem',
      }}
    >
      {title}
    </h1>
  );
};

export default ExamsHeader;
