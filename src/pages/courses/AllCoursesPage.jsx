import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

// Components
import Navbar from "../../components/navigation/Navbar";
import SimplifiedCourseCard from "../../components/courses/SimplifiedCourseCard";

// API Service
import HomeApiService from "../../services/homeApiService";

const AllCoursesPage = () => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]); // لحفظ جميع الكورسات قبل الفلترة
  const [educationLevels, setEducationLevels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLevels, setIsLoadingLevels] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    level: "",
  });
  // تم إزالة searchTimeout لأن البحث أصبح محلياً وفورياً

  const getText = (ar, en) => (language === "ar" ? ar : en);

  // جلب الكورسات (بدون ربط API للبحث)
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = {
          page: currentPage,
          per_page: 15,
        };

        let response;
        
        // إذا كان هناك فلتر مستوى، استخدم filter API
        if (filters.level) {
          params.education_level_ids = filters.level;
          console.log('🎯 Filtering by level:', filters.level);
          response = await HomeApiService.getFilteredCourses(params);
        }
        // بخلاف ذلك، استخدم الـ API العادي
        else {
          console.log('📋 Loading all courses');
          response = await HomeApiService.getAllCoursesPaginated(params);
        }

        if (response.success && response.data) {
          setAllCourses(response.data); // حفظ جميع الكورسات
          setCourses(response.data);
          setPagination(response.pagination);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("حدث خطأ أثناء تحميل الكورسات");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [currentPage, filters.level]); // إزالة searchQuery من dependencies

  // جلب مستويات التعليم
  useEffect(() => {
    const fetchEducationLevels = async () => {
      setIsLoadingLevels(true);
      try {
        let allLevels = [];
        let currentPageNum = 1;
        let hasMorePages = true;

        while (hasMorePages) {
          const params = { page: currentPageNum, per_page: 15 };
          const response = await HomeApiService.getEducationLevels(params);

          if (response.success && response.data) {
            allLevels = [...allLevels, ...response.data];
            hasMorePages = response.pagination && currentPageNum < response.pagination.last_page;
            currentPageNum++;
          } else {
            hasMorePages = false;
          }
        }

        setEducationLevels(allLevels);
      } catch (err) {
        console.error("Error fetching education levels:", err);
      } finally {
        setIsLoadingLevels(false);
      }
    };

    fetchEducationLevels();
  }, []);

  // بحث محلي في الكورسات المحملة
  useEffect(() => {
    if (!searchQuery.trim()) {
      // إذا لم يكن هناك بحث، اعرض جميع الكورسات المحملة
      setCourses(allCourses);
      return;
    }

    // فلترة الكورسات محلياً بناءً على نص البحث
    const filteredCourses = allCourses.filter(course => {
      const searchLower = searchQuery.toLowerCase();
      
      // بحث في اسم الكورس (عربي وإنجليزي)
      const titleMatch = course.title?.ar?.toLowerCase().includes(searchLower) ||
                        course.title?.en?.toLowerCase().includes(searchLower) ||
                        course.name?.toLowerCase().includes(searchLower);
      
      // بحث في الفئة
      const categoryMatch = course.category?.ar?.toLowerCase().includes(searchLower) ||
                           course.category?.en?.toLowerCase().includes(searchLower);
      
      // بحث في المستوى
      const levelMatch = course.level?.ar?.toLowerCase().includes(searchLower) ||
                        course.level?.en?.toLowerCase().includes(searchLower);
      
      // بحث في رمز الكورس
      const codeMatch = course.code?.toLowerCase().includes(searchLower);
      
      return titleMatch || categoryMatch || levelMatch || codeMatch;
    });

    setCourses(filteredCourses);
  }, [searchQuery, allCourses]);

  // معالجة تغيير نص البحث (محلي فقط)
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    // لا حاجة لإعادة تعيين الصفحة أو الفلاتر مع البحث المحلي
  };

  // معالجة تغيير الفلاتر
  const handleFilterChange = (filterType, value) => {
    if (filterType === "reset") {
      setFilters({ level: "" });
      setCurrentPage(1);
      setSearchQuery(""); // مسح البحث عند إعادة التعيين
      return;
    }

    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    
    setCurrentPage(1);
    
    // عدم مسح البحث عند تطبيق فلتر (البحث محلي الآن)
  };

  if (isLoading) {
    return (
      <div className={`flex justify-center items-center h-screen ${isDarkMode ? "bg-[#121212]" : "bg-[#F0F4F8]"}`}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#3949AB]"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-[#121212] text-[#E0E0E0]" : "bg-[#F0F4F8] text-[#37474F]"}`}>
      <Navbar />
      <div className="pt-20"></div>

      {/* رأس الصفحة */}
      <div className={`${isDarkMode ? "bg-[#1E1E1E]" : "bg-[#3949AB]"} py-12 text-white`}>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">
            {getText("استكشف الدورات التعليمية", "Explore Educational Courses")}
          </h1>

          {/* شريط البحث */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={getText("ابحث عن الدورات...", "Search for courses...")}
              className={`w-full py-3 px-12 rounded-full border ${
                isDarkMode
                  ? "bg-[#333333] border-[#444444] text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-[#37474F]"
              } focus:outline-none focus:ring-2 focus:ring-[#7986CB] focus:border-transparent shadow-sm`}
            />
            <Search
              size={20}
              className={`absolute top-3.5 ${isRTL ? "right-4" : "left-4"} ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            {/* عدم الحاجة لمؤشر بحث - البحث محلي وفوري */}
          </div>

          {pagination && (
            <div className="text-center mt-4 text-sm opacity-90">
              {getText(
                `تم العثور على ${pagination.total} دورة تعليمية`,
                `Found ${pagination.total} educational courses`
              )}
            </div>
          )}
        </div>
      </div>

      {/* رسالة خطأ */}
      {error && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold ml-1">خطأ:</strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      )}

      {/* محتوى رئيسي */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* جانب الفلاتر */}
          <div className="lg:w-1/4">
            <div className={`${
              isDarkMode ? "bg-[#1E1E1E] border-[#333333]" : "bg-white border-gray-200"
            } rounded-lg shadow-md p-4 border sticky top-24`}>
              <h2 className="text-xl font-bold mb-4">
                {getText("الفلتر", "Filter")}
              </h2>

              {/* فلتر المرحلة الدراسية */}
              <div className="mb-6">
                <h3 className={`font-medium mb-2 pb-2 border-b ${
                  isDarkMode ? "border-[#333333]" : "border-gray-200"
                }`}>
                  {getText("المرحلة الدراسية", "Educational Level")}
                </h3>

                {isLoadingLevels ? (
                  <div className="text-center py-4">
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-indigo-600"></div>
                    <p className="text-xs mt-2 text-gray-500">جاري تحميل المستويات...</p>
                  </div>
                ) : (
                  <div className="space-y-2 mt-3">
                    {/* خيار جميع المراحل */}
                    <label className="block">
                      <input
                        type="radio"
                        name="level"
                        value=""
                        checked={filters.level === ""}
                        onChange={() => handleFilterChange("level", "")}
                        className="mr-2 rtl:ml-2"
                      />
                      {getText("جميع المراحل", "All Levels")}
                    </label>

                    {/* عرض المستويات من الـ API */}
                    {educationLevels.map((level) => (
                      <label key={level.id} className="block">
                        <input
                          type="radio"
                          name="level"
                          value={level.id}
                          checked={filters.level === level.id}
                          onChange={() => handleFilterChange("level", level.id)}
                          className="mr-2 rtl:ml-2"
                        />
                        <span className="flex items-center">
                          <span
                            className="w-3 h-3 rounded-full mr-2 rtl:ml-2 rtl:mr-0"
                            style={{ backgroundColor: level.color }}
                          ></span>
                          {level.name}
                        </span>
                      </label>
                    ))}

                    {educationLevels.length === 0 && !isLoadingLevels && (
                      <p className="text-xs text-gray-500 py-2">
                        {getText("لا توجد مستويات متاحة", "No levels available")}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* زر إعادة تعيين الفلاتر */}
              <button
                onClick={() => handleFilterChange("reset")}
                className={`w-full py-2 px-4 rounded-md ${
                  isDarkMode
                    ? "bg-[#333333] hover:bg-[#444444] text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-[#37474F]"
                } transition duration-200`}
              >
                {getText("إعادة تعيين", "Reset")}
              </button>
            </div>
          </div>

          {/* جانب الكورسات */}
          <div className="lg:w-3/4">
            {/* عنوان ونتائج البحث */}
            <div className="mb-6">
              <h2 className="text-xl font-bold">
                {pagination ? (
                  getText(
                    `عرض ${courses.length} دورة من إجمالي ${pagination.total} دورة`,
                    `Showing ${courses.length} courses of ${pagination.total} total`
                  )
                ) : courses.length > 0 ? (
                  getText(
                    `تم العثور على ${courses.length} دورة`,
                    `Found ${courses.length} courses`
                  )
                ) : (
                  getText("لم يتم العثور على نتائج", "No results found")
                )}
              </h2>
              
              {/* عرض معلومات البحث أو الفلتر */}
              {searchQuery.trim() && (
                <p className="text-sm text-gray-500 mt-2">
                  {getText(
                    `نتائج البحث المحلي عن: "${searchQuery}"`,
                    `Local search results for: "${searchQuery}"`
                  )}
                </p>
              )}
              {filters.level && !searchQuery.trim() && (
                <p className="text-sm text-gray-500 mt-2">
                  {getText(
                    `مفلترة حسب المستوى التعليمي`,
                    `Filtered by education level`
                  )}
                </p>
              )}
            </div>

            {/* قائمة الكورسات */}
            {courses.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <SimplifiedCourseCard key={course.id} course={course} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {pagination && pagination.last_page > 1 && (
                  <div className="mt-12">
                    <div className="text-center mb-6">
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {getText(
                          `عرض ${pagination.from} - ${pagination.to} من ${pagination.total} دورة تعليمية`,
                          `Showing ${pagination.from} - ${pagination.to} of ${pagination.total} courses`
                        )}
                      </p>
                      <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                        {getText(
                          `الصفحة ${pagination.current_page} من ${pagination.last_page}`,
                          `Page ${pagination.current_page} of ${pagination.last_page}`
                        )}
                      </p>
                    </div>

                    <div className="flex justify-center items-center gap-2">
                      {/* زر السابق */}
                      <button
                        onClick={() => {
                          if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        disabled={currentPage <= 1}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          currentPage <= 1
                            ? isDarkMode
                              ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : isDarkMode
                              ? "bg-[#3949AB] hover:bg-[#1A237E] text-white"
                              : "bg-[#3949AB] hover:bg-[#1A237E] text-white"
                        }`}
                      >
                        {getText("السابق", "Previous")}
                      </button>

                      {/* أرقام الصفحات */}
                      <div className="flex gap-1">
                        {[...Array(pagination.last_page)]
                          .map((_, index) => index + 1)
                          .filter(pageNum => {
                            const current = pagination.current_page;
                            return pageNum >= current - 2 && pageNum <= current + 2;
                          })
                          .map(pageNum => (
                            <button
                              key={pageNum}
                              onClick={() => {
                                setCurrentPage(pageNum);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                pageNum === pagination.current_page
                                  ? isDarkMode
                                    ? "bg-[#3949AB] text-white"
                                    : "bg-[#3949AB] text-white"
                                  : isDarkMode
                                    ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                                    : "bg-white hover:bg-gray-100 text-gray-700 border"
                              }`}
                            >
                              {pageNum}
                            </button>
                          ))
                        }
                      </div>

                      {/* زر التالي */}
                      <button
                        onClick={() => {
                          if (currentPage < pagination.last_page) {
                            setCurrentPage(currentPage + 1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        disabled={currentPage >= pagination.last_page}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          currentPage >= pagination.last_page
                            ? isDarkMode
                              ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : isDarkMode
                              ? "bg-[#3949AB] hover:bg-[#1A237E] text-white"
                              : "bg-[#3949AB] hover:bg-[#1A237E] text-white"
                        }`}
                      >
                        {getText("التالي", "Next")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className={`${
                isDarkMode ? "bg-[#1E1E1E] text-[#E0E0E0]" : "bg-white text-[#37474F]"
              } rounded-lg shadow-md p-8 text-center`}>
                <p>
                  {getText(
                    "لم يتم العثور على دورات مطابقة لمعايير البحث الخاصة بك. يرجى تجربة معايير مختلفة.",
                    "No courses found matching your search criteria. Please try different criteria."
                  )}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilters({ level: "" });
                  }}
                  className={`mt-4 ${
                    isDarkMode
                      ? "bg-[#3949AB] hover:bg-[#1A237E]"
                      : "bg-[#3949AB] hover:bg-[#1A237E]"
                  } text-white font-medium py-2 px-4 rounded-md transition duration-200`}
                >
                  {getText("إعادة تعيين البحث", "Reset Search")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCoursesPage;