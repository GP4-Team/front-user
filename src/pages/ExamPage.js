// // src/pages/ExamPage.js
// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { useTheme } from '../context/ThemeContext';

// // Import components
// import ExamTimer from '../components/ExamTimer';
// import ProgressBar from '../components/ProgressBar';
// import QuestionCard from '../components/QuestionCard';
// import NavigationButtons from '../components/NavigationButtons';
// import QuestionNavigation from '../components/QuestionNavigation';
// import StatusModal from '../components/StatusModal';
// import ExamSummary from '../components/ExamSummary';

// const ExamPage = ({
//   examData,
//   onExamComplete,
//   rtl = true
// }) => {
//   // Use the theme context for dark mode
//   const { isDarkMode, colors } = useTheme();
  
//   // First declare all hooks at the top level
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [flaggedQuestions, setFlaggedQuestions] = useState([]);
//   const [showSummary, setShowSummary] = useState(false);
//   const [timeExpired, setTimeExpired] = useState(false);
//   const [confirmEnd, setConfirmEnd] = useState(false);
  
//   // Then handle missing examData
//   if (!examData || !examData.questions || !examData.questions.length) {
//     return (
//       <div className={`flex flex-col items-center justify-center min-h-screen ${isDarkMode ? 'bg-dark' : 'bg-bg-light'} transition-colors duration-300`}>
//         <div className={`${isDarkMode ? 'bg-dark-card text-dark' : 'bg-white text-text-dark'} p-8 rounded-lg shadow-md transition-colors duration-300`}>
//           <h1 className="text-2xl font-bold mb-4 text-red-600">Error Loading Exam</h1>
//           <p className={`${isDarkMode ? 'text-primary-lightest' : 'text-gray-700'} transition-colors duration-300`}>The exam data couldn't be loaded properly. Please try again later.</p>
//         </div>
//       </div>
//     );
//   }

//   // Calculated values that depend on examData
//   const currentQuestion = examData.questions[currentQuestionIndex];
//   const progress = Math.round((Object.keys(answers).length / examData.questions.length) * 100);
  
//   // Handler functions
//   const handleAnswerSelect = (questionId, answerId) => {
//     setAnswers(prev => ({
//       ...prev,
//       [questionId]: answerId
//     }));
//   };
  
//   const handleFlagQuestion = (questionId) => {
//     setFlaggedQuestions(prev => {
//       if (prev.includes(questionId)) {
//         return prev.filter(id => id !== questionId);
//       } else {
//         return [...prev, questionId];
//       }
//     });
//   };
  
//   const goToPreviousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };
  
//   const goToNextQuestion = () => {
//     if (currentQuestionIndex < examData.questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };
  
//   const handleQuestionSelect = (index) => {
//     setCurrentQuestionIndex(index - 1);
//   };
  
//   const handleEndExam = () => {
//     setConfirmEnd(true);
//   };
  
//   const confirmEndExam = () => {
//     setConfirmEnd(false);
//     setShowSummary(true);
//   };
  
//   const handleTimeExpired = () => {
//     setTimeExpired(true);
//     // Auto submit after time expires
//     setTimeout(() => {
//       setTimeExpired(false);
//       setShowSummary(true);
//     }, 3000);
//   };
  
//   const handleExamSubmit = () => {
//     onExamComplete({
//       answers,
//       flaggedQuestions,
//       timeRemaining: examData.timeLimit // Would be calculated in real app
//     });
//   };
  
//   // Prepare data for question navigation
//   const questionsForNav = examData.questions.map((q, index) => ({
//     id: q.id,
//     answered: !!answers[q.id],
//     flagged: flaggedQuestions.includes(q.id)
//   }));
  
//   return (
//     <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-dark' : 'bg-bg-light'} ${rtl ? 'rtl' : 'ltr'} transition-colors duration-300`}>
// <header className={`${isDarkMode ? 'bg-primary-dark' : 'bg-primary-base'} text-white p-4 flex justify-between items-center transition-colors duration-300`}>
//   <div className="flex-1">
//     <h1 className="text-lg font-bold m-0">{examData.title}</h1>
//     <div className="text-sm opacity-80">{examData.subtitle}</div>
//   </div>
  
//   <div className="flex items-center gap-4">
//     {/* Dark Mode Toggle Icon */}
//     <button 
//       onClick={toggleTheme} 
//       className="p-1 bg-opacity-10 bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200 focus:outline-none"
//       aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
//     >
//       {isDarkMode ? (
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
//         </svg>
//       ) : (
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
//         </svg>
//       )}
//     </button>
    
//     <ExamTimer 
//       initialTime={examData.timeLimit} 
//       isOpen={examData.isOpenTime}
//       onTimeExpired={handleTimeExpired}
//       rtl={rtl}
//       isDarkMode={isDarkMode}
//     />
    
//     <button className="bg-opacity-10 bg-white text-white border-none rounded-md px-3 py-1 text-sm hover:bg-opacity-20">
//       {rtl ? 'مراجعة' : 'Review'}
//     </button>
    
//     <button className="bg-opacity-10 bg-white text-white border-none rounded-md px-3 py-1 text-sm hover:bg-opacity-20">
//       {rtl ? 'الإبلاغ عن مشكلة' : 'Report Issue'}
//     </button>
//   </div>
// </header>
      
//       <div className="p-4">
//         <ProgressBar 
//           progress={progress} 
//           rtl={rtl}
//           isDarkMode={isDarkMode}
//         />
//       </div>
      
//       <div className="flex flex-1 p-4 gap-4">
//         <aside className="w-64 flex-shrink-0">
//           <QuestionNavigation
//             questions={questionsForNav}
//             currentQuestion={currentQuestionIndex + 1}
//             onQuestionSelect={handleQuestionSelect}
//             rtl={rtl}
//             isDarkMode={isDarkMode}
//           />
//         </aside>
        
//         <main className="flex-1 flex flex-col">
//           {showSummary ? (
//             <ExamSummary
//               answered={Object.keys(answers).length}
//               flagged={flaggedQuestions.length}
//               skipped={examData.questions.length - Object.keys(answers).length}
//               totalQuestions={examData.questions.length}
//               onContinue={() => setShowSummary(false)}
//               onSubmit={handleExamSubmit}
//               rtl={rtl}
//               isDarkMode={isDarkMode}
//             />
//           ) : (
//             <>
//               <QuestionCard
//                 questionNumber={currentQuestionIndex + 1}
//                 questionText={currentQuestion.text}
//                 questionImage={currentQuestion.image}
//                 difficulty={currentQuestion.difficulty}
//                 options={currentQuestion.options}
//                 selectedAnswer={answers[currentQuestion.id]}
//                 isFlagged={flaggedQuestions.includes(currentQuestion.id)}
//                 onAnswerSelect={(answerId) => handleAnswerSelect(currentQuestion.id, answerId)}
//                 onFlagQuestion={() => handleFlagQuestion(currentQuestion.id)}
//                 rtl={rtl}
//                 isDarkMode={isDarkMode}
//               />
              
//               <NavigationButtons
//                 onPrevious={goToPreviousQuestion}
//                 onNext={goToNextQuestion}
//                 onEnd={handleEndExam}
//                 hasPrevious={currentQuestionIndex > 0}
//                 hasNext={currentQuestionIndex < examData.questions.length - 1}
//                 rtl={rtl}
//                 isDarkMode={isDarkMode}
//               />
//             </>
//           )}
//         </main>
//       </div>
      
//       {/* Modals */}
//       <StatusModal
//         isOpen={timeExpired}
//         onClose={() => setTimeExpired(false)}
//         title={rtl ? 'انتهى وقت الامتحان' : 'Time Expired'}
//         message={rtl ? 'انتهى وقت الامتحان، لن يتم تسجيل الإجابات استلام أي إجابات أخرى' : 
//                 'Exam time has expired. No further answers will be accepted.'}
//         type="error"
//         icon={<span role="img" aria-label="timer" className="text-5xl">⏱️</span>}
//         rtl={rtl}
//         isDarkMode={isDarkMode}
//       />
      
//       <StatusModal
//         isOpen={confirmEnd}
//         onClose={() => setConfirmEnd(false)}
//         title={rtl ? 'هل انت متأكد انك تريد إنهاء الامتحان؟' : 'End Exam?'}
//         message={rtl ? 'بمجرد إنهاء الامتحان، لن تتمكن من العودة إليه' : 
//                 'Once you end the exam, you cannot return to it.'}
//         type="warning"
//         icon={<span role="img" aria-label="warning" className="text-5xl">⚠️</span>}
//         primaryAction={confirmEndExam}
//         primaryActionText={rtl ? 'إنهاء' : 'End'}
//         secondaryAction={() => setConfirmEnd(false)}
//         secondaryActionText={rtl ? 'إلغاء' : 'Cancel'}
//         rtl={rtl}
//         isDarkMode={isDarkMode}
//       />
//     </div>
//   );
// };

// ExamPage.propTypes = {
//   examData: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     subtitle: PropTypes.string,
//     timeLimit: PropTypes.number.isRequired,
//     isOpenTime: PropTypes.bool,
//     questions: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//         text: PropTypes.string.isRequired,
//         image: PropTypes.string,
//         difficulty: PropTypes.string,
//         options: PropTypes.arrayOf(
//           PropTypes.shape({
//             id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//             text: PropTypes.string.isRequired
//           })
//         ).isRequired
//       })
//     ).isRequired
//   }).isRequired,
//   onExamComplete: PropTypes.func.isRequired,
//   rtl: PropTypes.bool
// };

// export default ExamPage;