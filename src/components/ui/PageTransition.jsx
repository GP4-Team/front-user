import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const PageTransition = () => {
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const dotsRef = useRef([]);
  
  // إظهار شاشة الانتقال عند تغيير المسار
  useEffect(() => {
    let timeoutId = null;
    let animation = null;
    let isMounted = true;
    
    // دالة للتحقق من أن المكون ما زال مثبتًا
    const checkMounted = () => isMounted && overlayRef.current;
    
    // إظهار شاشة الانتقال
    if (overlayRef.current && !location.pathname.startsWith('/auth')) {
      if (isMounted) {
        setIsVisible(true);
      }
      
      // إنشاء تأثير الانتقال
      try {
        const tl = gsap.timeline({
          onComplete: () => {
            // إلغاء التحريك إذا تم إلغاء تحميل المكون
            if (!checkMounted()) return;
          }
        });
        
        tl.set(overlayRef.current, { display: 'flex' })
          .fromTo(
            overlayRef.current,
            { opacity: 0 },
            { 
              opacity: 1, 
              duration: 0.3,
              ease: 'power2.inOut'
            }
          );
          
        if (logoRef.current && checkMounted()) {
          tl.fromTo(
            logoRef.current,
            { scale: 0, rotation: -45 },
            { 
              scale: 1, 
              rotation: 0, 
              duration: 0.6, 
              ease: 'back.out(1.7)' 
            },
            '-=0.1'
          );
        }
        
        if (textRef.current && checkMounted()) {
          tl.fromTo(
            textRef.current,
            { y: 20, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.4,
              ease: 'power2.out'
            },
            '-=0.3'
          );
        }
      
        // تأثير النقاط المتحركة
        if (dotsRef.current.length > 0 && checkMounted()) {
          animation = gsap.to(dotsRef.current, {
            y: -10,
            stagger: 0.1,
            repeat: -1,
            yoyo: true,
            duration: 0.4,
            ease: 'power1.inOut'
          });
        }
      } catch (error) {
        console.error('Animation error:', error);
      }
      
      // إخفاء شاشة الانتقال بعد وقت محدد
      timeoutId = setTimeout(() => {
        if (checkMounted()) {
          try {
            gsap.to(overlayRef.current, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                if (checkMounted()) {
                  gsap.set(overlayRef.current, { display: 'none' });
                  setIsVisible(false);
                }
              }
            });
          } catch (error) {
            console.error('Hide animation error:', error);
            // Fallback in case animation fails
            if (checkMounted()) {
              setIsVisible(false);
            }
          }
        }
      }, 1000);
    }
    
    // تنظيف الموارد عند إلغاء تحميل المكون
    return () => {
      isMounted = false;
      
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      if (animation) {
        try {
          animation.kill();
        } catch (error) {
          console.error('Error killing animation:', error);
        }
      }
      
      // Clean up any ongoing GSAP animations
      if (overlayRef.current) {
        try {
          gsap.killTweensOf(overlayRef.current);
        } catch (error) {
          console.error('Error killing overlay tweens:', error);
        }
      }
    };
  }, [location.pathname]);
  
  // لا نعرض شاشة الانتقال لصفحات المصادقة
  if (location.pathname.startsWith('/auth') || !isVisible) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-[9999] hidden items-center justify-center flex-col ${
        isDarkMode ? 'bg-background-dark' : 'bg-background-card-light'
      }`}
    >
      <div ref={logoRef} className="flex items-center justify-center mb-4">
        <div className={`${isDarkMode ? 'bg-neutral-800' : 'bg-white'} rounded-full h-16 w-16 flex items-center justify-center shadow-lg`}>
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
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
      </div>
      <div ref={textRef} className="flex flex-col items-center">
        <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-primary-base'} mb-2`}>
          Eduara
        </h2>
        <div className="flex space-x-1">
          <div 
            ref={el => dotsRef.current[0] = el}
            className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-primary-light' : 'bg-primary-base'}`}
          ></div>
          <div 
            ref={el => dotsRef.current[1] = el}
            className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-primary-light' : 'bg-primary-base'}`}
          ></div>
          <div 
            ref={el => dotsRef.current[2] = el}
            className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-primary-light' : 'bg-primary-base'}`}
          ></div>
        </div>
        <p className={`mt-4 text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
          {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
        </p>
      </div>
    </div>
  );
};

export default PageTransition;
