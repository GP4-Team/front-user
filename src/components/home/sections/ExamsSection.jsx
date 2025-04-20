import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useTheme } from "../../../contexts/ThemeContext";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";

const ExamsSection = ({ UI, getText, TOP_EXAMS, getSubjectIcon }) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const isArabic = language === "ar";

  return (
    <section className={`py-16 px-4 ${isDarkMode ? 'bg-[#121212]' : 'bg-gray-50'} relative overflow-hidden`}>
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary-light/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/5 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <span className={`text-sm rounded-md px-3 py-1 font-semibold inline-block mb-2 w-fit ${isDarkMode ? 'bg-accent/20 text-accent' : 'bg-accent/20 text-accent/80'}`}>
              {isArabic ? "الاختبارات" : "Exams"}
            </span>
            <h2 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-text-dark'}`}>
              {getText(UI.upcomingExams)}
            </h2>
          </div>
          
          <Link to="/exams" className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-primary-base'} flex items-center hover:underline`}>
            {isArabic ? 'عرض الكل' : 'View All'}
            {isRTL ? (
              <ChevronLeft size={16} className="mr-1" />
            ) : (
              <ChevronRight size={16} className="ml-1" />
            )}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOP_EXAMS.map((exam, idx) => {
            // Determine status styling
            let statusColor = '';
            let statusBg = '';
            let buttonClasses = '';
            
            if (exam.status === 'upcoming') {
              statusColor = isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700';
              buttonClasses = 'bg-primary-base hover:bg-primary-dark text-white';
            } else if (exam.status === 'active') {
              statusColor = isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700';
              buttonClasses = 'bg-accent hover:bg-accent/90 text-[#37474F]';
            } else {
              statusColor = isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-700';
              buttonClasses = isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
            }
            
            return (
              <div 
                key={idx} 
                className={`rounded-xl overflow-hidden shadow-md transition-all hover:-translate-y-2 hover:shadow-xl ${isDarkMode ? 'bg-[#2D2D2D]' : 'bg-white'}`}
              >
                <div className={`p-5 flex items-start justify-between border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      getText(exam.subject).includes('Physics') || getText(exam.subject).includes('فيزياء')
                        ? isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                        : getText(exam.subject).includes('Chemistry') || getText(exam.subject).includes('كيمياء')
                          ? isDarkMode ? 'bg-green-900/30' : 'bg-green-100'
                          : isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'
                    }`}>
                      {getSubjectIcon(getText(exam.subject), 24)}
                    </div>
                    <div className="ml-3">
                      <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {getText(exam.subject)}
                      </span>
                      <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-text-dark'}`}>
                        {getText(exam.title)}
                      </h3>
                    </div>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${statusColor} self-start ml-2`}>
                    {getText(exam.date)}
                  </span>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center justify-between mb-5">
                    <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Clock size={16} className="mr-2" />
                      <span>{getText(exam.duration)}</span>
                    </div>
                    <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 mr-2">
                        <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-1.12-2.5-2.5-2.5S6 10.62 6 12c0 .76.34 1.42.87 1.88L7 22l4-3 4 3 .13-8.12c.53-.46.87-1.12.87-1.88 0-1.38-1.12-2.5-2.5-2.5S11 10.62 11 12a2.5 2.5 0 002.5 2.5"></path>
                        <path d="M7 6h10M7 9h10"></path>
                      </svg>
                      <span>{exam.questionsCount} {isArabic ? 'سؤال' : 'questions'}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className={`px-3 py-1.5 rounded-md text-sm inline-block ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      {getText(exam.level)}
                    </div>
                  </div>
                  
                  <button className={`w-full py-2.5 text-sm font-medium rounded-lg transition-all ${buttonClasses} hover:-translate-y-0.5 shadow-sm hover:shadow-md`}>
                    {exam.status === 'upcoming'
                      ? getText(UI.registerForExam)
                      : exam.status === 'active'
                        ? getText(UI.startExam)
                        : getText(UI.viewResults)
                    }
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExamsSection;
