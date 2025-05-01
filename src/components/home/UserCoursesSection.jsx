import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import CourseCard from '../courses/CourseCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const UserCoursesSection = ({ userCourses, translations }) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const isArabic = language === 'ar';
  
  // Refs for animations
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const linkRef = useRef(null);
  const cardsRef = useRef([]);

  // GSAP animations
  useEffect(() => {
    if (userCourses.length === 0) return;
    
    const section = sectionRef.current;
    let isMounted = true;
    let hoverEnterListeners = [];
    let hoverLeaveListeners = [];
    
    // Helper to check if component is still mounted
    const checkMounted = () => isMounted && sectionRef.current;
    
    try {
      // Header animation
      if (checkMounted() && titleRef.current && linkRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%"
          }
        });
        
        tl.fromTo(
          titleRef.current,
          { x: isRTL ? 50 : -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
        )
        .fromTo(
          linkRef.current,
          { x: isRTL ? -30 : 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.4"
        );
      }
      
      // Course cards animation with progress bar
      cardsRef.current.forEach((card, index) => {
        if (!card || !checkMounted()) return;
        
        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%"
          }
        });
        
        // Card animation
        cardTl.fromTo(
          card,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 0.1 * index, ease: "power3.out" }
        );
        
        // Progress bar animation
        const progressBar = card.querySelector('.progress-bar-fill');
        if (progressBar && checkMounted()) {
          const progressValue = parseInt(progressBar.getAttribute('data-progress') || '0');
          cardTl.fromTo(
            progressBar,
            { width: '0%' },
            { 
              width: `${progressValue}%`, 
              duration: 1.2, 
              ease: "power2.inOut",
              delay: 0.3 + (0.1 * index)
            }
          );
        }
        
        // Create named functions for event listeners
        const handleMouseEnter = () => {
          if (!checkMounted()) return;
          
          gsap.to(card, {
            y: -8,
            boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
            duration: 0.3
          });
        };
        
        const handleMouseLeave = () => {
          if (!checkMounted()) return;
          
          gsap.to(card, {
            y: 0,
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
            duration: 0.5
          });
        };
        
        // Store references to listeners for cleanup
        hoverEnterListeners[index] = handleMouseEnter;
        hoverLeaveListeners[index] = handleMouseLeave;
        
        // Add hover animations
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
      });
    } catch (error) {
      console.error('UserCoursesSection animation error:', error);
    }
    
    return () => {
      isMounted = false;
      
      // Cleanup animations
      try {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger) trigger.kill();
        });
        
        if (titleRef.current) {
          gsap.killTweensOf(titleRef.current);
        }
        
        if (linkRef.current) {
          gsap.killTweensOf(linkRef.current);
        }
        
        cardsRef.current.forEach((card, index) => {
          if (card) {
            gsap.killTweensOf(card);
            
            // Remove event listeners with the correct functions
            if (hoverEnterListeners[index]) {
              card.removeEventListener('mouseenter', hoverEnterListeners[index]);
            }
            
            if (hoverLeaveListeners[index]) {
              card.removeEventListener('mouseleave', hoverLeaveListeners[index]);
            }
            
            // Also cleanup progress bar animations
            const progressBar = card.querySelector('.progress-bar-fill');
            if (progressBar) {
              gsap.killTweensOf(progressBar);
            }
          }
        });
      } catch (error) {
        console.error('UserCoursesSection cleanup error:', error);
      }
    };
  }, [userCourses, language, isRTL, isDarkMode]);

  if (userCourses.length === 0) {
    return null;
  }

  return (
    <section 
      ref={sectionRef}
      className={`py-10 px-4 ${isDarkMode ? 'bg-background-card-dark' : 'bg-background-card-light'}`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 
            ref={titleRef}
            className={`text-2xl font-bold ${isDarkMode ? 'text-text-light' : 'text-text-dark'}`}
          >
            {translations.myCourses}
          </h2>
          <Link 
            ref={linkRef}
            to="/courses/enrolled" 
            className={`text-sm font-medium ${isDarkMode ? 'text-primary-light' : 'text-primary-base'} flex items-center hover:underline`}
          >
            {isArabic ? 'عرض الكل' : 'View All'}
            {isRTL ? (
              <ChevronLeft size={16} className="mr-1" />
            ) : (
              <ChevronRight size={16} className="ml-1" />
            )}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {userCourses.map((course, idx) => (
            <div 
              key={idx}
              ref={el => cardsRef.current[idx] = el}
              className="course-card-container"
            >
              <Link 
                to={`/courses/${course.id}`} 
                className={`block rounded-xl overflow-hidden shadow-md transition-all ${isDarkMode ? 'bg-neutral-800' : 'bg-background-card-light'}`}
              >
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title[language] || course.title.en} 
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 flex items-center">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm`}>
                      {course.progress}% {isArabic ? 'مكتمل' : 'Complete'}
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-primary-dark/50' : 'bg-primary-light/30'}`}>
                      {(() => {
                        const { Atom, Beaker, Calculator, Dna, Book } = require('lucide-react');
                        const category = course.category[language] || course.category.en;
                        
                        if (category.toLowerCase().includes("physics") || 
                            category.includes("فيزياء")) {
                          return <Atom size={14} />;
                        } else if (category.toLowerCase().includes("chemistry") || 
                                  category.includes("كيمياء")) {
                          return <Beaker size={14} />;
                        } else if (category.toLowerCase().includes("math") || 
                                  category.includes("رياضيات")) {
                          return <Calculator size={14} />;
                        } else if (category.toLowerCase().includes("biology") || 
                                  category.includes("أحياء")) {
                          return <Dna size={14} />;
                        } else {
                          return <Book size={14} />;
                        }
                      })()}
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-primary-light' : 'text-primary-base'} ml-2 rtl:mr-2 rtl:ml-0`}>
                      {course.category[language] || course.category.en}
                    </span>
                  </div>
                  <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-text-light' : 'text-text-dark'}`}>
                    {course.title[language] || course.title.en}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    {course.level[language] || course.level.en}
                  </p>
                  
                  <div className="mt-4">
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-2 rounded-full overflow-hidden">
                      <div 
                        className="progress-bar-fill bg-accent h-2 rounded-full" 
                        style={{ width: '0%' }}
                        data-progress={course.progress}
                      />
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 py-2 bg-primary-base hover:bg-primary-dark text-text-light rounded-lg font-medium text-sm transition-colors">
                    {translations.continueLearning}
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserCoursesSection;
