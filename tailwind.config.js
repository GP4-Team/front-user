// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Light mode colors
        'primary-dark': '#546E7A',
        'primary-base': '#607D8B',
        'primary-light': '#78909C',
        'primary-lightest': '#B0BEC5',
        'accent-primary': '#A5D6A7',
        'accent-secondary': '#81C784',
        'text-dark': '#455A64',
        'bg-light': '#ECEFF1',
        
        // Dark mode colors will be handled via CSS variables or the theme context
      },
      backgroundColor: {
        'dark': '#263238',
        'dark-card': '#37474F'
      },
      textColor: {
        'dark': '#ECEFF1'
      },
    },
  },
  plugins: [],
}