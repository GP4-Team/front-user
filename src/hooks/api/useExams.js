// src/hooks/api/useExams.js
import { useState, useCallback } from 'react';
import ExamsService from '../../services/api/exams.service';
import { parseExamData } from '../../services/examProgressService';

/**
 * هوك مخصص لإدارة عمليات الامتحانات الجديدة
 * يوفر وظائف للتعامل مع الامتحانات، وجلبها وإدارتها مع الحالات الجديدة
 */
export const useExams = () => {
  const [exams, setExams] = useState([]);
  const [onlineExams, setOnlineExams] = useState([]);
  const [examDetails, setExamDetails] = useState(null);
  const [onlineExamDetails, setOnlineExamDetails] = useState(null);
  const [examQuestions, setExamQuestions] = useState([]);
  const [examResults, setExamResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  /**
   * جلب قائمة الامتحانات الاونلاين مع الحالات
   * @param {Object} params - معلمات الاستعلام
   * @returns {Promise} - Promise مع قائمة الامتحانات وحالاتها
   */
  const fetchOnlineExams = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🎯 [useExams] Starting fetchOnlineExams with params:', params);
      
      const data = await ExamsService.getOnlineExams(params);
      console.log('📦 [useExams] Raw data from service:', data);
      
      // Handle different response formats
      let examsArray = [];
      
      if (Array.isArray(data)) {
        examsArray = data;
      } else if (data && Array.isArray(data.exams)) {
        examsArray = data.exams;
      } else if (data && Array.isArray(data.data)) {
        examsArray = data.data;
      } else if (data && data.data && Array.isArray(data.data.exams)) {
        examsArray = data.data.exams;
      } else {
        console.warn('⚠️ [useExams] Unknown data format, using empty array');
        examsArray = [];
      }
      
      console.log('📋 [useExams] Extracted exams array:', examsArray);
      console.log('📊 [useExams] Number of exams:', examsArray.length);
      
      // Parse each exam using the parseExamData function
      const parsedExams = examsArray.map(exam => {
        try {
          return parseExamData(exam);
        } catch (parseError) {
          console.error('❌ [useExams] Error parsing exam:', exam, parseError);
          // Return the original exam if parsing fails
          return exam;
        }
      });
      
      console.log('✅ [useExams] Parsed exams:', parsedExams);
      
      setOnlineExams(parsedExams);
      return { ...data, exams: parsedExams };
      
    } catch (err) {
      console.error('❌ [useExams] fetchOnlineExams error:', err);
      
      // Set a user-friendly error message
      const errorMessage = err.message || 'فشل جلب الامتحانات الاونلاين';
      setError(errorMessage);
      
      // Don't throw the error, just set empty array
      // This prevents the app from crashing
      setOnlineExams([]);
      
      return { exams: [] };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * جلب قائمة الامتحانات (القديمة)
   * @param {Object} params - معلمات الاستعلام
   * @returns {Promise} - Promise مع قائمة الامتحانات
   */
  const fetchExams = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await ExamsService.getUserExams(params);
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
   * جلب تفاصيل امتحان اونلاين مع الحالة
   * @param {string} examId - معرف الامتحان
   * @returns {Promise} - Promise مع تفاصيل الامتحان وحالته
   */
  const fetchOnlineExamDetails = useCallback(async (examId) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await ExamsService.getOnlineExamById(examId);
      const parsedExam = parseExamData(data);
      setOnlineExamDetails(parsedExam);
      return parsedExam;
    } catch (err) {
      setError(err.message || 'فشل جلب تفاصيل امتحان اونلاين');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * جلب تفاصيل امتحان (قديم)
   * @param {string} examId - معرف الامتحان
   * @returns {Promise} - Promise مع تفاصيل الامتحان
   */
  const fetchExamDetails = useCallback(async (examId) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await ExamsService.getExamById(examId);
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
  
  // إعادة الدوال والحالات
  return {
    // Online Exams (New)
    onlineExams,
    onlineExamDetails,
    fetchOnlineExams,
    fetchOnlineExamDetails,
    
    // Legacy Exams
    exams,
    examDetails,
    examQuestions,
    examResults,
    
    // States
    loading,
    error,
    
    // Legacy Functions
    fetchExams,
    fetchExamDetails,
    registerForExam,
    startExam,
    fetchExamQuestions,
    submitAnswer,
    submitExam,
    fetchExamResults,
    fetchUserExams,
    
    // Utilities
    clearError: () => setError(null)
  };
};

export default useExams;