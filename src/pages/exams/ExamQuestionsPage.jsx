// pages/exams/ExamQuestionsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { findExamById, sampleQuestions } from "../../data/ExamData";
import Navbar from "../../components/navigation/Navbar";
import {
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../../components/icons/Icons";

const ExamQuestionsPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(null); // Initialize as null instead of 0
  const [isTimerActive, setIsTimerActive] = useState(false); // Start as inactive
  const [startTime, setStartTime] = useState(null); // Track when the exam started
  const [timeTaken, setTimeTaken] = useState(0); // Track total time taken
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  // دالة إرسال الامتحان
  const submitExam = () => {
    // في تطبيق حقيقي، سيتم إرسال الإجابات إلى الخادم
    const answeredCount = Object.keys(answers).length;

    if (answeredCount < sampleQuestions.length && !showConfirmSubmit) {
      setShowConfirmSubmit(true);
      return;
    }

    setShowConfirmSubmit(false);
    setIsTimerActive(false); // Stop the timer

    // حساب الوقت المستغرق
    const endTime = Date.now();
    const totalTimeTaken = startTime
      ? Math.floor((endTime - startTime) / 1000)
      : 0; // بالثواني
    setTimeTaken(totalTimeTaken);

    // في تطبيق حقيقي، يمكننا تخزين الوقت المستغرق في التخزين المحلي أو إرساله إلى الخادم
    localStorage.setItem("examTimeTaken", totalTimeTaken);

    // تحديث وهمي لحالة الاختبار
    const updatedExam = {
      ...exam,
      status: "finished",
      score: 85, // نتيجة وهمية، في تطبيق حقيقي ستأتي من الخادم
      timeTaken: totalTimeTaken,
    };

    // في تطبيق حقيقي، يجب تحديث الخادم هنا
    localStorage.setItem("examAnswers", JSON.stringify(answers));

    // الانتقال إلى صفحة النتائج
    navigate(`/exams/${examId}/results`);
  };

  useEffect(() => {
    // تحميل بيانات الاختبار
    const foundExam = findExamById(examId);

    if (foundExam) {
      setExam(foundExam);
      // Set timer but don't activate it yet
      setTimer(foundExam.duration * 60); // تحويل المدة إلى ثوانٍ
    } else {
      // إذا لم يتم العثور على الاختبار، قم بالتوجيه إلى صفحة غير موجود
      navigate("/not-found");
    }

    setLoading(false);
  }, [examId, navigate]);

  // Activate timer only after component has fully mounted and data is loaded
  useEffect(() => {
    if (exam && timer !== null && !isTimerActive) {
      // Small delay to ensure everything is ready
      const timerActivation = setTimeout(() => {
        setStartTime(Date.now()); // Record when the exam started
        setIsTimerActive(true);
      }, 100);

      return () => clearTimeout(timerActivation);
    }
  }, [exam, timer, isTimerActive]);

  // تأثير للمؤقت
  useEffect(() => {
    let interval = null;

    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && isTimerActive) {
      // إرسال تلقائي عند انتهاء الوقت
      alert("انتهى الوقت المخصص للامتحان!");
      submitExam();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, isTimerActive]);

  // تنسيق الوقت (دقائق:ثواني)
  const formatTime = (timeInSeconds) => {
    if (timeInSeconds === null) return "00:00";

    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours > 0 ? hours.toString().padStart(2, "0") + ":" : ""}${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // اختيار إجابة
  const selectAnswer = (questionId, optionId) => {
    const question = sampleQuestions.find((q) => q.id === questionId);
    const correctOptionId = question.options.find((opt) => opt.isCorrect)?.id;

    setAnswers({
      ...answers,
      [questionId]: optionId,
    });

    // في تطبيق حقيقي، قد نرغب في تتبع ما إذا كانت الإجابة صحيحة للتحليلات
    // لكننا لا نريد إظهار ذلك للطالب أثناء الامتحان
    console.log(
      `Question ${questionId}: Selected ${optionId}, Correct: ${
        correctOptionId === optionId
      }`
    );
  };

  // الانتقال إلى السؤال التالي
  const nextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // الانتقال إلى السؤال السابق
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (loading || !exam) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F0F4F8]">
        <Navbar />
        <div className="mt-16 flex-grow flex justify-center items-center">
          جاري التحميل...
        </div>
      </div>
    );
  }

  // حساب نسبة التقدم
  const progressPercentage =
    ((currentQuestion + 1) / sampleQuestions.length) * 100;

  const question = sampleQuestions[currentQuestion];

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F4F8]">
      {/* Navbar/Header */}
      <Navbar />
      
      {/* Main content with top margin to account for fixed navbar */}
      <div className="mt-16 flex-grow">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* تأكيد نافذة الإرسال */}
          {showConfirmSubmit && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-xl font-bold mb-4 text-right text-[#37474F]">
                  تأكيد تسليم الامتحان
                </h3>
                <p className="mb-6 text-right text-[#3949AB]">
                  لم تجب على جميع الأسئلة ({Object.keys(answers).length} من{" "}
                  {sampleQuestions.length}). هل أنت متأكد من رغبتك في تسليم
                  الامتحان؟
                </p>
                <div className="flex justify-center space-x-4 space-x-reverse">
                  <button
                    onClick={() => setShowConfirmSubmit(false)}
                    className="bg-[#F0F4F8] text-[#37474F] px-4 py-2 rounded-md"
                  >
                    العودة للامتحان
                  </button>
                  <button
                    onClick={submitExam}
                    className="bg-[#3949AB] text-white px-4 py-2 rounded-md"
                  >
                    تسليم الامتحان
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-lg shadow-md overflow-hidden bg-white">
            {/* رأس الامتحان مع المؤقت */}
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <div className="flex items-center text-[#3949AB]">
                <ClockIcon />
                <span className="ml-2 font-medium">{formatTime(timer)}</span>
              </div>

              <div className="text-right">
                <h2 className="text-xl font-bold text-[#37474F]">
                  سؤال {currentQuestion + 1} / {sampleQuestions.length}
                </h2>
                <p className="text-sm text-[#3949AB]">
                  {exam.title}
                </p>
              </div>
            </div>

            {/* شريط التقدم */}
            <div className="w-full h-2 bg-[#F0F4F8]">
              <div
                className="h-full bg-[#FFC107]"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            {/* محتوى السؤال */}
            <div className="p-6">
              <div className="text-right mb-6 text-xl font-medium text-[#37474F]">
                {question.text}
              </div>

              {question.image && (
                <div className="mb-6 flex justify-center">
                  <img
                    src={question.image}
                    alt="Question"
                    className="max-w-full h-auto rounded-md"
                  />
                </div>
              )}

              {/* الخيارات */}
              <div className="space-y-3 mb-8">
                {question.options.map((option) => {
                  const isSelected = answers[question.id] === option.id;

                  return (
                    <div
                      key={option.id}
                      onClick={() => selectAnswer(question.id, option.id)}
                      className={`flex items-center p-3 rounded-md border cursor-pointer ${
                        isSelected
                          ? "border-[#FFC107] bg-[#FFC107]/10"
                          : "border-[#F0F4F8] hover:border-[#FFC107]"
                      } transition-all duration-200`}
                    >
                      <div
                        className={`w-6 h-6 flex items-center justify-center ml-3 border rounded-full ${
                          isSelected
                            ? "border-[#FFC107]"
                            : "border-[#F0F4F8]"
                        } transition-colors duration-300`}
                      >
                        {isSelected && (
                          <div className="w-3 h-3 rounded-full bg-[#FFC107]"></div>
                        )}
                      </div>
                      <span className="text-right text-[#37474F]">
                        {option.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* أزرار التنقل */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setShowConfirmSubmit(true)}
                  className="bg-[#3949AB] hover:bg-[#1A237E] text-white px-6 py-2 rounded-md transition duration-200"
                >
                  تسليم الامتحان
                </button>

                <div className="flex space-x-3 space-x-reverse">
                  <button
                    onClick={nextQuestion}
                    disabled={currentQuestion === sampleQuestions.length - 1}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      currentQuestion === sampleQuestions.length - 1
                        ? "bg-[#F0F4F8] text-[#37474F]/30 cursor-not-allowed"
                        : "bg-[#F0F4F8] hover:bg-[#F0F4F8]/80 text-[#37474F]"
                    } transition duration-200`}
                  >
                    <span className="ml-1">التالي</span>
                    <ChevronLeftIcon />
                  </button>

                  <button
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      currentQuestion === 0
                        ? "bg-[#F0F4F8] text-[#37474F]/30 cursor-not-allowed"
                        : "bg-[#F0F4F8] hover:bg-[#F0F4F8]/80 text-[#37474F]"
                    } transition duration-200`}
                  >
                    <ChevronRightIcon />
                    <span className="mr-1">السابق</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* تم إزالة الفوتر بالكامل */}
    </div>
  );
};

export default ExamQuestionsPage;
