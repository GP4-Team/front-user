// src/hooks/api/useRealExamination.js
import { useState, useCallback } from 'react';
import api from '../../services/api';

/**
 * Hook للتعامل مع APIs الامتحانات الحقيقية الجديدة
 * يدعم الإحصائيات والامتحانات المتاحة والمكتملة
 */
export const useRealExamination = () => {
  // Main loading state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Statistics state
  const [statistics, setStatistics] = useState(null);
  const [statisticsLoading, setStatisticsLoading] = useState(false);
  const [statisticsError, setStatisticsError] = useState(null);

  // Available exams state
  const [availableExams, setAvailableExams] = useState([]);
  const [availableExamsLoading, setAvailableExamsLoading] = useState(false);
  const [availableExamsError, setAvailableExamsError] = useState(null);

  // Completed exams state
  const [completedExams, setCompletedExams] = useState([]);
  const [completedExamsLoading, setCompletedExamsLoading] = useState(false);
  const [completedExamsError, setCompletedExamsError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [summary, setSummary] = useState(null);

  /**
   * جلب إحصائيات الامتحانات
   * GET /api/examination/exam-statistics
   */
  const fetchExamStatistics = useCallback(async () => {
    setStatisticsLoading(true);
    setStatisticsError(null);

    try {
      console.log('📊 [useRealExamination] Fetching exam statistics...');
      
      const response = await api.get('/examination/exam-statistics');
      
      console.log('✅ [useRealExamination] Statistics response:', response.data);
      
      if (response.data && response.data.success) {
        setStatistics(response.data.data);
        console.log('📈 [useRealExamination] Statistics set:', response.data.data);
      } else {
        throw new Error('Invalid statistics response format');
      }
      
    } catch (err) {
      console.error('❌ [useRealExamination] Statistics error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch statistics';
      setStatisticsError(errorMessage);
      setStatistics(null);
    } finally {
      setStatisticsLoading(false);
    }
  }, []);

  /**
   * جلب الامتحانات المتاحة
   * GET /api/examination/available-exams
   */
  const fetchAvailableExams = useCallback(async (params = {}) => {
    setAvailableExamsLoading(true);
    setAvailableExamsError(null);

    try {
      console.log('📚 [useRealExamination] Fetching available exams...');
      
      const response = await api.get('/examination/available-exams', { params });
      
      console.log('✅ [useRealExamination] Available exams response:', response.data);
      
      if (response.data && response.data.success) {
        const examsData = response.data.data || [];
        setAvailableExams(examsData);
        console.log('📋 [useRealExamination] Available exams set:', examsData.length, 'exams');
      } else {
        // Handle empty response gracefully
        setAvailableExams([]);
        console.log('📋 [useRealExamination] No available exams found');
      }
      
    } catch (err) {
      console.error('❌ [useRealExamination] Available exams error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch available exams';
      setAvailableExamsError(errorMessage);
      setAvailableExams([]);
    } finally {
      setAvailableExamsLoading(false);
    }
  }, []);

  /**
   * جلب الامتحانات المكتملة
   * GET /api/examination/completed-exams
   */
  const fetchCompletedExams = useCallback(async (params = {}) => {
    setCompletedExamsLoading(true);
    setCompletedExamsError(null);

    try {
      console.log('🏆 [useRealExamination] Fetching completed exams...');
      
      const response = await api.get('/examination/completed-exams', { params });
      
      console.log('✅ [useRealExamination] Completed exams response:', response.data);
      
      if (response.data && response.data.success) {
        const examsData = response.data.data || [];
        setCompletedExams(examsData);
        setPagination(response.data.pagination || null);
        setSummary(response.data.summary || null);
        console.log('🎯 [useRealExamination] Completed exams set:', examsData.length, 'exams');
      } else {
        // Handle empty response gracefully
        setCompletedExams([]);
        setPagination(null);
        setSummary(null);
        console.log('🎯 [useRealExamination] No completed exams found');
      }
      
    } catch (err) {
      console.error('❌ [useRealExamination] Completed exams error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch completed exams';
      setCompletedExamsError(errorMessage);
      setCompletedExams([]);
      setPagination(null);
      setSummary(null);
    } finally {
      setCompletedExamsLoading(false);
    }
  }, []);

  /**
   * جلب جميع بيانات الامتحانات دفعة واحدة
   */
  const fetchAllExamData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('🔄 [useRealExamination] Fetching all exam data...');
      
      // Execute all API calls in parallel
      const promises = [
        fetchExamStatistics(),
        fetchAvailableExams(),
        fetchCompletedExams()
      ];

      await Promise.allSettled(promises);
      
      console.log('✅ [useRealExamination] All exam data fetch completed');
      
    } catch (err) {
      console.error('❌ [useRealExamination] Critical error in fetchAllExamData:', err);
      setError('Critical error loading exam data');
    } finally {
      setLoading(false);
    }
  }, [fetchExamStatistics, fetchAvailableExams, fetchCompletedExams]);

  /**
   * تحديث البيانات
   */
  const refreshData = useCallback(() => {
    return fetchAllExamData();
  }, [fetchAllExamData]);

  /**
   * مسح الأخطاء
   */
  const clearErrors = useCallback(() => {
    setError(null);
    setStatisticsError(null);
    setAvailableExamsError(null);
    setCompletedExamsError(null);
  }, []);

  /**
   * تحديث صفحة الامتحانات المكتملة
   */
  const fetchCompletedExamsPage = useCallback(async (page = 1) => {
    return fetchCompletedExams({ page });
  }, [fetchCompletedExams]);

  return {
    // Main state
    loading,
    error,

    // Statistics
    statistics,
    statisticsLoading,
    statisticsError,
    fetchExamStatistics,

    // Available exams
    availableExams,
    availableExamsLoading,
    availableExamsError,
    fetchAvailableExams,

    // Completed exams
    completedExams,
    completedExamsLoading,
    completedExamsError,
    pagination,
    summary,
    fetchCompletedExams,
    fetchCompletedExamsPage,

    // Combined actions
    fetchAllExamData,
    refreshData,
    clearErrors
  };
};

export default useRealExamination;
