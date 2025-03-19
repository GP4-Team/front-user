// pages/exams/ExamDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { findExamById } from "../../data/ExamData";
import { ExamStatusBadge } from "../../components/exams/ExamStatusBadge";
import {
  CalendarIcon,
  ClockIcon,
  ListIcon,
  HelpCircleIcon,
  ArrowRightIcon,
} from "../../components/icons/Icons";

const ExamDetailsPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // في تطبيق حقيقي، هنا سيكون لديك طلب API للحصول على تفاصيل الاختبار
    const foundExam = findExamById(examId);

    if (foundExam) {
      setExam(foundExam);
    } else {
      // إذا لم يتم العثور على الاختبار، قم بالتوجيه إلى صفحة غير موجود
      navigate("/not-found");
    }

    setLoading(false);
  }, [examId, navigate]);

  const handleStartExam = () => {
    navigate(`/exams/${examId}/questions`);
  };

  const handleBackToExams = () => {
    navigate("/exams");
  };

  const handleViewResults = () => {
    navigate(`/exams/${examId}/results`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        جاري التحميل...
      </div>
    );
  }

  if (!exam) {
    return null; // سيقوم useEffect بالتوجيه إلى صفحة غير موجود
  }

  return (
    <div className="max-w-3xl mx-auto mt-6">
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
        } transition-colors duration-300`}
      >
        {/* رأس الاختبار */}
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
                {exam.title}
              </h1>
              <p
                className={`mt-1 ${
                  isDarkMode ? "text-primary-light" : "text-primary-base"
                } transition-colors duration-300`}
              >
                {exam.subject}
              </p>
            </div>
            <ExamStatusBadge status={exam.status} />
          </div>
        </div>

        {/* تفاصيل الاختبار */}
        <div className="px-6 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 text-right">
              <div className="flex justify-end items-center space-x-4 space-x-reverse">
                <div>
                  <h3
                    className={`text-lg font-medium ${
                      isDarkMode ? "text-neutral-white" : "text-neutral-dark"
                    } transition-colors duration-300`}
                  >
                    موعد الامتحان
                  </h3>
                  <p
                    className={`${
                      isDarkMode ? "text-primary-light" : "text-primary-base"
                    } transition-colors duration-300`}
                  >
                    {new Date(exam.date).toLocaleDateString("ar-EG")} -{" "}
                    {exam.time}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-full ${
                    isDarkMode
                      ? "bg-primary-base bg-opacity-30"
                      : "bg-neutral-light"
                  } transition-colors duration-300`}
                >
                  <CalendarIcon />
                </div>
              </div>

              <div className="flex justify-end items-center space-x-4 space-x-reverse">
                <div>
                  <h3
                    className={`text-lg font-medium ${
                      isDarkMode ? "text-neutral-white" : "text-neutral-dark"
                    } transition-colors duration-300`}
                  >
                    مدة الامتحان
                  </h3>
                  <p
                    className={`${
                      isDarkMode ? "text-primary-light" : "text-primary-base"
                    } transition-colors duration-300`}
                  >
                    {exam.duration} دقيقة
                  </p>
                </div>
                <div
                  className={`p-3 rounded-full ${
                    isDarkMode
                      ? "bg-primary-base bg-opacity-30"
                      : "bg-neutral-light"
                  } transition-colors duration-300`}
                >
                  <ClockIcon />
                </div>
              </div>

              <div className="flex justify-end items-center space-x-4 space-x-reverse">
                <div>
                  <h3
                    className={`text-lg font-medium ${
                      isDarkMode ? "text-neutral-white" : "text-neutral-dark"
                    } transition-colors duration-300`}
                  >
                    عدد الأسئلة
                  </h3>
                  <p
                    className={`${
                      isDarkMode ? "text-primary-light" : "text-primary-base"
                    } transition-colors duration-300`}
                  >
                    {exam.numberOfQuestions} سؤال
                  </p>
                </div>
                <div
                  className={`p-3 rounded-full ${
                    isDarkMode
                      ? "bg-primary-base bg-opacity-30"
                      : "bg-neutral-light"
                  } transition-colors duration-300`}
                >
                  <ListIcon />
                </div>
              </div>
            </div>

            <div
              className={`${
                isDarkMode
                  ? "bg-primary-base bg-opacity-20"
                  : "bg-neutral-light"
              } rounded-lg p-4 transition-colors duration-300`}
            >
              <div className="flex items-center mb-4 space-x-2 space-x-reverse">
                <h3
                  className={`text-lg font-medium ${
                    isDarkMode ? "text-neutral-white" : "text-neutral-dark"
                  } transition-colors duration-300`}
                >
                  تعليمات الامتحان
                </h3>
                <div
                  className={`p-2 rounded-full ${
                    isDarkMode ? "bg-primary-dark" : "bg-neutral-white"
                  } transition-colors duration-300`}
                >
                  <HelpCircleIcon />
                </div>
              </div>

              <ul className="space-y-2 list-disc list-inside text-right">
                {exam.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className={`${
                      isDarkMode ? "text-primary-light" : "text-primary-base"
                    } transition-colors duration-300`}
                  >
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* أزرار الإجراءات بناءً على حالة الاختبار */}
          {exam.status === "available" && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleStartExam}
                className={`${
                  isDarkMode
                    ? "bg-accent hover:bg-accent/90"
                    : "bg-accent hover:bg-accent/90"
                } text-neutral-dark py-3 px-8 rounded-md font-medium transition duration-200 text-lg`}
              >
                ابدأ الامتحان
              </button>
            </div>
          )}

          {exam.status === "in-progress" && (
            <div className="mt-8 text-center">
              <p
                className={`${
                  isDarkMode ? "text-primary-light" : "text-primary-base"
                } transition-colors duration-300 mb-3`}
              >
                لديك امتحان قيد التقدم
              </p>
              <button
                onClick={handleStartExam}
                className={`${
                  isDarkMode
                    ? "bg-primary-base hover:bg-primary-dark"
                    : "bg-primary-base hover:bg-primary-dark"
                } text-neutral-white py-2 px-6 rounded-md transition duration-200`}
              >
                متابعة الامتحان
              </button>
            </div>
          )}

          {exam.status === "finished" && (
            <div className="mt-8">
              <div
                className={`${
                  isDarkMode
                    ? "bg-primary-base bg-opacity-20"
                    : "bg-primary-light bg-opacity-20"
                } rounded-md p-4 mb-6`}
              >
                <h3
                  className={`text-lg font-medium ${
                    isDarkMode ? "text-neutral-white" : "text-neutral-dark"
                  } text-right mb-3`}
                >
                  نتائج الامتحان
                </h3>
                <div className="flex justify-between items-center">
                  <div
                    className={`h-4 w-full ${
                      isDarkMode
                        ? "bg-primary-light bg-opacity-30"
                        : "bg-primary-light bg-opacity-30"
                    } rounded-full overflow-hidden`}
                  >
                    <div
                      className={`h-full ${
                        exam.score >= 70 ? "bg-green-500" : "bg-red-500"
                      }`}
                      style={{ width: `${exam.score}%` }}
                    ></div>
                  </div>
                  <div
                    className={`text-lg font-bold mr-4 ${
                      isDarkMode ? "text-neutral-white" : "text-neutral-dark"
                    }`}
                  >
                    {exam.score}%
                  </div>
                </div>
                <p
                  className={`text-sm mt-2 text-right ${
                    isDarkMode ? "text-primary-light" : "text-primary-base"
                  }`}
                >
                  {exam.score >= 70
                    ? "مبروك! لقد اجتزت الامتحان بنجاح"
                    : "للأسف، لم تحقق الدرجة المطلوبة للنجاح"}
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleViewResults}
                  className={`${
                    isDarkMode
                      ? "bg-primary-base hover:bg-primary-dark"
                      : "bg-primary-base hover:bg-primary-dark"
                  } text-neutral-white py-2 px-6 rounded-md transition duration-200`}
                >
                  عرض النتائج التفصيلية
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamDetailsPage;
