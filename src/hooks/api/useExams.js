// src/hooks/api/useExams.js
import { useState, useCallback } from 'react';
import { ExamsService } from '../../services/api/index';

/**
 * هوك مخصص لإدارة عمليات الامتحانات
 * يوفر وظائف للتعامل مع الامتحانات، وجلبها وإدارتها
 */
export const useExams = () => {
  const [exams, setExams] = useState([]);
  const [examDetails, setExamDetails] = useState(null);
  const [examQuestions, setExamQuestions] = useState([]);
  const [examResults, setExamResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  /**
   * جلب قائمة الامتحانات
   * @param {Object} params - معلمات الاستعلام
   * @returns {Promise} - Promise مع قائمة الامتحانات
   */
  const fetchExams = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await ExamsService.getExams(params);
      setExams(data.exams || data);
      return data;
    } catch (err) {
      setError(err.message || 'فشل جلب الامتحانات');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * جلب تفاصيل امتحان
   * @param {string} examId - معرف الامتحان
   * @returns {Promise} - Promise مع تفاصيل الامتحان
   */
  const fetchExamDetails = useCallback(async (examId) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await ExamsService.getExamDetails(examId);
      setExamDetails(data);
      return data;
    } catch (err) {
      setError(err.message || 'فشل جلب تفاصيل الامتحان');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * التسجيل في امتحان
   * @param {string} examId - معرف الامتحان
   * @returns {Promise} - Promise مع تأكيد التسجيل
   */
  const registerForExam = useCallback(async (examId) => {
    setLoading(true);
    setError(null);
    
    try {
      return await ExamsService.registerForExam(examId);
    } catch (err) {
      setError(err.message || 'فشل التسجيل في الامتحان');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * بدء امتحان
   * @param {string} examId - معرف الامتحان
   * @returns {Promise} - Promise مع بيانات بدء الامتحان وأسئلته
   */
  const startExam = useCallback(async (examId) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await ExamsService.startExam(examId);
      // تحديث الأسئلة من البيانات المستلمة
      if (data.questions) {
        setExamQuestions(data.questions);
      }
      return data;
    } catch (err) {
      setError(err.message || 'فشل بدء الامتحان');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * جلب أسئلة امتحان
   * @param {string} examId - معرف الامتحان
   * @returns {Promise} - Promise مع أسئلة الامتحان
   */
  const fetchExamQuestions = useCallback(async (examId) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await ExamsService.getExamQuestions(examId);
      setExamQuestions(data.questions || data);
      return data;
    } catch (err) {
      setError(err.message || 'فشل جلب أسئلة الامتحان');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * تقديم إجابة على سؤال
   * @param {string} examId - معرف الامتحان
   * @param {string} questionId - معرف السؤال
   * @param {Object} answerData - بيانات الإجابة
   * @returns {Promise} - Promise مع تأكيد تقديم الإجابة
   */
  const submitAnswer = useCallback(async (examId, questionId, answerData) => {
    setLoading(true);
    setError(null);
    
    try {
      return await ExamsService.submitAnswer(examId, questionId, answerData);
    } catch (err) {
      setError(err.message || 'فشل تقديم الإجابة');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * تقديم الامتحان بالكامل
   * @param {string} examId - معرف الامتحان
   * @returns {Promise} - Promise مع نتيجة الامتحان
   */
  const submitExam = useCallback(async (examId) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await ExamsService.submitExam(examId);
      // تحديث نتائج الامتحان من البيانات المستلمة
      if (data.results) {
        setExamResults(data.results);
      }
      return data;
    } catch (err) {
      setError(err.message || 'فشل تقديم الامتحان');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * جلب نتائج امتحان
   * @param {string} examId - معرف الامتحان
   * @returns {Promise} - Promise مع نتائج الامتحان
   */
  const fetchExamResults = useCallback(async (examId) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await ExamsService.getExamResults(examId);
      setExamResults(data.results || data);
      return data;
    } catch (err) {
      setError(err.message || 'فشل جلب نتائج الامتحان');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * جلب امتحانات المستخدم
   * @param {string} status - حالة الامتحان
   * @returns {Promise} - Promise مع امتحانات المستخدم
   */
  const fetchUserExams = useCallback(async (status = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await ExamsService.getUserExams(status);
      setExams(data.exams || data);
      return data;
    } catch (err) {
      setError(err.message || 'فشل جلب امتحانات المستخدم');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * جلب الامتحانات الموصى بها
   * @returns {Promise} - Promise مع الامتحانات الموصى بها
   */
  const fetchRecommendedExams = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await ExamsService.getRecommendedExams();
      return data;
    } catch (err) {
      setError(err.message || 'فشل جلب الامتحانات الموصى بها');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  // إعادة الدوال والحالات
  return {
    exams,
    examDetails,
    examQuestions,
    examResults,
    loading,
    error,
    fetchExams,
    fetchExamDetails,
    registerForExam,
    startExam,
    fetchExamQuestions,
    submitAnswer,
    submitExam,
    fetchExamResults,
    fetchUserExams,
    fetchRecommendedExams,
    clearError: () => setError(null)
  };
};

export default useExams;