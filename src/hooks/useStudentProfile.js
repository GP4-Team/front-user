// src/hooks/useStudentProfile.js
import { useState, useEffect, useCallback } from 'react';
import userService from '../services/api/user.service';
import { useAuth } from '../contexts/AuthContext';

/**
 * Custom hook for managing student profile data
 * Handles fetching, caching, and updating student profile information
 * 
 * @returns {Object} Profile data and management functions
 */
const useStudentProfile = () => {
  // State management
  const [profileData, setProfileData] = useState(null);
  const [registeredCourses, setRegisteredCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coursesError, setCoursesError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);
  
  // Get auth context for user authentication state
  const { isAuthenticated, user } = useAuth();

  /**
   * Fetch student profile data from API
   * @param {boolean} forceRefresh - Force refresh even if data exists
   */
  const fetchProfile = useCallback(async (forceRefresh = false) => {
    // Don't fetch if user is not authenticated
    if (!isAuthenticated) {
      setLoading(false);
      setError('User not authenticated');
      return;
    }

    // Don't fetch if we have recent data and not forcing refresh
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    if (!forceRefresh && profileData && lastFetched && lastFetched > fiveMinutesAgo) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Fetching student profile data...');
      
      // Call the API service
      const data = await userService.getStudentProfile();
      
      console.log('✅ Student profile data received:', data);
      
      // Update state
      setProfileData(data);
      setLastFetched(Date.now());
      setError(null);
      
    } catch (err) {
      console.error('❌ Error fetching student profile:', err);
      
      // Set user-friendly error message
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Failed to load profile data';
      
      setError(errorMessage);
      setProfileData(null);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, profileData, lastFetched]);

  /**
   * Fetch student registered courses from API
   * @param {boolean} forceRefresh - Force refresh even if data exists
   */
  const fetchRegisteredCourses = useCallback(async (forceRefresh = false) => {
    // Don't fetch if user is not authenticated
    if (!isAuthenticated) {
      setCoursesLoading(false);
      setCoursesError('User not authenticated');
      return;
    }

    // Don't fetch if we have recent data and not forcing refresh
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    if (!forceRefresh && registeredCourses && lastFetched && lastFetched > fiveMinutesAgo) {
      setCoursesLoading(false);
      return;
    }

    try {
      setCoursesLoading(true);
      setCoursesError(null);
      
      console.log('📚 Fetching student registered courses...');
      
      // Call the new API service
      const data = await userService.getStudentRegisteredCourses();
      
      console.log('✅ Student registered courses data received:', data);
      
      // Update state
      setRegisteredCourses(data);
      setCoursesError(null);
      
    } catch (err) {
      console.error('❌ Error fetching student registered courses:', err);
      
      // Set user-friendly error message
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Failed to load registered courses data';
      
      setCoursesError(errorMessage);
      setRegisteredCourses(null);
    } finally {
      setCoursesLoading(false);
    }
  }, [isAuthenticated, registeredCourses, lastFetched]);
  /**
   * Refresh profile data (force fetch)
   */
  const refreshProfile = useCallback(() => {
    return fetchProfile(true);
  }, [fetchProfile]);

  /**
   * Refresh registered courses data (force fetch)
   */
  const refreshRegisteredCourses = useCallback(() => {
    return fetchRegisteredCourses(true);
  }, [fetchRegisteredCourses]);

  /**
   * Update profile data optimistically
   * @param {Object} updates - Partial profile data updates
   */
  const updateProfileData = useCallback((updates) => {
    setProfileData(prevData => {
      if (!prevData) return prevData;
      
      return {
        ...prevData,
        ...updates
      };
    });
  }, []);

  /**
   * Clear profile data (useful for logout)
   */
  const clearProfile = useCallback(() => {
    setProfileData(null);
    setRegisteredCourses(null);
    setError(null);
    setCoursesError(null);
    setLastFetched(null);
    setLoading(false);
    setCoursesLoading(false);
  }, []);

  // Fetch profile data on hook mount or when authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
      fetchRegisteredCourses(); // جلب المقررات المسجلة أيضاً
    } else {
      clearProfile();
    }
  }, [isAuthenticated, fetchProfile, fetchRegisteredCourses, clearProfile]);

  // Helper functions to extract specific data from profile
  const getBasicInfo = useCallback(() => {
    if (!profileData || !profileData.data) return null;
    
    const personalInfo = profileData.data.personal_info || {};
    
    return {
      id: personalInfo.student_id || 'N/A',
      name: personalInfo.name || 'Unknown',
      email: personalInfo.email || 'N/A',
      phone: personalInfo.phone || 'N/A',
      address: personalInfo.address || 'N/A',
      avatar: personalInfo.avatar || null,
      program: personalInfo.program || 'N/A',
      concentration: personalInfo.concentration || 'N/A',
      department: personalInfo.program || personalInfo.concentration || 'N/A',
      gpa: profileData.data.academic_progress?.current_gpa || 'N/A',
      status: 'Active' // Default status
    };
  }, [profileData]);

  const getAcademicInfo = useCallback(() => {
    if (!profileData || !profileData.data) return null;
    
    const academicProgress = profileData.data.academic_progress || {};
    const dates = profileData.data.dates || {};
    
    return {
      currentYear: academicProgress.year_level || 'N/A',
      level: academicProgress.year_level || 'N/A',
      totalCredits: academicProgress.completed_hours || 0,
      completedCredits: academicProgress.completed_hours || 0,
      requiredCredits: (academicProgress.completed_hours || 0) + (academicProgress.remaining_hours || 0),
      remainingCredits: academicProgress.remaining_hours || 0,
      currentSemester: 'Current Semester',
      enrollmentDate: dates.registration_date || null,
      expectedGraduation: dates.expected_graduation || null,
      advisorName: profileData.data.academic_advisor || 'N/A'
    };
  }, [profileData]);

  const getCurrentCourses = useCallback(() => {
    // استخدام البيانات من الـ API الجديد إذا كانت متوفرة
    if (registeredCourses && registeredCourses.data) {
      // تحويل البيانات لتطابق الشكل المطلوب في الواجهة
      return registeredCourses.data.map(course => ({
        id: course.id,
        code: course.course_code || course.code,
        name: course.course_name || course.name,
        course_name: course.course_name || course.name,
        course_code: course.course_code || course.code,
        credits: course.credits || course.credit_hours || 3,
        credit_hours: course.credits || course.credit_hours || 3,
        semester: course.semester || course.term || 'Current',
        term: course.semester || course.term || 'Current',
        instructor: course.instructor || course.instructor_name || 'N/A',
        instructor_name: course.instructor || course.instructor_name || 'N/A',
        // إضافة البيانات الأصلية
        ...course
      }));
    }
    
    // fallback للبيانات القديمة
    if (!profileData || !profileData.data) return [];
    
    return profileData.data.current_courses || 
           profileData.data.enrolled_courses || 
           profileData.data.courses || 
           [];
  }, [profileData, registeredCourses]);

  const getExamHistory = useCallback(() => {
    if (!profileData || !profileData.data) return [];
    
    // البيانات لا تحتوي على exam history حالياً
    return profileData.data.exam_history || 
           profileData.data.exams || 
           profileData.data.past_exams || 
           [];
  }, [profileData]);

  const getUpcomingExams = useCallback(() => {
    if (!profileData || !profileData.data) return [];
    
    // البيانات لا تحتوي على upcoming exams حالياً
    return profileData.data.upcoming_exams || 
           profileData.data.scheduled_exams || 
           [];
  }, [profileData]);

  const getUpcomingAssignments = useCallback(() => {
    if (!profileData || !profileData.data) return [];
    
    // البيانات لا تحتوي على assignments حالياً
    return profileData.data.upcoming_assignments || 
           profileData.data.assignments || 
           profileData.data.homework || 
           [];
  }, [profileData]);

  const getCompletedCourses = useCallback(() => {
    // استخدام البيانات من الـ API الجديد إذا كانت متوفرة
    if (registeredCourses && registeredCourses.data) {
      // تحويل البيانات لتطابق الشكل المطلوب في الواجهة
      return registeredCourses.data.map(course => ({
        id: course.id,
        code: course.course_code || course.code,
        name: course.course_name || course.name,
        course_name: course.course_name || course.name,
        course_code: course.course_code || course.code,
        credits: course.credits || course.credit_hours || 3,
        credit_hours: course.credits || course.credit_hours || 3,
        grade: course.grade || 'N/A',
        semester: course.semester || course.term || 'Current',
        term: course.semester || course.term || 'Current',
        instructor: course.instructor || course.instructor_name || 'N/A',
        instructor_name: course.instructor || course.instructor_name || 'N/A',
        // إضافة البيانات الأصلية
        ...course
      }));
    }
    
    // fallback للبيانات القديمة
    if (!profileData || !profileData.data) return [];
    
    return profileData.data.completed_courses || 
           profileData.data.course_history || 
           profileData.data.past_courses || 
           [];
  }, [profileData, registeredCourses]);

  const getAnnouncements = useCallback(() => {
    if (!profileData || !profileData.data) return [];
    
    // البيانات لا تحتوي على announcements حالياً
    return profileData.data.announcements || 
           profileData.data.notifications || 
           profileData.data.news || 
           [];
  }, [profileData]);

  // Return the hook interface
  return {
    // Data
    profileData,
    registeredCourses,
    basicInfo: getBasicInfo(),
    academicInfo: getAcademicInfo(),
    currentCourses: getCurrentCourses(),
    examHistory: getExamHistory(),
    upcomingExams: getUpcomingExams(),
    upcomingAssignments: getUpcomingAssignments(),
    completedCourses: getCompletedCourses(),
    announcements: getAnnouncements(),
    
    // States
    loading,
    coursesLoading,
    error,
    coursesError,
    lastFetched,
    
    // Actions
    fetchProfile,
    fetchRegisteredCourses,
    refreshProfile,
    refreshRegisteredCourses,
    updateProfileData,
    clearProfile,
    
    // Computed states
    hasData: !!profileData,
    hasCoursesData: !!registeredCourses,
    isEmpty: !loading && !profileData,
    hasError: !!error,
    hasCoursesError: !!coursesError,
    isStale: lastFetched && (Date.now() - lastFetched > 10 * 60 * 1000) // 10 minutes
  };
};

export default useStudentProfile;
