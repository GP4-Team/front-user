// src/components/ExamTimer.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ExamTimer = ({ 
  initialTime, 
  isOpen = false, 
  onTimeExpired,
  rtl = true
}) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Don't start countdown for open time exams
    if (isOpen) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          onTimeExpired && onTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onTimeExpired]);

  // Format seconds to HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  };

  return (
    <div className={`flex items-center ${rtl ? 'rtl' : 'ltr'} ${isExpired ? 'text-red-500' : 'text-white'}`}>
      <div className="flex items-center justify-center w-6 h-6">
        {/* Timer icon */}
        ⏱️
      </div>
      <div>
        <div className={`font-bold text-lg ${rtl ? 'mr-0 ml-2' : 'mr-2 ml-0'}`}>
          {isOpen ? 'وقت مفتوح' : formatTime(timeRemaining)}
        </div>
        <div className="text-xs text-gray-300">
          {rtl ? 'الوقت المتبقي' : 'Remaining Time'}
        </div>
      </div>
    </div>
  );
};

ExamTimer.propTypes = {
  initialTime: PropTypes.number,
  isOpen: PropTypes.bool,
  onTimeExpired: PropTypes.func,
  rtl: PropTypes.bool
};

export default ExamTimer;