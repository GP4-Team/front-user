import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ClockCircleOutlined } from '@ant-design/icons';

const ExamTimer = ({ 
  initialTime, 
  onTimeEnd, 
  isExamEnded,
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
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();

  useEffect(() => {
    if (isExamEnded) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onTimeEnd();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeEnd, isExamEnded]);

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
