// components/ui/LearnOvaLogo.jsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const LearnOvaLogo = ({ 
  size = 'medium', 
  variant = 'full', 
  className = '',
  showText = true,
  textColor,
  iconOnly = false
}) => {
  const { isDarkMode } = useTheme();
  
  // Size configurations
  const sizes = {
    small: {
      icon: 'w-8 h-8',
      iconInner: 'w-3 h-3 top-1 left-1',
      iconCircle: 'w-2 h-2 top-1.5 left-1.5',
      text: 'text-lg',
      gap: 'gap-2',
      radius: 'rounded-lg'
    },
    medium: {
      icon: 'w-12 h-12',
      iconInner: 'w-6 h-6 top-1.5 left-1.5',
      iconCircle: 'w-4 h-4 top-2 left-2',
      text: 'text-2xl',
      gap: 'gap-3',
      radius: 'rounded-xl'
    },
    large: {
      icon: 'w-16 h-16',
      iconInner: 'w-8 h-8 top-2 left-2',
      iconCircle: 'w-5 h-5 top-2.5 left-2.5',
      text: 'text-3xl',
      gap: 'gap-4',
      radius: 'rounded-2xl'
    },
    xlarge: {
      icon: 'w-20 h-20',
      iconInner: 'w-10 h-10 top-2.5 left-2.5',
      iconCircle: 'w-6 h-6 top-3.5 left-3.5',
      text: 'text-4xl',
      gap: 'gap-5',
      radius: 'rounded-3xl'
    }
  };
  
  const currentSize = sizes[size] || sizes.medium;
  
  // Text color logic
  const getTextColor = () => {
    if (textColor) return textColor;
    if (variant === 'dark') return 'text-white';
    if (variant === 'light') return 'text-gray-800';
    return isDarkMode ? 'text-white' : 'text-gray-800';
  };
  
  // Icon component
  const LogoIcon = () => (
    <div className={`${currentSize.icon} ${currentSize.radius} bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center relative transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl`}>
      {/* White circle base */}
      <div className={`${currentSize.iconInner} bg-white rounded-full absolute`}></div>
      {/* Gradient inner circle */}
      <div className={`${currentSize.iconCircle} bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full absolute z-10`}></div>
    </div>
  );
  
  // Return icon only if iconOnly is true
  if (iconOnly || !showText) {
    return (
      <div className={`group ${className}`}>
        <LogoIcon />
      </div>
    );
  }
  
  return (
    <div className={`flex items-center ${currentSize.gap} group ${className}`}>
      <LogoIcon />
      {showText && (
        <span className={`font-bold ${currentSize.text} font-sans tracking-tight transition-all duration-300 group-hover:scale-105 ${getTextColor()}`}>
          LearnNova
        </span>
      )}
    </div>
  );
};

export default LearnOvaLogo;