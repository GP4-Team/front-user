// pages/exams/ExamResultsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { findExamById, sampleQuestions } from "../../data/ExamData";
import Navbar from "../../components/navigation/Navbar";
import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
} from "../../components/icons/Icons";

const ExamResultsPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    timeTaken: "00:00",
    score: 0,
  });

  useEffect(() => {
    // Safely fetch exam data
    const fetchExamData = async () => {
      try {
        const foundExam = findExamById(examId);

        if (!foundExam) {
          console.error("Exam not found");
          navigate("/not-found");
          return;
        }

        setExam(foundExam);

        // Safely retrieve answers from localStorage
        let studentAnswers = {};
        try {
          const storedAnswers = localStorage.getItem("examAnswers");
          if (storedAnswers) {
            const parsedAnswers = JSON.parse(storedAnswers);

            // Validate questions have required structure
            const validQuestions = sampleQuestions.filter(
              (q) => q && q.id && q.options && Array.isArray(q.options)
            );

            // Process each valid question
            validQuestions.forEach((question) => {
              const selectedOptionId = parsedAnswers[question.id];
              const correctOption = question.options.find(
                (opt) => opt.isCorrect === true
              );
              const isCorrect =
                selectedOptionId &&
                correctOption &&
                selectedOptionId === correctOption.id;

              studentAnswers[question.id] = {
                selectedOptionId: selectedOptionId || null,
                isCorrect: !!isCorrect,
              };
            });
          }
        } catch (error) {
          console.error("Error retrieving student answers:", error);
          // Fallback to empty answers
          studentAnswers = {};
        }

        // Use valid questions for fallback answers
        if (Object.keys(studentAnswers).length === 0) {
          const validQuestions = sampleQuestions.filter(
            (q) => q && q.id && q.options && Array.isArray(q.options)
          );

          validQuestions.forEach((question) => {
            const correctOption = question.options.find(
              (opt) => opt.isCorrect === true
            );
            const isCorrect = Math.random() > 0.3; // 70% chance of correct answer for demo

            let selectedId = null;
            if (isCorrect && correctOption) {
              selectedId = correctOption.id;
            } else {
              const incorrectOption = question.options.find(
                (opt) => opt.isCorrect !== true
              );
              selectedId = incorrectOption ? incorrectOption.id : null;
            }

            studentAnswers[question.id] = {
              selectedOptionId: selectedId,
              isCorrect: isCorrect && selectedId !== null,
            };
          });
        }

        setAnswers(studentAnswers);

        // Calculate statistics safely
        let correctCount = 0;
        let incorrectCount = 0;
        let unansweredCount = 0;

        Object.values(studentAnswers).forEach((answer) => {
          if (!answer.selectedOptionId) {
            unansweredCount++;
          } else if (answer.isCorrect) {
            correctCount++;
          } else {
            incorrectCount++;
          }
        });

        // Get time taken from localStorage or use fallback
        let timeTakenSeconds = 0;
        try {
          const storedTimeTaken = localStorage.getItem("examTimeTaken");
          timeTakenSeconds = storedTimeTaken ? parseInt(storedTimeTaken) : 0;
        } catch (error) {
          console.error("Error retrieving time taken:", error);
          // Fallback to random time
          timeTakenSeconds =
            Math.floor(Math.random() * (foundExam.duration * 60 - 300)) + 300;
        }

        // Calculate final score
        const totalQuestions = sampleQuestions.length;
        const scorePercentage =
          totalQuestions > 0
            ? Math.round((correctCount / totalQuestions) * 100)
            : 0;

        setStats({
          correct: correctCount,
          incorrect: incorrectCount,
          unanswered: unansweredCount,
          timeTaken: formatTime(timeTakenSeconds),
          score: scorePercentage,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error setting up exam results:", error);
        setLoading(false);
      }
    };

    fetchExamData();
  }, [examId, navigate]);

  const formatTime = (seconds) => {
    try {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      return `${
        hours > 0 ? hours.toString().padStart(2, "0") + ":" : ""
      }${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
    } catch (error) {
      console.error("Error formatting time:", error);
      return "00:00";
    }
  };

  const handleBackToExams = () => {
    navigate("/exams");
  };

  // Filter valid questions
  const validQuestions = sampleQuestions.filter(
    (q) => q && q.id && q.text && q.options && Array.isArray(q.options)
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F4F8]">
      {/* Navbar/Header */}
      <Navbar />
      
      {/* Main content with top margin to account for fixed navbar */}
      <div className="mt-16 flex-grow">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              جاري التحميل...
            </div>
          ) : !exam ? (
            <div className="flex justify-center items-center h-64">
              لم يتم العثور على الامتحان
            </div>
          ) : (
            <>
              <button
                onClick={handleBackToExams}
                className="mb-4 flex items-center text-[#3949AB] hover:text-[#1A237E] transition duration-200"
              >
                <ArrowRightIcon />
                <span className="mr-2">العودة إلى الامتحانات</span>
              </button>

              <div className="rounded-lg shadow-md overflow-hidden bg-white mb-6">
                {/* رأس الصفحة */}
                <div className="px-6 py-5 border-b">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="text-right mb-4 md:mb-0">
                      <h1 className="text-2xl font-bold text-[#37474F]">
                        نتائج الامتحان
                      </h1>
                      <p className="mt-1 text-[#3949AB]">
                        {exam.title} - {exam.subject}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ملخص النتائج */}
                <div className="p-6">
                  {/* النتيجة الإجمالية وشريط التقدم */}
                  <div className="mb-8 p-6 rounded-lg bg-[#F0F4F8]">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                      <div className="text-center md:text-right order-2 md:order-1">
                        <h2 className={`text-3xl font-bold ${
                          stats.score >= 70 ? "text-green-500" : "text-red-500"
                        }`}>
                          {stats.score}%
                        </h2>
                        <p className="text-[#3949AB]">
                          {stats.score >= 70
                            ? "مبروك! لقد اجتزت الامتحان بنجاح"
                            : "للأسف، لم تتجاوز نسبة النجاح المطلوبة"}
                        </p>
                      </div>

                      <div className={`h-28 w-28 rounded-full border-4 flex items-center justify-center mb-4 md:mb-0 order-1 md:order-2 ${
                        stats.score >= 70 ? "border-green-500" : "border-red-500"
                      }`}>
                        {stats.score >= 70 ? (
                          <CheckCircleIcon className="w-12 h-12 text-green-500" />
                        ) : (
                          <XCircleIcon className="w-12 h-12 text-red-500" />
                        )}
                      </div>
                    </div>

                    {/* معلومات إضافية */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-right">
                      <div className="p-3 rounded-md bg-[#7986CB] bg-opacity-30">
                        <div className="text-sm font-medium text-white mb-1">
                          الوقت المستغرق
                        </div>
                        <div className="flex items-center justify-center md:justify-end">
                          <ClockIcon className="ml-1" />
                          <span className="text-lg font-bold text-white">
                            {stats.timeTaken}
                          </span>
                        </div>
                      </div>

                      <div className="p-3 rounded-md bg-green-500 bg-opacity-30">
                        <div className="text-sm font-medium text-white mb-1">
                          الإجابات الصحيحة
                        </div>
                        <div className="flex items-center justify-center md:justify-end">
                          <CheckCircleIcon className="ml-1 text-green-500" />
                          <span className="text-lg font-bold text-white">
                            {stats.correct} / {validQuestions.length}
                          </span>
                        </div>
                      </div>

                      <div className="p-3 rounded-md bg-red-500 bg-opacity-30">
                        <div className="text-sm font-medium text-white mb-1">
                          الإجابات الخاطئة
                        </div>
                        <div className="flex items-center justify-center md:justify-end">
                          <XCircleIcon className="ml-1 text-red-500" />
                          <span className="text-lg font-bold text-white">
                            {stats.incorrect} / {validQuestions.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* قائمة الأسئلة مع الإجابات الصحيحة والخاطئة */}
                  <h3 className="text-xl font-bold mb-4 text-right text-[#37474F]">
                    تفاصيل الإجابات
                  </h3>

                  <div className="space-y-6">
                    {validQuestions.map((question, index) => {
                      const answer = answers[question.id] || {
                        selectedOptionId: null,
                        isCorrect: false,
                      };

                      // Safely find selected option
                      let selectedOption = null;
                      if (answer.selectedOptionId) {
                        selectedOption = question.options.find(
                          (opt) => opt.id === answer.selectedOptionId
                        );
                      }

                      // Safely find correct option
                      const correctOption = question.options.find(
                        (opt) => opt.isCorrect === true
                      );

                      return (
                        <div
                          key={question.id}
                          className={`p-4 rounded-lg border-r-4 ${
                            !answer.selectedOptionId
                              ? "border-gray-400 bg-gray-100"
                              : answer.isCorrect
                              ? "border-green-500 bg-green-50"
                              : "border-red-500 bg-red-50"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                              !answer.selectedOptionId
                                ? "bg-gray-300"
                                : answer.isCorrect
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}>
                              {!answer.selectedOptionId ? (
                                <span className="text-white text-sm">؟</span>
                              ) : answer.isCorrect ? (
                                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                              ) : (
                                <XCircleIcon className="w-5 h-5 text-red-600" />
                              )}
                            </div>

                            <div className="text-right text-[#37474F] w-full mr-2">
                              <div className="font-medium text-lg mb-1">
                                السؤال {index + 1}
                              </div>
                              <div>{question.text}</div>
                            </div>
                          </div>

                          <div className="mr-10">
                            {/* إجابتك */}
                            <div className="mb-2">
                              <div className={`text-sm font-medium mb-1 ${
                                !answer.selectedOptionId
                                  ? "text-gray-500"
                                  : answer.isCorrect
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}>
                                {!answer.selectedOptionId
                                  ? "لم تتم الإجابة"
                                  : "إجابتك:"}
                              </div>
                              {selectedOption && (
                                <div className={`p-2 rounded-md ${
                                  answer.isCorrect
                                    ? "bg-green-100"
                                    : "bg-red-100"
                                } text-right`}>
                                  {selectedOption.text}
                                </div>
                              )}
                            </div>

                            {/* الإجابة الصحيحة - تظهر فقط إذا كانت إجابتك خاطئة */}
                            {selectedOption && !answer.isCorrect && correctOption && (
                              <div>
                                <div className="text-sm font-medium mb-1 text-green-600">
                                  الإجابة الصحيحة:
                                </div>
                                <div className="p-2 rounded-md bg-green-100 text-right">
                                  {correctOption.text}
                                </div>
                              </div>
                            )}

                            {/* شرح الإجابة - إذا كان متوفراً */}
                            {question.explanation && (
                              <div className="mt-2">
                                <div className="text-sm font-medium mb-1 text-[#3949AB]">
                                  التوضيح:
                                </div>
                                <div className="p-2 rounded-md bg-[#F0F4F8] text-right">
                                  {question.explanation}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* أزرار الإجراءات */}
                  <div className="mt-8 flex justify-center space-x-4 space-x-reverse">
                    <button
                      onClick={handleBackToExams}
                      className="bg-[#3949AB] hover:bg-[#1A237E] text-white px-6 py-3 rounded-md transition duration-200 flex items-center"
                    >
                      <span className="ml-2">العودة إلى الامتحانات</span>
                      <ArrowRightIcon />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* تم إزالة الفوتر بالكامل */}
    </div>
  );
};

export default ExamResultsPage;