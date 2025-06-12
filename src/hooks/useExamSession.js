// src/hooks/useExamSession.js
/**
 * Hook لإدارة جلسة الامتحان
 * Hook for managing exam session - Updated to use single API endpoint
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import examService from '../services/examService';
import { useAuth } from '../contexts/AuthContext';

export const useExamSession = (examId) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [examData, setExamData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  
  const timerRef = useRef(null);
  const submissionQueue = useRef([]);
  const isSubmittingRef = useRef(false);

  /**
   * تحميل بيانات الامتحان
   * Load exam data - Single API call handles all exam states
   */
  const loadExamData = useCallback(async () => {
    if (!isAuthenticated || !examId) {
      setError('غير مصرح لك بالوصول لهذا الامتحان');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log(`🔄 [useExamSession] Loading exam ${examId} with single API call`);
      
      // جلب بيانات الامتحان والأسئلة في استدعاء واحد
      // This endpoint handles all exam states automatically (start, continue, retry, revision)
      const result = await examService.getExamQuestions(examId);
      
      if (!result.success) {
        setError(result.message);
        setLoading(false);
        return;
      }
      
      const data = result.data;
      
      console.log(`📊 [useExamSession] Exam status: ${data.status}`);
      console.log(`📚 [useExamSession] Exam loaded: ${data.exam_name}`);
      console.log(`❓ [useExamSession] Questions: ${data.questions?.length || 0}`);
      
      // التحقق من حالة الامتحان والتصرف المناسب
      if (data.status === 'revision') {
        // إعادة توجيه لصفحة المراجعة
        console.log('🔄 [useExamSession] Redirecting to review page');
        navigate(`/exams/${examId}/review`);
        return;
      }
      
      // تحديث البيانات
      setExamData(data);
      setTimeRemaining(data.duration_in_seconds);
      setStartTime(Date.now());
      setQuestionStartTime(Date.now());
      
      // تهيئة الإجابات
      const initialAnswers = {};
      if (data.questions && data.questions.length > 0) {
        data.questions.forEach(question => {
          initialAnswers[question.id] = {
            answer: question.student_answer?.answer || null,
            studentAnswerId: question.student_answer_id,
            submitted: question.student_answer?.answer !== null,
            timeSpent: question.student_answer?.time_taken_to_answer || 0,
            isCorrect: question.student_answer?.is_correct,
            awardedMark: question.student_answer?.student_awarded_mark
          };
        });
      }
      setAnswers(initialAnswers);
      
      console.log('✅ [useExamSession] Exam data loaded successfully');
      
    } catch (err) {
      console.error('❌ [useExamSession] Error loading exam:', err);
      setError(err.message || 'خطأ في تحميل الامتحان');
    } finally {
      setLoading(false);
    }
  }, [examId, isAuthenticated, navigate]);

  /**
   * مؤقت الامتحان
   * Exam timer
   */
  useEffect(() => {
    if (timeRemaining > 0 && !examFinished) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            console.log('⏰ [useExamSession] Time up! Ending exam...');
            setExamFinished(true);
            // انتهاء الوقت - إعادة توجيه للنتائج
            setTimeout(() => {
              if (examData?.passed_exam_id) {
                navigate(`/exams/${examId}/results/${examData.passed_exam_id}`);
              } else {
                navigate(`/exams/${examId}/results`);
              }
            }, 2000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeRemaining, examFinished, examId, navigate, examData]);

  /**
   * تحديث إجابة سؤال
   * Update question answer
   */
  const updateAnswer = useCallback((questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        answer: answer
      }
    }));
  }, []);

  /**
   * إرسال إجابة سؤال
   * Submit question answer
   */
  const submitAnswer = useCallback(async (questionId, answer, questionType) => {
    if (isSubmittingRef.current) {
      console.log('🔄 [useExamSession] Already submitting, queuing answer...');
      submissionQueue.current.push({ questionId, answer, questionType });
      return;
    }

    try {
      isSubmittingRef.current = true;
      setSubmitting(true);
      
      const answerData = answers[questionId];
      if (!answerData) {
        throw new Error('بيانات الإجابة غير موجودة');
      }

      // حساب الوقت المستغرق
      const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
      
      // تنسيق الإجابة
      const formattedAnswer = examService.formatAnswerData(questionType, answer);
      
      console.log(`📤 [useExamSession] Submitting answer for question ${questionId}:`, formattedAnswer);
      
      // إرسال الإجابة
      const result = await examService.submitAnswer(answerData.studentAnswerId, formattedAnswer);
      
      if (result.success) {
        // تحديث حالة الإجابة
        setAnswers(prev => ({
          ...prev,
          [questionId]: {
            ...prev[questionId],
            answer: answer,
            submitted: true,
            timeSpent: timeSpent,
            result: result.data
          }
        }));
        
        console.log(`✅ [useExamSession] Answer submitted for question ${questionId}`);
        
        // معالجة الطابور
        if (submissionQueue.current.length > 0) {
          const next = submissionQueue.current.shift();
          setTimeout(() => {
            submitAnswer(next.questionId, next.answer, next.questionType);
          }, 100);
        }
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      console.error('❌ [useExamSession] Error submitting answer:', err);
      setError(err.message || 'خطأ في إرسال الإجابة');
    } finally {
      isSubmittingRef.current = false;
      setSubmitting(false);
    }
  }, [answers, questionStartTime]);

  /**
   * الانتقال للسؤال التالي
   * Go to next question
   */
  const nextQuestion = useCallback(() => {
    if (examData && currentQuestionIndex < examData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setQuestionStartTime(Date.now());
    }
  }, [examData, currentQuestionIndex]);

  /**
   * الانتقال للسؤال السابق
   * Go to previous question
   */
  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setQuestionStartTime(Date.now());
    }
  }, [currentQuestionIndex]);

  /**
   * الانتقال لسؤال محدد
   * Go to specific question
   */
  const goToQuestion = useCallback((index) => {
    if (examData && index >= 0 && index < examData.questions.length) {
      setCurrentQuestionIndex(index);
      setQuestionStartTime(Date.now());
    }
  }, [examData]);

  /**
   * إنهاء الامتحان
   * End exam
   */
  const handleExamEnd = useCallback(async () => {
    try {
      console.log('🏁 [useExamSession] Ending exam session...');
      
      // إيقاف المؤقت
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // إنهاء الامتحان على الخادم إذا كان هناك passed_exam_id
      if (examData?.passed_exam_id) {
        console.log(`📤 [useExamSession] Finishing exam session ${examData.passed_exam_id}`);
        const finishResult = await examService.finishExam(examData.passed_exam_id);
        
        if (finishResult.success) {
          console.log('✅ [useExamSession] Exam finished successfully on server');
        } else {
          console.warn('⚠️ [useExamSession] Failed to finish exam on server:', finishResult.message);
        }
      }
      
      setExamFinished(true);
      
      // الانتقال للنتائج
      setTimeout(() => {
        if (examData?.passed_exam_id) {
          navigate(`/exams/${examId}/results/${examData.passed_exam_id}`);
        } else {
          navigate(`/exams/${examId}/results`);
        }
      }, 2000);
      
    } catch (err) {
      console.error('❌ [useExamSession] Error ending exam:', err);
      // رغم الخطأ، ما زلنا نريد إنهاء الامتحان محلياً
      setExamFinished(true);
      setTimeout(() => {
        navigate(`/exams/${examId}/results`);
      }, 2000);
    }
  }, [examData, examId, navigate]);

  /**
   * تنسيق الوقت المتبقي
   * Format remaining time
   */
  const formatTime = useCallback((seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }, []);

  /**
   * حساب التقدم
   * Calculate progress
   */
  const progress = examData ? {
    current: currentQuestionIndex + 1,
    total: examData.questions.length,
    percentage: Math.round(((currentQuestionIndex + 1) / examData.questions.length) * 100),
    answered: Object.values(answers).filter(a => a.answer !== null).length
  } : null;

  // تحميل البيانات عند التهيئة
  useEffect(() => {
    loadExamData();
  }, [loadExamData]);

  return {
    // بيانات الامتحان
    examData,
    currentQuestion: examData?.questions?.[currentQuestionIndex] || null,
    currentQuestionIndex,
    answers,
    progress,
    
    // حالة التوقيت
    timeRemaining,
    formattedTimeRemaining: formatTime(timeRemaining),
    examFinished,
    
    // حالة التحميل والأخطاء
    loading,
    error,
    submitting,
    
    // الوظائف
    updateAnswer,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    handleExamEnd,
    retryLoad: loadExamData
  };
};

export default useExamSession;
