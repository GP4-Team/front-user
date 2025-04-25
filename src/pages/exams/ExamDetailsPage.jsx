// pages/exams/ExamDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { findExamById } from "../../data/ExamData";
import { ExamStatusBadge } from "../../components/exams/ExamStatusBadge";
import Navbar from "../../components/navigation/Navbar";
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
            null // سيقوم useEffect بالتوجيه إلى صفحة غير موجود
          ) : (
            <>
              <button
                onClick={handleBackToExams}
                className={`mb-4 flex items-center ${
                  isDarkMode
                    ? "text-[#7986CB] hover:text-white"
                    : "text-[#3949AB] hover:text-[#1A237E]"
                } transition duration-200`}
              >
                <ArrowRightIcon />
                <span className="mr-2">العودة إلى الامتحانات</span>
              </button>

              <div className="rounded-lg shadow-md overflow-hidden bg-white">
                {/* رأس الاختبار */}
                <div className="px-6 py-5 border-b">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="text-right mb-4 md:mb-0">
                      <h1 className="text-2xl font-bold text-[#37474F]">
                        {exam.title}
                      </h1>
                      <p className="mt-1 text-[#3949AB]">
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
                          <h3 className="text-lg font-medium text-[#37474F]">
                            موعد الامتحان
                          </h3>
                          <p className="text-[#3949AB]">
                            {new Date(exam.date).toLocaleDateString("ar-EG")} -{" "}
                            {exam.time}
                          </p>
                        </div>
                        <div className="p-3 rounded-full bg-[#F0F4F8]">
                          <CalendarIcon className="text-[#3949AB]" />
                        </div>
                      </div>

                      <div className="flex justify-end items-center space-x-4 space-x-reverse">
                        <div>
                          <h3 className="text-lg font-medium text-[#37474F]">
                            مدة الامتحان
                          </h3>
                          <p className="text-[#3949AB]">
                            {exam.duration} دقيقة
                          </p>
                        </div>
                        <div className="p-3 rounded-full bg-[#F0F4F8]">
                          <ClockIcon className="text-[#3949AB]" />
                        </div>
                      </div>

                      <div className="flex justify-end items-center space-x-4 space-x-reverse">
                        <div>
                          <h3 className="text-lg font-medium text-[#37474F]">
                            عدد الأسئلة
                          </h3>
                          <p className="text-[#3949AB]">
                            {exam.numberOfQuestions} سؤال
                          </p>
                        </div>
                        <div className="p-3 rounded-full bg-[#F0F4F8]">
                          <ListIcon className="text-[#3949AB]" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#F0F4F8] rounded-lg p-4">
                      <div className="flex items-center mb-4 space-x-2 space-x-reverse justify-end">
                        <h3 className="text-lg font-medium text-[#37474F]">
                          تعليمات الامتحان
                        </h3>
                        <div className="p-2 rounded-full bg-white">
                          <HelpCircleIcon className="text-[#3949AB]" />
                        </div>
                      </div>

                      <ul className="space-y-2 list-disc list-inside text-right">
                        {exam.instructions && exam.instructions.map((instruction, index) => (
                          <li key={index} className="text-[#3949AB]">
                            {instruction}
                          </li>
                        ))}
                        {!exam.instructions && (
                          <>
                            <li className="text-[#3949AB]">يجب الإجابة على جميع الأسئلة</li>
                            <li className="text-[#3949AB]">لا يسمح بالعودة للأسئلة السابقة بعد تقديم الإجابة</li>
                            <li className="text-[#3949AB]">سيتم احتساب الدرجة النهائية بناءً على الإجابات الصحيحة فقط</li>
                            <li className="text-[#3949AB]">درجة النجاح في الامتحان هي 70%</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* أزرار الإجراءات بناءً على حالة الاختبار */}
                  {exam.status === "available" && (
                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={handleStartExam}
                        className="bg-[#FFC107] hover:bg-[#FFC107]/90 text-[#37474F] py-3 px-8 rounded-md font-medium transition duration-200 text-lg"
                      >
                        ابدأ الامتحان
                      </button>
                    </div>
                  )}

                  {exam.status === "in-progress" && (
                    <div className="mt-8 text-center">
                      <p className="text-[#3949AB] mb-3">
                        لديك امتحان قيد التقدم
                      </p>
                      <button
                        onClick={handleStartExam}
                        className="bg-[#3949AB] hover:bg-[#1A237E] text-white py-2 px-6 rounded-md transition duration-200"
                      >
                        متابعة الامتحان
                      </button>
                    </div>
                  )}

                  {exam.status === "finished" && (
                    <div className="mt-8">
                      <div className="bg-[#7986CB] bg-opacity-20 rounded-md p-4 mb-6">
                        <h3 className="text-lg font-medium text-[#37474F] text-right mb-3">
                          نتائج الامتحان
                        </h3>
                        <div className="flex justify-between items-center">
                          <div className="h-4 w-full bg-[#7986CB] bg-opacity-30 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                exam.score >= 70 ? "bg-green-500" : "bg-red-500"
                              }`}
                              style={{ width: `${exam.score}%` }}
                            ></div>
                          </div>
                          <div className="text-lg font-bold mr-4 text-[#37474F]">
                            {exam.score}%
                          </div>
                        </div>
                        <p className="text-sm mt-2 text-right text-[#3949AB]">
                          {exam.score >= 70
                            ? "مبروك! لقد اجتزت الامتحان بنجاح"
                            : "للأسف، لم تحقق الدرجة المطلوبة للنجاح"}
                        </p>
                      </div>

                      <div className="flex justify-center">
                        <button
                          onClick={handleViewResults}
                          className="bg-[#3949AB] hover:bg-[#1A237E] text-white py-2 px-6 rounded-md transition duration-200"
                        >
                          عرض النتائج التفصيلية
                        </button>
                      </div>
                    </div>
                  )}
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

export default ExamDetailsPage;