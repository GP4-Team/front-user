// src/pages/common/HomePage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import HeroSection from "../../components/home/HeroSection";
import UserCoursesSection from "../../components/home/UserCoursesSection";
import SubjectsSection from "../../components/home/SubjectsSection";
import FeaturedCoursesSection from "../../components/home/FeaturedCoursesSection";
import ExamsSection from "../../components/home/ExamsSection";
import { FEATURED_COURSES, TOP_EXAMS } from "../../data/mockData";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Debug flag - set to true to see debugging info in console
const DEBUG = true;

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const [userCourses, setUserCourses] = useState([]);
  const isArabic = language === "ar";
  
  // Check if TOP_EXAMS data exists
  const hasExamsData = Array.isArray(TOP_EXAMS) && TOP_EXAMS.length > 0;
  
  // Ref for page animations
  const pageRef = useRef(null);
  
  // Check if user is logged in on component mount
  useEffect(() => {
    // In a real app, this would check auth status from context
    if (isAuthenticated && user) {
      // Mock user courses for now
      const mockUserCourses = [
        {...FEATURED_COURSES[0], progress: 65},
        {...FEATURED_COURSES[2], progress: 32}
      ];
      setUserCourses(mockUserCourses);
    } else {
      setUserCourses([]);
    }
  }, [isAuthenticated, user]);

  // Component mount log for debugging
  useEffect(() => {
    if (DEBUG) {
      console.log('HomePage mounted');
      console.log('Language:', language);
      console.log('Is Arabic:', isArabic);
      console.log('Exams data available:', hasExamsData);
      console.log('TOP_EXAMS data:', TOP_EXAMS);
      console.log('TOP_EXAMS length:', TOP_EXAMS.length);
      console.log('FEATURED_COURSES data:', FEATURED_COURSES);
    }
  }, [hasExamsData, language, isArabic]);

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
      en: "Upcoming Exams",
      ar: "الاختبارات القادمة"
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
    viewResults: getText(UI.viewResults)
  };

  if (DEBUG) {
    console.log('Rendering HomePage with translations:', translations);
  }

  return (
    <div 
      ref={pageRef}
      className={`min-h-screen ${isDarkMode ? 'bg-background-dark text-text-light' : 'bg-background-light text-text-dark'}`}
    >
      {/* Hero Section */}
      <HeroSection translations={translations} />

      {/* User's Courses Section (if logged in) */}
      <UserCoursesSection userCourses={userCourses} translations={translations} />

      {/* Subject Categories Section */}
      <SubjectsSection translations={translations} />

      {/* Featured Courses Section */}
      <div id="featured-courses-wrapper">
        <FeaturedCoursesSection courses={FEATURED_COURSES} translations={translations} />
      </div>

      {/* Exams Section - removing conditional rendering to ensure it always appears */}
      <div id="exams-section-wrapper">
        <ExamsSection exams={TOP_EXAMS} translations={translations} />
      </div>
    </div>
  );
};

export default HomePage;