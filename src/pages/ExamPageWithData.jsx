// import React, { useState, useEffect } from "react";

// // Adjust this import path to match your project structure
// import { useTheme } from "../contexts/ThemeContext";
// // If the above path doesn't work, try one of these:
// // import { useTheme } from '../contexts/ThemeContext';
// // import { useTheme } from '../context/ThemeContext';

// // SVG Icons
// const CheckCircleIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//     <polyline points="22 4 12 14.01 9 11.01"></polyline>
//   </svg>
// );

// // Dark mode icons
// const SunIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="5"></circle>
//     <line x1="12" y1="1" x2="12" y2="3"></line>
//     <line x1="12" y1="21" x2="12" y2="23"></line>
//     <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
//     <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
//     <line x1="1" y1="12" x2="3" y2="12"></line>
//     <line x1="21" y1="12" x2="23" y2="12"></line>
//     <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
//     <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
//   </svg>
// );

// const MoonIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
//   </svg>
// );

// // Add the EduaraLogo component
// const EduaraLogo = () => {
//   const { isDarkMode } = useTheme();

//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 400 200"
//       className="h-14"
//     >
//       {/* Simple graduation cap icon - with modern muted colors */}
//       <path
//         d="M70 90 L110 70 L150 90 L110 110 Z"
//         fill={isDarkMode ? "#607D8B" : "#546E7A"}
//       />
//       <line
//         x1="110"
//         y1="110"
//         x2="110"
//         y2="130"
//         stroke={isDarkMode ? "#607D8B" : "#546E7A"}
//         strokeWidth="3"
//         strokeLinecap="round"
//       />
//       <circle
//         cx="110"
//         cy="130"
//         r="4"
//         fill={isDarkMode ? "#607D8B" : "#546E7A"}
//       />
//       <circle
//         cx="110"
//         cy="90"
//         r="3"
//         fill={isDarkMode ? "#81C784" : "#A5D6A7"}
//         opacity="0.9"
//       />

//       {/* Simple yet modern wordmark - Eduara only with modern color */}
//       <text
//         x="170"
//         y="105"
//         fontFamily="Arial, sans-serif"
//         fontSize="55"
//         fontWeight="bold"
//         fill={isDarkMode ? "#ECEFF1" : "#455A64"}
//       >
//         Eduara
//       </text>

//       {/* Enhanced accent line - subtle complementary color */}
//       <line
//         x1="170"
//         y1="120"
//         x2="240"
//         y2="120"
//         stroke={isDarkMode ? "#81C784" : "#A5D6A7"}
//         strokeWidth="3"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// };

// const XCircleIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="10"></circle>
//     <line x1="15" y1="9" x2="9" y2="15"></line>
//     <line x1="9" y1="9" x2="15" y2="15"></line>
//   </svg>
// );

// const ClockIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="10"></circle>
//     <polyline points="12 6 12 12 16 14"></polyline>
//   </svg>
// );

// const AlertCircleIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="10"></circle>
//     <line x1="12" y1="8" x2="12" y2="12"></line>
//     <line x1="12" y1="16" x2="12.01" y2="16"></line>
//   </svg>
// );

// const FlagIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
//     <line x1="4" y1="22" x2="4" y2="15"></line>
//   </svg>
// );

// const ChevronLeftIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polyline points="15 18 9 12 15 6"></polyline>
//   </svg>
// );

// const ChevronRightIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polyline points="9 18 15 12 9 6"></polyline>
//   </svg>
// );

// const XIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <line x1="18" y1="6" x2="6" y2="18"></line>
//     <line x1="6" y1="6" x2="18" y2="18"></line>
//   </svg>
// );

// const ListIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <line x1="8" y1="6" x2="21" y2="6"></line>
//     <line x1="8" y1="12" x2="21" y2="12"></line>
//     <line x1="8" y1="18" x2="21" y2="18"></line>
//     <line x1="3" y1="6" x2="3.01" y2="6"></line>
//     <line x1="3" y1="12" x2="3.01" y2="12"></line>
//     <line x1="3" y1="18" x2="3.01" y2="18"></line>
//   </svg>
// );

// const PenToolIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
//     <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
//     <path d="M2 2l7.586 7.586"></path>
//     <circle cx="11" cy="11" r="2"></circle>
//   </svg>
// );

// const MenuIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <line x1="3" y1="12" x2="21" y2="12"></line>
//     <line x1="3" y1="6" x2="21" y2="6"></line>
//     <line x1="3" y1="18" x2="21" y2="18"></line>
//   </svg>
// );

// const OnlineExam = () => {
//   // Use the theme context
//   const { isDarkMode, toggleTheme } = useTheme();

//   // States for exam data
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [timer, setTimer] = useState(300); // 5 minutes in seconds
//   const [isTimerActive, setIsTimerActive] = useState(true);
//   const [examStatus, setExamStatus] = useState("in-progress"); // 'in-progress', 'completed', 'time-up', 'not-available'
//   const [showQuestionsNav, setShowQuestionsNav] = useState(false);
//   const [confirmEndExam, setConfirmEndExam] = useState(false);
//   const [examProgress, setExamProgress] = useState(32);
//   const [answers, setAnswers] = useState({});
//   const [examMetrics, setExamMetrics] = useState({
//     correct: 30,
//     wrong: 6,
//     score: 60,
//   });
//   const [showExamProgress, setShowExamProgress] = useState(false);
//   const [showIntro, setShowIntro] = useState(true);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Colors from the palette
//   const colors = {
//     primaryDark: "#546E7A",
//     primaryBase: "#607D8B",
//     primaryLight: "#78909C",
//     primaryLightest: "#B0BEC5",
//     accentPrimary: "#A5D6A7",
//     accentSecondary: "#81C784",
//     textDark: "#455A64",
//     bgLight: "#ECEFF1",
//   };

//   const BellIcon = () => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
//       <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
//     </svg>
//   );

//   // Example exam data
//   const examData = {
//     title: "تدريب الباب الاول",
//     subtitle: "القسم الاول",
//     course: "أساسيات و مفاهيم في التيار الكهربي",
//     totalQuestions: 50,
//     passingGrade: 70,
//     attemptsLeft: 3,
//     questions: [
//       {
//         id: 1,
//         text: "أوجد قراءة الاميتر الذي بالشكل",
//         image: "/api/placeholder/400/200",
//         options: [
//           { id: 1, text: "15 امبير" },
//           { id: 2, text: "20 امبير" },
//           { id: 3, text: "1.5 امبير" },
//           { id: 4, text: "25 امبير" },
//         ],
//         correctAnswer: 3,
//         hasFlagged: false,
//       },
//       {
//         id: 2,
//         text: "أوجد قراءة الفولتميتر الذي بالشكل",
//         image: "/api/placeholder/400/200",
//         options: [
//           { id: 1, text: "5 فولت" },
//           { id: 2, text: "10 فولت" },
//           { id: 3, text: "15 فولت" },
//           { id: 4, text: "20 فولت" },
//         ],
//         correctAnswer: 2,
//         hasFlagged: false,
//       },
//       {
//         id: 3,
//         text: "حساب المقاومة المكافئة للدائرة",
//         image: "/api/placeholder/400/200",
//         options: [
//           { id: 1, text: "10 أوم" },
//           { id: 2, text: "5 أوم" },
//           { id: 3, text: "15 أوم" },
//           { id: 4, text: "20 أوم" },
//         ],
//         correctAnswer: 1,
//         hasFlagged: true,
//       },
//       {
//         id: 4,
//         text: "أوجد قراءة الاميتر الذي بالشكل",
//         image: "/api/placeholder/400/200",
//         options: [
//           { id: 1, text: "15 امبير" },
//           { id: 2, text: "20 امبير" },
//           { id: 3, text: "1.5 امبير" },
//           { id: 4, text: "25 امبير" },
//         ],
//         correctAnswer: 3,
//         hasFlagged: false,
//       },
//       {
//         id: 5,
//         text: "المسافة التي يقطعها الجسم المتحرك هي",
//         options: [
//           { id: 1, text: "مقدار فيزيائي قياسي" },
//           { id: 2, text: "مقدار فيزيائي متجه" },
//           { id: 3, text: "مقدار رياضي" },
//           { id: 4, text: "لا شيء مما سبق" },
//         ],
//         correctAnswer: 1,
//         hasFlagged: false,
//       },
//     ],
//   };

//   // Format time (MM:SS)
//   const formatTime = (timeInSeconds) => {
//     const hours = Math.floor(timeInSeconds / 3600);
//     const minutes = Math.floor((timeInSeconds % 3600) / 60);
//     const seconds = timeInSeconds % 60;

//     return `${hours > 0 ? hours.toString().padStart(2, "0") + ":" : ""}${minutes
//       .toString()
//       .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//   };

//   // Handle timer
//   useEffect(() => {
//     let interval = null;

//     if (isTimerActive && timer > 0 && examStatus === "in-progress") {
//       interval = setInterval(() => {
//         setTimer((prevTimer) => prevTimer - 1);
//       }, 1000);
//     } else if (timer === 0 && examStatus === "in-progress") {
//       setExamStatus("time-up");
//       setConfirmEndExam(true);
//     }

//     return () => clearInterval(interval);
//   }, [timer, isTimerActive, examStatus]);

//   // Navigate to next question
//   const nextQuestion = () => {
//     if (currentQuestion < examData.questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   // Navigate to previous question
//   const prevQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   // Select an answer
//   const selectAnswer = (questionId, optionId) => {
//     setAnswers({
//       ...answers,
//       [questionId]: optionId,
//     });
//   };

//   // Flag current question
//   const flagQuestion = (questionId) => {
//     const updatedQuestions = [...examData.questions];
//     updatedQuestions[currentQuestion].hasFlagged =
//       !updatedQuestions[currentQuestion].hasFlagged;
//     // Note: In a real app, you'd update this to the backend
//   };

//   // End exam
//   const endExam = () => {
//     setExamStatus("completed");
//     setIsTimerActive(false);
//     // Here you would submit answers to backend
//   };

//   // Restart exam
//   const restartExam = () => {
//     setExamStatus("in-progress");
//     setTimer(300);
//     setCurrentQuestion(0);
//     setAnswers({});
//     setIsTimerActive(true);
//     setConfirmEndExam(false);
//     setShowIntro(false);
//   };

//   // Handle reporting a problem
//   const reportProblem = () => {
//     alert("تم تسجيل المشكلة. سيتم مراجعتها من قبل المشرفين.");
//   };

//   // Get question status (answered, flagged, etc.)
//   const getQuestionStatus = (questionId) => {
//     const isAnswered = answers[questionId] !== undefined;
//     const isFlagged = examData.questions.find(
//       (q) => q.id === questionId
//     )?.hasFlagged;

//     if (examStatus === "completed") {
//       const isCorrect =
//         answers[questionId] ===
//         examData.questions.find((q) => q.id === questionId)?.correctAnswer;
//       if (isAnswered) {
//         return isCorrect ? "correct" : "wrong";
//       }
//     }

//     if (isFlagged) return "flagged";
//     if (isAnswered) return "answered";
//     return "unanswered";
//   };

//   // Render site header with dark mode toggle
//   const renderHeader = () => {
//     return (
//       <header
//         className={`${
//           isDarkMode ? "bg-primary-dark" : "bg-white"
//         } shadow-sm fixed top-0 left-0 right-0 z-50 transition-colors duration-300`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-3">
//             {/* Logo */}
//             <div className="flex-shrink-0">
//               <EduaraLogo />
//             </div>

//             {/* Middle section - Exam Title */}
//             <div className="text-right">
//               <h1
//                 className={`text-xl font-bold ${
//                   isDarkMode ? "text-dark" : "text-[#455A64]"
//                 } transition-colors duration-300`}
//               >
//                 {examData.title}
//               </h1>
//               <p
//                 className={`text-sm ${
//                   isDarkMode ? "text-primary-lightest" : "text-[#607D8B]"
//                 } transition-colors duration-300`}
//               >
//                 {examData.subtitle}
//               </p>
//             </div>

//             {/* Dark Mode Toggle */}
//             <button
//               onClick={toggleTheme}
//               className={`p-2 rounded-full ${
//                 isDarkMode
//                   ? "bg-primary-light hover:bg-primary-lightest"
//                   : "bg-[#ECEFF1] hover:bg-[#B0BEC5]"
//               } transition-colors duration-300`}
//               aria-label={
//                 isDarkMode ? "Switch to light mode" : "Switch to dark mode"
//               }
//             >
//               {isDarkMode ? (
//                 <span className="text-dark">
//                   <SunIcon />
//                 </span>
//               ) : (
//                 <span className="text-[#455A64]">
//                   <MoonIcon />
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>
//       </header>
//     );
//   };

//   // Render exam header
//   const renderExamHeader = () => {
//     return (
//       <div
//         className={`flex justify-between items-center py-4 ${
//           isDarkMode ? "border-primary-dark" : "border-b"
//         } mb-6 transition-colors duration-300`}
//       >
//         <div className="flex items-center">
//           {examStatus === "completed" ? (
//             <div className="flex items-center">
//               <div className="relative h-8 w-8 mr-2">
//                 <svg viewBox="0 0 36 36" className="h-8 w-8">
//                   <path
//                     d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                     fill="none"
//                     stroke={isDarkMode ? "#37474F" : "#E6E6E6"}
//                     strokeWidth="3"
//                     className="transition-colors duration-300"
//                   />
//                   <path
//                     d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                     fill="none"
//                     stroke={
//                       examMetrics.score >= examData.passingGrade
//                         ? "#81C784"
//                         : "#F44336"
//                     }
//                     strokeWidth="3"
//                     strokeDasharray={`${examMetrics.score}, 100`}
//                   />
//                 </svg>
//                 <div
//                   className={`absolute inset-0 flex items-center justify-center text-sm font-medium ${
//                     isDarkMode ? "text-dark" : ""
//                   } transition-colors duration-300`}
//                 >
//                   {examMetrics.score}%
//                 </div>
//               </div>
//               <div className="flex space-x-4 rtl:space-x-reverse">
//                 <span
//                   className={`flex items-center ${
//                     isDarkMode ? "text-green-400" : "text-green-600"
//                   } transition-colors duration-300`}
//                 >
//                   <span className="h-4 w-4 text-[#81C784] mr-1">
//                     <CheckCircleIcon />
//                   </span>{" "}
//                   {examMetrics.correct}
//                 </span>
//                 <span
//                   className={`flex items-center ${
//                     isDarkMode ? "text-red-400" : "text-red-600"
//                   } transition-colors duration-300`}
//                 >
//                   <span className="h-4 w-4 text-red-500 mr-1">
//                     <XCircleIcon />
//                   </span>{" "}
//                   {examMetrics.wrong}
//                 </span>
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center">
//               <span
//                 className={`h-5 w-5 ${
//                   isDarkMode ? "text-primary-lightest" : "text-[#607D8B]"
//                 } mr-2 transition-colors duration-300`}
//               >
//                 <ClockIcon />
//               </span>
//               <span
//                 className={`font-medium ${
//                   isDarkMode ? "text-dark" : ""
//                 } transition-colors duration-300`}
//               >
//                 {examStatus === "in-progress"
//                   ? isTimerActive
//                     ? formatTime(timer)
//                     : "وقت مفتوح"
//                   : examStatus === "time-up"
//                   ? "انتهى الامتحان"
//                   : "الامتحان"}
//               </span>
//             </div>
//           )}
//         </div>

//         <div className="flex">
//           <div
//             className={`flex ${
//               isDarkMode ? "bg-primary-dark" : "bg-gray-100"
//             } rounded-md mr-2 transition-colors duration-300`}
//           >
//             <button
//               onClick={reportProblem}
//               className={`px-3 py-1 text-sm ${
//                 isDarkMode
//                   ? "text-primary-lightest hover:bg-primary-base"
//                   : "text-gray-700 hover:bg-gray-200"
//               } rounded-md transition duration-200`}
//             >
//               الابلاغ عن مشكلة
//             </button>
//           </div>

//           <div
//             className={`${
//               isDarkMode ? "bg-primary-base" : "bg-[#607D8B]"
//             } text-white rounded-md transition-colors duration-300`}
//           >
//             <button className="px-3 py-1 text-sm hover:bg-opacity-90 transition duration-200">
//               مراجعة
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Render progress bar
//   const renderProgressBar = () => {
//     return (
//       <div className="mb-6">
//         <div
//           className={`w-full h-2 ${
//             isDarkMode ? "bg-primary-dark" : "bg-[#E9ECEF]"
//           } rounded-full overflow-hidden transition-colors duration-300`}
//         >
//           <div
//             className={`h-full ${
//               isDarkMode ? "bg-primary-base" : "bg-[#607D8B]"
//             } transition-colors duration-300`}
//             style={{ width: `${examProgress}%` }}
//           ></div>
//         </div>
//       </div>
//     );
//   };

//   // Render exam title
//   const renderExamTitle = () => {
//     return (
//       <div className="text-right mb-6">
//         <h1
//           className={`text-2xl font-bold ${
//             isDarkMode ? "text-dark" : "text-[#455A64]"
//           } transition-colors duration-300`}
//         >
//           {examData.title}
//         </h1>
//         <p
//           className={`text-sm ${
//             isDarkMode ? "text-primary-lightest" : "text-gray-600"
//           } transition-colors duration-300`}
//         >
//           {examData.subtitle}
//         </p>
//       </div>
//     );
//   };

//   // Add a question sidebar like in the images (numbered 1-5)
//   const renderQuestionSidebar = () => {
//     return (
//       <div
//         className={`fixed left-4 top-1/2 transform -translate-y-1/2 ${
//           isDarkMode ? "bg-primary-dark" : "bg-white"
//         } shadow-md rounded-lg p-2 z-40 hidden md:block transition-colors duration-300`}
//       >
//         <div className="flex flex-col space-y-2">
//           {[1, 2, 3, 4, 5].map((num) => {
//             const status = num <= currentQuestion + 1 ? "visited" : "upcoming";
//             let bgColor = isDarkMode ? "bg-primary-dark" : "bg-white";
//             let textColor = isDarkMode
//               ? "text-primary-lightest"
//               : "text-gray-500";

//             if (num === currentQuestion + 1) {
//               bgColor = isDarkMode ? "bg-primary-base" : "bg-[#607D8B]";
//               textColor = "text-white";
//             } else if (answers[num]) {
//               bgColor = isDarkMode ? "bg-accent-secondary" : "bg-[#A5D6A7]";
//               textColor = isDarkMode ? "text-dark" : "text-white";
//             } else if (num < currentQuestion + 1) {
//               bgColor = isDarkMode ? "bg-primary-light" : "bg-gray-200";
//             }

//             return (
//               <div
//                 key={num}
//                 className={`${bgColor} ${textColor} w-10 h-10 rounded flex items-center justify-center cursor-pointer font-medium text-sm hover:opacity-90 transition-all duration-200`}
//                 onClick={() => setCurrentQuestion(num - 1)}
//               >
//                 {num}
//                 {status === "visited" && num !== currentQuestion + 1 && (
//                   <div
//                     className={`absolute -right-1 -top-1 w-3 h-3 rounded-full ${
//                       isDarkMode ? "bg-primary-dark" : "bg-white"
//                     } ring-2 ${
//                       isDarkMode ? "ring-primary-base" : "ring-[#607D8B]"
//                     } transition-colors duration-300`}
//                   ></div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };
//   // Render the main exam content
//   const renderExamContent = () => {
//     const question = examData.questions[currentQuestion];

//     if (examStatus === "not-available") {
//       return (
//         <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
//           <div
//             className={`${
//               isDarkMode ? "bg-red-900/20" : "bg-red-50"
//             } rounded-full p-4 mb-6 transition-colors duration-300`}
//           >
//             <span
//               className={`h-16 w-16 ${
//                 isDarkMode ? "text-red-400" : "text-red-500"
//               } transition-colors duration-300`}
//             >
//               <AlertCircleIcon />
//             </span>
//           </div>
//           <h3
//             className={`text-xl font-bold ${
//               isDarkMode ? "text-dark" : "text-gray-800"
//             } mb-2 transition-colors duration-300`}
//           >
//             الامتحان غير متاح الآن
//           </h3>
//           <p
//             className={`${
//               isDarkMode ? "text-primary-lightest" : "text-gray-600"
//             } mb-6 transition-colors duration-300`}
//           >
//             يرجى المحاولة لاحقاً أو التواصل مع المشرف
//           </p>
//           <button
//             className={`${
//               isDarkMode
//                 ? "bg-primary-base hover:bg-primary-dark"
//                 : "bg-[#607D8B] hover:bg-[#546E7A]"
//             } text-white py-2 px-6 rounded-md transition duration-200`}
//           >
//             العودة للصفحة الرئيسية
//           </button>
//         </div>
//       );
//     }

//     if (examStatus === "time-up") {
//       return (
//         <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
//           <div
//             className={`${
//               isDarkMode ? "bg-red-900/20" : "bg-red-50"
//             } rounded-full p-4 mb-6 transition-colors duration-300`}
//           >
//             <span
//               className={`h-16 w-16 ${
//                 isDarkMode ? "text-red-400" : "text-red-500"
//               } transition-colors duration-300`}
//             >
//               <ClockIcon />
//             </span>
//           </div>
//           <h3
//             className={`text-xl font-bold ${
//               isDarkMode ? "text-dark" : "text-gray-800"
//             } mb-2 text-right transition-colors duration-300`}
//           >
//             انتهى وقت الامتحان, تم تسجيل الاجابات لن يتم استلام أي إجابات أخرى
//           </h3>
//           <div className="flex justify-center mt-8">
//             <button
//               onClick={() => setExamStatus("completed")}
//               className={`${
//                 isDarkMode
//                   ? "bg-primary-base hover:bg-primary-dark"
//                   : "bg-[#607D8B] hover:bg-[#546E7A]"
//               } text-white py-2 px-6 rounded-md transition duration-200`}
//             >
//               عرض النتائج
//             </button>
//           </div>
//         </div>
//       );
//     }

//     if (examStatus === "completed") {
//       const questionStatus = getQuestionStatus(question.id);
//       const isCorrect = questionStatus === "correct";
//       const isWrong = questionStatus === "wrong";

//       return (
//         <div className="space-y-6">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center">
//               <span className="h-6 w-6 mr-2 text-[#A5D6A7]">
//                 <FlagIcon />
//               </span>
//               <span
//                 className={`text-lg font-medium ${
//                   isDarkMode ? "text-dark" : ""
//                 } transition-colors duration-300`}
//               >
//                 السؤال رقم {question.id}
//               </span>
//             </div>
//           </div>

//           <div
//             className={`${
//               isDarkMode
//                 ? "bg-primary-dark border-primary-base"
//                 : "bg-white border-gray-100"
//             } rounded-lg p-6 shadow-sm border transition-colors duration-300`}
//           >
//             <div
//               className={`text-right mb-4 text-xl font-medium ${
//                 isDarkMode ? "text-dark" : "text-[#455A64]"
//               } transition-colors duration-300`}
//             >
//               {question.text}
//             </div>

//             {question.image && (
//               <div className="my-4 flex justify-center">
//                 <img
//                   src={question.image}
//                   alt="Question"
//                   className={`max-w-full h-auto rounded-md shadow-sm ${
//                     isDarkMode ? "opacity-80" : ""
//                   } transition-colors duration-300`}
//                 />
//               </div>
//             )}

//             <div className="space-y-3 mt-6">
//               {question.options.map((option) => {
//                 const isSelected = answers[question.id] === option.id;
//                 const isCorrectOption = option.id === question.correctAnswer;

//                 let optionClasses = `flex items-center justify-between p-3 rounded-md border ${
//                   isDarkMode ? "border-primary-light" : ""
//                 } transition-colors duration-300`;

//                 if (isSelected && isCorrectOption) {
//                   optionClasses += isDarkMode
//                     ? " border-green-600 bg-green-900/20"
//                     : " border-green-500 bg-green-50";
//                 } else if (isSelected && !isCorrectOption) {
//                   optionClasses += isDarkMode
//                     ? " border-red-600 bg-red-900/20"
//                     : " border-red-500 bg-red-50";
//                 } else if (!isSelected && isCorrectOption) {
//                   optionClasses += isDarkMode
//                     ? " border-green-600 bg-green-900/20"
//                     : " border-green-500 bg-green-50";
//                 } else {
//                   optionClasses += isDarkMode
//                     ? " border-primary-light"
//                     : " border-gray-200";
//                 }

//                 return (
//                   <div key={option.id} className={optionClasses}>
//                     <div className="flex items-center">
//                       <div
//                         className={`w-6 h-6 flex items-center justify-center mr-3 border rounded-full ${
//                           isSelected
//                             ? isCorrectOption
//                               ? isDarkMode
//                                 ? "border-green-600"
//                                 : "border-green-500"
//                               : isDarkMode
//                               ? "border-red-600"
//                               : "border-red-500"
//                             : isDarkMode
//                             ? "border-primary-light"
//                             : "border-gray-300"
//                         } transition-colors duration-300`}
//                       >
//                         {isSelected && isCorrectOption && (
//                           <span
//                             className={`h-5 w-5 ${
//                               isDarkMode ? "text-green-400" : "text-green-500"
//                             }`}
//                           >
//                             <CheckCircleIcon />
//                           </span>
//                         )}
//                         {isSelected && !isCorrectOption && (
//                           <span
//                             className={`h-5 w-5 ${
//                               isDarkMode ? "text-red-400" : "text-red-500"
//                             }`}
//                           >
//                             <XCircleIcon />
//                           </span>
//                         )}
//                         {!isSelected && isCorrectOption && (
//                           <span
//                             className={`h-5 w-5 ${
//                               isDarkMode ? "text-green-400" : "text-green-500"
//                             }`}
//                           >
//                             <CheckCircleIcon />
//                           </span>
//                         )}
//                       </div>
//                       <span
//                         className={`text-right ${
//                           isDarkMode ? "text-dark" : ""
//                         } transition-colors duration-300`}
//                       >
//                         {option.text}
//                       </span>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       );
//     }

//     // Default: in-progress exam
//     return (
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center">
//             <span className="h-6 w-6 mr-2 text-[#A5D6A7]">
//               <FlagIcon />
//             </span>
//             <span
//               className={`text-lg font-medium ${
//                 isDarkMode ? "text-dark" : "text-[#455A64]"
//               } transition-colors duration-300`}
//             >
//               السؤال رقم {question.id}
//             </span>
//           </div>
//         </div>

//         <div
//           className={`${
//             isDarkMode
//               ? "bg-primary-dark border-primary-base"
//               : "bg-white border-gray-100"
//           } rounded-lg p-6 shadow-sm border transition-colors duration-300`}
//         >
//           <div
//             className={`text-right mb-4 text-xl font-medium ${
//               isDarkMode ? "text-dark" : "text-[#455A64]"
//             } transition-colors duration-300`}
//           >
//             {question.text}
//           </div>

//           {question.image && (
//             <div className="my-4 flex justify-center">
//               <img
//                 src={question.image}
//                 alt="Question"
//                 className={`max-w-full h-auto rounded-md shadow-sm ${
//                   isDarkMode ? "opacity-80" : ""
//                 } transition-colors duration-300`}
//               />
//             </div>
//           )}

//           <div className="space-y-3 mt-6">
//             {question.options.map((option) => {
//               const isSelected = answers[question.id] === option.id;

//               return (
//                 <div
//                   key={option.id}
//                   className={`flex items-center justify-between p-3 rounded-md border ${
//                     isSelected
//                       ? isDarkMode
//                         ? "border-accent-secondary bg-accent-secondary/10"
//                         : "border-[#A5D6A7] bg-[#A5D6A7] bg-opacity-10"
//                       : isDarkMode
//                       ? "border-primary-light hover:border-accent-secondary"
//                       : "border-gray-200 hover:border-[#A5D6A7]"
//                   } cursor-pointer transition-all duration-200`}
//                   onClick={() => selectAnswer(question.id, option.id)}
//                 >
//                   <div className="flex items-center flex-grow">
//                     <div
//                       className={`w-6 h-6 flex items-center justify-center ml-3 border rounded-full ${
//                         isSelected
//                           ? isDarkMode
//                             ? "border-accent-secondary"
//                             : "border-[#A5D6A7]"
//                           : isDarkMode
//                           ? "border-primary-light"
//                           : "border-gray-300"
//                       } transition-colors duration-300`}
//                     >
//                       {isSelected && (
//                         <div
//                           className={`w-3 h-3 rounded-full ${
//                             isDarkMode ? "bg-accent-secondary" : "bg-[#A5D6A7]"
//                           } transition-colors duration-300`}
//                         ></div>
//                       )}
//                     </div>
//                     <span
//                       className={`text-right flex-grow ${
//                         isDarkMode ? "text-dark" : ""
//                       } transition-colors duration-300`}
//                     >
//                       {option.text}
//                     </span>
//                   </div>
//                   {isSelected && (
//                     <span
//                       className={`h-5 w-5 ${
//                         isDarkMode ? "text-accent-secondary" : "text-[#A5D6A7]"
//                       } transition-colors duration-300`}
//                     >
//                       <PenToolIcon />
//                     </span>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     );
//   };
//   const renderResultsScreen = () => {
//     return (
//       <div
//         className={`${
//           isDarkMode ? "bg-primary-dark" : "bg-white"
//         } rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto my-8 pt-16 transition-colors duration-300`}
//       >
//         <div className="p-8">
//           <div className="flex justify-center mb-8">
//             <div className="relative">
//               <div
//                 className={`w-32 h-32 rounded-full ${
//                   isDarkMode
//                     ? "bg-primary-base bg-opacity-30"
//                     : "bg-[#607D8B] bg-opacity-10"
//                 } flex items-center justify-center mb-2 transition-colors duration-300`}
//               >
//                 <div
//                   className={`w-24 h-24 rounded-full border-4 ${
//                     isDarkMode ? "border-primary-base" : "border-[#607D8B]"
//                   } flex items-center justify-center transition-colors duration-300`}
//                 >
//                   <span
//                     className={`text-2xl font-bold ${
//                       isDarkMode ? "text-primary-lightest" : "text-[#607D8B]"
//                     } transition-colors duration-300`}
//                   >
//                     {examMetrics.score}%
//                   </span>
//                 </div>
//               </div>
//               {examMetrics.score >= examData.passingGrade ? (
//                 <div className="absolute top-0 right-0 bg-green-500 text-white rounded-full p-2">
//                   <span className="h-5 w-5">
//                     <CheckCircleIcon />
//                   </span>
//                 </div>
//               ) : (
//                 <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2">
//                   <span className="h-5 w-5">
//                     <XCircleIcon />
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>

//           <h2
//             className={`text-2xl font-bold text-center mb-6 ${
//               isDarkMode ? "text-primary-lightest" : "text-[#607D8B]"
//             } transition-colors duration-300`}
//           >
//             نتيجة الامتحان
//           </h2>

//           <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
//             <div
//               className={`flex flex-col items-center p-4 ${
//                 isDarkMode ? "bg-green-900/20" : "bg-green-50"
//               } rounded-lg transition-colors duration-300`}
//             >
//               <div className="flex items-center justify-center mb-2">
//                 <span
//                   className={`h-6 w-6 ${
//                     isDarkMode ? "text-green-400" : "text-green-500"
//                   } mr-1 transition-colors duration-300`}
//                 >
//                   <CheckCircleIcon />
//                 </span>
//                 <span
//                   className={`text-xl font-bold ${
//                     isDarkMode ? "text-green-400" : "text-green-600"
//                   } transition-colors duration-300`}
//                 >
//                   {examMetrics.correct}
//                 </span>
//               </div>
//               <span
//                 className={`text-sm ${
//                   isDarkMode ? "text-primary-lightest" : "text-gray-600"
//                 } transition-colors duration-300`}
//               >
//                 إجابة صحيحة
//               </span>
//             </div>

//             <div
//               className={`flex flex-col items-center p-4 ${
//                 isDarkMode ? "bg-red-900/20" : "bg-red-50"
//               } rounded-lg transition-colors duration-300`}
//             >
//               <div className="flex items-center justify-center mb-2">
//                 <span
//                   className={`h-6 w-6 ${
//                     isDarkMode ? "text-red-400" : "text-red-500"
//                   } mr-1 transition-colors duration-300`}
//                 >
//                   <XCircleIcon />
//                 </span>
//                 <span
//                   className={`text-xl font-bold ${
//                     isDarkMode ? "text-red-400" : "text-red-600"
//                   } transition-colors duration-300`}
//                 >
//                   {examMetrics.wrong}
//                 </span>
//               </div>
//               <span
//                 className={`text-sm ${
//                   isDarkMode ? "text-primary-lightest" : "text-gray-600"
//                 } transition-colors duration-300`}
//               >
//                 إجابة خاطئة
//               </span>
//             </div>
//           </div>

//           <p
//             className={`text-center ${
//               isDarkMode ? "text-primary-lightest" : "text-gray-600"
//             } mb-8 transition-colors duration-300`}
//           >
//             {examMetrics.score >= examData.passingGrade
//               ? "تهانينا! لقد اجتزت الامتحان بنجاح"
//               : "للأسف، لم تحقق الدرجة المطلوبة. يمكنك المحاولة مرة أخرى"}
//           </p>

//           <div className="flex justify-center space-x-4 rtl:space-x-reverse">
//             <button
//               onClick={() => setExamStatus("in-progress")}
//               className={`${
//                 isDarkMode
//                   ? "bg-primary-base hover:bg-primary-dark"
//                   : "bg-[#607D8B] hover:bg-[#607D8B]"
//               } text-white px-8 py-3 rounded-md font-medium transition duration-200`}
//             >
//               {examMetrics.score >= examData.passingGrade
//                 ? "مراجعة الإجابات"
//                 : "إعادة المحاولة"}
//             </button>

//             <button
//               onClick={() => alert("العودة إلى صفحة المقررات")}
//               className={`${
//                 isDarkMode
//                   ? "bg-primary-light hover:bg-primary-base"
//                   : "bg-gray-200 hover:bg-gray-300"
//               } ${
//                 isDarkMode ? "text-white" : "text-gray-800"
//               } px-8 py-3 rounded-md font-medium transition duration-200`}
//             >
//               العودة للمقرر
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };
//   // Render confirmation modal
//   const renderConfirmationModal = () => {
//     if (!confirmEndExam) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//         <div
//           className={`${
//             isDarkMode ? "bg-primary-dark" : "bg-white"
//           } rounded-lg shadow-lg p-6 max-w-md w-full mx-4 transition-colors duration-300`}
//         >
//           <div className="flex justify-center mb-6">
//             {examStatus === "time-up" ? (
//               <span
//                 className={`h-16 w-16 ${
//                   isDarkMode ? "text-red-400" : "text-red-500"
//                 }`}
//               >
//                 <ClockIcon />
//               </span>
//             ) : (
//               <span
//                 className={`h-16 w-16 ${
//                   isDarkMode ? "text-primary-lightest" : "text-[#607D8B]"
//                 }`}
//               >
//                 <AlertCircleIcon />
//               </span>
//             )}
//           </div>

//           <h3
//             className={`text-xl font-bold text-center mb-6 text-right ${
//               isDarkMode ? "text-dark" : "text-[#455A64]"
//             } transition-colors duration-300`}
//           >
//             {examStatus === "time-up"
//               ? "انتهى وقت الامتحان, تم تسجيل الاجابات لن يتم استلام أي إجابات أخرى"
//               : "هل انت متأكد انك تريد انهاء الامتحان؟"}
//           </h3>

//           <div className="flex justify-center space-x-4 rtl:space-x-reverse mt-6">
//             {examStatus !== "time-up" && (
//               <button
//                 onClick={() => setConfirmEndExam(false)}
//                 className={`${
//                   isDarkMode
//                     ? "bg-primary-light hover:bg-primary-base text-white"
//                     : "bg-gray-200 hover:bg-gray-300 text-gray-800"
//                 } px-4 py-2 rounded-md transition duration-200`}
//               >
//                 إلغاء
//               </button>
//             )}

//             <button
//               onClick={
//                 examStatus === "time-up"
//                   ? () => setExamStatus("completed")
//                   : endExam
//               }
//               className={`${
//                 isDarkMode
//                   ? "bg-primary-base hover:bg-primary-dark"
//                   : "bg-[#607D8B] hover:bg-[#607D8B]"
//               } text-white px-6 py-2 rounded-md transition duration-200`}
//             >
//               إنهاء
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Render exam stats
//   const renderExamStats = () => {
//     const answeredCount = Object.keys(answers).length;
//     const flaggedCount = examData.questions.filter((q) => q.hasFlagged).length;
//     const skipCount = examData.questions.length - answeredCount;

//     return (
//       <div className="relative mb-6">
//         <button
//           onClick={() => setShowExamProgress(!showExamProgress)}
//           className={`flex items-center space-x-2 rtl:space-x-reverse ${
//             isDarkMode
//               ? "text-dark bg-primary-dark hover:bg-primary-base"
//               : "text-[#455A64] bg-white hover:bg-[#ECEFF1]"
//           } rounded-md px-3 py-2 shadow-sm transition-colors duration-300`}
//         >
//           <span>تقدم الامتحان</span>
//         </button>

//         {showExamProgress && (
//           <div
//             className={`absolute top-12 right-0 z-50 ${
//               isDarkMode ? "bg-primary-dark" : "bg-white"
//             } rounded-lg shadow-md p-4 w-64 text-right transition-colors duration-300`}
//           >
//             <div
//               className={`flex justify-between items-center mb-3 pb-2 ${
//                 isDarkMode ? "border-primary-base" : "border-b"
//               } transition-colors duration-300`}
//             >
//               <button
//                 onClick={() => setShowExamProgress(false)}
//                 className={`${
//                   isDarkMode
//                     ? "text-primary-lightest hover:text-white"
//                     : "text-gray-400 hover:text-gray-600"
//                 } transition-colors duration-300`}
//               >
//                 <XIcon />
//               </button>
//               <h3
//                 className={`font-bold text-lg ${
//                   isDarkMode ? "text-dark" : "text-[#455A64]"
//                 } transition-colors duration-300`}
//               >
//                 تقدم الامتحان
//               </h3>
//             </div>

//             <div className="space-y-3">
//               <div className="flex items-center justify-between">
//                 <span
//                   className={`text-sm font-medium ${
//                     isDarkMode ? "text-dark" : ""
//                   } transition-colors duration-300`}
//                 >
//                   {answeredCount}
//                 </span>
//                 <div className="flex items-center">
//                   <span
//                     className={`text-sm font-medium ml-2 ${
//                       isDarkMode ? "text-dark" : ""
//                     } transition-colors duration-300`}
//                   >
//                     سؤال محلول
//                   </span>
//                   <span
//                     className={`${
//                       isDarkMode ? "text-accent-secondary" : "text-[#A5D6A7]"
//                     } transition-colors duration-300`}
//                   >
//                     <CheckCircleIcon />
//                   </span>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <span
//                   className={`text-sm font-medium ${
//                     isDarkMode ? "text-dark" : ""
//                   } transition-colors duration-300`}
//                 >
//                   {flaggedCount}
//                 </span>
//                 <div className="flex items-center">
//                   <span
//                     className={`text-sm font-medium ml-2 ${
//                       isDarkMode ? "text-dark" : ""
//                     } transition-colors duration-300`}
//                   >
//                     سؤال معلم
//                   </span>
//                   <span
//                     className={`${
//                       isDarkMode ? "text-accent-secondary" : "text-[#81C784]"
//                     } transition-colors duration-300`}
//                   >
//                     <FlagIcon />
//                   </span>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <span
//                   className={`text-sm font-medium ${
//                     isDarkMode ? "text-dark" : ""
//                   } transition-colors duration-300`}
//                 >
//                   {skipCount}
//                 </span>
//                 <div className="flex items-center">
//                   <span
//                     className={`text-sm font-medium ml-2 ${
//                       isDarkMode ? "text-dark" : ""
//                     } transition-colors duration-300`}
//                   >
//                     سؤال متروك
//                   </span>
//                   <span
//                     className={`${
//                       isDarkMode ? "text-primary-lightest" : "text-[#455A64]"
//                     } transition-colors duration-300`}
//                   >
//                     <XCircleIcon />
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   // Render navigation buttons
//   const renderNavButtons = () => {
//     return (
//       <div className="flex justify-between items-center mt-8">
//         <button
//           onClick={() => setShowQuestionsNav(true)}
//           className={`flex items-center ${
//             isDarkMode
//               ? "text-primary-lightest hover:text-white"
//               : "text-[#607D8B] hover:text-[#455A64]"
//           } transition duration-200`}
//         >
//           <span className="mr-1">
//             <ListIcon />
//           </span>
//         </button>

//         <div className="flex space-x-4 rtl:space-x-reverse">
//           <button
//             onClick={nextQuestion}
//             disabled={currentQuestion === examData.questions.length - 1}
//             className={`flex items-center px-4 py-2 rounded-md ${
//               currentQuestion === examData.questions.length - 1
//                 ? isDarkMode
//                   ? "bg-primary-dark text-primary-light cursor-not-allowed"
//                   : "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 : isDarkMode
//                 ? "bg-primary-dark text-primary-lightest hover:bg-primary-base"
//                 : "bg-[#ECEFF1] text-[#607D8B] hover:bg-[#B0BEC5]"
//             } transition duration-200`}
//           >
//             <span className="mr-1">التالي</span>
//             <span>
//               <ChevronLeftIcon />
//             </span>
//           </button>

//           <button
//             onClick={prevQuestion}
//             disabled={currentQuestion === 0}
//             className={`flex items-center px-4 py-2 rounded-md ${
//               currentQuestion === 0
//                 ? isDarkMode
//                   ? "bg-primary-dark text-primary-light cursor-not-allowed"
//                   : "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 : isDarkMode
//                 ? "bg-primary-dark text-primary-lightest hover:bg-primary-base"
//                 : "bg-[#ECEFF1] text-[#607D8B] hover:bg-[#B0BEC5]"
//             } transition duration-200`}
//           >
//             <span>
//               <ChevronRightIcon />
//             </span>
//             <span className="ml-1">السابق</span>
//           </button>
//         </div>

//         <button
//           onClick={() => setConfirmEndExam(true)}
//           className={`${
//             isDarkMode
//               ? "bg-primary-base hover:bg-primary-dark"
//               : "bg-[#607D8B] hover:bg-[#546E7A]"
//           } text-white px-6 py-2 rounded-md transition duration-200`}
//         >
//           {examStatus === "completed" ? "محاولة جديدة" : "إنهاء الامتحان"}
//         </button>
//       </div>
//     );
//   };
//   // Render the intro screen
//   const renderIntroScreen = () => {
//     return (
//       <div
//         className={`${
//           isDarkMode ? "bg-primary-dark" : "bg-white"
//         } rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto my-8 pt-16 transition-colors duration-300`}
//       >
//         <div className="p-8">
//           <div className="flex justify-center mb-8">
//             <div
//               className={`w-64 h-48 ${
//                 isDarkMode ? "bg-dark" : "bg-[#F5F7F9]"
//               } rounded-lg flex items-center justify-center transition-colors duration-300`}
//             >
//               <img
//                 src="/api/placeholder/300/200"
//                 alt="Online Exam"
//                 className={`w-full h-full object-contain p-4 ${
//                   isDarkMode ? "opacity-80" : ""
//                 } transition-opacity duration-300`}
//               />
//             </div>
//           </div>

//           <h2
//             className={`text-2xl font-bold text-center mb-4 ${
//               isDarkMode ? "text-primary-lightest" : "text-[#607D8B]"
//             } transition-colors duration-300`}
//           >
//             ( امتحان على الجزئية الأولى )
//           </h2>

//           <p
//             className={`${
//               isDarkMode ? "text-primary-lightest" : "text-gray-600"
//             } text-center mb-8 leading-relaxed text-right transition-colors duration-300`}
//           >
//             شرح منهج مادة Software Engineering 2 بالكامل من خلال د/عبدالرحمن
//             مصطفى, شرح منهج مادة Software Engineering 2 بالكامل من خلال
//             د/عبدالرحمن مصطفى, شرح منهج مادة Software Engineering 2 بالكامل من
//             خلال د/عبدالرحمن مصطفى
//           </p>

//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
//             <div
//               className={`flex flex-col items-center p-4 ${
//                 isDarkMode ? "bg-primary-base" : "bg-[#F5F7F9]"
//               } rounded-lg transition-colors duration-300`}
//             >
//               <div
//                 className={`w-10 h-10 rounded-full ${
//                   isDarkMode
//                     ? "bg-accent-secondary bg-opacity-30"
//                     : "bg-[#A5D6A7] bg-opacity-20"
//                 } flex items-center justify-center mb-2 transition-colors duration-300`}
//               >
//                 <span
//                   className={`${
//                     isDarkMode ? "text-primary-lightest" : "text-[#607D8B]"
//                   } font-medium transition-colors duration-300`}
//                 >
//                   50
//                 </span>
//               </div>
//               <span
//                 className={`text-sm ${
//                   isDarkMode ? "text-primary-lightest" : "text-gray-600"
//                 } transition-colors duration-300`}
//               >
//                 عدد الأسئلة
//               </span>
//             </div>

//             <div
//               className={`flex flex-col items-center p-4 ${
//                 isDarkMode ? "bg-primary-base" : "bg-[#F5F7F9]"
//               } rounded-lg transition-colors duration-300`}
//             >
//               <div
//                 className={`w-10 h-10 rounded-full ${
//                   isDarkMode
//                     ? "bg-accent-secondary bg-opacity-30"
//                     : "bg-[#A5D6A7] bg-opacity-20"
//                 } flex items-center justify-center mb-2 transition-colors duration-300`}
//               >
//                 <span
//                   className={`${
//                     isDarkMode ? "text-primary-lightest" : "text-[#607D8B]"
//                   } font-medium transition-colors duration-300`}
//                 >
//                   70%
//                 </span>
//               </div>
//               <span
//                 className={`text-sm ${
//                   isDarkMode ? "text-primary-lightest" : "text-gray-600"
//                 } transition-colors duration-300`}
//               >
//                 الدرجة المطلوبة
//               </span>
//             </div>

//             <div
//               className={`flex flex-col items-center p-4 ${
//                 isDarkMode ? "bg-primary-base" : "bg-[#F5F7F9]"
//               } rounded-lg transition-colors duration-300`}
//             >
//               <div
//                 className={`w-10 h-10 rounded-full ${
//                   isDarkMode
//                     ? "bg-accent-secondary bg-opacity-30"
//                     : "bg-[#A5D6A7] bg-opacity-20"
//                 } flex items-center justify-center mb-2 transition-colors duration-300`}
//               >
//                 <span
//                   className={`${
//                     isDarkMode ? "text-primary-lightest" : "text-[#607D8B]"
//                   } font-medium transition-colors duration-300`}
//                 >
//                   60%
//                 </span>
//               </div>
//               <span
//                 className={`text-sm ${
//                   isDarkMode ? "text-primary-lightest" : "text-gray-600"
//                 } transition-colors duration-300`}
//               >
//                 درجتك
//               </span>
//             </div>

//             <div
//               className={`flex flex-col items-center p-4 ${
//                 isDarkMode ? "bg-primary-base" : "bg-[#F5F7F9]"
//               } rounded-lg transition-colors duration-300`}
//             >
//               <div
//                 className={`w-10 h-10 rounded-full ${
//                   isDarkMode
//                     ? "bg-accent-secondary bg-opacity-30"
//                     : "bg-[#A5D6A7] bg-opacity-20"
//                 } flex items-center justify-center mb-2 transition-colors duration-300`}
//               >
//                 <span
//                   className={`${
//                     isDarkMode ? "text-primary-lightest" : "text-[#607D8B]"
//                   } font-medium transition-colors duration-300`}
//                 >
//                   3
//                 </span>
//               </div>
//               <span
//                 className={`text-sm ${
//                   isDarkMode ? "text-primary-lightest" : "text-gray-600"
//                 } transition-colors duration-300`}
//               >
//                 محاولات متبقية
//               </span>
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <button
//               onClick={restartExam}
//               className={`${
//                 isDarkMode
//                   ? "bg-primary-base hover:bg-primary-light"
//                   : "bg-[#607D8B] hover:bg-[#607D8B]"
//               } text-white px-8 py-3 rounded-md font-medium transition duration-200`}
//             >
//               بدأ الامتحان
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };
//   // Render sidebar question navigation
//   const renderQuestionNav = () => {
//     return (
//       <div
//         className={`${
//           isDarkMode ? "bg-primary-dark" : "bg-white"
//         } rounded-lg shadow-sm p-4 fixed top-0 left-0 h-full w-64 md:w-72 z-50 transform transition-transform duration-300 ease-in-out overflow-auto text-right`}
//         style={{
//           transform: showQuestionsNav ? "translateX(0)" : "translateX(-100%)",
//           top: "60px",
//         }}
//       >
//         <div
//           className={`flex justify-between items-center mb-4 pb-2 ${
//             isDarkMode ? "border-primary-base" : "border-b"
//           } transition-colors duration-300`}
//         >
//           <button
//             onClick={() => setShowQuestionsNav(false)}
//             className={`${
//               isDarkMode
//                 ? "text-primary-lightest hover:text-white"
//                 : "text-gray-500 hover:text-gray-700"
//             } transition-colors duration-300`}
//           >
//             <span className="h-5 w-5">
//               <XIcon />
//             </span>
//           </button>
//           <h3
//             className={`font-bold text-lg ${
//               isDarkMode ? "text-dark" : "text-[#455A64]"
//             } transition-colors duration-300`}
//           >
//             الأسئلة
//           </h3>
//         </div>

//         <div className="space-y-2">
//           {examData.questions.map((q, index) => {
//             const status = getQuestionStatus(q.id);

//             let bgColor = isDarkMode ? "bg-primary-base/30" : "bg-gray-100";
//             let textColor = isDarkMode
//               ? "text-primary-lightest"
//               : "text-gray-600";
//             let borderColor = isDarkMode
//               ? "border-primary-light"
//               : "border-gray-200";

//             if (status === "answered") {
//               bgColor = isDarkMode
//                 ? "bg-accent-secondary/20"
//                 : "bg-[#A5D6A7] bg-opacity-10";
//               borderColor = isDarkMode
//                 ? "border-accent-secondary"
//                 : "border-[#A5D6A7]";
//               textColor = isDarkMode
//                 ? "text-primary-lightest"
//                 : "text-[#607D8B]";
//             } else if (status === "flagged") {
//               bgColor = isDarkMode ? "bg-yellow-800/20" : "bg-yellow-50";
//               borderColor = isDarkMode
//                 ? "border-yellow-600"
//                 : "border-yellow-400";
//               textColor = isDarkMode ? "text-yellow-400" : "text-yellow-700";
//             } else if (status === "correct") {
//               bgColor = isDarkMode ? "bg-green-900/20" : "bg-green-50";
//               borderColor = isDarkMode
//                 ? "border-green-600"
//                 : "border-green-500";
//               textColor = isDarkMode ? "text-green-400" : "text-green-700";
//             } else if (status === "wrong") {
//               bgColor = isDarkMode ? "bg-red-900/20" : "bg-red-50";
//               borderColor = isDarkMode ? "border-red-600" : "border-red-500";
//               textColor = isDarkMode ? "text-red-400" : "text-red-700";
//             }

//             if (index === currentQuestion) {
//               borderColor = isDarkMode
//                 ? "border-primary-lightest"
//                 : "border-[#607D8B]";
//               bgColor += isDarkMode
//                 ? " ring-2 ring-primary-lightest ring-opacity-50"
//                 : " ring-2 ring-[#607D8B] ring-opacity-50";
//             }

//             return (
//               <div
//                 key={q.id}
//                 className={`${bgColor} ${textColor} ${borderColor} border rounded-md p-3 cursor-pointer hover:bg-opacity-80 flex items-center justify-between transition-colors duration-300`}
//                 onClick={() => {
//                   setCurrentQuestion(index);
//                   setShowQuestionsNav(false);
//                 }}
//               >
//                 <div className="flex items-center space-x-2 rtl:space-x-reverse">
//                   {status === "flagged" && (
//                     <span
//                       className={`h-4 w-4 ${
//                         isDarkMode ? "text-yellow-400" : "text-yellow-500"
//                       }`}
//                     >
//                       <FlagIcon />
//                     </span>
//                   )}
//                   {status === "answered" && (
//                     <span
//                       className={`h-4 w-4 ${
//                         isDarkMode ? "text-accent-secondary" : "text-[#A5D6A7]"
//                       }`}
//                     >
//                       <CheckCircleIcon />
//                     </span>
//                   )}
//                   {status === "correct" && (
//                     <span
//                       className={`h-4 w-4 ${
//                         isDarkMode ? "text-green-400" : "text-green-500"
//                       }`}
//                     >
//                       <CheckCircleIcon />
//                     </span>
//                   )}
//                   {status === "wrong" && (
//                     <span
//                       className={`h-4 w-4 ${
//                         isDarkMode ? "text-red-400" : "text-red-500"
//                       }`}
//                     >
//                       <XCircleIcon />
//                     </span>
//                   )}
//                 </div>
//                 <span className="font-medium">السؤال {q.id}</span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   // Main render logic
//   if (showIntro) {
//     return (
//       <>
//         {renderHeader()}
//         {renderIntroScreen()}
//       </>
//     );
//   }

//   if (examStatus === "completed" && examMetrics.score !== null) {
//     return (
//       <>
//         {renderHeader()}
//         {renderResultsScreen()}
//       </>
//     );
//   }

//   // Default return for the normal exam state
//   return (
//     <>
//       {renderHeader()}
//       <div
//         className={`max-w-4xl mx-auto ${
//           isDarkMode ? "bg-dark" : "bg-[#F5F7F9]"
//         } rounded-lg shadow-md p-6 relative mt-16 transition-colors duration-300`}
//       >
//         {renderExamHeader()}
//         {renderProgressBar()}
//         {renderExamTitle()}
//         {renderExamContent()}
//         {renderNavButtons()}
//         {renderQuestionNav()}
//         {renderConfirmationModal()}
//         {renderExamStats()}
//         {renderQuestionSidebar()}
//       </div>
//     </>
//   );
// };

// export default OnlineExam;
