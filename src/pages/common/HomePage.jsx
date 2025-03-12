// src/pages/common/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar"; // Import the Navbar component
import Footer from "../../components/layout/Footer"; // Import the Footer component

// New Navbar component with only Courses and Exams links
const SimpleNavbar = () => {
  return (
    <nav className="bg-white shadow-sm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo */}
              <div className="flex items-center">
                <span className="text-xl font-bold text-[#1A237E]">إدوارا</span>
                <div className="ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 500 200"
                    className="w-8 h-8"
                  >
                    <path
                      d="M70 90 L110 70 L150 90 L110 110 Z"
                      fill="#1A237E"
                    />
                    <line
                      x1="110"
                      y1="110"
                      x2="110"
                      y2="130"
                      stroke="#1A237E"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <circle cx="110" cy="130" r="4" fill="#1A237E" />
                    <circle
                      cx="110"
                      cy="90"
                      r="3"
                      fill="#FFC107"
                      opacity="0.9"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="hidden sm:mr-6 sm:flex sm:space-x-8">
              {/* Desktop navigation links */}
              <Link
                to="/courses"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-[#3949AB] text-sm font-medium text-[#37474F] mr-8"
              >
                الدورات التعليمية
              </Link>
              <Link
                to="/exams"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-[#37474F] hover:border-[#7986CB]"
              >
                الاختبارات
              </Link>
            </div>
          </div>
          <div className="hidden sm:mr-6 sm:flex sm:items-center">
            {/* Profile dropdown */}
            <div className="mr-3 relative">
              <button className="bg-white p-1 rounded-full text-[#37474F] hover:text-[#1A237E] focus:outline-none">
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
      <SimpleNavbar />
      <div className="bg-[#F0F4F8] min-h-screen pb-10" dir="rtl">
        {/* Main Hero Section */}
        <div className="relative bg-gradient-to-br from-[#F0F4F8] to-gray-100 pt-16 pb-24">
          {/* Decorative elements - curves and dots */}
          <div className="absolute top-20 right-0 w-full">
            <svg className="w-full" height="120" fill="none">
              <path
                d="M0,50 Q300,100 600,30 T1200,50"
                stroke="#FFC107"
                strokeWidth="3"
                strokeDasharray="10,10"
                fill="none"
              />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Right side content (changed from left for RTL) */}
              <div>
                <h1 className="text-4xl font-bold text-[#37474F] mb-4 text-right">
                  <span className="block text-5xl mt-2">
                    اكتشف طريقك التعليمي!
                  </span>
                  مع <span className="text-[#3949AB]">إدوارا</span>
                </h1>
                <div className="w-32 h-2 bg-[#FFC107] mb-6 rounded-full mr-auto"></div>

                <p className="text-[#37474F] mb-8 text-right">
                  سواء كنت طالبًا أو معلمًا أو مهنيًا يسعى لتطوير مهاراتك، توفر
                  لك إدوارا الأدوات والدورات اللازمة للنجاح. تعلم من نخبة
                  المدربين، واستمتع بتجربة تعليمية متقدمة، وكن مستعدًا لمستقبل
                  أفضل.
                </p>

                <div className="flex flex-wrap gap-4 justify-end">
                  <Link
                    to="/register"
                    className="inline-flex items-center px-6 py-3 bg-[#3949AB] text-white font-medium rounded-full hover:bg-[#1A237E] transition-colors"
                  >
                    <span className="ml-2">📝</span>
                    انضم الآن
                  </Link>

                  <div className="flex space-x-3">
                    <a
                      href="#"
                      className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-50"
                    >
                      <svg
                        className="w-5 h-5 text-[#37474F]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-50"
                    >
                      <svg
                        className="w-5 h-5 text-[#37474F]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-50"
                    >
                      <svg
                        className="w-5 h-5 text-[#37474F]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-6 mt-8 justify-end">
                  <div className="flex items-center">
                    <span className="text-sm text-[#37474F] font-medium ml-3">
                      طريقك نحو النجاح
                    </span>
                    <div className="flex-shrink-0">
                      <div className="p-2 bg-[#E3F2FD] rounded-full">
                        <svg
                          className="w-5 h-5 text-[#3949AB]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="text-sm text-[#37474F] font-medium ml-3">
                      نظام تتبع متميز
                    </span>
                    <div className="flex-shrink-0">
                      <div className="p-2 bg-[#E3F2FD] rounded-full">
                        <svg
                          className="w-5 h-5 text-[#3949AB]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                          <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="text-sm text-[#37474F] font-medium ml-3">
                      دعم بالذكاء الاصطناعي
                    </span>
                    <div className="flex-shrink-0">
                      <div className="p-2 bg-[#E3F2FD] rounded-full">
                        <svg
                          className="w-5 h-5 text-[#3949AB]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Left side character illustration (changed from right for RTL) */}
              <div className="hidden md:block relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-56 h-56 bg-[#FFC107] rounded-full opacity-30"></div>
                </div>
                <div className="relative">
                  <img
                    src="/pages/images/student.jpg" // Path to the uploaded image
                    alt="Student character"
                    className="mx-auto max-w-full h-auto rounded-lg shadow-lg"
                  />
                  {/* Add decorative elements like circles and lines */}
                  <div className="absolute top-10 left-10">
                    <div className="w-8 h-8 bg-[#7986CB] rounded-full opacity-50"></div>
                  </div>
                  <div className="absolute top-32 right-0">
                    <svg
                      width="100"
                      height="30"
                      viewBox="0 0 100 30"
                      fill="none"
                    >
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
              <h4 className="text-xl font-bold mb-2">أفضل المعلمين</h4>
              <p className="text-[#37474F] text-sm">
                نوفر أفضل طاقم تعليمي لمساعدتك على الوصول إلى أعلى الدرجات
              </p>
            </div>

            {/* Continuous Challenges Feature */}
            <div className="text-center">
              <div className="inline-block mb-4">
                <div className="w-16 h-16 mx-auto bg-[#E8F5E9] rounded-full flex items-center justify-center">
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
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
              </div>
              <h4 className="text-xl font-bold mb-2">تحديات مستمرة</h4>
              <p className="text-[#37474F] text-sm">
                حوّلنا تجربة التعلم إلى لعبة حيث يمكنك تحسين مستواك والتنافس مع
                الأصدقاء
              </p>
            </div>

            {/* Periodic Exams Feature */}
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
