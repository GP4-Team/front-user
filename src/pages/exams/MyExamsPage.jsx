// pages/exams/MyExamsPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useExams } from "../../hooks/api/useExams";
import Navbar from "../../components/navigation/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import translations from "../../utils/translations";

// Import custom components
import ExamsHeader from "../../components/exams/ExamsHeader";
import PerformanceSummary from "../../components/exams/PerformanceSummary";
import SearchBar from "../../components/exams/SearchBar";
import ExamList from "../../components/exams/ExamList";
import MotivationalMessage from "../../components/exams/MotivationalMessage";
import PurpleBackground from "../../components/exams/PurpleBackground";
import EducationalBackground from "../../components/exams/EducationalBackground";
import EducationalAnimations from "../../components/exams/EducationalAnimations";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Debug flag for logging
const DEBUG = true;

const MyExamsPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, isRTL, toggleLanguage } = useLanguage();
  const navigate = useNavigate();

  // Use the new online exams hook
  const { 
    onlineExams, 
    loading, 
    error, 
    fetchOnlineExams 
  } = useExams();

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

  // Stats calculation from real data
  const [examStats, setExamStats] = useState({
    totalExams: 0,
    completedExams: 0,
    averageScore: 0,
    highestScore: 0,
    pendingExams: 0,
  });

  // Load exams data from API
  useEffect(() => {
    const loadExams = async () => {
      try {
        await fetchOnlineExams();
      } catch (err) {
        console.error('Error loading exams:', err);
      }
    };

    loadExams();
  }, [fetchOnlineExams]);

  // Calculate stats from real exam data
  useEffect(() => {
    if (onlineExams && onlineExams.length > 0) {
      const completed = onlineExams.filter(exam => 
        exam.status === 'revision' || exam.lastAttempt
      );
      
      const scores = completed
        .map(exam => exam.bestScore || exam.lastAttempt?.score || 0)
        .filter(score => score > 0);
      
      const avgScore = scores.length > 0
        ? scores.reduce((sum, score) => sum + score, 0) / scores.length
        : 0;
      
      const highest = scores.length > 0 ? Math.max(...scores) : 0;
      
      setExamStats({
        totalExams: onlineExams.length,
        completedExams: completed.length,
        averageScore: Math.round(avgScore),
        highestScore: highest,
        pendingExams: onlineExams.filter(exam => 
          exam.status === 'start' || exam.status === 'continue' || exam.status === 'retry'
        ).length,
      });
    }
  }, [onlineExams]);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem("favoriteExams");
      if (savedFavorites) {
        setFavoriteExams(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
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

  // Motivational messages in both Arabic and English
  const motivationalMessages = {
    ar: [
      "النجاح رحلة وليس وجهة!",
      "التعلم هو الكنز الذي يتبعك أينما ذهبت!",
      "الاختبارات فرصة لإظهار ما تعلمته!",
      "مع كل تحدي تصبح أقوى!",
      "جهد اليوم هو نجاح الغد!",
      "أنت على بعد خطوة من تحقيق أهدافك!",
    ],
    en: [
      "Success is a journey, not a destination!",
      "Learning is the treasure that will follow you everywhere!",
      "Tests are opportunities to show what you've learned!",
      "With every challenge, you become stronger!",
      "Today's effort is tomorrow's success!",
      "You're just one step away from achieving your goals!",
    ],
  };

  // Display a motivational message after a delay
  useEffect(() => {
    // Show motivational message after 3 seconds
    const messageTimeout = setTimeout(() => {
      const randomMessage =
        motivationalMessages[language][
          Math.floor(Math.random() * motivationalMessages[language].length)
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
  }, [language]);

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

  const handleSelectExam = (exam) => {
    if (exam.status === "revision") {
      navigate(`/exams/${exam.id}/review`);
    } else if (exam.status === "unavailable" || exam.status === "none") {
      // Do nothing for unavailable exams
      return;
    } else {
      navigate(`/exams/${exam.id}`);
    }
  };

  // Access translations based on current language
  const t = translations[language];

  // Filter exams for different sections from real data
  const availableExams = onlineExams ? onlineExams.filter(exam => 
    exam.status === 'start' || exam.status === 'continue' || exam.status === 'retry'
  ) : [];
  
  const completedExams = onlineExams ? onlineExams.filter(exam => 
    exam.status === 'revision' || exam.lastAttempt
  ) : [];

  // Show loading state
  if (loading) {
    return (
      <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-background-dark' : 'bg-[#F0F4F8]'}`}>
        <Navbar />
        <div className="mt-16 flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-base mx-auto mb-4"></div>
            <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
              {language === 'ar' ? 'جاري تحميل الامتحانات...' : 'Loading exams...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-background-dark' : 'bg-[#F0F4F8]'}`}>
        <Navbar />
        <div className="mt-16 flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {language === 'ar' ? 'خطأ في تحميل الامتحانات' : 'Error Loading Exams'}
            </h2>
            <p className={`text-lg mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {error}
            </p>
            <button 
              onClick={() => fetchOnlineExams()}
              className="bg-primary-base hover:bg-primary-dark text-white px-6 py-2 rounded-lg"
            >
              {language === 'ar' ? 'إعادة المحاولة' : 'Try Again'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={pageRef}
      className={`flex flex-col min-h-screen relative ${isRTL ? "rtl" : "ltr"} ${
        isDarkMode
          ? "bg-background-dark text-text-light dark-mode"
          : "bg-[#F0F4F8] text-[#37474F]"
      }`}
    >
      {/* Purple background at the top */}
      <PurpleBackground />
      
      {/* Educational pattern background */}
      <EducationalBackground />
      
      {/* Educational animations */}
      <EducationalAnimations />

      {/* Navbar/Header */}
      <Navbar />

      {/* Motivational message notification */}
      <MotivationalMessage 
        showMotivationalMessage={showMotivationalMessage}
        setShowMotivationalMessage={setShowMotivationalMessage}
        currentMessage={currentMessage}
        motivationalMessageRef={motivationalMessageRef}
      />

      {/* Main content with top margin to account for fixed navbar */}
      <div className="mt-16 flex-grow relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Page header */}
          <ExamsHeader title={t.pageTitle} />

          {/* Performance summary section */}
          <div ref={statsSectionRef}>
            <PerformanceSummary 
              examStats={examStats}
              statsVisible={statsVisible}
              setStatsVisible={setStatsVisible}
              translations={t}
            />
          </div>

          {/* Search and filters */}
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            viewMode={viewMode}
            setViewMode={setViewMode}
            setShowFilters={setShowFilters}
            translations={t}
          />

          {/* Available exams section */}
          <div ref={availableExamsRef}>
            <ExamList 
              title={t.availableExams}
              exams={availableExams}
              viewMode={viewMode}
              toggleFavorite={toggleFavorite}
              handleSelectExam={handleSelectExam}
              favoriteExams={favoriteExams}
              translations={t}
              cardRefs={examCardRefs}
              isOnlineExam={true}
            />
          </div>

          {/* Completed exams section */}
          <div ref={completedExamsRef}>
            <ExamList 
              title={t.completedExamsTitle}
              exams={completedExams}
              viewMode={viewMode}
              toggleFavorite={toggleFavorite}
              handleSelectExam={handleSelectExam}
              favoriteExams={favoriteExams}
              translations={t}
              cardRefs={examCardRefs}
              isOnlineExam={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyExamsPage;
