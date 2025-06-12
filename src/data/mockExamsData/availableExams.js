// src/data/mockExamsData/availableExams.js
import { 
  EXAM_STATUS, 
  ANSWER_DISPLAY_TYPE, 
  EDUCATION_LEVELS, 
  SUBJECT_CATEGORIES,
  EXAM_CATEGORIES 
} from './constants';

/**
 * الامتحانات المتاحة - مختلف الحالات والمواضيع
 */
export const mockAvailableExams = [
  {
    id: 'exam_start_001',
    name: 'امتحان الرياضيات - الجبر الأساسي',
    title: 'امتحان الرياضيات - الجبر الأساسي',
    courseName: 'الرياضيات',
    subject: 'الرياضيات',
    status: EXAM_STATUS.START,
    duration: 60, // دقيقة
    numberOfQuestions: 25,
    minPercentage: 70,
    allowedChances: 3,
    examCategory: EXAM_CATEGORIES.MONTHLY,
    description: 'امتحان شامل يغطي أساسيات الجبر والمعادلات الخطية',
    educationLevel: EDUCATION_LEVELS.HIGH,
    subjectCategory: SUBJECT_CATEGORIES.MATH,
    answerDisplayType: ANSWER_DISPLAY_TYPE.POST_EXAM,
    startDate: '2025-06-15T09:00:00Z',
    endDate: '2025-06-15T10:00:00Z',
    instructions: [
      'يجب الإجابة على جميع الأسئلة',
      'استخدم الآلة الحاسبة المتاحة في الواجهة',
      'الوقت المحدد 60 دقيقة',
      'النجاح يتطلب 70% على الأقل'
    ],
    topics: ['المعادلات الخطية', 'النظم الجبرية', 'المتباينات', 'العمليات على الأعداد'],
    difficulty: 'medium',
    estimatedTime: 55,
    tags: ['جبر', 'رياضيات أساسية', 'معادلات']
  },
  {
    id: 'exam_continue_002',
    name: 'امتحان الفيزياء - الكهرباء والمغناطيسية',
    title: 'امتحان الفيزياء - الكهرباء والمغناطيسية',
    courseName: 'الفيزياء',
    subject: 'الفيزياء',
    status: EXAM_STATUS.CONTINUE,
    duration: 90,
    numberOfQuestions: 30,
    minPercentage: 65,
    allowedChances: 2,
    examCategory: EXAM_CATEGORIES.FINAL,
    description: 'امتحان نهائي يغطي مبادئ الكهرباء والمغناطيسية',
    educationLevel: EDUCATION_LEVELS.HIGH,
    subjectCategory: SUBJECT_CATEGORIES.SCIENCE,
    answerDisplayType: ANSWER_DISPLAY_TYPE.IMMEDIATE,
    startDate: '2025-06-12T10:00:00Z',
    endDate: '2025-06-12T11:30:00Z',
    timeRemaining: 45, // الوقت المتبقي بالدقائق
    questionsAnswered: 18,
    lastQuestionIndex: 17,
    currentAttempt: 1,
    instructions: [
      'يمكنك العودة وتعديل الإجابات',
      'ستظهر الإجابة الصحيحة فور الإجابة',
      'احفظ تقدمك بانتظام'
    ],
    topics: ['قوانين أوم', 'الدوائر الكهربائية', 'المجال المغناطيسي', 'الحث الكهرومغناطيسي'],
    difficulty: 'hard',
    estimatedTime: 85,
    tags: ['فيزياء', 'كهرباء', 'مغناطيسية'],
    progress: {
      questionsAnswered: 18,
      totalQuestions: 30,
      timeSpent: 45,
      currentSection: 'الدوائر الكهربائية'
    }
  },
  {
    id: 'exam_retry_003',
    name: 'امتحان الكيمياء العضوية',
    title: 'امتحان الكيمياء العضوية',
    courseName: 'الكيمياء',
    subject: 'الكيمياء',
    status: EXAM_STATUS.RETRY,
    duration: 75,
    numberOfQuestions: 20,
    minPercentage: 75,
    allowedChances: 3,
    currentAttempt: 2,
    examCategory: EXAM_CATEGORIES.RETRY,
    description: 'إعادة امتحان الكيمياء العضوية - المحاولة الثانية',
    educationLevel: EDUCATION_LEVELS.UNIVERSITY,
    subjectCategory: SUBJECT_CATEGORIES.SCIENCE,
    answerDisplayType: ANSWER_DISPLAY_TYPE.ANSWERS_ONLY,
    previousAttempts: [
      {
        attemptNumber: 1,
        date: '2025-06-05T14:00:00Z',
        score: 68,
        percentage: 68,
        passed: false,
        timeTaken: 70,
        weakAreas: ['المركبات العضوية', 'التفاعلات الكيميائية']
      }
    ],
    nextAvailableDate: '2025-06-16T14:00:00Z',
    instructions: [
      'هذه المحاولة الثانية من أصل 3 محاولات',
      'ركز على النقاط التي أخفقت فيها سابقاً',
      'النجاح يتطلب 75% على الأقل'
    ],
    topics: ['المركبات العضوية', 'التفاعلات الكيميائية', 'الروابط الكيميائية'],
    difficulty: 'hard',
    estimatedTime: 70,
    tags: ['كيمياء', 'عضوية', 'إعادة امتحان'],
    retryInfo: {
      originalExamDate: '2025-06-05T14:00:00Z',
      failureReasons: ['ضعف في فهم المركبات العضوية', 'نقص في الوقت'],
      improvementSuggestions: ['مراجعة الفصل الثالث', 'حل تمارين إضافية']
    }
  },
  {
    id: 'exam_unavailable_004',
    name: 'امتحان البرمجة المتقدمة',
    title: 'امتحان البرمجة المتقدمة',
    courseName: 'علوم الحاسوب',
    subject: 'البرمجة',
    status: EXAM_STATUS.UNAVAILABLE,
    duration: 120,
    numberOfQuestions: 35,
    minPercentage: 80,
    allowedChances: 2,
    examCategory: EXAM_CATEGORIES.SPECIALTY,
    description: 'امتحان متقدم في البرمجة والخوارزميات - غير متاح حالياً',
    educationLevel: EDUCATION_LEVELS.UNIVERSITY,
    subjectCategory: SUBJECT_CATEGORIES.COMPUTER,
    answerDisplayType: ANSWER_DISPLAY_TYPE.POST_EXAM,
    availableFrom: '2025-06-20T08:00:00Z',
    availableUntil: '2025-06-25T18:00:00Z',
    reason: 'الامتحان سيكون متاحاً بداية من 20 يونيو',
    prerequisites: [
      {
        type: 'exam',
        name: 'امتحان البرمجة الأساسية',
        completed: false,
        required: true
      },
      {
        type: 'attendance',
        name: 'حضور 80% من المحاضرات',
        completed: false,
        required: true,
        currentPercentage: 65
      }
    ],
    instructions: [
      'يتطلب اجتياز المتطلبات المسبقة',
      'الامتحان يتضمن أسئلة برمجية عملية',
      'يسمح باستخدام IDE محدد'
    ],
    topics: ['خوارزميات الترتيب', 'هياكل البيانات', 'البرمجة الكائنية', 'قواعد البيانات'],
    difficulty: 'hard',
    estimatedTime: 110,
    tags: ['برمجة', 'خوارزميات', 'متقدم']
  },
  {
    id: 'exam_start_005',
    name: 'اختبار اللغة الإنجليزية - القواعد',
    title: 'اختبار اللغة الإنجليزية - القواعد',
    courseName: 'اللغة الإنجليزية',
    subject: 'اللغة الإنجليزية',
    status: EXAM_STATUS.START,
    duration: 45,
    numberOfQuestions: 40,
    minPercentage: 60,
    allowedChances: 2,
    examCategory: EXAM_CATEGORIES.PLACEMENT,
    description: 'اختبار شامل لقواعد اللغة الإنجليزية والمفردات',
    educationLevel: EDUCATION_LEVELS.HIGH,
    subjectCategory: SUBJECT_CATEGORIES.LANGUAGE,
    answerDisplayType: ANSWER_DISPLAY_TYPE.IMMEDIATE,
    startDate: '2025-06-13T11:00:00Z',
    endDate: '2025-06-13T11:45:00Z',
    instructions: [
      'اقرأ كل سؤال بعناية',
      'ستظهر الإجابة الصحيحة فوراً',
      'يمكن إعادة المحاولة مرة واحدة'
    ],
    topics: ['أزمنة الأفعال', 'المفردات', 'القراءة والفهم', 'القواعد النحوية'],
    difficulty: 'medium',
    estimatedTime: 40,
    tags: ['إنجليزية', 'قواعد', 'مفردات']
  },
  {
    id: 'exam_start_006',
    name: 'امتحان الهندسة المدنية - الإنشاءات',
    title: 'امتحان الهندسة المدنية - الإنشاءات',
    courseName: 'الهندسة المدنية',
    subject: 'الهندسة',
    status: EXAM_STATUS.START,
    duration: 180,
    numberOfQuestions: 50,
    minPercentage: 70,
    allowedChances: 1,
    examCategory: EXAM_CATEGORIES.FINAL,
    description: 'امتحان شامل في أساسيات الإنشاءات والتصميم المعماري',
    educationLevel: EDUCATION_LEVELS.UNIVERSITY,
    subjectCategory: SUBJECT_CATEGORIES.ENGINEERING,
    answerDisplayType: ANSWER_DISPLAY_TYPE.POST_EXAM,
    startDate: '2025-06-18T09:00:00Z',
    endDate: '2025-06-18T12:00:00Z',
    instructions: [
      'امتحان واحد فقط بدون إعادة',
      'يسمح بآلة حاسبة علمية',
      'أجب على جميع الأسئلة بدقة'
    ],
    topics: ['تصميم الخرسانة المسلحة', 'حساب الأحمال', 'ميكانيكا التربة', 'المقاومة والمواد'],
    difficulty: 'hard',
    estimatedTime: 170,
    tags: ['هندسة', 'إنشاءات', 'تصميم']
  }
];
