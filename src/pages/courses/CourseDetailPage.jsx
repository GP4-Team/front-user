// src/pages/courses/CourseDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../components/navigation/Navbar";
import CoursesService from "../../services/api/courses.service";
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

// Helper function to convert API material type to component type
const convertMaterialType = (apiType) => {
  const typeMap = {
    'YoutubeVideo': 'video',
    'Audio': 'audio',
    'Pdf': 'pdf',
    'Image': 'image',
    'Document': 'document'
  };
  return typeMap[apiType] || 'document';
};

// Helper function to convert seconds to readable duration
const formatDuration = (seconds, language) => {
  if (!seconds) return language === 'ar' ? 'غير محدد' : 'N/A';
  
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours > 0) {
    return language === 'ar' ? 
      `${hours} ساعة ${remainingMinutes} دقيقة` : 
      `${hours}h ${remainingMinutes}m`;
  }
  
  return language === 'ar' ? 
    `${minutes} دقيقة` : 
    `${minutes} minutes`;
};

// Helper function to transform API materials to lesson format
const transformMaterialsToLessons = (materials) => {
  return materials.map((material, index) => ({
    id: `material-${material.id}`,
    type: convertMaterialType(material.type),
    title: {
      ar: material.name,
      en: material.name
    },
    status: index === 0 ? 'current' : 'locked', // First material is current
    duration: {
      ar: formatDuration(material.duration_in_seconds, 'ar'),
      en: formatDuration(material.duration_in_seconds, 'en')
    },
    description: {
      ar: material.description || '',
      en: material.description || ''
    },
    // Add material-specific properties
    url: material.media_url,
    instructor: material.user?.name || '',
    materialData: material, // Keep original data
    // For video lessons
    maxViews: 5,
    viewsRemaining: 3,
    // For PDF lessons
    pages: material.number_of_pages,
    // Course idea info
    courseIdea: material.course_idea
  }));
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

  // Effect to load course data and materials from API
  useEffect(() => {
    const loadCourseData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔍 Loading course materials for ID:', courseId);
        
        // Fetch course materials from API
        const materialsResponse = await CoursesService.getCourseContent(courseId);
        
        console.log('✅ Course materials received:', materialsResponse);
        
        if (materialsResponse.success && materialsResponse.data && materialsResponse.data.data) {
          const materials = materialsResponse.data.data;
          const pagination = materialsResponse.data;
          
          // Get course info from first material (they all have the same course info)
          const courseInfo = materials[0]?.course;
          
          // Transform materials to lessons
          const lessons = transformMaterialsToLessons(materials);
          
          // Create course data structure
          const courseData = {
            id: courseId,
            title: {
              ar: courseInfo?.name || 'معسكر تجريبي لمنصة اديورا',
              en: courseInfo?.name || 'Experimental Camp for Eduara'
            },
            progress: 15,
            courseData: {
              id: courseId,
              name: courseInfo?.name || 'معسكر تجريبي',
              code: courseInfo?.code || 'COURSE-001',
              color: courseInfo?.color || '#4285F4',
              image: '/api/placeholder/800/400',
              description: `مواد تعليمية شاملة في ${courseInfo?.name || 'المادة'}`,
              instructor_name: materials[0]?.user?.name || 'مدرس متخصص',
              materials_count: materials.length,
              stats: {
                totalLessons: materials.length,
                totalQuizzes: 0,
                totalProjects: 0,
                estimatedHours: Math.ceil(materials.reduce((total, m) => total + (m.duration_in_seconds || 0), 0) / 3600)
              }
            },
            sections: [
              {
                id: 'materials-section',
                title: {
                  ar: 'مواد الكورس',
                  en: 'Course Materials'
                },
                lessons: lessons.length,
                completed: 0,
                expanded: true,
                lessons: lessons
              }
            ]
          };
          
          setCourse(courseData);
          
          // Set initial expanded sections
          setExpandedSections({ 'materials-section': true });
          
          // Set the first lesson as current
          if (lessons.length > 0) {
            setCurrentLesson(lessons[0]);
          }
          
        } else {
          // If no materials found, show empty course
          const emptyFallback = {
            id: courseId,
            title: {
              ar: 'لا توجد مواد',
              en: 'No Materials Found'
            },
            progress: 0,
            courseData: {
              id: courseId,
              name: 'لا توجد مواد',
              materials_count: 0,
              stats: { totalLessons: 0, totalQuizzes: 0, totalProjects: 0, estimatedHours: 0 }
            },
            sections: []
          };
          setCourse(emptyFallback);
        }
        
      } catch (err) {
        console.error('❌ Error loading course materials:', err);
        setError(err.message || 'Failed to load course materials');
      } finally {
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
                  
                  {currentLesson.type === "pdf" && (
                    <CourseImageLesson lesson={currentLesson} />
                  )}
                  
                  {currentLesson.type === "document" && (
                    <CourseImageLesson lesson={currentLesson} />
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