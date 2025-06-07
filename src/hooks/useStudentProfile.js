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
    if (!profileData) return null;
    
    return {
      id: profileData.id || profileData.student_id || 'N/A',
      name: profileData.name || profileData.full_name || 'Unknown',
      email: profileData.email || 'N/A',
      phone: profileData.phone || profileData.phone_number || 'N/A',
      avatar: profileData.avatar || profileData.photo || profileData.profile_picture || null,
      department: profileData.department || profileData.department_name || 'N/A',
      level: profileData.level || profileData.academic_level || 'N/A',
      gpa: profileData.gpa || profileData.grade_point_average || 0,
      status: profileData.status || profileData.academic_status || 'Active'
    };
  }, [profileData]);

  const getAcademicInfo = useCallback(() => {
    if (!profileData) return null;
    
    return {
      totalCredits: profileData.total_credits || profileData.completed_credits || 0,
      requiredCredits: profileData.required_credits || profileData.total_required_credits || 120,
      currentSemester: profileData.current_semester || 'N/A',
      enrollmentDate: profileData.enrollment_date || profileData.joined_at || null,
      expectedGraduation: profileData.expected_graduation || null
    };
  }, [profileData]);

  const getCurrentCourses = useCallback(() => {
    if (!profileData) return [];
    
    return profileData.current_courses || 
           profileData.enrolled_courses || 
           profileData.courses || 
           [];
  }, [profileData]);

  const getExamHistory = useCallback(() => {
    if (!profileData) return [];
    
    return profileData.exam_history || 
           profileData.exams || 
           profileData.past_exams || 
           [];
  }, [profileData]);

  const getUpcomingExams = useCallback(() => {
    if (!profileData) return [];
    
    return profileData.upcoming_exams || 
           profileData.scheduled_exams || 
           [];
  }, [profileData]);

  const getUpcomingAssignments = useCallback(() => {
    if (!profileData) return [];
    
    return profileData.upcoming_assignments || 
           profileData.assignments || 
           profileData.homework || 
           [];
  }, [profileData]);

  const getCompletedCourses = useCallback(() => {
    if (!profileData) return [];
    
    return profileData.completed_courses || 
           profileData.course_history || 
           profileData.past_courses || 
           [];
  }, [profileData]);

  const getAnnouncements = useCallback(() => {
    if (!profileData) return [];
    
    return profileData.announcements || 
           profileData.notifications || 
           profileData.news || 
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
