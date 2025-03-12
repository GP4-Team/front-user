// src/pages/common/HomePage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

// Enhanced Navbar with search, logo, dark mode toggle, and join button
const EnhancedNavbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Here you would also update your app's theme context
  };

  return (
    <nav
      className={`${
        isDarkMode ? "bg-[#37474F] text-white" : "bg-white text-[#37474F]"
      } shadow-sm transition-colors duration-300`}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center">
              <span
                className={`text-xl font-bold ${
                  isDarkMode ? "text-white" : "text-[#1A237E]"
                }`}
              >
                إدوارا
              </span>
              <div className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 500 200"
                  className="w-8 h-8"
                >
                  <path
                    d="M70 90 L110 70 L150 90 L110 110 Z"
                    fill={isDarkMode ? "#FFFFFF" : "#1A237E"}
                  />
                  <line
                    x1="110"
                    y1="110"
                    x2="110"
                    y2="130"
                    stroke={isDarkMode ? "#FFFFFF" : "#1A237E"}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="110"
                    cy="130"
                    r="4"
                    fill={isDarkMode ? "#FFFFFF" : "#1A237E"}
                  />
                  <circle cx="110" cy="90" r="3" fill="#FFC107" opacity="0.9" />
                </svg>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xs mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                className={`block w-full pr-10 py-2 border rounded-md text-sm ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
                placeholder="ابحث هنا..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Right side - Join button, Dark Mode Toggle, and Profile */}
          <div className="flex items-center">
            {/* Join/Auth Button */}
            <Link
              to="/auth"
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                isDarkMode
                  ? "bg-[#3949AB] text-white hover:bg-[#1A237E]"
                  : "bg-[#1A237E] text-white hover:bg-[#3949AB]"
              } transition-colors duration-150`}
            >
              انضم إلينا
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full focus:outline-none mr-4 ${
                isDarkMode
                  ? "bg-gray-700 text-yellow-300"
                  : "bg-gray-100 text-gray-600"
              }`}
              aria-label="وضع مظلم"
            >
              {isDarkMode ? (
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Profile Icon */}
            <div className="relative mr-6">
              <button
                className={`p-1 rounded-full focus:outline-none ${
                  isDarkMode
                    ? "text-white hover:text-gray-200"
                    : "text-[#37474F] hover:text-[#1A237E]"
                }`}
              >
                <span className="sr-only">عرض الملف الشخصي</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const HomePage = () => {
  return (
    <>
      <EnhancedNavbar />
      <div className="bg-[#F0F4F8] min-h-screen pb-10" dir="rtl">
        {/* Hero Section */}
        <div className="bg-[#F0F4F8] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start">
              {/* Left side - Image with circular background */}
              <div className="md:w-2/5 relative mb-10 md:mb-0 order-2 md:order-1">
                <div className="absolute w-full h-full rounded-full bg-green-50 opacity-50"></div>
                <div className="relative">
                  <img
                    src="/pages/images/student.jpg"
                    alt="Student character"
                    className="relative z-10 mx-auto max-w-md rounded-lg"
                  />
                </div>
              </div>

              {/* Right side - Text content */}
              <div className="md:w-3/5 md:pl-6 text-right order-1 md:order-2">
                <h1 className="text-4xl font-bold text-[#37474F] mb-2">
                  اكتشف طريقك إلى <span className="text-[#3949AB]">Eduara</span>
                  <br />
                  <span className="text-[#1A237E]">التعليم!</span>
                </h1>
                <div className="w-32 h-1 bg-[#FFC107] mt-2 mb-6 mr-0"></div>

                <p className="text-[#37474F] mb-8 leading-relaxed">
                  سواء كنت طالباً، مدرسًا، أو محترفًا تسعى لتطوير مهاراتك، توفر
                  Eduara الأدوات والدورات اللازمة للنجاح. تعلم من نخبة المدربين،
                  واستمتع بتجربة تعليمية متقدمة، وكن مستعدًا لمستقبل أفضل.
                </p>

                {/* CTA buttons converted to links */}
                <div className="flex flex-wrap gap-4 justify-end mb-8">
                  <Link
                    to="/exams"
                    className="px-6 py-3 bg-[#FFC107] text-gray-800 rounded-lg flex items-center"
                  >
                    <span className="ml-1">🔍</span>
                    الاختبارات عبر الإنترنت
                  </Link>
                  <Link
                    to="/courses/join"
                    className="px-6 py-3 bg-[#3949AB] text-white rounded-lg flex items-center"
                  >
                    <span className="ml-1">→</span>
                    انضم للدورات الآن
                  </Link>
                </div>

                {/* Feature boxes */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
                    <div className="p-2 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6 text-[#3949AB]"
                        fill="currentColor"
                      >
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <span className="text-xs text-[#37474F] text-center">
                      مسارك
                      <br />
                      للنجاح
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
                    <div className="p-2 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6 text-[#3949AB]"
                        fill="currentColor"
                      >
                        <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                        <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                      </svg>
                    </div>
                    <span className="text-xs text-[#37474F] text-center">
                      أفضل نظام
                      <br />
                      تتبع
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
                    <div className="p-2 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6 text-[#3949AB]"
                        fill="currentColor"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                    <span className="text-xs text-[#37474F] text-center">
                      دعم بالذكاء
                      <br />
                      الاصطناعي
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Study Materials Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold mb-12 text-right">
            <span className="bg-gray-100 px-3 py-1 rounded-md">المواد</span>
            <span className="text-[#3949AB]"> الدراسية</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Math Card 1 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col items-center transition-transform hover:scale-105">
              <div className="w-20 h-20 rounded-full bg-[#E3F2FD] flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#BBDEFB] flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[#3949AB]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-center mb-2">الرياضيات</h3>
              <p className="text-sm text-gray-500 text-center">
                الصف الثاني الثانوي
              </p>
            </div>

            {/* Math Card 2 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col items-center transition-transform hover:scale-105">
              <div className="w-20 h-20 rounded-full bg-[#E3F2FD] flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#BBDEFB] flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[#3949AB]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-center mb-2">الرياضيات</h3>
              <p className="text-sm text-gray-500 text-center">
                الصف الأول الاعدادي
              </p>
            </div>

            {/* Physics Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col items-center transition-transform hover:scale-105">
              <div className="w-20 h-20 rounded-full bg-[#E3F2FD] flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#BBDEFB] flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[#3949AB]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-center mb-2">الفيزياء</h3>
              <p className="text-sm text-gray-500 text-center">
                الصف الثاني الثانوي
              </p>
            </div>

            {/* Chemistry Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col items-center transition-transform hover:scale-105">
              <div className="w-20 h-20 rounded-full bg-[#E3F2FD] flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#BBDEFB] flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[#3949AB]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-center mb-2">الكيمياء</h3>
              <p className="text-sm text-gray-500 text-center">
                الصف الثاني الثانوي
              </p>
            </div>
          </div>
        </div>

        {/* About Platform Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold mb-12 text-right">
            <span className="bg-gray-100 px-3 py-1 rounded-md">عن</span>
            <span className="text-[#3949AB]"> إدوارا</span>
          </h2>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center justify-end">
              <div className="h-1 w-24 bg-[#FFC107] mx-4 rounded-full"></div>
              لماذا تختار منصة
              <span className="text-[#3949AB] mx-2">إدوارا</span>؟
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* AI Support Feature */}
            <div className="text-center">
              <div className="inline-block mb-4">
                <div className="w-16 h-16 mx-auto bg-[#FFF8E1] rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[#FFC107]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
              </div>
              <h4 className="text-xl font-bold mb-2">الدعم الذكي</h4>
              <p className="text-[#37474F] text-sm">
                يحلل الذكاء الاصطناعي مستواك في كل جزء من المنهج ويخبرك بكيفية
                تحسين مستواك
              </p>
            </div>

            {/* Top Teachers Feature */}
            <div className="text-center">
              <div className="inline-block mb-4">
                <div className="w-16 h-16 mx-auto bg-[#E3F2FD] rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[#3949AB]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
              </div>
              <h4 className="text-xl font-bold mb-2">اختبارات دورية</h4>
              <p className="text-[#37474F] text-sm">
                قدمنا أفضل بنوك الأسئلة في كل منهج للتدرب على كل شيء
              </p>
            </div>
          </div>

          {/* Character image at the bottom */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-[#FFC107] rounded-full opacity-30"></div>
              </div>
              <img
                src="/images/graduate-character.png"
                alt="Graduate character"
                className="relative z-10 max-w-xs"
              />
              {/* Blue circle/logo behind character */}
              <div className="absolute left-0 top-0 w-32 h-32 bg-[#7986CB] rounded-full opacity-60 -z-0"></div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
