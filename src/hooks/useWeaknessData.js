// src/hooks/useWeaknessData.js
import { useState, useEffect, useCallback } from 'react';
import weaknessService from '../services/api/weakness.service';
import { useAuth } from '../contexts/AuthContext';

/**
 * Custom hook for managing student weakness portal data
 * Handles loading, error states, and data fetching
 */
const useWeaknessData = () => {
  const { user, isAuthenticated } = useAuth();
  
  // State management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weaknessData, setWeaknessData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [recommendationDetails, setRecommendationDetails] = useState({});
  const [apiErrors, setApiErrors] = useState([]); // Track individual API errors

  /**
   * Fetch all portal data
   */
  const fetchPortalData = useCallback(async () => {
    if (!isAuthenticated) {
      setError('يجب تسجيل الدخول أولاً');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setApiErrors([]);
      
      const result = await weaknessService.getPortalData();
      
      // Always set the available data, even if some APIs failed
      if (result.weakness) {
        setWeaknessData(result.weakness);
      }
      
      if (result.recommendations) {
        setRecommendations(result.recommendations);
      }
      
      // Track any API errors for debugging
      if (result.errors && result.errors.length > 0) {
        setApiErrors(result.errors);
        console.warn('Some APIs failed:', result.errors);
      }
      
      // Only set main error if critical data (weakness) is missing
      if (!result.success || !result.weakness) {
        setError('فشل في تحميل البيانات الأساسية');
      }
      
    } catch (err) {
      setError(err.error || 'حدث خطأ غير متوقع');
      if (err.errors) {
        setApiErrors(err.errors);
      }
      console.error('Error in fetchPortalData:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  /**
   * Fetch explanation for a specific recommendation
   */
  const fetchRecommendationDetails = useCallback(async (recommendationId) => {
    if (!recommendationId) return;

    try {
      // Check if already cached
      if (recommendationDetails[recommendationId]) {
        setSelectedRecommendation(recommendationDetails[recommendationId]);
        return;
      }

      const result = await weaknessService.getRecommendationExplanation(recommendationId);
      
      if (result.success) {
        const details = result.data;
        
        // Cache the details
        setRecommendationDetails(prev => ({
          ...prev,
          [recommendationId]: details
        }));
        
        setSelectedRecommendation(details);
      } else {
        console.error('Failed to fetch recommendation details:', result.error);
      }
    } catch (err) {
      console.error('Error fetching recommendation details:', err);
    }
  }, [recommendationDetails]);

  /**
   * Refresh all data
   */
  const refreshData = useCallback(() => {
    fetchPortalData();
  }, [fetchPortalData]);

  /**
   * Calculate weakness statistics
   */
  const getWeaknessStats = useCallback(() => {
    if (!weaknessData || !weaknessData.weaknesses) {
      return {
        averageScore: 0,
        totalAttempts: 0,
        overallScore: 0,
        hasWeaknesses: false,
        weaknessCount: 0
      };
    }

    const weaknesses = weaknessData.weaknesses;
    const totalAttempts = weaknesses.reduce((sum, w) => sum + (w.attempts || 0), 0);
    const averageScore = weaknesses.length > 0 
      ? weaknesses.reduce((sum, w) => sum + (w.average_score || 0), 0) / weaknesses.length
      : 0;

    return {
      averageScore: Math.round(averageScore * 100) / 100,
      totalAttempts,
      overallScore: weaknessData.overall_score || 0,
      hasWeaknesses: weaknesses.length > 0,
      weaknessCount: weaknesses.length
    };
  }, [weaknessData]);

  /**
   * Get recommendation statistics
   */
  const getRecommendationStats = useCallback(() => {
    if (!recommendations || recommendations.length === 0) {
      return {
        totalRecommendations: 0,
        averageQuestions: 0,
        hasRecommendations: false
      };
    }

    const totalQuestions = recommendations.reduce((sum, r) => sum + (r.num_questions || 0), 0);
    const averageQuestions = recommendations.length > 0 
      ? totalQuestions / recommendations.length 
      : 0;

    return {
      totalRecommendations: recommendations.length,
      averageQuestions: Math.round(averageQuestions * 100) / 100,
      hasRecommendations: true
    };
  }, [recommendations]);

  // Load data on mount and when auth state changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchPortalData();
    } else {
      setLoading(false);
      setError('يجب تسجيل الدخول للوصول لهذه الصفحة');
    }
  }, [isAuthenticated, fetchPortalData]);

  return {
    // Data
    weaknessData,
    recommendations,
    selectedRecommendation,
    user,
    
    // Computed values
    weaknessStats: getWeaknessStats(),
    recommendationStats: getRecommendationStats(),
    
    // State
    loading,
    error,
    isAuthenticated,
    apiErrors, // Include API errors for debugging
    
    // Actions
    fetchPortalData,
    fetchRecommendationDetails,
    refreshData,
    setSelectedRecommendation,
    
    // Helpers
    hasData: !loading && !error && weaknessData,
    hasRecommendations: recommendations.length > 0,
    hasPartialData: !loading && weaknessData // Has main data even if recommendations failed
  };
};

export default useWeaknessData;
