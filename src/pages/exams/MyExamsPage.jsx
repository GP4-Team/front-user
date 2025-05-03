// pages/exams/MyExamsPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import Navbar from "../../components/navigation/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CalendarIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../../components/icons/Icons";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Debug flag for logging
const DEBUG = true;

// Custom icon components
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const GridViewIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const ListViewIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);

const BookmarkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
);

const BookmarkFilledIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
);

const ChevronUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const MyExamsPage = () => {
  const { isDarkMode } = useTheme();
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();

  // Refs for animations
  const pageRef = useRef(null);
  const statsSectionRef = useRef(null);
  const availableExamsRef = useRef(null);
  const completedExamsRef = useRef(null);
  const examCardRefs = useRef([]);

  // State for UI controls
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, available, in-progress, finished
  const [sortBy, setSortBy] = useState("date"); // date, title, score
  const [sortDirection, setSortDirection] = useState("desc"); // asc, desc
  const [viewMode, setViewMode] = useState("grid"); // grid, list
  const [showFilters, setShowFilters] = useState(false);
  const [favoriteExams, setFavoriteExams] = useState([]);
  const [statsVisible, setStatsVisible] = useState(true);

  // Stats calculation
  const [examStats, setExamStats] = useState({
    totalExams: 0,
    completedExams: 0,
    averageScore: 0,
    highestScore: 0,
    pendingExams: 0,
  });

  // Sample exam data
  const mockExamsData = [
    {
      id: 1,
      title: "اختبار عملي",
      subject: "قواعد البيانات",
      status: "available",
      date: "2025/03/18",
      time: "PM 14:00",
      duration: 120,
      numberOfQuestions: 25,
    },
    {
      id: 2,
      title: "تدريب الباب الاول",
      subject: "أساسيات و مفاهيم في التيار الكهربي",
      status: "available",
      date: "2025/03/20",
      time: "AM 10:00",
      duration: 45,
      numberOfQuestions: 50,
    },
    {
      id: 3,
      title: "امتحان نصف الفصل",
      subject: "ميكانيكا الموائع",
      status: "available",
      date: "2025/03/22",
      time: "PM 12:30",
      duration: 60,
      numberOfQuestions: 30,
    },
    {
      id: 4,
      title: "الاختبار النهائي",
      subject: "تحليل البيانات",
      status: "finished",
      date: "2025/02/28",
      time: "PM 15:00",
      duration: 90,
      numberOfQuestions: 40,
      score: 82,
    },
  ];

  // Calculate and prepare the exams data
  useEffect(() => {
    // Load favorites from localStorage
    try {
      const savedFavorites = localStorage.getItem("favoriteExams");
      if (savedFavorites) {
        setFavoriteExams(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }

    // Calculate stats using the mock data
    const completed = mockExamsData.filter(
      (exam) => exam.status === "finished"
    );
    const scores = completed.map((exam) => exam.score || 0);
    const avgScore =
      scores.length > 0
        ? scores.reduce((sum, score) => sum + score, 0) / scores.length
        : 0;
    const highest = scores.length > 0 ? Math.max(...scores) : 0;

    setExamStats({
      totalExams: mockExamsData.length,
      completedExams: completed.length,
      averageScore: Math.round(avgScore),
      highestScore: highest,
      pendingExams: mockExamsData.filter((exam) => exam.status !== "finished")
        .length,
    });
  }, []);

  // GSAP animations
  useEffect(() => {
    let isMounted = true;

    // Helper to check if component is still mounted
    const checkMounted = () => isMounted && pageRef.current;

    if (DEBUG) {
      console.log("MyExamsPage mounted, setting up animations");
      console.log("Dark mode:", isDarkMode);
    }

    // Only setup animations if component is mounted
    if (checkMounted()) {
      try {
        // Page fade in
        gsap.fromTo(
          pageRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" }
        );

        // Stats section animation
        if (statsSectionRef.current) {
          gsap.fromTo(
            statsSectionRef.current,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: 0.2,
              ease: "power3.out",
            }
          );
        }

        // Section headers animations
        const sectionHeadersAnimation = gsap.timeline({ delay: 0.3 });
        [availableExamsRef.current, completedExamsRef.current].forEach(
          (section, index) => {
            if (section) {
              sectionHeadersAnimation.fromTo(
                section,
                { x: isRTL ? 30 : -30, opacity: 0 },
                {
                  x: 0,
                  opacity: 1,
                  duration: 0.5,
                  ease: "power2.out",
                },
                index * 0.1
              );
            }
          }
        );

        // Exam cards staggered animation
        examCardRefs.current.forEach((card, index) => {
          if (card) {
            gsap.fromTo(
              card,
              {
                y: 20,
                opacity: 0,
                scale: 0.95,
              },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                delay: 0.5 + index * 0.1,
                ease: "back.out(1.2)",
              }
            );
          }
        });
      } catch (error) {
        console.error("Animation setup error:", error);
      }
    }

    return () => {
      isMounted = false;

      // Cleanup animations
      if (pageRef.current) {
        gsap.killTweensOf(pageRef.current);
      }
      if (statsSectionRef.current) {
        gsap.killTweensOf(statsSectionRef.current);
      }
      if (availableExamsRef.current) {
        gsap.killTweensOf(availableExamsRef.current);
      }
      if (completedExamsRef.current) {
        gsap.killTweensOf(completedExamsRef.current);
      }
      examCardRefs.current.forEach((card) => {
        if (card) {
          gsap.killTweensOf(card);
        }
      });

      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, [isDarkMode, isRTL]);

  // Save favorites when they change
  useEffect(() => {
    try {
      localStorage.setItem("favoriteExams", JSON.stringify(favoriteExams));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  }, [favoriteExams]);

  // Create a state for motivational messages
  const [showMotivationalMessage, setShowMotivationalMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const motivationalMessageRef = useRef(null);

  // Array of motivational messages in Arabic
  const motivationalMessages = [
    "\u0627\u0644\u0646\u062c\u0627\u062d \u0631\u062d\u0644\u0629 \u0648\u0644\u064a\u0633 \u0648\u062c\u0647\u0629!",
    "\u0627\u0644\u062a\u0639\u0644\u0645 \u0647\u0648 \u0627\u0644\u0643\u0646\u0632 \u0627\u0644\u0630\u064a \u064a\u062a\u0628\u0639\u0643 \u0623\u064a\u0646\u0645\u0627 \u0630\u0647\u0628\u062a!",
    "\u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631\u0627\u062a \u0641\u0631\u0635\u0629 \u0644\u0625\u0638\u0647\u0627\u0631 \u0645\u0627 \u062a\u0639\u0644\u0645\u062a\u0647!",
    "\u0645\u0639 \u0643\u0644 \u062a\u062d\u062f\u064a \u062a\u0635\u0628\u062d \u0623\u0642\u0648\u0649!",
    "\u062c\u0647\u062f \u0627\u0644\u064a\u0648\u0645 \u0647\u0648 \u0646\u062c\u0627\u062d \u0627\u0644\u063a\u062f!",
    "\u0623\u0646\u062a \u0639\u0644\u0649 \u0628\u0639\u062f \u062e\u0637\u0648\u0629 \u0645\u0646 \u062a\u062d\u0642\u064a\u0642 \u0623\u0647\u062f\u0627\u0641\u0643!",
  ];

  // Display a motivational message after a delay
  useEffect(() => {
    // Show motivational message after 3 seconds
    const messageTimeout = setTimeout(() => {
      const randomMessage =
        motivationalMessages[
          Math.floor(Math.random() * motivationalMessages.length)
        ];
      setCurrentMessage(randomMessage);
      setShowMotivationalMessage(true);

      // Hide message after 5 seconds
      const hideTimeout = setTimeout(() => {
        setShowMotivationalMessage(false);
      }, 5000);

      return () => clearTimeout(hideTimeout);
    }, 3000);

    return () => clearTimeout(messageTimeout);
  }, []);

  // Animation for motivational message
  useEffect(() => {
    if (showMotivationalMessage && motivationalMessageRef.current) {
      gsap.fromTo(
        motivationalMessageRef.current,
        {
          y: 50,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        }
      );
    }
  }, [showMotivationalMessage]);

  const toggleFavorite = (examId) => {
    setFavoriteExams((prev) =>
      prev.includes(examId)
        ? prev.filter((id) => id !== examId)
        : [...prev, examId]
    );
  };

  // تعديل هذه الدالة للانتقال مباشرة إلى صفحة الأسئلة
  const handleSelectExam = (exam) => {
    // إذا كان الامتحان منتهي، انتقل إلى صفحة التفاصيل
    if (exam.status === "finished") {
      navigate(`/exams/${exam.id}`);
    } else {
      // إذا كان الامتحان متاح أو قيد التقدم، انتقل مباشرة إلى صفحة الأسئلة
      navigate(`/exams/${exam.id}/questions`);
    }
  };

  // Render individual exam card using the courses page layout style
  const renderExamCard = (exam, index) => {
    const isFavorite = favoriteExams.includes(exam.id);
    const headerColor =
      exam.subject === "قواعد البيانات"
        ? isDarkMode
          ? "bg-blue-700"
          : "bg-[#3949AB]"
        : exam.subject === "أساسيات و مفاهيم في التيار الكهربي"
        ? isDarkMode
          ? "bg-yellow-700"
          : "bg-[#FFC107]"
        : isDarkMode
        ? "bg-indigo-700"
        : "bg-[#7986CB]";

    const statusText =
      exam.status === "available"
        ? "متاح"
        : exam.status === "in-progress"
        ? "جاري"
        : "مكتمل";

    const statusColor =
      exam.status === "available"
        ? isDarkMode
          ? "bg-green-900/50 text-green-400"
          : "bg-green-100 text-green-800"
        : exam.status === "in-progress"
        ? isDarkMode
          ? "bg-blue-900/50 text-blue-400"
          : "bg-blue-100 text-blue-800"
        : isDarkMode
        ? "bg-gray-800/50 text-gray-400"
        : "bg-gray-100 text-gray-800";

    // Generate delay for cascading animations
    const animationDelay = `delay-${Math.min(index * 100, 500)}ms`;

    return (
      <div
        key={exam.id}
        ref={(el) => (examCardRefs.current[index] = el)}
        className={`rounded-lg shadow-md overflow-hidden ${
          isDarkMode
            ? "bg-neutral-800 text-text-light"
            : "bg-white text-[#37474F]"
        } mb-4 
          transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl
          ${index % 2 === 0 ? "animate-float-slow" : "animate-float"}`}
      >
        {/* Colored header strip with gradient */}
        <div
          className={`h-1.5 ${headerColor} bg-gradient-to-r from-opacity-50 to-opacity-100`}
        ></div>

        <div className="relative p-4 text-right">
          {/* Subject badge with animation */}
          <div
            className={`absolute top-4 right-4 px-2 py-1 rounded-md text-xs font-medium text-white ${headerColor} 
            transition-all duration-500 hover:shadow-lg hover:scale-105`}
          >
            {exam.subject}
          </div>

          {/* Bookmark icon */}
          <div className="absolute top-4 left-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(exam.id);
              }}
              className={`${
                isDarkMode
                  ? "text-gray-500 hover:text-[#FFC107]"
                  : "text-gray-400 hover:text-[#FFC107]"
              } 
                transition-colors duration-200 transform hover:scale-110 hover:rotate-12`}
            >
              {isFavorite ? (
                <BookmarkFilledIcon className="w-5 h-5 text-[#FFC107]" />
              ) : (
                <BookmarkIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Exam title */}
          <h3
            className={`mt-8 mb-3 text-xl font-bold ${
              isDarkMode ? "text-text-light" : "text-[#37474F]"
            } text-right`}
          >
            {exam.title}
          </h3>

          {/* Status badge */}
          <div
            className={`inline-block px-2 py-1 rounded-full text-xs ${statusColor} mb-3 transition-all duration-300 hover:scale-105`}
          >
            {statusText}
          </div>

          {/* Exam details - date/time and duration/questions */}
          <div className="grid grid-cols-2 gap-4 mb-4 text-right">
            <div className="flex items-center justify-end">
              <div
                className={`${
                  isDarkMode ? "text-primary-light" : "text-[#3949AB]"
                } ml-2`}
              >
                <p className="text-sm text-right">{exam.date}</p>
                <p className="text-sm text-right">{exam.time}</p>
              </div>
              <CalendarIcon
                className={`${
                  isDarkMode ? "text-primary-light" : "text-[#3949AB]"
                }`}
              />
            </div>

            <div className="flex items-center justify-end">
              <div
                className={`${
                  isDarkMode ? "text-primary-light" : "text-[#3949AB]"
                } ml-2`}
              >
                <p className="text-xs text-right">{exam.duration} دقيقة</p>
                <p className="text-xs text-right">
                  {exam.numberOfQuestions} سؤال
                </p>
              </div>
              <ClockIcon
                className={`${
                  isDarkMode ? "text-primary-light" : "text-[#3949AB]"
                }`}
              />
            </div>
          </div>

          {/* Exam button */}
          <div className="text-center mt-4">
            <button
              onClick={() => handleSelectExam(exam)}
              className={`${
                isDarkMode
                  ? "bg-primary-dark hover:bg-primary-base"
                  : "bg-[#3949AB] hover:bg-[#1A237E]"
              } 
                text-white px-6 py-2 rounded-md inline-flex items-center transition-all duration-300
                hover:shadow-lg transform hover:scale-105`}
            >
              <span className="mx-2">
                {exam.status === "finished" ? "عرض التفاصيل" : "فتح الامتحان"}
              </span>
              <ArrowLeftIcon />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={pageRef}
      className={`flex flex-col min-h-screen ${
        isDarkMode
          ? "bg-background-dark text-text-light"
          : "bg-[#F0F4F8] text-[#37474F]"
      }`}
    >
      {/* Navbar/Header */}
      <Navbar />

      {/* Main content with top margin to account for fixed navbar */}
      <div className="mt-16 flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Motivational message notification */}
          {showMotivationalMessage && (
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
                <div className="text-right">
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
          )}

          {/* Page header */}
          <h1
            className={`text-3xl font-bold mb-6 text-right ${
              isDarkMode ? "text-text-light" : "text-[#37474F]"
            }`}
          >
            امتحاناتي
          </h1>

          {/* Performance summary section */}
          <div
            ref={statsSectionRef}
            className={`${
              isDarkMode ? "bg-neutral-800 border-neutral-700" : "bg-white"
            } rounded-lg shadow-md mb-6 overflow-hidden transform transition-all duration-300 hover:shadow-lg`}
          >
            <div
              className={`flex justify-between items-center p-4 border-b ${
                isDarkMode ? "border-neutral-700" : "border-gray-200"
              }`}
              onClick={() => setStatsVisible(!statsVisible)}
              role="button"
              aria-expanded={statsVisible}
              aria-controls="stats-content"
            >
              <button
                className={`${
                  isDarkMode ? "text-primary-light" : "text-[#3949AB]"
                } transition-transform duration-300 ${
                  statsVisible ? "rotate-180" : ""
                }`}
              >
                <ChevronDownIcon />
              </button>
              <h2
                className={`text-lg font-bold ${
                  isDarkMode ? "text-text-light" : "text-[#37474F]"
                } text-right`}
              >
                ملخص الأداء
              </h2>
            </div>

            <div
              id="stats-content"
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                statsVisible ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-center">
                  <div className="p-4 transform transition-all duration-500 hover:scale-105">
                    <div
                      className={`text-4xl font-bold ${
                        isDarkMode ? "text-text-light" : "text-[#37474F]"
                      }`}
                    >
                      {examStats.totalExams}
                    </div>
                    <div
                      className={`text-sm ${
                        isDarkMode ? "text-primary-light" : "text-[#3949AB]"
                      } text-right rtl:text-right ltr:text-left`}
                    >
                      إجمالي الامتحانات
                    </div>
                  </div>

                  <div className="p-4 transform transition-all duration-500 hover:scale-105">
                    <div
                      className={`text-4xl font-bold ${
                        isDarkMode ? "text-text-light" : "text-[#37474F]"
                      }`}
                    >
                      {examStats.completedExams}
                    </div>
                    <div
                      className={`text-sm ${
                        isDarkMode ? "text-primary-light" : "text-[#3949AB]"
                      } text-right rtl:text-right ltr:text-left`}
                    >
                      الامتحانات المكتملة
                    </div>
                  </div>

                  <div className="p-4 transform transition-all duration-500 hover:scale-105">
                    <div
                      className={`text-4xl font-bold ${
                        isDarkMode ? "text-text-light" : "text-[#37474F]"
                      }`}
                    >
                      {examStats.pendingExams}
                    </div>
                    <div
                      className={`text-sm ${
                        isDarkMode ? "text-primary-light" : "text-[#3949AB]"
                      } text-right rtl:text-right ltr:text-left`}
                    >
                      امتحانات معلقة
                    </div>
                  </div>

                  <div className="p-4 transform transition-all duration-500 hover:scale-105">
                    <div
                      className={`text-4xl font-bold ${
                        examStats.averageScore >= 70
                          ? isDarkMode
                            ? "text-green-400"
                            : "text-green-500"
                          : isDarkMode
                          ? "text-red-400"
                          : "text-red-500"
                      }`}
                    >
                      {examStats.averageScore}%
                    </div>
                    <div
                      className={`text-sm ${
                        isDarkMode ? "text-primary-light" : "text-[#3949AB]"
                      } text-right rtl:text-right ltr:text-left`}
                    >
                      متوسط النتائج
                    </div>
                  </div>

                  <div className="p-4 transform transition-all duration-500 hover:scale-105">
                    <div
                      className={`text-4xl font-bold ${
                        isDarkMode ? "text-green-400" : "text-green-500"
                      }`}
                    >
                      {examStats.highestScore}%
                    </div>
                    <div
                      className={`text-sm ${
                        isDarkMode ? "text-primary-light" : "text-[#3949AB]"
                      } text-right rtl:text-right ltr:text-left`}
                    >
                      أعلى نتيجة
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and filters */}
          <div
            className={`${
              isDarkMode ? "bg-neutral-800" : "bg-white"
            } rounded-lg shadow-md mb-6 p-4 transform transition-all duration-300 hover:shadow-lg`}
          >
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="ابحث عن امتحان..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full py-2 px-8 rounded-md border text-right ${
                    isDarkMode
                      ? "bg-neutral-700 border-neutral-600 text-white placeholder-gray-400"
                      : "bg-[#F0F4F8] border-[#F0F4F8] text-[#37474F]"
                  } focus:outline-none focus:ring-2 focus:ring-primary-base transition-all duration-300`}
                />
                <div
                  className={`absolute right-3 top-2.5 ${
                    isDarkMode ? "text-gray-400" : "text-gray-400"
                  }`}
                >
                  <SearchIcon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className={`${
                    isDarkMode
                      ? "bg-primary-dark hover:bg-primary-base"
                      : "bg-[#3949AB] hover:bg-[#1A237E]"
                  } text-white px-4 py-2 rounded-md flex items-center transition-all duration-300 hover:shadow-lg transform hover:scale-105`}
                >
                  <FilterIcon className="mr-2 w-4 h-4" />
                  <span>تصفية</span>
                </button>

                <div
                  className={`flex border rounded-md overflow-hidden ${
                    isDarkMode ? "border-neutral-600" : "border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-2 ${
                      viewMode === "grid"
                        ? isDarkMode
                          ? "bg-primary-dark text-white"
                          : "bg-[#3949AB] text-white"
                        : isDarkMode
                        ? "bg-neutral-700 text-primary-light"
                        : "bg-[#F0F4F8] text-[#3949AB]"
                    } transition-colors duration-300`}
                  >
                    <GridViewIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-2 ${
                      viewMode === "list"
                        ? isDarkMode
                          ? "bg-primary-dark text-white"
                          : "bg-[#3949AB] text-white"
                        : isDarkMode
                        ? "bg-neutral-700 text-primary-light"
                        : "bg-[#F0F4F8] text-[#3949AB]"
                    } transition-colors duration-300`}
                  >
                    <ListViewIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Available exams section */}
          <div className="mb-8 animate-fadeIn">
            <div
              ref={availableExamsRef}
              className="flex items-center justify-between mb-4"
            >
              <span
                className={`${
                  isDarkMode ? "bg-primary-dark" : "bg-[#3949AB]"
                } text-white text-sm px-2 py-1 rounded-full`}
              >
                {mockExamsData.filter((e) => e.status !== "finished").length}
              </span>
              <h2
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-text-light" : "text-[#37474F]"
                } text-right`}
              >
                الامتحانات المتاحة
              </h2>
            </div>

            <div
              className={`grid ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              } gap-4`}
            >
              {mockExamsData
                .filter((exam) => exam.status !== "finished")
                .map((exam, index) => renderExamCard(exam, index))}
            </div>
          </div>

          {/* Completed exams section */}
          <div className="animate-fadeIn">
            <div
              ref={completedExamsRef}
              className="flex items-center justify-between mb-4"
            >
              <span
                className={`${
                  isDarkMode ? "bg-primary-dark" : "bg-[#3949AB]"
                } text-white text-sm px-2 py-1 rounded-full`}
              >
                {mockExamsData.filter((e) => e.status === "finished").length}
              </span>
              <h2
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-text-light" : "text-[#37474F]"
                } text-right`}
              >
                الامتحانات المكتملة
              </h2>
            </div>

            <div
              className={`grid ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              } gap-4`}
            >
              {mockExamsData
                .filter((exam) => exam.status === "finished")
                .map((exam, index) =>
                  renderExamCard(
                    exam,
                    index +
                      mockExamsData.filter((e) => e.status !== "finished")
                        .length
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyExamsPage;
