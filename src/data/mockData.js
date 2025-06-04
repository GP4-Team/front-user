// src/data/mockData.js

// بيانات الدورات المميزة
export const FEATURED_COURSES = [
  {
    id: 1,
    title: "أساسيات البرمجة للمبتدئين",
    description: "تعلم أساسيات البرمجة وتطوير المنطق البرمجي من الصفر",
    thumbnail: "/images/courses/programming-basics.jpg",
    instructor: "أحمد محمد",
    rating: 4.8,
    students_count: 1240,
    price: 199,
    category_id: 1,
    level_id: 1
  },
  {
    id: 2,
    title: "تطوير تطبيقات الويب مع React",
    description: "دورة شاملة في تطوير واجهات المستخدم التفاعلية باستخدام React",
    thumbnail: "/images/courses/react-course.jpg",
    instructor: "سارة علي",
    rating: 4.9,
    students_count: 950,
    price: 299,
    category_id: 2,
    level_id: 2
  },
  {
    id: 3,
    title: "التصميم الجرافيكي للمبتدئين",
    description: "تعلم أساسيات التصميم الجرافيكي وبرامج Adobe الأساسية",
    thumbnail: "/images/courses/graphic-design.jpg",
    instructor: "محمد أحمد",
    rating: 4.7,
    students_count: 1120,
    price: 249,
    category_id: 4,
    level_id: 1
  },
  {
    id: 4,
    title: "التسويق الرقمي الشامل",
    description: "دورة شاملة في استراتيجيات التسويق الرقمي ووسائل التواصل الاجتماعي",
    thumbnail: "/images/courses/digital-marketing.jpg",
    instructor: "ليلى حسن",
    rating: 4.6,
    students_count: 890,
    price: 349,
    category_id: 5,
    level_id: 2
  }
];

// بيانات الاختبارات المميزة
export const TOP_EXAMS = [
  {
    id: 1,
    title: "اختبار الفيزياء للصف الثالث الثانوي",
    subject: "الفيزياء",
    level: "متقدم",
    questions_count: 30,
    duration: 60,
    start_date: "2025-05-25T14:00:00Z",
    end_date: "2025-05-25T15:00:00Z",
    thumbnail: "/images/exams/physics-exam.jpg"
  },
  {
    id: 2,
    title: "اختبار الكيمياء الشامل",
    subject: "الكيمياء",
    level: "متوسط",
    questions_count: 25,
    duration: 45,
    start_date: "2025-05-26T10:00:00Z",
    end_date: "2025-05-26T10:45:00Z",
    thumbnail: "/images/exams/chemistry-exam.jpg"
  },
  {
    id: 3,
    title: "اختبار الرياضيات التحضيري",
    subject: "الرياضيات",
    level: "مبتدئ",
    questions_count: 20,
    duration: 30,
    start_date: "2025-05-27T15:30:00Z",
    end_date: "2025-05-27T16:00:00Z",
    thumbnail: "/images/exams/math-exam.jpg"
  },
  {
    id: 4,
    title: "اختبار اللغة الإنجليزية",
    subject: "اللغة الإنجليزية",
    level: "متوسط",
    questions_count: 40,
    duration: 60,
    start_date: "2025-05-28T12:00:00Z",
    end_date: "2025-05-28T13:00:00Z",
    thumbnail: "/images/exams/english-exam.jpg"
  }
];
