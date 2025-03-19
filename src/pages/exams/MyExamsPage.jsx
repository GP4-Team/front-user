// pages/exams/MyExamsPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { mockExams } from "../../data/ExamData";
import { ExamStatusBadge } from "../../components/exams/ExamStatusBadge";
import {
  CalendarIcon,
  ClockIcon,
  ListIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../../components/icons/Icons";

// Custom icon components for missing icons
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

const MyExamsPage = () => {
  const { isDarkMode } = useTheme();
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

    // Calculate stats
    const completed = mockExams.filter((exam) => exam.status === "finished");
    const scores = completed.map((exam) => exam.score || 0);
    const avgScore =
      scores.length > 0
        ? scores.reduce((sum, score) => sum + score, 0) / scores.length
        : 0;
    const highest = scores.length > 0 ? Math.max(...scores) : 0;

    setExamStats({
      totalExams: mockExams.length,
      completedExams: completed.length,
      averageScore: Math.round(avgScore),
      highestScore: highest,
      pendingExams: mockExams.filter((exam) => exam.status !== "finished")
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

  const handleSelectExam = (exam) => {
    navigate(`/exams/${exam.id}`);
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDirection("desc");
    }
  };

  // Filter and sort exams
  const filterExams = (exams) => {
    // Filter by search query
    let filtered = exams;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (exam) =>
          exam.title.toLowerCase().includes(query) ||
          exam.subject.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((exam) => exam.status === filterStatus);
    }

    // Sort exams
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortBy === "title") {
        return sortDirection === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortBy === "score") {
        const scoreA = a.score || 0;
        const scoreB = b.score || 0;
        return sortDirection === "asc" ? scoreA - scoreB : scoreB - scoreA;
      }
      return 0;
    });

    return filtered;
  };

  const availableExams = filterExams(
    mockExams.filter(
      (exam) => exam.status === "available" || exam.status === "in-progress"
    )
  );

  const completedExams = filterExams(
    mockExams.filter((exam) => exam.status === "finished")
  );

  const renderExamCard = (exam) => {
    const isFavorite = favoriteExams.includes(exam.id);

    if (viewMode === "grid") {
      return (
        <div
          key={exam.id}
          className={`${
            isDarkMode ? "bg-primary-dark" : "bg-neutral-white"
          } rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg`}
        >
          <div className="relative">
            {/* Course Category Label */}
            <div className="absolute top-0 right-0 m-2 px-2 py-1 rounded-md text-xs font-medium bg-opacity-90 bg-primary-light text-neutral-white">
              {exam.subject}
            </div>

            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(exam.id);
              }}
              className="absolute top-0 left-0 m-2 p-1 rounded-full hover:bg-gray-200 hover:bg-opacity-20 transition-colors duration-150"
            >
              {isFavorite ? (
                <BookmarkFilledIcon className="w-5 h-5 text-yellow-400" />
              ) : (
                <BookmarkIcon className="w-5 h-5 text-gray-400 hover:text-yellow-400" />
              )}
            </button>

            {/* Decorative Header */}
            <div
              className={`h-3 ${
                exam.status === "available"
                  ? "bg-accent"
                  : exam.status === "in-progress"
                  ? "bg-blue-500"
                  : "bg-primary-light"
              }`}
            ></div>

            <div className="p-4 border-b border-gray-200">
              <ExamStatusBadge status={exam.status} />
              <h2
                className={`mt-2 text-xl font-bold ${
                  isDarkMode ? "text-neutral-white" : "text-neutral-dark"
                } transition-colors duration-300 line-clamp-2 h-14`}
              >
                {exam.title}
              </h2>
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-right">
                <div
                  className={`mr-2 ${
                    isDarkMode ? "text-primary-light" : "text-primary-base"
                  }`}
                >
                  <p className="text-sm">
                    {new Date(exam.date).toLocaleDateString("ar-EG")}
                  </p>
                  <p className="text-sm font-medium">{exam.time}</p>
                </div>
                <CalendarIcon
                  className={`${
                    isDarkMode ? "text-primary-light" : "text-primary-base"
                  }`}
                />
              </div>

              <div className="flex items-center text-right">
                <div
                  className={`mr-2 ${
                    isDarkMode ? "text-primary-light" : "text-primary-base"
                  }`}
                >
                  <p className="text-xs">{exam.duration} دقيقة</p>
                  <p className="text-xs">{exam.numberOfQuestions} سؤال</p>
                </div>
                <ClockIcon
                  className={`${
                    isDarkMode ? "text-primary-light" : "text-primary-base"
                  }`}
                />
              </div>
            </div>

            {exam.status === "finished" && (
              <div
                className={`${
                  isDarkMode
                    ? "bg-primary-base bg-opacity-20"
                    : "bg-primary-light bg-opacity-10"
                } rounded-md p-3 mb-4`}
              >
                <div className="flex justify-between items-center mb-1">
                  <div
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-neutral-white" : "text-neutral-dark"
                    }`}
                  >
                    النتيجة:
                  </div>
                  <div
                    className={`text-sm font-bold ${
                      exam.score >= 70
                        ? "text-green-500"
                        : isDarkMode
                        ? "text-red-400"
                        : "text-red-500"
                    }`}
                  >
                    {exam.score}%
                  </div>
                </div>
                <div
                  className={`h-2 w-full ${
                    isDarkMode
                      ? "bg-primary-light bg-opacity-20"
                      : "bg-primary-light bg-opacity-30"
                  } rounded-full overflow-hidden`}
                >
                  <div
                    className={`h-full ${
                      exam.score >= 70 ? "bg-green-500" : "bg-red-500"
                    }`}
                    style={{ width: `${exam.score}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => handleSelectExam(exam)}
                className={`${
                  isDarkMode
                    ? "bg-primary-base hover:bg-primary-light"
                    : "bg-primary-base hover:bg-primary-dark"
                } text-neutral-white px-4 py-2 rounded-md flex items-center transition duration-200 w-full justify-center`}
              >
                <span className="ml-2">
                  {exam.status === "finished" ? "عرض التفاصيل" : "فتح الامتحان"}
                </span>
                <ArrowLeftIcon />
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      // List view rendering
      return (
        <div
          key={exam.id}
          className={`${
            isDarkMode ? "bg-primary-dark" : "bg-neutral-white"
          } rounded-lg shadow-md overflow-hidden mb-4 transition-all duration-300 hover:shadow-lg border-r-4 ${
            exam.status === "available"
              ? "border-accent"
              : exam.status === "in-progress"
              ? "border-blue-500"
              : "border-primary-light"
          }`}
        >
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <ExamStatusBadge status={exam.status} />
              <div className="mx-4">
                {exam.status === "finished" && (
                  <div className="flex items-center">
                    <div
                      className={`h-2 w-16 ${
                        isDarkMode
                          ? "bg-primary-light bg-opacity-20"
                          : "bg-primary-light bg-opacity-30"
                      } rounded-full overflow-hidden mr-2`}
                    >
                      <div
                        className={`h-full ${
                          exam.score >= 70 ? "bg-green-500" : "bg-red-500"
                        }`}
                        style={{ width: `${exam.score}%` }}
                      ></div>
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        exam.score >= 70
                          ? "text-green-500"
                          : isDarkMode
                          ? "text-red-400"
                          : "text-red-500"
                      }`}
                    >
                      {exam.score}%
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(exam.id);
                }}
                className="p-1 rounded-full hover:bg-gray-200 hover:bg-opacity-20 transition-colors duration-150"
              >
                {isFavorite ? (
                  <BookmarkFilledIcon className="w-5 h-5 text-yellow-400" />
                ) : (
                  <BookmarkIcon className="w-5 h-5 text-gray-400 hover:text-yellow-400" />
                )}
              </button>
            </div>

            <div className="text-right">
              <h2
                className={`text-xl font-bold ${
                  isDarkMode ? "text-neutral-white" : "text-neutral-dark"
                } transition-colors duration-300`}
              >
                {exam.title}
              </h2>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-primary-light" : "text-primary-base"
                } transition-colors duration-300`}
              >
                {exam.subject} •{" "}
                {new Date(exam.date).toLocaleDateString("ar-EG")} • {exam.time}{" "}
                • {exam.duration} دقيقة • {exam.numberOfQuestions} سؤال
              </p>
            </div>
          </div>

          <div className="px-4 pb-4 flex justify-end">
            <button
              onClick={() => handleSelectExam(exam)}
              className={`${
                isDarkMode
                  ? "bg-primary-base hover:bg-primary-light"
                  : "bg-primary-base hover:bg-primary-dark"
              } text-neutral-white px-4 py-2 rounded-md flex items-center transition duration-200`}
            >
              <span className="ml-2">
                {exam.status === "finished" ? "عرض التفاصيل" : "فتح الامتحان"}
              </span>
              <ArrowLeftIcon />
            </button>
          </div>
        </div>
      );
    }
  };

  // Stats and analytics section
  const renderStatsSection = () => {
    return (
      <div
        className={`mb-6 rounded-lg shadow-md overflow-hidden ${
          isDarkMode ? "bg-primary-dark" : "bg-neutral-white"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <button
            onClick={() => setStatsVisible(!statsVisible)}
            className={`${
              isDarkMode ? "text-primary-light" : "text-primary-base"
            } p-1`}
          >
            {statsVisible ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>
          <h2
            className={`text-lg font-bold ${
              isDarkMode ? "text-neutral-white" : "text-neutral-dark"
            }`}
          >
            ملخص الأداء
          </h2>
        </div>

        {statsVisible && (
          <div className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div
                className={`p-3 rounded-lg ${
                  isDarkMode
                    ? "bg-primary-base bg-opacity-20"
                    : "bg-neutral-light"
                }`}
              >
                <div
                  className={`text-3xl font-bold ${
                    isDarkMode ? "text-neutral-white" : "text-neutral-dark"
                  }`}
                >
                  {examStats.totalExams}
                </div>
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-primary-light" : "text-primary-base"
                  }`}
                >
                  إجمالي الامتحانات
                </div>
              </div>

              <div
                className={`p-3 rounded-lg ${
                  isDarkMode
                    ? "bg-primary-base bg-opacity-20"
                    : "bg-neutral-light"
                }`}
              >
                <div
                  className={`text-3xl font-bold ${
                    isDarkMode ? "text-neutral-white" : "text-neutral-dark"
                  }`}
                >
                  {examStats.completedExams}
                </div>
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-primary-light" : "text-primary-base"
                  }`}
                >
                  الامتحانات المكتملة
                </div>
              </div>

              <div
                className={`p-3 rounded-lg ${
                  isDarkMode
                    ? "bg-primary-base bg-opacity-20"
                    : "bg-neutral-light"
                }`}
              >
                <div
                  className={`text-3xl font-bold ${
                    isDarkMode ? "text-neutral-white" : "text-neutral-dark"
                  }`}
                >
                  {examStats.pendingExams}
                </div>
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-primary-light" : "text-primary-base"
                  }`}
                >
                  امتحانات معلقة
                </div>
              </div>

              <div
                className={`p-3 rounded-lg ${
                  isDarkMode
                    ? "bg-primary-base bg-opacity-20"
                    : "bg-neutral-light"
                }`}
              >
                <div
                  className={`text-3xl font-bold ${
                    examStats.averageScore >= 70
                      ? "text-green-500"
                      : isDarkMode
                      ? "text-red-400"
                      : "text-red-500"
                  }`}
                >
                  {examStats.averageScore}%
                </div>
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-primary-light" : "text-primary-base"
                  }`}
                >
                  متوسط النتائج
                </div>
              </div>

              <div
                className={`p-3 rounded-lg ${
                  isDarkMode
                    ? "bg-primary-base bg-opacity-20"
                    : "bg-neutral-light"
                }`}
              >
                <div className={`text-3xl font-bold text-green-500`}>
                  {examStats.highestScore}%
                </div>
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-primary-light" : "text-primary-base"
                  }`}
                >
                  أعلى نتيجة
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Search and filters section
  const renderFiltersSection = () => {
    return (
      <div
        className={`mb-6 rounded-lg shadow-md overflow-hidden ${
          isDarkMode ? "bg-primary-dark" : "bg-neutral-white"
        }`}
      >
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search input */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="ابحث عن امتحان..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-2 px-8 rounded-md border ${
                  isDarkMode
                    ? "bg-primary-base bg-opacity-20 border-primary-light text-neutral-white"
                    : "bg-neutral-light border-neutral-light text-neutral-dark"
                } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-base transition-colors duration-300`}
              />
              <div className="absolute right-3 top-2.5 text-gray-400">
                <SearchIcon className="w-4 h-4" />
              </div>
            </div>

            {/* Filter controls */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center px-3 py-2 rounded-md ${
                  isDarkMode
                    ? "bg-primary-base hover:bg-primary-light"
                    : "bg-primary-base hover:bg-primary-dark"
                } text-neutral-white transition-colors duration-300`}
              >
                <FilterIcon className="ml-1 w-4 h-4" />
                <span>تصفية</span>
              </button>

              <div className="flex border rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 ${
                    viewMode === "grid"
                      ? isDarkMode
                        ? "bg-primary-base text-neutral-white"
                        : "bg-primary-base text-neutral-white"
                      : isDarkMode
                      ? "bg-primary-dark text-primary-light"
                      : "bg-neutral-light text-primary-base"
                  } transition-colors duration-300`}
                >
                  <GridViewIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 ${
                    viewMode === "list"
                      ? isDarkMode
                        ? "bg-primary-base text-neutral-white"
                        : "bg-primary-base text-neutral-white"
                      : isDarkMode
                      ? "bg-primary-dark text-primary-light"
                      : "bg-neutral-light text-primary-base"
                  } transition-colors duration-300`}
                >
                  <ListViewIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  className={`block mb-1 text-sm ${
                    isDarkMode ? "text-primary-light" : "text-primary-base"
                  } text-right`}
                >
                  حالة الامتحان
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`w-full py-2 px-3 rounded-md border ${
                    isDarkMode
                      ? "bg-primary-base bg-opacity-20 border-primary-light text-neutral-white"
                      : "bg-neutral-light border-neutral-light text-neutral-dark"
                  } focus:outline-none focus:ring-2 focus:ring-primary-base transition-colors duration-300`}
                  dir="rtl"
                >
                  <option value="all">جميع الامتحانات</option>
                  <option value="available">متاح</option>
                  <option value="in-progress">قيد التقدم</option>
                  <option value="finished">مكتمل</option>
                </select>
              </div>

              <div>
                <label
                  className={`block mb-1 text-sm ${
                    isDarkMode ? "text-primary-light" : "text-primary-base"
                  } text-right`}
                >
                  ترتيب حسب
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => toggleSort(e.target.value)}
                  className={`w-full py-2 px-3 rounded-md border ${
                    isDarkMode
                      ? "bg-primary-base bg-opacity-20 border-primary-light text-neutral-white"
                      : "bg-neutral-light border-neutral-light text-neutral-dark"
                  } focus:outline-none focus:ring-2 focus:ring-primary-base transition-colors duration-300`}
                  dir="rtl"
                >
                  <option value="date">التاريخ</option>
                  <option value="title">العنوان</option>
                  <option value="score">النتيجة</option>
                </select>
              </div>

              <div>
                <label
                  className={`block mb-1 text-sm ${
                    isDarkMode ? "text-primary-light" : "text-primary-base"
                  } text-right`}
                >
                  اتجاه الترتيب
                </label>
                <select
                  value={sortDirection}
                  onChange={(e) => setSortDirection(e.target.value)}
                  className={`w-full py-2 px-3 rounded-md border ${
                    isDarkMode
                      ? "bg-primary-base bg-opacity-20 border-primary-light text-neutral-white"
                      : "bg-neutral-light border-neutral-light text-neutral-dark"
                  } focus:outline-none focus:ring-2 focus:ring-primary-base transition-colors duration-300`}
                  dir="rtl"
                >
                  <option value="desc">تنازلي</option>
                  <option value="asc">تصاعدي</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`max-w-6xl mx-auto px-4 mt-8 pb-12 ${
        isDarkMode ? "bg-primary-dark bg-opacity-10" : "bg-neutral-light"
      }`}
    >
      <h1
        className={`text-3xl font-bold mb-6 text-right ${
          isDarkMode ? "text-neutral-white" : "text-neutral-dark"
        } transition-colors duration-300`}
      >
        امتحاناتي
      </h1>

      {/* Stats Section */}
      {renderStatsSection()}

      {/* Filters Section */}
      {renderFiltersSection()}

      {/* Upcoming Exams Section */}
      <div className="mb-8">
        <h2
          className={`text-2xl font-bold mb-4 text-right ${
            isDarkMode ? "text-neutral-white" : "text-neutral-dark"
          } transition-colors duration-300 flex items-center justify-end`}
        >
          <span>الامتحانات المتاحة</span>
          {availableExams.length > 0 && (
            <span
              className={`mr-2 text-sm px-2 py-1 rounded-full ${
                isDarkMode ? "bg-primary-base" : "bg-primary-base"
              } text-neutral-white`}
            >
              {availableExams.length}
            </span>
          )}
        </h2>

        {availableExams.length === 0 ? (
          <div
            className={`rounded-lg shadow-md p-8 text-center ${
              isDarkMode ? "bg-primary-dark" : "bg-neutral-white"
            }`}
          >
            <p
              className={`${
                isDarkMode ? "text-primary-light" : "text-primary-base"
              }`}
            >
              لا توجد امتحانات متاحة حالياً
            </p>
          </div>
        ) : (
          <div
            className={`grid ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            } gap-4`}
          >
            {availableExams.map(renderExamCard)}
          </div>
        )}
      </div>

      {/* Completed Exams Section */}
      <div>
        <h2
          className={`text-2xl font-bold mb-4 text-right ${
            isDarkMode ? "text-neutral-white" : "text-neutral-dark"
          } transition-colors duration-300 flex items-center justify-end`}
        >
          <span>الامتحانات المكتملة</span>
          {completedExams.length > 0 && (
            <span
              className={`mr-2 text-sm px-2 py-1 rounded-full ${
                isDarkMode ? "bg-primary-base" : "bg-primary-base"
              } text-neutral-white`}
            >
              {completedExams.length}
            </span>
          )}
        </h2>

        {completedExams.length === 0 ? (
          <div
            className={`rounded-lg shadow-md p-8 text-center ${
              isDarkMode ? "bg-primary-dark" : "bg-neutral-white"
            }`}
          >
            <p
              className={`${
                isDarkMode ? "text-primary-light" : "text-primary-base"
              }`}
            >
              لا توجد امتحانات مكتملة حتى الآن
            </p>
          </div>
        ) : (
          <div
            className={`grid ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            } gap-4`}
          >
            {completedExams.map(renderExamCard)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyExamsPage;
