import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useTheme } from "../../../contexts/ThemeContext";
import { BookOpen, FileText, Atom, Calculator, Beaker, Award, PieChart } from "lucide-react";

const HeroSection = ({ UI, getText }) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const isArabic = language === "ar";

  return (
    <section
      className={`pt-16 relative overflow-hidden h-screen flex items-center ${
        isDarkMode
          ? "bg-[#121212]"
          : "bg-gradient-to-br from-[#f5f7fa] via-blue-50 to-[#f0f4f8]"
      }`}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div
          className={`absolute top-20 right-[20%] w-32 h-32 rounded-full ${
            isDarkMode ? "bg-primary-dark" : "bg-primary-light"
          } filter blur-3xl opacity-20 animate-pulse-slow`}
        ></div>
        <div
          className={`absolute bottom-10 left-[10%] w-40 h-40 rounded-full ${
            isDarkMode ? "bg-accent/50" : "bg-accent/30"
          } filter blur-3xl opacity-20 animate-pulse-slower`}
        ></div>
        <div
          className={`absolute top-[40%] left-[30%] w-24 h-24 rounded-full ${
            isDarkMode ? "bg-primary-light" : "bg-primary-base/20"
          } filter blur-3xl opacity-10 animate-float-slow`}
        ></div>
        <div
          className={`absolute top-[20%] left-[60%] w-16 h-16 rounded-full ${
            isDarkMode ? "bg-accent/50" : "bg-accent/20"
          } filter blur-xl opacity-20 animate-float`}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 px-4">
          {/* Hero Content */}
          <div className="md:w-7/12 text-right rtl:text-left">
            <div className="relative mb-2">
              <span
                className={`text-sm font-bold tracking-wider px-3 py-1 rounded-full ${
                  isDarkMode
                    ? "bg-primary-dark text-white"
                    : "bg-primary-light/30 text-primary-dark"
                } inline-block mb-2 animate-fadeIn`}
              >
                {isArabic
                  ? "المنصة التعليمية المتكاملة"
                  : "Your Complete Educational Platform"}
              </span>
            </div>

            <h1
              className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight ${
                isDarkMode ? "text-white" : "text-text-dark"
              } mb-4 animate-slideUp`}
            >
              {getText(UI.mainHeading)}
            </h1>

            <div className="w-32 h-1.5 bg-accent mx-0 rtl:mr-0 rtl:ml-auto ltr:ml-0 ltr:mr-auto my-6 rounded-full animate-expandWidth"></div>

            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } max-w-xl animate-fadeIn`}
            >
              {getText(UI.subHeading)}
            </p>

            <div className="mt-8 flex flex-wrap gap-4 justify-start w-full animate-slideUp delay-300">
              <Link
                to="/courses"
                className="bg-primary-base hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg shadow-md flex items-center transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <BookOpen size={18} className="mr-2 rtl:mr-0 rtl:ml-2" />
                {isArabic ? "استكشف الدورات" : "Explore Courses"}
              </Link>
              <Link
                to="/exams"
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-text-dark dark:text-white font-medium py-3 px-6 rounded-lg shadow-md flex items-center transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <FileText size={18} className="mr-2 rtl:mr-0 rtl:ml-2" />
                {isArabic ? "الاختبارات عبر الإنترنت" : "Online Tests"}
              </Link>
            </div>

            {/* Features */}
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto md:mx-0 md:rtl:ml-auto md:ltr:mr-0">
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-12 h-12 rounded-full ${
                    isDarkMode ? "bg-blue-900" : "bg-blue-100"
                  } flex items-center justify-center mb-2`}
                >
                  <Award
                    size={20}
                    className={
                      isDarkMode ? "text-blue-400" : "text-[#3949AB]"
                    }
                  />
                </div>
                <p
                  className={`text-xs ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {getText(UI.featurePath)}
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-12 h-12 rounded-full ${
                    isDarkMode ? "bg-blue-900" : "bg-blue-100"
                  } flex items-center justify-center mb-2`}
                >
                  <PieChart
                    size={20}
                    className={
                      isDarkMode ? "text-blue-400" : "text-[#3949AB]"
                    }
                  />
                </div>
                <p
                  className={`text-xs ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {getText(UI.featureTracking)}
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-12 h-12 rounded-full ${
                    isDarkMode ? "bg-blue-900" : "bg-blue-100"
                  } flex items-center justify-center mb-2`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isDarkMode ? "#60a5fa" : "#3949AB"}
                    strokeWidth="2"
                    className="w-5 h-5"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z" />
                  </svg>
                </div>
                <p
                  className={`text-xs ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {getText(UI.featureAI)}
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="md:w-5/12 flex justify-center">
            <div className="relative">
              {/* Main circular background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 rounded-full bg-accent/30 dark:bg-accent/20 animate-pulse-slow"></div>
              </div>

              {/* Secondary circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full border-4 border-dashed border-primary-light/30 dark:border-primary-light/20 animate-spin-very-slow"></div>
              </div>

              {/* Character image */}
              <img
                src="student.png"
                alt={isArabic ? "شخصية طالب" : "Student character"}
                className="relative z-10 h-80 object-contain animate-float"
              />

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-primary-base/40 dark:bg-primary-base/30 rounded-full animate-pulse"></div>
              <div className="absolute bottom-10 -left-6 w-8 h-8 bg-accent/50 dark:bg-accent/40 rounded-full animate-float-slow"></div>
              <div className="absolute top-1/2 -right-8 w-12 h-12 bg-primary-light/30 dark:bg-primary-light/20 rounded-full animate-float-slow"></div>

              {/* Floating icons with animations */}
              <div className="absolute top-4 right-16 animate-float p-2 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-lg backdrop-blur-sm">
                <Atom
                  size={26}
                  className="text-primary-base dark:text-primary-light"
                />
              </div>
              <div className="absolute bottom-16 left-4 animate-float-slow p-2 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-lg backdrop-blur-sm">
                <Calculator
                  size={26}
                  className="text-accent dark:text-accent"
                />
              </div>
              <div className="absolute bottom-4 right-4 animate-bounce p-2 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-lg backdrop-blur-sm">
                <Beaker
                  size={26}
                  className="text-green-500 dark:text-green-400"
                />
              </div>
              <div className="absolute top-1/3 left-0 animate-pulse p-2 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-lg backdrop-blur-sm">
                <BookOpen
                  size={26}
                  className="text-blue-500 dark:text-blue-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
