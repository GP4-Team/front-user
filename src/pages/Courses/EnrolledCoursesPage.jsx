// src/pages/courses/AllCoursesPage.jsx
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

// Mock data for courses
const ALL_COURSES = [
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
    price: {
      amount: 0,
      currency: "EGP"
    },
    rating: 4.9,
    studentsCount: 3580,
    image: "/api/placeholder/400/225",
    isFeatured: true
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
    price: {
      amount: 240,
      currency: "EGP"
    },
    rating: 4.8,
    studentsCount: 2400,
    image: "/api/placeholder/400/225",
    isFeatured: false
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
    price: {
      amount: 350,
      currency: "EGP"
    },
    rating: 5.0,
    studentsCount: 1580,
    image: "/api/placeholder/400/225",
    isFeatured: true
  },
  {
    id: "physics-electricity",
    title: {
      en: "Physics - Electricity and Magnetism",
      ar: "الفيزياء - الكهرباء والمغناطيسية"
    },
    description: {
      en: "Study electric and magnetic phenomena, circuits, and electromagnetic waves.",
      ar: "دراسة الظواهر الكهربائية والمغناطيسية والدوائر والموجات الكهرومغناطيسية."
    },
    category: {
      en: "Physics",
      ar: "الفيزياء"
    },
    level: {
      en: "Secondary 3rd Year",
      ar: "الصف الثالث الثانوي"
    },
    duration: {
      en: "15 hours",
      ar: "١٥ ساعة"
    },
    instructor: {
      en: "Dr. Mohamed Nour",
      ar: "د. محمد نور"
    },
    price: {
      amount: 280,
      currency: "EGP"
    },
    rating: 4.7,
    studentsCount: 2100,
    image: "/api/placeholder/400/225",
    isFeatured: false
  },
  {
    id: "biology-cells",
    title: {
      en: "Biology - Cell Biology",
      ar: "الأحياء - بيولوجيا الخلية"
    },
    description: {
      en: "Understand the fundamental unit of life - the cell, its structure, and functions.",
      ar: "فهم الوحدة الأساسية للحياة - الخلية، بنيتها، ووظائفها."
    },
    category: {
      en: "Biology",
      ar: "الأحياء"
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
      en: "Dr. Sara Ahmed",
      ar: "د. سارة أحمد"
    },
    price: {
      amount: 240,
      currency: "EGP"
    },
    rating: 4.6,
    studentsCount: 1750,
    image: "/api/placeholder/400/225",
    isFeatured: false
  }
];

// UI Text translations
const UI_TEXT = {
  allCourses: {
    en: "All Courses",
    ar: "جميع المواد"
  },
  filterBy: {
    en: "Filter By",
    ar: "تصفية حسب"
  },
  subject: {
    en: "Subject",
    ar: "المادة"
  },
  level: {
    en: "Level",
    ar: "المستوى"
  },
  price: {
    en: "Price",
    ar: "السعر"
  },
  rating: {
    en: "Rating",
    ar: "التقييم"
  },
  free: {
    en: "Free",
    ar: "مجاني"
  },
  paid: {
    en: "Paid",
    ar: "مدفوع"
  },
  search: {
    en: "Search for courses...",
    ar: "البحث عن مواد..."
  },
  studentsEnrolled: {
    en: "students enrolled",
    ar: "طالب مسجل"
  },
  viewCourse: {
    en: "View Course",
    ar: "عرض المادة"
  },
  noCoursesFound: {
    en: "No courses found",
    ar: "لم يتم العثور على مواد"
  },
  noCoursesDescription: {
    en: "Try adjusting your filters or search term",
    ar: "حاول ضبط المرشحات أو مصطلح البحث"
  }
};

// Get icon for subject (simplified version to avoid errors)
const getSubjectIcon = (category) => {
  return <BookOpen />;
};

const AllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    subject: "all",
    level: "all",
    price: "all",
    rating: "all"
  });
  
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  
  // SAFE getText function to avoid undefined errors
  const getText = (textObj) => {
    // Check if textObj is undefined or not an object
    if (!textObj || typeof textObj !== 'object') {
      return textObj || '';
    }
    
    // Return the appropriate language version or fallback
    return textObj[language] || textObj.en || '';
  };
  
  // Load courses on component mount
  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setCourses(ALL_COURSES);
      setFilteredCourses(ALL_COURSES);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Filter courses when filters or search term changes
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
    
    // Apply subject filter
    if (filters.subject !== "all") {
      result = result.filter(course => 
        getText(course.category).toLowerCase() === filters.subject.toLowerCase()
      );
    }
    
    // Apply level filter
    if (filters.level !== "all") {
      result = result.filter(course => 
        getText(course.level).toLowerCase().includes(filters.level.toLowerCase())
      );
    }
    
    // Apply price filter
    if (filters.price !== "all") {
      if (filters.price === "free") {
        result = result.filter(course => course.price.amount === 0);
      } else {
        result = result.filter(course => course.price.amount > 0);
      }
    }
    
    // Apply rating filter
    if (filters.rating !== "all") {
      const minRating = parseInt(filters.rating);
      result = result.filter(course => course.rating >= minRating);
    }
    
    setFilteredCourses(result);
  }, [courses, searchTerm, filters, language]);
  
  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-[#f5f7fa] text-[#37474F]'} ${isRTL ? 'font-tajawal' : ''}`}>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{getText(UI_TEXT.allCourses)}</h1>
        
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
          
          <div className="flex flex-wrap gap-3">
            {/* Subject Filter */}
            <div className={`relative ${isDarkMode ? 'bg-[#1E1E1E] border-gray-700' : 'bg-white border-gray-200'} border rounded-lg`}>
              <div className="flex items-center px-4 py-2 cursor-pointer">
                <span className="text-sm">{getText(UI_TEXT.subject)}</span>
                <ChevronDown size={16} className="ml-2" />
              </div>
              {/* Dropdown would go here */}
            </div>
            
            {/* Level Filter */}
            <div className={`relative ${isDarkMode ? 'bg-[#1E1E1E] border-gray-700' : 'bg-white border-gray-200'} border rounded-lg`}>
              <div className="flex items-center px-4 py-2 cursor-pointer">
                <span className="text-sm">{getText(UI_TEXT.level)}</span>
                <ChevronDown size={16} className="ml-2" />
              </div>
              {/* Dropdown would go here */}
            </div>
            
            {/* Price Filter */}
            <div className={`relative ${isDarkMode ? 'bg-[#1E1E1E] border-gray-700' : 'bg-white border-gray-200'} border rounded-lg`}>
              <div className="flex items-center px-4 py-2 cursor-pointer">
                <span className="text-sm">{getText(UI_TEXT.price)}</span>
                <ChevronDown size={16} className="ml-2" />
              </div>
              {/* Dropdown would go here */}
            </div>
            
            {/* Rating Filter */}
            <div className={`relative ${isDarkMode ? 'bg-[#1E1E1E] border-gray-700' : 'bg-white border-gray-200'} border rounded-lg`}>
              <div className="flex items-center px-4 py-2 cursor-pointer">
                <span className="text-sm">{getText(UI_TEXT.rating)}</span>
                <ChevronDown size={16} className="ml-2" />
              </div>
              {/* Dropdown would go here */}
            </div>
            
            {/* Reset Filters Button */}
            <button className={`px-4 py-2 rounded-lg flex items-center ${isDarkMode ? 'bg-[#3949AB] text-white' : 'bg-[#3949AB] text-white'}`}>
              <Filter size={16} className="mr-2" />
              <span className="text-sm">{getText(UI_TEXT.filterBy)}</span>
            </button>
          </div>
        </div>
        
        {/* Course Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="w-12 h-12 border-4 rounded-full border-blue-500 border-t-transparent animate-spin"></div>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  
                  {course.price && course.price.amount === 0 && (
                    <div className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-green-500 text-white rounded-full">
                      {getText(UI_TEXT.free)}
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-[#3949AB]/20' : 'bg-blue-100'} mr-2`}>
                      {getSubjectIcon(getText(course.category))}
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
                      <User size={14} className="mr-1" />
                      <span>{course.studentsCount}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock size={14} className="text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">{getText(course.duration)}</span>
                    </div>
                    
                    {course.price && (
                      <div className="text-lg font-bold">
                        {course.price.amount === 0 
                          ? getText(UI_TEXT.free)
                          : `${course.price.amount} ${course.price.currency}`
                        }
                      </div>
                    )}
                  </div>
                  
                  <Link 
                    to={`/courses/${course.id}`}
                    className="mt-4 w-full py-2 flex items-center justify-center bg-[#3949AB] text-white rounded-lg font-medium text-sm hover:bg-[#303F9F] transition-colors"
                  >
                    {getText(UI_TEXT.viewCourse)}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <BookOpen size={48} className="text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">{getText(UI_TEXT.noCoursesFound)}</h2>
            <p className="text-gray-500 dark:text-gray-400">{getText(UI_TEXT.noCoursesDescription)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCoursesPage;