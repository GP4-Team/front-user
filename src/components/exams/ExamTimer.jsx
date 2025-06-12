import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ClockCircleOutlined } from '@ant-design/icons';

const ExamTimer = ({ 
  initialTime, 
  onTimeEnd, 
  isExamEnded,
  onTimeUpdate, // Add callback to update parent with current time
  colors = {
    primaryDark: '#1A237F',
    primaryBase: '#3949AB',
    primaryLight: '#7986CB',
    accent: '#FFC107',
    textDark: '#37474F',
    bgLight: '#ECEFF1',
    white: '#FFFFFF',
  }
}) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    // Better initial time handling
    const time = Math.max(0, parseInt(initialTime) || 0);
    console.log('[ExamTimer] Initial time calculation:', { initialTime, time });
    return time;
  });
  
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();

  // Debug logging
  useEffect(() => {
    console.log('[ExamTimer] Component mounted/updated:', {
      initialTime,
      timeLeft,
      isExamEnded
    });
  }, [initialTime, timeLeft, isExamEnded]);

  // Update timeLeft when initialTime changes
  useEffect(() => {
    const newTime = Math.max(0, parseInt(initialTime) || 0);
    console.log('[ExamTimer] initialTime changed:', { initialTime, newTime, current: timeLeft });
    
    // Only update if the new time is significantly different
    if (Math.abs(newTime - timeLeft) > 5) {
      console.log('[ExamTimer] Updating timeLeft to:', newTime);
      setTimeLeft(newTime);
    }
  }, [initialTime]);

  useEffect(() => {
    if (isExamEnded) {
      console.log('[ExamTimer] Exam ended, stopping timer');
      return;
    }

    // Don't start timer if time is 0 and we haven't received a proper initial time yet
    if (timeLeft <= 0 && initialTime <= 0) {
      console.log('[ExamTimer] No valid time provided, waiting...');
      return;
    }

    // If we have a valid timeLeft but it's 0, end the exam
    if (timeLeft <= 0 && initialTime > 0) {
      console.log('[ExamTimer] Time is up, calling onTimeEnd');
      onTimeEnd();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        
        // Update parent component with current time
        if (onTimeUpdate) {
          onTimeUpdate(newTime);
        }
        
        if (newTime <= 0) {
          console.log('[ExamTimer] Timer reached 0, calling onTimeEnd');
          clearInterval(timer);
          onTimeEnd();
          return 0;
        }
        
        return newTime;
      });
    }, 1000);

    return () => {
      console.log('[ExamTimer] Cleaning up timer');
      clearInterval(timer);
    };
  }, [onTimeEnd, isExamEnded, timeLeft, initialTime, onTimeUpdate]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = hours > 0 ? `${hours.toString().padStart(2, '0')}:` : '';
    return `${formattedHours}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Warning colors for when time is running out
  const getTimerColor = () => {
    if (timeLeft < 60) return 'text-red-600'; // Less than 1 minute
    if (timeLeft < 300) return 'text-amber-500'; // Less than 5 minutes
    return isDarkMode ? 'text-white' : 'text-gray-700';
  };

  return (
    <div className={`flex items-center ${getTimerColor()} font-bold text-lg px-3 py-1 rounded-lg 
      ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
      <ClockCircleOutlined className="mr-2" />
      <span dir="ltr" className="tabular-nums">{formatTime(timeLeft)}</span>
    </div>
  );
};

export default ExamTimer;