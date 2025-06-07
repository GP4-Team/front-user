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
import UserCoursesSection from "../../components/home/UserCoursesSection";
import SubjectsSection from "../../components/home/SubjectsSection";
import FeaturedCoursesSection from "../../components/home/FeaturedCoursesSection";
import ExamsSection from "../../components/home/ExamsSection";
import { useExams } from "../../hooks/api/useExams";
import HomeController from "../../controllers/HomeController";
import { FEATURED_COURSES } from "../../data/mockData"; // للدعم في حالة فشل الـAPI
import { debugFeaturedCourses } from "../../utils/debugHelper"; // Debug helper

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Debug flag - set to true to see debugging info in console
const DEBUG = true;

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  
  // Use the new online exams hook
  const { 
    onlineExams, 
    loading: examsLoading, 
    error: examsError, 
    fetchOnlineExams 
  } = useExams();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const isArabic = language === "ar";
  
  // Ref for page animations
  const pageRef = useRef(null);
  
  // جلب بيانات الهوم من الـAPI عند تحميل المكون
  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        // إضافة debug لفحص المشكلة
        if (DEBUG) {
          console.log('🔍 === DEBUGGING FEATURED COURSES ===');
          const debugHelper = debugFeaturedCourses();
          await debugHelper.runAllTests();
        }
        
        // استدعاء الخدمة لجلب بيانات الصفحة الرئيسية
        const result = await HomeController.getHomePageData();
        
        if (DEBUG) {
          console.log('Home API Response:', result);
        }
        
        if (result.success) {
          // تعيين البيانات إذا تم جلبها بنجاح
          if (result.featuredCourses.success) {
            setFeaturedCourses(result.featuredCourses.data);
            console.log('✅ Featured courses set from API:', result.featuredCourses.data);
          } else {
            // في حالة فشل جلب الدورات المميزة، استخدم البيانات الوهمية
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
          // في حالة فشل الـAPI، استخدم البيانات الوهمية
          console.warn('Using mock data due to API failure');
          setFeaturedCourses(FEATURED_COURSES);
          console.log('🛠️ Fallback: Featured courses set from MOCK data:', FEATURED_COURSES);
        }
      } catch (err) {
        console.error('Error fetching home page data:', err);
        setError('حدث خطأ أثناء جلب بيانات الصفحة الرئيسية');
        
        // في حالة حدوث استثناء، استخدم البيانات الوهمية
        setFeaturedCourses(FEATURED_COURSES);
        console.log('🔥 Exception: Featured courses set from MOCK data:', FEATURED_COURSES);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHomeData();
  }, []);
  
  // جلب دورات المستخدم إذا كان مسجل دخول
  useEffect(() => {
    const fetchUserCourses = async () => {
      if (isAuthenticated && user) {
        try {
          // استدعاء خدمة دورات المستخدم
          const result = await HomeController.getUserCoursesData();
          
          if (DEBUG) {
            console.log('User Courses API Response:', result);
          }
          
          if (result.success) {
            setUserCourses(result.data);
          } else {
            // في حالة فشل جلب دورات المستخدم، استخدم البيانات الوهمية
            console.warn('Using mock user courses due to API failure');
            const mockUserCourses = [
              {...FEATURED_COURSES[0], progress: 65},
              {...FEATURED_COURSES[2], progress: 32}
            ];
            setUserCourses(mockUserCourses);
          }
        } catch (err) {
          console.error('Error fetching user courses:', err);
          
          // في حالة حدوث استثناء، استخدم البيانات الوهمية
          const mockUserCourses = [
            {...FEATURED_COURSES[0], progress: 65},
            {...FEATURED_COURSES[2], progress: 32}
          ];
          setUserCourses(mockUserCourses);
        }
      } else {
        setUserCourses([]);
      }
    };
    
    fetchUserCourses();
  }, [isAuthenticated, user]);

  // جلب الامتحانات الجديدة عند تحميل المكون
  useEffect(() => {
    const loadOnlineExams = async () => {
      try {
        if (DEBUG) {
          console.log('🔍 Fetching online exams for HomePage...');
        }
        
        // جلب الامتحانات الاونلاين (بدون معاملات خاصة في البداية)
        await fetchOnlineExams();
        
        if (DEBUG) {
          console.log('✅ Online exams fetched successfully');
        }
      } catch (err) {
        console.error('Error fetching online exams:', err);
        // الخطأ يُدار بالفعل في الhook
      }
    };
    
    loadOnlineExams();
  }, []); // إزالة dependency المشكوك فيه

  // تسجيل بيانات للتصحيح
  useEffect(() => {
    if (DEBUG) {
      console.log('🏠 === HomePage Debug Info ===');
      console.log('Language:', language);
      console.log('Is Arabic:', isArabic);
      console.log('Featured Courses:', featuredCourses);
      console.log('Online Exams Count:', onlineExams ? onlineExams.length : 0);
      console.log('Online Exams Data:', onlineExams);
      console.log('Exams Loading:', examsLoading);
      console.log('Exams Error:', examsError);
      console.log('Categories:', categories);
      console.log('User Courses:', userCourses);
      console.log('=================================');
      
      // Additional debugging for ExamsSection
      if (onlineExams && onlineExams.length > 0) {
        console.log('📊 [HomePage] First 3 exams that will be shown:', onlineExams.slice(0, 3));
        onlineExams.slice(0, 3).forEach((exam, index) => {
          console.log(`📋 [HomePage] Exam ${index + 1}:`, {
            id: exam.id,
            name: exam.name,
            status: exam.status,
            courseName: exam.courseName,
            duration: exam.duration,
            numberOfQuestions: exam.numberOfQuestions
          });
        });
      } else {
        console.log('⚠️ [HomePage] No online exams to display');
      }
    }
  }, [language, isArabic, featuredCourses, onlineExams, examsLoading, examsError, categories, userCourses]);

  // Page-level animations
  useEffect(() => {
    let animationsCreated = false;
    
    // Limit animations if needed for performance
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Only create animations if not in reduced motion mode
    if (!isReducedMotion) {
      animationsCreated = true;
      
      // Smooth scroll to section when URL has #section
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
      // Clean up all scroll triggers if we created animations
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
      en: "Whether you are a student, teacher, or professional seeking to develop your skills, Eduara provides the tools and courses necessary for success.",
      ar: "سواء كنت طالباً، معلماً، أو محترفاً يسعى لتطوير مهاراته، اديورا تقدم لك الأدوات والدورات اللازمة لتحقيق النجاح."
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
      en: "Online Exams",
      ar: "الاختبارات الإلكترونية"
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
    // Check if textObj is undefined or not an object
    if (!textObj || typeof textObj !== 'object') {
      return textObj || '';
    }
    
    // Return the appropriate language version or fallback
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

  // رسالة التحميل - إظهار التحميل فقط إذا كانت البيانات الأساسية قيد التحميل
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-background-dark text-text-light' : 'bg-background-light text-text-dark'}`}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-base mb-4"></div>
          <p className="text-lg">{translations.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={pageRef}
      className={`min-h-screen ${isDarkMode ? 'bg-background-dark text-text-light' : 'bg-background-light text-text-dark'}`}
    >
      {/* Using the same Navbar component as in the courses page */}
      <Navbar />
      
      {/* Add space to prevent content from being hidden under the navbar */}
      <div className="pt-16"></div>
      
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

      {/* User's Courses Section (if logged in) */}
      {userCourses.length > 0 && (
        <UserCoursesSection userCourses={userCourses} translations={translations} />
      )}

      {/* Subject Categories Section */}
      <SubjectsSection translations={translations} />

      {/* Featured Courses Section */}
      <div id="featured-courses-wrapper">
        <FeaturedCoursesSection courses={featuredCourses} translations={translations} />
      </div>

      {/* Online Exams Section - استخدام الامتحانات الجديدة */}
      <div id="online-exams-section-wrapper">
        <ExamsSection 
          exams={onlineExams} 
          translations={translations} 
          loading={examsLoading}
          error={examsError}
        />
      </div>
    </div>
  );
};

export default HomePage;
