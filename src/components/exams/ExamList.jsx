// components/exams/ExamList.jsx
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import ExamCard from "./ExamCard";
import SectionTitle from "./SectionTitle";

const ExamList = ({ 
  title, 
  exams = [], // Default to empty array
  viewMode, 
  toggleFavorite, 
  handleSelectExam, 
  favoriteExams, 
  translations,
  cardRefs,
  isOnlineExam = false
}) => {
  const { isDarkMode } = useTheme();
  const { isRTL, language } = useLanguage();
  
  // Ensure exams is always an array
  const examsList = Array.isArray(exams) ? exams : [];

  // Show empty state if no exams
  if (examsList.length === 0) {
    return (
      <div className="mb-8 animate-fadeIn">
        <SectionTitle title={title} count={0} />
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'ar' ? 'لا توجد امتحانات' : 'No exams available'}
          </h3>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {language === 'ar' 
              ? 'سيتم عرض الامتحانات هنا عندما تكون متاحة' 
              : 'Exams will appear here when available'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 animate-fadeIn">
      <SectionTitle title={title} count={examsList.length} />
      
      <div
        className={`grid ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        } gap-4`}
      >
        {examsList.map((exam, index) => (
          <div key={exam.id || index} ref={(el) => cardRefs.current[index] = el}>
            <ExamCard
              exam={exam}
              index={index}
              toggleFavorite={toggleFavorite}
              handleSelectExam={handleSelectExam}
              favoriteExams={favoriteExams}
              translations={translations}
              isOnlineExam={isOnlineExam}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamList;
