import { useState } from 'react';

const Navbar = ({ 
  toggleSidebar, 
  isDarkMode, 
  toggleDarkMode,
  currentLang,
  changeLanguage,
  isRTL
}) => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
      <div className="px-4 mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Logo and Toggle */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <img
                  className="h-8 w-auto"
                  src="/eximia-logo.png"
                  alt="Eximia LMS"
                />
                <span className="ml-2 text-lg font-bold text-gray-800 dark:text-white hidden sm:block">
                  Eximia LMS
                </span>
              </div>
            </div>
            <button
              type="button"
              className={`${isRTL ? 'mr-4' : 'ml-4'} text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 md:hidden`}
              onClick={toggleSidebar}
            >
              <span className="sr-only">Toggle sidebar</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200">
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-gray-800" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200"
              >
                <img
                  src={`/flags/${currentLang}.svg`}
                  alt={currentLang}
                  className="h-5 w-5 rounded-full"
                />
                <span className="text-xs hidden sm:inline">
                  {currentLang === 'ar' ? 'العربية' : 'English'}
                </span>
                <span className="text-xs">▼</span>
              </button>

              {isLangDropdownOpen && (
                <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-50`}>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        changeLanguage('en');
                        setIsLangDropdownOpen(false);
                      }}
                      className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 ${currentLang === 'en' ? 'bg-gray-100 dark:bg-gray-600' : ''}`}
                    >
                      <img
                        src="/flags/en.svg"
                        alt="English"
                        className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'} rounded-full`}
                      />
                      English
                    </button>
                    <button
                      onClick={() => {
                        changeLanguage('ar');
                        setIsLangDropdownOpen(false);
                      }}
                      className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 ${currentLang === 'ar' ? 'bg-gray-100 dark:bg-gray-600' : ''}`}
                    >
                      <img
                        src="/flags/ar.svg"
                        alt="Arabic"
                        className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'} rounded-full`}
                      />
                      العربية
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src="/profile-placeholder.png"
                  alt="User profile"
                />
                <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Abdelrahman Mostafa
                </span>
              </button>

              {isProfileDropdownOpen && (
                <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-50`}>
                  <div className="py-1">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      {currentLang === 'ar' ? 'الملف الشخصي' : 'Your Profile'}
                    </a>
                    <a
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      {currentLang === 'ar' ? 'الإعدادات' : 'Settings'}
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-600"
                    >
                      {currentLang === 'ar' ? 'تسجيل الخروج' : 'Sign out'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;