// components/exams/MotivationalMessage.jsx
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";

const MotivationalMessage = ({ 
  showMotivationalMessage, 
  setShowMotivationalMessage, 
  currentMessage, 
  motivationalMessageRef 
}) => {
  const { isDarkMode } = useTheme();
  const { isRTL } = useLanguage();

  if (!showMotivationalMessage) return null;

  return (
    <div
      ref={motivationalMessageRef}
      className={`fixed top-20 ${
        isRTL ? "right-4" : "left-4"
      } z-50 max-w-md p-4 rounded-lg shadow-lg 
        ${
          isDarkMode
            ? "bg-primary-dark text-white"
            : "bg-gradient-to-r from-primary-light to-primary-base text-white"
        } 
        animate-float`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 text-2xl mr-3">✨</div>
        <div className={isRTL ? "text-right" : "text-left"}>
          <p className="font-bold">{currentMessage}</p>
        </div>
        <button
          onClick={() => setShowMotivationalMessage(false)}
          className="ml-auto pl-3 text-white hover:text-gray-200 transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default MotivationalMessage;
