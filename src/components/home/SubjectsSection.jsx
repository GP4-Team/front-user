import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Atom, Beaker, Calculator, Dna, Book } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const SubjectsSection = ({ translations }) => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const isArabic = language === 'ar';
  
  // Refs for animations
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subjectRefs = useRef([]);

  const subjects = [
    {
      id: 'physics',
      name: translations.physics,
      icon: <Atom size={32} />,
      color: isDarkMode ? 'text-primary-light bg-primary-dark/30' : 'text-primary-base bg-primary-light/30'
    },
    {
      id: 'chemistry',
      name: isArabic ? 'الكيمياء' : 'Chemistry',
      icon: <Beaker size={32} />,
      color: isDarkMode ? 'text-green-400 bg-green-900/30' : 'text-green-600 bg-green-100'
    },
    {
      id: 'mathematics',
      name: translations.math,
      icon: <Calculator size={32} />,
      color: isDarkMode ? 'text-purple-400 bg-purple-900/30' : 'text-purple-600 bg-purple-100'
    },
    {
      id: 'biology',
      name: isArabic ? 'الأحياء' : 'Biology',
      icon: <Dna size={32} />,
      color: isDarkMode ? 'text-red-400 bg-red-900/30' : 'text-red-600 bg-red-100'
    },
    {
      id: 'english',
      name: isArabic ? 'اللغة الإنجليزية' : 'English',
      icon: <Book size={32} />,
      color: isDarkMode ? 'text-yellow-400 bg-yellow-900/30' : 'text-yellow-600 bg-yellow-100'
    },
    {
      id: 'arabic',
      name: isArabic ? 'اللغة العربية' : 'Arabic',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={isDarkMode ? '#22d3ee' : '#0891b2'} strokeWidth="2" className="w-8 h-8">
          <path d="M12 3v1M3 12h1m17-1h1M5 5l1 1m12-1l-1 1M18 18l-1-1M5 19l1-1"/>
          <circle cx="12" cy="12" r="5" />
        </svg>
      ),
      color: isDarkMode ? 'text-cyan-400 bg-cyan-900/30' : 'text-cyan-600 bg-cyan-100'
    }
  ];

  // GSAP animations
  useEffect(() => {
    const section = sectionRef.current;
    let isMounted = true;
    let hoverEnterListeners = [];
    let hoverLeaveListeners = [];
    
    // Helper to check if component is still mounted
    const checkMounted = () => isMounted && sectionRef.current;
    
    try {
      // Title animation
      if (titleRef.current && checkMounted()) {
        // Set initial opacity to ensure visibility
        titleRef.current.style.opacity = "1";
        
        // Simple fade-in animation without scroll trigger
        gsap.fromTo(
          titleRef.current,
          { y: 10, opacity: 0.7 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.5, 
            ease: "power3.out"
          }
        );
      }

      // Subject items quick fade-in without scroll trigger
      if (checkMounted() && subjectRefs.current.length > 0) {
        // Set initial opacity to ensure visibility
        subjectRefs.current.forEach(item => {
          if (item) item.style.opacity = "1";
        });
        
        // Quick staggered animation
        const tl = gsap.timeline();

        // Animation for the grid items
        tl.fromTo(
          subjectRefs.current,
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
            stagger: {
              each: 0.05,
              grid: [2, 3],
              from: "center"
            },
            ease: "power3.out"
          }
        );
      }

      // Add hover animations
      subjectRefs.current.forEach((card, index) => {
        if (!card || !checkMounted()) return;
        
        // Create named functions for event listeners so we can remove them properly
        const handleMouseEnter = () => {
          if (!checkMounted()) return;
          
          gsap.to(card, {
            y: -10,
            scale: 1.05,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            duration: 0.3,
            ease: 'power2.out'
          });
          
          // Find the icon container and animate it
          const iconContainer = card.querySelector('.icon-container');
          if (iconContainer) {
            gsap.to(iconContainer, {
              scale: 1.1,
              rotation: 5,
              duration: 0.5,
              ease: 'elastic.out(1, 0.3)'
            });
          }
        };
        
        const handleMouseLeave = () => {
          if (!checkMounted()) return;
          
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            duration: 0.5,
            ease: 'power2.out'
          });
          
          // Reset icon animation
          const iconContainer = card.querySelector('.icon-container');
          if (iconContainer) {
            gsap.to(iconContainer, {
              scale: 1,
              rotation: 0,
              duration: 0.5,
              ease: 'elastic.out(1, 0.3)'
            });
          }
        };
        
        // Store the event listeners to remove them properly later
        hoverEnterListeners[index] = handleMouseEnter;
        hoverLeaveListeners[index] = handleMouseLeave;
        
        // Add the event listeners
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
      });
    } catch (error) {
      console.error('SubjectsSection animation error:', error);
    }

    return () => {
      isMounted = false;
      
      try {
        // Clean up animations
        if (titleRef.current) {
          gsap.killTweensOf(titleRef.current);
        }
        
        subjectRefs.current.forEach((card, index) => {
          if (card) {
            gsap.killTweensOf(card);
            
            // Remove event listeners with the correct functions
            if (hoverEnterListeners[index]) {
              card.removeEventListener('mouseenter', hoverEnterListeners[index]);
            }
            
            if (hoverLeaveListeners[index]) {
              card.removeEventListener('mouseleave', hoverLeaveListeners[index]);
            }
            
            // Also remove animations from icon containers
            const iconContainer = card.querySelector('.icon-container');
            if (iconContainer) {
              gsap.killTweensOf(iconContainer);
            }
          }
        });
        
        // Clean up ScrollTrigger instances
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger) {
            trigger.kill();
          }
        });
      } catch (error) {
        console.error('SubjectsSection cleanup error:', error);
      }
    };
  }, [language, isDarkMode, subjects]);

  return (
    <section 
      ref={sectionRef}
      className={`py-12 px-4 ${isDarkMode ? 'bg-background-dark' : 'bg-neutral-50'}`}
    >
      <div className="container mx-auto">
        <h2 
          ref={titleRef}
          className={`text-2xl font-bold mb-8 text-center ${isDarkMode ? 'text-text-light' : 'text-text-dark'}`}
        >
          {translations.subjects}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {subjects.map((subject, index) => (
            <Link 
              key={subject.id}
              ref={el => subjectRefs.current[index] = el}
              to={`/subjects/${subject.id}`} 
              className={`flex flex-col items-center p-6 rounded-xl ${isDarkMode ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-background-card-light hover:bg-neutral-50'} transition-all hover:shadow-md will-change-transform`}
            >
              <div className={`icon-container w-16 h-16 rounded-full ${subject.color.split(' ')[1]} flex items-center justify-center mb-3`}>
                <span className={subject.color.split(' ')[0]}>
                  {subject.icon}
                </span>
              </div>
              <h3 className={`font-medium text-center ${isDarkMode ? 'text-text-light' : 'text-text-dark'}`}>
                {subject.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubjectsSection;