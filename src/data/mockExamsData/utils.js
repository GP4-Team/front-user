// src/data/mockExamsData/utils.js
import { mockAvailableExams } from './availableExams';
import { mockCompletedExams } from './completedExams';
import { mockExamQuestions } from './questions';

/**
 * Utility Functions للبحث والفلترة
 */

/**
 * البحث عن امتحان بواسطة المعرف
 */
export const findExamById = (examId) => {
  // البحث في الامتحانات المتاحة
  const availableExam = mockAvailableExams.find(exam => exam.id === examId);
  if (availableExam) return availableExam;
  
  // البحث في الامتحانات المكتملة
  const completedExam = mockCompletedExams.find(exam => exam.id === examId);
  if (completedExam) return completedExam;
  
  return null;
};

/**
 * الحصول على أسئلة امتحان محدد
 */
export const getExamQuestions = (examId) => {
  return mockExamQuestions[examId] || [];
};

/**
 * فلترة الامتحانات حسب الحالة
 */
export const filterExamsByStatus = (exams, status) => {
  if (!Array.isArray(exams)) return [];
  return exams.filter(exam => exam.status === status);
};

/**
 * فلترة الامتحانات حسب المادة
 */
export const filterExamsBySubject = (exams, subject) => {
  if (!Array.isArray(exams)) return [];
  return exams.filter(exam => 
    exam.subject === subject || 
    exam.courseName === subject ||
    exam.name?.includes(subject) ||
    exam.title?.includes(subject)
  );
};

/**
 * فلترة الامتحانات حسب المستوى التعليمي
 */
export const filterExamsByEducationLevel = (exams, level) => {
  if (!Array.isArray(exams)) return [];
  return exams.filter(exam => exam.educationLevel === level);
};

/**
 * فلترة الامتحانات حسب فئة المادة
 */
export const filterExamsByCategory = (exams, category) => {
  if (!Array.isArray(exams)) return [];
  return exams.filter(exam => exam.subjectCategory === category);
};

/**
 * الحصول على قائمة المواد المتاحة
 */
export const getAvailableSubjects = () => {
  const allExams = [...mockAvailableExams, ...mockCompletedExams];
  const subjects = [...new Set(allExams.map(exam => exam.subject || exam.courseName))];
  return subjects.filter(Boolean).sort();
};

/**
 * الحصول على قائمة فئات المواد المتاحة
 */
export const getAvailableCategories = () => {
  const allExams = [...mockAvailableExams, ...mockCompletedExams];
  const categories = [...new Set(allExams.map(exam => exam.subjectCategory))];
  return categories.filter(Boolean).sort();
};

/**
 * الحصول على إحصائيات المادة
 */
export const getSubjectStatistics = (subject) => {
  const subjectExams = filterExamsBySubject([...mockAvailableExams, ...mockCompletedExams], subject);
  const completedSubjectExams = filterExamsBySubject(mockCompletedExams, subject);
  
  if (completedSubjectExams.length === 0) {
    return {
      totalExams: subjectExams.length,
      completedExams: 0,
      averageScore: 0,
      passed: 0,
      failed: 0,
      passRate: 0
    };
  }
  
  const totalScore = completedSubjectExams.reduce((sum, exam) => sum + (exam.results?.score || 0), 0);
  const passed = completedSubjectExams.filter(exam => exam.results?.passed).length;
  
  return {
    totalExams: subjectExams.length,
    completedExams: completedSubjectExams.length,
    averageScore: Math.round(totalScore / completedSubjectExams.length),
    passed,
    failed: completedSubjectExams.length - passed,
    passRate: Math.round((passed / completedSubjectExams.length) * 100)
  };
};

/**
 * ترتيب الامتحانات
 */
export const sortExams = (exams, sortBy = 'date', direction = 'desc') => {
  if (!Array.isArray(exams)) return [];
  
  const sorted = [...exams].sort((a, b) => {
    let valueA, valueB;
    
    switch (sortBy) {
      case 'name':
      case 'title':
        valueA = a.name || a.title || '';
        valueB = b.name || b.title || '';
        return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        
      case 'subject':
        valueA = a.subject || a.courseName || '';
        valueB = b.subject || b.courseName || '';
        return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        
      case 'duration':
        valueA = a.duration || 0;
        valueB = b.duration || 0;
        return direction === 'asc' ? valueA - valueB : valueB - valueA;
        
      case 'score':
        valueA = a.results?.score || 0;
        valueB = b.results?.score || 0;
        return direction === 'asc' ? valueA - valueB : valueB - valueA;
        
      case 'difficulty':
        const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
        valueA = difficultyOrder[a.difficulty] || 2;
        valueB = difficultyOrder[b.difficulty] || 2;
        return direction === 'asc' ? valueA - valueB : valueB - valueA;
        
      case 'date':
      default:
        valueA = new Date(a.startDate || a.completedDate || a.nextAvailableDate || 0);
        valueB = new Date(b.startDate || b.completedDate || b.nextAvailableDate || 0);
        return direction === 'asc' ? valueA - valueB : valueB - valueA;
    }
  });
  
  return sorted;
};

/**
 * البحث في الامتحانات
 */
export const searchExams = (exams, query) => {
  if (!query || query.trim() === '' || !Array.isArray(exams)) return exams;
  
  const searchTerm = query.toLowerCase().trim();
  
  return exams.filter(exam => {
    return (
      exam.name?.toLowerCase().includes(searchTerm) ||
      exam.title?.toLowerCase().includes(searchTerm) ||
      exam.subject?.toLowerCase().includes(searchTerm) ||
      exam.courseName?.toLowerCase().includes(searchTerm) ||
      exam.description?.toLowerCase().includes(searchTerm) ||
      exam.topics?.some(topic => topic.toLowerCase().includes(searchTerm)) ||
      exam.examCategory?.toLowerCase().includes(searchTerm)
    );
  });
};

/**
 * تطبيق فلاتر متعددة
 */
export const applyFilters = (exams, filters = {}) => {
  if (!Array.isArray(exams)) return [];
  
  let filteredExams = [...exams];
  
  // فلتر الحالة
  if (filters.status && filters.status !== 'all') {
    filteredExams = filterExamsByStatus(filteredExams, filters.status);
  }
  
  // فلتر المادة
  if (filters.subject && filters.subject !== 'all') {
    filteredExams = filterExamsBySubject(filteredExams, filters.subject);
  }
  
  // فلتر المستوى التعليمي
  if (filters.educationLevel && filters.educationLevel !== 'all') {
    filteredExams = filterExamsByEducationLevel(filteredExams, filters.educationLevel);
  }
  
  // فلتر فئة المادة
  if (filters.category && filters.category !== 'all') {
    filteredExams = filterExamsByCategory(filteredExams, filters.category);
  }
  
  // فلتر الصعوبة
  if (filters.difficulty && filters.difficulty !== 'all') {
    filteredExams = filteredExams.filter(exam => exam.difficulty === filters.difficulty);
  }
  
  // البحث النصي
  if (filters.searchQuery) {
    filteredExams = searchExams(filteredExams, filters.searchQuery);
  }
  
  // الترتيب
  if (filters.sortBy) {
    filteredExams = sortExams(filteredExams, filters.sortBy, filters.sortDirection);
  }
  
  return filteredExams;
};

/**
 * حساب إحصائيات الامتحانات
 */
export const calculateExamStatistics = (exams) => {
  if (!Array.isArray(exams)) return {
    total: 0,
    completed: 0,
    pending: 0,
    passed: 0,
    failed: 0,
    averageScore: 0
  };
  
  const completed = exams.filter(exam => exam.results);
  const passed = completed.filter(exam => exam.results?.passed);
  const totalScore = completed.reduce((sum, exam) => sum + (exam.results?.score || 0), 0);
  
  return {
    total: exams.length,
    completed: completed.length,
    pending: exams.length - completed.length,
    passed: passed.length,
    failed: completed.length - passed.length,
    averageScore: completed.length > 0 ? Math.round(totalScore / completed.length) : 0,
    passRate: completed.length > 0 ? Math.round((passed.length / completed.length) * 100) : 0
  };
};

/**
 * الحصول على الامتحانات حسب الفترة الزمنية
 */
export const getExamsByDateRange = (exams, startDate, endDate) => {
  if (!Array.isArray(exams)) return [];
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return exams.filter(exam => {
    const examDate = new Date(exam.startDate || exam.completedDate || exam.nextAvailableDate);
    return examDate >= start && examDate <= end;
  });
};

/**
 * تجميع الامتحانات حسب المادة
 */
export const groupExamsBySubject = (exams) => {
  if (!Array.isArray(exams)) return {};
  
  return exams.reduce((groups, exam) => {
    const subject = exam.subject || exam.courseName || 'غير محدد';
    if (!groups[subject]) {
      groups[subject] = [];
    }
    groups[subject].push(exam);
    return groups;
  }, {});
};

/**
 * تجميع الامتحانات حسب الحالة
 */
export const groupExamsByStatus = (exams) => {
  if (!Array.isArray(exams)) return {};
  
  return exams.reduce((groups, exam) => {
    const status = exam.status || 'unknown';
    if (!groups[status]) {
      groups[status] = [];
    }
    groups[status].push(exam);
    return groups;
  }, {});
};

/**
 * الحصول على أحدث الامتحانات
 */
export const getRecentExams = (exams, limit = 5) => {
  if (!Array.isArray(exams)) return [];
  
  return sortExams(exams, 'date', 'desc').slice(0, limit);
};

/**
 * الحصول على الامتحانات المتاحة للطالب
 */
export const getAvailableExamsForStudent = (exams, studentLevel = null) => {
  if (!Array.isArray(exams)) return [];
  
  let availableExams = exams.filter(exam => 
    exam.status === 'start' || 
    exam.status === 'continue' || 
    exam.status === 'retry'
  );
  
  if (studentLevel) {
    availableExams = availableExams.filter(exam => 
      exam.educationLevel === studentLevel
    );
  }
  
  return availableExams;
};

/**
 * التحقق من صحة بيانات الامتحان
 */
export const validateExamData = (exam) => {
  const errors = [];
  
  if (!exam.id) errors.push('معرف الامتحان مطلوب');
  if (!exam.name && !exam.title) errors.push('اسم الامتحان مطلوب');
  if (!exam.duration || exam.duration <= 0) errors.push('مدة الامتحان يجب أن تكون أكبر من صفر');
  if (!exam.numberOfQuestions || exam.numberOfQuestions <= 0) errors.push('عدد الأسئلة يجب أن يكون أكبر من صفر');
  if (!exam.status) errors.push('حالة الامتحان مطلوبة');
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * تحويل بيانات الامتحان لتنسيق API
 */
export const formatExamForAPI = (exam) => {
  return {
    id: exam.id,
    name: exam.name || exam.title,
    courseName: exam.courseName || exam.subject,
    status: exam.status,
    duration: exam.duration,
    numberOfQuestions: exam.numberOfQuestions,
    minPercentage: exam.minPercentage,
    examCategory: exam.examCategory,
    description: exam.description,
    educationLevel: exam.educationLevel,
    answerDisplayType: exam.answerDisplayType,
    // ... المزيد من الحقول حسب الحاجة
  };
};
