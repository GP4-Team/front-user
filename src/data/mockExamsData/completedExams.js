// src/data/mockExamsData/completedExams.js
import { 
  EXAM_STATUS, 
  ANSWER_DISPLAY_TYPE, 
  EDUCATION_LEVELS, 
  SUBJECT_CATEGORIES,
  EXAM_CATEGORIES 
} from './constants';

/**
 * الامتحانات المكتملة مع النتائج
 */
export const mockCompletedExams = [
  {
    id: 'exam_completed_001',
    name: 'امتحان الرياضيات - الهندسة التحليلية',
    title: 'امتحان الرياضيات - الهندسة التحليلية',
    courseName: 'الرياضيات',
    subject: 'الرياضيات',
    status: EXAM_STATUS.REVISION,
    duration: 90,
    numberOfQuestions: 30,
    minPercentage: 70,
    examCategory: EXAM_CATEGORIES.MONTHLY,
    description: 'امتحان الهندسة التحليلية والإحداثيات',
    educationLevel: EDUCATION_LEVELS.HIGH,
    subjectCategory: SUBJECT_CATEGORIES.MATH,
    answerDisplayType: ANSWER_DISPLAY_TYPE.POST_EXAM,
    completedDate: '2025-06-08T15:30:00Z',
    timeTaken: 75, // الوقت المستغرق بالدقائق
    results: {
      score: 85,
      percentage: 85,
      passed: true,
      correctAnswers: 26,
      wrongAnswers: 4,
      grade: 'ممتاز',
      ranking: 15, // الترتيب من بين الطلاب
      totalStudents: 120,
      certificateAvailable: true
    },
    detailedResults: {
      byTopic: [
        { topic: 'المستقيم والمنحنيات', correct: 8, total: 10, percentage: 80 },
        { topic: 'الدائرة والقطع المكافئ', correct: 9, total: 10, percentage: 90 },
        { topic: 'التحويلات الهندسية', correct: 9, total: 10, percentage: 90 }
      ],
      timePerQuestion: 2.5, // متوسط الوقت لكل سؤال بالدقائق
      difficulty: {
        easy: { correct: 12, total: 15, percentage: 80 },
        medium: { correct: 10, total: 12, percentage: 83 },
        hard: { correct: 4, total: 3, percentage: 133 } // خطأ في البيانات سيتم تصحيحه
      },
      accuracyByTime: [
        { timeRange: '0-5 min', accuracy: 95 },
        { timeRange: '5-10 min', accuracy: 87 },
        { timeRange: '10+ min', accuracy: 78 }
      ]
    },
    feedback: {
      strengths: ['فهم ممتاز للمفاهيم الأساسية', 'دقة في الحسابات'],
      improvements: ['التركيز أكثر على المسائل المعقدة', 'مراجعة القطع المكافئ'],
      teacherComment: 'أداء ممتاز، واصل التميز!',
      recommendations: [
        'ممارسة مزيد من المسائل المعقدة',
        'مراجعة الفصل الخامس',
        'التحضير للامتحان النهائي'
      ]
    },
    reviewData: {
      reviewAvailable: true,
      correctAnswersShown: true,
      explanationsAvailable: true,
      retakeAllowed: false
    }
  },
  {
    id: 'exam_completed_002',
    name: 'امتحان الفيزياء - الحركة والقوى',
    title: 'امتحان الفيزياء - الحركة والقوى',
    courseName: 'الفيزياء',
    subject: 'الفيزياء',
    status: EXAM_STATUS.REVISION,
    duration: 60,
    numberOfQuestions: 25,
    minPercentage: 65,
    examCategory: EXAM_CATEGORIES.WEEKLY,
    description: 'امتحان في قوانين نيوتن والحركة',
    educationLevel: EDUCATION_LEVELS.HIGH,
    subjectCategory: SUBJECT_CATEGORIES.SCIENCE,
    answerDisplayType: ANSWER_DISPLAY_TYPE.IMMEDIATE,
    completedDate: '2025-06-05T11:00:00Z',
    timeTaken: 55,
    results: {
      score: 72,
      percentage: 72,
      passed: true,
      correctAnswers: 18,
      wrongAnswers: 7,
      grade: 'جيد جداً',
      ranking: 45,
      totalStudents: 95,
      certificateAvailable: false
    },
    detailedResults: {
      byTopic: [
        { topic: 'قوانين نيوتن', correct: 6, total: 8, percentage: 75 },
        { topic: 'الحركة المنتظمة', correct: 7, total: 9, percentage: 78 },
        { topic: 'القوى والاحتكاك', correct: 5, total: 8, percentage: 63 }
      ],
      timePerQuestion: 2.2,
      difficulty: {
        easy: { correct: 10, total: 12, percentage: 83 },
        medium: { correct: 6, total: 8, percentage: 75 },
        hard: { correct: 2, total: 5, percentage: 40 }
      },
      accuracyByTime: [
        { timeRange: '0-5 min', accuracy: 89 },
        { timeRange: '5-10 min', accuracy: 72 },
        { timeRange: '10+ min', accuracy: 65 }
      ]
    },
    feedback: {
      strengths: ['فهم جيد للمفاهيم الأساسية'],
      improvements: ['مراجعة مسائل الاحتكاك', 'التدرب أكثر على المسائل المعقدة'],
      teacherComment: 'أداء جيد، يحتاج لمراجعة بعض المفاهيم',
      recommendations: [
        'حل تمارين إضافية على الاحتكاك',
        'مراجعة الفصل الثالث',
        'ممارسة حل المسائل المعقدة'
      ]
    },
    reviewData: {
      reviewAvailable: true,
      correctAnswersShown: true,
      explanationsAvailable: true,
      retakeAllowed: true
    }
  },
  {
    id: 'exam_completed_003',
    name: 'اختبار الكيمياء - الروابط الكيميائية',
    title: 'اختبار الكيمياء - الروابط الكيميائية',
    courseName: 'الكيمياء',
    subject: 'الكيمياء',
    status: EXAM_STATUS.REVISION,
    duration: 45,
    numberOfQuestions: 20,
    minPercentage: 70,
    examCategory: EXAM_CATEGORIES.WEEKLY,
    description: 'اختبار في أنواع الروابط الكيميائية',
    educationLevel: EDUCATION_LEVELS.HIGH,
    subjectCategory: SUBJECT_CATEGORIES.SCIENCE,
    answerDisplayType: ANSWER_DISPLAY_TYPE.ANSWERS_ONLY,
    completedDate: '2025-06-03T09:30:00Z',
    timeTaken: 40,
    results: {
      score: 58,
      percentage: 58,
      passed: false,
      correctAnswers: 12,
      wrongAnswers: 8,
      grade: 'مقبول',
      ranking: 78,
      totalStudents: 95,
      certificateAvailable: false
    },
    detailedResults: {
      byTopic: [
        { topic: 'الرابطة الأيونية', correct: 4, total: 7, percentage: 57 },
        { topic: 'الرابطة التساهمية', correct: 5, total: 8, percentage: 63 },
        { topic: 'الرابطة المعدنية', correct: 3, total: 5, percentage: 60 }
      ],
      timePerQuestion: 2.0,
      difficulty: {
        easy: { correct: 7, total: 8, percentage: 88 },
        medium: { correct: 4, total: 7, percentage: 57 },
        hard: { correct: 1, total: 5, percentage: 20 }
      },
      accuracyByTime: [
        { timeRange: '0-5 min', accuracy: 75 },
        { timeRange: '5-10 min', accuracy: 58 },
        { timeRange: '10+ min', accuracy: 45 }
      ]
    },
    feedback: {
      strengths: ['فهم الأساسيات'],
      improvements: ['مراجعة شاملة للمفاهيم', 'حل مزيد من التمارين', 'التركيز على التطبيقات العملية'],
      teacherComment: 'يحتاج لمراجعة شاملة ومزيد من التمرين',
      recommendations: [
        'مراجعة شاملة للفصل الأول والثاني',
        'حل تمارين إضافية',
        'حضور حصص التقوية',
        'إعادة الامتحان بعد المراجعة'
      ]
    },
    reviewData: {
      reviewAvailable: true,
      correctAnswersShown: false, // ANSWERS_ONLY type
      explanationsAvailable: false,
      retakeAllowed: true,
      retakeAvailableFrom: '2025-06-17T09:00:00Z'
    }
  }
];
