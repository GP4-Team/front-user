// pages/exams/MyExamsPage.jsx - Updated for Real APIs with Clean Design
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
import ExamList from "../../components/exams/ExamList";
import MotivationalMessage from "../../components/exams/MotivationalMessage";
import ExamTitlePreview from "../../components/admin/ExamTitlePreview";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const MyExamsPage = () => {
  const { isDarkMode } = useTheme();
  const { language, isRTL } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Use the new real examination hook
  const { 
    loading,
    error,
    statistics,
    statisticsLoading,
    statisticsError,
    availableExams,
    availableExamsLoading,
    availableExamsError,
    completedExams,
    completedExamsLoading,
    completedExamsError,
    pagination,
    summary,
    fetchAllExamData,
    refreshData,
    clearErrors
  } = useRealExamination();

  // State for UI controls
  const [favoriteExams, setFavoriteExams] = useState([]);
  const [statsVisible, setStatsVisible] = useState(true);
  const [showMotivationalMessage, setShowMotivationalMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  
  // Refs for animations
  const pageRef = useRef(null);
  const statsSectionRef = useRef(null);
  const availableExamsRef = useRef(null);
  const completedExamsRef = useRef(null);
  const examCardRefs = useRef([]);
  const motivationalMessageRef = useRef(null);

  // Motivational messages
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

  // Load exam data when component mounts
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('🎯 Loading exam data for user:', user.id);
      
      // تهيئة ترجمات أسماء الامتحانات
      import('../../utils/examTitleSetup').then(({ initializeExamTitleTranslations }) => {
        initializeExamTitleTranslations();
      });
      
      fetchAllExamData();
    }
  }, [isAuthenticated, user, fetchAllExamData]);

  // تحديث الترجمات عند تحميل البيانات الجديدة
  useEffect(() => {
    if (Array.isArray(availableExams) && availableExams.length > 0) {
      import('../../utils/examTitleSetup').then(({ addCustomSubjectsFromData }) => {
        addCustomSubjectsFromData(availableExams);
      });
    }
  }, [availableExams]);

  useEffect(() => {
    if (Array.isArray(completedExams) && completedExams.length > 0) {
      import('../../utils/examTitleSetup').then(({ addCustomSubjectsFromData }) => {
        addCustomSubjectsFromData(completedExams);
      });
    }
  }, [completedExams]);

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

  // Show motivational message
  useEffect(() => {
    const messageTimeout = setTimeout(() => {
      const randomMessage = motivationalMessages[language][
        Math.floor(Math.random() * motivationalMessages[language].length)
      ];
      setCurrentMessage(randomMessage);
      setShowMotivationalMessage(true);

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

    if (isMounted && pageRef.current) {
      try {
        gsap.fromTo(
          pageRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" }
        );

        if (statsSectionRef.current) {
          gsap.fromTo(
            statsSectionRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power3.out" }
          );
        }

        [availableExamsRef.current, completedExamsRef.current].forEach((section, index) => {
          if (section) {
            gsap.fromTo(
              section,
              { x: isRTL ? 30 : -30, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.5, delay: 0.3 + index * 0.1, ease: "power2.out" }
            );
          }
        });
      } catch (error) {
        console.error("Animation setup error:", error);
      }
    }

    return () => {
      isMounted = false;
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isDarkMode, isRTL]);

  // Helper functions
  const toggleFavorite = (examId) => {
    setFavoriteExams(prev =>
      prev.includes(examId)
        ? prev.filter(id => id !== examId)
        : [...prev, examId]
    );
  };

  const handleSelectExam = (exam) => {
    if (exam.status === "completed" || exam.status === "revision" || exam.status === "ended") {
      navigate(`/exams/${exam.id}/review`);
    } else if (exam.status === "unavailable" || exam.status === "none" || !exam.canTakeExam) {
      return;
    } else {
      // توجيه لصفحة الامتحان الجديدة
      navigate(`/exams/${exam.id}/take`);
    }
  };

  const handleRetry = () => {
    clearErrors();
    fetchAllExamData();
  };

  // Access translations
  const t = translations[language];

  // Auth required state
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
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

  // Loading state
  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Navbar />
        <div className="pt-20"></div>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
              {language === 'ar' ? 'جاري تحميل الامتحانات...' : 'Loading exams...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Critical error state
  if (error && !statistics && (!Array.isArray(availableExams) || availableExams.length === 0) && (!Array.isArray(completedExams) || completedExams.length === 0)) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
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
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Navbar />
      <div className="pt-20"></div>

      {/* Motivational message */}
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
          <ExamsHeader title={t.pageTitle || (language === 'ar' ? 'الامتحانات' : 'Exams')} />

          {/* Title Preview - for development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6">
              <ExamTitlePreview 
                examNames={[
                  ...Array.isArray(availableExams) ? availableExams.map(exam => exam.name).filter(Boolean) : [],
                  ...Array.isArray(completedExams) ? completedExams.map(exam => exam.name).filter(Boolean) : []
                ]}
              />
            </div>
          )}

          {/* Performance summary */}
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

          {/* Error notifications */}
          {(statisticsError || availableExamsError || completedExamsError) && (
            <div className="mb-6">
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
                      : 'These are server-side issues that need to be fixed by the development team. Please wait or contact technical support.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Available exams */}
          <div ref={availableExamsRef}>
            <ExamList 
              title={language === 'ar' ? 'الامتحانات المتاحة' : 'Available Exams'}
              exams={Array.isArray(availableExams) ? availableExams : []}
              viewMode="grid"
              toggleFavorite={toggleFavorite}
              handleSelectExam={handleSelectExam}
              favoriteExams={favoriteExams}
              translations={t}
              cardRefs={examCardRefs}
              loading={availableExamsLoading}
              error={availableExamsError}
              isOnlineExam={true}
            />
          </div>

          {/* Completed exams */}
          <div ref={completedExamsRef}>
            <ExamList 
              title={language === 'ar' ? 'الامتحانات المكتملة' : 'Completed Exams'}
              exams={Array.isArray(completedExams) ? completedExams : []}
              viewMode="grid"
              toggleFavorite={toggleFavorite}
              handleSelectExam={handleSelectExam}
              favoriteExams={favoriteExams}
              translations={t}
              cardRefs={examCardRefs}
              loading={completedExamsLoading}
              error={completedExamsError}
              pagination={pagination}
              summary={summary}
              isOnlineExam={true}
            />
          </div>

          {/* Debug info - معلومات التطوير - محذوفة */}
        </div>
      </div>
    </div>
  );
};

export default MyExamsPage;
