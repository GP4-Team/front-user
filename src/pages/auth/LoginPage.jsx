import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Simulate login logic
      if (email === 'test@test.com' && password === '123456') {
        // Store auth token
        localStorage.setItem('authToken', 'demo-token');
        // Navigate to overview
        window.location.href = '/overview';
      } else {
        setError(t('auth.invalidCredentials'));
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(t('auth.error'));
    }
  };

  const fillDemoCredentials = () => {
    setEmail('test@test.com');
    setPassword('123456');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const switchLanguage = (lang) => {
    setCurrentLang(lang);
    setIsLangDropdownOpen(false);
  };

  // Translations object
  const translations = {
    en: {
      auth: {
        login: 'Login',
        email: 'Email',
        password: 'Password',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot Password?',
        signIn: 'Sign In',
        demoCredentials: 'Demo Credentials',
        fillDemo: 'Fill Demo Credentials',
        invalidCredentials: 'Invalid credentials',
        error: 'An error occurred during login'
      },
      welcome: {
        title: 'Full control over teacher and student performance',
        message: 'Monitor student progress, manage lessons, and analyze educational performance seamlessly'
      }
    },
    ar: {
      auth: {
        login: 'تسجيل الدخول',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        rememberMe: 'تذكرني',
        forgotPassword: 'نسيت كلمة المرور؟',
        signIn: 'دخول',
        demoCredentials: 'بيانات تجريبية',
        fillDemo: 'املأ البيانات التجريبية',
        invalidCredentials: 'بيانات الدخول غير صحيحة',
        error: 'حدث خطأ أثناء تسجيل الدخول'
      },
      welcome: {
        title: ' تحكم كامل في أداء المعلمين والطلاب  ',
        message: 'نظام يتيح لك مراقبة تقدم الطلاب، وإدارة الدروس، وتحليل الأداء التعليمي بسلاسة.'
      }
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    return keys.reduce((obj, k) => obj[k], translations[currentLang]);
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Left Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header Controls */}
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">Eximia LMS</div>
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

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-12 space-y-6" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('auth.login')}
            </h2>

            {/* Demo Credentials Box */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-md border border-blue-200 dark:border-blue-700">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                {t('auth.demoCredentials')}
              </h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <p>Email: <span className="font-mono">test@test.com</span></p>
                <p>Password: <span className="font-mono">123456</span></p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('auth.email')}
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
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('auth.password')}
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center dark:text-red-400">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {t('auth.rememberMe')}
                </label>
              </div>
              <button 
                type="button" 
                onClick={() => window.location.href = '/forgot-password'}
                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                {t('auth.forgotPassword')}
              </button>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {t('auth.signIn')}
            </button>

            {/* Quick Fill Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                {t('auth.fillDemo')}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Panel - Info Section */}
      <div className="hidden md:block w-1/2 bg-blue-600 p-8">
        <div className="h-full flex items-center justify-center text-white">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-4">{t('welcome.title')}</h2>
            <p className="text-lg opacity-90">{t('welcome.message')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;