// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Primary colors from your palette
        "primary-dark": "#1A237E",
        "primary-base": "#3949AB",
        "primary-light": "#7986CB",
        accent: "#FFC107",

        // Neutral colors from your palette
        "text-dark": "#37474F",
        "bg-light": "#F0F4F8",
        white: "#FFFFFF",
      },
      backgroundColor: {
        dark: "#1A237E", // Primary dark
        "dark-card": "#3949AB", // Primary base
      },
      textColor: {
        dark: "#FFFFFF", // White
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'spin-very-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: 0.8 },
          '50%': { opacity: 0.4 },
        },
        'pulse-slower': {
          '0%, 100%': { opacity: 0.7 },
          '50%': { opacity: 0.3 },
        },
        'fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'slideUp': {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'expandWidth': {
          '0%': { width: '0' },
          '100%': { width: '8rem' },
        },
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 15s linear infinite',
        'spin-very-slow': 'spin-very-slow 30s linear infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'pulse-slower': 'pulse-slower 6s ease-in-out infinite',
        'fadeIn': 'fadeIn 1s ease-in-out',
        'slideUp': 'slideUp 0.8s ease-in-out',
        'expandWidth': 'expandWidth 1.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};