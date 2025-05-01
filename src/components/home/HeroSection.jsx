import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Award, PieChart, Atom, Calculator, Beaker } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ translations }) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const isArabic = language === 'ar';
  
  // Refs for GSAP animations
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const decorRef = useRef(null);
  const buttonsRef = useRef(null);
  const featuresRef = useRef(null);
  const imageRef = useRef(null);
  const iconsRef = useRef([]);
  const particlesRef = useRef([]);

  // GSAP animations
  useEffect(() => {
    let tl;
    let animations = [];
    let isMounted = true;
    
    // Check for reduced motion preference
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Helper to check if component is still mounted
    const checkMounted = () => isMounted && heroRef.current;
    
    // Skip animations if user prefers reduced motion
    if (isReducedMotion) {
      // Make sure content is visible without animations
      if (headingRef.current) headingRef.current.style.opacity = 1;
      if (subheadingRef.current) subheadingRef.current.style.opacity = 1;
      if (decorRef.current) decorRef.current.style.opacity = 1;
      if (imageRef.current) imageRef.current.style.opacity = 1;
      
      if (buttonsRef.current && buttonsRef.current.children) {
        Array.from(buttonsRef.current.children).forEach(child => {
          child.style.opacity = 1;
        });
      }
      
      if (featuresRef.current && featuresRef.current.children) {
        Array.from(featuresRef.current.children).forEach(child => {
          child.style.opacity = 1;
        });
      }
      
      return () => { isMounted = false; };
    }
    
    try {
      // Timeline for hero section - enhanced animations
      tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      // Check for valid references before animating
      if (headingRef.current && checkMounted()) {
        tl.fromTo(
          headingRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 }
        );
      }
      
      if (decorRef.current && checkMounted()) {
        tl.fromTo(
          decorRef.current,
          { width: 0, opacity: 0 },
          { width: '6rem', opacity: 1, duration: 0.6 },
          '-=0.4'
        );
      }
      
      if (subheadingRef.current && checkMounted()) {
        tl.fromTo(
          subheadingRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.2'
        );
      }
      
      if (buttonsRef.current && buttonsRef.current.children && checkMounted()) {
        tl.fromTo(
          buttonsRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          '-=0.4'
        );
      }
      
      if (featuresRef.current && featuresRef.current.children && checkMounted()) {
        tl.fromTo(
          featuresRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          '-=0.2'
        );
      }
      
      // Enhanced image animation
      if (imageRef.current && checkMounted()) {
        // First create a timeline for the image animations
        const imageTl = gsap.timeline();
        
        // Initial entrance animation
        imageTl.fromTo(
          imageRef.current,
          { scale: 0.8, opacity: 0, y: 40 },
          { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.75)' }
        );
        
        // Add a subtle float animation
        imageTl.to(
          imageRef.current,
          { 
            y: '-=10', 
            repeat: -1, 
            yoyo: true, 
            duration: 1.5,
            ease: 'sine.inOut'
          },
          '>=0'
        );
        
        animations.push(imageTl);
      }
      
      // Animate all floating icons with more dynamic effects
      iconsRef.current.forEach((icon, index) => {
        if (icon && checkMounted()) {
          const delay = index * 0.2;
          const duration = 2 + (index * 0.3);
          const distance = -(5 + (index * 3));
          
          const iconTl = gsap.timeline({ repeat: -1 });
          
          // Initial appearance with slight rotation
          iconTl.fromTo(
            icon,
            { y: 20, opacity: 0, rotation: -15 },
            { y: 0, opacity: 1, rotation: 0, duration: 0.8, delay: delay }
          );
          
          // Floating animation with rotation
          iconTl.to(
            icon,
            { 
              y: distance, 
              duration: duration, 
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true
            }
          );
          
          // Add a subtle rotation
          gsap.to(
            icon,
            {
              rotation: 5,
              duration: duration * 0.7,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            }
          );
          
          animations.push(iconTl);
        }
      });
      
      // Animate background particles with subtle pulse effect
      particlesRef.current.forEach((particle, index) => {
        if (particle && checkMounted()) {
          const particleTl = gsap.timeline({ repeat: -1 });
          
          // Subtle scale and opacity pulsing
          particleTl.to(
            particle,
            { 
              opacity: 0.4 + (Math.random() * 0.2),
              scale: 1 + (Math.random() * 0.1), 
              duration: 2 + (Math.random() * 2),
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
              delay: index * 0.3
            }
          );
          
          animations.push(particleTl);
        }
      });
      
    } catch (error) {
      console.error('HeroSection animation error:', error);
    }

    return () => {
      isMounted = false;
      
      // Clean up animations
      try {
        if (tl) {
          tl.kill();
        }
        
        // Kill individual animations
        animations.forEach(anim => {
          if (anim) {
            anim.kill();
          }
        });
        
        // Kill tweens on specific elements
        if (imageRef.current) {
          gsap.killTweensOf(imageRef.current);
        }
        
        iconsRef.current.forEach(icon => {
          if (icon) {
            gsap.killTweensOf(icon);
          }
        });
        
        particlesRef.current.forEach(particle => {
          if (particle) {
            gsap.killTweensOf(particle);
          }
        });
      } catch (error) {
        console.error('HeroSection cleanup error:', error);
      }
    };
  }, [language, isDarkMode]); // Re-run animation when language or theme changes

  return (
    <section 
      ref={heroRef}
      className={`pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden min-h-[calc(100vh-64px)] flex items-center ${
        isDarkMode ? 'bg-background-dark' : 'bg-gradient-to-br from-background-light via-blue-50 to-neutral-100'
      }`}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div 
          ref={el => particlesRef.current[0] = el}
          className={`absolute top-20 right-[20%] w-32 h-32 rounded-full ${isDarkMode ? 'bg-primary-dark' : 'bg-primary-light'} filter blur-3xl opacity-20 animate-pulse-slower`}
        ></div>
        <div 
          ref={el => particlesRef.current[1] = el}
          className={`absolute bottom-10 left-[10%] w-40 h-40 rounded-full ${isDarkMode ? 'bg-accent/50' : 'bg-accent/30'} filter blur-3xl opacity-20 animate-float-slow`}
        ></div>
        <div 
          ref={el => particlesRef.current[2] = el}
          className={`absolute top-[40%] left-[30%] w-24 h-24 rounded-full ${isDarkMode ? 'bg-primary-light' : 'bg-primary-base/20'} filter blur-3xl opacity-10 animate-pulse-slow`}
        ></div>
        <div 
          ref={el => particlesRef.current[3] = el}
          className={`absolute top-[20%] left-[60%] w-16 h-16 rounded-full ${isDarkMode ? 'bg-accent/50' : 'bg-accent/20'} filter blur-xl opacity-20 animate-float`}
        ></div>
        
        {/* Additional animated gradients */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-primary-base/5 to-transparent opacity-60 animate-pulse-slower"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-accent/5 to-transparent opacity-60 animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Hero Content */}
          <div className="md:w-7/12 text-center md:text-right rtl:md:text-left">
            <h1 
              ref={headingRef}
              className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${isDarkMode ? 'text-text-light' : 'text-text-dark'}`}
            >
              {translations.mainHeading}
            </h1>
            <div 
              ref={decorRef}
              className="w-24 h-1.5 bg-accent mx-auto md:mx-0 md:rtl:ml-auto md:ltr:mr-0 my-6 rounded-full"
            ></div>
            <p 
              ref={subheadingRef}
              className={`text-lg ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'} max-w-xl mx-auto md:mx-0 md:rtl:ml-auto md:ltr:mr-0`}
            >
              {translations.subHeading}
            </p>

            <div 
              ref={buttonsRef}
              className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start md:rtl:justify-end"
            >
              <Link to="/courses" className="bg-primary-base hover:bg-primary-dark text-text-light font-medium py-3 px-6 rounded-lg shadow-sm flex items-center transition-transform hover:-translate-y-0.5">
                {translations.exploreCourses}
                {isRTL ? (
                  <ChevronLeft size={18} className="mr-1 rtl:ml-1 rtl:mr-0" />
                ) : (
                  <ChevronRight size={18} className="ml-1 rtl:mr-1 rtl:ml-0" />
                )}
              </Link>
              <Link to="/exams" className={`${isDarkMode ? 'bg-background-card-dark hover:bg-neutral-800' : 'bg-background-card-light hover:bg-neutral-50'} text-text-dark dark:text-text-light font-medium py-3 px-6 rounded-lg shadow-sm flex items-center transition-transform hover:-translate-y-0.5`}>
                {translations.onlineTests}
              </Link>
            </div>

            {/* Features */}
            <div 
              ref={featuresRef}
              className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto md:mx-0 md:rtl:ml-auto md:ltr:mr-0"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-full ${isDarkMode ? 'bg-primary-dark/30' : 'bg-primary-light/30'} flex items-center justify-center mb-2`}>
                  <Award size={20} className={isDarkMode ? 'text-primary-light' : 'text-primary-base'} />
                </div>
                <p className={`text-xs ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  {translations.featurePath}
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-full ${isDarkMode ? 'bg-primary-dark/30' : 'bg-primary-light/30'} flex items-center justify-center mb-2`}>
                  <PieChart size={20} className={isDarkMode ? 'text-primary-light' : 'text-primary-base'} />
                </div>
                <p className={`text-xs ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  {translations.featureTracking}
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-full ${isDarkMode ? 'bg-primary-dark/30' : 'bg-primary-light/30'} flex items-center justify-center mb-2`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={isDarkMode ? '#7986CB' : '#3949AB'} strokeWidth="2" className="w-5 h-5">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"/>
                  </svg>
                </div>
                <p className={`text-xs ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  {translations.featureAI}
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="md:w-5/12 flex justify-center">
            <div ref={imageRef} className="relative">
              {/* Circular background with animated gradient */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="w-64 h-64 rounded-full bg-gradient-to-r from-accent/40 to-primary-light/30 dark:from-accent/30 dark:to-primary-dark/20 animate-pulse"></div>
              </div>
              
              {/* Character image */}
              <img 
                src="/student.png" 
                alt={isArabic ? "شخصية طالب" : "Student character"}
                className="relative z-10 h-80 object-contain"
                onError={(e) => {
                  // Fallback to a data URI if the image fails to load
                  e.target.onerror = null;
                  e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='400' viewBox='0 0 320 400'%3E%3Crect width='320' height='400' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%23999' text-anchor='middle' dominant-baseline='middle'%3EStudent%3C/text%3E%3C/svg%3E`;
                }}
              />
              
              {/* Decorative elements with CSS animations */}
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-primary-base/30 dark:bg-primary-base/20 rounded-full animate-pulse-slow"></div>
              <div className="absolute bottom-10 -left-6 w-8 h-8 bg-accent/40 dark:bg-accent/30 rounded-full animate-float-slow"></div>
              <div className="absolute top-12 -left-4 w-6 h-6 bg-secondary-base/30 dark:bg-secondary-base/20 rounded-full animate-pulse-slower"></div>
              
              {/* Additional floating decoration */}
              <div className="absolute -bottom-2 right-10 w-12 h-3 bg-gradient-to-r from-primary-light/40 to-accent/30 rounded-full blur-sm animate-float"></div>
              
              {/* Floating icons */}
              <div ref={el => iconsRef.current[0] = el} className="absolute top-4 right-16">
                <Atom size={24} className="text-primary-base dark:text-primary-light" />
              </div>
              <div ref={el => iconsRef.current[1] = el} className="absolute bottom-16 left-4">
                <Calculator size={24} className="text-accent dark:text-accent" />
              </div>
              <div ref={el => iconsRef.current[2] = el} className="absolute bottom-4 right-4">
                <Beaker size={24} className="text-state-error dark:text-state-error" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
