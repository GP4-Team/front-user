// src/context/ThemeContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a context for the theme
const ThemeContext = createContext();

// Theme colors object (based on your color palette)
export const themeColors = {
  light: {
    primaryDark: '#546E7A',
    primaryBase: '#607D8B',
    primaryLight: '#78909C',
    primaryLightest: '#B0BEC5',
    accentPrimary: '#A5D6A7',
    accentSecondary: '#81C784',
    textDark: '#455A64',
    bgLight: '#ECEFF1',
    white: '#FFFFFF',
    cardBg: '#FFFFFF',
    border: '#E5E7EB',
    inputBg: '#F3F4F6'
  },
  dark: {
    primaryDark: '#455A64',
    primaryBase: '#546E7A',
    primaryLight: '#607D8B',
    primaryLightest: '#78909C',
    accentPrimary: '#81C784',
    accentSecondary: '#66BB6A',
    textDark: '#ECEFF1',
    bgLight: '#263238',
    white: '#1E272C',
    cardBg: '#37474F',
    border: '#455A64',
    inputBg: '#455A64'
  }
};

export const ThemeProvider = ({ children }) => {
  // Check for user preference in localStorage or system preference
  const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPrefs = window.localStorage.getItem('color-theme');
      if (typeof storedPrefs === 'string') {
        return storedPrefs;
      }

      const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
      if (userMedia.matches) {
        return 'dark';
      }
    }

    return 'light'; // Default theme
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  const rawSetTheme = (rawTheme) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(rawTheme);

    localStorage.setItem('color-theme', rawTheme);
  };

  // Only run on client side
  useEffect(() => {
    setMounted(true);
    rawSetTheme(theme);
  }, [theme]);

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isDarkMode: theme === 'dark',
    colors: theme === 'dark' ? themeColors.dark : themeColors.light
  };

  // On first render, prevent flash by hiding content until mounted
  return (
    <ThemeContext.Provider value={value}>
      {mounted && children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
