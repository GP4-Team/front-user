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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
   * Refresh profile data (force fetch)
   */
  const refreshProfile = useCallback(() => {
    return fetchProfile(true);
  }, [fetchProfile]);

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
    setError(null);
    setLastFetched(null);
    setLoading(false);
  }, []);

  // Fetch profile data on hook mount or when authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    } else {
      clearProfile();
    }
  }, [isAuthenticated, fetchProfile, clearProfile]);

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
    if (!profileData || !profileData.data) return [];
    
    // البيانات لا تحتوي على courses حالياً، سنرجع مصفوفة فارغة
    // يمكن إضافة endpoint منفصل للكورسات لاحقاً
    return profileData.data.current_courses || 
           profileData.data.enrolled_courses || 
           profileData.data.courses || 
           [];
  }, [profileData]);

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
    if (!profileData || !profileData.data) return [];
    
    // البيانات لا تحتوي على completed courses حالياً
    return profileData.data.completed_courses || 
           profileData.data.course_history || 
           profileData.data.past_courses || 
           [];
  }, [profileData]);

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
    error,
    lastFetched,
    
    // Actions
    fetchProfile,
    refreshProfile,
    updateProfileData,
    clearProfile,
    
    // Computed states
    hasData: !!profileData,
    isEmpty: !loading && !profileData,
    hasError: !!error,
    isStale: lastFetched && (Date.now() - lastFetched > 10 * 60 * 1000) // 10 minutes
  };
};

export default useStudentProfile;
