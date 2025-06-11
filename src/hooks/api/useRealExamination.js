// Real Examination Hook - Uses actual backend endpoints
import { useState, useCallback } from 'react';
import { examinationService } from '../../services/api/index';

/**
 * Custom hook for real examination operations
 * Uses actual backend endpoints for exam data
 */
export const useRealExamination = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Statistics state
  const [statistics, setStatistics] = useState({
    totalExams: 0,
    completedExams: 0,
    averageScore: 0,
    highestScore: 0,
    pendingExams: 0,
    registered_courses_count: 0
  });
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
  const [pagination, setPagination] = useState({
    total: 0,
    per_page: 10,
    current_page: 1,
    last_page: 0,
    from: 1,
    to: 0
  });
  const [summary, setSummary] = useState({
    total_completed: 0,
    passed_count: 0,
    failed_count: 0
  });

  /**
   * Fetch exam statistics
   */
  const fetchStatistics = useCallback(async () => {
    setStatisticsLoading(true);
    setStatisticsError(null);
    
    try {
      const result = await examinationService.getExamStatistics();
      
      if (result.success) {
        setStatistics(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch statistics');
      }
    } catch (err) {
      console.error('Error fetching statistics:', err);
      setStatisticsError(err.message || 'Failed to fetch exam statistics');
      // Keep default values for statistics on error
      setStatistics({
        totalExams: 0,
        completedExams: 0,
        averageScore: 0,
        highestScore: 0,
        pendingExams: 0,
        registered_courses_count: 0
      });
    } finally {
      setStatisticsLoading(false);
    }
  }, []);

  /**
   * Fetch available exams
   */
  const fetchAvailableExams = useCallback(async () => {
    setAvailableExamsLoading(true);
    setAvailableExamsError(null);
    
    try {
      const result = await examinationService.getAvailableExams();
      
      if (result.success) {
        setAvailableExams(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch available exams');
      }
    } catch (err) {
      console.error('Error fetching available exams:', err);
      setAvailableExamsError(err.message || 'Failed to fetch available exams');
      setAvailableExams([]);
    } finally {
      setAvailableExamsLoading(false);
    }
  }, []);

  /**
   * Fetch completed exams
   */
  const fetchCompletedExams = useCallback(async (params = {}) => {
    setCompletedExamsLoading(true);
    setCompletedExamsError(null);
    
    try {
      const result = await examinationService.getCompletedExams(params);
      
      if (result.success) {
        setCompletedExams(result.data);
        setPagination(result.pagination);
        setSummary(result.summary);
      } else {
        throw new Error(result.error || 'Failed to fetch completed exams');
      }
    } catch (err) {
      console.error('Error fetching completed exams:', err);
      setCompletedExamsError(err.message || 'Failed to fetch completed exams');
      setCompletedExams([]);
      setPagination({
        total: 0,
        per_page: 10,
        current_page: 1,
        last_page: 0,
        from: 1,
        to: 0
      });
      setSummary({
        total_completed: 0,
        passed_count: 0,
        failed_count: 0
      });
    } finally {
      setCompletedExamsLoading(false);
    }
  }, []);

  /**
   * Fetch all exam data at once - Updated for real API
   */
  const fetchAllExamData = useCallback(async () => {
    console.log('🚀 Starting fetchAllExamData...');
    setLoading(true);
    setError(null);
    
    try {
      // Check if examination service is available
      if (!examinationService) {
        throw new Error('Examination service is not available');
      }
      
      const result = await examinationService.getAllExamsData();
      console.log('📊 Examination service result:', result);
      
      if (result.success) {
        // Update all states with the returned data
        setStatistics(result.data.statistics || {
          totalExams: 0,
          completedExams: 0,
          averageScore: 0,
          highestScore: 0,
          pendingExams: 0,
          registered_courses_count: 0
        });
        
        setAvailableExams(result.data.availableExams || []);
        setCompletedExams(result.data.completedExams || []);
        setPagination(result.data.pagination || {
          total: 0,
          per_page: 10,
          current_page: 1,
          last_page: 0,
          from: 1,
          to: 0
        });
        setSummary(result.data.summary || {
          total_completed: 0,
          passed_count: 0,
          failed_count: 0
        });
        
        // Clear individual errors first
        setStatisticsError(null);
        setAvailableExamsError(null);
        setCompletedExamsError(null);
        
        // Set individual errors if any API failed
        if (result.errors && result.errors.length > 0) {
          console.log('⚠️ API errors detected:', result.errors);
          result.errors.forEach(apiError => {
            if (apiError.type === 'statistics') {
              setStatisticsError(apiError.error);
            } else if (apiError.type === 'available') {
              setAvailableExamsError(apiError.error);
            } else if (apiError.type === 'completed') {
              setCompletedExamsError(apiError.error);
            }
          });
        }
        
        console.log('✅ Exam data loaded successfully');
      } else {
        throw new Error(result.error || 'Failed to fetch exam data');
      }
    } catch (err) {
      console.error('❌ Error fetching all exam data:', err);
      setError(err.message || 'Failed to fetch exam data');
      
      // Reset states on error
      setStatistics({
        totalExams: 0,
        completedExams: 0,
        averageScore: 0,
        highestScore: 0,
        pendingExams: 0,
        registered_courses_count: 0
      });
      setAvailableExams([]);
      setCompletedExams([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Clear all errors
   */
  const clearErrors = useCallback(() => {
    setError(null);
    setStatisticsError(null);
    setAvailableExamsError(null);
    setCompletedExamsError(null);
  }, []);

  /**
   * Refresh specific data section
   */
  const refreshData = useCallback(async (section = 'all') => {
    console.log(`🔄 Refreshing data section: ${section}`);
    switch (section) {
      case 'statistics':
        await fetchStatistics();
        break;
      case 'available':
        await fetchAvailableExams();
        break;
      case 'completed':
        await fetchCompletedExams();
        break;
      case 'all':
      default:
        await fetchAllExamData();
        break;
    }
  }, [fetchStatistics, fetchAvailableExams, fetchCompletedExams, fetchAllExamData]);

  return {
    // Main state
    loading,
    error,
    
    // Statistics
    statistics,
    statisticsLoading,
    statisticsError,
    
    // Available exams
    availableExams,
    availableExamsLoading,
    availableExamsError,
    
    // Completed exams
    completedExams,
    completedExamsLoading,
    completedExamsError,
    pagination,
    summary,
    
    // Actions
    fetchStatistics,
    fetchAvailableExams,
    fetchCompletedExams,
    fetchAllExamData,
    refreshData,
    clearErrors
  };
};

export default useRealExamination;