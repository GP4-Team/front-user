import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Debug flag - set to true to see debug info in console
const DEBUG = true;

// Get subject icon for each category
const getSubjectIcon = (category, size = 24) => {
  const { Atom, Beaker, Calculator, Dna, Book } = require('lucide-react');
  
  if (category.toLowerCase().includes("physics") || 
      category.includes("فيزياء")) {
    return <Atom size={size} />;
  } else if (category.toLowerCase().includes("chemistry") || 
          category.includes("كيمياء")) {
    return <Beaker size={size} />;
  } else if (category.toLowerCase().includes("math") || 
          category.includes("رياضيات")) {
    return <Calculator size={size} />;
  } else if (category.toLowerCase().includes("biology") || 
          category.includes("أحياء")) {
    return <Dna size={size} />;
  } else {
    return <Book size={size} />;
  }
};

// Helper function to get text in current language
const getText = (textObj, language) => {
  // Check if textObj is undefined or not an object
  if (!textObj || typeof textObj !== 'object') {
    return textObj || '';
  }
  
  // Return the appropriate language version or fallback
  return textObj[language] || textObj.en || '';
};

const ExamsSection = ({ exams = [], translations }) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const isArabic = language === 'ar';
  const sectionRef = useRef(null);
  const examRefs = useRef([]);
  
  // Ensure exams is always an array even if null or undefined is passed
  const examData = Array.isArray(exams) ? exams : [];
  
  // Debug log the exams data
  useEffect(() => {
    if (DEBUG) {
      console.log('ExamsSection rendered with:', examData);
      console.log('ExamsSection language:', language);
      console.log('Is Arabic:', isArabic);
      console.log('Translations:', translations);
    }
  }, [examData, language, isArabic, translations]);

  // GSAP animations
  useEffect(() => {
    const section = sectionRef.current;
    let isMounted = true;
    
    // Helper to check if component is still mounted
    const checkMounted = () => isMounted && sectionRef.current;

    // Debug info
    if (DEBUG) {
      console.log('ExamsSection animation effect running');
      console.log('Section element:', section);
      console.log('Exams data length:', examData.length);
    }
    
    if (checkMounted() && section) {
      try {
        // Set initial opacity to 1 to ensure content is visible immediately
        const heading = section.querySelector('h2');
        if (heading) {
          heading.style.opacity = "1";
          // Simple fade-in animation without scroll trigger
          gsap.fromTo(
            heading,
            { y: 10, opacity: 0.7 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.5, 
              ease: "power3.out"
            }
          );
        }

        // Only animate cards if we have exam data
        if (examData.length > 0) {
          // Immediate fade-in for exam cards with slight stagger
          const visibleCards = examRefs.current.filter(card => card !== null);
          if (visibleCards.length > 0 && checkMounted()) {
            // Set initial opacity to ensure content is visible even without animation
            visibleCards.forEach(card => {
              if (card) card.style.opacity = "1";
            });
            
            // Quick fade-in animation
            gsap.fromTo(
              visibleCards,
              { y: 10, opacity: 0.7 },
              { 
                y: 0, 
                opacity: 1, 
                duration: 0.5,
                stagger: 0.1,
                ease: "power3.out"
              }
            );
          }
        } else {
          // If no exams, make the message visible immediately
          const noExamsMessage = section.querySelector('.col-span-3');
          if (noExamsMessage) {
            noExamsMessage.style.opacity = "1";
            gsap.fromTo(
              noExamsMessage,
              { y: 10, opacity: 0.7 },
              { 
                y: 0, 
                opacity: 1, 
                duration: 0.5,
                ease: "power3.out"
              }
            );
          }
        }
      } catch (error) {
        console.error('ExamsSection animation error:', error);
      }
    }

    return () => {
      isMounted = false;
      
      // Cleanup animations
      try {
        if (section) {
          const heading = section.querySelector('h2');
          if (heading) {
            gsap.killTweensOf(heading);
          }
          
          examRefs.current.forEach(card => {
            if (card) {
              gsap.killTweensOf(card);
            }
          });

          // Also clean up any no exams message animation
          const noExamsMessage = section.querySelector('.col-span-3');
          if (noExamsMessage) {
            gsap.killTweensOf(noExamsMessage);
          }
        }
        
        // Clean up any ScrollTrigger instances
        const triggers = ScrollTrigger.getAll();
        triggers.forEach(trigger => {
          if (trigger && trigger.vars && trigger.vars.trigger === section) {
            trigger.kill();
          }
        });
      } catch (error) {
        console.error('ExamsSection cleanup error:', error);
      }
    };
  }, [examData, language, isDarkMode]);

  return (
    <section 
      ref={sectionRef}
      id="exams-section-container"
      className={`py-12 px-4 ${isDarkMode ? 'bg-background-dark' : 'bg-neutral-50'}`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-text-light' : 'text-text-dark'}`}>
            {translations.upcomingExams}
          </h2>
          <Link to="/exams" className={`text-sm font-medium ${isDarkMode ? 'text-primary-light' : 'text-primary-base'} flex items-center`}>
            {isArabic ? 'عرض الكل' : 'View All'}
            {isRTL ? (
              <ChevronLeft size={16} className="mr-1" />
            ) : (
              <ChevronRight size={16} className="ml-1" />
            )}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {examData.length > 0 ? (
            examData.map((exam, idx) => {
              // Determine status styling
              let statusColor = '';
              
              if (exam.status === 'upcoming') {
                statusColor = isDarkMode ? 'bg-primary-dark/30 text-primary-light' : 'bg-primary-light/30 text-primary-base';
              } else if (exam.status === 'active') {
                statusColor = isDarkMode ? 'bg-state-success/30 text-state-success' : 'bg-green-100 text-state-success';
              } else {
                statusColor = isDarkMode ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-100 text-neutral-700';
              }
            
            return (
              <div 
                key={idx}
                ref={el => examRefs.current[idx] = el}
                className={`rounded-xl overflow-hidden shadow-md transition-transform hover:-translate-y-1 duration-300 ${isDarkMode ? 'bg-neutral-800' : 'bg-background-card-light'}`}
              >
                <div className={`p-4 flex items-start justify-between border-b ${isDarkMode ? 'border-neutral-700' : 'border-neutral-100'}`}>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      getText(exam.subject, language).includes('Physics') || getText(exam.subject, language).includes('فيزياء')
                        ? isDarkMode ? 'bg-primary-dark/30' : 'bg-primary-light/30'
                        : getText(exam.subject, language).includes('Chemistry') || getText(exam.subject, language).includes('كيمياء')
                          ? isDarkMode ? 'bg-green-900/30' : 'bg-green-100'
                          : isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'
                    }`}>
                      {getSubjectIcon(getText(exam.subject, language), 20)}
                    </div>
                    <div className="ml-3 rtl:mr-3 rtl:ml-0">
                      <span className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        {getText(exam.subject, language)}
                      </span>
                      <h3 className={`font-bold ${isDarkMode ? 'text-text-light' : 'text-text-dark'}`}>
                        {getText(exam.title, language)}
                      </h3>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                    {getText(exam.date, language)}
                  </span>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex items-center text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      <Clock size={14} className="mr-1 rtl:ml-1 rtl:mr-0" />
                      <span>{getText(exam.duration, language)}</span>
                    </div>
                    <div className={`flex items-center text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0">
                        <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-1.12-2.5-2.5-2.5S6 10.62 6 12c0 .76.34 1.42.87 1.88L7 22l4-3 4 3 .13-8.12c.53-.46.87-1.12.87-1.88 0-1.38-1.12-2.5-2.5-2.5S11 10.62 11 12a2.5 2.5 0 002.5 2.5"></path>
                        <path d="M7 6h10M7 9h10"></path>
                      </svg>
                      <span>{exam.questionsCount} {isArabic ? 'سؤال' : 'questions'}</span>
                    </div>
                  </div>
                  
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    {getText(exam.level, language)}
                  </p>
                  
                  <button 
                    className={`w-full py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
                      exam.status === 'upcoming'
                        ? 'bg-primary-base hover:bg-primary-dark text-text-light'
                        : exam.status === 'active'
                          ? 'bg-accent hover:bg-secondary-base text-text-dark'
                          : isDarkMode ? 'bg-neutral-700 hover:bg-neutral-600 text-neutral-300' : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-700'
                    }`}
                  >
                    {exam.status === 'upcoming'
                      ? translations.registerForExam
                      : exam.status === 'active'
                        ? translations.startExam
                        : translations.viewResults
                    }
                  </button>
                </div>
              </div>
            );
          }))
          : (
            <div className="col-span-3 text-center py-10">
              <div className={`${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'} text-lg`}>
                {isArabic ? 'لا توجد اختبارات متاحة حالياً' : 'No exams available at the moment'}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExamsSection;
