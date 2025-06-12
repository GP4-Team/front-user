// src/data/mockExamsData/questions.js
import { QUESTION_TYPE, DIFFICULTY_LEVELS } from './constants';

/**
 * أسئلة الامتحانات الوهمية
 */
export const mockExamQuestions = {
  // أسئلة امتحان الرياضيات - الجبر الأساسي
  'exam_start_001': [
    {
      id: 'q1_math_001',
      questionNumber: 1,
      type: QUESTION_TYPE.MULTIPLE_CHOICE,
      text: 'إذا كان x + 5 = 12، فما قيمة x؟',
      image: null,
      options: [
        { id: 'a', text: '7', isCorrect: true },
        { id: 'b', text: '17', isCorrect: false },
        { id: 'c', text: '5', isCorrect: false },
        { id: 'd', text: '12', isCorrect: false }
      ],
      correctAnswer: 'a',
      explanation: 'بطرح 5 من طرفي المعادلة: x = 12 - 5 = 7',
      points: 2,
      difficulty: DIFFICULTY_LEVELS.EASY,
      topic: 'المعادلات الخطية',
      timeLimit: 60, // ثواني لكل سؤال
      hints: ['استخدم العكس الجمعي', 'اطرح 5 من الطرفين']
    },
    {
      id: 'q2_math_001',
      questionNumber: 2,
      type: QUESTION_TYPE.MULTIPLE_CHOICE,
      text: 'ما هو ناتج حل المعادلة: 2x - 3 = 7؟',
      image: null,
      options: [
        { id: 'a', text: '2', isCorrect: false },
        { id: 'b', text: '5', isCorrect: true },
        { id: 'c', text: '10', isCorrect: false },
        { id: 'd', text: '4', isCorrect: false }
      ],
      correctAnswer: 'b',
      explanation: '2x = 7 + 3 = 10، إذن x = 10 ÷ 2 = 5',
      points: 3,
      difficulty: DIFFICULTY_LEVELS.MEDIUM,
      topic: 'المعادلات الخطية',
      timeLimit: 90,
      hints: ['اجمع 3 للطرفين أولاً', 'ثم اقسم على 2']
    },
    {
      id: 'q3_math_001',
      questionNumber: 3,
      type: QUESTION_TYPE.TRUE_FALSE,
      text: 'المعادلة 3x + 6 = 0 لها حل واحد فقط.',
      options: [
        { id: 'true', text: 'صحيح', isCorrect: true },
        { id: 'false', text: 'خطأ', isCorrect: false }
      ],
      correctAnswer: 'true',
      explanation: 'المعادلة الخطية لها حل واحد فقط وهو x = -2',
      points: 2,
      difficulty: DIFFICULTY_LEVELS.EASY,
      topic: 'المعادلات الخطية',
      timeLimit: 45
    }
  ],

  // أسئلة امتحان الفيزياء - الكهرباء والمغناطيسية
  'exam_continue_002': [
    {
      id: 'q1_physics_002',
      questionNumber: 1,
      type: QUESTION_TYPE.MULTIPLE_CHOICE,
      text: 'ما هو قانون أوم؟',
      image: '/images/questions/ohms_law_diagram.jpg',
      options: [
        { id: 'a', text: 'V = I × R', isCorrect: true },
        { id: 'b', text: 'V = I ÷ R', isCorrect: false },
        { id: 'c', text: 'V = I + R', isCorrect: false },
        { id: 'd', text: 'V = I - R', isCorrect: false }
      ],
      correctAnswer: 'a',
      explanation: 'قانون أوم ينص على أن الجهد يساوي التيار مضروباً في المقاومة',
      points: 2,
      difficulty: DIFFICULTY_LEVELS.EASY,
      topic: 'قوانين أوم',
      timeLimit: 60
    },
    {
      id: 'q2_physics_002',
      questionNumber: 2,
      type: QUESTION_TYPE.FILL_BLANK,
      text: 'إذا كان التيار في دائرة كهربائية 2 أمبير والمقاومة 5 أوم، فإن الجهد يساوي _____ فولت.',
      correctAnswer: '10',
      acceptableAnswers: ['10', '١٠', '10 فولت'],
      explanation: 'باستخدام قانون أوم: V = I × R = 2 × 5 = 10 فولت',
      points: 3,
      difficulty: DIFFICULTY_LEVELS.MEDIUM,
      topic: 'قوانين أوم',
      timeLimit: 90
    }
  ],

  // أسئلة امتحان الكيمياء العضوية
  'exam_retry_003': [
    {
      id: 'q1_chemistry_003',
      questionNumber: 1,
      type: QUESTION_TYPE.MULTIPLE_CHOICE,
      text: 'أي من المركبات التالية يحتوي على رابطة مضاعفة؟',
      options: [
        { id: 'a', text: 'الميثان (CH₄)', isCorrect: false },
        { id: 'b', text: 'الإيثين (C₂H₄)', isCorrect: true },
        { id: 'c', text: 'البروبان (C₃H₈)', isCorrect: false },
        { id: 'd', text: 'البيوتان (C₄H₁₀)', isCorrect: false }
      ],
      correctAnswer: 'b',
      explanation: 'الإيثين يحتوي على رابطة مضاعفة بين ذرتي الكربون',
      points: 3,
      difficulty: DIFFICULTY_LEVELS.MEDIUM,
      topic: 'المركبات العضوية',
      timeLimit: 75
    }
  ]
};

/**
 * إعدادات عرض الأسئلة
 */
export const questionDisplaySettings = {
  timing: {
    showTimer: true,
    showTimeWarning: true,
    warningThreshold: 30,
    autoSubmitOnTimeout: true
  },
  hints: {
    maxHintsPerQuestion: 2,
    hintPenalty: 0.5,
    showHintButton: true
  },
  answers: {
    shuffleOptions: true,
    allowMultipleAttempts: false,
    showExplanationImmediately: false,
    highlightCorrectAnswer: true
  },
  navigation: {
    allowBackward: true,
    allowSkip: true,
    showProgressBar: true,
    showQuestionNumber: true,
    markIncompleteQuestions: true
  }
};
