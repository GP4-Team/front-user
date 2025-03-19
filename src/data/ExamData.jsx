// data/examData.js
export const mockExams = [
  {
    id: "exam1",
    title: "تدريب الباب الاول",
    subject: "أساسيات و مفاهيم في التيار الكهربي",
    date: "2025-03-20",
    time: "10:00 AM",
    duration: 45, // minutes
    numberOfQuestions: 50,
    status: "available", // available, in-progress, finished
    instructions: [
      "يجب الإجابة على جميع الأسئلة",
      "لا يسمح باستخدام الكتب أو المذكرات",
      "لكل سؤال إجابة واحدة صحيحة فقط",
      "الوقت المحدد للامتحان 45 دقيقة",
      "النجاح يتطلب الحصول على 70% على الأقل",
    ],
  },
  {
    id: "exam2",
    title: "امتحان نصف الفصل",
    subject: "ميكانيكا الموائع",
    date: "2025-03-22",
    time: "12:30 PM",
    duration: 60,
    numberOfQuestions: 30,
    status: "available",
    instructions: [
      "يجب الإجابة على جميع الأسئلة",
      "لا يسمح باستخدام الآلة الحاسبة",
      "الوقت المحدد للامتحان 60 دقيقة",
    ],
  },
  {
    id: "exam3",
    title: "امتحان نهاية الفصل",
    subject: "برمجة الكمبيوتر",
    date: "2025-03-15",
    time: "09:00 AM",
    duration: 90,
    numberOfQuestions: 45,
    status: "finished",
    score: 82,
    instructions: [
      "يجب الإجابة على جميع الأسئلة",
      "يسمح باستخدام الورقة المرجعية فقط",
      "الوقت المحدد للامتحان 90 دقيقة",
    ],
  },
  {
    id: "exam4",
    title: "اختبار عملي",
    subject: "قواعد البيانات",
    date: "2025-03-18",
    time: "14:00 PM",
    duration: 120,
    numberOfQuestions: 25,
    status: "in-progress",
    instructions: [
      "يجب الإجابة على جميع الأسئلة",
      "يسمح باستخدام SQL documentation",
      "الوقت المحدد للامتحان 120 دقيقة",
    ],
  },
];

// أسئلة نموذجية للاختبار
export const sampleQuestions = [
  {
    id: 1,
    text: "أوجد قراءة الاميتر الذي بالشكل",
    image: "/api/placeholder/400/200",
    options: [
      { id: 1, text: "15 امبير" },
      { id: 2, text: "20 امبير" },
      { id: 3, text: "1.5 امبير" },
      { id: 4, text: "25 امبير" },
    ],
  },
  {
    id: 2,
    text: "أوجد قراءة الفولتميتر الذي بالشكل",
    image: "/api/placeholder/400/200",
    options: [
      { id: 1, text: "5 فولت" },
      { id: 2, text: "10 فولت" },
      { id: 3, text: "15 فولت" },
      { id: 4, text: "20 فولت" },
    ],
  },
  {
    id: 3,
    text: "حساب المقاومة المكافئة للدائرة",
    image: "/api/placeholder/400/200",
    options: [
      { id: 1, text: "10 أوم" },
      { id: 2, text: "5 أوم" },
      { id: 3, text: "15 أوم" },
      { id: 4, text: "20 أوم" },
    ],
  },
  {
    id: 4,
    text: "المسافة التي يقطعها الجسم المتحرك هي",
    options: [
      { id: 1, text: "مقدار فيزيائي قياسي" },
      { id: 2, text: "مقدار فيزيائي متجه" },
      { id: 3, text: "مقدار رياضي" },
      { id: 4, text: "لا شيء مما سبق" },
    ],
  },
  {
    id: 5,
    text: "أي مما يلي يعد من خصائص التيار الكهربي؟",
    options: [
      { id: 1, text: "يسري من القطب السالب إلى الموجب" },
      { id: 2, text: "يسري من القطب الموجب إلى السالب" },
      { id: 3, text: "يسري في خط منحني" },
      { id: 4, text: "لا يتأثر بوجود مقاومة" },
    ],
  },
];

// دالة مساعدة للعثور على امتحان بواسطة المعرف
export const findExamById = (examId) => {
  return mockExams.find((exam) => exam.id === examId) || null;
};
