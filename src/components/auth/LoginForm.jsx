import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Eye, EyeOff, User, Lock, Loader } from 'lucide-react';
import gsap from 'gsap';

const LoginForm = ({ returnTo = '/dashboard' }) => {
  const { login } = useAuth();
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const isArabic = language === 'ar';
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Refs for animation
  const formRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const submitBtnRef = useRef(null);
  const errorRef = useRef(null);
  
  // Initialize animations
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      [emailInputRef.current, passwordInputRef.current],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: 'power2.out', delay: 0.2 }
    ).fromTo(
      submitBtnRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
      '-=0.2'
    );
    
    return () => {
      tl.kill();
    };
  }, []);
  
  // Error animation
  useEffect(() => {
    if (error && errorRef.current) {
      gsap.fromTo(
        errorRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [error]);
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError(isArabic ? 'يرجى إدخال البريد الإلكتروني وكلمة المرور' : 'Please enter email and password');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // Simulate button animation
      gsap.to(submitBtnRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
      
      // Call login API
      await login(email, password, returnTo);
      
      // Login successful
      gsap.to(formRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    } catch (err) {
      console.error('Login error:', err);
      setError(isArabic 
        ? 'فشل تسجيل الدخول: تأكد من صحة البريد الإلكتروني وكلمة المرور' 
        : 'Login failed: Please check your email and password');
        
      // Shake animation for error
      gsap.to(formRef.current, {
        x: 10,
        duration: 0.1,
        repeat: 3,
        yoyo: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Translations
  const translations = {
    email: isArabic ? 'البريد الإلكتروني' : 'Email',
    password: isArabic ? 'كلمة المرور' : 'Password',
    rememberMe: isArabic ? 'تذكرني' : 'Remember me',
    forgotPassword: isArabic ? 'نسيت كلمة المرور؟' : 'Forgot password?',
    signIn: isArabic ? 'تسجيل الدخول' : 'Sign In',
    orContinueWith: isArabic ? 'أو متابعة باستخدام' : 'Or continue with',
    google: isArabic ? 'جوجل' : 'Google',
    emailPlaceholder: isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email',
    passwordPlaceholder: isArabic ? 'أدخل كلمة المرور' : 'Enter your password'
  };
  
  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {/* Error message */}
      {error && (
        <div 
          ref={errorRef}
          className={`p-3 ${isDarkMode ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-600'} rounded-md text-sm`}
        >
          {error}
        </div>
      )}
      
      {/* Email input */}
      <div ref={emailInputRef} className="space-y-2">
        <label 
          htmlFor="email" 
          className={`block text-sm font-medium ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}
        >
          {translations.email}
        </label>
        <div className={`relative rounded-md shadow-sm`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User size={16} className={`${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder={translations.emailPlaceholder}
            className={`block w-full pl-10 py-3 ${
              isDarkMode 
                ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500' 
                : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400'
            } border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-base`}
          />
        </div>
      </div>
      
      {/* Password input */}
      <div ref={passwordInputRef} className="space-y-2">
        <div className="flex items-center justify-between">
          <label 
            htmlFor="password" 
            className={`block text-sm font-medium ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}
          >
            {translations.password}
          </label>
          <a 
            href="#" 
            className={`text-xs font-medium ${isDarkMode ? 'text-primary-light hover:text-primary-base' : 'text-primary-base hover:text-primary-dark'}`}
          >
            {translations.forgotPassword}
          </a>
        </div>
        <div className={`relative rounded-md shadow-sm`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock size={16} className={`${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            placeholder={translations.passwordPlaceholder}
            className={`block w-full pl-10 pr-10 py-3 ${
              isDarkMode 
                ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500' 
                : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400'
            } border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-base`}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={16} className="text-gray-500" />
              ) : (
                <Eye size={16} className="text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Remember me checkbox */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className={`h-4 w-4 rounded ${isDarkMode ? 'bg-neutral-800 border-neutral-600' : 'bg-white border-neutral-300'} focus:ring-primary-base text-primary-base`}
          />
          <label 
            htmlFor="remember-me" 
            className={`ml-2 block text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}
          >
            {translations.rememberMe}
          </label>
        </div>
      </div>

      {/* Submit button */}
      <div ref={submitBtnRef}>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 flex justify-center items-center rounded-md shadow-sm text-sm font-medium text-white bg-primary-base hover:bg-primary-dark focus:outline-none transition-all duration-300 transform active:scale-95`}
        >
          {isLoading ? (
            <Loader size={18} className="animate-spin" />
          ) : (
            translations.signIn
          )}
        </button>
      </div>

      {/* Social login options */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t ${isDarkMode ? 'border-neutral-700' : 'border-neutral-300'}`}></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-2 ${isDarkMode ? 'bg-background-dark text-neutral-400' : 'bg-white text-neutral-500'}`}>
              {translations.orContinueWith}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            className={`w-full flex justify-center items-center py-3 px-4 border ${
              isDarkMode 
                ? 'border-neutral-700 bg-neutral-800 hover:bg-neutral-700' 
                : 'border-neutral-300 bg-white hover:bg-neutral-50'
            } rounded-md shadow-sm text-sm font-medium transition-colors`}
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.871-1.752-4.370-2.825-7.035-2.825-5.696 0-10.318 4.622-10.318 10.318s4.622 10.318 10.318 10.318c8.834 0 10.761-8.104 9.788-13.134z"
                fill="#4285F4"
              />
              <path
                d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.871-1.752-4.370-2.825-7.035-2.825-5.696 0-10.318 4.622-10.318 10.318s4.622 10.318 10.318 10.318c8.834 0 10.761-8.104 9.788-13.134z"
                fill="#34A853"
                clipPath="polygon(0 0, 24 0, 24 24, 0 24)"
              />
              <path
                d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.871-1.752-4.370-2.825-7.035-2.825-5.696 0-10.318 4.622-10.318 10.318s4.622 10.318 10.318 10.318c8.834 0 10.761-8.104 9.788-13.134z"
                fill="#FBBC05"
                clipPath="polygon(0 0, 24 0, 24 24, 0 24)"
              />
              <path
                d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.871-1.752-4.370-2.825-7.035-2.825-5.696 0-10.318 4.622-10.318 10.318s4.622 10.318 10.318 10.318c8.834 0 10.761-8.104 9.788-13.134z"
                fill="#EA4335"
                clipPath="polygon(0 0, 24 0, 24 24, 0 24)"
              />
            </svg>
            {translations.google}
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
