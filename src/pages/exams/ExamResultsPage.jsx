// pages/exams/ExamResultsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { findExamById, sampleQuestions } from "../../data/ExamData";
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        جاري التحميل...
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="flex justify-center items-center h-64">
        لم يتم العثور على الامتحان
      </div>
    );
  }

  // Filter valid questions
  const validQuestions = sampleQuestions.filter(
    (q) => q && q.id && q.text && q.options && Array.isArray(q.options)
  );

  return (
    <div className="max-w-3xl mx-auto mt-6 pb-12">
      <button
        onClick={handleBackToExams}
        className={`mb-4 flex items-center ${
          isDarkMode
            ? "text-primary-light hover:text-neutral-white"
            : "text-primary-base hover:text-primary-dark"
        } transition duration-200`}
      >
        <ArrowRightIcon />
        <span className="mr-2">العودة إلى الامتحانات</span>
      </button>

      <div
        className={`rounded-lg shadow-md overflow-hidden ${
          isDarkMode ? "bg-primary-dark" : "bg-neutral-white"
        } transition-colors duration-300 mb-6`}
      >
        {/* رأس الصفحة */}
        <div
          className={`px-6 py-5 ${
            isDarkMode ? "border-primary-base border-b" : "border-b"
          } transition-colors duration-300`}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="text-right mb-4 md:mb-0">
              <h1
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-neutral-white" : "text-neutral-dark"
                } transition-colors duration-300`}
              >
                نتائج الامتحان
              </h1>
              <p
                className={`mt-1 ${
                  isDarkMode ? "text-primary-light" : "text-primary-base"
                } transition-colors duration-300`}
              >
                {exam.title} - {exam.subject}
              </p>
            </div>
          </div>
        </div>

        {/* ملخص النتائج */}
        <div className="p-6">
          {/* النتيجة الإجمالية وشريط التقدم */}
          <div
            className={`mb-8 p-6 rounded-lg ${
              isDarkMode ? "bg-primary-base bg-opacity-20" : "bg-neutral-light"
            } transition-colors duration-300`}
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <div className="text-center md:text-right order-2 md:order-1">
                <h2
                  className={`text-3xl font-bold ${
                    stats.score >= 70
                      ? "text-green-500"
                      : isDarkMode
                      ? "text-red-400"
                      : "text-red-500"
                  } transition-colors duration-300`}
                >
                  {stats.score}%
                </h2>
                <p
                  className={`${
                    isDarkMode ? "text-primary-light" : "text-primary-base"
                  } transition-colors duration-300`}
                >
                  {stats.score >= 70
                    ? "مبروك! لقد اجتزت الامتحان بنجاح"
                    : "للأسف، لم تتجاوز نسبة النجاح المطلوبة"}
                </p>
              </div>

              <div
                className={`h-28 w-28 rounded-full border-4 flex items-center justify-center mb-4 md:mb-0 order-1 md:order-2 ${
                  stats.score >= 70
                    ? "border-green-500"
                    : isDarkMode
                    ? "border-red-400"
                    : "border-red-500"
                } transition-colors duration-300`}
              >
                {stats.score >= 70 ? (
                  <CheckCircleIcon
                    className={`w-12 h-12 ${
                      isDarkMode ? "text-green-400" : "text-green-500"
                    }`}
                  />
                ) : (
                  <XCircleIcon
                    className={`w-12 h-12 ${
                      isDarkMode ? "text-red-400" : "text-red-500"
                    }`}
                  />
                )}
              </div>
            </div>

            {/* معلومات إضافية */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-right">
              <div className="p-3 rounded-md bg-opacity-30 bg-primary-light">
                <div className="text-sm font-medium text-neutral-white mb-1">
                  الوقت المستغرق
                </div>
                <div className="flex items-center justify-center md:justify-end">
                  <ClockIcon className="ml-1" />
                  <span className="text-lg font-bold text-neutral-white">
                    {stats.timeTaken}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-md bg-opacity-30 bg-green-500">
                <div className="text-sm font-medium text-neutral-white mb-1">
                  الإجابات الصحيحة
                </div>
                <div className="flex items-center justify-center md:justify-end">
                  <CheckCircleIcon className="ml-1 text-green-500" />
                  <span className="text-lg font-bold text-neutral-white">
                    {stats.correct} / {validQuestions.length}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-md bg-opacity-30 bg-red-500">
                <div className="text-sm font-medium text-neutral-white mb-1">
                  الإجابات الخاطئة
                </div>
                <div className="flex items-center justify-center md:justify-end">
                  <XCircleIcon className="ml-1 text-red-500" />
                  <span className="text-lg font-bold text-neutral-white">
                    {stats.incorrect} / {validQuestions.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* قائمة الأسئلة مع الإجابات الصحيحة والخاطئة */}
          <h3
            className={`text-xl font-bold mb-4 text-right ${
              isDarkMode ? "text-neutral-white" : "text-neutral-dark"
            } transition-colors duration-300`}
          >
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
                      ? isDarkMode
                        ? "border-gray-500 bg-gray-700 bg-opacity-30"
                        : "border-gray-400 bg-gray-100"
                      : answer.isCorrect
                      ? isDarkMode
                        ? "border-green-500 bg-green-900 bg-opacity-20"
                        : "border-green-500 bg-green-50"
                      : isDarkMode
                      ? "border-red-500 bg-red-900 bg-opacity-20"
                      : "border-red-500 bg-red-50"
                  } transition-colors duration-300`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        !answer.selectedOptionId
                          ? isDarkMode
                            ? "bg-gray-600"
                            : "bg-gray-300"
                          : answer.isCorrect
                          ? isDarkMode
                            ? "bg-green-700"
                            : "bg-green-100 text-green-800"
                          : isDarkMode
                          ? "bg-red-700"
                          : "bg-red-100 text-red-800"
                      } transition-colors duration-300`}
                    >
                      {!answer.selectedOptionId ? (
                        <span className="text-white text-sm">؟</span>
                      ) : answer.isCorrect ? (
                        <CheckCircleIcon
                          className={`w-5 h-5 ${
                            isDarkMode ? "text-green-300" : "text-green-600"
                          }`}
                        />
                      ) : (
                        <XCircleIcon
                          className={`w-5 h-5 ${
                            isDarkMode ? "text-red-300" : "text-red-600"
                          }`}
                        />
                      )}
                    </div>

                    <div
                      className={`text-right ${
                        isDarkMode ? "text-neutral-white" : "text-neutral-dark"
                      } transition-colors duration-300 w-full mr-2`}
                    >
                      <div className="font-medium text-lg mb-1">
                        السؤال {index + 1}
                      </div>
                      <div>{question.text}</div>
                    </div>
                  </div>

                  <div className="mr-10">
                    {/* إجابتك */}
                    <div className="mb-2">
                      <div
                        className={`text-sm font-medium mb-1 ${
                          !answer.selectedOptionId
                            ? isDarkMode
                              ? "text-gray-400"
                              : "text-gray-500"
                            : answer.isCorrect
                            ? isDarkMode
                              ? "text-green-300"
                              : "text-green-600"
                            : isDarkMode
                            ? "text-red-300"
                            : "text-red-600"
                        } transition-colors duration-300`}
                      >
                        {!answer.selectedOptionId
                          ? "لم تتم الإجابة"
                          : "إجابتك:"}
                      </div>
                      {selectedOption && (
                        <div
                          className={`p-2 rounded-md ${
                            answer.isCorrect
                              ? isDarkMode
                                ? "bg-green-800 bg-opacity-30"
                                : "bg-green-100"
                              : isDarkMode
                              ? "bg-red-800 bg-opacity-30"
                              : "bg-red-100"
                          } transition-colors duration-300 text-right`}
                        >
                          {selectedOption.text}
                        </div>
                      )}
                    </div>

                    {/* الإجابة الصحيحة - تظهر فقط إذا كانت إجابتك خاطئة */}
                    {selectedOption && !answer.isCorrect && correctOption && (
                      <div>
                        <div
                          className={`text-sm font-medium mb-1 ${
                            isDarkMode ? "text-green-300" : "text-green-600"
                          } transition-colors duration-300`}
                        >
                          الإجابة الصحيحة:
                        </div>
                        <div
                          className={`p-2 rounded-md ${
                            isDarkMode
                              ? "bg-green-800 bg-opacity-30"
                              : "bg-green-100"
                          } transition-colors duration-300 text-right`}
                        >
                          {correctOption.text}
                        </div>
                      </div>
                    )}

                    {/* شرح الإجابة - إذا كان متوفراً */}
                    {question.explanation && (
                      <div className="mt-2">
                        <div
                          className={`text-sm font-medium mb-1 ${
                            isDarkMode
                              ? "text-primary-light"
                              : "text-primary-base"
                          } transition-colors duration-300`}
                        >
                          التوضيح:
                        </div>
                        <div
                          className={`p-2 rounded-md ${
                            isDarkMode
                              ? "bg-primary-base bg-opacity-20"
                              : "bg-neutral-light"
                          } transition-colors duration-300 text-right`}
                        >
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
              className={`${
                isDarkMode
                  ? "bg-primary-base hover:bg-primary-light"
                  : "bg-primary-base hover:bg-primary-dark"
              } text-neutral-white px-6 py-3 rounded-md transition duration-200 flex items-center`}
            >
              <span className="ml-2">العودة إلى الامتحانات</span>
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResultsPage;
