// import { useState } from 'react';

// const Sidebar = () => {
//   const [activeSection, setActiveSection] = useState('overview');
//   const [currentLang, setCurrentLang] = useState(localStorage.getItem('language') || 'en');

//   useEffect(() => {
//     const handleLanguageChange = () => {
//       const newLang = localStorage.getItem('language') || 'en';
//       setCurrentLang(newLang);
//     };

//     // Listen for storage changes
//     window.addEventListener('storage', handleLanguageChange);
    
//     // Also listen for custom event
//     window.addEventListener('languageChange', handleLanguageChange);

//     return () => {
//       window.removeEventListener('storage', handleLanguageChange);
//       window.removeEventListener('languageChange', handleLanguageChange);
//     };
//   }, []);

//   const translations = {
//     en: {
//       menu: {
//         main: 'Main Menu',
//         users: 'Users Menu',
//         learning: 'Learning Support',
//         schedules: 'Schedules and Appointments',
//         academic: 'Academic Curricula',
//         financial: 'Financial Menu'
//       },
//       items: {
//         overview: 'Overview',
//         studentManagement: 'Student Management',
//         teacherManagement: 'Teacher Management',
//         userManagement: 'User Management',
//         questionBank: 'Question and Bank',
//         educationalContent: 'Educational Content',
//         semesterManagement: 'Semester Management',
//         categories: 'Categories and Stages',
//         sections: 'Sections and Materials',
//         academicParts: 'Academic Parts',
//         onlinePayment: 'Online Payment',
//         balanceCards: 'Balance Cards'
//       }
//     },
//     ar: {
//       menu: {
//         main: 'القائمة الرئيسية',
//         users: 'قائمة المستخدمين',
//         learning: 'الدعم التعليمي',
//         schedules: 'الجداول والمواعيد',
//         academic: 'المناهج الدراسية',
//         financial: 'القائمة المالية'
//       },
//       items: {
//         overview: 'نظرة عامة',
//         studentManagement: 'إدارة الطلاب',
//         teacherManagement: 'إدارة المعلمين',
//         userManagement: 'إدارة المستخدمين',
//         questionBank: 'بنك الأسئلة',
//         educationalContent: 'المحتوى التعليمي',
//         semesterManagement: 'إدارة الفصول الدراسية',
//         categories: 'الفئات والمراحل',
//         sections: 'الأقسام والمواد',
//         academicParts: 'الأجزاء الأكاديمية',
//         onlinePayment: 'الدفع عبر الإنترنت',
//         balanceCards: 'بطاقات الرصيد'
//       }
//     }
//   };

//   const t = (key) => {
//     const keys = key.split('.');
//     return keys.reduce((obj, k) => obj[k], translations[currentLang]);
//   };

//   const menuSections = {
//     main: {
//       title: t('menu.main'),
//       items: [
//         { id: 'overview', label: t('items.overview'), icon: 'grid' }
//       ]
//     },
//     users: {
//       title: t('menu.users'),
//       items: [
//         { id: 'student-management', label: t('items.studentManagement'), icon: 'users' },
//         { id: 'teacher-management', label: t('items.teacherManagement'), icon: 'user-check' },
//         { id: 'user-management', label: t('items.userManagement'), icon: 'users' }
//       ]
//     },
//     learning: {
//       title: t('menu.learning'),
//       items: [
//         { id: 'question-bank', label: t('items.questionBank'), icon: 'help-circle' },
//         { id: 'educational-content', label: t('items.educationalContent'), icon: 'book-open' }
//       ]
//     },
//     schedules: {
//       title: t('menu.schedules'),
//       items: [
//         { id: 'semester-management', label: t('items.semesterManagement'), icon: 'calendar' }
//       ]
//     },
//     academic: {
//       title: t('menu.academic'),
//       items: [
//         { id: 'categories', label: t('items.categories'), icon: 'layers' },
//         { id: 'sections', label: t('items.sections'), icon: 'folder' },
//         { id: 'academic-parts', label: t('items.academicParts'), icon: 'book' }
//       ]
//     },
//     financial: {
//       title: t('menu.financial'),
//       items: [
//         { id: 'online-payment', label: t('items.onlinePayment'), icon: 'credit-card' },
//         { id: 'balance-cards', label: t('items.balanceCards'), icon: 'credit-card' }
//       ]
//     }
//   };

//   const renderIcon = (iconName) => {
//     return (
//       <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//       </svg>
//     );
//   };

//   return (
//     <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-[calc(100vh-4rem)] overflow-y-auto">
//       {Object.entries(menuSections).map(([sectionKey, section]) => (
//         <div key={sectionKey} className="px-3 py-4">
//           <h2 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
//             {section.title}
//           </h2>
//           <div className="mt-3 space-y-1">
//             {section.items.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => setActiveSection(item.id)}
//                 className={`
//                   flex items-center w-full px-3 py-2 text-sm rounded-lg
//                   ${activeSection === item.id
//                     ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
//                     : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
//                   }
//                 `}
//               >
//                 <span className={`${currentLang === 'ar' ? 'ml-3' : 'mr-3'}`}>
//                   {renderIcon(item.icon)}
//                 </span>
//                 {item.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       ))}
//     </aside>
//   );
// };

// export default Sidebar;