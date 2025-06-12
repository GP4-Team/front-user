// src/services/examDataAdapter.js
/**
 * Exam Data Adapter - تحويل بيانات الامتحانات من API إلى التنسيق المطلوب للمكونات
 */

import { EXAM_STATUS } from './examProgressService';

/**
 * تحويل بيانات الامتحان المتاح من API إلى التنسيق المطلوب
 * @param {Object} examData - بيانات الامتحان من API
 * @param {number} index - فهرس الامتحان (اختياري)
 * @returns {Object} بيانات الامتحان بالتنسيق المطلوب
 */
export const adaptAvailableExamData = (examData, index = 0) => {
  if (!examData) return null;

  // تحويل المدة المنسقة إلى دقائق
  const parseDurationToMinutes = (durationFormatted) => {
    if (!durationFormatted) return 0;
    
    // تنسيقات ممكنة: "10:00" (دقائق:ثواني), "1:00:00" (ساعات:دقائق:ثواني)
    const parts = durationFormatted.split(':');
    if (parts.length === 2) {
      // MM:SS format
      return parseInt(parts[0]) || 0;
    } else if (parts.length === 3) {
      // HH:MM:SS format  
      const hours = parseInt(parts[0]) || 0;
      const minutes = parseInt(parts[1]) || 0;
      return (hours * 60) + minutes;
    }
    return 0;
  };

  const duration = parseDurationToMinutes(examData.duration_formatted);

  return {
    id: `available_exam_${index}_${Date.now()}`, // ID مؤقت للمكون
    name: examData.name || 'امتحان بدون عنوان',
    title: examData.name || 'امتحان بدون عنوان',
    subject: examData.course?.name || 'مادة غير محددة',
    courseName: examData.course?.name || 'مادة غير محددة',
    description: examData.description || '',
    duration: duration,
    numberOfQuestions: examData.question_number || 0,
    allowedChances: examData.allowed_chances || 1,
    examCategory: examData.exam_category?.name || 'غير محدد',
    educationLevel: examData.education_level?.name || 'غير محدد',
    
    // حالة افتراضية للامتحانات المتاحة
    status: EXAM_STATUS.START,
    
    // بيانات إضافية
    originalData: examData,
    
    // معلومات للعرض
    durationFormatted: examData.duration_formatted,
    
    // خصائص افتراضية للتوافق مع المكونات
    answerDisplayType: 'post_exam',
    instructions: [
      'يرجى قراءة جميع الأسئلة بعناية',
      `عدد الأسئلة: ${examData.question_number || 0}`,
      `الوقت المحدد: ${examData.duration_formatted || 'غير محدد'}`,
      `عدد المحاولات المسموحة: ${examData.allowed_chances || 1}`,
      'تأكد من الاتصال بالإنترنت أثناء الامتحان'
    ],
    
    // بيانات تصميم UI
    topics: [],
    tags: [
      examData.course?.name,
      examData.exam_category?.name,
      examData.education_level?.name
    ].filter(Boolean)
  };
};

/**
 * تحويل قائمة من الامتحانات المتاحة
 * @param {Array} examsArray - مصفوفة الامتحانات من API
 * @returns {Array} مصفوفة الامتحانات بالتنسيق المطلوب
 */
export const adaptAvailableExamsArray = (examsArray) => {
  if (!Array.isArray(examsArray)) {
    console.warn('adaptAvailableExamsArray: Expected array, got:', typeof examsArray);
    return [];
  }

  return examsArray.map((exam, index) => adaptAvailableExamData(exam, index));
};

/**
 * تحويل بيانات الامتحان المكتمل من API إلى التنسيق المطلوب
 * @param {Object} examData - بيانات الامتحان من API
 * @param {number} index - فهرس الامتحان (اختياري)
 * @returns {Object} بيانات الامتحان بالتنسيق المطلوب
 */
export const adaptCompletedExamData = (examData, index = 0) => {
  if (!examData) return null;

  return {
    id: `completed_exam_${index}_${Date.now()}`,
    name: examData.name || examData.exam_name || 'امتحان مكتمل',
    title: examData.name || examData.exam_name || 'امتحان مكتمل',
    subject: examData.course?.name || examData.course_name || 'مادة غير محددة',
    courseName: examData.course?.name || examData.course_name || 'مادة غير محددة',
    description: examData.description || '',
    
    // حالة للامتحانات المكتملة
    status: EXAM_STATUS.REVISION,
    
    // نتائج الامتحان
    results: {
      score: examData.score || examData.final_score || 0,
      percentage: examData.percentage || examData.score_percentage || 0,
      passed: examData.passed || (examData.score >= examData.min_score),
      grade: examData.grade || 'غير محدد',
      completedDate: examData.completed_at || examData.completion_date,
      timeTaken: examData.time_taken || 0
    },
    
    // بيانات إضافية
    originalData: examData,
    completedDate: examData.completed_at || examData.completion_date,
    
    // خصائص للتوافق مع المكونات
    duration: examData.duration || 0,
    numberOfQuestions: examData.question_number || examData.questions_count || 0,
    examCategory: examData.exam_category?.name || examData.category || 'غير محدد',
    educationLevel: examData.education_level?.name || examData.level || 'غير محدد'
  };
};

/**
 * تحويل قائمة من الامتحانات المكتملة
 * @param {Array} examsArray - مصفوفة الامتحانات من API
 * @returns {Array} مصفوفة الامتحانات بالتنسيق المطلوب
 */
export const adaptCompletedExamsArray = (examsArray) => {
  if (!Array.isArray(examsArray)) {
    console.warn('adaptCompletedExamsArray: Expected array, got:', typeof examsArray);
    return [];
  }

  return examsArray.map((exam, index) => adaptCompletedExamData(exam, index));
};

/**
 * معالجة رسالة عدم وجود كورسات مسجلة
 * @param {Object} apiResponse - استجابة API
 * @returns {Object} معلومات للعرض
 */
export const handleNoRegisteredCoursesMessage = (apiResponse) => {
  if (apiResponse.message?.includes('No registered courses found')) {
    return {
      hasMessage: true,
      title: 'لا توجد كورسات مسجلة',
      description: 'يجب تسجيل الدخول في كورسات أولاً لعرض الامتحانات المتاحة',
      actionText: 'تصفح الكورسات',
      actionUrl: '/courses',
      icon: '📚'
    };
  }
  
  return {
    hasMessage: false
  };
};

/**
 * دالة مساعدة لحساب لون المادة بناءً على اسمها
 * @param {string} subjectName - اسم المادة
 * @returns {string} لون CSS
 */
export const getSubjectColor = (subjectName = '') => {
  const subject = subjectName.toLowerCase();
  
  if (subject.includes('رياضيات') || subject.includes('تفاضل') || subject.includes('تكامل')) {
    return '#3949AB'; // أزرق
  }
  if (subject.includes('كيمياء')) {
    return '#43A047'; // أخضر
  }
  if (subject.includes('فيزياء')) {
    return '#E53935'; // أحمر
  }
  if (subject.includes('عربي') || subject.includes('أدب')) {
    return '#FB8C00'; // برتقالي
  }
  if (subject.includes('إنجليزي') || subject.includes('english')) {
    return '#8E24AA'; // بنفسجي
  }
  
  // لون افتراضي
  return '#5E5E5E';
};

/**
 * تنسيق المدة للعرض
 * @param {string} durationFormatted - المدة المنسقة من API
 * @param {string} language - اللغة
 * @returns {string} المدة منسقة للعرض
 */
export const formatExamDuration = (durationFormatted, language = 'ar') => {
  if (!durationFormatted) {
    return language === 'ar' ? 'غير محدد' : 'Not specified';
  }

  const parts = durationFormatted.split(':');
  
  if (parts.length === 2) {
    // MM:SS format
    const minutes = parseInt(parts[0]) || 0;
    return language === 'ar' ? `${minutes} دقيقة` : `${minutes} min`;
  } else if (parts.length === 3) {
    // HH:MM:SS format
    const hours = parseInt(parts[0]) || 0;
    const minutes = parseInt(parts[1]) || 0;
    
    if (language === 'ar') {
      if (hours > 0 && minutes > 0) {
        return `${hours} ساعة و ${minutes} دقيقة`;
      } else if (hours > 0) {
        return `${hours} ساعة`;
      } else {
        return `${minutes} دقيقة`;
      }
    } else {
      if (hours > 0 && minutes > 0) {
        return `${hours}h ${minutes}m`;
      } else if (hours > 0) {
        return `${hours}h`;
      } else {
        return `${minutes}m`;
      }
    }
  }
  
  return durationFormatted;
};

export default {
  adaptAvailableExamData,
  adaptAvailableExamsArray,
  adaptCompletedExamData,
  adaptCompletedExamsArray,
  handleNoRegisteredCoursesMessage,
  getSubjectColor,
  formatExamDuration
};
