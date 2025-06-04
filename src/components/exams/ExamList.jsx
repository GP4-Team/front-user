// components/exams/ExamList.jsx
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import ExamCard from "./ExamCard";
import SectionTitle from "./SectionTitle";

const ExamList = ({ 
  title, 
  exams, 
  viewMode, 
  toggleFavorite, 
  handleSelectExam, 
  favoriteExams, 
  translations,
  cardRefs
}) => {
  const { isDarkMode } = useTheme();
  const { isRTL } = useLanguage();

  return (
    <div className="mb-8 animate-fadeIn">
      <SectionTitle title={title} count={exams.length} />
      
      <div
        className={`grid ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        } gap-4`}
      >
        {exams.map((exam, index) => (
          <div key={exam.id} ref={(el) => cardRefs.current[index] = el}>
            <ExamCard
              exam={exam}
              index={index}
              toggleFavorite={toggleFavorite}
              handleSelectExam={handleSelectExam}
              favoriteExams={favoriteExams}
              translations={translations}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamList;
