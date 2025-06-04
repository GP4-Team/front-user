// src/hooks/useCourses.js
import { useState, useEffect, useCallback } from 'react';
import { coursesService } from '../services/api';

/**
 * Custom hook for managing courses data and operations
 * @param {Object} options - Hook configuration options
 * @returns {Object} Courses state and operations
 */
export const useCourses = (options = {}) => {
  const { autoFetch = false, filters = {} } = options;
  
  const [courses, setCourses] = useState([]);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all courses
  const fetchCourses = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await coursesService.getAllCourses({ ...filters, ...params });
      setCourses(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch featured courses
  const fetchFeaturedCourses = useCallback(async (limit = 6) => {
    setLoading(true);
    setError(null);
    try {
      const data = await coursesService.getFeaturedCourses(limit);
      setFeaturedCourses(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const data = await coursesService.getCategories();
      setCategories(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Fetch education levels
  const fetchEducationLevels = useCallback(async () => {
    try {
      const data = await coursesService.getEducationLevels();
      setEducationLevels(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Search courses
  const searchCourses = useCallback(async (query, searchFilters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await coursesService.searchCourses(query, searchFilters);
      setCourses(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter courses
  const filterCourses = useCallback(async (filterParams = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await coursesService.filterCourses(filterParams);
      setCourses(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get courses by level
  const getCoursesByLevel = useCallback(async (levelId, params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await coursesService.getCoursesByLevel(levelId, params);
      setCourses(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Enroll in course
  const enrollInCourse = useCallback(async (courseId) => {
    try {
      const result = await coursesService.enrollCourse(courseId);
      // Update courses list to reflect enrollment
      await fetchCourses();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [fetchCourses]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch) {
      Promise.all([
        fetchFeaturedCourses(),
        fetchCategories(),
        fetchEducationLevels()
      ]).catch(console.error);
    }
  }, [autoFetch, fetchFeaturedCourses, fetchCategories, fetchEducationLevels]);

  return {
    // State
    courses,
    featuredCourses,
    categories,
    educationLevels,
    loading,
    error,
    
    // Actions
    fetchCourses,
    fetchFeaturedCourses,
    fetchCategories,
    fetchEducationLevels,
    searchCourses,
    filterCourses,
    getCoursesByLevel,
    enrollInCourse,
    
    // Utilities
    clearError: () => setError(null),
    refresh: fetchCourses
  };
};

/**
 * Hook for managing single course data
 * @param {string|number} courseId - Course ID
 * @returns {Object} Course state and operations
 */
export const useCourse = (courseId) => {
  const [course, setCourse] = useState(null);
  const [courseContent, setCourseContent] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch course details
  const fetchCourse = useCallback(async () => {
    if (!courseId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await coursesService.getCourseById(courseId);
      setCourse(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  // Fetch course content
  const fetchCourseContent = useCallback(async () => {
    if (!courseId) return;
    
    try {
      const data = await coursesService.getCourseContent(courseId);
      setCourseContent(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [courseId]);

  // Fetch course progress
  const fetchProgress = useCallback(async () => {
    if (!courseId) return;
    
    try {
      const data = await coursesService.getCourseProgress(courseId);
      setProgress(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [courseId]);

  // Enroll in course
  const enroll = useCallback(async () => {
    if (!courseId) return;
    
    try {
      const result = await coursesService.enrollCourse(courseId);
      // Refresh course data after enrollment
      await fetchCourse();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [courseId, fetchCourse]);

  // Rate course
  const rateCourse = useCallback(async (rating, review = '') => {
    if (!courseId) return;
    
    try {
      const result = await coursesService.rateCourse(courseId, rating, review);
      // Refresh course data after rating
      await fetchCourse();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [courseId, fetchCourse]);

  // Auto-fetch course details when courseId changes
  useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
  }, [courseId, fetchCourse]);

  return {
    // State
    course,
    courseContent,
    progress,
    loading,
    error,
    
    // Actions
    fetchCourse,
    fetchCourseContent,
    fetchProgress,
    enroll,
    rateCourse,
    
    // Utilities
    clearError: () => setError(null),
    refresh: fetchCourse
  };
};
