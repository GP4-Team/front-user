import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import gsap from 'gsap';

const AuthLayout = ({ children, title, subtitle }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, toggleLanguage, isRTL } = useLanguage();
  const isArabic = language === 'ar';
  
  // Refs for animations
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const contentRef = useRef(null);
  const decorationRef = useRef(null);
  const particulesRef = useRef([]);
  
  // GSAP animations
  useEffect(() => {
    // Logo and content animations
    const tl = gsap.timeline();
    
    tl.fromTo(
      logoRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    ).fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.3'
    );
    
    // Decor animations for the side panel
    gsap.fromTo(
      decorationRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power2.out', delay: 0.3 }
    );
    
    // Floating particles animations
    particulesRef.current.forEach((particle, index) => {
      if (particle) {
        gsap.to(particle, {
          y: 'random(-20, 20)',
          x: 'random(-20, 20)',
          rotation: 'random(-15, 15)',
          duration: 3 + index,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2
        });
      }
    });
    
    return () => {
      tl.kill();
      gsap.killTweensOf([decorationRef.current, ...particulesRef.current]);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={`min-h-screen flex flex-col md:flex-row ${isDarkMode ? 'bg-background-dark text-text-light' : 'bg-background-light text-text-dark'}`}
    >
      {/* Left side - Form Content */}
      <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
        {/* Logo and language controls */}
        <div className="flex justify-between items-center mb-8">
          <Link ref={logoRef} to="/" className="flex items-center">
            <div className={`${isDarkMode ? 'bg-neutral-800' : 'bg-white'} rounded-full h-10 w-10 flex items-center justify-center mr-2 rtl:ml-2 rtl:mr-0 shadow-md`}>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="transform transition-transform duration-700 hover:rotate-180"
              >
                <path 
                  d="M12 2L5 6V10C5 15.5 8.1 20.6 12 22C15.9 20.6 19 15.5 19 10V6L12 2ZM16 10C16 14.1 13.9 18 12 19.5C10.1 18 8 14.1 8 10V7.3L12 5L16 7.3V10Z" 
                  fill={isDarkMode ? "#7986CB" : "#3949AB"} 
                />
                <path 
                  d="M11 10H13V16H11V10ZM11 6H13V8H11V6Z" 
                  fill={isDarkMode ? "#7986CB" : "#3949AB"} 
                />
              </svg>
            </div>
            <span className={`font-bold text-xl`}>
              Eduara
            </span>
          </Link>
          
          <div className="flex space-x-2 rtl:space-x-reverse">
            <button 
              onClick={toggleLanguage}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-white hover:bg-neutral-100'} shadow-sm`}
            >
              {isArabic ? 'EN' : 'عربي'}
            </button>
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-white hover:bg-neutral-100'} shadow-sm`}
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <circle cx="12" cy="12" r="4" />
                  <path strokeLinecap="round" d="M12 2v2m0 16v2m-8-10H2m20 0h-2m-4.55-5.45L14.17 4.4m-4.34 14.1L6.83 19.6m11.32-9.1l1.2-1.2m-14.1 4.34l-1.2 1.2" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Form content */}
        <div 
          ref={contentRef} 
          className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
          <p className={`mb-8 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>{subtitle}</p>
          
          {children}
        </div>
        
        {/* Footer */}
        <div className={`text-center mt-8 py-4 text-sm ${isDarkMode ? 'text-neutral-500' : 'text-neutral-600'}`}>
          &copy; {new Date().getFullYear()} Eduara. {isArabic ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
        </div>
      </div>
      
      {/* Right side - Decorative Content */}
      <div 
        className="hidden md:flex md:w-1/2 relative bg-gradient-to-br from-primary-base to-primary-dark items-center justify-center overflow-hidden"
      >
        <div 
          ref={decorationRef}
          className="relative z-10 text-white text-center max-w-md p-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {isArabic 
              ? 'طريقك للتميز في عالم التعليم' 
              : 'Your Path to Excellence in Education'}
          </h2>
          <p className="text-lg mb-8 text-blue-100">
            {isArabic
              ? 'منصة تعليمية متكاملة تساعدك على تحقيق أهدافك الدراسية بأسلوب تفاعلي ممتع'
              : 'A comprehensive learning platform that helps you achieve your academic goals in an interactive and enjoyable way'
            }
          </p>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
              <h3 className="font-bold text-xl mb-1">500+</h3>
              <p className="text-sm text-blue-100">
                {isArabic ? 'دورة تعليمية' : 'Courses'}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
              <h3 className="font-bold text-xl mb-1">50K+</h3>
              <p className="text-sm text-blue-100">
                {isArabic ? 'طالب نشط' : 'Active Students'}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
              <h3 className="font-bold text-xl mb-1">100+</h3>
              <p className="text-sm text-blue-100">
                {isArabic ? 'معلم محترف' : 'Professional Teachers'}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
              <h3 className="font-bold text-xl mb-1">24/7</h3>
              <p className="text-sm text-blue-100">
                {isArabic ? 'دعم متواصل' : 'Continuous Support'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div 
          ref={el => particulesRef.current[0] = el}
          className="absolute top-20 right-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm z-0"
        ></div>
        <div 
          ref={el => particulesRef.current[1] = el}
          className="absolute bottom-40 left-10 w-32 h-32 rounded-full bg-white/5 backdrop-blur-sm z-0"
        ></div>
        <div 
          ref={el => particulesRef.current[2] = el}
          className="absolute top-1/3 left-1/4 w-16 h-16 rounded-lg bg-white/10 backdrop-blur-sm z-0"
        ></div>
        <div 
          ref={el => particulesRef.current[3] = el}
          className="absolute bottom-20 right-1/4 w-24 h-24 rounded-xl bg-white/5 backdrop-blur-sm z-0"
        ></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
      </div>
    </div>
  );
};

export default AuthLayout;
