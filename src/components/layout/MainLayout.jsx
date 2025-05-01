import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../navigation/Navbar';
import SimpleFooter from './SimpleFooter';
import { useTheme } from '../../contexts/ThemeContext';
import gsap from 'gsap';

const MainLayout = ({ children }) => {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const mainRef = useRef(null);
  
  // Add page transition animations
  useEffect(() => {
    const main = mainRef.current;
    
    if (main) {
      // Create timeline for page transitions
      const tl = gsap.timeline();
      
      // Fade in the content
      tl.fromTo(
        main,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.3 }
      );
      
      // Clean up
      return () => {
        tl.kill();
      };
    }
  }, [location.pathname]);

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
      <Navbar />
      <main ref={mainRef} className="flex-grow pt-16">
        {children}
      </main>
      <SimpleFooter />
    </div>
  );
};

export default MainLayout;
