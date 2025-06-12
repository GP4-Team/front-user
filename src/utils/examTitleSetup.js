// src/utils/examTitleSetup.js
/**
 * إعداد وتخصيص أسماء الامتحانات
 * Setup and customization for exam titles
 */

import { 
  addSubjectTranslation, 
  addExamTypeTranslation,
  SUBJECT_TRANSLATIONS,
  EXAM_TYPE_TRANSLATIONS
} from './examTitleFormatter';

/**
 * إضافة ترجمات إضافية للمواد
 * Add additional subject translations
 */
export function setupAdditionalSubjects() {
  // إضافة المزيد من المواد حسب الحاجة
  const additionalSubjects = [
    { ar: 'علوم الحاسوب', en: 'Computer Science' },
    { ar: 'الرياضيات المتقدمة', en: 'Advanced Mathematics' },
    { ar: 'التاريخ', en: 'History' },
    { ar: 'الجغرافيا', en: 'Geography' },
    { ar: 'التربية الإسلامية', en: 'Islamic Education' },
    { ar: 'التربية الوطنية', en: 'Civic Education' },
    { ar: 'الفلسفة', en: 'Philosophy' },
    { ar: 'علم النفس', en: 'Psychology' },
    { ar: 'الاقتصاد', en: 'Economics' },
    { ar: 'إدارة الأعمال', en: 'Business Administration' },
    { ar: 'التسويق', en: 'Marketing' },
    { ar: 'المحاسبة', en: 'Accounting' },
    { ar: 'الهندسة المدنية', en: 'Civil Engineering' },
    { ar: 'الهندسة الكهربائية', en: 'Electrical Engineering' },
    { ar: 'الهندسة الميكانيكية', en: 'Mechanical Engineering' },
    { ar: 'هندسة البرمجيات', en: 'Software Engineering' },
    { ar: 'أمن المعلومات', en: 'Information Security' },
    { ar: 'الذكاء الاصطناعي', en: 'Artificial Intelligence' },
    { ar: 'علم البيانات', en: 'Data Science' },
    { ar: 'التصميم الجرافيكي', en: 'Graphic Design' }
  ];

  additionalSubjects.forEach(subject => {
    addSubjectTranslation(subject.ar, subject.en);
  });
}

/**
 * إضافة ترجمات إضافية لأنواع الامتحانات
 * Add additional exam type translations
 */
export function setupAdditionalExamTypes() {
  const additionalTypes = [
    { ar: 'امتحان عملي', en: 'Practical Exam' },
    { ar: 'امتحان شفهي', en: 'Oral Exam' },
    { ar: 'مشروع تخرج', en: 'Graduation Project' },
    { ar: 'بحث', en: 'Research Paper' },
    { ar: 'عرض تقديمي', en: 'Presentation' },
    { ar: 'ورشة عمل', en: 'Workshop' },
    { ar: 'تقييم أداء', en: 'Performance Assessment' },
    { ar: 'اختبار قبول', en: 'Admission Test' },
    { ar: 'اختبار تحديد مستوى', en: 'Placement Test' },
    { ar: 'اختبار الكفاءة', en: 'Competency Test' }
  ];

  additionalTypes.forEach(type => {
    addExamTypeTranslation(type.ar, type.en);
  });
}

/**
 * تهيئة جميع الترجمات الإضافية
 * Initialize all additional translations
 */
export function initializeExamTitleTranslations() {
  setupAdditionalSubjects();
  setupAdditionalExamTypes();
  
  console.log('✅ Exam title translations initialized');
  console.log('📚 Available subjects:', Object.keys(SUBJECT_TRANSLATIONS).length);
  console.log('📝 Available exam types:', Object.keys(EXAM_TYPE_TRANSLATIONS).length);
}

/**
 * إضافة مواد مخصصة من البيانات الفعلية
 * Add custom subjects from actual data
 */
export function addCustomSubjectsFromData(examData) {
  if (!Array.isArray(examData)) return;

  examData.forEach(exam => {
    const subjectName = exam.course?.name || exam.courseName;
    if (subjectName && !SUBJECT_TRANSLATIONS[subjectName]) {
      // إضافة المادة كما هي إذا لم تكن موجودة
      addSubjectTranslation(subjectName, subjectName);
      console.log(`📚 Added new subject: ${subjectName}`);
    }
  });
}

export default {
  initializeExamTitleTranslations,
  setupAdditionalSubjects,
  setupAdditionalExamTypes,
  addCustomSubjectsFromData
};
