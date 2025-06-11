// pages/exams/MyExamsPage.jsx - Updated for Real APIs
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import { useRealExamination } from "../../hooks/api/useRealExamination";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import translations from "../../utils/translations";

// Import Navbar
import Navbar from "../../components/navigation/Navbar";

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
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Use the new real examination hook
  const { 
    // Main state
    loading,
    error,
    
    // Statistics
    statistics,
    statisticsLoading,
    statisticsError,
    
    // Available exams
    availableExams,
    availableExamsLoading,
    availableExamsError,
    
    // Completed exams
    completedExams,
    completedExamsLoading,
    completedExamsError,
    pagination,
    summary,
    
    // Actions
    fetchAllExamData,
    refreshData,
    clearErrors
  } = useRealExamination();

  // Refs for animations
  const pageRef = useRef(null);
  const statsSectionRef = useRef(null);
  const availableExamsRef = useRef(null);
  const completedExamsRef = useRef(null);
  const examCardRefs = useRef([]);

  // State for UI controls
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, available, completed
  const [sortBy, setSortBy] = useState("date"); // date, title, score
  const [sortDirection, setSortDirection] = useState("desc"); // asc, desc
  const [viewMode, setViewMode] = useState("grid"); // grid, list
  const [showFilters, setShowFilters] = useState(false);
  const [favoriteExams, setFavoriteExams] = useState([]);
  const [statsVisible, setStatsVisible] = useState(true);

  // State for motivational messages
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

  // Load exam data when component mounts or user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('🎯 Loading exam data for authenticated user:', user.id);
      fetchAllExamData();
    } else {
      console.log('⚠️ User not authenticated, skipping exam data load');
    }
  }, [isAuthenticated, user, fetchAllExamData]);

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

  // Save favorites when they change
  useEffect(() => {
    try {
      localStorage.setItem("favoriteExams", JSON.stringify(favoriteExams));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  }, [favoriteExams]);

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
    if (exam.status === "completed" || exam.status === "revision") {
      navigate(`/exams/${exam.id}/review`);
    } else if (exam.status === "unavailable" || exam.status === "none") {
      // Do nothing for unavailable exams
      return;
    } else {
      navigate(`/exams/${exam.id}`);
    }
  };

  const handleRetry = () => {
    clearErrors();
    fetchAllExamData();
  };

  // Access translations based on current language
  const t = translations[language];

  // If not authenticated, show auth required state
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-background-dark' : 'bg-[#F0F4F8]'}`}>
        <Navbar />
        <div className="pt-20"></div>
        <div className="flex items-center justify-center h-96">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-blue-500 text-6xl mb-4">🔐</div>
            <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {language === 'ar' ? 'تسجيل الدخول مطلوب' : 'Login Required'}
            </h2>
            <p className={`text-lg mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'ar' ? 'يجب تسجيل الدخول لعرض الامتحانات الخاصة بك' : 'Please login to view your exams'}
            </p>
            <button 
              onClick={() => navigate('/auth?mode=login')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-background-dark' : 'bg-[#F0F4F8]'}`}>
        <Navbar />
        <div className="pt-20"></div>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-base mx-auto mb-4"></div>
            <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
              {language === 'ar' ? 'جاري تحميل الامتحانات...' : 'Loading exams...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state (only for critical failures)
  if (error && !statistics && !availableExams.length && !completedExams.length) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-background-dark' : 'bg-[#F0F4F8]'}`}>
        <Navbar />
        <div className="pt-20"></div>
        <div className="flex items-center justify-center h-96">
          <div className="text-center max-w-2xl mx-auto p-6">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {language === 'ar' ? 'خطأ في الاتصال بالخادم' : 'Server Connection Error'}
            </h2>
            <p className={`text-lg mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'ar' ? 'لا يمكن الوصول إلى بيانات الامتحانات حالياً. يرجى المحاولة مرة أخرى أو الاتصال بالدعم الفني.' : 'Unable to load exam data from server. Please try again or contact technical support.'}
            </p>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <p className="text-sm text-red-700 dark:text-red-300 font-mono">
                {error}
              </p>
            </div>
            <div className="space-x-4">
              <button 
                onClick={handleRetry}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                {language === 'ar' ? 'إعادة المحاولة' : 'Try Again'}
              </button>
              <button 
                onClick={() => window.open('/exams-api-test', '_blank')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                {language === 'ar' ? 'اختبار الاتصال' : 'Test Connection'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={pageRef}
      className={`min-h-screen relative ${isRTL ? "rtl" : "ltr"} ${
        isDarkMode
          ? "bg-background-dark text-text-light dark-mode"
          : "bg-[#F0F4F8] text-[#37474F]"
      }`}
    >
      {/* الهيدر الأساسي */}
      <Navbar />
      
      {/* Add space to prevent content from being hidden under the navbar */}
      <div className="pt-20"></div>

      {/* Purple background at the top */}
      <PurpleBackground />
      
      {/* Educational pattern background */}
      <EducationalBackground />
      
      {/* Educational animations */}
      <EducationalAnimations />

      {/* Motivational message notification */}
      <MotivationalMessage 
        showMotivationalMessage={showMotivationalMessage}
        setShowMotivationalMessage={setShowMotivationalMessage}
        currentMessage={currentMessage}
        motivationalMessageRef={motivationalMessageRef}
      />

      {/* Main content */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Page header */}
          <ExamsHeader title={t.pageTitle} />

          {/* Performance summary section */}
          <div ref={statsSectionRef}>
            <PerformanceSummary 
              examStats={statistics}
              statsVisible={statsVisible}
              setStatsVisible={setStatsVisible}
              statsLoading={statisticsLoading}
              statsError={statisticsError}
              translations={t}
            />
          </div>

          {/* Error notifications for individual APIs */}
          {(statisticsError || availableExamsError || completedExamsError) && (
            <div className="mb-6 space-y-2">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="text-yellow-600 dark:text-yellow-400 mr-3">⚠️</div>
                  <h3 className="font-medium text-yellow-800 dark:text-yellow-200">
                    {language === 'ar' ? 'مشاكل في تحميل بعض البيانات' : 'Some Data Loading Issues'}
                  </h3>
                </div>
                <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  {statisticsError && (
                    <p>• {language === 'ar' ? 'الإحصائيات:' : 'Statistics:'} {statisticsError}</p>
                  )}
                  {availableExamsError && (
                    <p>• {language === 'ar' ? 'الامتحانات المتاحة:' : 'Available Exams:'} {availableExamsError}</p>
                  )}
                  {completedExamsError && (
                    <p>• {language === 'ar' ? 'الامتحانات المكتملة:' : 'Completed Exams:'} {completedExamsError}</p>
                  )}
                </div>
                <div className="mt-3 pt-3 border-t border-yellow-200 dark:border-yellow-700">
                  <p className="text-xs text-yellow-600 dark:text-yellow-400">
                    {language === 'ar' 
                      ? 'هذه مشاكل في الخادم يجب حلها من فريق التطوير. يرجى الانتظار أو الاتصال بالدعم الفني.' 
                      : 'These are server-side issues that need to be fixed by the development team. Please wait or contact technical support.'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

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
              title={t.availableExams || (language === 'ar' ? 'الامتحانات المتاحة' : 'Available Exams')}
              exams={availableExams}
              viewMode={viewMode}
              toggleFavorite={toggleFavorite}
              handleSelectExam={handleSelectExam}
              favoriteExams={favoriteExams}
              translations={t}
              cardRefs={examCardRefs}
              loading={availableExamsLoading}
              error={availableExamsError}
              isRealExam={true}
            />
          </div>

          {/* Completed exams section */}
          <div ref={completedExamsRef}>
            <ExamList 
              title={t.completedExamsTitle || (language === 'ar' ? 'الامتحانات المكتملة' : 'Completed Exams')}
              exams={completedExams}
              viewMode={viewMode}
              toggleFavorite={toggleFavorite}
              handleSelectExam={handleSelectExam}
              favoriteExams={favoriteExams}
              translations={t}
              cardRefs={examCardRefs}
              loading={completedExamsLoading}
              error={completedExamsError}
              pagination={pagination}
              summary={summary}
              isRealExam={true}
            />
          </div>

          {/* Debug information in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold mb-2">Debug Information:</h3>
              <div className="text-sm space-y-1">
                <div>Statistics loaded: {statistics ? 'Yes' : 'No'}</div>
                <div>Available exams: {availableExams.length}</div>
                <div>Completed exams: {completedExams.length}</div>
                <div>Loading states: {JSON.stringify({loading, statisticsLoading, availableExamsLoading, completedExamsLoading})}</div>
                <div>Errors: {JSON.stringify({error, statisticsError, availableExamsError, completedExamsError})}</div>
                <div>User authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>
                <div>User ID: {user?.id || 'N/A'}</div>
                <div>Auth token present: {localStorage.getItem('accessToken') ? 'Yes' : 'No'}</div>
                <div>Token length: {localStorage.getItem('accessToken')?.length || 0} chars</div>
                <div>User data in localStorage: {localStorage.getItem('userData') ? 'Yes' : 'No'}</div>
                <div>API Base URL: {process.env.REACT_APP_API_BASE_URL || 'https://academy1.gp-app.tafra-tech.com/api'}</div>
                
                {/* Quick test button */}
                <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                  <button 
                    onClick={() => window.open('/exams-api-test', '_blank')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
                  >
                    🧪 Open API Test Console
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyExamsPage;