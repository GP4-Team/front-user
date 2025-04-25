// src/pages/common/HomePage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import Navbar from "../../components/navigation/Navbar"; // Import the Navbar component

// Import icons
import { 
  Search, 
  Book, 
  Flask, 
  Calculator, 
  ChevronLeft, 
  ChevronRight,
  Star,
  Clock,
  Filter,
  Users,
  Award,
  Atom,
  Beaker,
  PieChart,
  Dna,
  Medal
} from "lucide-react";

// Mock courses data for the homepage
const FEATURED_COURSES = [
  {
    id: "physics-mechanics",
    category: {
      en: "Physics",
      ar: "الفيزياء"
    },
    title: {
      en: "Mechanics Fundamentals",
      ar: "أساسيات الميكانيكا"
    },
    level: {
      en: "Secondary 2nd Year",
      ar: "الصف الثاني الثانوي"
    },
    instructor: {
      en: "Dr. Ahmed Shawky",
      ar: "د. أحمد شوقي"
    },
    rating: 4.9,
    students: 1240,
    image: "/api/placeholder/400/225",
    isFeatured: true,
    price: {
      amount: 0,
      currency: "EGP"
    },
    badge: {
      en: "Popular",
      ar: "الأكثر رواجاً"
    },
    badgeColor: "#3949AB",
    progress: 0
  },
  {
    id: "chemistry-organic",
    category: {
      en: "Chemistry",
      ar: "الكيمياء"
    },
    title: {
      en: "Organic Chemistry",
      ar: "الكيمياء العضوية"
    },
    level: {
      en: "Secondary 3rd Year",
      ar: "الصف الثالث الثانوي"
    },
    instructor: {
      en: "Dr. Laila Mahmoud",
      ar: "د. ليلى محمود"
    },
    rating: 4.8,
    students: 890,
    image: "/api/placeholder/400/225",
    isFeatured: true,
    price: {
      amount: 240,
      currency: "EGP"
    },
    badge: {
      en: "Advanced",
      ar: "متقدم"
    },
    badgeColor: "#FFC107",
    progress: 0
  },
  {
    id: "math-calculus",
    category: {
      en: "Mathematics",
      ar: "الرياضيات"
    },
    title: {
      en: "Calculus Fundamentals",
      ar: "أساسيات التفاضل والتكامل"
    },
    level: {
      en: "Secondary 3rd Year",
      ar: "الصف الثالث الثانوي"
    },
    instructor: {
      en: "Dr. Mostafa Kamel",
      ar: "د. مصطفى كامل"
    },
    rating: 5.0,
    students: 1580,
    image: "/api/placeholder/400/225",
    isFeatured: true,
    price: {
      amount: 350,
      currency: "EGP"
    },
    badge: {
      en: "Bestseller",
      ar: "الأكثر مبيعاً"
    },
    badgeColor: "#4CAF50",
    progress: 0
  },
  {
    id: "physics-electricity",
    category: {
      en: "Physics",
      ar: "الفيزياء"
    },
    title: {
      en: "Electricity & Magnetism",
      ar: "الكهرباء والمغناطيسية"
    },
    level: {
      en: "Secondary 3rd Year",
      ar: "الصف الثالث الثانوي"
    },
    instructor: {
      en: "Dr. Karim Hassan",
      ar: "د. كريم حسن"
    },
    rating: 4.7,
    students: 960,
    image: "/api/placeholder/400/225",
    isFeatured: true,
    price: {
      amount: 280,
      currency: "EGP"
    },
    badge: null,
    badgeColor: "",
    progress: 0
  }
];

const TOP_EXAMS = [
  {
    id: "exam-physics-mechanics",
    title: {
      en: "Mechanics Practice Exam",
      ar: "اختبار تدريبي - الميكانيكا"
    },
    subject: {
      en: "Physics",
      ar: "الفيزياء"
    },
    level: {
      en: "Secondary 2nd Year",
      ar: "الصف الثاني الثانوي"
    },
    duration: {
      en: "60 min",
      ar: "٦٠ دقيقة"
    },
    questionsCount: 40,
    status: "upcoming", // upcoming, active, completed
    date: {
      en: "April 25, 2025",
      ar: "٢٥ أبريل ٢٠٢٥"
    }
  },
  {
    id: "exam-chemistry-organic",
    title: {
      en: "Organic Chemistry Test",
      ar: "اختبار الكيمياء العضوية"
    },
    subject: {
      en: "Chemistry",
      ar: "الكيمياء"
    },
    level: {
      en: "Secondary 3rd Year",
      ar: "الصف الثالث الثانوي"
    },
    duration: {
      en: "90 min",
      ar: "٩٠ دقيقة"
    },
    questionsCount: 50,
    status: "active", // upcoming, active, completed
    date: {
      en: "Available Now",
      ar: "متاح الآن"
    }
  },
  {
    id: "exam-math-calculus",
    title: {
      en: "Calculus Midterm",
      ar: "امتحان منتصف الفصل - التفاضل والتكامل"
    },
    subject: {
      en: "Mathematics",
      ar: "الرياضيات"
    },
    level: {
      en: "Secondary 3rd Year",
      ar: "الصف الثالث الثانوي"
    },
    duration: {
      en: "120 min",
      ar: "١٢٠ دقيقة"
    },
    questionsCount: 60,
    status: "completed", // upcoming, active, completed
    date: {
      en: "April 10, 2025",
      ar: "١٠ أبريل ٢٠٢٥"
    }
  }
];

// Get subject icon for each category
const getSubjectIcon = (category, size = 24) => {
  if (category.toLowerCase().includes("physics") || 
      category.includes("فيزياء")) {
    return <Atom size={size} />;
  } else if (category.toLowerCase().includes("chemistry") || 
            category.includes("كيمياء")) {
    return <Beaker size={size} />;
  } else if (category.toLowerCase().includes("math") || 
            category.includes("رياضيات")) {
    return <Calculator size={size} />;
  } else if (category.toLowerCase().includes("biology") || 
            category.includes("أحياء")) {
    return <Dna size={size} />;
  } else {
    return <Book size={size} />;
  }
};

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { language, toggleLanguage, isRTL } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();
  const [userCourses, setUserCourses] = useState([]);
  const isArabic = language === "ar";
  
  // Check if user is logged in on component mount
  useEffect(() => {
    // In a real app, this would check auth token, session, etc.
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
    
    // If user is logged in, fetch their courses
    if (token) {
      // Mock user courses for now
      const mockUserCourses = [
        {...FEATURED_COURSES[0], progress: 65},
        {...FEATURED_COURSES[2], progress: 32}
      ];
      setUserCourses(mockUserCourses);
    }
  }, []);

  // Set RTL direction based on language
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [isRTL, language]);

  // Get text in current language
  const getText = (textObj) => {
    // Check if textObj is undefined or not an object
    if (!textObj || typeof textObj !== 'object') {
      return textObj || '';
    }
    
    // Return the appropriate language version or fallback
    return textObj[language] || textObj.en || '';
  };

  // UI Strings
  const UI = {
    mainHeading: {
      en: "Discover your path to Eduara in EDUCATION!",
      ar: "اكتشف طريقك لـ اديورا في التعليم!"
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
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-[#f5f7fa] text-[#37474F]'} ${isRTL ? 'font-tajawal' : ''}`}>
      {/* Header/Navbar */}
      <Navbar />

      {/* <header className={`sticky top-0 z-50 py-3 px-6 ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-[#3949AB]' : 'bg-blue-100'} mr-2`}>
              <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-[#3949AB]'}`}>E</span>
            </div>
            <div className="flex items-baseline">
              <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>اديورا</span>
              <span className={`text-lg font-medium ${isDarkMode ? 'text-blue-400' : 'text-[#3949AB]'} ml-1`}></span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <Link to="/courses" className={`font-medium text-sm ${isDarkMode ? 'text-gray-200 hover:text-white' : 'text-gray-600 hover:text-[#3949AB]'} transition-colors`}>
              {isArabic ? 'المراحل الدراسية' : 'Educational Stages'}
            </Link>
            <Link to="/subjects" className={`font-medium text-sm ${isDarkMode ? 'text-gray-200 hover:text-white' : 'text-gray-600 hover:text-[#3949AB]'} transition-colors`}>
              {isArabic ? 'المواد الدراسية' : 'Subjects'}
            </Link>
            <Link to="/instructions" className={`font-medium text-sm ${isDarkMode ? 'text-gray-200 hover:text-white' : 'text-gray-600 hover:text-[#3949AB]'} transition-colors`}>
              {isArabic ? 'التعليمات' : 'Instructions'}
            </Link>
            <Link to="/leaderboard" className={`font-medium text-sm ${isDarkMode ? 'text-gray-200 hover:text-white' : 'text-gray-600 hover:text-[#3949AB]'} transition-colors`}>
              {isArabic ? 'لائحة الصدارة' : 'Leaderboard'}
            </Link>
          </nav>

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className={`relative hidden md:block ${isDarkMode ? 'bg-[#333]' : 'bg-gray-100'} rounded-full overflow-hidden px-3 py-1.5`}>
              <div className="flex items-center">
                <Search size={16} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <input 
                  type="text" 
                  placeholder={getText(UI.searchPlaceholder)} 
                  className={`${isDarkMode ? 'bg-[#333] text-white' : 'bg-gray-100 text-gray-800'} text-sm border-none outline-none w-44`}
                />
              </div>
            </div>

            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-[#333] text-gray-200' : 'bg-gray-100 text-gray-700'}`}
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <circle cx="12" cy="12" r="4" />
                  <path strokeLinecap="round" d="M12 2v2m0 16v2m-8-10H2m20 0h-2m-4.55-5.45L14.17 4.4m-4.34 14.1L6.83 19.6m11.32-9.1l1.2-1.2m-14.1 4.34l-1.2 1.2" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>
            
            <button 
              onClick={toggleLanguage}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-[#333] text-gray-200' : 'bg-gray-100 text-gray-700'}`}
            >
              {isArabic ? 'EN' : 'عربي'}
            </button>
            
            {isLoggedIn ? (
              <Link to="/profile">
                <div className="h-9 w-9 bg-[#3949AB] rounded-full flex items-center justify-center text-white">
                  <span className="font-bold">أ</span>
                </div>
              </Link>
            ) : (
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Link to="/auth?mode=login" className={`${isDarkMode ? 'text-blue-400' : 'text-[#3949AB]'} text-sm font-medium px-3 py-1.5 rounded-md border ${isDarkMode ? 'border-blue-400' : 'border-[#3949AB]'}`}>
                  {getText(UI.signIn)}
                </Link>
                <Link to="/auth?mode=register" className="bg-[#FFC107] text-[#37474F] text-sm font-medium px-3 py-1.5 rounded-md">
                  {getText(UI.register)}
                </Link>
              </div>
            )}
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className={`pt-16 relative overflow-hidden h-screen flex items-center ${isDarkMode ? 'bg-[#121212]' : 'bg-gradient-to-br from-[#f5f7fa] via-blue-50 to-[#f0f4f8]'}`}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className={`absolute top-20 right-[20%] w-32 h-32 rounded-full ${isDarkMode ? 'bg-primary-dark' : 'bg-primary-light'} filter blur-3xl opacity-20 animate-pulse-slow`}></div>
          <div className={`absolute bottom-10 left-[10%] w-40 h-40 rounded-full ${isDarkMode ? 'bg-accent/50' : 'bg-accent/30'} filter blur-3xl opacity-20 animate-pulse-slower`}></div>
          <div className={`absolute top-[40%] left-[30%] w-24 h-24 rounded-full ${isDarkMode ? 'bg-primary-light' : 'bg-primary-base/20'} filter blur-3xl opacity-10 animate-float-slow`}></div>
          <div className={`absolute top-[20%] left-[60%] w-16 h-16 rounded-full ${isDarkMode ? 'bg-accent/50' : 'bg-accent/20'} filter blur-xl opacity-20 animate-float`}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Hero Content */}
            <div className="md:w-7/12 text-center md:text-right rtl:md:text-left">
              <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                {getText(UI.mainHeading)}
              </h1>
              <div className="w-24 h-1.5 bg-[#FFC107] mx-auto md:mx-0 md:rtl:ml-auto md:ltr:mr-0 my-6 rounded-full"></div>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-xl mx-auto md:mx-0 md:rtl:ml-auto md:ltr:mr-0`}>
                {getText(UI.subHeading)}
              </p>

              <div className="mt-8 flex flex-wrap gap-4 justify-start w-full">
                <Link to="/courses" className="bg-[#3949AB] hover:bg-[#303F9F] text-white font-medium py-3 px-6 rounded-lg shadow-sm flex items-center transition-transform hover:-translate-y-0.5">
                  {isArabic ? 'استكشف الدورات' : 'Explore Courses'}
                  {isRTL ? (
                    <ChevronLeft size={18} className="mr-1 rtl:ml-1" />
                  ) : (
                    <ChevronRight size={18} className="ml-1 rtl:mr-1" />
                  )}
                </Link>
                <Link to="/exams" className="bg-white dark:bg-[#333] hover:bg-gray-50 dark:hover:bg-[#444] text-[#37474F] dark:text-white font-medium py-3 px-6 rounded-lg shadow-sm flex items-center transition-transform hover:-translate-y-0.5">
                  {isArabic ? 'الاختبارات عبر الإنترنت' : 'Online Tests'}
                </Link>
              </div>

              {/* Features */}
              <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto md:mx-0 md:rtl:ml-auto md:ltr:mr-0">
                <div className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} flex items-center justify-center mb-2`}>
                    <Award size={20} className={isDarkMode ? 'text-blue-400' : 'text-[#3949AB]'} />
                  </div>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {getText(UI.featurePath)}
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} flex items-center justify-center mb-2`}>
                    <PieChart size={20} className={isDarkMode ? 'text-blue-400' : 'text-[#3949AB]'} />
                  </div>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {getText(UI.featureTracking)}
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} flex items-center justify-center mb-2`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke={isDarkMode ? '#60a5fa' : '#3949AB'} strokeWidth="2" className="w-5 h-5">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                      <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"/>
                    </svg>
                  </div>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {getText(UI.featureAI)}
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="md:w-5/12 flex justify-center">
              <div className="relative">
                {/* Circular background */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full bg-[#FFC107]/30 dark:bg-[#FFC107]/20"></div>
                </div>
                
                {/* Character image */}
                <img 
                  src="student.png" 
                  alt={isArabic ? "شخصية طالب" : "Student character"} 
                  className="relative z-10 h-80 object-contain" 
                />
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-[#3949AB]/30 dark:bg-[#3949AB]/20 rounded-full"></div>
                <div className="absolute bottom-10 -left-6 w-8 h-8 bg-[#FFC107]/40 dark:bg-[#FFC107]/30 rounded-full"></div>
                
                {/* Floating icons */}
                <div className="absolute top-4 right-16 animate-float">
                  <Atom size={24} className="text-[#3949AB] dark:text-blue-400" />
                </div>
                <div className="absolute bottom-16 left-4 animate-float-slow">
                  <Calculator size={24} className="text-[#FFC107] dark:text-yellow-400" />
                </div>
                <div className="absolute bottom-4 right-4 animate-bounce">
                  <Beaker size={24} className="text-[#F44336] dark:text-red-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User's Courses Section (if logged in) */}
      {isLoggedIn && userCourses.length > 0 && (
        <section className={`py-10 px-4 ${isDarkMode ? 'bg-[#1A1A1A]' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                {getText(UI.myCourses)}
              </h2>
              <Link to="/my-courses" className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-[#3949AB]'} flex items-center`}>
                {isArabic ? 'عرض الكل' : 'View All'}
                {isRTL ? (
                  <ChevronLeft size={16} className="mr-1" />
                ) : (
                  <ChevronRight size={16} className="ml-1" />
                )}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userCourses.map((course, idx) => (
                <Link 
                  key={idx} 
                  to={`/courses/${course.id}`} 
                  className={`block rounded-xl overflow-hidden shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg ${isDarkMode ? 'bg-[#2D2D2D]' : 'bg-white'}`}
                >
                  <div className="relative">
                    <img 
                      src={course.image} 
                      alt={getText(course.title)} 
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 flex items-center">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm`}>
                        {course.progress}% {isArabic ? 'مكتمل' : 'Complete'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
                        {getSubjectIcon(getText(course.category), 14)}
                      </div>
                      <span className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-[#3949AB]'} ml-2`}>
                        {getText(course.category)}
                      </span>
                    </div>
                    <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                      {getText(course.title)}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {getText(course.level)}
                    </p>
                    
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#FFC107] h-2 rounded-full" 
                          style={{ width: `${course.progress}%` }} 
                        />
                      </div>
                    </div>
                    
                    <button className="w-full mt-4 py-2 bg-[#3949AB] text-white rounded-lg font-medium text-sm">
                      {getText(UI.continueLearning)}
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Subject Categories Section */}
      <section className={`py-12 px-4 ${isDarkMode ? 'bg-[#121212]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-2xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
            {getText(UI.subjects)}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {/* Physics */}
            <Link 
              to="/subjects/physics" 
              className={`flex flex-col items-center p-6 rounded-xl ${isDarkMode ? 'bg-[#2D2D2D] hover:bg-[#3D3D3D]' : 'bg-white hover:bg-gray-50'} transition-all hover:-translate-y-1 hover:shadow-md`}
            >
              <div className={`w-16 h-16 rounded-full ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'} flex items-center justify-center mb-3`}>
                <Atom size={32} className={isDarkMode ? 'text-blue-400' : 'text-[#3949AB]'} />
              </div>
              <h3 className={`font-medium text-center ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                {getText(UI.physics)}
              </h3>
            </Link>
            
            {/* Chemistry */}
            <Link 
              to="/subjects/chemistry" 
              className={`flex flex-col items-center p-6 rounded-xl ${isDarkMode ? 'bg-[#2D2D2D] hover:bg-[#3D3D3D]' : 'bg-white hover:bg-gray-50'} transition-all hover:-translate-y-1 hover:shadow-md`}
            >
              <div className={`w-16 h-16 rounded-full ${isDarkMode ? 'bg-green-900/30' : 'bg-green-100'} flex items-center justify-center mb-3`}>
                <Beaker size={32} className={isDarkMode ? 'text-green-400' : 'text-green-600'} />
              </div>
              <h3 className={`font-medium text-center ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                {getText(UI.chemistry)}
              </h3>
            </Link>
            
            {/* Mathematics */}
            <Link 
              to="/subjects/mathematics" 
              className={`flex flex-col items-center p-6 rounded-xl ${isDarkMode ? 'bg-[#2D2D2D] hover:bg-[#3D3D3D]' : 'bg-white hover:bg-gray-50'} transition-all hover:-translate-y-1 hover:shadow-md`}
            >
              <div className={`w-16 h-16 rounded-full ${isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'} flex items-center justify-center mb-3`}>
                <Calculator size={32} className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} />
              </div>
              <h3 className={`font-medium text-center ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                {getText(UI.math)}
              </h3>
            </Link>
            
            {/* Biology */}
            <Link 
              to="/subjects/biology" 
              className={`flex flex-col items-center p-6 rounded-xl ${isDarkMode ? 'bg-[#2D2D2D] hover:bg-[#3D3D3D]' : 'bg-white hover:bg-gray-50'} transition-all hover:-translate-y-1 hover:shadow-md`}
            >
              <div className={`w-16 h-16 rounded-full ${isDarkMode ? 'bg-red-900/30' : 'bg-red-100'} flex items-center justify-center mb-3`}>
                <Dna size={32} className={isDarkMode ? 'text-red-400' : 'text-red-600'} />
              </div>
              <h3 className={`font-medium text-center ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                {isArabic ? 'الأحياء' : 'Biology'}
              </h3>
            </Link>
            
            {/* English */}
            <Link 
              to="/subjects/english" 
              className={`flex flex-col items-center p-6 rounded-xl ${isDarkMode ? 'bg-[#2D2D2D] hover:bg-[#3D3D3D]' : 'bg-white hover:bg-gray-50'} transition-all hover:-translate-y-1 hover:shadow-md`}
            >
              <div className={`w-16 h-16 rounded-full ${isDarkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'} flex items-center justify-center mb-3`}>
                <Book size={32} className={isDarkMode ? 'text-yellow-400' : 'text-yellow-600'} />
              </div>
              <h3 className={`font-medium text-center ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                {isArabic ? 'اللغة الإنجليزية' : 'English'}
              </h3>
            </Link>
            
            {/* Arabic */}
            <Link 
              to="/subjects/arabic" 
              className={`flex flex-col items-center p-6 rounded-xl ${isDarkMode ? 'bg-[#2D2D2D] hover:bg-[#3D3D3D]' : 'bg-white hover:bg-gray-50'} transition-all hover:-translate-y-1 hover:shadow-md`}
            >
              <div className={`w-16 h-16 rounded-full ${isDarkMode ? 'bg-cyan-900/30' : 'bg-cyan-100'} flex items-center justify-center mb-3`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={isDarkMode ? '#22d3ee' : '#0891b2'} strokeWidth="2" className="w-8 h-8">
                  <path d="M12 3v1M3 12h1m17-1h1M5 5l1 1m12-1l-1 1M18 18l-1-1M5 19l1-1"/>
                  <circle cx="12" cy="12" r="5" />
                </svg>
              </div>
              <h3 className={`font-medium text-center ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                {isArabic ? 'اللغة العربية' : 'Arabic'}
              </h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className={`py-12 px-4 ${isDarkMode ? 'bg-[#1A1A1A]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
              {getText(UI.featuredCourses)}
            </h2>
            <Link to="/courses" className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-[#3949AB]'} flex items-center`}>
              {isArabic ? 'عرض الكل' : 'View All'}
              {isRTL ? (
                <ChevronLeft size={16} className="mr-1" />
              ) : (
                <ChevronRight size={16} className="ml-1" />
              )}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {FEATURED_COURSES.map((course, idx) => (
              <Link 
                key={idx} 
                to={`/courses/${course.id}`} 
                className={`block rounded-xl overflow-hidden shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg ${isDarkMode ? 'bg-[#2D2D2D]' : 'bg-white'}`}
              >
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={getText(course.title)} 
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  
                  {course.badge && (
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium" style={{ 
                      backgroundColor: course.badgeColor || '#3949AB',
                      color: 'white' 
                    }}>
                      {getText(course.badge)}
                    </div>
                  )}
                  
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={i < Math.floor(course.rating) ? 'text-[#FFC107]' : 'text-gray-300'} 
                            fill={i < Math.floor(course.rating) ? '#FFC107' : 'none'} 
                          />
                        ))}
                      </div>
                      <span className="text-white text-xs ml-1">{course.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
                      {getSubjectIcon(getText(course.category), 14)}
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-[#3949AB]'} ml-2`}>
                      {getText(course.category)}
                    </span>
                  </div>
                  <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                    {getText(course.title)}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {getText(course.level)}
                  </p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center">
                      <Users size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ml-1`}>
                        {course.students}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ml-1`}>
                        {getText(course.duration)}
                      </span>
                    </div>
                    <div>
                      {course.price.amount > 0 ? (
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                          {course.price.amount} {course.price.currency}
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                          {getText(UI.free)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Exams Section */}
      <section className={`py-12 px-4 ${isDarkMode ? 'bg-[#121212]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
              {getText(UI.upcomingExams)}
            </h2>
            <Link to="/exams" className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-[#3949AB]'} flex items-center`}>
              {isArabic ? 'عرض الكل' : 'View All'}
              {isRTL ? (
                <ChevronLeft size={16} className="mr-1" />
              ) : (
                <ChevronRight size={16} className="ml-1" />
              )}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TOP_EXAMS.map((exam, idx) => {
              // Determine status styling
              let statusColor = '';
              let statusBg = '';
              
              if (exam.status === 'upcoming') {
                statusColor = isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700';
              } else if (exam.status === 'active') {
                statusColor = isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700';
              } else {
                statusColor = isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-700';
              }
              
              return (
                <div 
                  key={idx} 
                  className={`rounded-xl overflow-hidden shadow-md ${isDarkMode ? 'bg-[#2D2D2D]' : 'bg-white'}`}
                >
                  <div className={`p-4 flex items-start justify-between border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        getText(exam.subject).includes('Physics') || getText(exam.subject).includes('فيزياء')
                          ? isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                          : getText(exam.subject).includes('Chemistry') || getText(exam.subject).includes('كيمياء')
                            ? isDarkMode ? 'bg-green-900/30' : 'bg-green-100'
                            : isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'
                      }`}>
                        {getSubjectIcon(getText(exam.subject), 20)}
                      </div>
                      <div className="ml-3">
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {getText(exam.subject)}
                        </span>
                        <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                          {getText(exam.title)}
                        </h3>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                      {getText(exam.date)}
                    </span>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Clock size={14} className="mr-1" />
                        <span>{getText(exam.duration)}</span>
                      </div>
                      <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 mr-1">
                          <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-1.12-2.5-2.5-2.5S6 10.62 6 12c0 .76.34 1.42.87 1.88L7 22l4-3 4 3 .13-8.12c.53-.46.87-1.12.87-1.88 0-1.38-1.12-2.5-2.5-2.5S11 10.62 11 12a2.5 2.5 0 002.5 2.5"></path>
                          <path d="M7 6h10M7 9h10"></path>
                        </svg>
                        <span>{exam.questionsCount} {isArabic ? 'سؤال' : 'questions'}</span>
                      </div>
                    </div>
                    
                    <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {getText(exam.level)}
                    </p>
                    
                    <button className={`w-full py-2 text-sm font-medium rounded-lg ${
                      exam.status === 'upcoming'
                        ? 'bg-[#3949AB] text-white'
                        : exam.status === 'active'
                          ? 'bg-[#FFC107] text-[#37474F]'
                          : isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {exam.status === 'upcoming'
                        ? getText(UI.registerForExam)
                        : exam.status === 'active'
                          ? getText(UI.startExam)
                          : getText(UI.viewResults)
                      }
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* Removed Footer component as requested */}

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
        
        @keyframes float-slow {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }

        .bg-grid-pattern {
          background-size: 20px 20px;
          background-image: linear-gradient(to right, rgba(128, 128, 128, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(128, 128, 128, 0.1) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
};

export default HomePage;