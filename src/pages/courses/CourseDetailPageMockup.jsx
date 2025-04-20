// src/pages/courses/CourseDetailPageMockup.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { Clock, FileText, FileCheck, FileVideo, FileAudio, Image } from 'lucide-react';
import { LinkedIn, Twitter, Share2, WhatsApp } from 'lucide-react';

// Components
import Navbar from "../../components/navigation/Navbar";
import SimpleFooter from "../../components/home/SimpleFooter";

/**
 * صفحة تفاصيل المادة - نفس تصميم الصورة المرفقة مع التعديلات المطلوبة
 * @returns {JSX.Element} - صفحة تفاصيل المادة
 */
const CourseDetailPageMockup = () => {
  const { courseId } = useParams();
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  
  // حالة التبويبات النشطة
  const [activeTab, setActiveTab] = useState('sections');
  // حالة الأقسام المفتوحة
  const [openSections, setOpenSections] = useState({
    'section-1': true,
    'section-2': false,
    'section-3': false,
  });
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;
  
  // التبديل بين التبويبات
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // فتح/إغلاق قسم
  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#121212] text-[#E0E0E0]' : 'bg-[#F0F4F8] text-[#37474F]'}`}>
      {/* Navbar - كما هو في الصورة */}
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Layout grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="md:col-span-4">
            {/* Course info card */}
            <div className={`${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} rounded-lg shadow-md p-4 mb-4`}>
              {/* رقم 1 */}
              <div className="bg-yellow-400 text-black font-bold w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                {getText('رقم 1', 'No. 1')}
              </div>
              
              {/* تفاصيل المادة */}
              <h2 className="font-bold text-xl text-center mb-4">
                {getText('معلومات المادة', 'Course Information')}
              </h2>
              
              {/* المدة */}
              <div className="flex items-center mb-3 rtl:flex-row-reverse">
                <Clock className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mx-2`} size={18} />
                <span className="text-sm">58 {getText('ساعة', 'hours')} و 17 {getText('دقيقة', 'minutes')}</span>
              </div>
              
              {/* المستوى */}
              <div className="flex items-center mb-3 rtl:flex-row-reverse">
                <FileText className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mx-2`} size={18} />
                <span className="text-sm">{getText('كيمياء ثالثة ثانوي', 'Chemistry 3rd Secondary')}</span>
              </div>
              
              {/* عدد التمارين */}
              <div className="flex items-center mb-3 rtl:flex-row-reverse">
                <FileCheck className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mx-2`} size={18} />
                <span className="text-sm">66 {getText('تمرين', 'Exercises')}</span>
              </div>
              
              {/* الإتاحة */}
              <div className="flex items-center mb-3 rtl:flex-row-reverse">
                <Clock className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mx-2`} size={18} />
                <span className="text-sm">{getText('متاحة دائماً', 'Always available')}</span>
              </div>
              
              {/* زر الدخول */}
              <div className="mt-6">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition duration-200">
                  {getText('دخول للمادة', 'Enter Course')}
                </button>
              </div>
            </div>
            
            {/* مشاركة المادة */}
            <div className={`${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} rounded-lg shadow-md p-4`}>
              <h3 className="font-medium mb-4">{getText('مشاركة المادة', 'Share Course')}</h3>
              <div className="flex justify-center space-x-4 rtl:space-x-reverse">
                <button className="p-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition">
                  <LinkedIn size={20} />
                </button>
                <button className="p-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition">
                  <Twitter size={20} />
                </button>
                <button className="p-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition">
                  <WhatsApp size={20} />
                </button>
                <button className="p-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="md:col-span-8">
            {/* Course Header */}
            <div className={`${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} rounded-lg shadow-md p-6 mb-6`}>
              {/* Course thumbnail image */}
              <img 
                src="/api/placeholder/800/400" 
                alt="معسكر تجريبي لمنصة اديورا التعليمية"
                className="w-full h-auto rounded-lg mb-4"
              />
              
              {/* Course title & subtitle */}
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold mb-2">
                  {getText('معسكر تجريبي لمنصة اديورا التعليمية', 'Experimental Camp for Eduara Educational Platform')}
                </h1>
                <p className="text-sm text-gray-500">
                  {getText('معسكر تجريبي لمنصة اديورا التعليمية 2025', 'Experimental Camp for Eduara Educational Platform 2025')}
                </p>
              </div>
              
              {/* Instructor info */}
              <div className="flex justify-center items-center mb-2">
                <img 
                  src="/api/placeholder/40/40" 
                  alt="Mai Hany"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <p className="font-medium">
                    {getText('مي هاني', 'Mai Hany')}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {getText('مدرسة كيمياء ثالثة ثانوي', 'Chemistry Teacher - 3rd Secondary')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className={`flex border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} mb-6`}>
              <button 
                className={`px-4 py-2 font-medium ${activeTab === 'sections' ? 
                  (isDarkMode ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600') : 
                  'text-gray-500'}`}
                onClick={() => handleTabChange('sections')}
              >
                {getText('الأقسام', 'Sections')}
              </button>
              <button 
                className={`px-4 py-2 font-medium ${activeTab === 'description' ? 
                  (isDarkMode ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600') : 
                  'text-gray-500'}`}
                onClick={() => handleTabChange('description')}
              >
                {getText('الوصف', 'Description')}
              </button>
            </div>
            
            {/* Tab Content */}
            {activeTab === 'sections' && (
              <div>
                {/* Section 1 */}
                <div className={`mb-4 border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg overflow-hidden`}>
                  {/* Section header */}
                  <div 
                    className={`flex justify-between items-center p-4 cursor-pointer ${
                      isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => toggleSection('section-1')}
                  >
                    <div className="flex items-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 ${openSections['section-1'] ? 'transform rotate-90' : ''} transition-transform`}
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="font-medium flex-1 text-right">
                      {getText('قسم تجربة', 'Experimental Section')}
                    </h3>
                    <div className="text-sm">
                      5 {getText('درس', 'lessons')} • 2 {getText('تطبيق', 'applications')}
                    </div>
                  </div>
                  
                  {/* Section content */}
                  {openSections['section-1'] && (
                    <div className={`${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}>
                      {/* Lesson item 1 */}
                      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <div className="flex items-center">
                          <FileVideo size={20} className="text-blue-500 mr-3" />
                        </div>
                        <div className="flex-1 text-right">
                          <h4 className="font-medium">
                            {getText('درس يوتيوب تجريبي', 'Experimental YouTube Video')}
                          </h4>
                        </div>
                      </div>
                      
                      {/* Lesson item 2 */}
                      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <div className="flex items-center">
                          <FileVideo size={20} className="text-blue-500 mr-3" />
                        </div>
                        <div className="flex-1 text-right">
                          <h4 className="font-medium">
                            {getText('يوتيوب محمي', 'Protected YouTube')}
                          </h4>
                        </div>
                      </div>
                      
                      {/* Lesson item 3 */}
                      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <div className="flex items-center">
                          <Image size={20} className="text-purple-500 mr-3" />
                        </div>
                        <div className="flex-1 text-right">
                          <h4 className="font-medium">
                            {getText('صورة تجريبية 3', 'Experimental Image 3')}
                          </h4>
                        </div>
                      </div>
                      
                      {/* Exam item */}
                      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <div className="flex items-center">
                          <FileCheck size={20} className="text-yellow-500 mr-3" />
                        </div>
                        <div className="flex-1 text-right">
                          <h4 className="font-medium">
                            {getText('امتحان تجريبي 1', 'Experimental Exam 1')}
                          </h4>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Section 2 */}
                <div className={`mb-4 border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg overflow-hidden`}>
                  {/* Section header */}
                  <div 
                    className={`flex justify-between items-center p-4 cursor-pointer ${
                      isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => toggleSection('section-2')}
                  >
                    <div className="flex items-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 ${openSections['section-2'] ? 'transform rotate-90' : ''} transition-transform`}
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="font-medium flex-1 text-right">
                      {getText('قسم تجربة 2', 'Experimental Section 2')}
                    </h3>
                    <div className="text-sm">
                      4 {getText('درس', 'lessons')} • 1 {getText('تطبيق', 'application')}
                    </div>
                  </div>
                  
                  {/* Section content */}
                  {openSections['section-2'] && (
                    <div className={`${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}>
                      {/* Items would appear here when expanded */}
                    </div>
                  )}
                </div>
                
                {/* Section 3 */}
                <div className={`mb-4 border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg overflow-hidden`}>
                  {/* Section header */}
                  <div 
                    className={`flex justify-between items-center p-4 cursor-pointer ${
                      isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => toggleSection('section-3')}
                  >
                    <div className="flex items-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 ${openSections['section-3'] ? 'transform rotate-90' : ''} transition-transform`}
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="font-medium flex-1 text-right">
                      {getText('قسم جديد', 'New Section')}
                    </h3>
                    <div className="text-sm">
                      0 {getText('درس', 'lessons')} • 1 {getText('تطبيق', 'application')}
                    </div>
                  </div>
                  
                  {/* Section content */}
                  {openSections['section-3'] && (
                    <div className={`${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}>
                      {/* Items would appear here when expanded */}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'description' && (
              <div className={`${isDarkMode ? 'bg-[#1E1