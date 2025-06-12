// src/pages/courses/CourseInfoPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../components/navigation/Navbar";
import CoursesService from "../../services/api/courses.service";

const CourseInfoPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const { isAuthenticated } = useAuth();
  
  // State for the course data
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Helper function to get text based on language
  const getText = (obj) => {
    if (!obj) return "";
    return language === "ar" ? obj.ar : obj.en;
  };

  // Helper methods for data transformation
  const getCategoryNameAr = (departmentId) => {
    const categories = {
      1: 'الرياضيات',
      2: 'العلوم',
      3: 'اللغة العربية',
      4: 'اللغة الإنجليزية',
      5: 'التاريخ',
      6: 'الجغرافيا',
      7: 'الفيزياء',
      8: 'الكيمياء',
      9: 'الأحياء'
    };
    return categories[departmentId] || 'مادة عامة';
  };

  const getCategoryNameEn = (departmentId) => {
    const categories = {
      1: 'Mathematics',
      2: 'Science',
      3: 'Arabic Language',
      4: 'English Language',
      5: 'History',
      6: 'Geography',
      7: 'Physics',
      8: 'Chemistry',
      9: 'Biology'
    };
    return categories[departmentId] || 'General Subject';
  };

  const getLevelNameAr = (levelId) => {
    const levels = {
      1: 'الصف الأول الابتدائي',
      2: 'الصف الثاني الابتدائي',
      3: 'الصف الثالث الابتدائي',
      4: 'الصف الرابع الابتدائي',
      5: 'الصف الخامس الابتدائي',
      6: 'الصف السادس الابتدائي',
      7: 'الصف الأول المتوسط',
      8: 'الصف الثاني المتوسط',
      9: 'الصف الثالث المتوسط',
      10: 'الصف الأول الثانوي',
      11: 'الصف الثاني الثانوي',
      12: 'الصف الثالث الثانوي'
    };
    return levels[levelId] || 'مستوى عام';
  };

  const getLevelNameEn = (levelId) => {
    const levels = {
      1: 'Grade 1',
      2: 'Grade 2', 
      3: 'Grade 3',
      4: 'Grade 4',
      5: 'Grade 5',
      6: 'Grade 6',
      7: 'Grade 7',
      8: 'Grade 8',
      9: 'Grade 9',
      10: 'Grade 10',
      11: 'Grade 11',
      12: 'Grade 12'
    };
    return levels[levelId] || 'General Level';
  };

  // Effect to fetch course data from API
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('🔍 Fetching course info for ID:', courseId);
        
        // Call real API to get course details using api/courses/{id}
        const courseResponse = await CoursesService.getCourseDetails(courseId);
        
        console.log('✅ Course details received:', courseResponse);
        
        if (courseResponse.success && courseResponse.data) {
          const courseData = courseResponse.data;
          
          // Transform API data to the format required by components
          // Only use data that's actually available from the API
          const transformedCourse = {
            id: courseData.id,
            title: {
              ar: courseData.name,
              en: courseData.name
            },
            description: {
              ar: `دورة ${courseData.name} للمستوى ${getLevelNameAr(courseData.educational_level_id)}`,
              en: `${courseData.name} course for ${getLevelNameEn(courseData.educational_level_id)}`
            },
            category: {
              ar: getCategoryNameAr(courseData.educational_department_id),
              en: getCategoryNameEn(courseData.educational_department_id)
            },
            level: {
              ar: getLevelNameAr(courseData.educational_level_id),
              en: getLevelNameEn(courseData.educational_level_id)
            },
            image: courseData.image || 'https://academy1.gp-app.tafra-tech.com/images/material-holder.webp',
            code: courseData.code,
            color: courseData.color || '#4285F4',
            // Keep original API data for reference
            originalData: courseData
          };
          
          setCourse(transformedCourse);
          
          // Update page title
          document.title = courseData.name;
        } else {
          setError('Course not found or invalid response');
        }
      } catch (err) {
        console.error('❌ Error fetching course data:', err);
        setError(err.message || 'Failed to load course information');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (courseId) {
      fetchCourseData();
    }
  }, [courseId, language]);

  // Function to handle enrollment / access to course content
  const handleEnrollment = () => {
    // Direct navigation to course content page
    navigate(`/courses/${courseId}/content`);
  };

  // Show loading screen
  if (isLoading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <Navbar />
        <div className="pt-16 flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-lg">
              {language === "ar" ? "جاري تحميل معلومات الكورس..." : "Loading course information..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show error screen
  if (error) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <Navbar />
        <div className="pt-16 flex items-center justify-center h-96">
          <div className="text-center p-4">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold mb-2">
              {language === "ar" ? "خطأ في تحميل الكورس" : "Error Loading Course"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition duration-300"
              >
                {language === "ar" ? "إعادة المحاولة" : "Try Again"}
              </button>
              <Link
                to="/courses"
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-300"
              >
                {language === "ar" ? "العودة إلى الكورسات" : "Back to Courses"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If course not found
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
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content with top padding for navbar */}
      <div className="pt-16">
        <div className="container mx-auto px-4 py-6 lg:py-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Course Details - Left Column (2/3 width) */}
            <div className="lg:w-2/3 space-y-6">
              {/* Course Header */}
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
                <div className="flex items-start gap-4">
                  <img
                    src={course.image}
                    alt={getText(course.title)}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    onError={(e) => {
                      e.target.src = 'https://academy1.gp-app.tafra-tech.com/images/material-holder.webp';
                    }}
                  />
                  <div className="flex-1">
                    <h1 className={`text-2xl lg:text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {getText(course.title)}
                    </h1>
                    <p className={`text-lg mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {getText(course.description)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${isDarkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'}`}>
                        {getText(course.category)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                        {getText(course.level)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Course Description */}
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
                <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {language === "ar" ? "وصف الكورس" : "Course Description"}
                </h3>
                <div className={`prose max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
                  <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {getText(course.description)}
                  </p>
                </div>
              </div>
              
              {/* Course Details from API */}
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
                <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {language === "ar" ? "تفاصيل الكورس" : "Course Details"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {language === "ar" ? "رمز الكورس" : "Course Code"}
                    </h4>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {course.code}
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {language === "ar" ? "المادة الدراسية" : "Subject"}
                    </h4>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {getText(course.category)}
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {language === "ar" ? "المستوى التعليمي" : "Educational Level"}
                    </h4>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {getText(course.level)}
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {language === "ar" ? "الحالة" : "Status"}
                    </h4>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {language === "ar" ? "متاح للدراسة" : "Available for Study"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Course Action Card - Right Column (1/3 width) */}
            <div className="lg:w-1/3">
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6 sticky top-24`}>
                {/* Course Image */}
                <div className="mb-6">
                  <img
                    src={course.image}
                    alt={getText(course.title)}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = 'https://academy1.gp-app.tafra-tech.com/images/material-holder.webp';
                    }}
                  />
                </div>
                
                {/* Course Title */}
                <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {getText(course.title)}
                </h2>
                
                {/* Course Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {language === "ar" ? "المادة:" : "Subject:"}
                    </span>
                    <span className={`text-sm ml-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {getText(course.category)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {language === "ar" ? "المستوى:" : "Level:"}
                    </span>
                    <span className={`text-sm ml-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {getText(course.level)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {language === "ar" ? "الرمز:" : "Code:"}
                    </span>
                    <span className={`text-sm ml-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {course.code}
                    </span>
                  </div>
                </div>
                
                {/* Access Button */}
                <button
                  onClick={handleEnrollment}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
                >
                  {language === "ar" ? "الدخول للمادة" : "Access Course"}
                </button>
              </div>
              
              {/* Share Section */}
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-4 mt-6`}>
                <h3 className={`font-medium text-base mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {language === "ar" ? "شارك الكورس" : "Share Course"}
                </h3>
                <div className="flex gap-3 justify-center">
                  <button className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"/>
                    </svg>
                  </button>
                  
                  <button className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z"/>
                    </svg>
                  </button>
                  
                  <button className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInfoPage;