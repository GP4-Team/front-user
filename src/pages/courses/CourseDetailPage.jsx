// src/pages/courses/CourseDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../components/navigation/Navbar";
import {
  CourseVideoLesson,
  CourseImageLesson,
  CourseAudioLesson,
  CourseExamLesson,
  CourseSidebar,
  CourseBreadcrumb
} from "../../components/courseDetail";
import {
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Loader
} from "lucide-react";
import SimpleFooter from "../../components/home/SimpleFooter";

// Mock course data - fake data as requested
const MOCK_COURSE_DATA = {
  id: "experimental-course",
  title: {
    ar: "معسكر تجريبي لمنصة اديورا التعليمية",
    en: "Experimental Camp for Eduara Educational Platform"
  },
  progress: 15, // 15% completed
  courseData: {
    id: "experimental-course",
    name: "معسكر تجريبي لمنصة اديورا التعليمية",
    code: "EDUARA-EXP-2025",
    color: "#4285F4",
    image: "/api/placeholder/800/400",
    description: "معسكر تجريبي شامل لاستكشاف جميع ميزات منصة اديورا التعليمية مع دروس متنوعة وامتحانات تجريبية",
    instructor_name: "مي هاني",
    instructor_avatar: "/api/placeholder/100/100",
    educational_level_id: 12,
    educational_department_id: 8, // Chemistry
    price: 299,
    discounted_price: 199,
    discount_percentage: 33,
    currency: "SAR",
    rating: 4.8,
    reviews_count: 157,
    students_count: 1250,
    duration_hours: 58,
    materials_count: 15,
    
    title: {
      ar: "معسكر تجريبي لمنصة اديورا التعليمية",
      en: "Experimental Camp for Eduara Educational Platform"
    },
    category: {
      ar: "الكيمياء",
      en: "Chemistry"
    },
    level: {
      ar: "الصف الثالث الثانوي",
      en: "Grade 12"
    },
    instructor: {
      ar: "مي هاني",
      en: "Mai Hany"
    },
    stats: {
      totalLessons: 8,
      totalQuizzes: 2,
      totalProjects: 0,
      estimatedHours: 58
    }
  },
  sections: [
    {
      id: "section-1",
      title: {
        ar: "قسم تجربة",
        en: "Experimental Section"
      },
      lessons: 6,
      completed: 0,
      expanded: true,
      lessons: [
        {
          id: "lesson-1-1",
          type: "video",
          title: {
            ar: "درس يوتيوب تجريبي",
            en: "Experimental YouTube Lesson"
          },
          status: "current",
          duration: {
            ar: "92 دقيقة",
            en: "92 minutes"
          },
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          description: {
            ar: "مقدمة تجريبية لاستخدام منصة اديورا التعليمية",
            en: "Experimental introduction to using Eduara educational platform"
          },
          instructor: "مي هاني",
          maxViews: 5,
          viewsRemaining: 3
        },
        {
          id: "lesson-1-2",
          type: "video",
          title: {
            ar: "يوتيوب محمي",
            en: "Protected YouTube"
          },
          status: "locked",
          duration: {
            ar: "96 دقيقة",
            en: "96 minutes"
          },
          url: "https://www.youtube.com/embed/jNQXAC9IVRw",
          description: {
            ar: "درس محمي خاص بالطلاب المسجلين",
            en: "Protected lesson for enrolled students only"
          },
          instructor: "مي هاني",
          maxViews: 3,
          viewsRemaining: 2
        },
        {
          id: "lesson-1-3",
          type: "image",
          title: {
            ar: "انفوجرافيك",
            en: "Infographic"
          },
          status: "locked",
          duration: {
            ar: "5 دقائق",
            en: "5 minutes"
          },
          imageUrl: "/api/placeholder/800/600",
          description: {
            ar: "مخطط تفصيلي للمفاهيم الأساسية",
            en: "Detailed diagram of basic concepts"
          }
        },
        {
          id: "lesson-1-4",
          type: "image",
          title: {
            ar: "درس صورة تجريبية 1",
            en: "Experimental Image Lesson 1"
          },
          status: "locked",
          duration: {
            ar: "8 دقائق",
            en: "8 minutes"
          },
          imageUrl: "/api/placeholder/800/600",
          description: {
            ar: "ملخص بصري للمفاهيم المهمة",
            en: "Visual summary of important concepts"
          }
        },
        {
          id: "lesson-1-5",
          type: "audio",
          title: {
            ar: "درس صوت تجربة",
            en: "Experimental Audio Lesson"
          },
          status: "locked",
          duration: {
            ar: "22 دقيقة",
            en: "22 minutes"
          },
          audioUrl: "/api/placeholder/audio.mp3",
          description: {
            ar: "ملخص صوتي للمفاهيم المهمة",
            en: "Audio summary of important concepts"
          }
        },
        {
          id: "exam-1",
          type: "exam",
          title: {
            ar: "امتحان تجريبي 1",
            en: "Experimental Exam 1"
          },
          status: "locked",
          duration: {
            ar: "10 دقائق",
            en: "10 minutes"
          },
          questionsCount: 10,
          passingScore: 70,
          description: {
            ar: "اختبار شامل للمفاهيم التي تم دراستها",
            en: "Comprehensive test of studied concepts"
          }
        }
      ]
    },
    {
      id: "section-2",
      title: {
        ar: "مقدمة للقسم 2",
        en: "Introduction to Section 2"
      },
      lessons: 1,
      completed: 0,
      expanded: false,
      lessons: [
        {
          id: "exam-2",
          type: "exam",
          title: {
            ar: "امتحان تجريبي 2",
            en: "Experimental Exam 2"
          },
          status: "locked",
          duration: {
            ar: "10 دقائق",
            en: "10 minutes"
          },
          questionsCount: 10,
          passingScore: 70,
          description: {
            ar: "اختبار تقييم للقسم الثاني",
            en: "Assessment test for section two"
          }
        }
      ]
    },
    {
      id: "section-3",
      title: {
        ar: "قسم جديد",
        en: "New Section"
      },
      lessons: 0,
      completed: 0,
      expanded: false,
      lessons: []
    }
  ]
};

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const { isAuthenticated } = useAuth();
  
  // State for the course data
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State for the current lesson
  const [currentLesson, setCurrentLesson] = useState(null);
  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState({});

  // Helper function to get text based on language
  const getText = (obj) => {
    if (!obj) return "";
    return obj[language] || obj.en || "";
  };

  // Effect to load mock course data
  useEffect(() => {
    const loadCourseData = () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔍 Loading mock course data for ID:', courseId);
        
        // Simulate API delay
        setTimeout(() => {
          setCourse(MOCK_COURSE_DATA);
          
          // Set initial expanded sections
          const initialExpanded = {};
          MOCK_COURSE_DATA.sections.forEach((section) => {
            initialExpanded[section.id] = section.expanded || false;
          });
          setExpandedSections(initialExpanded);
          
          // Set the first lesson as current
          if (MOCK_COURSE_DATA.sections[0]?.lessons[0]) {
            setCurrentLesson(MOCK_COURSE_DATA.sections[0].lessons[0]);
          }
          
          setLoading(false);
        }, 800);
        
      } catch (err) {
        console.error('❌ Error loading mock course data:', err);
        setError(err.message || 'Failed to load course details');
        setLoading(false);
      }
    };
    
    if (courseId) {
      loadCourseData();
    }
  }, [courseId]);

  // Function to toggle a section
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Function to select a lesson
  const selectLesson = (lesson) => {
    setCurrentLesson(lesson);
  };

  // If course data is not loaded yet or there's an error
  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <Navbar />
        <div className="pt-16 flex items-center justify-center h-96">
          <div className="text-center">
            <Loader className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" />
            <p className="text-lg">
              {language === 'ar' ? 'جاري تحميل تفاصيل الكورس...' : 'Loading course details...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <Navbar />
        <div className="pt-16 flex items-center justify-center h-96">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-2">
              {language === 'ar' ? 'خطأ في تحميل الكورس' : 'Error Loading Course'}
            </h2>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              {language === 'ar' ? 'إعادة المحاولة' : 'Try Again'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <Navbar />
        <div className="pt-16 flex items-center justify-center h-96">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium">
              {language === 'ar' ? 'الكورس غير موجود' : 'Course Not Found'}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content with top padding for navbar */}
      <div className="pt-16">
        {/* Progress bar */}
        <div className="relative h-1 bg-gray-200 dark:bg-gray-700">
          <div 
            className="absolute left-0 h-1 bg-blue-500" 
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
        
        {/* Page header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-16 z-10">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              {/* Course title and breadcrumb */}
              <div>
                {/* Breadcrumb */}
                <CourseBreadcrumb 
                  course={course}
                  currentLesson={currentLesson}
                />
                
                {/* Course title */}
                <h1 className="text-xl font-bold mt-1">{getText(course.title)}</h1>
              </div>
              
              {/* Language & Detail toggle */}
              <div className="flex items-center">
                <div className="flex space-x-2 rtl:space-x-reverse border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                  <Link 
                    to="/courses" 
                    className="px-3 py-1 text-sm flex items-center hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {isRTL ? 
                      <ChevronDown size={14} className="ml-1" /> : 
                      <ChevronDown size={14} className="mr-1" />
                    }
                    {language === "ar" ? "التفاصيل" : "Details"}
                  </Link>
                  <Link 
                    to="#" 
                    className="px-3 py-1 text-sm flex items-center bg-gray-100 dark:bg-gray-700"
                  >
                    {isRTL ? 
                      <ChevronDown size={14} className="ml-1" /> : 
                      <ChevronDown size={14} className="mr-1" />
                    }
                    {language === "ar" ? "محاضرات" : "Lectures"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-1/4 xl:w-1/5">
              <CourseSidebar 
                course={course}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                currentLesson={currentLesson}
                selectLesson={selectLesson}
              />
            </div>
            
            {/* Main content */}
            <div className="lg:w-3/4 xl:w-4/5 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              {currentLesson ? (
                <>
                  {/* Render the appropriate lesson component based on the lesson type */}
                  {currentLesson.type === "video" && (
                    <CourseVideoLesson lesson={currentLesson} />
                  )}
                  
                  {currentLesson.type === "image" && (
                    <CourseImageLesson lesson={currentLesson} />
                  )}
                  
                  {currentLesson.type === "audio" && (
                    <CourseAudioLesson lesson={currentLesson} />
                  )}
                  
                  {currentLesson.type === "exam" && (
                    <CourseExamLesson lesson={currentLesson} />
                  )}
                </>
              ) : (
                // No lesson selected
                <div className="p-8 text-center">
                  <div className="flex flex-col items-center justify-center py-16">
                    <AlertCircle size={48} className="text-gray-400 dark:text-gray-600 mb-4" />
                    <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400">
                      {language === "ar" ? "لم يتم اختيار أي درس" : "No lesson selected"}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-500 mt-2 max-w-md">
                      {language === "ar" 
                        ? "الرجاء اختيار درس من القائمة الجانبية للبدء في التعلم."
                        : "Please select a lesson from the sidebar to start learning."
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <SimpleFooter />
    </div>
  );
};

export default CourseDetailPage;