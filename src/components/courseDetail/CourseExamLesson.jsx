// src/components/courseDetail/CourseExamLesson.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { Clock, Check, X, Edit, BarChart2 } from "lucide-react";

const CourseExamLesson = ({ lesson }) => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  
  const [showConfirmStart, setShowConfirmStart] = useState(false);

  // Color scheme based on the color palette
  const colors = {
    primaryDark: '#1A237F',
    primaryBase: '#3949AB',
    primaryLight: '#7986CB',
    purple: '#6B3DD2',     // Purple color for buttons
    accent: '#FFC107',
    textDark: '#37474F',
    bgLight: '#ECEFF1',
    white: '#FFFFFF',
  };

  // Helper function to get text based on language
  const getText = (obj) => {
    if (!obj) return "";
    return obj[language] || obj.en || "";
  };

  // اضافة محاكاة لنتائج الامتحانات السابقة
  const previousAttempts = [
    {
      id: 1,
      date: "2025-03-15",
      score: 75,
      passed: true,
      totalQuestions: lesson.questions || 10,
      correctAnswers: 7,
      duration: "8:22",
    },
    {
      id: 2,
      date: "2025-03-10",
      score: 30,
      passed: false,
      totalQuestions: lesson.questions || 10,
      correctAnswers: 3,
      duration: "5:45",
    }
  ];

  return (
    <div className="p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">{getText(lesson.title)}</h2>
        
        {lesson.status === "locked" ? (
          // Exam is locked
          <div className="relative mx-auto max-w-3xl">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
              <div className="flex flex-col items-center">
                <div className="mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-32 h-32" style={{ color: colors.purple }}>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <path d="M12 11h4"></path>
                    <path d="M12 16h4"></path>
                    <path d="M8 11h.01"></path>
                    <path d="M8 16h.01"></path>
                  </svg>
                </div>
                
                <h3 className="text-xl font-medium mb-6">{language === "ar" ? "هذا الامتحان غير متاح في الوقت الحالي" : "This exam is not available at the moment"}</h3>
                
                <div className="flex flex-wrap justify-center gap-6 mb-6">
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{language === "ar" ? "مدة الامتحان" : "Exam Duration"}</span>
                    <div className="flex items-center mt-1">
                      <Clock size={16} className="text-gray-500 dark:text-gray-400 mr-1" />
                      <span className="font-medium">{getText(lesson.duration)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{language === "ar" ? "عدد الأسئلة" : "Questions Count"}</span>
                    <div className="flex items-center mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-1">
                        <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-1.12-2.5-2.5-2.5S6 10.62 6 12c0 .76.34 1.42.87 1.88L7 22l4-3 4 3 .13-8.12c.53-.46.87-1.12.87-1.88 0-1.38-1.12-2.5-2.5-2.5S11 10.62 11 12a2.5 2.5 0 002.5 2.5"></path>
                        <path d="M7 6h10M7 9h10"></path>
                      </svg>
                      <span className="font-medium">{lesson.questions}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{language === "ar" ? "النسبة المطلوبة" : "Required Score"}</span>
                    <div className="flex items-center mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-1">
                        <path d="M12 22V8"></path>
                        <path d="M5 12H2a10 10 0 0020 0h-3"></path>
                        <path d="M8 5.2A10 10 0 0116 5.2"></path>
                        <path d="M10 2h4"></path>
                      </svg>
                      <span className="font-medium">{`${lesson.passingScore}%`}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{language === "ar" ? "المحاولات المتبقية" : "Remaining Attempts"}</span>
                    <div className="flex items-center mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-1">
                        <path d="M12 2v20M2 12h20"></path>
                      </svg>
                      <span className="font-medium">{language === "ar" ? "غير محدود" : "Unlimited"}</span>
                    </div>
                  </div>
                </div>
                
                <button className="bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 font-medium py-2 px-8 rounded-md cursor-not-allowed">
                  {language === "ar" ? "الامتحان غير متاح" : "Exam Unavailable"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Exam is available
          <div className="relative mx-auto max-w-3xl">
            {showConfirmStart ? (
              // Confirmation dialog
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
                  <div className="text-center">
                    <div className="mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto h-12 w-12" style={{ color: colors.purple }}>
                        <path d="M14.5 4h-5L7 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2h-3l-2.5-3z"></path>
                        <circle cx="12" cy="13" r="3"></circle>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      {language === "ar" ? "هل أنت متأكد أنك تريد بدء الامتحان؟" : "Are you sure you want to start the exam?"}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                      {language === "ar" ? "بمجرد البدء، ستحتاج إلى إكمال الامتحان" : "Once you start, you'll need to complete the exam"}
                    </p>
                    <div className="flex justify-center space-x-4 rtl:space-x-reverse">
                      <button
                        onClick={() => setShowConfirmStart(false)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        {language === "ar" ? "إلغاء" : "Cancel"}
                      </button>
                      <Link
                        to={`/exams/${lesson.id}/questions`}
                        className="px-4 py-2 rounded-md text-white hover:bg-opacity-90"
                        style={{ backgroundColor: colors.purple }}
                      >
                        {language === "ar" ? "بدء" : "Start"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
              <div className="flex flex-col items-center">
                <div className="mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-32 h-32" style={{ color: colors.purple }}>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <path d="M12 11h4"></path>
                    <path d="M12 16h4"></path>
                    <path d="M8 11h.01"></path>
                    <path d="M8 16h.01"></path>
                  </svg>
                </div>
                
                <h3 className="text-xl font-medium mb-2">{language === "ar" ? "يجب أن تحصل على نسبة " + lesson.passingScore + "% على الأقل في الامتحان" : "You need to get at least " + lesson.passingScore + "% in the exam"}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">({getText(lesson.title)})</p>
                
                <div className="flex flex-wrap justify-center gap-6 mb-6">
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{language === "ar" ? "مدة الامتحان" : "Exam Duration"}</span>
                    <div className="flex items-center mt-1">
                      <Clock size={16} className="text-gray-500 dark:text-gray-400 mr-1" />
                      <span className="font-medium">{getText(lesson.duration)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{language === "ar" ? "عدد الأسئلة" : "Questions Count"}</span>
                    <div className="flex items-center mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-1">
                        <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-1.12-2.5-2.5-2.5S6 10.62 6 12c0 .76.34 1.42.87 1.88L7 22l4-3 4 3 .13-8.12c.53-.46.87-1.12.87-1.88 0-1.38-1.12-2.5-2.5-2.5S11 10.62 11 12a2.5 2.5 0 002.5 2.5"></path>
                        <path d="M7 6h10M7 9h10"></path>
                      </svg>
                      <span className="font-medium">{lesson.questions}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{language === "ar" ? "النسبة المطلوبة" : "Required Score"}</span>
                    <div className="flex items-center mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-1">
                        <path d="M12 22V8"></path>
                        <path d="M5 12H2a10 10 0 0020 0h-3"></path>
                        <path d="M8 5.2A10 10 0 0116 5.2"></path>
                        <path d="M10 2h4"></path>
                      </svg>
                      <span className="font-medium">{`${lesson.passingScore}%`}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{language === "ar" ? "المحاولات المتبقية" : "Remaining Attempts"}</span>
                    <div className="flex items-center mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-1">
                        <path d="M12 2v20M2 12h20"></path>
                      </svg>
                      <span className="font-medium">{language === "ar" ? "غير محدود" : "Unlimited"}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowConfirmStart(true)}
                  className="text-white font-medium py-2 px-8 rounded-md transition-colors hover:bg-opacity-90"
                  style={{ backgroundColor: colors.purple }}
                >
                  {language === "ar" ? "بدء الامتحان" : "Start Exam"}
                </button>
              </div>
            </div>
            
            {/* Previous Attempts Section */}
            {previousAttempts.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md mt-6">
                <h3 className="text-lg font-medium mb-4">{language === "ar" ? "المحاولات السابقة" : "Previous Attempts"}</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          {language === "ar" ? "التاريخ" : "Date"}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          {language === "ar" ? "الدرجة" : "Score"}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          {language === "ar" ? "الإجابات الصحيحة" : "Correct Answers"}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          {language === "ar" ? "المدة" : "Duration"}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          {language === "ar" ? "الحالة" : "Status"}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          {language === "ar" ? "الإجراءات" : "Actions"}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {previousAttempts.map((attempt) => (
                        <tr key={attempt.id}>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            {attempt.date}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            {attempt.score}%
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            {attempt.correctAnswers}/{attempt.totalQuestions}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            {attempt.duration}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {attempt.passed ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                                <Check size={12} className="mr-1" />
                                {language === "ar" ? "ناجح" : "Passed"}
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                                <X size={12} className="mr-1" />
                                {language === "ar" ? "راسب" : "Failed"}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <button className="hover:text-opacity-90 dark:hover:text-opacity-90" style={{ color: colors.purple }}>
                                <BarChart2 size={16} />
                              </button>
                              <Link 
                                to={`/exams/${lesson.id}/results/${attempt.id}`} 
                                className="hover:text-opacity-90 dark:hover:text-opacity-90"
                                style={{ color: colors.purple }}
                              >
                                {language === "ar" ? "عرض النتائج" : "View Results"}
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseExamLesson;