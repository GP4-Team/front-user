// src/hooks/api/useAIPortal.js
/**
 * React Hooks for AI Portal functionality
 */
import { useState, useCallback, useEffect } from 'react';
import { 
  aiWeaknessService, 
  courseSearchService, 
  aiQuizService, 
  recommendationHistoryService 
} from '../../services/api/aiPortalServices';

// ============ WEAKNESS ANALYSIS HOOK ============
export const useWeaknessAnalysis = () => {
  const [weaknessData, setWeaknessData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeaknessData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await aiWeaknessService.getStudentWeaknesses();
      
      if (result.success) {
        setWeaknessData(result.data);
      } else {
        setError(result.message || 'خطأ في تحميل بيانات نقاط الضعف');
        setWeaknessData(null);
      }
    } catch (err) {
      setError(err.message || 'خطأ غير متوقع');
      setWeaknessData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetState = useCallback(() => {
    setWeaknessData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    weaknessData,
    loading,
    error,
    fetchWeaknessData,
    resetState,
    hasWeaknesses: weaknessData?.weaknesses?.length > 0,
    averageScore: weaknessData?.weaknesses?.[0]?.average_score || 0,
    totalAttempts: weaknessData?.weaknesses?.[0]?.attempts || 0,
    overallScore: weaknessData?.overall_score || 0,
    improvementAreas: weaknessData?.improvement_areas || []
  };
};

// ============ COURSE SEARCH HOOK ============
export const useCourseSearch = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchCourses = useCallback(async (searchTerm) => {
    if (!searchTerm || searchTerm.trim().length < 2) {
      setCourses([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await courseSearchService.searchCourses(searchTerm.trim());
      
      if (result.success) {
        setCourses(result.data || []);
      } else {
        setError(result.message || 'خطأ في البحث عن الكورسات');
        setCourses([]);
      }
    } catch (err) {
      setError(err.message || 'خطأ غير متوقع');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getAvailableCourses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await courseSearchService.getAvailableCourses();
      
      if (result.success) {
        setCourses(result.data || []);
      } else {
        setError(result.message || 'خطأ في تحميل الكورسات');
        setCourses([]);
      }
    } catch (err) {
      setError(err.message || 'خطأ غير متوقع');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCourses = useCallback(() => {
    setCourses([]);
    setError(null);
  }, []);

  return {
    courses,
    loading,
    error,
    searchCourses,
    getAvailableCourses,
    clearCourses,
    hasResults: courses.length > 0
  };
};

// ============ AI QUIZ GENERATION HOOK ============
export const useAIQuizGeneration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [generatedQuiz, setGeneratedQuiz] = useState(null);

  const generateQuiz = useCallback(async (quizData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await aiQuizService.generateQuiz(quizData);
      
      if (result.success) {
        setGeneratedQuiz(result.data);
        setSuccess(result.message || 'تم إنشاء الامتحان بنجاح');
        return result.data; // Return quiz data for immediate use
      } else {
        setError(result.message || 'فشل في إنشاء الامتحان');
        return null;
      }
    } catch (err) {
      setError(err.message || 'خطأ غير متوقع');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  const resetState = useCallback(() => {
    setGeneratedQuiz(null);
    setError(null);
    setSuccess(null);
    setLoading(false);
  }, []);

  return {
    loading,
    error,
    success,
    generatedQuiz,
    generateQuiz,
    clearMessages,
    resetState,
    hasGeneratedQuiz: !!generatedQuiz
  };
};

// ============ RECOMMENDATIONS HISTORY HOOK ============
export const useRecommendationsHistory = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);

  const fetchRecommendations = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const result = await recommendationHistoryService.getRecommendationsHistory(filters);
      
      if (result.success) {
        setRecommendations(result.data.recommendations || []);
        setTotalCount(result.data.total_count || 0);
        setMeta(result.meta);
      } else {
        setError(result.message || 'خطأ في تحميل تاريخ التوصيات');
        setRecommendations([]);
        setTotalCount(0);
      }
    } catch (err) {
      setError(err.message || 'خطأ غير متوقع');
      setRecommendations([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetState = useCallback(() => {
    setRecommendations([]);
    setTotalCount(0);
    setError(null);
    setLoading(false);
    setMeta(null);
  }, []);

  return {
    recommendations,
    totalCount,
    loading,
    error,
    meta,
    fetchRecommendations,
    resetState,
    hasRecommendations: recommendations.length > 0,
    averageQuestions: recommendations.length > 0 
      ? Math.round(recommendations.reduce((sum, r) => sum + (r.num_questions || 0), 0) / recommendations.length)
      : 0
  };
};

// ============ QUIZ EXPLANATION HOOK ============
export const useQuizExplanation = () => {
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExplanation = useCallback(async (recommendationId) => {
    if (!recommendationId) {
      setError('معرف التوصية مطلوب');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await aiWeaknessService.getQuizExplanation(recommendationId);
      
      if (result.success) {
        setExplanation(result.data);
      } else {
        setError(result.message || 'خطأ في تحميل شرح التوصية');
        setExplanation(null);
      }
    } catch (err) {
      setError(err.message || 'خطأ غير متوقع');
      setExplanation(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearExplanation = useCallback(() => {
    setExplanation(null);
    setError(null);
  }, []);

  return {
    explanation,
    loading,
    error,
    fetchExplanation,
    clearExplanation,
    hasExplanation: !!explanation
  };
};

// ============ COMBINED AI PORTAL HOOK ============
export const useAIPortal = () => {
  const weaknessHook = useWeaknessAnalysis();
  const courseSearchHook = useCourseSearch();
  const quizGenerationHook = useAIQuizGeneration();
  const recommendationsHook = useRecommendationsHistory();
  const explanationHook = useQuizExplanation();

  // Combined loading state
  const isLoading = weaknessHook.loading || 
                   courseSearchHook.loading || 
                   quizGenerationHook.loading || 
                   recommendationsHook.loading || 
                   explanationHook.loading;

  // Combined error state
  const hasErrors = weaknessHook.error || 
                   courseSearchHook.error || 
                   quizGenerationHook.error || 
                   recommendationsHook.error || 
                   explanationHook.error;

  // Initialize all data
  const initializePortal = useCallback(async () => {
    await Promise.all([
      weaknessHook.fetchWeaknessData(),
      recommendationsHook.fetchRecommendations()
    ]);
  }, [weaknessHook.fetchWeaknessData, recommendationsHook.fetchRecommendations]);

  // Reset all states
  const resetPortal = useCallback(() => {
    weaknessHook.resetState();
    courseSearchHook.clearCourses();
    quizGenerationHook.resetState();
    recommendationsHook.resetState();
    explanationHook.clearExplanation();
  }, [
    weaknessHook.resetState,
    courseSearchHook.clearCourses,
    quizGenerationHook.resetState,
    recommendationsHook.resetState,
    explanationHook.clearExplanation
  ]);

  return {
    // Individual hooks
    weakness: weaknessHook,
    courseSearch: courseSearchHook,
    quizGeneration: quizGenerationHook,
    recommendations: recommendationsHook,
    explanation: explanationHook,
    
    // Combined states
    isLoading,
    hasErrors,
    
    // Combined actions
    initializePortal,
    resetPortal
  };
};

export default useAIPortal;
