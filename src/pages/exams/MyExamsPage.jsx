import React, { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Components
import Navbar from "../../components/navigation/Navbar";
import SimplifiedExamCard from "../../components/exams/SimplifiedExamCard";

// API Service
import { useRealExamination } from "../../hooks/api/useRealExamination";

const MyExamsPage = () => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState(null);

  // Use the real examination hook
  const { 
    loading,
    availableExams,
    completedExams,
    fetchAllExamData,
    statistics: examStatistics,
    statisticsError,
    availableExamsError,
    completedExamsError,
    clearErrors
  } = useRealExamination();

  const getText = (ar, en) => (language === "ar" ? ar : en);

  // جلب الامتحانات عند تحميل الصفحة أول مرة
  useEffect(() => {
    const fetchInitialData = async () => {
      if (!isAuthenticated || !user) return;
      
      setIsInitialLoading(true);
      setError(null);

      try {
        console.log('📋 Loading initial exam data');
        await fetchAllExamData();
      } catch (err) {
        console.error("Error fetching initial exam data:", err);
        setError("حدث خطأ أثناء تحميل الامتحانات");
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchInitialData();
  }, [isAuthenticated, user, fetchAllExamData]);

  // تحديث الإحصائيات عند تحميل البيانات
  useEffect(() => {
    if (!loading && examStatistics) {
      setStatistics(examStatistics);
    }
  }, [examStatistics, loading]);

  // Auth required state
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen ${isDarkMode ? "bg-[#121212] text-[#E0E0E0]" : "bg-[#F0F4F8] text-[#37474F]"}`}>
        <Navbar />
        <div className="pt-20"></div>
        <div className="flex items-center justify-center h-96">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-6xl mb-4">🔐</div>
            <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {getText('تسجيل الدخول مطلوب', 'Login Required')}
            </h2>
            <p className={`text-lg mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {getText('يجب تسجيل الدخول لعرض الامتحانات', 'Please login to view your exams')}
            </p>
            <button 
              onClick={() => navigate('/auth?mode=login')}
              className="bg-[#3949AB] hover:bg-[#1A237E] text-white px-6 py-2 rounded-lg transition-colors"
            >
              {getText('تسجيل الدخول', 'Login')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // عرض شاشة تحميل بسيطة للتحميل الأولي فقط
  if (isInitialLoading || loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? "bg-[#121212] text-[#E0E0E0]" : "bg-[#F0F4F8] text-[#37474F]"}`}>
        <Navbar />
        <div className="pt-20"></div>
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3949AB] mx-auto mb-4"></div>
            <p className="text-lg">{getText("جاري تحميل الامتحانات...", "Loading exams...")}</p>
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
            {getText("امتحاناتي", "My Exams")}
          </h1>

          {/* الإحصائيات */}
          {statistics && (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`${isDarkMode ? 'bg-[#333333]' : 'bg-white/20'} rounded-lg p-4 text-center backdrop-blur-sm`}>
                  <div className="text-2xl font-bold mb-2">{statistics.total_available_exams || 0}</div>
                  <div className="text-sm opacity-90">{getText("امتحانات متاحة", "Available Exams")}</div>
                </div>
                <div className={`${isDarkMode ? 'bg-[#333333]' : 'bg-white/20'} rounded-lg p-4 text-center backdrop-blur-sm`}>
                  <div className="text-2xl font-bold mb-2">{statistics.active_exams || 0}</div>
                  <div className="text-sm opacity-90">{getText("امتحانات نشطة", "Active Exams")}</div>
                </div>
                <div className={`${isDarkMode ? 'bg-[#333333]' : 'bg-white/20'} rounded-lg p-4 text-center backdrop-blur-sm`}>
                  <div className="text-2xl font-bold mb-2">{statistics.upcoming_exams || 0}</div>
                  <div className="text-sm opacity-90">{getText("امتحانات قادمة", "Upcoming Exams")}</div>
                </div>
                <div className={`${isDarkMode ? 'bg-[#333333]' : 'bg-white/20'} rounded-lg p-4 text-center backdrop-blur-sm`}>
                  <div className="text-2xl font-bold mb-2">{statistics.ended_exams || 0}</div>
                  <div className="text-sm opacity-90">{getText("امتحانات منتهية", "Ended Exams")}</div>
                </div>
              </div>
              
              {(Array.isArray(availableExams) ? availableExams.length : 0) + 
               (Array.isArray(completedExams) ? completedExams.length : 0) > 0 && (
                <div className="text-center mt-6 text-sm opacity-90">
                  {getText(
                    `إجمالي ${(Array.isArray(availableExams) ? availableExams.length : 0) + (Array.isArray(completedExams) ? completedExams.length : 0)} امتحان`,
                    `Total ${(Array.isArray(availableExams) ? availableExams.length : 0) + (Array.isArray(completedExams) ? completedExams.length : 0)} exams`
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* رسالة خطأ */}
      {(error || statisticsError || availableExamsError || completedExamsError) && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className={`font-bold ${isRTL ? 'ml-1' : 'mr-1'}`}>خطأ:</strong>
            <span className="block sm:inline">
              {error || statisticsError || availableExamsError || completedExamsError}
            </span>
            <button
              onClick={() => {
                clearErrors();
                fetchAllExamData();
              }}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              {getText("إعادة المحاولة", "Retry")}
            </button>
          </div>
        </div>
      )}

      {/* محتوى الامتحانات */}
      <div className="container mx-auto px-4 py-12">
        {/* الامتحانات المتاحة */}
        {Array.isArray(availableExams) && availableExams.length > 0 && (
          <div className="mb-12">
            <div className="mb-8">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#37474F]'} ${isRTL ? 'text-right' : 'text-left'}`}>
                {getText("الامتحانات المتاحة", "Available Exams")}
              </h2>
              <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} ${isRTL ? 'text-right' : 'text-left'}`}>
                {getText(
                  `عرض ${availableExams.length} امتحان متاح`,
                  `Showing ${availableExams.length} available exams`
                )}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableExams.map((exam) => (
                <SimplifiedExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          </div>
        )}

        {/* الامتحانات المكتملة */}
        {Array.isArray(completedExams) && completedExams.length > 0 && (
          <div className="mb-12">
            <div className="mb-8">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#37474F]'} ${isRTL ? 'text-right' : 'text-left'}`}>
                {getText("الامتحانات المكتملة", "Completed Exams")}
              </h2>
              <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} ${isRTL ? 'text-right' : 'text-left'}`}>
                {getText(
                  `عرض ${completedExams.length} امتحان مكتمل`,
                  `Showing ${completedExams.length} completed exams`
                )}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedExams.map((exam) => (
                <SimplifiedExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          </div>
        )}

        {/* حالة عدم وجود امتحانات */}
        {(!Array.isArray(availableExams) || availableExams.length === 0) && 
         (!Array.isArray(completedExams) || completedExams.length === 0) && (
          <div className={`${
            isDarkMode ? "bg-[#1E1E1E] text-[#E0E0E0]" : "bg-white text-[#37474F]"
          } rounded-lg shadow-md p-8 text-center max-w-md mx-auto`}>
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2">
              {getText("لا توجد امتحانات متاحة", "No exams available")}
            </h3>
            <p>
              {getText(
                "لم يتم العثور على امتحانات. يرجى المحاولة مرة أخرى لاحقاً.",
                "No exams found. Please try again later."
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyExamsPage;