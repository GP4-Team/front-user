// src/pages/ArabicHomePage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

// Import Google Fonts in your index.html or App.js
// <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">

const ArabicHomePage = () => {
  const { language, toggleLanguage, isRTL } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();
  const isArabic = language === "ar";
  // Debugging line to check if theme state is working
  console.log("Current theme state:", isDarkMode);

  // Set RTL direction based on language
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;

    // Add Tailwind directives for RTL support
    if (isRTL) {
      document.body.classList.add("font-tajawal");
    } else {
      document.body.classList.remove("font-tajawal");
    }
  }, [isRTL, language]);
  // The handleToggle function with debugging
  const handleThemeToggle = () => {
    console.log("Toggle clicked, before:", isDarkMode);
    toggleTheme();
    console.log("After toggle function called");
  };

  return (
    <div
      className={`min-h-screen bg-f0f4f8 dark:bg-[#1A237E] text-37474f dark:text-white ${
        isRTL ? "font-tajawal" : ""
      }`}
    >
      {/* Header */}
      <header className="flex justify-between items-center py-4 px-8 bg-white dark:bg-[#37474F] shadow-sm">
        {/* Logo */}
        <div className="flex items-center">
          <svg
            className={`w-9 h-9 ${isRTL ? "ml-2.5" : "mr-2.5"}`}
            viewBox="0 0 36 36"
          >
            <path d="M10 18 L18 12 L26 18 L18 24 Z" fill="#3949AB" />
            <line
              x1="18"
              y1="24"
              x2="18"
              y2="28"
              stroke="#3949AB"
              strokeWidth="2"
            />
          </svg>
          <span className="text-2xl font-extrabold font-cairo text-37474f">
            Eduara
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block">
          <ul className="flex">
            <li className="relative group mx-4">
              <a
                href="#"
                className="flex items-center text-37474f font-medium hover:text-3949ab transition-all hover:-translate-y-0.5"
              >
                {isArabic ? "الرئيسية" : "Home"}
              </a>
            </li>
            <li className="relative group mx-4">
              <Link
                to="/courses"
                className="flex items-center text-37474f font-medium hover:text-3949ab transition-all hover:-translate-y-0.5"
              >
                {isArabic ? "الدورات" : "Courses"}
              </Link>
            </li>
            <li className="relative group mx-4">
              <a
                href="/exams"
                className="flex items-center text-37474f font-medium hover:text-3949ab transition-all hover:-translate-y-0.5"
              >
                {isArabic ? "الاختبارات" : "Exams"}
              </a>
            </li>
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center">
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-f0f4f8 rounded-full px-4 py-2 shadow-inner">
            <input
              type="text"
              placeholder={isArabic ? "بحث..." : "Search..."}
              className="bg-transparent border-none outline-none w-48 text-sm font-tajawal"
            />
            <svg
              className="w-4 h-4 text-7986cb cursor-pointer"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="mx-4 text-7986cb hover:text-3949ab transition-colors"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="mx-4 text-7986cb hover:text-3949ab transition-colors"
            aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}
          >
            {isArabic ? "EN" : "عربي"}
          </button>

          {/* Join Button */}
          <Link to="/auth">
            <button className="bg-ffc107 text-37474f font-bold py-2.5 px-6 rounded-full shadow-md hover:bg-yellow-500 hover:-translate-y-0.5 transition-all font-cairo">
              {isArabic ? "انضم إلينا!" : "Join us!"}
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-8 relative overflow-hidden">
        {/* Background gradients */}
        <div className="absolute -top-12 -left-12 -right-12 -bottom-12 -z-10 bg-gradient-radial-tl from-indigo-100/5 to-transparent bg-gradient-radial-br from-amber-100/5 to-transparent"></div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center z-10 relative">
          {/* Left side content */}
          <div className="w-full md:w-1/2 lg:w-7/12">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight font-cairo">
              {isArabic ? (
                <>
                  اكتشف طريقك إلى{" "}
                  <span className="text-3949ab relative inline-block">
                    Eduara
                    <span className="absolute bottom-1 left-0 right-0 h-1.5 bg-amber-300/40 -z-10 skew-x-6"></span>
                  </span>
                  <span className="block mt-2 text-5xl md:text-6xl text-1a237e animate-pulse">
                    التعليم!
                  </span>
                </>
              ) : (
                <>
                  Discover your path to{" "}
                  <span className="text-3949ab relative inline-block">
                    Eduara
                    <span className="absolute bottom-1 left-0 right-0 h-1.5 bg-amber-300/40 -z-10 skew-x-6"></span>
                  </span>
                  <span className="block mt-2 text-5xl md:text-6xl text-1a237e animate-pulse">
                    EDUCATION!
                  </span>
                </>
              )}
            </h1>

            <div className="w-36 h-1 bg-gradient-to-r from-ffc107 to-amber-200/30 my-5 rounded"></div>

            <p className="text-lg leading-relaxed mb-8">
              {isArabic
                ? "سواء كنت طالباً، مدرساً، أو محترفاً تسعى لتطوير مهاراتك، توفر Eduara الأدوات والدورات اللازمة للنجاح. تعلم من نخبة المدربين، واستمتع بتجربة تعليمية متقدمة، وكن مستعداً لمستقبل أفضل."
                : "Whether you are a student, teacher, or professional seeking to develop your skills, Eduara provides you with the tools and courses necessary for success. Learn from elite trainers, enjoy an advanced learning experience, and be ready for a better future."}
            </p>

            {/* Hero Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Link to="/courses">
                <button className="bg-3949ab text-white font-bold py-4 px-7 rounded-xl shadow-lg hover:bg-1a237e hover:-translate-y-1 transition-all inline-flex items-center relative overflow-hidden group">
                  {isArabic ? "انضم للدورات الآن" : "Join Courses Now"}
                  <svg
                    className={`w-5 h-5 ${isRTL ? "mr-2" : "ml-2"}`}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M4 12H20M20 12L14 6M20 12L14 18"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="absolute top-0 left-[-100%] w-[120%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine"></span>
                </button>
              </Link>

              <button className="bg-ffc107 text-37474f font-bold py-4 px-7 rounded-xl shadow-lg hover:bg-amber-500 hover:-translate-y-1 transition-all inline-flex items-center">
                {isArabic ? "الاختبارات عبر الإنترنت" : "Online Tests"}
                <svg
                  className={`w-5 h-5 ${isRTL ? "mr-2" : "ml-2"}`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Feature Cards */}
            <div className="flex flex-wrap gap-5">
              <div className="bg-white rounded-xl p-4 flex items-center gap-2.5 shadow-sm border-2 border-transparent hover:border-indigo-200/20 hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-indigo-100/20 flex items-center justify-center text-3949ab transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M8 9L12 5L16 9M16 15L12 19L8 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-medium">
                  {isArabic ? "مسارك للنجاح" : "Your Path to Success"}
                </span>
              </div>

              <div className="bg-white rounded-xl p-4 flex items-center gap-2.5 shadow-sm border-2 border-transparent hover:border-indigo-200/20 hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-indigo-100/20 flex items-center justify-center text-3949ab transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="font-medium">
                  {isArabic ? "أفضل نظام تتبع" : "Best Tracking System"}
                </span>
              </div>

              <div className="bg-white rounded-xl p-4 flex items-center gap-2.5 shadow-sm border-2 border-transparent hover:border-indigo-200/20 hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-indigo-100/20 flex items-center justify-center text-3949ab transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <span className="font-medium">
                  {isArabic ? "دعم بالذكاء الاصطناعي" : "AI-Powered Support"}
                </span>
              </div>
            </div>
          </div>

          {/* Right side image */}
          <div className="hidden md:block w-1/2 lg:w-4/12 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-56 h-56 bg-ffc107/60 rounded-full"></div>
            </div>
            <img
              src="student.png"
              alt={isArabic ? "شخصية طالب" : "Student character"}
              className="relative z-10 mx-auto animate-float"
            />
            {/* Decorative elements */}
            <div className="absolute top-10 right-10">
              <div className="w-8 h-8 bg-7986cb/50 rounded-full"></div>
            </div>
            <div className="absolute top-32 left-0">
              <svg width="100" height="30" viewBox="0 0 100 30" fill="none">
                <path
                  d="M0,15 Q25,0 50,15 T100,15"
                  stroke="#7986CB"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Online Tests Section */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg p-8 md:p-16 mb-16">
          <div className="flex items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold font-cairo">
              {isArabic ? "الاختبارات" : "Tests"}
              <span className="text-7986cb font-bold mx-2">
                {isArabic ? "عبر الإنترنت" : "Online"}
              </span>
            </h2>
          </div>

          {/* Tests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Upcoming Test Card */}
            <div className="bg-f0f4f8 rounded-2xl p-6 relative flex flex-col overflow-hidden border-t-4 border-7986cb hover:-translate-y-2 hover:shadow-lg transition-all">
              <div className="absolute top-4 left-4 bg-7986cb text-white text-xs font-semibold py-1 px-3 rounded-full">
                {isArabic ? "قادم" : "Upcoming"}
              </div>
              <div className="flex flex-col items-center mt-5 mb-5">
                <div className="text-3xl font-extrabold text-37474f">15</div>
                <div className="text-7986cb">{isArabic ? "مارس" : "March"}</div>
              </div>
              <div className="text-center flex-grow">
                <h3 className="text-lg font-bold text-1a237e mb-2">
                  {isArabic ? "الفيزياء - الميكانيكا" : "Physics - Mechanics"}
                </h3>
                <p className="text-sm text-37474f mb-4">
                  {isArabic
                    ? "اختبار تجريبي للثانوية العامة"
                    : "Trial test for high school"}
                </p>
                <div className="flex justify-center gap-5 text-xs text-7986cb">
                  <span>⏱️ {isArabic ? "٦٠ دقيقة" : "60 min"}</span>
                  <span>❓ {isArabic ? "٤٠ سؤال" : "40 Q"}</span>
                </div>
              </div>
              <button className="mt-5 py-3 bg-3949ab text-white font-semibold rounded-lg hover:-translate-y-1 transition-all">
                {isArabic ? "التسجيل للاختبار" : "Register for Test"}
              </button>
            </div>

            {/* Active Test Card */}
            <div className="bg-f0f4f8 rounded-2xl p-6 relative flex flex-col overflow-hidden border-t-4 border-ffc107 hover:-translate-y-2 hover:shadow-lg transition-all">
              <div className="absolute top-4 left-4 bg-ffc107 text-37474f text-xs font-semibold py-1 px-3 rounded-full">
                {isArabic ? "متاح الآن" : "Available Now"}
              </div>
              <div className="flex flex-col items-center mt-5 mb-5">
                <div className="text-3xl font-extrabold text-37474f">11</div>
                <div className="text-7986cb">{isArabic ? "مارس" : "March"}</div>
              </div>
              <div className="text-center flex-grow">
                <h3 className="text-lg font-bold text-1a237e mb-2">
                  {isArabic ? "الرياضيات - الجبر" : "Math - Algebra"}
                </h3>
                <p className="text-sm text-37474f mb-4">
                  {isArabic
                    ? "اختبار الفصل الدراسي الأول"
                    : "First semester test"}
                </p>
                <div className="flex justify-center gap-5 text-xs text-7986cb">
                  <span>⏱️ {isArabic ? "٩٠ دقيقة" : "90 min"}</span>
                  <span>❓ {isArabic ? "٥٠ سؤال" : "50 Q"}</span>
                </div>
              </div>
              <button className="mt-5 py-3 bg-ffc107 text-37474f font-semibold rounded-lg hover:-translate-y-1 transition-all">
                {isArabic ? "بدء الاختبار الآن" : "Start Test Now"}
              </button>
            </div>

            {/* Practice Test Card */}
            <div className="bg-f0f4f8 rounded-2xl p-6 relative flex flex-col overflow-hidden border-t-4 border-green-500 hover:-translate-y-2 hover:shadow-lg transition-all">
              <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold py-1 px-3 rounded-full">
                {isArabic ? "تدريب" : "Practice"}
              </div>
              <div className="flex justify-center mt-5 mb-5">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl text-green-500 relative">
                  ∞
                </div>
              </div>
              <div className="text-center flex-grow">
                <h3 className="text-lg font-bold text-1a237e mb-2">
                  {isArabic
                    ? "الكيمياء - المركبات العضوية"
                    : "Chemistry - Organic Compounds"}
                </h3>
                <p className="text-sm text-37474f mb-4">
                  {isArabic
                    ? "تدريب على النظام الجديد"
                    : "Practice on the new system"}
                </p>
                <div className="flex justify-center gap-5 text-xs text-7986cb">
                  <span>📊 {isArabic ? "٣ مستويات" : "3 levels"}</span>
                  <span>❓ {isArabic ? "غير محدود" : "Unlimited"}</span>
                </div>
              </div>
              <button className="mt-5 py-3 bg-green-500 text-white font-semibold rounded-lg hover:-translate-y-1 transition-all">
                {isArabic ? "تدرب الآن" : "Practice Now"}
              </button>
            </div>

            {/* Past Test Card */}
            <div className="bg-f0f4f8 rounded-2xl p-6 relative flex flex-col overflow-hidden border-t-4 border-gray-400 hover:-translate-y-2 hover:shadow-lg transition-all">
              <div className="absolute top-4 left-4 bg-gray-400 text-white text-xs font-semibold py-1 px-3 rounded-full">
                {isArabic ? "منتهي" : "Completed"}
              </div>
              <div className="flex flex-col items-center mt-5 mb-5">
                <div className="text-3xl font-extrabold text-37474f">05</div>
                <div className="text-7986cb">{isArabic ? "مارس" : "March"}</div>
              </div>
              <div className="text-center flex-grow">
                <h3 className="text-lg font-bold text-1a237e mb-2">
                  {isArabic
                    ? "اللغة الإنجليزية - القواعد"
                    : "English - Grammar"}
                </h3>
                <p className="text-sm text-37474f mb-4">
                  {isArabic
                    ? "اختبار منتصف الفصل الدراسي"
                    : "Mid-semester test"}
                </p>
                <div className="flex justify-center gap-5 text-xs text-7986cb">
                  <span>⏱️ {isArabic ? "٤٥ دقيقة" : "45 min"}</span>
                  <span>📈 85%</span>
                </div>
              </div>
              <button className="mt-5 py-3 bg-gray-400 text-white font-semibold rounded-lg hover:-translate-y-1 transition-all">
                {isArabic ? "عرض النتائج" : "View Results"}
              </button>
            </div>
          </div>

          {/* View All Tests Link */}
          <div className="text-center mt-10">
            <a
              href="#"
              className="inline-flex items-center text-3949ab font-semibold hover:text-1a237e transition-all gap-2 group"
            >
              {isArabic
                ? "عرض جميع الاختبارات المتاحة"
                : "View all available tests"}
              <svg
                className={`w-4 h-4 transition-transform ${
                  isRTL
                    ? "group-hover:-translate-x-1"
                    : "group-hover:translate-x-1"
                }`}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Study Materials Section */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold font-cairo relative inline-block">
              {isArabic ? "المواد" : "Study"}
              <span className="text-7986cb font-bold mx-2">
                {isArabic ? "الدراسية" : "Materials"}
              </span>
              <span className="absolute bottom-2 left-0 w-1/2 h-2 bg-amber-300/30 -z-10"></span>
            </h2>
          </div>

          {/* Materials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Math Card 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:-translate-y-2 hover:rotate-1 hover:shadow-lg transition-all relative z-10 group">
              <div className="h-36 flex items-center justify-center bg-gray-50 transition-all group-hover:bg-indigo-50/10">
                <div className="w-24 h-24 rounded-full bg-red-100/20 flex items-center justify-center text-red-500 transition-all group-hover:scale-110 group-hover:-rotate-5">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M12 5V19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-6 text-center bg-white transition-all">
                <h3 className="text-xl font-extrabold mb-2 text-1a237e font-cairo">
                  الرياضيات
                </h3>
                <p className="text-7986cb font-medium">الصف الثاني الثانوي</p>
              </div>
            </div>

            {/* Math Card 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:-translate-y-2 hover:rotate-1 hover:shadow-lg transition-all relative z-10 group">
              <div className="h-36 flex items-center justify-center bg-gray-50 transition-all group-hover:bg-indigo-50/10">
                <div className="w-24 h-24 rounded-full bg-orange-100/20 flex items-center justify-center text-orange-500 transition-all group-hover:scale-110 group-hover:-rotate-5">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M12 5V19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-6 text-center bg-white transition-all">
                <h3 className="text-xl font-extrabold mb-2 text-1a237e font-cairo">
                  الرياضيات
                </h3>
                <p className="text-7986cb font-medium">الصف الأول الإعدادي</p>
              </div>
            </div>

            {/* Physics Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:-translate-y-2 hover:rotate-1 hover:shadow-lg transition-all relative z-10 group">
              <div className="h-36 flex items-center justify-center bg-gray-50 transition-all group-hover:bg-indigo-50/10">
                <div className="w-24 h-24 rounded-full bg-blue-100/20 flex items-center justify-center text-blue-600 transition-all group-hover:scale-110 group-hover:-rotate-5">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M20.7924 12C20.7924 13.0615 20.5292 14.1116 20.0245 15.0745C19.5198 16.0373 18.7897 16.8854 17.8926 17.5535C16.9955 18.2216 15.9562 18.6903 14.8581 18.9242C13.7601 19.1581 12.6273 19.1511 11.5329 18.9036"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3.20759 12C3.20759 10.9385 3.47085 9.88843 3.97551 8.92554C4.48017 7.96266 5.21027 7.11457 6.10739 6.44647C7.00451 5.77837 8.04378 5.30968 9.14185 5.07583C10.2399 4.84197 11.3727 4.84894 12.4671 5.09643"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-6 text-center bg-white transition-all">
                <h3 className="text-xl font-extrabold mb-2 text-1a237e font-cairo">
                  الفيزياء
                </h3>
                <p className="text-7986cb font-medium">الصف الثاني الثانوي</p>
              </div>
            </div>

            {/* Chemistry Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:-translate-y-2 hover:rotate-1 hover:shadow-lg transition-all relative z-10 group">
              <div className="h-36 flex items-center justify-center bg-gray-50 transition-all group-hover:bg-indigo-50/10">
                <div className="w-24 h-24 rounded-full bg-green-100/20 flex items-center justify-center text-green-500 transition-all group-hover:scale-110 group-hover:-rotate-5">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 3H15M10 9L14 9M8 15H16M5 21H19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10.0412 3C10.5393 4.82843 9.21895 7 7.00006 7M13.9588 3C13.4607 4.82843 14.781 7 16.9999 7"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-6 text-center bg-white transition-all">
                <h3 className="text-xl font-extrabold mb-2 text-1a237e font-cairo">
                  الكيمياء
                </h3>
                <p className="text-7986cb font-medium">الصف الثاني الثانوي</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Platform Section */}
      <section className="py-20 px-8 relative">
        {/* Background gradient */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-indigo-100/10 to-transparent -z-10"></div>

        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold font-cairo">
              {isArabic ? "عن" : "About"}
              <span className="text-3949ab font-bold mx-2">Eduara</span>
            </h2>
          </div>

          <div className="mb-16">
            <div className="flex items-center mb-14">
              <h3 className="text-2xl md:text-3xl font-extrabold text-37474f font-cairo">
                {isArabic ? "لماذا تختار منصة" : "WHY CHOOSE THE PLATFORM"}
                <span className="text-3949ab mx-2">Eduara</span>
                {isArabic ? "؟" : "?"}
              </h3>
              <div className="h-0.5 w-24 bg-gradient-to-r from-ffc107 to-transparent mx-5 rounded-full"></div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* AI Support Feature */}
              <div className="text-center bg-white rounded-2xl p-8 shadow-md transition-all hover:-translate-y-2 hover:shadow-lg relative overflow-hidden group">
                <div className="absolute -top-3 -left-3 w-16 h-16 bg-white/80 rounded-full -z-10 group-hover:scale-[10] group-hover:opacity-0 transition-all duration-500"></div>

                <div className="w-20 h-20 mx-auto mb-6 bg-amber-100/20 rounded-full flex items-center justify-center text-amber-500 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <h4 className="text-xl font-extrabold mb-4 text-1a237e font-cairo group-hover:scale-105 transition-transform">
                  {isArabic ? "دعم الذكاء الاصطناعي" : "AI Support"}
                </h4>

                <p className="text-37474f text-sm leading-relaxed">
                  {isArabic
                    ? "يحلل الذكاء الاصطناعي مستواك في كل جزء من المنهج ويخبرك بكيفية تحسين مستواك"
                    : "AI analyzes your level in each part of the curriculum and tells you how to improve your level"}
                </p>
              </div>

              {/* Top Teachers Feature */}
              <div className="text-center bg-white rounded-2xl p-8 shadow-md transition-all hover:-translate-y-2 hover:shadow-lg relative overflow-hidden group">
                <div className="absolute -top-3 -left-3 w-16 h-16 bg-white/80 rounded-full -z-10 group-hover:scale-[10] group-hover:opacity-0 transition-all duration-500"></div>

                <div className="w-20 h-20 mx-auto mb-6 bg-blue-100/20 rounded-full flex items-center justify-center text-blue-500 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h4 className="text-xl font-extrabold mb-4 text-1a237e font-cairo group-hover:scale-105 transition-transform">
                  {isArabic ? "أفضل المعلمين" : "Top Teachers"}
                </h4>

                <p className="text-37474f text-sm leading-relaxed">
                  {isArabic
                    ? "لقد وفرنا أفضل هيئة تدريس لمساعدتك في الوصول إلى أعلى الدرجات"
                    : "We provided the best teaching staff to help you reach top grades"}
                </p>
              </div>

              {/* Continuous Challenges Feature */}
              <div className="text-center bg-white rounded-2xl p-8 shadow-md transition-all hover:-translate-y-2 hover:shadow-lg relative overflow-hidden group">
                <div className="absolute -top-3 -left-3 w-16 h-16 bg-white/80 rounded-full -z-10 group-hover:scale-[10] group-hover:opacity-0 transition-all duration-500"></div>

                <div className="w-20 h-20 mx-auto mb-6 bg-purple-100/20 rounded-full flex items-center justify-center text-purple-500 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h4 className="text-xl font-extrabold mb-4 text-1a237e font-cairo group-hover:scale-105 transition-transform">
                  {isArabic ? "تحديات مستمرة" : "Continuous Challenges"}
                </h4>

                <p className="text-37474f text-sm leading-relaxed">
                  {isArabic
                    ? "لقد حولنا تجربة التعلم إلى لعبة حيث يمكنك تحسين مستواك والتنافس مع الأصدقاء"
                    : "We turned the learning experience into a game where you can improve your level and compete with friends"}
                </p>
              </div>

              {/* Periodic Exams Feature */}
              <div className="text-center bg-white rounded-2xl p-8 shadow-md transition-all hover:-translate-y-2 hover:shadow-lg relative overflow-hidden group">
                <div className="absolute -top-3 -left-3 w-16 h-16 bg-white/80 rounded-full -z-10 group-hover:scale-[10] group-hover:opacity-0 transition-all duration-500"></div>

                <div className="w-20 h-20 mx-auto mb-6 bg-red-100/20 rounded-full flex items-center justify-center text-red-500 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h4 className="text-xl font-extrabold mb-4 text-1a237e font-cairo group-hover:scale-105 transition-transform">
                  {isArabic ? "امتحانات دورية" : "Periodic Exams"}
                </h4>

                <p className="text-37474f text-sm leading-relaxed">
                  {isArabic
                    ? "لقد وفرنا أفضل بنوك الأسئلة في كل منهج ليتدرب الطلاب على كل شيء"
                    : "We provided the best question banks in each curriculum for you to practice and train on everything"}
                </p>
              </div>
            </div>
          </div>

          {/* Graduate Character Section */}
          <div className="flex justify-center py-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-ffc107/60 rounded-full"></div>
              </div>
              <img
                src="/images/graduate-character.png"
                alt={isArabic ? "شخصية متخرج" : "Graduate character"}
                className="relative z-10 max-w-xs animate-float-slow"
              />
              {/* Blue circle behind character */}
              <div className="absolute right-0 top-0 w-32 h-32 bg-7986cb/60 rounded-full -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white mt-16 pt-10 pb-8 border-t border-gray-100 relative">
        {/* Colorful top border */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-1a237e via-7986cb to-ffc107 rounded-b"></div>

        <div className="max-w-7xl mx-auto px-8">
          {/* Footer Content */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            {/* Logo */}
            <div className="flex items-center font-cairo font-bold text-lg mb-6 md:mb-0">
              <svg
                className={`w-8 h-8 ${isRTL ? "ml-2" : "mr-2"}`}
                viewBox="0 0 36 36"
              >
                <path d="M10 18 L18 12 L26 18 L18 24 Z" fill="#3949AB" />
                <line
                  x1="18"
                  y1="24"
                  x2="18"
                  y2="28"
                  stroke="#3949AB"
                  strokeWidth="2"
                />
              </svg>
              <span>Eduara</span>
            </div>

            {/* Social Links */}
            <div className="flex flex-col items-center mb-6 md:mb-0">
              <p className="font-medium mb-3">
                {isArabic
                  ? "تابعنا على وسائل التواصل الاجتماعي"
                  : "Follow us on social media"}
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-f0f4f8 rounded-full flex items-center justify-center text-37474f hover:bg-7986cb hover:text-white hover:-translate-y-1 transition-all shadow-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-f0f4f8 rounded-full flex items-center justify-center text-37474f hover:bg-7986cb hover:text-white hover:-translate-y-1 transition-all shadow-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397C16.6767 2.90121 15.7395 2.95724 14.8821 3.2845C14.0247 3.61176 13.2884 4.19445 12.773 4.95376C12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549C5.36074 6.60513 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-f0f4f8 rounded-full flex items-center justify-center text-37474f hover:bg-7986cb hover:text-white hover:-translate-y-1 transition-all shadow-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle cx="18" cy="6" r="1" fill="currentColor" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="mb-4 md:mb-0">
              © 2025 Eduara{" "}
              {isArabic
                ? "للتعليم. جميع الحقوق محفوظة."
                : "for Education. All rights reserved."}
            </p>

            <div className="flex gap-6 mb-4 md:mb-0">
              <a
                href="#"
                className="text-37474f font-medium hover:text-3949ab hover:-translate-y-0.5 transition-all"
              >
                {isArabic ? "سياسة الخصوصية" : "Privacy Policy"}
              </a>
              <a
                href="#"
                className="text-37474f font-medium hover:text-3949ab hover:-translate-y-0.5 transition-all"
              >
                {isArabic ? "شروط الاستخدام" : "Terms of Use"}
              </a>
              <a
                href="#"
                className="text-37474f font-medium hover:text-3949ab hover:-translate-y-0.5 transition-all"
              >
                {isArabic ? "التعليمات" : "Instructions"}
              </a>
            </div>

            <div className="bg-f0f4f8 rounded-lg py-2 px-4 flex items-center cursor-pointer hover:bg-indigo-50/10 hover:-translate-y-0.5 transition-all">
              <svg
                className="w-4 h-4 text-37474f"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12H22M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="mx-2">{isArabic ? "العربية" : "English"}</span>
              <svg
                className="w-3 h-3 text-37474f"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </footer>

      {/* Add animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes float-slow {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes shine {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-pulse {
          animation: pulse 2s infinite;
        }

        .group-hover\:animate-shine:hover {
          animation: shine 1.2s;
        }

        .bg-gradient-radial-tl {
          background-image: radial-gradient(
            circle at 20% 20%,
            var(--tw-gradient-from),
            var(--tw-gradient-to)
          );
        }

        .bg-gradient-radial-br {
          background-image: radial-gradient(
            circle at 80% 80%,
            var(--tw-gradient-from),
            var(--tw-gradient-to)
          );
        }

        /* Define Tailwind-like color utility classes */
        .bg-f0f4f8 {
          background-color: #f0f4f8;
        }
        .bg-1a237e {
          background-color: #1a237e;
        }
        .bg-3949ab {
          background-color: #3949ab;
        }
        .bg-7986cb {
          background-color: #7986cb;
        }
        .bg-ffc107 {
          background-color: #ffc107;
        }

        .text-1a237e {
          color: #1a237e;
        }
        .text-3949ab {
          color: #3949ab;
        }
        .text-7986cb {
          color: #7986cb;
        }
        .text-37474f {
          color: #37474f;
        }

        .border-1a237e {
          border-color: #1a237e;
        }
        .border-3949ab {
          border-color: #3949ab;
        }
        .border-7986cb {
          border-color: #7986cb;
        }
        .border-ffc107 {
          border-color: #ffc107;
        }

        .hover\:bg-1a237e:hover {
          background-color: #1a237e;
        }
        .hover\:bg-3949ab:hover {
          background-color: #3949ab;
        }
        .hover\:bg-7986cb:hover {
          background-color: #7986cb;
        }
        .hover\:text-1a237e:hover {
          color: #1a237e;
        }
        .hover\:text-3949ab:hover {
          color: #3949ab;
        }

        .font-cairo {
          font-family: "Cairo", sans-serif;
        }
        .font-tajawal {
          font-family: "Tajawal", sans-serif;
        }
      `}</style>
    </div>
  );
};

export default ArabicHomePage;
