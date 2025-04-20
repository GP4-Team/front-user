// src/pages/courses/CourseDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../components/navigation/Navbar";
// import { SimpleFooter } from "../../components/home";
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
  AlertCircle
} from "lucide-react";
import SimpleFooter from "../../components/home/SimpleFooter";

// Mock course data - this would come from your API in a real app
const MOCK_COURSE = {
  id: "physics-101",
  title: {
    en: "Experimental Camp for Eduara Educational Platform",
    ar: "معسكر تجريبي لمنصة اديورا التعليمية"
  },
  progress: 38.46,
  sections: [
    {
      id: "section-1",
      title: {
        en: "Experimental Section",
        ar: "قسم تجربة"
      },
      lessons: 7,
      completed: 2,
      expanded: true,
      lessons: [
        {
          id: "lesson-1-1",
          type: "video",
          title: {
            en: "Experimental YouTube Video",
            ar: "درس يوتيوب تجريبي"
          },
          duration: {
            en: "92 min",
            ar: "92 دقيقة"
          },
          status: "completed",
          viewsRemaining: 45,
          maxViews: 100
        },
        {
          id: "lesson-1-2",
          type: "video",
          title: {
            en: "Protected YouTube Video",
            ar: "يوتيوب محمي"
          },
          duration: {
            en: "96 min",
            ar: "96 دقيقة"
          },
          status: "completed",
          viewsRemaining: 85,
          maxViews: 100
        },
        {
          id: "lesson-1-3",
          type: "image",
          title: {
            en: "Infographics",
            ar: "انفوجرافيك"
          },
          status: "completed",
          viewsRemaining: null // unlimited views
        },
        {
          id: "lesson-1-4",
          type: "image",
          title: {
            en: "Experimental Image Lesson 1",
            ar: "درس صورة تجريبية 1"
          },
          status: "completed",
          viewsRemaining: null
        },
        {
          id: "lesson-1-5",
          type: "audio",
          title: {
            en: "Experimental Audio Lesson",
            ar: "درس صوت تجربة"
          },
          duration: {
            en: "22 min",
            ar: "22 دقيقة"
          },
          status: "current",
          viewsRemaining: 22,
          maxViews: 50
        },
        {
          id: "exam-1",
          type: "exam",
          title: {
            en: "Experimental Exam 1",
            ar: "امتحان تجريبي 1"
          },
          questions: 9,
          status: "current", // changed from "locked" to "current" to show the exam content
          passingScore: 35,
          duration: {
            en: "10 min",
            ar: "10 دقائق"
          }
        },
        {
          id: "exam-2",
          type: "exam",
          title: {
            en: "Experimental Exam 2",
            ar: "امتحان تجريبي 2"
          },
          questions: 5,
          status: "locked",
          passingScore: 35,
          duration: {
            en: "10 min",
            ar: "10 دقائق"
          }
        }
      ]
    },
    {
      id: "section-2",
      title: {
        en: "Experimental Section 2",
        ar: "قسم تجربة 2"
      },
      lessons: 5,
      completed: 1,
      expanded: false,
      lessons: [
        {
          id: "lesson-2-1",
          type: "video",
          title: {
            en: "Introduction to Section 2",
            ar: "مقدمة للقسم 2"
          },
          duration: {
            en: "30 min",
            ar: "30 دقيقة"
          },
          status: "locked",
          viewsRemaining: 50,
          maxViews: 50
        }
      ]
    },
    {
      id: "section-new",
      title: {
        en: "New Section",
        ar: "قسم جديد"
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
  const [course, setCourse] = useState(MOCK_COURSE);
  // State for the current lesson
  const [currentLesson, setCurrentLesson] = useState(null);
  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState({});

  // Helper function to get text based on language
  const getText = (obj) => {
    if (!obj) return "";
    return obj[language] || obj.en || "";
  };

  // Effect to fetch course data
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use the mock data
    // Simulate API call delay
    const timer = setTimeout(() => {
      setCourse(MOCK_COURSE);
      
      // Set initial expanded sections
      const initialExpanded = {};
      MOCK_COURSE.sections.forEach((section) => {
        initialExpanded[section.id] = section.expanded || false;
      });
      setExpandedSections(initialExpanded);
      
      // Specifically set to show the exam as the current lesson
      const examLesson = MOCK_COURSE.sections[0].lessons.find(
        (lesson) => lesson.id === "exam-1"
      );
      
      setCurrentLesson(examLesson);
      
    }, 500);
    
    return () => clearTimeout(timer);
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

  // If course data is not loaded yet
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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