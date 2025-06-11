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
  const [currentSemester, setCurrentSemester] = useState({ id: 1, name: 'Current Semester' });
  const [showEducationLevelSelector, setShowEducationLevelSelector] = useState(false);
  const [availableEducationLevels, setAvailableEducationLevels] = useState([]);

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
    semesterInfo: {
      ar: 'الفصل الدراسي الحالي',
      en: 'Current Semester'
    },
    confirmRegistration: {
      ar: 'هل أنت متأكد من تسجيل هذه المواد؟',
      en: 'Are you sure you want to register for these courses?'
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
      
      console.log('🎯 === REGISTRATION REQUEST DEBUG ===');
      console.log('Selected courses:', selectedCourses);
      console.log('Course IDs:', courseIds);
      console.log('Current semester:', currentSemester);
      console.log('Request data will be:', { course_ids: courseIds, semester_id: currentSemester.id });
      console.log('===================================');
      
      const response = await courseRegistrationService.registerCourses(courseIds, currentSemester.id);

      if (response.success) {
        const successMessage = response.message || getText('registrationSuccess');
        setSuccess(`${successMessage} - ${selectedCourses.length} ${language === 'ar' ? 'مادة مسجلة' : 'courses registered'}`);
        setSelectedCourses([]);
        // Refresh available courses after successful registration
        setTimeout(() => {
          fetchAvailableCourses();
        }, 1000);
      } else {
        console.log('🚨 === REGISTRATION FAILED ===');
        console.log('Response:', response);
        console.log('Error message:', response.error);
        console.log('🔍 VALIDATION ERRORS DETAILS:');
        console.log('Validation errors (JSON):', JSON.stringify(response.validation_errors, null, 2));
        console.log('Full details (JSON):', JSON.stringify(response.details, null, 2));
        console.log('==============================');
        
        // Check if the error is about education level
        if (response.error && response.error.includes('education level')) {
          setError('لا يمكن تسجيل المواد بدون تحديد المرحلة التعليمية. ارجع إلى البروفايل لتحديث بياناتك.');
        } else {
          setError(response.error || getText('registrationError'));
        }
      }
    } catch (err) {
      setError(language === 'ar' ? 'فشل التسجيل. حاول مرة أخرى.' : 'Registration failed. Please try again.');
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
          <div className="flex items-center gap-2 mt-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-600 dark:text-blue-400">
              {getText('semesterInfo')} - {currentSemester.name}
            </span>
          </div>
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
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-blue-900 dark:text-blue-400">
              {getText('selected')} ({selectedCourses.length})
            </h3>
            <div className="text-sm text-blue-700 dark:text-blue-300">
              {language === 'ar' ? 'إجمالي الساعات:' : 'Total Credits:'} {' '}
              <span className="font-bold">
                {selectedCourses.reduce((total, course) => 
                  total + (course.credits || course.credit_hours || 3), 0
                )}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedCourses.map(course => (
              <span
                key={course.id}
                className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
              >
                <span className="font-medium">{course.code || course.course_code}</span>
                <span className="text-xs opacity-75">({course.credits || course.credit_hours || 3}h)</span>
                <button
                  onClick={() => toggleCourseSelection(course)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <button
            onClick={() => {
              if (window.confirm(getText('confirmRegistration'))) {
                handleRegisterCourses();
              }
            }}
            disabled={registering || selectedCourses.length === 0}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
          >
            {registering ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                <span>{getText('registering')}</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5" />
                <span>{getText('registerSelected')}</span>
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs ml-2">
                  {selectedCourses.length}
                </span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Available Courses Table */}
      {availableCourses.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCourses(availableCourses.filter(isCourseAvailable));
                        } else {
                          setSelectedCourses([]);
                        }
                      }}
                      checked={selectedCourses.length === availableCourses.filter(isCourseAvailable).length && availableCourses.filter(isCourseAvailable).length > 0}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {getText('courseCode')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {getText('courseName')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {getText('instructor')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {getText('credits')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {getText('schedule')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {getText('capacity')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {availableCourses.map((course) => {
                  const isSelected = selectedCourses.find(c => c.id === course.id);
                  const courseAvailable = isCourseAvailable(course);
                  const status = getCourseStatus(course);

                  return (
                    <tr 
                      key={course.id}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                        isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      } ${!courseAvailable ? 'opacity-60' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          checked={!!isSelected}
                          disabled={!courseAvailable}
                          onChange={() => toggleCourseSelection(course)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {course.code || course.course_code || 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {course.name || course.course_name || course.title || 'N/A'}
                          </div>
                          {course.description && (
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {course.description.length > 80 
                                ? `${course.description.substring(0, 80)}...` 
                                : course.description}
                            </div>
                          )}
                          {/* Additional course info */}
                          {(course.department || course.category) && (
                            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1 flex items-center gap-2">
                              <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                                {course.department || course.category}
                              </span>
                              {course.level && (
                                <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                                  {course.level}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {course.instructor || course.instructor_name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {course.credits || course.credit_hours || 3}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {course.schedule || course.time || 
                          (course.days && course.time_slot ? `${course.days} ${course.time_slot}` : 'TBD')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {course.enrolled_students || course.current_enrollment || 0}/
                            {course.max_students || course.capacity || '∞'}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${status.className}`}>
                            {status.text}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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