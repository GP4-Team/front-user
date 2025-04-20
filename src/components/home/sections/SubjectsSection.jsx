import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useTheme } from "../../../contexts/ThemeContext";
import { Atom, Beaker, Calculator, Dna, Book } from "lucide-react";

const SubjectsSection = ({ UI, getText }) => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const isArabic = language === "ar";

  return (
    <section
      className={`py-16 px-4 ${
        isDarkMode
          ? "bg-[#121212]"
          : "bg-gradient-to-t from-white to-blue-50/50"
      } relative overflow-hidden`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-primary-light/10 blur-3xl"></div>
        <div className="absolute -top-8 -left-8 w-48 h-48 rounded-full bg-accent/10 blur-3xl"></div>
        <div className="absolute opacity-5 h-full w-full">
          <div className="absolute inset-y-0 left-1/4 w-px bg-primary-base/40 animate-pulse-slow"></div>
          <div className="absolute inset-y-0 left-1/2 w-px bg-primary-base/40 animate-pulse-slower"></div>
          <div className="absolute inset-y-0 left-3/4 w-px bg-primary-base/40 animate-pulse-slow"></div>
          <div className="absolute inset-x-0 top-1/4 h-px bg-primary-base/40 animate-pulse-slower"></div>
          <div className="absolute inset-x-0 top-2/4 h-px bg-primary-base/40 animate-pulse-slow"></div>
          <div className="absolute inset-x-0 top-3/4 h-px bg-primary-base/40 animate-pulse-slower"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-fadeIn">
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-3 ${
              isDarkMode
                ? "bg-primary-dark text-primary-light"
                : "bg-primary-light/20 text-primary-dark"
            }`}
          >
            {isArabic ? "تصفح حسب التخصص" : "Browse by Category"}
          </span>
          <h2
            className={`text-3xl md:text-4xl font-bold ${
              isDarkMode ? "text-white" : "text-text-dark"
            }`}
          >
            {getText(UI.subjects)}
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto my-4 rounded-full"></div>
          <p
            className={`max-w-2xl mx-auto text-base ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {isArabic
              ? "اكتشف مجموعة واسعة من المواد الدراسية المصممة لتلبية احتياجاتك التعليمية"
              : "Discover a wide range of academic subjects tailored to meet your educational needs"}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Physics */}
          <Link
            to="/subjects/physics"
            className={`group flex flex-col items-center p-6 rounded-xl ${
              isDarkMode
                ? "bg-[#1E1E24] hover:bg-primary-dark/40"
                : "bg-white hover:bg-primary-light/10"
            } border border-transparent hover:border-primary-base/20 transition-all hover:-translate-y-2 hover:shadow-xl`}
          >
            <div
              className={`w-20 h-20 rounded-full ${
                isDarkMode
                  ? "bg-blue-900/30 group-hover:bg-blue-900/50"
                  : "bg-blue-100 group-hover:bg-blue-200"
              } flex items-center justify-center mb-5 transition-all group-hover:scale-110 group-hover:shadow-md`}
            >
              <Atom
                size={40}
                className={`${
                  isDarkMode ? "text-blue-400" : "text-primary-base"
                } transition-all group-hover:rotate-12`}
              />
            </div>
            <h3
              className={`font-semibold text-lg text-center ${
                isDarkMode ? "text-white" : "text-text-dark"
              }`}
            >
              {getText(UI.physics)}
            </h3>
            <p
              className={`mt-2 text-xs text-center ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {isArabic
                ? "خصائص المادة والطاقة"
                : "Properties of matter and energy"}
            </p>
            <span
              className={`mt-3 px-3 py-1 text-xs rounded-full ${
                isDarkMode
                  ? "bg-primary-dark text-primary-light"
                  : "bg-primary-light/20 text-primary-dark"
              } opacity-0 group-hover:opacity-100 transition-opacity`}
            >
              {isArabic ? "استكشف المادة" : "Explore subject"}
            </span>
          </Link>

          {/* Chemistry */}
          <Link
            to="/subjects/chemistry"
            className={`group flex flex-col items-center p-6 rounded-xl ${
              isDarkMode
                ? "bg-[#1E1E24] hover:bg-green-900/30"
                : "bg-white hover:bg-green-50"
            } border border-transparent hover:border-green-500/20 transition-all hover:-translate-y-2 hover:shadow-xl`}
          >
            <div
              className={`w-20 h-20 rounded-full ${
                isDarkMode
                  ? "bg-green-900/30 group-hover:bg-green-900/50"
                  : "bg-green-100 group-hover:bg-green-200"
              } flex items-center justify-center mb-5 transition-all group-hover:scale-110 group-hover:shadow-md`}
            >
              <Beaker
                size={40}
                className={`${
                  isDarkMode ? "text-green-400" : "text-green-600"
                } transition-all group-hover:rotate-12`}
              />
            </div>
            <h3
              className={`font-semibold text-lg text-center ${
                isDarkMode ? "text-white" : "text-text-dark"
              }`}
            >
              {getText(UI.chemistry)}
            </h3>
            <p
              className={`mt-2 text-xs text-center ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {isArabic
                ? "تفاعلات المواد وتكوينها"
                : "Matter reactions and composition"}
            </p>
            <span
              className={`mt-3 px-3 py-1 text-xs rounded-full ${
                isDarkMode
                  ? "bg-green-900/70 text-green-300"
                  : "bg-green-100 text-green-700"
              } opacity-0 group-hover:opacity-100 transition-opacity`}
            >
              {isArabic ? "استكشف المادة" : "Explore subject"}
            </span>
          </Link>

          {/* Mathematics */}
          <Link
            to="/subjects/mathematics"
            className={`group flex flex-col items-center p-6 rounded-xl ${
              isDarkMode
                ? "bg-[#1E1E24] hover:bg-purple-900/30"
                : "bg-white hover:bg-purple-50"
            } border border-transparent hover:border-purple-500/20 transition-all hover:-translate-y-2 hover:shadow-xl`}
          >
            <div
              className={`w-20 h-20 rounded-full ${
                isDarkMode
                  ? "bg-purple-900/30 group-hover:bg-purple-900/50"
                  : "bg-purple-100 group-hover:bg-purple-200"
              } flex items-center justify-center mb-5 transition-all group-hover:scale-110 group-hover:shadow-md`}
            >
              <Calculator
                size={40}
                className={`${
                  isDarkMode ? "text-purple-400" : "text-purple-600"
                } transition-all group-hover:rotate-12`}
              />
            </div>
            <h3
              className={`font-semibold text-lg text-center ${
                isDarkMode ? "text-white" : "text-text-dark"
              }`}
            >
              {getText(UI.math)}
            </h3>
            <p
              className={`mt-2 text-xs text-center ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {isArabic
                ? "التحليل والجبر والهندسة"
                : "Analysis, algebra, and geometry"}
            </p>
            <span
              className={`mt-3 px-3 py-1 text-xs rounded-full ${
                isDarkMode
                  ? "bg-purple-900/70 text-purple-300"
                  : "bg-purple-100 text-purple-700"
              } opacity-0 group-hover:opacity-100 transition-opacity`}
            >
              {isArabic ? "استكشف المادة" : "Explore subject"}
            </span>
          </Link>

          {/* Biology */}
          <Link
            to="/subjects/biology"
            className={`group flex flex-col items-center p-6 rounded-xl ${
              isDarkMode
                ? "bg-[#1E1E24] hover:bg-red-900/30"
                : "bg-white hover:bg-red-50"
            } border border-transparent hover:border-red-500/20 transition-all hover:-translate-y-2 hover:shadow-xl`}
          >
            <div
              className={`w-20 h-20 rounded-full ${
                isDarkMode
                  ? "bg-red-900/30 group-hover:bg-red-900/50"
                  : "bg-red-100 group-hover:bg-red-200"
              } flex items-center justify-center mb-5 transition-all group-hover:scale-110 group-hover:shadow-md`}
            >
              <Dna
                size={40}
                className={`${
                  isDarkMode ? "text-red-400" : "text-red-600"
                } transition-all group-hover:rotate-12`}
              />
            </div>
            <h3
              className={`font-semibold text-lg text-center ${
                isDarkMode ? "text-white" : "text-text-dark"
              }`}
            >
              {isArabic ? "الأحياء" : "Biology"}
            </h3>
            <p
              className={`mt-2 text-xs text-center ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {isArabic
                ? "دراسة الكائنات الحية وأنظمتها"
                : "Study of living organisms and systems"}
            </p>
            <span
              className={`mt-3 px-3 py-1 text-xs rounded-full ${
                isDarkMode
                  ? "bg-red-900/70 text-red-300"
                  : "bg-red-100 text-red-700"
              } opacity-0 group-hover:opacity-100 transition-opacity`}
            >
              {isArabic ? "استكشف المادة" : "Explore subject"}
            </span>
          </Link>

          {/* English */}
          <Link
            to="/subjects/english"
            className={`group flex flex-col items-center p-6 rounded-xl ${
              isDarkMode
                ? "bg-[#1E1E24] hover:bg-yellow-900/30"
                : "bg-white hover:bg-yellow-50"
            } border border-transparent hover:border-yellow-500/20 transition-all hover:-translate-y-2 hover:shadow-xl`}
          >
            <div
              className={`w-20 h-20 rounded-full ${
                isDarkMode
                  ? "bg-yellow-900/30 group-hover:bg-yellow-900/50"
                  : "bg-yellow-100 group-hover:bg-yellow-200"
              } flex items-center justify-center mb-5 transition-all group-hover:scale-110 group-hover:shadow-md`}
            >
              <Book
                size={40}
                className={`${
                  isDarkMode ? "text-yellow-400" : "text-yellow-600"
                } transition-all group-hover:rotate-12`}
              />
            </div>
            <h3
              className={`font-semibold text-lg text-center ${
                isDarkMode ? "text-white" : "text-text-dark"
              }`}
            >
              {isArabic ? "اللغة الإنجليزية" : "English"}
            </h3>
            <p
              className={`mt-2 text-xs text-center ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {isArabic
                ? "تعلم اللغة والأدب الإنجليزي"
                : "English language and literature"}
            </p>
            <span
              className={`mt-3 px-3 py-1 text-xs rounded-full ${
                isDarkMode
                  ? "bg-yellow-900/70 text-yellow-300"
                  : "bg-yellow-100 text-yellow-700"
              } opacity-0 group-hover:opacity-100 transition-opacity`}
            >
              {isArabic ? "استكشف المادة" : "Explore subject"}
            </span>
          </Link>

          {/* Arabic */}
          <Link
            to="/subjects/arabic"
            className={`group flex flex-col items-center p-6 rounded-xl ${
              isDarkMode
                ? "bg-[#1E1E24] hover:bg-cyan-900/30"
                : "bg-white hover:bg-cyan-50"
            } border border-transparent hover:border-cyan-500/20 transition-all hover:-translate-y-2 hover:shadow-xl`}
          >
            <div
              className={`w-20 h-20 rounded-full ${
                isDarkMode
                  ? "bg-cyan-900/30 group-hover:bg-cyan-900/50"
                  : "bg-cyan-100 group-hover:bg-cyan-200"
              } flex items-center justify-center mb-5 transition-all group-hover:scale-110 group-hover:shadow-md`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isDarkMode ? "#22d3ee" : "#0891b2"}
                strokeWidth="2"
                className="w-10 h-10 transition-all group-hover:rotate-12"
              >
                <path d="M12 3v1M3 12h1m17-1h1M5 5l1 1m12-1l-1 1M18 18l-1-1M5 19l1-1" />
                <circle cx="12" cy="12" r="5" />
              </svg>
            </div>
            <h3
              className={`font-semibold text-lg text-center ${
                isDarkMode ? "text-white" : "text-text-dark"
              }`}
            >
              {isArabic ? "اللغة العربية" : "Arabic"}
            </h3>
            <p
              className={`mt-2 text-xs text-center ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {isArabic
                ? "اللغة العربية وآدابها"
                : "Arabic language and literature"}
            </p>
            <span
              className={`mt-3 px-3 py-1 text-xs rounded-full ${
                isDarkMode
                  ? "bg-cyan-900/70 text-cyan-300"
                  : "bg-cyan-100 text-cyan-700"
              } opacity-0 group-hover:opacity-100 transition-opacity`}
            >
              {isArabic ? "استكشف المادة" : "Explore subject"}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SubjectsSection;
