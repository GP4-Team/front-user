import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../components/navigation/Navbar";
import CoursesService from "../../services/api/courses.service";
import MaterialsService from "../../services/api/materials.service";
import {
  CourseVideoLesson,
  CourseImageLesson,
  CourseAudioLesson,
  CourseExamLesson,
  CourseSidebar,
  CourseBreadcrumb,
} from "../../components/courseDetail";
import { ChevronDown, ChevronUp, AlertCircle, Loader } from "lucide-react";

// Helper function to convert API material type to component type
const convertMaterialType = (apiType) => {
  const typeMap = {
    YoutubeVideo: "video",
    Audio: "audio",
    Pdf: "pdf",
    Image: "image",
    Document: "document",
  };
  return typeMap[apiType] || "document";
};

// Helper function to convert seconds to readable duration
const formatDuration = (seconds, language) => {
  if (!seconds) return language === "ar" ? "غير محدد" : "N/A";

  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return language === "ar"
      ? `${hours} ساعة ${remainingMinutes} دقيقة`
      : `${hours}h ${remainingMinutes}m`;
  }

  return language === "ar" ? `${minutes} دقيقة` : `${minutes} minutes`;
};

// Helper function to transform API materials to lesson format
const transformMaterialsToLessons = (materials, language) => {
  console.log("🔄 Transforming materials to lessons:", materials);

  return materials.map((material, index) => {
    const lesson = {
      id: `material-${material.id}`,
      type: convertMaterialType(material.type),
      title: {
        ar: material.name || `مادة ${index + 1}`,
        en: material.name || `Material ${index + 1}`,
      },
      status: index === 0 ? "current" : "unlocked", // First lesson is current, rest are unlocked
      duration: {
        ar: formatDuration(material.duration_in_seconds, "ar"),
        en: formatDuration(material.duration_in_seconds, "en"),
      },
      description: {
        ar: material.description || `وصف المادة: ${material.name}`,
        en: material.description || `Material description: ${material.name}`,
      },
      // Add all data from API
      url: material.media_url,
      videoUrl: material.media_url, // For videos
      audioUrl: material.media_url, // For audio
      imageUrl: material.media_url, // For images
      pdfUrl: material.media_url, // For PDFs
      downloadUrl: material.media_url, // For downloads
      instructor: material.user?.name || (language === 'ar' ? 'مدرس متخصص' : 'Specialized Instructor'),
      materialData: material, // Keep all original data

      // Instructor data
      instructorAvatar: material.user?.profile_image,
      instructorEmail: material.user?.email,

      // Detailed material data
      materialId: material.id,
      courseId: material.course_id,
      userId: material.user_id,
      createdAt: material.created_at,
      updatedAt: material.updated_at,

      // Additional data
      fileSize: material.file_size,
      mimeType: material.mime_type,
      pages: material.number_of_pages,

      // Course idea
      courseIdea: material.course_idea,
      courseIdeaId: material.course_idea_id,

      // Course data from nested object
      courseInfo: material.course,

      // Video settings
      maxViews: 999, // Unlimited views
      viewsRemaining: 999,

      // Material status
      isActive: true,
      isAccessible: true,
      canDownload: true,

      // Additional info for display
      originalType: material.type,
      apiData: {
        ...material,
      },
    };

    console.log(`📋 Lesson ${index + 1} transformed:`, lesson);
    return lesson;
  });
};

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const { isAuthenticated } = useAuth();

  // Translation function
  const getText = (arText, enText) => {
    return language === "ar" ? arText : enText;
  };

  // Enhanced text getter for objects
  const getTextFromObj = (obj) => {
    if (!obj) return "";
    return obj[language] || obj.en || obj.ar || "";
  };

  // State for the course data
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State for the current lesson
  const [currentLesson, setCurrentLesson] = useState(null);
  // State for the selected material details
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [materialLoading, setMaterialLoading] = useState(false);
  const [materialError, setMaterialError] = useState(null);
  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState({});

  // Function to load material details by ID
  const loadMaterialDetails = async (materialId) => {
    try {
      setMaterialLoading(true);
      setMaterialError(null);

      console.log("📎 Loading material details for ID:", materialId);

      const materialResponse = await MaterialsService.getMaterialById(
        materialId
      );

      console.log("✅ Material details received:", materialResponse);

      if (materialResponse.success && materialResponse.data) {
        setSelectedMaterial(materialResponse.data);
      } else {
        setMaterialError(getText("فشل في تحميل تفاصيل المادة", "Failed to load material details"));
      }
    } catch (err) {
      console.error("❌ Error loading material details:", err);
      setMaterialError(err.message || getText("فشل في تحميل تفاصيل المادة", "Failed to load material details"));
    } finally {
      setMaterialLoading(false);
    }
  };

  // Effect to load course data and materials from API
  useEffect(() => {
    const loadCourseData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("🔍 Loading course materials for ID:", courseId);

        // Fetch course materials from API
        const materialsResponse = await CoursesService.getCourseContent(
          courseId
        );

        console.log(
          "✅ Full API Response:",
          JSON.stringify(materialsResponse, null, 2)
        );
        console.log("📊 Response structure:", {
          success: materialsResponse.success,
          dataExists: !!materialsResponse.data,
          dataDataExists: !!(
            materialsResponse.data && materialsResponse.data.data
          ),
          materialsCount:
            materialsResponse.data && materialsResponse.data.data
              ? materialsResponse.data.data.length
              : 0,
        });

        if (
          materialsResponse.success &&
          materialsResponse.data &&
          materialsResponse.data.data
        ) {
          const materials = materialsResponse.data.data;
          const pagination = materialsResponse.data;

          // Get course info from first material (they all have the same course info)
          const courseInfo = materials[0]?.course;

          // Transform materials to lessons
          const lessons = transformMaterialsToLessons(materials, language);

          console.log("📚 All transformed lessons:", lessons);

          // Create sections - only main section with all materials
          const sections = [];

          // Main section with all materials
          sections.push({
            id: "all-materials",
            title: {
              ar: "جميع المواد التعليمية",
              en: "All Course Materials",
            },
            lessonsCount: lessons.length,
            completed: 0,
            expanded: true,
            lessons: lessons,
          });

          // Create course data structure
          const courseData = {
            id: courseId,
            title: {
              ar: courseInfo?.name || "معسكر تجريبي لمنصة اديورا",
              en: courseInfo?.name || "Experimental Camp for Eduara",
            },
            progress: 15,
            courseData: {
              id: courseId,
              name: courseInfo?.name || getText("معسكر تجريبي", "Experimental Camp"),
              code: courseInfo?.code || "COURSE-001",
              color: courseInfo?.color || "#4285F4",
              image: courseInfo?.image || "/api/placeholder/800/400",
              description:
                courseInfo?.description ||
                getText(
                  `مواد تعليمية شاملة في ${courseInfo?.name || "المادة"}`,
                  `Comprehensive educational materials in ${courseInfo?.name || "the subject"}`
                ),
              instructor_name: materials[0]?.user?.name || getText("مدرس متخصص", "Specialized Instructor"),
              instructor_avatar: materials[0]?.user?.profile_image,
              materials_count: materials.length,
              stats: {
                totalLessons: materials.length,
                totalQuizzes: 0,
                totalProjects: 0,
                estimatedHours: Math.ceil(
                  materials.reduce(
                    (total, m) => total + (m.duration_in_seconds || 0),
                    0
                  ) / 3600
                ),
              },
              // Add complete course info
              ...courseInfo,
            },
            sections: sections,
            // Add raw data for debugging
            rawMaterials: materials,
            apiResponse: materialsResponse,
          };

          setCourse(courseData);

          // Set initial expanded sections - expand the main section
          const initialExpanded = { "all-materials": true };
          setExpandedSections(initialExpanded);

          // Set the first lesson as current
          if (lessons.length > 0) {
            setCurrentLesson(lessons[0]);
            console.log("🎯 Set current lesson:", lessons[0]);

            // Load details for the first lesson
            const firstMaterialId =
              lessons[0].materialId ||
              lessons[0].materialData?.id ||
              lessons[0].id?.replace("material-", "");
            if (firstMaterialId) {
              console.log(
                "🎥 Loading details for first lesson with ID:",
                firstMaterialId
              );
              await loadMaterialDetails(firstMaterialId);
            }
          }
        } else {
          // If no materials found, show empty course
          const emptyFallback = {
            id: courseId,
            title: {
              ar: "لا توجد مواد",
              en: "No Materials Found",
            },
            progress: 0,
            courseData: {
              id: courseId,
              name: getText("لا توجد مواد", "No Materials"),
              materials_count: 0,
              stats: {
                totalLessons: 0,
                totalQuizzes: 0,
                totalProjects: 0,
                estimatedHours: 0,
              },
            },
            sections: [],
          };
          setCourse(emptyFallback);
        }
      } catch (err) {
        console.error("❌ Error loading course materials:", err);
        setError(err.message || getText("فشل في تحميل مواد الكورس", "Failed to load course materials"));
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      loadCourseData();
    }
  }, [courseId, language]); // Add language dependency to reload when language changes

  // Function to toggle a section
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Function to select a lesson
  const selectLesson = async (lesson) => {
    console.log("🎯 Selecting lesson:", lesson);

    setCurrentLesson(lesson);

    // Extract material ID from lesson
    const materialId =
      lesson.materialId ||
      lesson.materialData?.id ||
      lesson.id?.replace("material-", "");

    console.log("🔢 Extracted material ID:", materialId);

    if (materialId) {
      await loadMaterialDetails(materialId);
    } else {
      console.warn("⚠️ No material ID found for lesson:", lesson);
      setSelectedMaterial(null);
    }
  };

  // If course data is not loaded yet or there's an error
  if (loading) {
    return (
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" />
            <p className="text-lg">
              {getText("جاري تحميل تفاصيل الكورس...", "Loading course details...")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-2">
              {getText("خطأ في تحميل الكورس", "Error Loading Course")}
            </h2>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              {getText("إعادة المحاولة", "Try Again")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium">
              {getText("الكورس غير موجود", "Course Not Found")}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Content - Remove padding from top */}
      <div>
        {/* Progress bar */}
        <div className="relative h-1 bg-gray-200 dark:bg-gray-700">
          <div
            className="absolute left-0 h-1 bg-blue-500"
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>

        {/* Page header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-16 z-10">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              {/* Course title and breadcrumb */}
              <div>
                {/* Breadcrumb */}
                <CourseBreadcrumb
                  course={course}
                  currentLesson={currentLesson}
                />

                {/* Course title */}
                <h1 className="text-xl font-bold mt-1">
                  {getTextFromObj(course.title)}
                </h1>
              </div>

              {/* Language & Detail toggle */}
              <div className="flex items-center">
                <div className="flex space-x-2 rtl:space-x-reverse border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                  <Link
                    to="/courses"
                    className="px-3 py-1 text-sm flex items-center hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {isRTL ? (
                      <ChevronDown size={14} className="ml-1" />
                    ) : (
                      <ChevronDown size={14} className="mr-1" />
                    )}
                    {getText("التفاصيل", "Details")}
                  </Link>
                  <Link
                    to="#"
                    className="px-3 py-1 text-sm flex items-center bg-gray-100 dark:bg-gray-700"
                  >
                    {isRTL ? (
                      <ChevronDown size={14} className="ml-1" />
                    ) : (
                      <ChevronDown size={14} className="mr-1" />
                    )}
                    {getText("محاضرات", "Lectures")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-1/4 xl:w-1/5">
              <CourseSidebar
                course={course}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                currentLesson={currentLesson}
                selectLesson={selectLesson}
              />
            </div>

            {/* Main content */}
            <div className="lg:w-3/4 xl:w-4/5 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              {materialLoading ? (
                // Material loading state
                <div className="p-8 text-center">
                  <div className="flex flex-col items-center justify-center py-16">
                    <Loader className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <p className="text-lg">
                      {getText("جاري تحميل المادة...", "Loading material...")}
                    </p>
                  </div>
                </div>
              ) : materialError ? (
                // Material error state
                <div className="p-8 text-center">
                  <div className="flex flex-col items-center justify-center py-16">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-medium text-red-600 mb-2">
                      {getText("خطأ في تحميل المادة", "Error Loading Material")}
                    </h2>
                    <p className="text-gray-500 mb-4">{materialError}</p>
                    <button
                      onClick={() =>
                        currentLesson && selectLesson(currentLesson)
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      {getText("إعادة المحاولة", "Try Again")}
                    </button>
                  </div>
                </div>
              ) : currentLesson ? (
                <>
                  {/* Render the appropriate lesson component based on the lesson type */}
                  {currentLesson.type === "video" && (
                    <CourseVideoLesson
                      lesson={currentLesson}
                      materialDetails={selectedMaterial}
                    />
                  )}

                  {currentLesson.type === "pdf" && (
                    <CourseImageLesson
                      lesson={currentLesson}
                      materialDetails={selectedMaterial}
                    />
                  )}

                  {currentLesson.type === "document" && (
                    <CourseImageLesson
                      lesson={currentLesson}
                      materialDetails={selectedMaterial}
                    />
                  )}

                  {currentLesson.type === "image" && (
                    <CourseImageLesson
                      lesson={currentLesson}
                      materialDetails={selectedMaterial}
                    />
                  )}

                  {currentLesson.type === "audio" && (
                    <CourseAudioLesson
                      lesson={currentLesson}
                      materialDetails={selectedMaterial}
                    />
                  )}

                  {currentLesson.type === "exam" && (
                    <CourseExamLesson
                      lesson={currentLesson}
                      materialDetails={selectedMaterial}
                    />
                  )}
                </>
              ) : (
                // No lesson selected
                <div className="p-8 text-center">
                  <div className="flex flex-col items-center justify-center py-16">
                    <AlertCircle
                      size={48}
                      className="text-gray-400 dark:text-gray-600 mb-4"
                    />
                    <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400">
                      {getText("لم يتم اختيار أي درس", "No lesson selected")}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-500 mt-2 max-w-md">
                      {getText(
                        "الرجاء اختيار درس من القائمة الجانبية للبدء في التعلم.",
                        "Please select a lesson from the sidebar to start learning."
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
