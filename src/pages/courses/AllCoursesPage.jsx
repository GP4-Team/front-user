import React, { useState, useEffect, useTransition } from "react";
import { Search } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

// Components
import Navbar from "../../components/navigation/Navbar";
import SimplifiedCourseCard from "../../components/courses/SimplifiedCourseCard";
import HierarchicalFilter from "../../components/courses/HierarchicalFilter";

// API Service
import HomeApiService from "../../services/homeApiService";

const AllCoursesPage = () => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]); // لحفظ جميع الكورسات قبل الفلترة
  const [isInitialLoading, setIsInitialLoading] = useState(true); // للتحميل الأولي فقط
  const [isFilterLoading, setIsFilterLoading] = useState(false); // للفلترة فقط
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hierarchicalFilters, setHierarchicalFilters] = useState({
    level_id: null,
    category_id: null,
    levelName: '',
    categoryName: ''
  });
  
  // استخدام useTransition لتجنب مشاكل React 18
  const [isPending, startTransition] = useTransition();

  const getText = (ar, en) => (language === "ar" ? ar : en);

  // جلب الكورسات عند تحميل الصفحة أول مرة
  useEffect(() => {
    const fetchInitialCourses = async () => {
      setIsInitialLoading(true);
      setError(null);

      try {
        const params = {
          page: 1,
          per_page: 15,
        };

        console.log('📋 Loading initial courses');
        const response = await HomeApiService.getAllCoursesPaginated(params);

        if (response.success && response.data) {
          setAllCourses(response.data);
          setCourses(response.data);
          setPagination(response.pagination);
          setCurrentPage(1);
        }
      } catch (err) {
        console.error("Error fetching initial courses:", err);
        setError("حدث خطأ أثناء تحميل الكورسات");
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchInitialCourses();
  }, []); // تعمل مرة واحدة فقط عند تحميل المكون

  // جلب الكورسات عند تغيير الصفحة (للpagination فقط)
  useEffect(() => {
    // لا تعمل في التحميل الأولي أو عند وجود بحث
    if (isInitialLoading || hasSearched || currentPage === 1) {
      return;
    }

    const fetchPageCourses = async () => {
      setIsFilterLoading(true);
      setError(null);

      try {
        const params = {
          page: currentPage,
          per_page: 15,
        };

        let response;
        
        if (hierarchicalFilters.level_id || hierarchicalFilters.category_id) {
          if (hierarchicalFilters.level_id) {
            params.level_id = hierarchicalFilters.level_id;
          }
          if (hierarchicalFilters.category_id) {
            params.category_id = hierarchicalFilters.category_id;
          }
          
          response = await HomeApiService.getHierarchicalFilteredCourses(params);
        } else {
          response = await HomeApiService.getAllCoursesPaginated(params);
        }

        if (response.success && response.data) {
          setAllCourses(response.data);
          setCourses(response.data);
          setPagination(response.pagination);
        }
      } catch (err) {
        console.error("Error fetching page courses:", err);
        setError("حدث خطأ أثناء تحميل الكورسات");
      } finally {
        setIsFilterLoading(false);
      }
    };

    fetchPageCourses();
  }, [currentPage]); // تعمل فقط عند تغيير الصفحة

  // دالة البحث باستخدام API
  const performSearch = async (query) => {
    if (!query.trim()) {
      // إذا كان البحث فارغ، أعرض جميع الكورسات
      setHasSearched(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      console.log('🔍 Searching for:', query);
      
      const response = await HomeApiService.searchCourses(query, {
        page: 1,
        per_page: 15
      });

      console.log('✅ Search results:', response);

      if (response.success) {
        setSearchResults(response.data);
        setPagination(response.pagination);
        setHasSearched(true);
        
        // إعادة تعيين الصفحة إلى الأولى عند البحث
        setCurrentPage(1);
        
        // إزالة أي فلاتر هرمية عند البحث
        setHierarchicalFilters({
          level_id: null,
          category_id: null,
          levelName: '',
          categoryName: ''
        });
      } else {
        setError('فشل في البحث عن الكورسات');
        setSearchResults([]);
        setHasSearched(true);
      }
    } catch (err) {
      console.error('Search error:', err);
      
      // التعامل مع أخطاء الشبكة
      if (err.name === 'NetworkError' || err.code === 'NETWORK_ERROR' || !navigator.onLine) {
        setError('لا يوجد اتصال بالإنترنت. يرجى التحقق من الاتصال والمحاولة مرة أخرى.');
      } else if (err.response?.status === 404) {
        setError('لم يتم العثور على نتائج للبحث المطلوب.');
      } else if (err.response?.status >= 500) {
        setError('خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً.');
      } else {
        setError('حدث خطأ أثناء البحث. يرجى المحاولة مرة أخرى.');
      }
      
      setSearchResults([]);
      setHasSearched(true);
    } finally {
      setIsSearching(false);
    }
  };

  // معالجة تغيير نص البحث مع debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery !== undefined) {
        // استخدام startTransition لتجنب مشاكل React 18
        startTransition(() => {
          performSearch(searchQuery);
        });
      }
    }, 500); // انتظار 500ms بعد توقف المستخدم عن الكتابة

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // معالجة تغيير نص البحث
  const handleSearchChange = (value) => {
    startTransition(() => {
      setSearchQuery(value);
      
      // إذا كان البحث فارغ، اعرض جميع الكورسات مرة أخرى
      if (!value.trim()) {
        setHasSearched(false);
        setSearchResults([]);
        
        // إعادة تحميل الكورسات من الصفحة الأولى
        setCurrentPage(1);
        
        // إعادة تحميل الكورسات العادية إذا لم تكن محملة
        if (courses.length === 0 || currentPage !== 1) {
          fetchCoursesData();
        }
      }
    });
  };

  // دالة منفصلة لجلب الكورسات
  const fetchCoursesData = async () => {
    setIsFilterLoading(true);
    setError(null);

    try {
      const params = {
        page: 1, // دائماً ابدأ من الصفحة الأولى عند مسح البحث
        per_page: 15,
      };

      let response;
      
      // إذا كان هناك فلتر هرمي، استخدم الـ API الجديد
      if (hierarchicalFilters.level_id || hierarchicalFilters.category_id) {
        if (hierarchicalFilters.level_id) {
          params.level_id = hierarchicalFilters.level_id;
        }
        if (hierarchicalFilters.category_id) {
          params.category_id = hierarchicalFilters.category_id;
        }
        
        console.log('🎯 Using hierarchical filter with params:', params);
        response = await HomeApiService.getHierarchicalFilteredCourses(params);
      }
      // بخلاف ذلك، استخدم الـ API العادي
      else {
        console.log('📋 Loading all courses from page 1');
        response = await HomeApiService.getAllCoursesPaginated(params);
      }

      if (response.success && response.data) {
        setAllCourses(response.data); // حفظ جميع الكورسات
        setCourses(response.data);
        setPagination(response.pagination);
        setCurrentPage(1); // تأكد من أن الصفحة الحالية هي 1
        
        // طباعة معلومات الفلترة إذا كانت موجودة
        if (response.filters_applied) {
          console.log('✅ Filters applied by API:', response.filters_applied);
        }
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("حدث خطأ أثناء تحميل الكورسات");
    } finally {
      setIsFilterLoading(false);
    }
  };

  // تحديد الكورسات المعروضة (بحث أو فلترة أو جميع الكورسات)
  const displayedCourses = hasSearched ? searchResults : courses;
  const isShowingSearchResults = hasSearched && searchQuery.trim();
  const isShowingFilterResults = !hasSearched && (hierarchicalFilters.level_id || hierarchicalFilters.category_id);

  // معالجة تغيير الفلاتر الهرمية
  const handleHierarchicalFilterChange = (filterData) => {
    if (filterData.type === 'reset') {
      setHierarchicalFilters({
        level_id: null,
        category_id: null,
        levelName: '',
        categoryName: ''
      });
      setCurrentPage(1);
      setSearchQuery(""); // مسح البحث عند إعادة التعيين
      setHasSearched(false); // إعادة تعيين حالة البحث
      setSearchResults([]); // مسح نتائج البحث
      
      // إعادة تحميل الكورسات من الصفحة الأولى
      setTimeout(() => {
        fetchCoursesData();
      }, 100); // تأخير بسيط لضمان تحديث الحالة
      return;
    }

    if (filterData.type === 'hierarchical') {
      // مسح البحث عند تطبيق فلتر جديد
      setSearchQuery("");
      setHasSearched(false);
      setSearchResults([]);
      
      setHierarchicalFilters({
        level_id: filterData.level_id,
        category_id: filterData.category_id,
        levelName: filterData.levelName,
        categoryName: filterData.categoryName
      });
      setCurrentPage(1); // العودة للصفحة الأولى عند تطبيق فلتر جديد
      
      // تطبيق الفلتر الجديد فوراً
      setTimeout(() => {
        fetchCoursesData();
      }, 100);
    }
  };

  // عرض شاشة تحميل بسيطة للتحميل الأولي فقط
  if (isInitialLoading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? "bg-[#121212] text-[#E0E0E0]" : "bg-[#F0F4F8] text-[#37474F]"}`}>
        <Navbar />
        <div className="pt-20"></div>
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3949AB] mx-auto mb-4"></div>
            <p className="text-lg">{getText("جاري تحميل الكورسات...", "Loading courses...")}</p>
          </div>
        </div>
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
            {/* زر إعادة المحاولة في حالة البحث */}
            {hasSearched && searchQuery.trim() && (
              <button
                onClick={() => performSearch(searchQuery)}
                className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                disabled={isSearching}
              >
                {isSearching ? getText("جاري المحاولة...", "Retrying...") : getText("إعادة المحاولة", "Retry")}
              </button>
            )}
          </div>
        </div>
      )}

      {/* محتوى رئيسي */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* جانب الفلاتر الهرمية */}
          <div className="lg:w-1/4">
            <div className={`${
              isDarkMode ? "bg-[#1E1E1E] border-[#333333]" : "bg-white border-gray-200"
            } rounded-lg shadow-md p-4 border sticky top-24`}>
              <h2 className="text-xl font-bold mb-4">
                {getText("الفلتر", "Filter")}
              </h2>

              {/* الفلتر الهرمي الجديد */}
              <div className="mb-6">
                <h3 className={`font-medium mb-2 pb-2 border-b ${
                  isDarkMode ? "border-[#333333]" : "border-gray-200"
                }`}>
                  {getText("المرحلة والصف الدراسي", "Educational Stage & Grade")}
                </h3>

                <HierarchicalFilter
                  onFilterChange={handleHierarchicalFilterChange}
                  currentFilters={hierarchicalFilters}
                  isLoading={isFilterLoading}
                />
              </div>
            </div>
          </div>

          {/* جانب الكورسات */}
          <div className="lg:w-3/4">
            {/* عنوان ونتائج البحث */}
            <div className="mb-6">
              <h2 className="text-xl font-bold">
                {pagination ? (
                  getText(
                    `عرض ${displayedCourses.length} دورة من إجمالي ${pagination.total} دورة`,
                    `Showing ${displayedCourses.length} courses of ${pagination.total} total`
                  )
                ) : displayedCourses.length > 0 ? (
                  getText(
                    `تم العثور على ${displayedCourses.length} دورة`,
                    `Found ${displayedCourses.length} courses`
                  )
                ) : (
                  getText("لم يتم العثور على نتائج", "No results found")
                )}
              </h2>
              
              {/* عرض معلومات البحث أو الفلتر */}
              {isShowingSearchResults && (
                <p className="text-sm text-gray-500 mt-2">
                  {getText(
                    `نتائج البحث عن: "${searchQuery}"`,
                    `Search results for: "${searchQuery}"`
                  )}
                  {isSearching && (
                    <span className="ml-2">
                      <div className="inline-block animate-spin rounded-full h-3 w-3 border-t border-b border-blue-500 mr-1"></div>
                      {getText("جاري البحث...", "Searching...")}
                    </span>
                  )}
                </p>
              )}
              {isShowingFilterResults && (
                <p className="text-sm text-gray-500 mt-2">
                  {getText(
                    `مفلترة حسب: ${hierarchicalFilters.categoryName} - ${hierarchicalFilters.levelName}`,
                    `Filtered by: ${hierarchicalFilters.categoryName} - ${hierarchicalFilters.levelName}`
                  )}
                </p>
              )}
            </div>

            {/* قائمة الكورسات */}
            {displayedCourses.length > 0 ? (
              <div>
                {/* مؤشر تحميل للفلترة */}
                {(isFilterLoading || isSearching || isPending) && (
                  <div className="text-center py-4 mb-6">
                    <div className="inline-flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#3949AB]"></div>
                      <span className="text-sm">
                        {isPending ? getText("جاري التحديث...", "Updating...") :
                         isSearching ? getText("جاري البحث...", "Searching...") : 
                         getText("جاري تطبيق الفلتر...", "Applying filter...")}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedCourses.map((course) => (
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
                {isShowingSearchResults ? (
                  <div>
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold mb-2">
                      {getText("لم يتم العثور على نتائج", "No results found")}
                    </h3>
                    <p className="mb-4">
                      {getText(
                        `لم يتم العثور على أي دورات تحتوي على "${searchQuery}". جرب استخدام كلمات بحث مختلفة.`,
                        `No courses found containing "${searchQuery}". Try using different search terms.`
                      )}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <button
                        onClick={() => {
                          startTransition(() => {
                            setSearchQuery("");
                            setHasSearched(false);
                            setSearchResults([]);
                            // إعادة تحميل الكورسات من الصفحة الأولى
                            fetchCoursesData();
                          });
                        }}
                        className={`${
                          isDarkMode
                            ? "bg-[#3949AB] hover:bg-[#1A237E]"
                            : "bg-[#3949AB] hover:bg-[#1A237E]"
                        } text-white font-medium py-2 px-4 rounded-md transition duration-200`}
                      >
                        {getText("مسح البحث وعرض جميع الدورات", "Clear search and show all courses")}
                      </button>
                      <button
                        onClick={() => performSearch(searchQuery)}
                        className={`${
                          isDarkMode
                            ? "bg-gray-600 hover:bg-gray-700"
                            : "bg-gray-500 hover:bg-gray-600"
                        } text-white font-medium py-2 px-4 rounded-md transition duration-200`}
                        disabled={isSearching}
                      >
                        {isSearching ? getText("جاري البحث...", "Searching...") : getText("إعادة البحث", "Search again")}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>
                      {getText(
                        "لم يتم العثور على دورات مطابقة لمعايير البحث الخاصة بك. يرجى تجربة معايير مختلفة.",
                        "No courses found matching your search criteria. Please try different criteria."
                      )}
                    </p>
                    <button
                      onClick={() => {
                        startTransition(() => {
                          setSearchQuery("");
                          setHasSearched(false);
                          setSearchResults([]);
                          setHierarchicalFilters({
                            level_id: null,
                            category_id: null,
                            levelName: '',
                            categoryName: ''
                          });
                          // إعادة تحميل الكورسات من الصفحة الأولى
                          fetchCoursesData();
                        });
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCoursesPage;