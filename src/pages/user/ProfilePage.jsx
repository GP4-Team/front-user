import React, { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/Tabs";
import {
  BarChart,
  User,
  GraduationCap,
  BookOpen,
  Calendar,
  Award,
  Clock,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  FileText,
  Edit,
  Bell,
  Loader,
  UserPlus,
} from "lucide-react";
import Navbar from "../../components/navigation/Navbar";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import useStudentProfile from "../../hooks/useStudentProfile";
import CourseRegistration from "../../components/students/CourseRegistration";

const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const isArabic = language === "ar";
  
  // استخدام الـ hook للحصول على بيانات البروفايل
  const {
    loading,
    error,
    basicInfo,
    academicInfo,
    currentCourses,
    examHistory,
    hasData,
    refreshProfile,
    upcomingAssignments,
    completedCourses,
    announcements,
    // إضافة متغيرات الكورسات المسجلة
    registeredCourses,
    coursesLoading,
    coursesError,
    refreshRegisteredCourses,
    hasCoursesData
  } = useStudentProfile();

  // إزالة التعليق لأن البيانات أصبحت من الAPI

  // UI text translations
  const translations = {
    academicProgress: {
      en: "Academic Progress",
      ar: "التقدم الأكاديمي",
    },
    currentGPA: {
      en: "Current GPA",
      ar: "المعدل التراكمي الحالي",
    },
    year: {
      en: "Year",
      ar: "السنة",
    },
    completedCredits: {
      en: "Completed Credits",
      ar: "الساعات المكتملة",
    },
    remaining: {
      en: "Remaining",
      ar: "المتبقي",
    },
    academicAdvisor: {
      en: "Academic Advisor",
      ar: "المرشد الأكاديمي",
    },
    enrollmentDate: {
      en: "Enrollment Date",
      ar: "تاريخ التسجيل",
    },
    expectedGraduation: {
      en: "Expected Graduation",
      ar: "التخرج المتوقع",
    },
    // Tab labels
    overview: {
      en: "Overview",
      ar: "نظرة عامة",
    },
    courses: {
      en: "Courses",
      ar: "المقررات",
    },
    assignments: {
      en: "Assignments",
      ar: "الواجبات",
    },
    courseRegistration: {
      en: "Course Registration",
      ar: "تسجيل الكورسات",
    },
    announcements: {
      en: "Announcements",
      ar: "الإعلانات",
    },
    // Other common labels
    currentCourses: {
      en: "Current Courses",
      ar: "المقررات الحالية",
    },
    upcomingAssignments: {
      en: "Upcoming Assignments",
      ar: "الواجبات القادمة",
    },
    loading: {
      en: "Loading profile data...",
      ar: "جاري تحميل بيانات البروفايل...",
    },
    errorLoading: {
      en: "Error loading profile data",
      ar: "خطأ في تحميل بيانات البروفايل",
    },
    retry: {
      en: "Retry",
      ar: "إعادة المحاولة",
    },
    noData: {
      en: "No profile data available",
      ar: "لا توجد بيانات للبروفايل",
    },
  };

  // Get text based on current language
  const getText = (textObj) => {
    return textObj[language] || textObj.en; // Fallback to English
  };

  // Loading state
  if (loading) {
    return (
      <div className={`w-full bg-[#F0F4F8] dark:bg-[#121212] min-h-screen ${
        isRTL ? "font-tajawal" : ""
      }`}>
        <Navbar />
        <div className="max-w-6xl mx-auto p-6 pt-24">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader className="animate-spin h-12 w-12 text-[#3949AB] mb-4" />
            <p className="text-lg text-[#37474F] dark:text-white">
              {getText(translations.loading)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state مع إعادة توجيه للـ login
  if (error) {
    return (
      <div className={`w-full bg-[#F0F4F8] dark:bg-[#121212] min-h-screen ${
        isRTL ? "font-tajawal" : ""
      }`}>
        <Navbar />
        <div className="max-w-6xl mx-auto p-6 pt-24">
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded">
            <h3 className="font-bold">{getText(translations.errorLoading)}</h3>
            <p className="mt-1">{error}</p>
            
            {/* إذا كان الخطأ unauthorized، أعرض زر تسجيل دخول */}
            {error.includes('Unauthorized') || error.includes('unauthorized') || error.includes('Unauthenticated') ? (
              <div className="mt-4 space-y-2">
                <button 
                  onClick={() => window.location.href = '/login'}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mr-2"
                >
                  {getText({ ar: 'تسجيل الدخول', en: 'Login' })}
                </button>
                <button 
                  onClick={refreshProfile}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                >
                  {getText(translations.retry)}
                </button>
              </div>
            ) : (
              <button 
                onClick={refreshProfile}
                className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                {getText(translations.retry)}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!hasData || !basicInfo) {
    return (
      <div className={`w-full bg-[#F0F4F8] dark:bg-[#121212] min-h-screen ${
        isRTL ? "font-tajawal" : ""
      }`}>
        <Navbar />
        <div className="max-w-6xl mx-auto p-6 pt-24">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-700 text-yellow-700 dark:text-yellow-400 px-4 py-3 rounded">
            <p>{getText(translations.noData)}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full bg-[#F0F4F8] dark:bg-[#121212] min-h-screen ${
        isRTL ? "font-tajawal" : ""
      }`}
    >
      {/* Add the Navbar component at the top of the page */}
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        {/* Profile Header */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-md overflow-hidden mb-6">
          <div className="flex flex-col md:flex-row">
            {/* Profile Image and Basic Info */}
            <div className={`md:w-1/3 p-6 bg-[#3949AB] dark:bg-[#1A237E] text-white ${isRTL ? 'md:order-2' : ''}`}>
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src={basicInfo.avatar || "/api/placeholder/200/200"}
                    alt={basicInfo.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-[#37474F]"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/200/200";
                    }}
                  />
                  <button className="absolute bottom-0 right-0 bg-[#FFC107] p-2 rounded-full">
                    <Edit size={16} className="text-[#37474F]" />
                  </button>
                </div>
                <h1 className="text-2xl font-bold">{basicInfo.name}</h1>
                <p className="text-[#7986CB]">{basicInfo.id}</p>
                <p className="mt-2 text-center font-medium">
                  {basicInfo.program || basicInfo.department}
                </p>
                <div className={`flex items-center mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <GraduationCap size={16} className={`${isRTL ? 'ml-1' : 'mr-1'}`} />
                  <span className="text-sm">{basicInfo.department}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Mail size={16} className={`${isRTL ? 'ml-3' : 'mr-3'} text-[#7986CB]`} />
                  <span className="text-sm">{basicInfo.email}</span>
                </div>
                <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Phone size={16} className={`${isRTL ? 'ml-3' : 'mr-3'} text-[#7986CB]`} />
                  <span className="text-sm">{basicInfo.phone}</span>
                </div>
                <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <MapPin size={16} className={`${isRTL ? 'ml-3' : 'mr-3'} text-[#7986CB]`} />
                  <span className="text-sm">{basicInfo.address || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Academic Progress and Stats */}
            <div className={`md:w-2/3 p-6 ${isRTL ? 'md:order-1' : ''}`}>
              <div className={`flex justify-between items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h2 className="text-xl font-semibold text-[#37474F] dark:text-white">
                  {getText(translations.academicProgress)}
                </h2>
                <div className={`flex space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                  <button className="p-2 bg-[#F0F4F8] dark:bg-[#2D2D2D] rounded-full">
                    <Bell
                      size={18}
                      className="text-[#3949AB] dark:text-[#7986CB]"
                    />
                  </button>
                  <button className="p-2 bg-[#F0F4F8] dark:bg-[#2D2D2D] rounded-full">
                    <FileText
                      size={18}
                      className="text-[#3949AB] dark:text-[#7986CB]"
                    />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] p-4 rounded-lg">
                  <p className="text-sm text-[#3949AB] dark:text-[#7986CB] mb-1">
                    {getText(translations.currentGPA)}
                  </p>
                  <p className="text-2xl font-bold text-[#37474F] dark:text-white">
                    {basicInfo.gpa || 'N/A'}
                  </p>
                </div>
                <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] p-4 rounded-lg">
                  <p className="text-sm text-[#3949AB] dark:text-[#7986CB] mb-1">
                    {getText(translations.year)}
                  </p>
                  <p className="text-2xl font-bold text-[#37474F] dark:text-white">
                    {academicInfo?.currentYear || academicInfo?.level || 'N/A'}
                  </p>
                </div>
                <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] p-4 rounded-lg">
                  <p className="text-sm text-[#3949AB] dark:text-[#7986CB] mb-1">
                    {getText(translations.completedCredits)}
                  </p>
                  <p className="text-2xl font-bold text-[#37474F] dark:text-white">
                    {academicInfo?.totalCredits || 0}
                  </p>
                </div>
                <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] p-4 rounded-lg">
                  <p className="text-sm text-[#3949AB] dark:text-[#7986CB] mb-1">
                    {getText(translations.remaining)}
                  </p>
                  <p className="text-2xl font-bold text-[#37474F] dark:text-white">
                    {academicInfo?.remainingCredits || 'N/A'}
                  </p>
                </div>
              </div>

              <div className={`flex flex-col md:flex-row justify-between ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                <div className="mb-4 md:mb-0">
                  <p className="text-sm text-[#3949AB] dark:text-[#7986CB]">
                    {getText(translations.academicAdvisor)}
                  </p>
                  <p className="font-medium text-[#37474F] dark:text-white">
                    {academicInfo?.advisorName || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#3949AB] dark:text-[#7986CB]">
                    {getText(translations.enrollmentDate)}
                  </p>
                  <p className="font-medium text-[#37474F] dark:text-white">
                    {academicInfo?.enrollmentDate ? new Date(academicInfo.enrollmentDate).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US') : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#3949AB] dark:text-[#7986CB]">
                    {getText(translations.expectedGraduation)}
                  </p>
                  <p className="font-medium text-[#37474F] dark:text-white">
                    {academicInfo?.expectedGraduation ? new Date(academicInfo.expectedGraduation).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US') : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`bg-white dark:bg-[#1E1E1E] p-1 rounded-lg mb-6 flex ${isRTL ? 'space-x-reverse' : 'space-x-1'}`}>
            <TabsTrigger
              value="overview"
              className={`flex-1 py-2 data-[state=active]:bg-[#3949AB] data-[state=active]:text-white ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <BarChart size={16} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
              {getText(translations.overview)}
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className={`flex-1 py-2 data-[state=active]:bg-[#3949AB] data-[state=active]:text-white ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <BookOpen size={16} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
              {getText(translations.courses)}
            </TabsTrigger>
            <TabsTrigger
              value="assignments"
              className={`flex-1 py-2 data-[state=active]:bg-[#3949AB] data-[state=active]:text-white ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <FileText size={16} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
              {getText(translations.assignments)}
            </TabsTrigger>
            <TabsTrigger
              value="courseRegistration"
              className={`flex-1 py-2 data-[state=active]:bg-[#3949AB] data-[state=active]:text-white ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <UserPlus size={16} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
              {getText(translations.courseRegistration)}
            </TabsTrigger>
            <TabsTrigger
              value="announcements"
              className={`flex-1 py-2 data-[state=active]:bg-[#3949AB] data-[state=active]:text-white ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <Bell size={16} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
              {getText(translations.announcements)}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Current Courses Card */}
              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-md overflow-hidden col-span-1 md:col-span-2">
                <div className="p-6">
                  <h3 className={`text-lg font-semibold text-[#37474F] dark:text-white mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {getText(translations.currentCourses)}
                  </h3>
                  <div className="space-y-4">
                    {currentCourses && currentCourses.length > 0 ? (
                      currentCourses.slice(0, 4).map((course, index) => (
                        <div
                          key={course.id || index}
                          className={`flex items-center justify-between border-b border-[#F0F4F8] dark:border-[#2D2D2D] pb-3 last:border-0 last:pb-0 ${isRTL ? 'flex-row-reverse' : ''}`}
                        >
                          <div className={isRTL ? 'text-right' : 'text-left'}>
                            <p className="font-medium text-[#37474F] dark:text-white">
                              {course.name || course.course_name || course.title || 'N/A'}
                            </p>
                            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <span className={`text-sm text-[#3949AB] dark:text-[#7986CB] ${isRTL ? 'ml-2' : 'mr-2'}`}>
                                {course.code || course.course_code || 'N/A'}
                              </span>
                              <span className="text-xs bg-[#F0F4F8] dark:bg-[#2D2D2D] text-[#3949AB] dark:text-[#7986CB] py-0.5 px-2 rounded-full">
                                {course.credits || course.credit_hours || 3} credits
                              </span>
                            </div>
                          </div>
                          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className={`text-sm text-[#3949AB] dark:text-[#7986CB] ${isRTL ? 'ml-3' : 'mr-3'}`}>
                              {course.instructor || course.instructor_name || course.teacher || 'N/A'}
                            </span>
                            <ChevronRight
                              size={18}
                              className={`text-[#3949AB] dark:text-[#7986CB] ${isRTL ? 'rotate-180' : ''}`}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] p-6 rounded-lg text-center">
                        <div className="text-6xl mb-4">📚</div>
                        <h4 className="text-lg font-medium text-[#37474F] dark:text-white mb-2">
                          {language === 'ar' ? 'لا توجد مقررات حالية' : 'No Current Courses'}
                        </h4>
                        <p className="text-sm text-[#3949AB] dark:text-[#7986CB]">
                          {language === 'ar' ? 'سيتم عرض مقرراتك هنا عند التسجيل فيها' : 'Your enrolled courses will appear here'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Upcoming Assignments Card */}
              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#37474F] dark:text-white mb-4">
                    {getText(translations.upcomingAssignments)}
                  </h3>
                  <div className="space-y-4">
                    {upcomingAssignments && upcomingAssignments.length > 0 ? (
                      upcomingAssignments.slice(0, 3).map((assignment, index) => (
                        <div
                          key={assignment.id || index}
                          className="bg-[#F0F4F8] dark:bg-[#2D2D2D] p-3 rounded-lg"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <p className="font-medium text-[#37474F] dark:text-white">
                              {assignment.title || assignment.name || 'Assignment'}
                            </p>
                            <span className="text-xs bg-[#FFC107] text-[#37474F] py-0.5 px-2 rounded-full">
                              {assignment.course || assignment.course_code || 'Course'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Clock
                                size={14}
                                className="text-[#3949AB] dark:text-[#7986CB] mr-1"
                              />
                              <span className="text-xs text-[#3949AB] dark:text-[#7986CB]">
                                Due: {assignment.due_date || assignment.dueDate || 'TBD'}
                              </span>
                            </div>
                            <span className="text-xs text-[#3949AB] dark:text-[#7986CB]">
                              {assignment.status || 'Pending'}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] p-6 rounded-lg text-center">
                        <div className="text-4xl mb-4">📝</div>
                        <h4 className="text-md font-medium text-[#37474F] dark:text-white mb-2">
                          {language === 'ar' ? 'لا توجد واجبات قادمة' : 'No Assignments'}
                        </h4>
                        <p className="text-xs text-[#3949AB] dark:text-[#7986CB]">
                          {language === 'ar' ? 'سيتم عرض واجباتك هنا' : 'Assignments will appear here'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Information Section */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quick Actions Card */}
              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#37474F] dark:text-white mb-4">
                    {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 bg-[#F0F4F8] dark:bg-[#2D2D2D] rounded-lg hover:bg-[#E0E4E8] dark:hover:bg-[#3D3D3D] transition-colors">
                      <span className="text-[#37474F] dark:text-white">{language === 'ar' ? 'تحديث البيانات الشخصية' : 'Update Personal Info'}</span>
                      <Edit size={16} className="text-[#3949AB] dark:text-[#7986CB]" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-[#F0F4F8] dark:bg-[#2D2D2D] rounded-lg hover:bg-[#E0E4E8] dark:hover:bg-[#3D3D3D] transition-colors">
                      <span className="text-[#37474F] dark:text-white">{language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}</span>
                      <ChevronRight size={16} className={`text-[#3949AB] dark:text-[#7986CB] ${isRTL ? 'rotate-180' : ''}`} />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-[#F0F4F8] dark:bg-[#2D2D2D] rounded-lg hover:bg-[#E0E4E8] dark:hover:bg-[#3D3D3D] transition-colors">
                      <span className="text-[#37474F] dark:text-white">{language === 'ar' ? 'تحميل الشهادات' : 'Download Certificates'}</span>
                      <Award size={16} className="text-[#3949AB] dark:text-[#7986CB]" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Academic Summary Card */}
              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#37474F] dark:text-white mb-4">
                    {language === 'ar' ? 'ملخص أكاديمي' : 'Academic Summary'}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#3949AB] dark:text-[#7986CB]">{language === 'ar' ? 'البرنامج:' : 'Program:'}</span>
                      <span className="text-sm font-medium text-[#37474F] dark:text-white">{basicInfo?.program || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#3949AB] dark:text-[#7986CB]">{language === 'ar' ? 'التخصص:' : 'Concentration:'}</span>
                      <span className="text-sm font-medium text-[#37474F] dark:text-white">{basicInfo?.concentration || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#3949AB] dark:text-[#7986CB]">{language === 'ar' ? 'المرشد الأكاديمي:' : 'Academic Advisor:'}</span>
                      <span className="text-sm font-medium text-[#37474F] dark:text-white">{academicInfo?.advisorName || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#3949AB] dark:text-[#7986CB]">{language === 'ar' ? 'حالة الطالب:' : 'Student Status:'}</span>
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 py-1 px-2 rounded-full">
                        {basicInfo?.status || 'Active'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="mt-0">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className={`flex justify-between items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <h3 className={`text-lg font-semibold text-[#37474F] dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}>
                    {getText({
                      ar: 'المقررات المسجلة',
                      en: 'Registered Courses'
                    })}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {coursesLoading && (
                      <div className="flex items-center space-x-2">
                        <Loader className="animate-spin h-4 w-4 text-[#3949AB]" />
                        <span className="text-sm text-[#3949AB] dark:text-[#7986CB]">
                          {getText({
                            ar: 'جاري التحميل...',
                            en: 'Loading...'
                          })}
                        </span>
                      </div>
                    )}
                    <button 
                      onClick={refreshRegisteredCourses}
                      disabled={coursesLoading}
                      className="bg-[#3949AB] hover:bg-[#3949AB]/90 disabled:bg-[#3949AB]/50 text-white px-3 py-1.5 rounded-md text-sm flex items-center space-x-1"
                    >
                      <Clock size={14} />
                      <span>{getText({
                        ar: 'تحديث',
                        en: 'Refresh'
                      })}</span>
                    </button>
                  </div>
                </div>

                {/* عرض أخطاء تحميل المقررات */}
                {coursesError && (
                  <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
                    <p className="text-sm">{coursesError}</p>
                    <button 
                      onClick={refreshRegisteredCourses}
                      className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    >
                      {getText(translations.retry)}
                    </button>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-[#F0F4F8] dark:bg-[#2D2D2D] text-left">
                        <th className={`px-4 py-3 text-sm font-medium text-[#3949AB] dark:text-[#7986CB] ${isRTL ? 'rounded-r-lg' : 'rounded-l-lg'}`}>
                          {getText({
                            ar: 'كود المقرر',
                            en: 'Course Code'
                          })}
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-[#3949AB] dark:text-[#7986CB]">
                          {getText({
                            ar: 'اسم المقرر',
                            en: 'Course Name'
                          })}
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-[#3949AB] dark:text-[#7986CB]">
                          {getText({
                            ar: 'الساعات المعتمدة',
                            en: 'Credits'
                          })}
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-[#3949AB] dark:text-[#7986CB]">
                          {getText({
                            ar: 'المدرس',
                            en: 'Instructor'
                          })}
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-[#3949AB] dark:text-[#7986CB]">
                          {getText({
                            ar: 'الفصل الدراسي',
                            en: 'Semester'
                          })}
                        </th>
                        <th className={`px-4 py-3 text-sm font-medium text-[#3949AB] dark:text-[#7986CB] ${isRTL ? 'rounded-l-lg' : 'rounded-r-lg'}`}>
                          {getText({
                            ar: 'الحالة',
                            en: 'Status'
                          })}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0F4F8] dark:divide-[#2D2D2D]">
                      {!coursesLoading && currentCourses && currentCourses.length > 0 ? (
                        currentCourses.map((course, index) => (
                          <tr key={course.id || index} className="hover:bg-[#F9FAFB] dark:hover:bg-[#2D2D2D] transition-colors">
                            <td className="px-4 py-4 text-sm font-medium text-[#37474F] dark:text-white">
                              <div className="flex items-center">
                                <BookOpen size={16} className="text-[#3949AB] dark:text-[#7986CB] mr-2" />
                                {course.course_code || course.code || 'N/A'}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-[#37474F] dark:text-white">
                              <div>
                                <p className="font-medium">{course.course_name || course.name || course.title || 'N/A'}</p>
                                {course.description && (
                                  <p className="text-xs text-[#3949AB] dark:text-[#7986CB] mt-1">
                                    {course.description.length > 50 
                                      ? course.description.substring(0, 50) + '...' 
                                      : course.description
                                    }
                                  </p>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-[#3949AB] dark:text-[#7986CB]">
                              <span className="bg-[#E3F2FD] dark:bg-[#1E3A8A]/20 text-[#1976D2] dark:text-[#60A5FA] px-2 py-1 rounded-full text-xs font-medium">
                                {course.credits || course.credit_hours || 3} 
                                {getText({
                                  ar: 'ساعة',
                                  en: 'hrs'
                                })}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm text-[#37474F] dark:text-white">
                              <div className="flex items-center">
                                <User size={14} className="text-[#3949AB] dark:text-[#7986CB] mr-1" />
                                {course.instructor_name || course.instructor || 'N/A'}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-[#3949AB] dark:text-[#7986CB]">
                              <span className="bg-[#F3E5F5] dark:bg-[#4A148C]/20 text-[#7B1FA2] dark:text-[#CE93D8] px-2 py-1 rounded-full text-xs">
                                {course.semester || course.term || getText({
                                  ar: 'الفصل الحالي',
                                  en: 'Current'
                                })}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <span className={`text-xs py-1 px-2 rounded-full ${
                                course.status === 'active' || course.status === 'enrolled' || !course.status
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : course.status === 'completed'
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              }`}>
                                {course.status === 'active' || course.status === 'enrolled' || !course.status
                                  ? getText({ ar: 'نشط', en: 'Active' })
                                  : course.status === 'completed'
                                  ? getText({ ar: 'مكتمل', en: 'Completed' })
                                  : course.status || getText({ ar: 'نشط', en: 'Active' })
                                }
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-4 py-8">
                            <div className="text-center">
                              {coursesLoading ? (
                                <div className="flex flex-col items-center">
                                  <Loader className="animate-spin h-8 w-8 text-[#3949AB] mb-4" />
                                  <p className="text-lg text-[#37474F] dark:text-white mb-2">
                                    {getText({
                                      ar: 'جاري تحميل المقررات...',
                                      en: 'Loading courses...'
                                    })}
                                  </p>
                                </div>
                              ) : (
                                <div>
                                  <div className="text-6xl mb-4">📚</div>
                                  <h4 className="text-lg font-medium text-[#37474F] dark:text-white mb-2">
                                    {getText({
                                      ar: 'لا توجد مقررات مسجلة',
                                      en: 'No Registered Courses'
                                    })}
                                  </h4>
                                  <p className="text-sm text-[#3949AB] dark:text-[#7986CB] mb-4">
                                    {getText({
                                      ar: 'لم تقم بالتسجيل في أي مقررات بعد',
                                      en: 'You have not registered for any courses yet'
                                    })}
                                  </p>
                                  <button 
                                    onClick={() => setActiveTab('courseRegistration')}
                                    className="bg-[#3949AB] hover:bg-[#3949AB]/90 text-white px-4 py-2 rounded-lg text-sm flex items-center mx-auto"
                                  >
                                    <UserPlus size={16} className="mr-2" />
                                    {getText({
                                      ar: 'سجل في مقررات جديدة',
                                      en: 'Register for Courses'
                                    })}
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* إحصائيات سريعة */}
                {!coursesLoading && currentCourses && currentCourses.length > 0 && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-[#3949AB] dark:text-[#7986CB]">
                        {currentCourses.length}
                      </div>
                      <div className="text-sm text-[#37474F] dark:text-white">
                        {getText({
                          ar: 'إجمالي المقررات',
                          en: 'Total Courses'
                        })}
                      </div>
                    </div>
                    <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-[#3949AB] dark:text-[#7986CB]">
                        {currentCourses.reduce((total, course) => total + (course.credits || course.credit_hours || 3), 0)}
                      </div>
                      <div className="text-sm text-[#37474F] dark:text-white">
                        {getText({
                          ar: 'إجمالي الساعات',
                          en: 'Total Credits'
                        })}
                      </div>
                    </div>
                    <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-[#3949AB] dark:text-[#7986CB]">
                        {currentCourses.filter(course => course.status === 'active' || course.status === 'enrolled' || !course.status).length}
                      </div>
                      <div className="text-sm text-[#37474F] dark:text-white">
                        {getText({
                          ar: 'المقررات النشطة',
                          en: 'Active Courses'
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="mt-0">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#37474F] dark:text-white mb-6">
                  All Assignments
                </h3>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-2">
                    <button className="bg-[#3949AB] text-white px-3 py-1 rounded-md text-sm">
                      All
                    </button>
                    <button className="bg-[#F0F4F8] dark:bg-[#2D2D2D] text-[#3949AB] dark:text-[#7986CB] px-3 py-1 rounded-md text-sm">
                      Pending
                    </button>
                    <button className="bg-[#F0F4F8] dark:bg-[#2D2D2D] text-[#3949AB] dark:text-[#7986CB] px-3 py-1 rounded-md text-sm">
                      Completed
                    </button>
                  </div>

                  <div className="flex items-center">
                    <select className="bg-[#F0F4F8] dark:bg-[#2D2D2D] text-[#37474F] dark:text-white text-sm rounded-md px-3 py-1.5 border-0">
                      <option>All Courses</option>
                      {currentCourses.map((course, idx) => (
                        <option key={idx}>{course.code}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  {upcomingAssignments && upcomingAssignments.length > 0 ? (
                    [
                      ...upcomingAssignments,
                      // يمكن إضافة assignments مكتملة من API لو متوفرة
                    ].map((assignment, index) => (
                      <div
                        key={assignment.id || index}
                        className={`bg-[#F0F4F8] dark:bg-[#2D2D2D] p-4 rounded-lg flex justify-between items-center ${
                          assignment.status === "Completed" || assignment.status === "مكتمل"
                            ? "border-l-4 border-[#FFC107]"
                            : "border-l-4 border-[#7986CB]"
                        }`}
                      >
                        <div>
                          <div className="flex items-center mb-1">
                            <span className="text-xs bg-[#3949AB] text-white py-0.5 px-2 rounded-full mr-2">
                              {assignment.course || assignment.course_code || 'Course'}
                            </span>
                            <p className="font-medium text-[#37474F] dark:text-white">
                              {assignment.title || assignment.name || 'Assignment'}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <Clock
                              size={14}
                              className="text-[#3949AB] dark:text-[#7986CB] mr-1"
                            />
                            <span className="text-xs text-[#3949AB] dark:text-[#7986CB]">
                              {assignment.due_date || assignment.dueDate || 'TBD'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <span
                            className={`text-xs py-1 px-3 rounded-full ${
                              assignment.status === "Completed" || assignment.status === "مكتمل"
                                ? "bg-[#FFC107]/20 text-[#FFC107]"
                                : "bg-[#7986CB]/20 text-[#7986CB]"
                            }`}
                          >
                            {assignment.status || 'Pending'}
                          </span>
                          <button className="ml-4 text-[#3949AB] dark:text-[#7986CB]">
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                  <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] p-8 rounded-lg text-center">
                  <div className="text-6xl mb-4">📝</div>
                    <h4 className="text-lg font-medium text-[#37474F] dark:text-white mb-2">
                        {language === 'ar' ? 'لا توجد واجبات' : 'No Assignments'}
                        </h4>
                        <p className="text-sm text-[#3949AB] dark:text-[#7986CB]">
                          {language === 'ar' ? 'سيتم عرض جميع واجباتك هنا' : 'All your assignments will appear here'}
                        </p>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courseRegistration" className="mt-0">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <CourseRegistration />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="announcements" className="mt-0">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#37474F] dark:text-white mb-6">
                  Announcements & Notifications
                </h3>

                <div className="space-y-4">
                  {announcements && announcements.length > 0 ? (
                    announcements.map((announcement, index) => (
                      <div
                        key={announcement.id || index}
                        className={`p-4 border-l-4 rounded-r-lg ${
                          announcement.read || announcement.is_read
                            ? "border-[#7986CB] bg-[#F0F4F8]/50 dark:bg-[#2D2D2D]/50"
                            : "border-[#FFC107] bg-[#F0F4F8] dark:bg-[#2D2D2D]"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4
                              className={`font-medium ${
                                announcement.read || announcement.is_read
                                  ? "text-[#3949AB] dark:text-[#7986CB]"
                                  : "text-[#37474F] dark:text-white"
                              }`}
                            >
                              {announcement.title || announcement.subject || 'Announcement'}
                              {!(announcement.read || announcement.is_read) && (
                                <span className="ml-2 bg-[#FFC107] text-[#37474F] text-xs px-2 py-0.5 rounded-full">
                                  {language === 'ar' ? 'جديد' : 'New'}
                                </span>
                              )}
                            </h4>
                            <p className="text-xs text-[#3949AB] dark:text-[#7986CB] mt-1">
                              {announcement.date || announcement.created_at || 'N/A'}
                            </p>
                          </div>
                          <button className="text-[#3949AB] dark:text-[#7986CB]">
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                  <div className="bg-[#F0F4F8] dark:bg-[#2D2D2D] p-8 rounded-lg text-center">
                  <div className="text-6xl mb-4">📢</div>
                    <h4 className="text-lg font-medium text-[#37474F] dark:text-white mb-2">
                        {language === 'ar' ? 'لا توجد إعلانات' : 'No Announcements'}
                        </h4>
                        <p className="text-sm text-[#3949AB] dark:text-[#7986CB]">
                          {language === 'ar' ? 'سيتم عرض الإعلانات والإشعارات هنا' : 'Announcements and notifications will appear here'}
                        </p>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentProfile;
