// src/components/ui/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { Search, Menu, X, ChevronDown, User, LogIn } from 'lucide-react';

/**
 * مكون شريط التنقل الرئيسي للتطبيق
 * يتضمن الشعار والروابط والبحث وزر تسجيل الدخول
 */
const Navbar = () => {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  
  // إغلاق القائمة المتنقلة عند تغيير المسار
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  // تحديد ما إذا كان الرابط نشطًا
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  // قائمة المراحل الدراسية
  const educationalStages = [
    { id: 'primary', titleAr: 'المرحلة الإبتدائية', titleEn: 'Primary Stage' },
    { id: 'middle', titleAr: 'المرحلة المتوسطة', titleEn: 'Middle Stage' },
    { id: 'secondary', titleAr: 'المرحلة الثانوية', titleEn: 'Secondary Stage' },
    { id: 'university', titleAr: 'المرحلة الجامعية', titleEn: 'University Stage' },
  ];
  
  // قائمة المواد الدراسية
  const subjects = [
    { id: 'math', titleAr: 'الرياضيات', titleEn: 'Mathematics' },
    { id: 'science', titleAr: 'العلوم', titleEn: 'Science' },
    { id: 'physics', titleAr: 'الفيزياء', titleEn: 'Physics' },
    { id: 'chemistry', titleAr: 'الكيمياء', titleEn: 'Chemistry' },
    { id: 'biology', titleAr: 'الأحياء', titleEn: 'Biology' },
    { id: 'arabic', titleAr: 'اللغة العربية', titleEn: 'Arabic Language' },
    { id: 'english', titleAr: 'اللغة الإنجليزية', titleEn: 'English Language' },
  ];
  
  // الحصول على النص باللغة الحالية
  const getText = (ar, en) => language === 'ar' ? ar : en;
  
  return (
    <header className={`sticky top-0 z-50 w-full bg-white shadow-sm ${isDarkMode ? 'dark:bg-gray-900 dark:text-white dark:border-b dark:border-gray-800' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* الشعار */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-blue-500">ط</span>
                <span className="text-2xl font-bold text-gray-800 dark:text-white">فرة</span>
                <span className="text-3xl font-bold text-blue-500 mx-1">ت</span>
                <span className="text-2xl font-bold text-gray-800 dark:text-white">عليمية</span>
              </div>
            </Link>
          </div>
          
          {/* القائمة الرئيسية - سطح المكتب */}
          <nav className="hidden md:flex space-x-4 rtl:space-x-reverse">
            {/* المراحل الدراسية - قائمة منسدلة */}
            <div className="relative group">
              <button className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isRTL ? 'ml-1' : 'mr-1'} ${
                isActive('/stages') 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
              }`}>
                {getText('المراحل الدراسية', 'Educational Stages')}
                <ChevronDown size={16} className={`${isRTL ? 'mr-1' : 'ml-1'}`} />
              </button>
              
              <div className="absolute top-full left-0 mt-1 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block">
                <div className="py-1">
                  {educationalStages.map((stage) => (
                    <Link
                      key={stage.id}
                      to={`/stages/${stage.id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      {language === 'ar' ? stage.titleAr : stage.titleEn}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* المواد الدراسية - قائمة منسدلة */}
            <div className="relative group">
              <button className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isRTL ? 'ml-1' : 'mr-1'} ${
                isActive('/subjects') 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
              }`}>
                {getText('المواد الدراسية', 'Subjects')}
                <ChevronDown size={16} className={`${isRTL ? 'mr-1' : 'ml-1'}`} />
              </button>
              
              <div className="absolute top-full left-0 mt-1 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block">
                <div className="py-1">
                  {subjects.map((subject) => (
                    <Link
                      key={subject.id}
                      to={`/subjects/${subject.id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      {language === 'ar' ? subject.titleAr : subject.titleEn}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* روابط ثابتة */}
            <Link
              to="/instructions"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/instructions') 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
              }`}
            >
              {getText('التعليمات', 'Instructions')}
            </Link>
            
            <Link
              to="/leaderboard"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/leaderboard') 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
              }`}
            >
              {getText('لائحة الصدارة', 'Leaderboard')}
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center">
            {/* البحث */}
            <div className={`${searchFocused ? 'w-60' : 'w-48'} relative transition-all duration-300`}>
              <input
                type="text"
                placeholder={getText('ابحث...', 'Search...')}
                className="w-full rounded-full bg-gray-100 dark:bg-gray-800 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 text-sm h-9 px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
            </div>
            
            {/* أزرار تسجيل الدخول / ملف المستخدم */}
            <div className="ml-4 flex items-center space-x-3 rtl:space-x-reverse">
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center px-3 py-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800">
                    <User size={16} className="mr-1" />
                    <span className="text-sm font-medium">{user?.name || getText('حسابي', 'My Account')}</span>
                  </button>
                  
                  <div className="absolute top-full right-0 mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        {getText('الملف الشخصي', 'Profile')}
                      </Link>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        {getText('لوحة التحكم', 'Dashboard')}
                      </Link>
                      <Link
                        to="/courses"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        {getText('دوراتي', 'My Courses')}
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                      >
                        {getText('تسجيل الخروج', 'Sign Out')}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Link
                    to="/auth?mode=login"
                    className="flex items-center px-3 py-1.5 border border-blue-500 text-blue-500 rounded-md text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  >
                    <LogIn size={16} className="mr-1" />
                    {getText('تسجيل الدخول', 'Sign In')}
                  </Link>
                  <Link
                    to="/auth?mode=register"
                    className="px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600"
                  >
                    {getText('سجل مجاناً', 'Register Free')}
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* زر القائمة المتنقلة */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* القائمة المتنقلة */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 shadow-lg">
            {/* حقل البحث */}
            <div className="px-3 py-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder={getText('ابحث...', 'Search...')}
                  className="w-full rounded-md bg-gray-100 dark:bg-gray-800 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 text-sm h-9 px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
            
            {/* روابط المراحل الدراسية */}
            <div className="px-3 py-2">
              <div className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                {getText('المراحل الدراسية', 'Educational Stages')}
              </div>
              <div className="space-y-1 pl-4">
                {educationalStages.map((stage) => (
                  <Link
                    key={stage.id}
                    to={`/stages/${stage.id}`}
                    className="block py-1 text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    {language === 'ar' ? stage.titleAr : stage.titleEn}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* روابط المواد الدراسية */}
            <div className="px-3 py-2">
              <div className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                {getText('المواد الدراسية', 'Subjects')}
              </div>
              <div className="space-y-1 pl-4">
                {subjects.map((subject) => (
                  <Link
                    key={subject.id}
                    to={`/subjects/${subject.id}`}
                    className="block py-1 text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    {language === 'ar' ? subject.titleAr : subject.titleEn}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* روابط أخرى */}
            <Link
              to="/instructions"
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              {getText('التعليمات', 'Instructions')}
            </Link>
            
            <Link
              to="/leaderboard"
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              {getText('لائحة الصدارة', 'Leaderboard')}
            </Link>
            
            {/* أزرار تسجيل الدخول / الملف الشخصي */}
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              {isAuthenticated ? (
                <div className="space-y-1">
                  <div className="px-3 flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <User size={20} />
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800 dark:text-gray-200">{user?.name || getText('المستخدم', 'User')}</div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user?.email || 'user@example.com'}</div>
                    </div>
                  </div>
                  <div className="space-y-1 px-3">
                    <Link
                      to="/profile"
                      className="block py-2 text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    >
                      {getText('الملف الشخصي', 'Profile')}
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block py-2 text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    >
                      {getText('لوحة التحكم', 'Dashboard')}
                    </Link>
                    <Link
                      to="/courses"
                      className="block py-2 text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    >
                      {getText('دوراتي', 'My Courses')}
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left py-2 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      {getText('تسجيل الخروج', 'Sign Out')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-3 space-y-2">
                  <Link
                    to="/auth?mode=login"
                    className="w-full flex justify-center items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-md text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  >
                    {getText('تسجيل الدخول', 'Sign In')}
                  </Link>
                  <Link
                    to="/auth?mode=register"
                    className="w-full flex justify-center items-center px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600"
                  >
                    {getText('سجل مجاناً', 'Register Free')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;