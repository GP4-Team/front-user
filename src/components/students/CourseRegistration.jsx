// src/components/students/CourseRegistration.jsx
import React, { useState, useEffect } from 'react';
import { 
  Check, 
  X, 
  BookOpen, 
  Clock, 
  User, 
  Users, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Loader,
  RefreshCw,
  LogIn
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import ProtectedComponent from '../auth/ProtectedComponent';
import courseRegistrationService from '../../services/courseRegistrationService';

const CourseRegistration = () => {
  const { language } = useLanguage();

  // Translations
  const texts = {
    unauthorized: {
      ar: 'يجب تسجيل الدخول أولاً للوصول إلى تسجيل الكورسات',
      en: 'Please login first to access course registration'
    }
  };

  const getText = (key) => texts[key]?.[language] || texts[key]?.en || key;

  return (
    <ProtectedComponent 
      requireAuth={true}
      message={getText('unauthorized')}
      showLoginButton={true}
    >
      <CourseRegistrationContent />
    </ProtectedComponent>
  );
};

// Separate the main content into its own component
const CourseRegistrationContent = () => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const { isAuthenticated, user } = useAuth();
  
  // State management
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [currentSemester, setCurrentSemester] = useState({ id: 5, name: 'Current Semester' });

  const isArabic = language === 'ar';

  // Translations
  const texts = {
    title: {
      ar: 'تسجيل الكورسات',
      en: 'Course Registration'
    },
    subtitle: {
      ar: 'اختر الكورسات التي تريد التسجيل فيها',
      en: 'Select courses you want to register for'
    },
    selectCourse: {
      ar: 'اختيار',
      en: 'Select'
    },
    selected: {
      ar: 'محدد',
      en: 'Selected'
    },
    registerSelected: {
      ar: 'تسجيل الكورسات المحددة',
      en: 'Register Selected Courses'
    },
    noCoursesSelected: {
      ar: 'لم يتم اختيار أي كورسات',
      en: 'No courses selected'
    },
    instructor: {
      ar: 'المدرس',
      en: 'Instructor'
    },
    credits: {
      ar: 'الساعات',
      en: 'Credits'
    },
    schedule: {
      ar: 'المواعيد',
      en: 'Schedule'
    },
    capacity: {
      ar: 'السعة',
      en: 'Capacity'
    },
    enrolled: {
      ar: 'المسجلين',
      en: 'Enrolled'
    },
    available: {
      ar: 'متاح',
      en: 'Available'
    },
    full: {
      ar: 'مكتمل',
      en: 'Full'
    },
    loading: {
      ar: 'جاري التحميل...',
      en: 'Loading...'
    },
    registering: {
      ar: 'جاري التسجيل...',
      en: 'Registering...'
    },
    retry: {
      ar: 'إعادة المحاولة',
      en: 'Retry'
    },
    refresh: {
      ar: 'تحديث',
      en: 'Refresh'
    },
    registrationSuccess: {
      ar: 'تم تسجيل الكورسات بنجاح!',
      en: 'Courses registered successfully!'
    },
    registrationError: {
      ar: 'حدث خطأ أثناء التسجيل',
      en: 'Error occurred during registration'
    },
    noCourses: {
      ar: 'لا توجد كورسات متاحة للتسجيل',
      en: 'No courses available for registration'
    },
    courseCode: {
      ar: 'كود الكورس',
      en: 'Course Code'
    },
    courseName: {
      ar: 'اسم الكورس',
      en: 'Course Name'
    }
  };

  const getText = (key) => texts[key]?.[language] || texts[key]?.en || key;

  // Fetch available courses
  const fetchAvailableCourses = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await courseRegistrationService.getAvailableCourses();
      
      if (response.success) {
        setAvailableCourses(response.data || []);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError('Failed to fetch available courses');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle course selection
  const toggleCourseSelection = (course) => {
    setSelectedCourses(prev => {
      const isSelected = prev.find(c => c.id === course.id);
      if (isSelected) {
        return prev.filter(c => c.id !== course.id);
      } else {
        return [...prev, course];
      }
    });
  };

  // Handle course registration
  const handleRegisterCourses = async () => {
    if (selectedCourses.length === 0) {
      setError(getText('noCoursesSelected'));
      return;
    }

    setRegistering(true);
    setError(null);
    setSuccess(null);

    try {
      const courseIds = selectedCourses.map(course => course.id);
      const response = await courseRegistrationService.registerCourses(courseIds, currentSemester.id);

      if (response.success) {
        setSuccess(response.message || getText('registrationSuccess'));
        setSelectedCourses([]);
        // Refresh available courses
        fetchAvailableCourses();
      } else {
        setError(response.error || getText('registrationError'));
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setRegistering(false);
    }
  };

  // Check if course is available for registration
  const isCourseAvailable = (course) => {
    const enrolled = course.enrolled_students || course.current_enrollment || 0;
    const capacity = course.max_students || course.capacity || 0;
    return capacity === 0 || enrolled < capacity;
  };

  // Get course status
  const getCourseStatus = (course) => {
    if (isCourseAvailable(course)) {
      return {
        text: getText('available'),
        className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      };
    } else {
      return {
        text: getText('full'),
        className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      };
    }
  };

  // Initialize component
  useEffect(() => {
    fetchAvailableCourses();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="animate-spin h-8 w-8 text-blue-600 mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          {getText('loading')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {getText('title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {getText('subtitle')}
          </p>
        </div>
        <button
          onClick={fetchAvailableCourses}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          {getText('refresh')}
        </button>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
          <span className="text-red-800 dark:text-red-400">{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          <span className="text-green-800 dark:text-green-400">{success}</span>
        </div>
      )}

      {/* Selected Courses Summary */}
      {selectedCourses.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-400 mb-2">
            {getText('selected')} ({selectedCourses.length})
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedCourses.map(course => (
              <span
                key={course.id}
                className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm"
              >
                {course.code || course.course_code}
                <button
                  onClick={() => toggleCourseSelection(course)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <button
            onClick={handleRegisterCourses}
            disabled={registering}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {registering ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            {registering ? getText('registering') : getText('registerSelected')}
          </button>
        </div>
      )}

      {/* Available Courses */}
      {availableCourses.length > 0 ? (
        <div className="grid gap-4">
          {availableCourses.map((course) => {
            const isSelected = selectedCourses.find(c => c.id === course.id);
            const courseAvailable = isCourseAvailable(course);
            const status = getCourseStatus(course);

            return (
              <div
                key={course.id}
                className={`border rounded-lg p-4 transition-all duration-200 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                } ${!courseAvailable ? 'opacity-60' : ''}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {course.name || course.course_name || course.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {course.code || course.course_code} • {course.credits || course.credit_hours || 3} {getText('credits')}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${status.className}`}>
                        {status.text}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      {course.instructor && (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {course.instructor}
                          </span>
                        </div>
                      )}

                      {(course.schedule || course.time) && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {course.schedule || course.time}
                          </span>
                        </div>
                      )}

                      {course.max_students && (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {course.enrolled_students || 0}/{course.max_students}
                          </span>
                        </div>
                      )}
                    </div>

                    {course.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {course.description}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => toggleCourseSelection(course)}
                    disabled={!courseAvailable}
                    className={`ml-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : courseAvailable
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isSelected ? (
                      <div className="flex items-center gap-1">
                        <Check className="h-4 w-4" />
                        {getText('selected')}
                      </div>
                    ) : (
                      getText('selectCourse')
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {getText('noCourses')}
          </h3>
          <button
            onClick={fetchAvailableCourses}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {getText('retry')}
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseRegistration;