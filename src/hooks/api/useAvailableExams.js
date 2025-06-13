// src/hooks/api/useAvailableExams.js
import { useState, useCallback } from 'react';
import AvailableExamsService from '../../services/api/availableExams.service';

/**
 * Hook للتعامل مع الامتحانات المتاحة
 * يوفر وظائف للتعامل مع endpoint /examination/available-exams
 */
export const useAvailableExams = () => {
  const [availableExams, setAvailableExams] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [registeredCoursesCount, setRegisteredCoursesCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  /**
   * جلب الامتحانات المتاحة
   * @param {Object} params - معلمات الاستعلام
   * @returns {Promise} - Promise مع البيانات
   */
  const fetchAvailableExams = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🎯 [useAvailableExams] Starting fetchAvailableExams with params:', params);
      
      const response = await AvailableExamsService.getAvailableExams(params);
      console.log('📦 [useAvailableExams] Raw response:', response);
      
      if (response.success && Array.isArray(response.data)) {
        // Transform the exam data
        const transformedExams = AvailableExamsService.transformAvailableExams(response.data);
        console.log('✅ [useAvailableExams] Transformed exams:', transformedExams);
        
        setAvailableExams(transformedExams);
        setPagination(response.pagination);
        setRegisteredCoursesCount(response.registered_courses_count || 0);
        
        return {
          exams: transformedExams,
          pagination: response.pagination,
          registeredCoursesCount: response.registered_courses_count,
          total: response.pagination?.total || transformedExams.length
        };
      } else {
        console.warn('⚠️ [useAvailableExams] Invalid response format or no data');
        setAvailableExams([]);
        setPagination(null);
        setRegisteredCoursesCount(0);
        
        if (response.error) {
          setError(response.error);
        }
        
        return { exams: [], total: 0 };
      }
      
    } catch (err) {
      console.error('❌ [useAvailableExams] fetchAvailableExams error:', err);
      
      const errorMessage = err.message || 'فشل جلب الامتحانات المتاحة';
      setError(errorMessage);
      
      // Don't crash the app, return empty data
      setAvailableExams([]);
      setPagination(null);
      setRegisteredCoursesCount(0);
      
      return { exams: [], total: 0 };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * جلب عدد محدود من الامتحانات للعرض في الصفحة الرئيسية
   * @param {number} limit - العدد المطلوب (افتراضي 6)
   * @returns {Promise} - Promise مع البيانات المحدودة
   */
  const fetchAvailableExamsForHome = useCallback(async (limit = 6) => {
    console.log(`🏠 [useAvailableExams] Fetching ${limit} exams for home page`);
    
    const result = await fetchAvailableExams({ limit });
    
    if (result.exams && result.exams.length > limit) {
      // Ensure we don't exceed the requested limit
      result.exams = result.exams.slice(0, limit);
      console.log(`✂️ [useAvailableExams] Limited to ${limit} exams for home`);
    }
    
    return result;
  }, [fetchAvailableExams]);

  /**
   * مسح الأخطاء
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // إعادة الدوال والحالات
  return {
    // البيانات
    availableExams,
    pagination,
    registeredCoursesCount,
    
    // الحالات
    loading,
    error,
    
    // الدوال
    fetchAvailableExams,
    fetchAvailableExamsForHome,
    clearError
  };
};

export default useAvailableExams;
