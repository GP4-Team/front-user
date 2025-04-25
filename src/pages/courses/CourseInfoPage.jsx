// src/pages/courses/CourseInfoPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../components/navigation/Navbar";
import CourseInfoCard from "../../components/courseInfo/CourseInfoCard";
import CourseInfoTabs from "../../components/courseInfo/CourseInfoTabs";
import CourseInfoHeader from "../../components/courseInfo/CourseInfoHeader";
import CourseSections from "../../components/courseInfo/CourseSections";
import InstructorInfo from "../../components/courseInfo/InstructorInfo";

// Mock course data - would come from API in real app
const MOCK_COURSE = {
  id: "experimental-course",
  title: {
    ar: "كيمياء عضوية - المركبات الهيدروكربونية",
    en: "Organic Chemistry - Hydrocarbon Compounds",
  },
  subtitle: {
    ar: "دراسة المركبات العضوية وتفاعلاتها",
    en: "Study of Organic Compounds and Their Reactions",
  },
  description: {
    ar: "تشمل هذه المادة دراسة المركبات العضوية مثل الالكينات والالكاينات والكحولات والايثرات، مع شرح مفصل لتركيبها وتفاعلاتها وتطبيقاتها في الحياة اليومية.",
    en: "This course covers the study of organic compounds such as alkenes, alkynes, alcohols, and ethers, with detailed explanation of their structure, reactions, and applications in everyday life.",
  },
  instructor: {
    ar: "د. محمد السيد",
    en: "Dr. Mohamed Elsayed",
  },
  instructorAvatar: "/api/placeholder/100/100",
  category: {
    ar: "الكيمياء العضوية",
    en: "Organic Chemistry",
  },
  subcategory: {
    ar: "مركبات عضوية - ثالثة ثانوي",
    en: "Organic Compounds - 3rd Secondary",
  },
  level: {
    ar: "الصف الثالث الثانوي",
    en: "3rd Grade Secondary",
  },
  levelId: "grade12",
  rating: 4.0,
  reviewsCount: 1,
  studentsCount: 100,
  // Empty price placeholder to prevent errors
  price: {
    amount: 0,
    discountedAmount: 0,
    discountPercentage: 0,
    currency: "",
    expiryTime: "",
  },
  image: "/api/placeholder/600/400",
  badge: {
    ar: "رقم 1",
    en: "#1",
  },
  courseInfo: [
    {
      title: { ar: "58 ساعة من الشرح المفصل", en: "58 hours of detailed explanation" },
      icon: "Clock",
    },
    {
      title: { ar: "شرح كيمياء عضوية ثالثة ثانوي", en: "Organic Chemistry for 3rd Secondary" },
      icon: "Book",
    },
    {
      title: { ar: "66 تمرين على المركبات العضوية", en: "66 exercises on organic compounds" },
      icon: "FileText",
    },
    {
      title: { ar: "متاحة دائماً", en: "Always available" },
      icon: "Clock",
    },
  ],
  sections: [
    {
      id: "section-1",
      title: { ar: "الالكينات", en: "Alkenes" },
      lessonsCount: 5,
      exercisesCount: 2,
      expanded: true,
      lessons: [
        {
          id: "lesson-1-1",
          title: { ar: "شرح الالكينات", en: "Alkenes Explanation" },
          type: "video",
          icon: "youtube"
        },
        {
          id: "lesson-1-2",
          title: { ar: "تفاعلات الالكينات", en: "Alkenes Reactions" },
          type: "video",
          icon: "youtube"
        },
        {
          id: "lesson-1-3",
          title: { ar: "ملخص الالكينات", en: "Alkenes Summary" },
          type: "audio",
          icon: "audio"
        },
        {
          id: "exam-1",
          title: { ar: "امتحان الالكينات 1", en: "Alkenes Exam 1" },
          type: "exam",
          icon: "exam"
        },
        {
          id: "exam-2",
          title: { ar: "امتحان الالكينات 2", en: "Alkenes Exam 2" },
          type: "exam",
          icon: "exam"
        }
      ]
    },
    {
      id: "section-2",
      title: { ar: "الالكاينات", en: "Alkynes" },
      lessonsCount: 4,
      exercisesCount: 1,
      expanded: false,
      lessons: [
        {
          id: "lesson-2-1",
          title: { ar: "شرح الالكاينات", en: "Alkynes Explanation" },
          type: "video",
          icon: "youtube"
        },
        {
          id: "lesson-2-2",
          title: { ar: "ملخص الالكاينات", en: "Alkynes Summary" },
          type: "image",
          icon: "image"
        },
        {
          id: "lesson-2-3",
          title: { ar: "شرح صوتي للالكاينات", en: "Alkynes Audio Explanation" },
          type: "audio",
          icon: "audio"
        },
        {
          id: "exam-3",
          title: { ar: "امتحان الالكاينات", en: "Alkynes Exam" },
          type: "exam",
          icon: "exam"
        }
      ]
    },
    {
      id: "section-3",
      title: { ar: "الكحولات والايثرات", en: "Alcohols and Ethers" },
      lessonsCount: 4,
      exercisesCount: 2,
      expanded: false,
      lessons: [
        {
          id: "lesson-3-1",
          title: { ar: "الكحولات وتفاعلاتها", en: "Alcohols and Their Reactions" },
          type: "video",
          icon: "youtube"
        },
        {
          id: "lesson-3-2",
          title: { ar: "الايثرات وتفاعلاتها", en: "Ethers and Their Reactions" },
          type: "video",
          icon: "youtube"
        },
        {
          id: "lesson-3-3",
          title: { ar: "ملخص للكحولات والايثرات", en: "Summary of Alcohols and Ethers" },
          type: "image",
          icon: "image"
        },
        {
          id: "exam-4",
          title: { ar: "امتحان الكحولات والايثرات", en: "Alcohols and Ethers Exam" },
          type: "exam",
          icon: "exam"
        }
      ]
    }
  ],
  reviews: [
    {
      id: 1,
      user: {
        name: { ar: "طالب تجربة جديد جديد", en: "New Test Student" },
        avatar: "/api/placeholder/40/40",
        displayName: { ar: "حامد", en: "Hamed" }
      },
      rating: 4,
      date: "2025-03-17",
      comment: { ar: "", en: "" }
    }
  ]
};

const CourseInfoPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const { isAuthenticated } = useAuth();
  
  // State for the course data
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("lessons"); // lessons, description
  
  // Helper function to get text based on language
  const getText = (obj) => {
    if (!obj) return "";
    return language === "ar" ? obj.ar : obj.en;
  };

  // Effect to fetch course data
  useEffect(() => {
    // في تطبيق حقيقي، هذا سيكون استدعاء API
    // للآن، سنستخدم البيانات التجريبية
    const timer = setTimeout(() => {
      setCourse(MOCK_COURSE);
      setIsLoading(false);
      
      // Set default active tab (not "reviews" anymore)
      if (activeTab === "reviews") {
        setActiveTab("lessons");
      }
      
      // Set page title
      if (MOCK_COURSE) {
        document.title = language === "ar" ? MOCK_COURSE.title.ar : MOCK_COURSE.title.en;
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [courseId]);

  // وظيفة التسجيل في الكورس / الدخول للمادة
  // في مرحلة التطوير: توجيه مباشر بدون التحقق من تسجيل الدخول
  const handleEnrollment = () => {
    // توجيه مباشر إلى صفحة محتوى المادة في مرحلة التطوير
    navigate(`/courses/${courseId}/content`);
  };

  // إظهار شاشة التحميل
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // إذا لم يتم العثور على الكورس
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center p-4">
          <h2 className="text-xl font-bold mb-2">{language === "ar" ? "لم يتم العثور على الكورس" : "Course Not Found"}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {language === "ar" ? "الكورس الذي تبحث عنه غير موجود أو تم حذفه." : "The course you are looking for does not exist or has been removed."}
          </p>
          <Link 
            to="/courses" 
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            {language === "ar" ? "العودة إلى قائمة الكورسات" : "Back to Courses"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-100 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content with top padding for navbar */}
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Course Details - Left Column (2/3 width) */}
            <div className="lg:w-2/3">
              <CourseInfoHeader course={course} getText={getText} />
              <CourseInfoTabs 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                language={language} 
              />
              
              {activeTab === "lessons" && (
                <CourseSections 
                  sections={course.sections} 
                  getText={getText} 
                  language={language}
                />
              )}
              
              {activeTab === "description" && (
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <div className="prose max-w-none">
                    <p>{getText(course.description)}</p>
                  </div>
                </div>
              )}
              
              {/* Instructor Info */}
              <InstructorInfo 
                instructor={course.instructor} 
                instructorAvatar={course.instructorAvatar} 
                getText={getText} 
                language={language}
              />
            </div>
            
            {/* Course Info Card - Right Column (1/3 width) */}
            <div className="lg:w-1/3">
              <CourseInfoCard 
                course={course} 
                getText={getText} 
                language={language}
                handleEnrollment={handleEnrollment}
              />
              
              {/* Social Share */}
              <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-800">
                    {language === "ar" ? "مشاركة المادة" : "Share the Course"}
                  </h3>
                  <div className="flex space-x-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
                      <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.6,10.1c-0.2,0-0.3,0-0.5,0.1l-2.9-1.4c0-0.2,0.1-0.3,0.1-0.5c0-0.2,0-0.3-0.1-0.5l2.9-1.4c0.1,0.1,0.3,0.1,0.5,0.1c0.8,0,1.4-0.6,1.4-1.4S14.4,4,13.6,4s-1.4,0.6-1.4,1.4c0,0.2,0,0.3,0.1,0.5L9.4,7.3C9.3,7.2,9.1,7.2,8.9,7.2c-0.8,0-1.4,0.6-1.4,1.4c0,0.8,0.6,1.4,1.4,1.4c0.2,0,0.3,0,0.5-0.1l2.9,1.4c0,0.2-0.1,0.3-0.1,0.5c0,0.8,0.6,1.4,1.4,1.4s1.4-0.6,1.4-1.4S14.3,10.1,13.6,10.1z"></path>
                      </svg>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
                      <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z"></path>
                      </svg>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
                      <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"></path>
                      </svg>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
                      <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                      </svg>
                    </button>
                  </div>
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

export default CourseInfoPage;