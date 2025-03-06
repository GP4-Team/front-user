import { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch (err) {
      console.error('Reset password error:', err);
      setError('An error occurred. Please try again.');
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const switchLanguage = (lang) => {
    setCurrentLang(lang);
    setIsLangDropdownOpen(false);
  };

  const goToLogin = () => {
    window.location.href = '/login';
  };

  // Translations
  const translations = {
    en: {
      title: 'Reset Password',
      subtitle: 'Enter your email address and we will send you instructions to reset your password.',
      email: 'Email',
      submit: 'Send Reset Link',
      backToLogin: 'Back to Login',
      success: 'Check your email',
      successMessage: 'If an account exists for {email}, you will receive password reset instructions.'
    },
    ar: {
      title: 'إعادة تعيين كلمة المرور',
      subtitle: 'أدخل عنوان بريدك الإلكتروني وسنرسل لك تعليمات إعادة تعيين كلمة المرور.',
      email: 'البريد الإلكتروني',
      submit: 'إرسال رابط إعادة التعيين',
      backToLogin: 'العودة إلى تسجيل الدخول',
      success: 'تحقق من بريدك الإلكتروني',
      successMessage: 'إذا كان هناك حساب لـ {email}، فستتلقى تعليمات إعادة تعيين كلمة المرور.'
    }
  };

  const t = (key) => translations[currentLang][key];

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Left Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header Controls */}
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">HIRE</div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <span className="text-yellow-500">☀️</span>
                ) : (
                  <span className="text-gray-600">🌙</span>
                )}
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {currentLang === 'ar' ? 'العربية' : 'English'}
                  <span className="text-xs ml-1">▼</span>
                </button>
                
                {isLangDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <button
                        onClick={() => switchLanguage('en')}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        English
                      </button>
                      <button
                        onClick={() => switchLanguage('ar')}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        العربية
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {submitted ? (
            // Success State
            <div className="text-center" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('success')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t('successMessage').replace('{email}', email)}
              </p>
              <button
                onClick={goToLogin}
                className="mt-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t('backToLogin')}
              </button>
            </div>
          ) : (
            // Form State
            <form onSubmit={handleSubmit} className="mt-12 space-y-6" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {t('title')}
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {t('subtitle')}
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('email')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center dark:text-red-400">
                  {error}
                </div>
              )}

              <div className="flex flex-col space-y-4">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {t('submit')}
                </button>
                
                <button
                  type="button"
                  onClick={goToLogin}
                  className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                >
                  {t('backToLogin')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Right Panel - Keep the same blue panel for consistency */}
      <div className="hidden md:block w-1/2 bg-blue-600 p-8">
        <div className="h-full flex items-center justify-center text-white">
          <div className="max-w-md">
            {/* Use the same welcome message or customize for password reset */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;