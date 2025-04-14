import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  User,
  PlayCircle,
  Check,
  Calendar,
  BarChart,
  FileText,
  Award,
  BookOpen,
  Bell,
  Home,
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import Navbar from "../../components/navigation/Navbar"; // Import the Navbar component

// Mock data for courses with Arabic translations
const MOCK_COURSES = {
  "course-1": {
    id: "course-1",
    title: {
      en: "Introduction to React",
      ar: "مقدمة في رياكت",
    },
    description: {
      en: "Learn the fundamentals of React, including components, props, state, and hooks. This comprehensive course covers everything from setting up your development environment to building advanced applications with React Router, Context API, and more. By the end of this course, you will be able to build robust, efficient React applications from scratch.",
      ar: "تعلم أساسيات رياكت، بما في ذلك المكونات، والخصائص، والحالة، والخطافات. تغطي هذه الدورة الشاملة كل شيء من إعداد بيئة التطوير الخاصة بك إلى بناء تطبيقات متقدمة باستخدام React Router وContext API والمزيد. بحلول نهاية هذه الدورة، ستكون قادرًا على بناء تطبيقات رياكت قوية وفعالة من الصفر.",
    },
    duration: {
      en: "10 hours",
      ar: "١٠ ساعات",
    },
    instructor: {
      en: "Dr. Heba Ahmed",
      ar: "د. هبة أحمد",
    },
    coverImage: "/api/placeholder/800/400",
    level: {
      en: "Intermediate",
      ar: "متوسط",
    },
    lastUpdated: {
      en: "October 2023",
      ar: "أكتوبر ٢٠٢٣",
    },
    videos: [
      {
        id: "course-1-video-1",
        title: {
          en: "Introduction to React Components",
          ar: "مقدمة لمكونات رياكت",
        },
        duration: "15:30",
        description: {
          en: "Learn about the building blocks of React applications.",
          ar: "تعلم عن الوحدات الأساسية لتطبيقات رياكت.",
        },
      },
      {
        id: "course-1-video-2",
        title: {
          en: "Props and State Management",
          ar: "إدارة الخصائص والحالة",
        },
        duration: "22:45",
        description: {
          en: "Understand how data flows through React components.",
          ar: "افهم كيفية تدفق البيانات من خلال مكونات رياكت.",
        },
      },
      {
        id: "course-1-video-3",
        title: {
          en: "React Hooks Overview",
          ar: "نظرة عامة على خطافات رياكت",
        },
        duration: "18:20",
        description: {
          en: "Explore the power of hooks for functional components.",
          ar: "استكشف قوة الخطافات للمكونات الوظيفية.",
        },
      },
      {
        id: "course-1-video-4",
        title: {
          en: "Building a Simple React App",
          ar: "بناء تطبيق رياكت بسيط",
        },
        duration: "35:10",
        description: {
          en: "Apply your knowledge to build a complete application.",
          ar: "طبق معرفتك لبناء تطبيق كامل.",
        },
      },
      {
        id: "course-1-video-5",
        title: {
          en: "Context API and Global State",
          ar: "واجهة برمجة السياق وإدارة الحالة العامة",
        },
        duration: "28:15",
        description: {
          en: "Learn how to manage global application state.",
          ar: "تعلم كيفية إدارة حالة التطبيق العامة.",
        },
      },
    ],
  },
  "course-2": {
    id: "course-2",
    title: {
      en: "Advanced Database Systems",
      ar: "أنظمة قواعد البيانات المتقدمة",
    },
    description: {
      en: "Explore advanced database concepts including query optimization, indexing strategies, and transaction management. This course covers both relational and NoSQL databases, with practical examples and case studies from real-world applications. You will learn how to design efficient databases, write optimized queries, and implement robust data management solutions.",
      ar: "استكشف مفاهيم قواعد البيانات المتقدمة بما في ذلك تحسين الاستعلام، واستراتيجيات الفهرسة، وإدارة المعاملات. تغطي هذه الدورة كلاً من قواعد البيانات العلائقية وNoSQL، مع أمثلة عملية ودراسات حالة من تطبيقات العالم الحقيقي. ستتعلم كيفية تصميم قواعد بيانات فعالة، وكتابة استعلامات محسنة، وتنفيذ حلول إدارة بيانات قوية.",
    },
    duration: {
      en: "12 hours",
      ar: "١٢ ساعة",
    },
    instructor: {
      en: "Dr. Mahmoud Ali",
      ar: "د. محمود علي",
    },
    coverImage: "/api/placeholder/800/400",
    level: {
      en: "Advanced",
      ar: "متقدم",
    },
    lastUpdated: {
      en: "November 2023",
      ar: "نوفمبر ٢٠٢٣",
    },
    videos: [
      {
        id: "course-2-video-1",
        title: {
          en: "Database Architecture Overview",
          ar: "نظرة عامة على هيكلية قواعد البيانات",
        },
        duration: "24:15",
        description: {
          en: "Understand the structure of modern database systems.",
          ar: "فهم هيكل أنظمة قواعد البيانات الحديثة.",
        },
      },
      {
        id: "course-2-video-2",
        title: {
          en: "Query Optimization Techniques",
          ar: "تقنيات تحسين الاستعلام",
        },
        duration: "31:40",
        description: {
          en: "Learn how to make your database queries more efficient.",
          ar: "تعلم كيفية جعل استعلامات قاعدة البيانات الخاصة بك أكثر كفاءة.",
        },
      },
      {
        id: "course-2-video-3",
        title: {
          en: "Indexing Strategies",
          ar: "استراتيجيات الفهرسة",
        },
        duration: "28:50",
        description: {
          en: "Explore different indexing methods and when to use them.",
          ar: "استكشف طرق الفهرسة المختلفة ومتى تستخدمها.",
        },
      },
      {
        id: "course-2-video-4",
        title: {
          en: "Transaction Management",
          ar: "إدارة المعاملات",
        },
        duration: "35:20",
        description: {
          en: "Understand ACID properties and transaction isolation levels.",
          ar: "فهم خصائص ACID ومستويات عزل المعاملات.",
        },
      },
      {
        id: "course-2-video-5",
        title: {
          en: "Concurrency Control Mechanisms",
          ar: "آليات التحكم في التزامن",
        },
        duration: "26:45",
        description: {
          en: "Learn how databases handle multiple simultaneous operations.",
          ar: "تعلم كيفية تعامل قواعد البيانات مع العمليات المتزامنة المتعددة.",
        },
      },
      {
        id: "course-2-video-6",
        title: {
          en: "Recovery Techniques",
          ar: "تقنيات الاسترداد",
        },
        duration: "22:30",
        description: {
          en: "Explore methods for database backup and recovery.",
          ar: "استكشف طرق النسخ الاحتياطي واسترداد قواعد البيانات.",
        },
      },
    ],
  },
  "course-3": {
    id: "course-3",
    title: {
      en: "Software Engineering Principles",
      ar: "مبادئ هندسة البرمجيات",
    },
    description: {
      en: "Learn best practices in software engineering, including design patterns, testing methodologies, and project management. This course provides practical knowledge for building maintainable, scalable software systems. You will explore the entire software development lifecycle, from requirements gathering to deployment and maintenance, with a focus on modern agile methodologies.",
      ar: "تعلم أفضل الممارسات في هندسة البرمجيات، بما في ذلك أنماط التصميم، ومنهجيات الاختبار، وإدارة المشاريع. توفر هذه الدورة معرفة عملية لبناء أنظمة برمجية قابلة للصيانة وقابلة للتوسع. ستستكشف دورة حياة تطوير البرمجيات بالكامل، من جمع المتطلبات إلى النشر والصيانة، مع التركيز على منهجيات أجايل الحديثة.",
    },
    duration: {
      en: "15 hours",
      ar: "١٥ ساعة",
    },
    instructor: {
      en: "Dr. Samia Hassan",
      ar: "د. سامية حسن",
    },
    coverImage: "/api/placeholder/800/400",
    level: {
      en: "Intermediate to Advanced",
      ar: "متوسط إلى متقدم",
    },
    lastUpdated: {
      en: "December 2023",
      ar: "ديسمبر ٢٠٢٣",
    },
    videos: [
      {
        id: "course-3-video-1",
        title: {
          en: "Introduction to Software Engineering",
          ar: "مقدمة في هندسة البرمجيات",
        },
        duration: "18:45",
        description: {
          en: "Understand the fundamentals of software engineering as a discipline.",
          ar: "فهم أساسيات هندسة البرمجيات كتخصص.",
        },
      },
      {
        id: "course-3-video-2",
        title: {
          en: "Requirements Gathering and Analysis",
          ar: "جمع وتحليل المتطلبات",
        },
        duration: "27:30",
        description: {
          en: "Learn techniques for capturing and analyzing software requirements.",
          ar: "تعلم تقنيات التقاط وتحليل متطلبات البرمجيات.",
        },
      },
      {
        id: "course-3-video-3",
        title: {
          en: "System Design Principles",
          ar: "مبادئ تصميم النظام",
        },
        duration: "34:15",
        description: {
          en: "Explore architectural patterns and design methodologies.",
          ar: "استكشف أنماط الهندسة المعمارية ومنهجيات التصميم.",
        },
      },
      {
        id: "course-3-video-4",
        title: {
          en: "Design Patterns in Practice",
          ar: "أنماط التصميم في التطبيق العملي",
        },
        duration: "42:20",
        description: {
          en: "Apply common design patterns to solve software problems.",
          ar: "تطبيق أنماط التصميم الشائعة لحل مشاكل البرمجيات.",
        },
      },
      {
        id: "course-3-video-5",
        title: {
          en: "Testing Methodologies",
          ar: "منهجيات الاختبار",
        },
        duration: "31:10",
        description: {
          en: "Learn various testing approaches from unit testing to integration testing.",
          ar: "تعلم طرق الاختبار المختلفة من اختبار الوحدة إلى اختبار التكامل.",
        },
      },
      {
        id: "course-3-video-6",
        title: {
          en: "Continuous Integration and Deployment",
          ar: "التكامل المستمر والنشر",
        },
        duration: "25:45",
        description: {
          en: "Understand modern CI/CD pipelines and tools.",
          ar: "فهم خطوط أنابيب وأدوات CI/CD الحديثة.",
        },
      },
      {
        id: "course-3-video-7",
        title: {
          en: "Project Management Techniques",
          ar: "تقنيات إدارة المشاريع",
        },
        duration: "29:30",
        description: {
          en: "Explore agile, scrum, and other project management methodologies.",
          ar: "استكشف أجايل، سكرم، وغيرها من منهجيات إدارة المشاريع.",
        },
      },
    ],
  },
};

// UI text translations
const translations = {
  loading: {
    en: "Loading course details...",
    ar: "جاري تحميل تفاصيل الدورة...",
  },
  courseNotFound: {
    en: "Course Not Found",
    ar: "الدورة غير موجودة",
  },
  courseNotFoundMessage: {
    en: "The course you are looking for does not exist or has been removed.",
    ar: "الدورة التي تبحث عنها غير موجودة أو تمت إزالتها.",
  },
  browseCourses: {
    en: "Browse Courses",
    ar: "تصفح الدورات",
  },
  backToCourses: {
    en: "Back to My Courses",
    ar: "العودة إلى الدورات",
  },
  courseDescription: {
    en: "Course Description",
    ar: "وصف الدورة",
  },
  complete: {
    en: "Complete",
    ar: "مكتمل",
  },
  of: {
    en: "of",
    ar: "من",
  },
  lessonsCompleted: {
    en: "lessons completed",
    ar: "درس مكتمل",
  },
  courseContent: {
    en: "Course Content",
    ar: "محتوى الدورة",
  },
  videos: {
    en: "videos",
    ar: "فيديو",
  },
  markAsWatched: {
    en: "Mark as Watched",
    ar: "وضع علامة كمشاهد",
  },
  markAsUnwatched: {
    en: "Mark as Unwatched",
    ar: "وضع علامة كغير مشاهد",
  },
};

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [watchedVideos, setWatchedVideos] = useState({});
  const [progress, setProgress] = useState(0);

  // Set language to Arabic by default
  const { language = "ar", isRTL = true } = useLanguage();
  const { isDarkMode } = useTheme();

  // Ensure Arabic is the default language if not explicitly set
  const currentLanguage = language || "ar";
  const isArabic = currentLanguage === "ar";

  // Helper function to get text in current language
  const getText = (textObj) => {
    return (
      (textObj && textObj[currentLanguage]) || (textObj && textObj.en) || ""
    );
  };

  // Convert numbers to Arabic numerals when in Arabic mode
  const toArabicNumerals = (num) => {
    if (!isArabic) return num;

    const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return num.toString().replace(/[0-9]/g, (w) => arabicNumerals[w]);
  };

  // Load course data and watched videos
  useEffect(() => {
    const loadCourseData = () => {
      setIsLoading(true);

      // Simulate API call with timeout
      setTimeout(() => {
        const courseData = MOCK_COURSES[courseId];
        if (courseData) {
          setCourse(courseData);
        }
        setIsLoading(false);
      }, 1000);
    };

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

    loadCourseData();
    loadWatchedVideos();
  }, [courseId]);

  // Calculate progress whenever course or watchedVideos change
  useEffect(() => {
    if (course) {
      const totalVideos = course.videos.length;
      if (totalVideos === 0) {
        setProgress(0);
        return;
      }

      const watchedCount = course.videos.filter(
        (video) => watchedVideos[video.id]
      ).length;
      setProgress(Math.round((watchedCount / totalVideos) * 100));
    }
  }, [course, watchedVideos]);

  // Toggle watched status for a video
  const toggleVideoWatchStatus = (videoId) => {
    const updatedWatchedVideos = { ...watchedVideos };

    if (updatedWatchedVideos[videoId]) {
      delete updatedWatchedVideos[videoId];
    } else {
      updatedWatchedVideos[videoId] = true;
    }

    setWatchedVideos(updatedWatchedVideos);

    // Save to localStorage
    localStorage.setItem("watchedVideos", JSON.stringify(updatedWatchedVideos));
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#F0F4F8] dark:bg-[#121212] p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#3949AB] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#37474F] dark:text-white font-medium">
            {translations.loading[currentLanguage]}
          </p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div
        className={`w-full min-h-screen bg-[#F0F4F8] dark:bg-[#121212] text-[#37474F] dark:text-white ${
          isRTL ? "font-tajawal" : ""
        }`}
      >
        {/* Use the Navbar component */}
        <Navbar />

        <div className="max-w-6xl mx-auto p-6">
          <Link
            to="/courses"
            className="flex items-center text-[#3949AB] dark:text-[#7986CB] mb-6 hover:underline"
          >
            <ArrowLeft size={18} className={isRTL ? "ml-2" : "mr-2"} />
            {translations.backToCourses[currentLanguage]}
          </Link>

          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-md p-8 text-center">
            <FileText
              size={48}
              className="mx-auto text-[#3949AB] dark:text-[#7986CB] mb-4"
            />
            <h2 className="text-xl font-semibold text-[#37474F] dark:text-white mb-2">
              {translations.courseNotFound[currentLanguage]}
            </h2>
            <p className="text-[#3949AB] dark:text-[#AAAAAA] mb-6">
              {translations.courseNotFoundMessage[currentLanguage]}
            </p>
            <Link
              to="/courses"
              className="bg-[#3949AB] hover:bg-[#1A237E] text-white px-4 py-2 rounded-lg transition-colors inline-block"
            >
              {translations.browseCourses[currentLanguage]}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full min-h-screen bg-[#F0F4F8] dark:bg-[#121212] text-[#37474F] dark:text-white ${
        isRTL ? "font-tajawal" : ""
      }`}
    >
      {/* Use the Navbar component */}
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        {/* Back button */}
        <Link
          to="/courses"
          className="flex items-center text-[#3949AB] dark:text-[#7986CB] mb-6 hover:underline"
        >
          <ArrowLeft size={18} className={isRTL ? "ml-2" : "mr-2"} />
          {translations.backToCourses[currentLanguage]}
        </Link>

        {/* Course Header */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-md overflow-hidden mb-6">
          <div className="relative">
            <img
              src={course.coverImage}
              alt={getText(course.title)}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                {getText(course.title)}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white">
                <div className="flex items-center">
                  <User size={16} className={isRTL ? "ml-2" : "mr-2"} />
                  <span>{getText(course.instructor)}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className={isRTL ? "ml-2" : "mr-2"} />
                  <span>{getText(course.duration)}</span>
                </div>
                <div className="flex items-center">
                  <Award size={16} className={isRTL ? "ml-2" : "mr-2"} />
                  <span>{getText(course.level)}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className={isRTL ? "ml-2" : "mr-2"} />
                  <span>{getText(course.lastUpdated)}</span>
                </div>
                <div className="flex items-center bg-[#3949AB] px-3 py-1 rounded-full">
                  <BarChart size={16} className={isRTL ? "ml-2" : "mr-2"} />
                  <span>
                    {toArabicNumerals(progress)}%{" "}
                    {translations.complete[currentLanguage]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold text-[#37474F] dark:text-white mb-3">
              {translations.courseDescription[currentLanguage]}
            </h2>
            <p className="text-[#3949AB] dark:text-[#AAAAAA] mb-6">
              {getText(course.description)}
            </p>

            <div className="w-full bg-[#F0F4F8] dark:bg-[#2D2D2D] rounded-full h-4 mb-2">
              <div
                className="bg-[#FFC107] h-4 rounded-full flex items-center justify-end pr-3 text-xs font-bold text-[#37474F]"
                style={{
                  width: `${progress}%`,
                  minWidth: progress > 0 ? "40px" : "0",
                }}
              >
                {progress > 0 && `${toArabicNumerals(progress)}%`}
              </div>
            </div>
            <p className="text-sm text-[#3949AB] dark:text-[#AAAAAA] mb-4">
              {toArabicNumerals(
                course.videos.filter((v) => watchedVideos[v.id]).length
              )}{" "}
              {translations.of[currentLanguage]}{" "}
              {toArabicNumerals(course.videos.length)}{" "}
              {translations.lessonsCompleted[currentLanguage]}
            </p>
          </div>
        </div>

        {/* Video Lessons List */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-[#37474F] dark:text-white mb-6">
              {translations.courseContent[currentLanguage]} (
              {toArabicNumerals(course.videos.length)}{" "}
              {translations.videos[currentLanguage]})
            </h2>

            <div className="space-y-4">
              {course.videos.map((video, index) => (
                <div
                  key={video.id}
                  className="flex items-start justify-between p-4 rounded-lg bg-[#F0F4F8] dark:bg-[#2D2D2D]"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4 mt-1">
                      {watchedVideos[video.id] ? (
                        <div className="w-8 h-8 rounded-full bg-[#FFC107] flex items-center justify-center">
                          <Check size={16} className="text-[#37474F]" />
                        </div>
                      ) : (
                        <PlayCircle
                          size={24}
                          className="text-[#3949AB] dark:text-[#7986CB]"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-[#37474F] dark:text-white">
                        {isArabic
                          ? `${toArabicNumerals(index + 1)}. `
                          : `${index + 1}. `}
                        {getText(video.title)}
                      </h3>
                      <p className="text-sm text-[#3949AB] dark:text-[#AAAAAA] mb-1">
                        {getText(video.description)}
                      </p>
                      <span className="text-xs text-[#3949AB] dark:text-[#AAAAAA] flex items-center">
                        <Clock size={12} className={isRTL ? "ml-1" : "mr-1"} />{" "}
                        {video.duration}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleVideoWatchStatus(video.id)}
                    className={`text-sm py-1 px-3 rounded-full ${
                      watchedVideos[video.id]
                        ? "bg-[#F0F4F8] dark:bg-[#2D2D2D] border border-[#3949AB] dark:border-[#7986CB] text-[#3949AB] dark:text-[#7986CB]"
                        : "bg-[#3949AB] text-white"
                    }`}
                  >
                    {watchedVideos[video.id]
                      ? translations.markAsUnwatched[currentLanguage]
                      : translations.markAsWatched[currentLanguage]}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
