// src/hooks/api/useExamDetails.js
/**
 * React Hook لجلب تفاصيل الامتحان الفردي
 * React Hook for fetching individual exam details
 */
import { useState, useCallback } from 'react';
import examDetailsService from '../../services/api/examDetailsService';

export const useExamDetails = () => {
  const [examDetails, setExamDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * جلب تفاصيل الامتحان
   * Fetch exam details
   * @param {number} examId - معرف الامتحان
   */
  const fetchExamDetails = useCallback(async (examId) => {
    if (!examId) {
      setError('معرف الامتحان مطلوب');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log(`🔄 [useExamDetails] Fetching details for exam ${examId}`);
      
      const result = await examDetailsService.getExamDetails(examId);
      
      if (result.success) {
        setExamDetails(result.data);
        console.log('✅ [useExamDetails] Exam details loaded successfully');
      } else {
        setError(result.message || 'خطأ في تحميل تفاصيل الامتحان');
        setExamDetails(null);
        console.error('❌ [useExamDetails] Failed to load exam details:', result.message);
      }
    } catch (err) {
      const errorMessage = err.message || 'خطأ غير متوقع في تحميل تفاصيل الامتحان';
      setError(errorMessage);
      setExamDetails(null);
      console.error('❌ [useExamDetails] Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * إعادة تعيين الحالة
   * Reset state
   */
  const resetState = useCallback(() => {
    setExamDetails(null);
    setError(null);
    setLoading(false);
  }, []);

  /**
   * تحديث تفاصيل الامتحان محلياً
   * Update exam details locally
   * @param {object} updates - التحديثات المطلوبة
   */
  const updateExamDetails = useCallback((updates) => {
    setExamDetails(prev => prev ? { ...prev, ...updates } : null);
  }, []);

  return {
    examDetails,
    loading,
    error,
    fetchExamDetails,
    resetState,
    updateExamDetails,
    
    // Helper properties
    hasExamData: !!examDetails,
    examStatus: examDetails?.status || null,
    examName: examDetails?.name || examDetails?.title || null,
    examId: examDetails?.id || null
  };
};

export default useExamDetails;
