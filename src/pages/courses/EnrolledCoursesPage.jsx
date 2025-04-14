import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, User, ArrowRight, Home } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import Navbar from "../../components/navigation/Navbar";

// Mock data for enrolled courses - with Arabic content
const MOCK_COURSES = [
  {
    id: "course-1",
    title: {
      en: "Introduction to React",
      ar: "مقدمة في رياكت",
    },
    description: {
      en: "Learn the fundamentals of React, including components, props, state, and hooks.",
      ar: "تعلم أساسيات رياكت، بما في ذلك المكونات، والخصائص، والحالة، والخطافات.",
    },
    duration: {
      en: "10 hours",
      ar: "١٠ ساعات",
    },
    instructor: {
      en: "Dr. Heba Ahmed",
      ar: "د. هبة أحمد",
    },
    coverImage: "/api/placeholder/400/225",
    totalVideos: 5,
  },
  {
    id: "course-2",
    title: {
      en: "Advanced Database Systems",
      ar: "أنظمة قواعد البيانات المتقدمة",
    },
    description: {
      en: "Explore advanced database concepts including query optimization, indexing strategies, and transaction management.",
      ar: "استكشف مفاهيم قواعد البيانات المتقدمة بما في ذلك تحسين الاستعلام، واستراتيجيات الفهرسة، وإدارة المعاملات.",
    },
    duration: {
      en: "12 hours",
      ar: "١٢ ساعة",
    },
    instructor: {
      en: "Dr. Mahmoud Ali",
      ar: "د. محمود علي",
    },
    coverImage: "/api/placeholder/400/225",
    totalVideos: 6,
  },
  {
    id: "course-3",
    title: {
      en: "Software Engineering Principles",
      ar: "مبادئ هندسة البرمجيات",
    },
    description: {
      en: "Learn best practices in software engineering, including design patterns, testing methodologies, and project management.",
      ar: "تعلم أفضل الممارسات في هندسة البرمجيات، بما في ذلك أنماط التصميم، ومنهجيات الاختبار، وإدارة المشاريع.",
    },
    duration: {
      en: "15 hours",
      ar: "١٥ ساعة",
    },
    instructor: {
      en: "Dr. Samia Hassan",
      ar: "د. سامية حسن",
    },
    coverImage: "/api/placeholder/400/225",
    totalVideos: 7,
  },
];

// UI text translations
const translations = {
  pageTitle: {
    en: "My Courses",
    ar: "دوراتي",
  },
  browseMore: {
    en: "Browse More Courses",
    ar: "تصفح المزيد من الدورات",
  },
  noCourses: {
    en: "No Courses Found",
    ar: "لم يتم العثور على دورات",
  },
  noCoursesMessage: {
    en: "You haven't enrolled in any courses yet. Browse our catalog to find courses that interest you.",
    ar: "لم تقم بالتسجيل في أي دورات بعد. تصفح كتالوج الدورات للعثور على دورات تهمك.",
  },
  viewCourse: {
    en: "View Course",
    ar: "عرض الدورة",
  },
  complete: {
    en: "Complete",
    ar: "مكتمل",
  },
  loading: {
    en: "Loading your courses...",
    ar: "جاري تحميل دوراتك...",
  },
};

const EnrolledCoursesPage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [watchedVideos, setWatchedVideos] = useState({});
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();

  // Load watched videos from localStorage on component mount
  useEffect(() => {
    const loadWatchedVideos = () => {
      try {
        const savedWatchedVideos = localStorage.getItem("watchedVideos");
        if (savedWatchedVideos) {
          setWatchedVideos(JSON.parse(savedWatchedVideos));
        }
      } catch (error) {
        console.error("Error loading watched videos:", error);
      }
    };

    // Fetch enrolled courses - using mock data for now
    const fetchCourses = () => {
      setIsLoading(true);

      // Simulate API call with timeout
      setTimeout(() => {
        setEnrolledCourses(MOCK_COURSES);
        setIsLoading(false);
      }, 1000);
    };

    loadWatchedVideos();
    fetchCourses();
  }, []);

  // Calculate progress for a course
  const calculateProgress = (courseId) => {
    const courseVideoIds = [];

    // In a real app, this would be more dynamic
    // For now, we'll use a pattern to generate video IDs based on course ID
    const totalVideos =
      MOCK_COURSES.find((c) => c.id === courseId)?.totalVideos || 0;

    for (let i = 1; i <= totalVideos; i++) {
      courseVideoIds.push(`${courseId}-video-${i}`);
    }

    if (courseVideoIds.length === 0) return 0;

    const watchedCount = courseVideoIds.filter(
      (videoId) => watchedVideos[videoId]
    ).length;
    return Math.round((watchedCount / courseVideoIds.length) * 100);
  };

  // Get text based on current language
  const getText = (textObj) => {
    return textObj[language] || textObj.en; // Fallback to English if translation not available
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#F0F4F8] dark:bg-[#121212] p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#3949AB] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#37474F] dark:text-white font-medium">
            {translations.loading[language]}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-[#F0F4F8] dark:bg-[#121212] text-[#37474F] dark:text-white ${
        isRTL ? "font-tajawal" : ""
      }`}
    >
      {/* Use the Navbar component */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#37474F] dark:text-white">
            {translations.pageTitle[language]}
          </h1>

          {/* This would link to a course catalog in a real app */}
          <button className="bg-[#3949AB] hover:bg-[#1A237E] text-white px-4 py-2 rounded-lg transition-colors">
            {translations.browseMore[language]}
          </button>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-md p-8 text-center">
            <BookOpen
              size={48}
              className="mx-auto text-[#3949AB] dark:text-[#7986CB] mb-4"
            />
            <h2 className="text-xl font-semibold text-[#37474F] dark:text-white mb-2">
              {translations.noCourses[language]}
            </h2>
            <p className="text-[#3949AB] dark:text-[#AAAAAA]">
              {translations.noCoursesMessage[language]}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => {
              const progress = calculateProgress(course.id);

              return (
                <div
                  key={course.id}
                  className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={course.coverImage}
                      alt={getText(course.title)}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="flex items-center">
                        <span className="text-xs text-white bg-[#3949AB] px-2 py-1 rounded-full">
                          {progress}% {translations.complete[language]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-[#37474F] dark:text-white mb-2">
                      {getText(course.title)}
                    </h3>
                    <p className="text-[#3949AB] dark:text-[#AAAAAA] text-sm line-clamp-2 mb-4">
                      {getText(course.description)}
                    </p>

                    <div className="flex justify-between text-sm text-[#3949AB] dark:text-[#AAAAAA] mb-4">
                      <div className="flex items-center">
                        <User size={16} className="mr-1" />
                        <span>{getText(course.instructor)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        <span>{getText(course.duration)}</span>
                      </div>
                    </div>

                    <div className="w-full bg-[#F0F4F8] dark:bg-[#2D2D2D] rounded-full h-2 mb-4">
                      <div
                        className="bg-[#FFC107] h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <Link
                      to={`/courses/${course.id}`}
                      className="flex items-center justify-center w-full bg-[#F0F4F8] dark:bg-[#2D2D2D] text-[#3949AB] dark:text-white py-2 rounded-lg hover:bg-[#FFC107] hover:text-[#37474F] transition-colors"
                    >
                      {translations.viewCourse[language]}
                      <ArrowRight
                        size={16}
                        className={`${isRTL ? "mr-2" : "ml-2"}`}
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledCoursesPage;
