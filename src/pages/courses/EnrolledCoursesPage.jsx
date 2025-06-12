// src/pages/courses/EnrolledCoursesPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Clock, 
  User, 
  ArrowRight, 
  Search,
  Filter,
  ChevronDown,
  Star,
  AlertCircle
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../components/navigation/Navbar";
import UserService from "../../services/api/user.service";

// UI Text translations
const UI_TEXT = {
  enrolledCourses: {
    en: "My Enrolled Courses",
    ar: "المواد المسجلة"
  },
  progress: {
    en: "Progress",
    ar: "التقدم"
  },
  completed: {
    en: "Completed",
    ar: "مكتمل"
  },
  inProgress: {
    en: "In Progress",
    ar: "قيد التقدم"
  },
  registered: {
    en: "Registered",
    ar: "مسجل"
  },
  continueLearning: {
    en: "Continue Learning",
    ar: "متابعة التعلم"
  },
  viewCourse: {
    en: "View Course",
    ar: "عرض المادة"
  },
  search: {
    en: "Search courses...",
    ar: "البحث في المواد..."
  },
  filterBy: {
    en: "Filter By",
    ar: "تصفية حسب"
  },
  all: {
    en: "All",
    ar: "الكل"
  },
  noCourses: {
    en: "No enrolled courses found",
    ar: "لا توجد مواد مسجلة"
  },
  noCoursesDescription: {
    en: "You haven't enrolled in any courses yet. Browse our catalog to get started.",
    ar: "لم تسجل في أي مواد بعد. تصفح الكتالوج الخاص بنا للبدء."
  },
  loading: {
    en: "Loading your courses...",
    ar: "جاري تحميل موادك..."
  },
  error: {
    en: "Error loading courses",
    ar: "خطأ في تحميل المواد"
  },
  tryAgain: {
    en: "Try Again",
    ar: "إعادة المحاولة"
  },
  semester: {
    en: "Semester",
    ar: "الفصل الدراسي"
  },
  courseCode: {
    en: "Course Code",
    ar: "رمز المادة"
  },
  registeredAt: {
    en: "Registered",
    ar: "تاريخ التسجيل"
  }
};

const EnrolledCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const { isAuthenticated } = useAuth();
  
  // Helper function to get text based on language
  const getText = (textObj) => {
    if (!textObj || typeof textObj !== 'object') {
      return textObj || '';
    }
    return textObj[language] || textObj.en || '';
  };

  // Helper function to get category name in Arabic/English
  const getCategoryName = (courseCode) => {
    // Extract category from course code
    if (courseCode.includes('MATH')) {
      return language === 'ar' ? 'الرياضيات' : 'Mathematics';
    } else if (courseCode.includes('CHEM')) {
      return language === 'ar' ? 'الكيمياء' : 'Chemistry';
    } else if (courseCode.includes('SCI')) {
      return language === 'ar' ? 'العلوم' : 'Science';
    } else if (courseCode.includes('ARAB')) {
      return language === 'ar' ? 'اللغة العربية' : 'Arabic Language';
    } else if (courseCode.includes('PHYS')) {
      return language === 'ar' ? 'الفيزياء' : 'Physics';
    } else if (courseCode.includes('ENG')) {
      return language === 'ar' ? 'اللغة الإنجليزية' : 'English Language';
    }
    return language === 'ar' ? 'مادة عامة' : 'General Subject';
  };

  // Helper function to get level from course code
  const getLevel = (courseCode) => {
    if (courseCode.includes('_G1')) {
      return language === 'ar' ? 'الصف الأول' : 'Grade 1';
    } else if (courseCode.includes('_G2')) {
      return language === 'ar' ? 'الصف الثاني' : 'Grade 2';
    } else if (courseCode.includes('_M3')) {
      return language === 'ar' ? 'الصف الثالث المتوسط' : 'Middle School Grade 3';
    } else if (courseCode.includes('_S1')) {
      return language === 'ar' ? 'الصف الأول الثانوي' : 'High School Grade 1';
    } else if (courseCode.includes('_S2')) {
      return language === 'ar' ? 'الصف الثاني الثانوي' : 'High School Grade 2';
    } else if (courseCode.includes('_S3')) {
      return language === 'ar' ? 'الصف الثالث الثانوي' : 'High School Grade 3';
    }
    return language === 'ar' ? 'مستوى عام' : 'General Level';
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return language === 'ar' 
      ? date.toLocaleDateString('ar-EG')
      : date.toLocaleDateString('en-US');
  };

  // Transform API data to component format
  const transformCourseData = (apiData) => {
    return apiData.map(item => ({
      id: item.course.id,
      registrationId: item.id,
      title: {
        en: item.course.name,
        ar: item.course.name
      },
      description: {
        en: `Course in ${item.course.name}`,
        ar: `دورة في ${item.course.name}`
      },
      category: {
        en: getCategoryName(item.course.code),
        ar: getCategoryName(item.course.code)
      },
      level: {
        en: getLevel(item.course.code),
        ar: getLevel(item.course.code)
      },
      code: item.course.code,
      color: item.course.color,
      semester: {
        en: item.semester.name,
        ar: item.semester.name
      },
      status: item.status, // 'registered', 'completed', etc.
      passed: item.passed,
      registeredAt: item.registered_at,
      // Default values for UI display
      progress: item.passed ? 100 : Math.floor(Math.random() * 80) + 10, // Random progress for demo
      rating: 4.5,
      duration: {
        en: "12 hours",
        ar: "١٢ ساعة"
      },
      instructor: {
        en: "Course Instructor",
        ar: "مدرس المادة"
      },
      image: "https://academy1.gp-app.tafra-tech.com/images/material-holder.webp"
    }));
  };
  
  // Load courses on component mount
  useEffect(() => {
    const fetchRegisteredCourses = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        console.log('📚 Fetching student registered courses...');
        const response = await UserService.getStudentRegisteredCourses();
        
        if (response.success && response.data) {
          const transformedCourses = transformCourseData(response.data);
          setCourses(transformedCourses);
          setFilteredCourses(transformedCourses);
          console.log('✅ Courses loaded successfully:', transformedCourses.length, 'courses');
        } else {
          setError('No courses data received');
        }
      } catch (err) {
        console.error('❌ Error fetching registered courses:', err);
        setError(err.message || 'Failed to load registered courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegisteredCourses();
  }, [isAuthenticated]);
  
  // Filter courses when search term or status filter changes
  useEffect(() => {
    if (courses.length === 0) return;
    
    let result = [...courses];
    
    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(course => 
        getText(course.title).toLowerCase().includes(term) ||
        getText(course.description).toLowerCase().includes(term) ||
        course.code.toLowerCase().includes(term) ||
        getText(course.category).toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      if (statusFilter === "completed") {
        result = result.filter(course => course.passed);
      } else if (statusFilter === "in_progress") {
        result = result.filter(course => !course.passed && course.status === "registered");
      } else {
        result = result.filter(course => course.status === statusFilter);
      }
    }
    
    setFilteredCourses(result);
  }, [courses, searchTerm, statusFilter, language]);
  
  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle status filter
  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  // Handle retry loading
  const handleRetry = () => {
    window.location.reload();
  };

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-[#f5f7fa] text-[#37474F]'}`}>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <User size={48} className="text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              {language === 'ar' ? 'يجب تسجيل الدخول' : 'Login Required'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
              {language === 'ar' ? 'يجب تسجيل الدخول لعرض موادك المسجلة' : 'You need to login to view your enrolled courses'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-[#f5f7fa] text-[#37474F]'} ${isRTL ? 'font-tajawal' : ''}`}>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
        <h1 className="text-3xl font-bold mb-8">{getText(UI_TEXT.enrolledCourses)}</h1>
        
        {/* Error State */}
        {error && (
          <div className={`${isDarkMode ? 'bg-red-900/20 border-red-500' : 'bg-red-50 border-red-200'} border rounded-lg p-4 mb-6`}>
            <div className="flex items-center">
              <AlertCircle className="text-red-500 mr-3" size={20} />
              <div>
                <h3 className="font-medium text-red-800 dark:text-red-200">
                  {getText(UI_TEXT.error)}
                </h3>
                <p className="text-red-600 dark:text-red-300 text-sm mt-1">
                  {error}
                </p>
                <button
                  onClick={handleRetry}
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
                >
                  {getText(UI_TEXT.tryAgain)}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Filters and Search */}
        {!error && (
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={getText(UI_TEXT.search)}
                value={searchTerm}
                onChange={handleSearch}
                className={`w-full pl-10 pr-4 py-3 rounded-lg ${
                  isDarkMode ? 'bg-[#1E1E1E] border-gray-700' : 'bg-white border-gray-200'
                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            
            <div className="flex gap-2">
              {["all", "in_progress", "completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-[#3949AB] text-white'
                      : isDarkMode 
                        ? 'bg-[#1E1E1E] text-gray-300 hover:bg-[#2E2E2E]'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {status === "all" && getText(UI_TEXT.all)}
                  {status === "in_progress" && getText(UI_TEXT.inProgress)}
                  {status === "completed" && getText(UI_TEXT.completed)}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Course Grid */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center min-h-[400px]">
            <div className="w-12 h-12 border-4 rounded-full border-blue-500 border-t-transparent animate-spin mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">{getText(UI_TEXT.loading)}</p>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <div 
                key={`${course.id}-${course.registrationId}`} 
                className={`rounded-xl overflow-hidden shadow-md transition-all hover:-translate-y-1 hover:shadow-lg ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}
              >
                <div className="relative">
                  <div 
                    className="w-full h-48 flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: course.color }}
                  >
                    {getText(course.title)}
                  </div>
                  
                  {/* Progress bar overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                    <div className="flex items-center justify-between text-white text-sm mb-1">
                      <span>{getText(UI_TEXT.progress)}</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-300/30 rounded-full h-2">
                      <div 
                        className="bg-white h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Status badge */}
                  <div className={`absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full ${
                    course.passed
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}>
                    {course.passed ? getText(UI_TEXT.completed) : getText(UI_TEXT.registered)}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-[#3949AB]/20' : 'bg-blue-100'} mr-2`}>
                      <BookOpen size={16} className="text-[#3949AB]" />
                    </div>
                    <span className="text-sm text-[#3949AB]">{getText(course.category)}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-1">{getText(course.title)}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{getText(course.level)}</p>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{getText(UI_TEXT.courseCode)}:</span>
                      <span className="font-mono">{course.code}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{getText(UI_TEXT.semester)}:</span>
                      <span className="text-xs">{getText(course.semester)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{getText(UI_TEXT.registeredAt)}:</span>
                      <span className="text-xs">{formatDate(course.registeredAt)}</span>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/courses/${course.id}/info`}
                    className={`mt-4 w-full py-2 flex items-center justify-center rounded-lg font-medium text-sm transition-colors ${
                      course.passed
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-[#3949AB] hover:bg-[#303F9F] text-white'
                    }`}
                  >
                    {getText(UI_TEXT.viewCourse)}
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : !error ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <BookOpen size={48} className="text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">{getText(UI_TEXT.noCourses)}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">{getText(UI_TEXT.noCoursesDescription)}</p>
            <Link 
              to="/courses"
              className="mt-4 bg-[#3949AB] hover:bg-[#303F9F] text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {language === 'ar' ? 'تصفح المواد' : 'Browse Courses'}
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EnrolledCoursesPage;