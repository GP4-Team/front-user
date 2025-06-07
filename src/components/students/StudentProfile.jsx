// components/students/StudentProfile.jsx
import React from "react";
import { Link } from "react-router-dom";
import useStudentProfile from "../../hooks/useStudentProfile";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

const StudentProfile = () => {
  // استخدام الـ hook للحصول على بيانات البروفايل
  const {
    loading,
    error,
    basicInfo,
    academicInfo,
    currentCourses,
    examHistory,
    hasData,
    refreshProfile
  } = useStudentProfile();
  
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  // Default text function if translation isn't available
  const defaultT = (key) => {
    const translations = {
      noStudentData: "No student data available",
      home: "Home",
      profile: "Profile",
      department: "Department",
      level: "Level",
      gpa: "GPA",
      status: "Status",
      academicProgress: "Academic Progress",
      creditsCompleted: "Credits Completed",
      cumulativeGPA: "Cumulative GPA",
      currentCourses: "Current Courses",
      upcomingExams: "Upcoming Exams",
      examHistory: "Exam History",
      course: "Course",
      date: "Date",
      score: "Score",
      status: "Status",
      credits: "credits",
      instructor: "Instructor",
    };
    return translations[key] || key;
  };

  // Get translations - first try from context, fall back to default
  const t = (key) => defaultT(key);

  // Loading state
  if (loading) {
    return (
      <div className={`container mx-auto px-4 py-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'ar' ? 'جاري تحميل بيانات البروفايل...' : 'Loading profile data...'}
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`container mx-auto px-4 py-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`${isDarkMode ? 'bg-red-900 border-red-700 text-red-300' : 'bg-red-100 border-red-500 text-red-700'} border-l-4 p-4 rounded`} role="alert">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-sm font-medium">
                {language === 'ar' ? 'خطأ في تحميل البيانات' : 'Error loading data'}
              </p>
              <p className="text-sm mt-1">{error}</p>
              <button 
                onClick={refreshProfile}
                className={`mt-2 px-4 py-2 text-sm rounded ${isDarkMode ? 'bg-red-700 hover:bg-red-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
              >
                {language === 'ar' ? 'إعادة المحاولة' : 'Retry'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!hasData || !basicInfo) {
    return (
      <div className={`container mx-auto px-4 py-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`${isDarkMode ? 'bg-yellow-900 border-yellow-700 text-yellow-300' : 'bg-yellow-100 border-yellow-500 text-yellow-700'} border-l-4 p-4 rounded`} role="alert">
          <p>{language === 'ar' ? 'لا توجد بيانات للبروفايل' : 'No profile data available'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs mb-6">
        <ul className="flex space-x-2 text-gray-600">
          <li>
            <Link to="/dashboard" className="hover:text-gray-900">
              {t("home")}
            </Link>
          </li>
          <li className="mx-2">/</li>
          <li className="text-gray-900 font-medium">{t("profile")}</li>
        </ul>
      </div>

      {/* Profile Info */}
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-md overflow-hidden mb-6`}>
        <div className="md:flex">
          <div className={`md:w-1/3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-6 text-center`}>
            <img
              src={basicInfo.avatar || '/api/placeholder/128/128'}
              alt={basicInfo.name}
              className="rounded-full w-32 h-32 mx-auto mb-4 border-4 border-white shadow"
              onError={(e) => {
                e.target.src = '/api/placeholder/128/128';
              }}
            />
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{basicInfo.name}</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{basicInfo.id}</p>

            <div className={`flex items-center justify-center mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ${isRTL ? 'ml-2' : 'mr-2'}`}>✉</span>
              <span className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>{basicInfo.email}</span>
            </div>

            <div className={`flex items-center justify-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ${isRTL ? 'ml-2' : 'mr-2'}`}>📱</span>
              <span className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>{basicInfo.phone}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className={`${isDarkMode ? 'bg-gray-600' : 'bg-white'} p-3 rounded shadow-sm`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{t("department")}</p>
                <p className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                  {basicInfo.department}
                </p>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-600' : 'bg-white'} p-3 rounded shadow-sm`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{t("level")}</p>
                <p className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{basicInfo.level}</p>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-600' : 'bg-white'} p-3 rounded shadow-sm`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{t("gpa")}</p>
                <p className="font-semibold text-green-600">{basicInfo.gpa || 'N/A'}</p>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-600' : 'bg-white'} p-3 rounded shadow-sm`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{t("status")}</p>
                <p className="font-semibold text-green-600">{basicInfo.status}</p>
              </div>
            </div>
          </div>

          <div className="md:w-2/3 p-6">
            <div className="mb-8">
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4 flex items-center ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                <span className={`${isRTL ? "ml-2" : "mr-2"}`}>🎓</span>
                {t("academicProgress")}
              </h3>

              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg mb-4`}>
                <div className={`flex justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t("creditsCompleted")}</span>
                  <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {academicInfo?.totalCredits || 0} / {academicInfo?.requiredCredits || 120}
                  </span>
                </div>
                <div className={`w-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'} rounded-full h-4`}>
                  <div
                    className="bg-green-500 rounded-full h-4"
                    style={{
                      width: `${
                        academicInfo?.totalCredits && academicInfo?.requiredCredits
                          ? (academicInfo.totalCredits / academicInfo.requiredCredits) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} p-4 rounded shadow-sm border-t-4 border-green-400`}>
                  <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {basicInfo.gpa || 'N/A'}
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    {t("cumulativeGPA")}
                  </div>
                </div>
                <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} p-4 rounded shadow-sm border-t-4 border-blue-400`}>
                  <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {currentCourses?.length || 0}
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    {t("currentCourses")}
                  </div>
                </div>
                <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} p-4 rounded shadow-sm border-t-4 border-purple-400`}>
                  <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {examHistory?.filter((exam) => exam.status === "upcoming" || exam.status === "قادم").length || 0}
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    {t("upcomingExams")}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4 flex items-center ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                <span className={`${isRTL ? "ml-2" : "mr-2"}`}>📋</span>
                {t("examHistory")}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <th className={`px-4 py-2 ${isRTL ? "text-right" : "text-left"} ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        {t("course")}
                      </th>
                      <th className={`px-4 py-2 ${isRTL ? "text-right" : "text-left"} ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        {t("date")}
                      </th>
                      <th className={`px-4 py-2 ${isRTL ? "text-right" : "text-left"} ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        {t("score")}
                      </th>
                      <th className={`px-4 py-2 ${isRTL ? "text-right" : "text-left"} ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        {t("status")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {examHistory && examHistory.length > 0 ? (
                      examHistory.map((exam, index) => (
                        <tr key={exam.id || index} className={`border-b ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                          <td className={`px-4 py-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            {exam.course_name || exam.course || exam.title || 'N/A'}
                          </td>
                          <td className={`px-4 py-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            {exam.date ? new Date(exam.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US') : 'N/A'}
                          </td>
                          <td className={`px-4 py-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            {exam.score !== null && exam.score !== undefined ? (
                              <span className="font-medium">
                                {exam.score} / {exam.max_score || exam.maxScore || 100}
                              </span>
                            ) : (
                              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>-</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                exam.status === "completed" || exam.status === "مكتمل"
                                  ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
                              }`}
                            >
                              {exam.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className={`px-4 py-8 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {language === 'ar' ? 'لا توجد امتحانات سابقة' : 'No exam history available'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Courses */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden mb-6`}>
        <div className="p-6">
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4 flex items-center ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
            <span className={`${isRTL ? "ml-2" : "mr-2"}`}>📚</span>
            {t("currentCourses")}
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {currentCourses && currentCourses.length > 0 ? (
              currentCourses.map((course, index) => (
                <div
                  key={course.id || index}
                  className={`border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} rounded-lg overflow-hidden`}
                >
                  <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} px-4 py-3 flex justify-between items-center`}>
                    <div>
                      <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {course.name || course.course_name || course.title || 'N/A'}
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {course.code || course.course_code || 'N/A'} · {course.credits || course.credit_hours || 3} {t("credits")}
                      </p>
                    </div>
                    <div className={`${isDarkMode ? 'bg-gray-600' : 'bg-white'} rounded-full h-12 w-12 flex items-center justify-center shadow-sm`}>
                      <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'} font-bold`}>
                        {course.progress || course.completion_percentage || 0}%
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t("instructor")}:</span>{" "}
                      {course.instructor || course.instructor_name || course.teacher || 'N/A'}
                    </p>
                    <div className={`w-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2 mt-2`}>
                      <div
                        className="bg-green-500 rounded-full h-2"
                        style={{ width: `${course.progress || course.completion_percentage || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={`col-span-2 text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {language === 'ar' ? 'لا توجد مقررات حالية' : 'No current courses available'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
