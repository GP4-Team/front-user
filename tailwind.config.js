// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // تفعيل الوضع الداكن المعتمد على الفئات
  theme: {
    extend: {
      colors: {
        // الألوان الأساسية
        primary: {
          dark: "#1A237E",
          base: "#3949AB",
          light: "#7986CB",
        },
        secondary: {
          dark: "#E65100",
          base: "#FF9800", 
          light: "#FFB74D",
        },
        accent: "#FFC107",

        // ألوان محايدة
        neutral: {
          50: "#F8FAFC",
          100: "#F0F4F8",
          200: "#E5E9F0",
          300: "#D1D8E0",
          400: "#A0AEC0",
          500: "#718096",
          600: "#4A5568",
          700: "#2D3748",
          800: "#1A202C",
          900: "#0F1620",
        },
        
        // ألوان النص
        text: {
          dark: "#37474F",
          light: "#FFFFFF",
          muted: "#718096",
        },
        
        // ألوان الخلفية
        background: {
          light: "#F5F7FA",
          dark: "#121212",
          card: {
            light: "#FFFFFF",
            dark: "#1E1E1E",
          }
        },
        
        // ألوان الحالة
        state: {
          success: "#4CAF50",
          warning: "#FF9800",
          error: "#F44336",
          info: "#2196F3",
        }
      },
      fontFamily: {
        poppins: ["'Poppins'", 'sans-serif'],
        tajawal: ["'Tajawal'", 'sans-serif'],
        cairo: ["'Cairo'", 'sans-serif'],
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
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
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 15s linear infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'pulse-slower': 'pulse-slower 6s ease-in-out infinite',
        'fadeIn': 'fadeIn 1s ease-in-out',
        'slideUp': 'slideUp 0.8s ease-in-out',
      },
    },
  },
  plugins: [],
};
