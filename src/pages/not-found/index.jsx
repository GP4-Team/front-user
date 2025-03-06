import { useState } from 'react';

const NotFound = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  );
  const [currentLang, setCurrentLang] = useState('en');

  // Translations
  const translations = {
    en: {
      title: '404',
      subtitle: 'Page not found',
      description: "Sorry, we couldn't find the page you're looking for.",
      backToHome: 'Back to Overview',
      reportIssue: 'Report this issue'
    },
    ar: {
      title: '404',
      subtitle: 'الصفحة غير موجودة',
      description: 'عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها.',
      backToHome: 'العودة إلى اللوحة الرئيسية',
      reportIssue: 'الإبلاغ عن هذه المشكلة'
    }
  };

  const t = (key) => translations[currentLang][key];

  return (
    <div 
      className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'
      }`}
      dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="max-w-2xl px-6 text-center">
        {/* 404 Icon */}
        <svg
          className="mx-auto h-48 w-48 text-blue-600 dark:text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 15h8" />
          <path d="M9 9h.01" />
          <path d="M15 9h.01" />
        </svg>

        {/* Content */}
        <div className="mt-8">
          <h1 className="text-8xl font-extrabold text-blue-600 dark:text-blue-500">
            {t('title')}
          </h1>
          <p className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
            {t('subtitle')}
          </p>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {t('description')}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => window.location.href = '/overview'}
            className="w-full sm:w-auto px-8 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {t('backToHome')}
          </button>
          {/* <button
            onClick={() => window.location.href = 'mailto:support@example.com'}
            className="w-full sm:w-auto px-8 py-3 text-base font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md"
          >
            {t('reportIssue')}
          </button> */}
        </div>

        {/* Fun Easter Egg */}
        <div 
          className="mt-16 text-gray-400 dark:text-gray-600 select-none cursor-default transform hover:scale-105 transition-transform"
          title="Try clicking the home button instead!"
        >
          
        </div>
      </div>
    </div>
  );
};

export default NotFound;