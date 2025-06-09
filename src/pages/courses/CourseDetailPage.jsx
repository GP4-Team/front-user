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
  Loader,
  Clock,
  FileText
} from "lucide-react";
import SimpleFooter from "../../components/home/SimpleFooter";

// Course Overview Lesson Component
const CourseOverviewLesson = ({ course }) => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  
  const getText = (obj) => {
    if (!obj) return "";
    return obj[language] || obj.en || "";
  };

// Course Material Lesson Component - displays real material content from API
const CourseMaterialLesson = ({ lesson }) => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  
  const getText = (obj) => {
    if (!obj) return "";
    return obj[language] || obj.en || "";
  };
  
  const material = lesson.materialData;
  
  if (!material) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">
          {language === 'ar' ? 'لا توجد بيانات للمادة' : 'No material data available'}
        </h3>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800">
      {/* Material Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {getText(lesson.title)}
            </h1>
            {material.description && (
              <p className="text-gray-600 dark:text-gray-300">
                {material.description}
              </p>
            )}
          </div>
          
          {lesson.duration && (
            <div className="flex items-center bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg">
              <Clock size={16} className="text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                {getText(lesson.duration)}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Material Content */}
      <div className="p-6">
        {/* Video Content */}
        {(material.type === 'video' || lesson.type === 'video') && material.url && (
          <div className="mb-6">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              {material.url.includes('youtube.com') || material.url.includes('youtu.be') ? (
                <iframe
                  src={material.url.replace('watch?v=', 'embed/')}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  title={getText(lesson.title)}
                ></iframe>
              ) : (
                <video
                  src={material.url}
                  controls
                  className="w-full h-full"
                  poster={material.thumbnail}
                >
                  {language === 'ar' ? 'متصفحك لا يدعم تشغيل الفيديو' : 'Your browser does not support video playback'}
                </video>
              )}
            </div>
          </div>
        )}
        
        {/* Image Content */}
        {(material.type === 'image' || lesson.type === 'image') && material.url && (
          <div className="mb-6">
            <img
              src={material.url}
              alt={getText(lesson.title)}
              className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
              onError={(e) => {
                e.target.src = 'https://academy1.gp-app.tafra-tech.com/images/material-holder.webp';
              }}
            />
          </div>
        )}
        
        {/* Audio Content */}
        {(material.type === 'audio' || lesson.type === 'audio') && material.url && (
          <div className="mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <audio
                src={material.url}
                controls
                className="w-full"
              >
                {language === 'ar' ? 'متصفحك لا يدعم تشغيل الصوت' : 'Your browser does not support audio playback'}
              </audio>
            </div>
          </div>
        )}
        
        {/* PDF Content */}
        {(material.type === 'pdf' || material.url?.endsWith('.pdf')) && (
          <div className="mb-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <iframe
                src={material.url}
                className="w-full h-96"
                title={getText(lesson.title)}
              >
                <div className="p-4 text-center">
                  <p className="mb-4">
                    {language === 'ar' ? 'لا يمكن عرض الملف. يمكنك تحميله من الرابط أدناه.' : 'Cannot display file. You can download it from the link below.'}
                  </p>
                  <a
                    href={material.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg inline-flex items-center"
                  >
                    <FileText size={16} className="mr-2" />
                    {language === 'ar' ? 'تحميل الملف' : 'Download File'}
                  </a>
                </div>
              </iframe>
            </div>
          </div>
        )}
        
        {/* Text Content */}
        {material.content && (
          <div className="mb-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {material.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          </div>
        )}
        
        {/* Download Section */}
        {material.url && (
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {language === 'ar' ? 'تحميل المادة' : 'Download Material'}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {language === 'ar' ? 'يمكنك تحميل هذه المادة للمراجعة اللاحقة' : 'You can download this material for later review'}
                </p>
              </div>
              <a
                href={material.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg inline-flex items-center transition-colors"
              >
                <FileText size={16} className="mr-2" />
                {language === 'ar' ? 'تحميل' : 'Download'}
              </a>
            </div>
          </div>
        )}
        
        {/* Material Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="text-sm text-blue-600 dark:text-blue-400">
              {language === 'ar' ? 'نوع المادة' : 'Material Type'}
            </div>
            <div className="font-medium text-blue-700 dark:text-blue-300 mt-1">
              {material.type || lesson.type || (language === 'ar' ? 'عام' : 'General')}
            </div>
          </div>
          
          {material.size && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="text-sm text-green-600 dark:text-green-400">
                {language === 'ar' ? 'حجم الملف' : 'File Size'}
              </div>
              <div className="font-medium text-green-700 dark:text-green-300 mt-1">
                {material.size}
              </div>
            </div>
          )}
          
          {material.created_at && (
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="text-sm text-purple-600 dark:text-purple-400">
                {language === 'ar' ? 'تاريخ الإضافة' : 'Added Date'}
              </div>
              <div className="font-medium text-purple-700 dark:text-purple-300 mt-1">
                {new Date(material.created_at).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
  
  const courseData = course.courseData;
  
  return (
    <div className="p-6">
      {/* Course Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Course Image */}
          <div className="lg:w-1/3">
            <img 
              src={courseData.image} 
              alt={getText(courseData.title)}
              className="w-full h-48 lg:h-64 object-cover rounded-lg shadow-md"
              onError={(e) => {
                e.target.src = 'https://academy1.gp-app.tafra-tech.com/images/material-holder.webp';
              }}
            />
          </div>
          
          {/* Course Info */}
          <div className="lg:w-2/3">
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">
              {getText(courseData.title)}
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {getText(courseData.description)}
            </p>
            
            {/* Course Details Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'ar' ? 'الفئة' : 'Category'}
                </div>
                <div className="font-medium">{getText(courseData.category)}</div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'ar' ? 'المستوى' : 'Level'}
                </div>
                <div className="font-medium">{getText(courseData.level)}</div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'ar' ? 'المدة' : 'Duration'}
                </div>
                <div className="font-medium">{getText(courseData.duration)}</div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'ar' ? 'الطلاب' : 'Students'}
                </div>
                <div className="font-medium">{courseData.students}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Features */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          {language === 'ar' ? 'مميزات الكورس' : 'Course Features'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courseData.features?.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
              <span>{getText(feature)}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Course Statistics */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          {language === 'ar' ? 'إحصائيات الكورس' : 'Course Statistics'}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {courseData.stats?.totalLessons || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'ar' ? 'درس' : 'Lessons'}
            </div>
          </div>
          
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {courseData.stats?.totalQuizzes || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'ar' ? 'اختبار' : 'Quizzes'}
            </div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {courseData.stats?.totalProjects || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'ar' ? 'مشروع' : 'Projects'}
            </div>
          </div>
          
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {courseData.stats?.estimatedHours || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'ar' ? 'ساعة' : 'Hours'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Enrollment Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold mb-2">
              {language === 'ar' ? 'ابدأ رحلتك التعليمية' : 'Start Your Learning Journey'}
            </h3>
            <p className="opacity-90">
              {language === 'ar' ? 'انضم إلى آلاف الطلاب واحصل على شهادة معتمدة' : 'Join thousands of students and get certified'}
            </p>
          </div>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            {language === 'ar' ? 'ابدأ الآن' : 'Start Now'}
          </button>
        </div>
      </div>
    </div>
  );
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

  // Effect to fetch course data from API
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔍 Fetching course details for ID:', courseId);
        
        // Fetch both course details and content in parallel
        const [courseResponse, contentResponse] = await Promise.allSettled([
          CoursesService.getCourseDetails(courseId),
          CoursesService.getCourseContent(courseId)
        ]);
        
        console.log('✅ Course details received:', courseResponse);
        console.log('✅ Course content received:', contentResponse);
        
        // Handle course details
        if (courseResponse.status === 'fulfilled' && courseResponse.value.success && courseResponse.value.data) {
          const courseData = courseResponse.value.data;
          
          // Handle course content
          let courseSections = [];
          if (contentResponse.status === 'fulfilled' && contentResponse.value.success && contentResponse.value.data) {
            // Transform content data to sections format
            const materials = contentResponse.value.data;
            
            if (materials && materials.length > 0) {
              // Group materials by type or create a single section
              courseSections = [
                {
                  id: "course-content",
                  title: {
                    en: "Course Materials",
                    ar: "مواد الكورس"
                  },
                  lessons: materials.length,
                  completed: 0,
                  expanded: true,
                  lessons: materials.map((material, index) => ({
                    id: `material-${material.id || index}`,
                    type: material.type || "video", // بناءً على نوع المادة
                    title: {
                      en: material.title || material.name || `Material ${index + 1}`,
                      ar: material.title || material.name || `مادة ${index + 1}`
                    },
                    duration: material.duration ? {
                      en: `${material.duration} min`,
                      ar: `${material.duration} دقيقة`
                    } : undefined,
                    status: index === 0 ? "current" : "locked", // أول درس نشط
                    content: material.content,
                    url: material.url,
                    description: material.description,
                    materialData: material // حفظ البيانات الأصلية
                  }))
                }
              ];
            }
          }
          
          // If no content found, create default overview section
          if (courseSections.length === 0) {
            courseSections = [
              {
                id: "section-1",
                title: {
                  en: "Course Overview",
                  ar: "نظرة عامة على الكورس"
                },
                lessons: 1,
                completed: 0,
                expanded: true,
                lessons: [
                  {
                    id: "overview",
                    type: "info",
                    title: {
                      en: "Course Information",
                      ar: "معلومات الكورس"
                    },
                    status: "current"
                  }
                ]
              }
            ];
          }
          
          // Transform API data to component format
          const transformedCourse = {
            id: courseData.id,
            title: courseData.title,
            progress: 0, // يمكن إضافة تتبع التقدم لاحقاً
            courseData: courseData, // حفظ البيانات الأصلية
            sections: courseSections
          };
          
          setCourse(transformedCourse);
          
          // Set initial expanded sections
          const initialExpanded = {};
          transformedCourse.sections.forEach((section) => {
            initialExpanded[section.id] = section.expanded || false;
          });
          setExpandedSections(initialExpanded);
          
          // Set the first lesson as current
          if (transformedCourse.sections[0]?.lessons[0]) {
            setCurrentLesson(transformedCourse.sections[0].lessons[0]);
          }
        } else {
          setError('Course not found or invalid response');
        }
      } catch (err) {
        console.error('❌ Error fetching course data:', err);
        setError(err.message || 'Failed to load course details');
      } finally {
        setLoading(false);
      }
    };
    
    if (courseId) {
      fetchCourseData();
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
                  
                  {currentLesson.type === "info" && (
                    <CourseOverviewLesson course={course} />
                  )}
                  
                  {currentLesson.materialData && (
                    <CourseMaterialLesson lesson={currentLesson} />
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