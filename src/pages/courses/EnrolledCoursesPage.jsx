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
  Star
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import Navbar from "../../components/navigation/Navbar";

// Mock data for enrolled courses
const ENROLLED_COURSES = [
  {
    id: "physics-mechanics",
    title: {
      en: "Physics - Mechanics",
      ar: "الفيزياء - الميكانيكا"
    },
    description: {
      en: "Learn the fundamentals of mechanics, including motion, forces, energy, and Newton's laws.",
      ar: "تعلم أساسيات الميكانيكا، بما في ذلك الحركة، القوى، الطاقة، وقوانين نيوتن."
    },
    category: {
      en: "Physics",
      ar: "الفيزياء"
    },
    level: {
      en: "Secondary 2nd Year",
      ar: "الصف الثاني الثانوي"
    },
    duration: {
      en: "12 hours",
      ar: "١٢ ساعة"
    },
    instructor: {
      en: "Dr. Ahmed Shawky",
      ar: "د. أحمد شوقي"
    },
    progress: 75,
    rating: 4.9,
    studentsCount: 3580,
    image: "/api/placeholder/400/225",
    status: "in_progress"
  },
  {
    id: "chemistry-organic",
    title: {
      en: "Chemistry - Organic Chemistry",
      ar: "الكيمياء - الكيمياء العضوية"
    },
    description: {
      en: "Explore the fascinating world of organic chemistry with a focus on carbon compounds and their reactions.",
      ar: "استكشف العالم المثير للكيمياء العضوية مع التركيز على مركبات الكربون وتفاعلاتها."
    },
    category: {
      en: "Chemistry",
      ar: "الكيمياء"
    },
    level: {
      en: "Secondary 3rd Year",
      ar: "الصف الثالث الثانوي"
    },
    duration: {
      en: "14 hours",
      ar: "١٤ ساعة"
    },
    instructor: {
      en: "Dr. Laila Mahmoud",
      ar: "د. ليلى محمود"
    },
    progress: 45,
    rating: 4.8,
    studentsCount: 2400,
    image: "/api/placeholder/400/225",
    status: "in_progress"
  },
  {
    id: "math-calculus",
    title: {
      en: "Mathematics - Calculus Fundamentals",
      ar: "الرياضيات - أساسيات التفاضل والتكامل"
    },
    description: {
      en: "Master the essential concepts of calculus including limits, derivatives, and integrals.",
      ar: "إتقان المفاهيم الأساسية للتفاضل والتكامل بما في ذلك الحدود والمشتقات والتكاملات."
    },
    category: {
      en: "Mathematics",
      ar: "الرياضيات"
    },
    level: {
      en: "Secondary 3rd Year",
      ar: "الصف الثالث الثانوي"
    },
    duration: {
      en: "16 hours",
      ar: "١٦ ساعة"
    },
    instructor: {
      en: "Dr. Kareem Hassan",
      ar: "د. كريم حسن"
    },
    progress: 100,
    rating: 5.0,
    studentsCount: 1580,
    image: "/api/placeholder/400/225",
    status: "completed"
  }
];

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
  continueLearning: {
    en: "Continue Learning",
    ar: "متابعة التعلم"
  },
  viewCertificate: {
    en: "View Certificate",
    ar: "عرض الشهادة"
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
  }
};

const EnrolledCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  
  // Helper function to get text based on language
  const getText = (textObj) => {
    if (!textObj || typeof textObj !== 'object') {
      return textObj || '';
    }
    return textObj[language] || textObj.en || '';
  };
  
  // Load courses on component mount
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setCourses(ENROLLED_COURSES);
      setFilteredCourses(ENROLLED_COURSES);
      setIsLoading(false);
    }, 1000);
  }, []);
  
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
        getText(course.instructor).toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(course => course.status === statusFilter);
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

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-[#f5f7fa] text-[#37474F]'} ${isRTL ? 'font-tajawal' : ''}`}>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
        <h1 className="text-3xl font-bold mb-8">{getText(UI_TEXT.enrolledCourses)}</h1>
        
        {/* Filters and Search */}
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
        
        {/* Course Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="w-12 h-12 border-4 rounded-full border-blue-500 border-t-transparent animate-spin"></div>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <div 
                key={index} 
                className={`rounded-xl overflow-hidden shadow-md transition-all hover:-translate-y-1 hover:shadow-lg ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}
              >
                <div className="relative">
                  <img 
                    src={course.image || "/api/placeholder/400/225"} 
                    alt={getText(course.title)} 
                    className="w-full h-48 object-cover"
                  />
                  
                  {/* Progress bar overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                    <div className="flex items-center justify-between text-white text-sm mb-1">
                      <span>{getText(UI_TEXT.progress)}</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-300/30 rounded-full h-2">
                      <div 
                        className="bg-[#3949AB] h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Status badge */}
                  <div className={`absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full ${
                    course.status === 'completed' 
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}>
                    {course.status === 'completed' ? getText(UI_TEXT.completed) : getText(UI_TEXT.inProgress)}
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
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{getText(course.level)}</p>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'} 
                            fill={i < Math.floor(course.rating) ? '#f59e0b' : 'none'} 
                          />
                        ))}
                      </div>
                      <span className="text-xs ml-1">{course.rating}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock size={14} className="mr-1" />
                      <span>{getText(course.duration)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {getText(course.instructor)}
                    </div>
                  </div>
                  
                  <Link 
                    to={`/courses/${course.id}/content`}
                    className={`mt-4 w-full py-2 flex items-center justify-center rounded-lg font-medium text-sm transition-colors ${
                      course.status === 'completed'
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-[#3949AB] hover:bg-[#303F9F] text-white'
                    }`}
                  >
                    {course.status === 'completed' ? getText(UI_TEXT.viewCertificate) : getText(UI_TEXT.continueLearning)}
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default EnrolledCoursesPage;