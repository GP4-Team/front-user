// components/exams/EducationalAnimations.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const EducationalAnimations = () => {
  const animationsRef = useRef(null);

  useEffect(() => {
    if (!animationsRef.current) return;

    // Get all animation elements
    const elements = animationsRef.current.querySelectorAll('.animation-item');
    
    // Create animations for each educational icon
    elements.forEach(element => {
      // Random starting position in the container
      const startX = Math.random() * 100; // % position horizontally
      const startY = Math.random() * 100; // % position vertically
      
      // Set initial position
      gsap.set(element, {
        left: `${startX}%`,
        top: `${startY}%`,
      });
      
      // Create random floating animation
      gsap.to(element, {
        y: Math.random() * 20 - 10, // Move up or down by random amount
        x: Math.random() * 20 - 10, // Move left or right by random amount
        rotation: Math.random() * 10 - 5, // Slight rotation
        duration: 3 + Math.random() * 4, // Random duration between 3-7 seconds
        ease: "sine.inOut",
        repeat: -1, // Infinite repetition
        yoyo: true, // Go back and forth
        delay: Math.random() * 2, // Random delay start
      });
    });
    
    return () => {
      // Cleanup animations when component unmounts
      elements.forEach(element => {
        gsap.killTweensOf(element);
      });
    };
  }, []);

  return (
    <div 
      ref={animationsRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* Math/Science Icons */}
      <div className="animation-item absolute opacity-10 text-[#4C1C95]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2L2,12H5V20H19V12H22L12,2M12,5.5L16.5,10H14V16H10V10H7.5L12,5.5Z" />
        </svg>
      </div>
      <div className="animation-item absolute opacity-10 text-[#4C1C95]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4" />
        </svg>
      </div>
      <div className="animation-item absolute opacity-10 text-[#4C1C95]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18,10H6V8H18M18,14H6V12H18M18,18H6V16H18M3,20H21V4H3M5,6H19V18H5" />
        </svg>
      </div>
      <div className="animation-item absolute opacity-10 text-[#4C1C95]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10,9V7.5H14V9H10M10,11.5H14V13H10M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.9 3.9,3 5,3H19M19,5H5V19H19V5M7,7.5H9V13H7V7.5" />
        </svg>
      </div>
      <div className="animation-item absolute opacity-10 text-[#4C1C95]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.66,8L12,2.35L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8M6,14C6,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 18,12 18,14H6Z" />
        </svg>
      </div>
      <div className="animation-item absolute opacity-10 text-[#4C1C95]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19,4H5A2,2 0 0,0 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6A2,2 0 0,0 19,4M9,9H7V11H9V13H7V15H9A2,2 0 0,0 11,13V11A2,2 0 0,0 9,9M15,9A2,2 0 0,0 13,11V15A2,2 0 0,0 15,17H17V15H15V13H17V11H15V9Z" />
        </svg>
      </div>
      <div className="animation-item absolute opacity-10 text-[#4C1C95]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.39,19.37L16.38,18L15,22L11.92,16L9,22L7.62,18L3.61,19.37L6.53,13.37C5.57,12.17 5,10.65 5,9A7,7 0 0,1 12,2A7,7 0 0,1 19,9C19,10.65 18.43,12.17 17.47,13.37L20.39,19.37M7,9L9.69,10.34L12.76,8.54L9.85,7.81L8.54,4.69L7,9M16.5,9L15,4.5L12.81,5.85L14.54,8.85L13.76,11.76L16.5,9Z" />
        </svg>
      </div>
      <div className="animation-item absolute opacity-10 text-[#4C1C95]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.5,11H19V7C19,5.89 18.1,5 17,5H13V3.5A2.5,2.5 0 0,0 10.5,1A2.5,2.5 0 0,0 8,3.5V5H4A2,2 0 0,0 2,7V10.8H3.5C5,10.8 6.2,12 6.2,13.5C6.2,15 5,16.2 3.5,16.2H2V20A2,2 0 0,0 4,22H7.8V20.5C7.8,19 9,17.8 10.5,17.8C12,17.8 13.2,19 13.2,20.5V22H17A2,2 0 0,0 19,20V16H20.5A2.5,2.5 0 0,0 23,13.5A2.5,2.5 0 0,0 20.5,11Z" />
        </svg>
      </div>
      <div className="animation-item absolute opacity-10 text-[#4C1C95]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.03 3L7.92 6.28L4.77 6.85L6.72 9.33L6.3 12.5L9.03 11.13L11.76 12.5L11.34 9.33L13.28 6.85L10.14 6.28M13.67 3L12.5 6.38L9.34 6.96L11.43 9.62L11 12.91L13.67 11.5L16.33 12.91L15.91 9.62L18 6.96L14.84 6.38M18.5 3L17.27 6.5L14 7.07L16.14 9.85L15.71 13.29L18.5 11.85L21.29 13.29L20.86 9.85L23 7.07L19.73 6.5M3 13.5H7V17.5H3M9 13.5H13V17.5H9M15 13.5H19V17.5H15M3 19.5H7V23.5H3M9 19.5H13V23.5H9M15 19.5H19V23.5H15" />
        </svg>
      </div>
      <div className="animation-item absolute opacity-10 text-[#4C1C95]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7,3V5H9V12A2,2 0 0,0 11,14C13,14 13,15 13,15V18.692L10,21.5V22H16V21.5L13,18.692V15C13,15 13,14 15,14A2,2 0 0,0 17,12V5H19V3H7Z" />
        </svg>
      </div>
      <div className="animation-item absolute opacity-10 text-[#4C1C95]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,10A2,2 0 0,0 10,12C10,13.11 10.9,14 12,14C13.11,14 14,13.11 14,12A2,2 0 0,0 12,10M12,16C9.79,16 8,14.21 8,12C8,9.79 9.79,8 12,8C14.21,8 16,9.79 16,12C16,14.21 14.21,16 12,16M19,19H15.87C15.25,18.24 14.24,17.59 13.07,17.28L19,13.5M13,6.94V5H11V6.94C10,7.14 9.09,7.57 8.34,8.18L7.29,7.13L5.87,8.54L6.92,9.59C6.31,10.34 5.88,11.25 5.69,12.25H4V14.25H5.69C5.89,15.25 6.32,16.16 6.93,16.91L5.83,18L7.24,19.41L8.34,18.31C9.09,18.92 10,19.35 11,19.55V21.5H13V19.54C14,19.34 14.91,18.91 15.66,18.3L16.71,19.35L18.13,17.94L17.08,16.89C17.68,16.14 18.11,15.23 18.31,14.24H20V12.24H18.3C18.1,11.24 17.67,10.33 17.06,9.58L18.11,8.53L16.7,7.12L15.59,8.22C14.84,7.61 13.93,7.18 12.93,6.97L13,6.94Z" />
        </svg>
      </div>
    </div>
  );
};

export default EducationalAnimations;
