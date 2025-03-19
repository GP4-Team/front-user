// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // New color palette from the image
        "primary-dark": "#1A237E",
        "primary-base": "#3949AB",
        "primary-light": "#7986CB",
        accent: "#FFC107",
        "neutral-dark": "#37474F",
        "neutral-light": "#F0F4F8",
        "neutral-white": "#FFFFFF",

        // Keep the old palette for backward compatibility
        "primary-lightest": "#B0BEC5",
        "accent-primary": "#A5D6A7",
        "accent-secondary": "#81C784",
        "text-dark": "#455A64",
        "bg-light": "#ECEFF1",
      },
      backgroundColor: {
        dark: "#1A237E", // Updated to match the new primary-dark
        "dark-card": "#3949AB", // Updated to match the new primary-base
      },
      textColor: {
        dark: "#FFFFFF", // Updated to neutral-white for better contrast
      },
    },
  },
  plugins: [],
};
