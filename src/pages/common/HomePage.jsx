// src/pages/common/HomePage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Navbar from "../../components/navigation/Navbar";
import HeroSection from "../../components/home/HeroSection";
// import UserCoursesSection from "../../components/home/UserCoursesSection"; // Removed to eliminate empty space
// import SubjectsSection from "../../components/home/SubjectsSection"; // Disabled after removing section
import FeaturedCoursesSection from "../../components/home/FeaturedCoursesSection";
import ExamsSection from "../../components/home/ExamsSection";
import { useExams } from "../../hooks/api/useExams";
import { useRealExamination } from "../../hooks/api/useRealExamination";
import HomeController from "../../controllers/HomeController";
import { FEATURED_COURSES } from "../../data/mockData";
import { debugFeaturedCourses } from "../../utils/debugHelper";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Debug flag - set to true to see debugging info in console
const DEBUG = true;

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  
  // Use the same hook as MyExamsPage for consistency
  const {
    availableExams,
    availableExamsLoading,
    availableExamsError,
    fetchAvailableExams
  } = useRealExamination();
  
  // Keep the old hook for fallback (can be removed later)
  const { 
    onlineExams, 
    loading: examsLoading, 
    error: examsError, 
    fetchOnlineExams 
  } = useExams();
  
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [userCourses, setUserCourses] = useState([]); // Removed with UserCoursesSection
  const isArabic = language === "ar";
  
  // Ref for page animations
  const pageRef = useRef(null);
  
  // Fetch home data from API when component mounts
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        if (DEBUG) {
          console.log('🔍 === DEBUGGING FEATURED COURSES ===');
          const debugHelper = debugFeaturedCourses();
          await debugHelper.runAllTests();
        }
        
        const result = await HomeController.getHomePageData();
        
        if (DEBUG) {
          console.log('Home API Response:', result);
        }
        
        if (result.success) {
          if (result.featuredCourses.success) {
            setFeaturedCourses(result.featuredCourses.data);
            console.log('✅ Featured courses set from API:', result.featuredCourses.data);
          } else {
            console.warn('Using mock featured courses due to API failure');
            setFeaturedCourses(FEATURED_COURSES);
            console.log('⚠️ Featured courses set from MOCK data:', FEATURED_COURSES);
          }
          
          if (result.categories.success) {
            setCategories(result.categories.data);
          }
          
          setError(null);
        } else {
          setError(result.error);
          console.warn('Using mock data due to API failure');
          setFeaturedCourses(FEATURED_COURSES);
          console.log('🛠️ Fallback: Featured courses set from MOCK data:', FEATURED_COURSES);
        }
      } catch (err) {
        console.error('Error fetching home page data:', err);
        setError('حدث خطأ أثناء جلب بيانات الصفحة الرئيسية');
        
        setFeaturedCourses(FEATURED_COURSES);
        console.log('🔥 Exception: Featured courses set from MOCK data:', FEATURED_COURSES);
      } finally {
        setIsInitialLoading(false);
      }
    };
    
    fetchHomeData();
  }, []);
  
  // Fetch user courses removed - no longer needed

  // Fetch available exams using the same method as MyExamsPage
  useEffect(() => {
    const loadAvailableExams = async () => {
      try {
        if (DEBUG) {
          console.log('🔍 Fetching available exams for HomePage using useRealExamination...');
        }
        
        await fetchAvailableExams(); // No parameters needed - will fetch all available
        
        if (DEBUG) {
          console.log('✅ Available exams fetched successfully for HomePage');
        }
      } catch (err) {
        console.error('Error fetching available exams:', err);
      }
    };
    
    loadAvailableExams();
  }, [fetchAvailableExams]);

  // Fetch online exams when component mounts (legacy - can be removed later)
  useEffect(() => {
    const loadOnlineExams = async () => {
      try {
        if (DEBUG) {
          console.log('🔍 Fetching legacy online exams for HomePage...');
        }
        
        await fetchOnlineExams();
        
        if (DEBUG) {
          console.log('✅ Legacy online exams fetched successfully');
        }
      } catch (err) {
        console.error('Error fetching legacy online exams:', err);
      }
    };
    
    loadOnlineExams();
  }, [fetchOnlineExams]);

  // Debug logging
  useEffect(() => {
    if (DEBUG) {
      console.log('🏠 === HomePage Debug Info ===');
      console.log('Language:', language);
      console.log('Is Arabic:', isArabic);
      console.log('Featured Courses:', featuredCourses);
      console.log('Available Exams Count:', availableExams ? availableExams.length : 0);
      console.log('Available Exams Data:', availableExams);
      console.log('Available Exams Loading:', availableExamsLoading);
      console.log('Available Exams Error:', availableExamsError);
      console.log('Legacy Online Exams Count:', onlineExams ? onlineExams.length : 0);
      console.log('Online Exams Data:', onlineExams);
      console.log('Exams Loading:', examsLoading);
      console.log('Exams Error:', examsError);
      console.log('Categories:', categories);
      // console.log('User Courses:', userCourses); // Removed
      console.log('=================================');
      
      // Show available exams info (limit to first 6 for home page)
      if (availableExams && availableExams.length > 0) {
        const homePageExams = availableExams.slice(0, 6);
        console.log('📊 [HomePage] Available exams that will be shown (first 6):', homePageExams);
        homePageExams.forEach((exam, index) => {
          console.log(`📋 [HomePage] Available Exam ${index + 1}/6:`, {
            id: exam.id,
            name: exam.name,
            status: exam.status,
            courseName: exam.course?.name,
            duration: exam.duration_formatted,
            numberOfQuestions: exam.question_number
          });
        });
      } else {
        console.log('⚠️ [HomePage] No available exams to display');
      }
      
      // Legacy online exams info
      if (onlineExams && onlineExams.length > 0) {
        console.log('📊 [HomePage] First 6 legacy exams that will be shown:', onlineExams.slice(0, 6));
        onlineExams.slice(0, 6).forEach((exam, index) => {
          console.log(`📋 [HomePage] Legacy Exam ${index + 1}/6:`, {
            id: exam.id,
            name: exam.name,
            status: exam.status,
            courseName: exam.courseName,
            duration: exam.duration,
            numberOfQuestions: exam.numberOfQuestions
          });
        });
      } else {
        console.log('⚠️ [HomePage] No legacy online exams to display');
      }
    }
  }, [language, isArabic, featuredCourses, availableExams, availableExamsLoading, availableExamsError, onlineExams, examsLoading, examsError, categories]);

  // Page-level animations
  useEffect(() => {
    let animationsCreated = false;
    
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!isReducedMotion) {
      animationsCreated = true;
      
      if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          gsap.to(window, {
            duration: 1, 
            scrollTo: {
              y: targetElement,
              offsetY: 80
            },
            ease: "power3.inOut"
          });
        }
      }
    }
    
    return () => {
      if (animationsCreated) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  // UI Strings
  const UI = {
    mainHeading: {
      en: "Discover your path to excellence in EDUCATION!",
      ar: "اكتشف طريقك للتميز في التعليم!"
    },
    subHeading: {
      en: "Whether you are a student, teacher, or professional seeking to develop your skills, LearnNova provides the tools and courses necessary for success.",
      ar: "سواء كنت طالباً، معلماً، أو محترفاً يسعى لتطوير مهاراته، ليرننوفا تقدم لك الأدوات والدورات اللازمة لتحقيق النجاح."
    },
    featuredCourses: {
      en: "Featured Courses",
      ar: "الدورات المميزة"
    },
    browseAllCourses: {
      en: "Browse All Courses",
      ar: "تصفح جميع الدورات"
    },
    upcomingExams: {
      en: "Available Exams",
      ar: "الاختبارات المتاحة"
    },
    viewAllExams: {
      en: "View All Exams",
      ar: "عرض جميع الاختبارات"
    },
    myCourses: {
      en: "My Courses",
      ar: "دوراتي"
    },
    continueLearning: {
      en: "Continue Learning",
      ar: "استكمال التعلم"
    },
    registerForExam: {
      en: "Register",
      ar: "التسجيل"
    },
    startExam: {
      en: "Start Now",
      ar: "ابدأ الآن"
    },
    viewResults: {
      en: "View Results",
      ar: "عرض النتائج"
    },
    searchPlaceholder: {
      en: "Search for courses or topics...",
      ar: "ابحث عن دورات أو مواضيع..."
    },
    featureAI: {
      en: "AI-Powered Support",
      ar: "دعم بالذكاء الاصطناعي"
    },
    featureTracking: {
      en: "Best Tracking System",
      ar: "أقوى نظام متابعة"
    },
    featurePath: {
      en: "Your Path to Success",
      ar: "طريقك للنجاح"
    },
    joinUs: {
      en: "Join Us!",
      ar: "انضم إلينا!"
    },
    signIn: {
      en: "Sign In",
      ar: "تسجيل الدخول"
    },
    register: {
      en: "Register",
      ar: "سجل مجاناً"
    },
    subjects: {
      en: "Academic Subjects",
      ar: "المواد الدراسية"
    },
    physics: {
      en: "Physics",
      ar: "الفيزياء"
    },
    chemistry: {
      en: "Chemistry",
      ar: "الكيمياء"
    },
    math: {
      en: "Mathematics",
      ar: "الرياضيات"
    },
    free: {
      en: "Free",
      ar: "مجاني"
    },
    exploreCourses: {
      en: "Explore Courses",
      ar: "استكشف الدورات"
    },
    onlineTests: {
      en: "Online Tests",
      ar: "الاختبارات عبر الإنترنت"
    },
    loading: {
      en: "Loading...",
      ar: "جاري التحميل..."
    },
    error: {
      en: "An error occurred while loading data. Please try again later.",
      ar: "حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى لاحقاً."
    }
  };

  // Get text helper function
  const getText = (textObj) => {
    if (!textObj || typeof textObj !== 'object') {
      return textObj || '';
    }
    
    return textObj[language] || textObj.en || '';
  };

  // Prepare translations for child components
  const translations = {
    mainHeading: getText(UI.mainHeading),
    subHeading: getText(UI.subHeading),
    featurePath: getText(UI.featurePath),
    featureTracking: getText(UI.featureTracking),
    featureAI: getText(UI.featureAI),
    exploreCourses: getText(UI.exploreCourses),
    onlineTests: getText(UI.onlineTests),
    myCourses: getText(UI.myCourses),
    continueLearning: getText(UI.continueLearning),
    subjects: getText(UI.subjects),
    physics: getText(UI.physics),
    chemistry: getText(UI.chemistry),
    math: getText(UI.math),
    free: getText(UI.free),
    featuredCourses: getText(UI.featuredCourses),
    upcomingExams: getText(UI.upcomingExams),
    registerForExam: getText(UI.registerForExam),
    startExam: getText(UI.startExam),
    viewResults: getText(UI.viewResults),
    loading: getText(UI.loading),
    error: getText(UI.error)
  };

  // Loading message for initial load only
  if (isInitialLoading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-background-dark text-text-light' : 'bg-background-light text-text-dark'}`}>
        <Navbar />
        <div className="pt-8"></div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-base mb-4"></div>
            <p className="text-lg">{translations.loading}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={pageRef}
      className={`min-h-screen ${isDarkMode ? 'bg-background-dark text-text-light' : 'bg-background-light text-text-dark'}`}
    >
      {/* Main Header */}
      <Navbar />
      
      {/* Add minimal space to prevent content from being hidden under the navbar */}
      <div className="pt-8"></div>
      
      {/* Error Message (if any) */}
      {error && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold mr-1">خطأ:</strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <HeroSection translations={translations} />

      {/* User's Courses Section - Completely removed to eliminate empty space */}
      {/* <UserCoursesSection userCourses={userCourses} translations={translations} /> */}

      {/* Subject Categories Section - Removed as requested by user */}
      {/* <SubjectsSection translations={translations} /> */}

      {/* Featured Courses Section */}
      <div id="featured-courses-wrapper">
        <FeaturedCoursesSection courses={featuredCourses} translations={translations} />
      </div>

      {/* Available Exams Section */}
      <div id="available-exams-section-wrapper">
        <ExamsSection 
          exams={availableExams && availableExams.length > 0 ? availableExams.slice(0, 6) : onlineExams.slice(0, 6)} 
          translations={translations} 
          loading={availableExamsLoading || examsLoading}
          error={availableExamsError || examsError}
        />
      </div>
    </div>
  );
};

export default HomePage;
