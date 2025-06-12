// src/utils/examTitleFormatter.js
/**
 * مُنسق أسماء الامتحانات - لتحويل الأسماء من الـ Backend إلى أسماء مناسبة للعرض
 * Exam Title Formatter - Convert backend names to user-friendly display names
 */

/**
 * قاموس ترجمة أسماء المواد
 * Subject name translation dictionary
 */
const SUBJECT_TRANSLATIONS = {
  // الرياضيات - Mathematics
  'الجبر الأساسي': {
    ar: 'الجبر الأساسي',
    en: 'Basic Algebra'
  },
  'التفاضل والتكامل': {
    ar: 'التفاضل والتكامل',
    en: 'Calculus'
  },
  'الهندسة': {
    ar: 'الهندسة',
    en: 'Geometry'
  },
  'الإحصاء': {
    ar: 'الإحصاء',
    en: 'Statistics'
  },
  
  // العلوم - Sciences
  'الكيمياء العامة': {
    ar: 'الكيمياء العامة',
    en: 'General Chemistry'
  },
  'الفيزياء': {
    ar: 'الفيزياء',
    en: 'Physics'
  },
  'الأحياء': {
    ar: 'الأحياء',
    en: 'Biology'
  },
  
  // اللغات - Languages
  'الأدب العربي': {
    ar: 'الأدب العربي',
    en: 'Arabic Literature'
  },
  'اللغة الإنجليزية': {
    ar: 'اللغة الإنجليزية',
    en: 'English Language'
  },
  
  // التكنولوجيا - Technology
  'قواعد البيانات': {
    ar: 'قواعد البيانات',
    en: 'Database Systems'
  },
  'البرمجة': {
    ar: 'البرمجة',
    en: 'Programming'
  },
  'شبكات الحاسوب': {
    ar: 'شبكات الحاسوب',
    en: 'Computer Networks'
  }
};

/**
 * قاموس ترجمة أنواع الامتحانات
 * Exam type translation dictionary
 */
const EXAM_TYPE_TRANSLATIONS = {
  'تقييم': {
    ar: 'تقييم',
    en: 'Assessment'
  },
  'اختبار': {
    ar: 'اختبار',
    en: 'Test'
  },
  'الاختبار النهائي': {
    ar: 'الاختبار النهائي',
    en: 'Final Exam'
  },
  'اختبار قصير': {
    ar: 'اختبار قصير',
    en: 'Quiz'
  },
  'اختبار نصف الفصل': {
    ar: 'اختبار نصف الفصل',
    en: 'Midterm Exam'
  },
  'اختبار شهري': {
    ar: 'اختبار شهري',
    en: 'Monthly Test'
  },
  'اختبار تشخيصي': {
    ar: 'اختبار تشخيصي',
    en: 'Diagnostic Test'
  },
  'اختبار تجريبي': {
    ar: 'اختبار تجريبي',
    en: 'Practice Test'
  },
  'تقييم مستمر': {
    ar: 'تقييم مستمر',
    en: 'Continuous Assessment'
  }
};

/**
 * قاموس ترجمة أرقام الدروس
 * Lesson number translation dictionary
 */
const LESSON_TRANSLATIONS = {
  ar: (num) => `الدرس ${num}`,
  en: (num) => `Lesson ${num}`
};

/**
 * استخراج معلومات من اسم الامتحان الأصلي
 * Extract information from original exam name
 * @param {string} originalName - الاسم الأصلي من الـ Backend
 * @returns {object} معلومات الامتحان المستخرجة
 */
function parseExamName(originalName) {
  if (!originalName) return null;

  // نمط للتحليل: "نوع المادة - رقم الدرس" أو "نوع - المادة"
  // Pattern: "Type Subject - Lesson X" or "Type - Subject"
  
  const patterns = [
    // تقييم الجبر الأساسي - الدرس 6
    /^(تقييم|اختبار|الاختبار النهائي|اختبار قصير|اختبار نصف الفصل|اختبار شهري|اختبار تشخيصي|اختبار تجريبي|تقييم مستمر)\s+(.+?)\s*-\s*الدرس\s+(\d+)$/,
    
    // الاختبار النهائي - الكيمياء العامة
    /^(تقييم|اختبار|الاختبار النهائي|اختبار قصير|اختبار نصف الفصل|اختبار شهري|اختبار تشخيصي|اختبار تجريبي|تقييم مستمر)\s*-\s*(.+)$/,
    
    // تقييم الكيمياء العامة
    /^(تقييم|اختبار|الاختبار النهائي|اختبار قصير|اختبار نصف الفصل|اختبار شهري|اختبار تشخيصي|اختبار تجريبي|تقييم مستمر)\s+(.+)$/
  ];

  for (const pattern of patterns) {
    const match = originalName.match(pattern);
    if (match) {
      return {
        type: match[1],
        subject: match[2],
        lesson: match[3] || null,
        original: originalName
      };
    }
  }

  // إذا لم يتطابق مع أي نمط، ارجع الاسم كما هو
  return {
    type: null,
    subject: originalName,
    lesson: null,
    original: originalName
  };
}

/**
 * تنسيق اسم الامتحان للعرض
 * Format exam name for display
 * @param {string} originalName - الاسم الأصلي من الـ Backend
 * @param {string} language - اللغة المطلوبة ('ar' أو 'en')
 * @param {object} options - خيارات إضافية
 * @returns {string} الاسم المنسق للعرض
 */
export function formatExamTitle(originalName, language = 'ar', options = {}) {
  const {
    includeSubject = true,
    includeType = true,
    includeLesson = true,
    shortFormat = false
  } = options;

  const parsed = parseExamName(originalName);
  if (!parsed) return originalName;

  const parts = [];

  // إضافة نوع الامتحان
  if (includeType && parsed.type) {
    const typeTranslation = EXAM_TYPE_TRANSLATIONS[parsed.type];
    if (typeTranslation) {
      parts.push(typeTranslation[language] || parsed.type);
    } else {
      parts.push(parsed.type);
    }
  }

  // إضافة اسم المادة
  if (includeSubject && parsed.subject) {
    const subjectTranslation = SUBJECT_TRANSLATIONS[parsed.subject];
    if (subjectTranslation) {
      parts.push(subjectTranslation[language] || parsed.subject);
    } else {
      parts.push(parsed.subject);
    }
  }

  // إضافة رقم الدرس
  if (includeLesson && parsed.lesson) {
    const lessonText = LESSON_TRANSLATIONS[language](parsed.lesson);
    parts.push(lessonText);
  }

  // تنسيق النص النهائي
  if (shortFormat) {
    // نسق مختصر
    return parts.slice(-2).join(' - ');
  } else {
    // نسق كامل
    return parts.join(' - ');
  }
}

/**
 * إنشاء اسم مختصر للامتحان
 * Generate short exam title
 * @param {string} originalName - الاسم الأصلي
 * @param {string} language - اللغة
 * @returns {string} الاسم المختصر
 */
export function getShortExamTitle(originalName, language = 'ar') {
  return formatExamTitle(originalName, language, { shortFormat: true });
}

/**
 * إنشاء اسم مناسب للبطاقة
 * Generate card-friendly exam title
 * @param {string} originalName - الاسم الأصلي
 * @param {string} language - اللغة
 * @returns {string} الاسم المناسب للبطاقة
 */
export function getCardExamTitle(originalName, language = 'ar') {
  const parsed = parseExamName(originalName);
  if (!parsed) return originalName;

  // للبطاقات، نريد عرض المادة ورقم الدرس بشكل أساسي
  const parts = [];

  // اسم المادة
  if (parsed.subject) {
    const subjectTranslation = SUBJECT_TRANSLATIONS[parsed.subject];
    if (subjectTranslation) {
      parts.push(subjectTranslation[language] || parsed.subject);
    } else {
      parts.push(parsed.subject);
    }
  }

  // رقم الدرس
  if (parsed.lesson) {
    const lessonText = LESSON_TRANSLATIONS[language](parsed.lesson);
    parts.push(lessonText);
  }

  return parts.join(' - ') || originalName;
}

/**
 * إنشاء عنوان فرعي للامتحان (نوع الامتحان)
 * Generate exam subtitle (exam type)
 * @param {string} originalName - الاسم الأصلي
 * @param {string} language - اللغة
 * @returns {string} العنوان الفرعي
 */
export function getExamSubtitle(originalName, language = 'ar') {
  const parsed = parseExamName(originalName);
  if (!parsed || !parsed.type) return '';

  const typeTranslation = EXAM_TYPE_TRANSLATIONS[parsed.type];
  return typeTranslation ? typeTranslation[language] : parsed.type;
}

/**
 * إضافة ترجمة جديدة لمادة
 * Add new subject translation
 * @param {string} arabicName - الاسم بالعربية
 * @param {string} englishName - الاسم بالإنجليزية
 */
export function addSubjectTranslation(arabicName, englishName) {
  SUBJECT_TRANSLATIONS[arabicName] = {
    ar: arabicName,
    en: englishName
  };
}

/**
 * إضافة ترجمة جديدة لنوع امتحان
 * Add new exam type translation
 * @param {string} arabicType - النوع بالعربية
 * @param {string} englishType - النوع بالإنجليزية
 */
export function addExamTypeTranslation(arabicType, englishType) {
  EXAM_TYPE_TRANSLATIONS[arabicType] = {
    ar: arabicType,
    en: englishType
  };
}

// تصدير الثوابت للاستخدام الخارجي
export { SUBJECT_TRANSLATIONS, EXAM_TYPE_TRANSLATIONS, LESSON_TRANSLATIONS };
