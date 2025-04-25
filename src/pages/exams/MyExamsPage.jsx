// pages/exams/MyExamsPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import Navbar from "../../components/navigation/Navbar";
import {
  CalendarIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../../components/icons/Icons";

// Custom icon components
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const GridViewIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const ListViewIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);

const BookmarkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
);

const BookmarkFilledIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
);

const ChevronUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const MyExamsPage = () => {
  const { isDarkMode } = useTheme();
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();

  // State for UI controls
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, available, in-progress, finished
  const [sortBy, setSortBy] = useState("date"); // date, title, score
  const [sortDirection, setSortDirection] = useState("desc"); // asc, desc
  const [viewMode, setViewMode] = useState("grid"); // grid, list
  const [showFilters, setShowFilters] = useState(false);
  const [favoriteExams, setFavoriteExams] = useState([]);
  const [statsVisible, setStatsVisible] = useState(true);

  // Stats calculation
  const [examStats, setExamStats] = useState({
    totalExams: 0,
    completedExams: 0,
    averageScore: 0,
    highestScore: 0,
    pendingExams: 0,
  });

  // Sample exam data
  const mockExamsData = [
    {
      id: 1,
      title: "اختبار عملي",
      subject: "قواعد البيانات",
      status: "available",
      date: "2025/03/18",
      time: "PM 14:00",
      duration: 120,
      numberOfQuestions: 25,
    },
    {
      id: 2,
      title: "تدريب الباب الاول",
      subject: "أساسيات و مفاهيم في التيار الكهربي",
      status: "available",
      date: "2025/03/20",
      time: "AM 10:00",
      duration: 45,
      numberOfQuestions: 50,
    },
    {
      id: 3,
      title: "امتحان نصف الفصل",
      subject: "ميكانيكا الموائع",
      status: "available",
      date: "2025/03/22",
      time: "PM 12:30",
      duration: 60,
      numberOfQuestions: 30,
    },
    {
      id: 4,
      title: "الاختبار النهائي",
      subject: "تحليل البيانات",
      status: "finished",
      date: "2025/02/28",
      time: "PM 15:00",
      duration: 90,
      numberOfQuestions: 40,
      score: 82,
    },
  ];

  // Calculate and prepare the exams data
  useEffect(() => {
    // Load favorites from localStorage
    try {
      const savedFavorites = localStorage.getItem("favoriteExams");
      if (savedFavorites) {
        setFavoriteExams(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }

    // Calculate stats using the mock data
    const completed = mockExamsData.filter((exam) => exam.status === "finished");
    const scores = completed.map((exam) => exam.score || 0);
    const avgScore =
      scores.length > 0
        ? scores.reduce((sum, score) => sum + score, 0) / scores.length
        : 0;
    const highest = scores.length > 0 ? Math.max(...scores) : 0;

    setExamStats({
      totalExams: mockExamsData.length,
      completedExams: completed.length,
      averageScore: Math.round(avgScore),
      highestScore: highest,
      pendingExams: mockExamsData.filter((exam) => exam.status !== "finished")
        .length,
    });
  }, []);

  // Save favorites when they change
  useEffect(() => {
    try {
      localStorage.setItem("favoriteExams", JSON.stringify(favoriteExams));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  }, [favoriteExams]);

  const toggleFavorite = (examId) => {
    setFavoriteExams((prev) =>
      prev.includes(examId)
        ? prev.filter((id) => id !== examId)
        : [...prev, examId]
    );
  };

  // تعديل هذه الدالة للانتقال مباشرة إلى صفحة الأسئلة
  const handleSelectExam = (exam) => {
    // إذا كان الامتحان منتهي، انتقل إلى صفحة التفاصيل
    if (exam.status === "finished") {
      navigate(`/exams/${exam.id}`);
    } else {
      // إذا كان الامتحان متاح أو قيد التقدم، انتقل مباشرة إلى صفحة الأسئلة
      navigate(`/exams/${exam.id}/questions`);
    }
  };

  // Render individual exam card using the courses page layout style
  const renderExamCard = (exam) => {
    const isFavorite = favoriteExams.includes(exam.id);
    const headerColor = 
      exam.subject === 'قواعد البيانات' ? 'bg-[#3949AB]' : 
      exam.subject === 'أساسيات و مفاهيم في التيار الكهربي' ? 'bg-[#FFC107]' : 
      'bg-[#7986CB]';
      
    const statusText = 
      exam.status === "available" ? "متاح" : 
      exam.status === "in-progress" ? "جاري" : "مكتمل";
      
    const statusColor = 
      exam.status === "available" ? "bg-green-100 text-green-800" :
      exam.status === "in-progress" ? "bg-blue-100 text-blue-800" :
      "bg-gray-100 text-gray-800";

    return (
      <div key={exam.id} className="rounded-lg shadow-md overflow-hidden bg-white mb-4">
        {/* Colored header strip */}
        <div className={`h-1 ${headerColor}`}></div>
        
        <div className="relative p-4">
          {/* Subject badge */}
          <div className={`absolute top-4 right-4 px-2 py-1 rounded-md text-xs font-medium text-white ${headerColor}`}>
            {exam.subject}
          </div>
          
          {/* Bookmark icon */}
          <div className="absolute top-4 left-4">
            <button onClick={(e) => toggleFavorite(exam.id)} className="text-gray-400 hover:text-[#FFC107]">
              {isFavorite ? (
                <BookmarkFilledIcon className="w-5 h-5 text-[#FFC107]" />
              ) : (
                <BookmarkIcon className="w-5 h-5" />
              )}
            </button>
          </div>
          
          {/* Exam title */}
          <h3 className="mt-8 mb-3 text-xl font-bold text-[#37474F] text-right">
            {exam.title}
          </h3>
          
          {/* Status badge */}
          <div className={`inline-block px-2 py-1 rounded-full text-xs ${statusColor} mb-3`}>
            {statusText}
          </div>
          
          {/* Exam details - date/time and duration/questions */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-right">
              <div className="text-[#3949AB] mr-2">
                <p className="text-sm">{exam.date}</p>
                <p className="text-sm">{exam.time}</p>
              </div>
              <CalendarIcon className="text-[#3949AB]" />
            </div>
            
            <div className="flex items-center text-right">
              <div className="text-[#3949AB] mr-2">
                <p className="text-xs">{exam.duration} دقيقة</p>
                <p className="text-xs">{exam.numberOfQuestions} سؤال</p>
              </div>
              <ClockIcon className="text-[#3949AB]" />
            </div>
          </div>
          
          {/* Exam button */}
          <div className="text-center">
            <button
              onClick={() => handleSelectExam(exam)}
              className="bg-[#3949AB] hover:bg-[#1A237E] text-white px-6 py-2 rounded-md inline-flex items-center transition duration-200"
            >
              <span className="mx-2">{exam.status === "finished" ? "عرض التفاصيل" : "فتح الامتحان"}</span>
              <ArrowLeftIcon />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F4F8]">
      {/* Navbar/Header */}
      <Navbar />
      
      {/* Main content with top margin to account for fixed navbar */}
      <div className="mt-16 flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Page header */}
          <h1 className="text-3xl font-bold mb-6 text-right text-[#37474F]">
            امتحاناتي
          </h1>

          {/* Performance summary section */}
          <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <button className="text-[#3949AB]">
                <ChevronUpIcon />
              </button>
              <h2 className="text-lg font-bold text-[#37474F]">
                ملخص الأداء
              </h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-center">
                <div className="p-4">
                  <div className="text-4xl font-bold text-[#37474F]">
                    {examStats.totalExams}
                  </div>
                  <div className="text-sm text-[#3949AB]">
                    إجمالي الامتحانات
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="text-4xl font-bold text-[#37474F]">
                    {examStats.completedExams}
                  </div>
                  <div className="text-sm text-[#3949AB]">
                    الامتحانات المكتملة
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="text-4xl font-bold text-[#37474F]">
                    {examStats.pendingExams}
                  </div>
                  <div className="text-sm text-[#3949AB]">
                    امتحانات معلقة
                  </div>
                </div>
                
                <div className="p-4">
                  <div className={`text-4xl font-bold ${examStats.averageScore >= 70 ? "text-green-500" : "text-red-500"}`}>
                    {examStats.averageScore}%
                  </div>
                  <div className="text-sm text-[#3949AB]">
                    متوسط النتائج
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="text-4xl font-bold text-green-500">
                    {examStats.highestScore}%
                  </div>
                  <div className="text-sm text-[#3949AB]">
                    أعلى نتيجة
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and filters */}
          <div className="bg-white rounded-lg shadow-md mb-6 p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="ابحث عن امتحان..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 px-8 rounded-md border bg-[#F0F4F8] border-[#F0F4F8] text-[#37474F] focus:outline-none focus:ring-2 focus:ring-[#3949AB]"
                />
                <div className="absolute right-3 top-2.5 text-gray-400">
                  <SearchIcon className="w-4 h-4" />
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="bg-[#3949AB] text-white px-4 py-2 rounded-md flex items-center">
                  <FilterIcon className="mr-2 w-4 h-4" />
                  <span>تصفية</span>
                </button>
                
                <div className="flex border rounded-md overflow-hidden">
                  <button 
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-2 ${viewMode === "grid" ? "bg-[#3949AB] text-white" : "bg-[#F0F4F8] text-[#3949AB]"}`}
                  >
                    <GridViewIcon className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-2 ${viewMode === "list" ? "bg-[#3949AB] text-white" : "bg-[#F0F4F8] text-[#3949AB]"}`}
                  >
                    <ListViewIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Available exams section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-[#3949AB] text-white text-sm px-2 py-1 rounded-full">
                {mockExamsData.filter(e => e.status !== "finished").length}
              </span>
              <h2 className="text-2xl font-bold text-[#37474F] text-right">
                الامتحانات المتاحة
              </h2>
            </div>

            <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-4`}>
              {mockExamsData
                .filter(exam => exam.status !== "finished")
                .map(renderExamCard)}
            </div>
          </div>

          {/* Completed exams section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="bg-[#3949AB] text-white text-sm px-2 py-1 rounded-full">
                {mockExamsData.filter(e => e.status === "finished").length}
              </span>
              <h2 className="text-2xl font-bold text-[#37474F] text-right">
                الامتحانات المكتملة
              </h2>
            </div>

            <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-4`}>
              {mockExamsData
                .filter(exam => exam.status === "finished")
                .map(renderExamCard)}
            </div>
          </div>
        </div>
      </div>
      
      {/* تم إزالة الفوتر بالكامل */}
    </div>
  );
};

export default MyExamsPage;