import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import CourseCard from '../courses/CourseCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Debug flag
const DEBUG = true;

const FeaturedCoursesSection = ({ courses, translations }) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const isArabic = language === 'ar';
  
  // Refs for GSAP animations
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  // For debugging
  useEffect(() => {
    if (DEBUG) {
      if (courses && courses.length > 0) {
        console.log('FeaturedCoursesSection received courses:', courses);
      } else {
        console.warn('FeaturedCoursesSection received empty courses array');
      }
    }
  }, [courses]);

  // GSAP animations
  useEffect(() => {
    const section = sectionRef.current;
    let enterListeners = [];
    let leaveListeners = [];
    let isMounted = true;
    
    // Helper to check if component is still mounted
    const checkMounted = () => isMounted && sectionRef.current;
    
    // Title animation
    if (headingRef.current && checkMounted()) {
      try {
        // Set initial opacity to ensure visibility even without animation
        headingRef.current.style.opacity = "1";
        
        // Simple fade-in animation without scroll trigger
        gsap.fromTo(
          headingRef.current,
          { y: 10, opacity: 0.7 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.5, 
            ease: "power3.out"
          }
        );
      } catch (error) {
        console.error('Title animation error:', error);
      }
    }

    // Cards staggered animation without scroll trigger
    cardsRef.current.forEach((card, index) => {
      if (!card || !checkMounted()) return;
      
      try {
        // Set initial opacity to ensure visibility even without animation
        card.style.opacity = "1";
        
        // Quick fade-in animation with stagger
        gsap.fromTo(
          card,
          { 
            y: 15, 
            opacity: 0.7,
            scale: 0.95
          },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 0.5, 
            delay: 0.05 * index,
            ease: "power3.out"
          }
        );
      } catch (error) {
        console.error('Card animation error:', error);
      }
      
      // Create named functions for event listeners so we can remove them properly
      const handleMouseEnter = () => {
        if (!checkMounted()) return;
        gsap.to(card, {
          y: -8,
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          duration: 0.3,
          ease: 'power2.out'
        });
      };
      
      const handleMouseLeave = () => {
        if (!checkMounted()) return;
        gsap.to(card, {
          y: 0,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          duration: 0.5,
          ease: 'power2.out'
        });
      };
      
      // Add hover effect with GSAP
      if (card) {
        // Store references to listeners for cleanup
        enterListeners[index] = handleMouseEnter;
        leaveListeners[index] = handleMouseLeave;
        
        // Add event listeners
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
      }
    });

    // Cleanup function
    return () => {
      isMounted = false;
      
      // Clean up animations
      try {
        if (headingRef.current) {
          gsap.killTweensOf(headingRef.current);
        }
        
        // Clean up card animations and event listeners
        cardsRef.current.forEach((card, index) => {
          if (card) {
            gsap.killTweensOf(card);
            
            // Remove event listeners with the correct named functions
            if (enterListeners[index]) {
              card.removeEventListener('mouseenter', enterListeners[index]);
            }
            
            if (leaveListeners[index]) {
              card.removeEventListener('mouseleave', leaveListeners[index]);
            }
          }
        });
        
        // Clean up ScrollTriggers
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger) trigger.kill();
        });
      } catch (error) {
        console.error('Cleanup error:', error);
      }
    };
  }, [courses, language, isDarkMode]);

  // Check if courses data is valid
  if (!courses || !Array.isArray(courses) || courses.length === 0) {
    if (DEBUG) console.warn('FeaturedCoursesSection: Invalid or empty courses data');
    return null; // Don't render anything if no courses
  }

  return (
    <section 
      ref={sectionRef}
      id="featured-courses-section"
      className={`py-12 px-4 ${isDarkMode ? 'bg-background-card-dark' : 'bg-background-card-light'}`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 
            ref={headingRef}
            className={`text-2xl font-bold ${isDarkMode ? 'text-text-light' : 'text-text-dark'}`}
          >
            {translations.featuredCourses}
          </h2>
          <Link 
            to="/courses" 
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
          {courses.map((course, idx) => (
            <div 
              key={idx} 
              ref={el => cardsRef.current[idx] = el}
              className="card-wrapper"
            >
              <CourseCard 
                course={course} 
                translations={translations}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;