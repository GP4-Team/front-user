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
    },
  },
  plugins: [],
};
