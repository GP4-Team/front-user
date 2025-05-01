import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import AuthLayout from '../../layouts/AuthLayout';
import LoginForm from '../../components/auth/LoginForm';
import RegisterForm from '../../components/auth/RegisterForm';
import gsap from 'gsap';

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const isArabic = language === 'ar';
  
  // Get mode from URL query parameter
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get('mode') || 'login';
  const returnTo = queryParams.get('returnTo') || '/dashboard';
  
  // Manage active mode (login or register)
  const [activeMode, setActiveMode] = useState(mode);
  const loginFormRef = useRef(null);
  const registerFormRef = useRef(null);
  
  // Animation for switching between forms
  useEffect(() => {
    if (loginFormRef.current && registerFormRef.current) {
      if (activeMode === 'login') {
        gsap.to(registerFormRef.current, { 
          opacity: 0, 
          x: 50,
          pointerEvents: 'none',
          position: 'absolute',
          duration: 0.3
        });
        gsap.fromTo(
          loginFormRef.current, 
          { opacity: 0, x: -50, pointerEvents: 'none' },
          { opacity: 1, x: 0, pointerEvents: 'auto', position: 'relative', duration: 0.3 }
        );
      } else {
        gsap.to(loginFormRef.current, { 
          opacity: 0, 
          x: -50,
          pointerEvents: 'none',
          position: 'absolute',
          duration: 0.3
        });
        gsap.fromTo(
          registerFormRef.current, 
          { opacity: 0, x: 50, pointerEvents: 'none' },
          { opacity: 1, x: 0, pointerEvents: 'auto', position: 'relative', duration: 0.3 }
        );
      }
      
      // Update URL query parameter
      const params = new URLSearchParams(location.search);
      params.set('mode', activeMode);
      navigate({ search: params.toString() }, { replace: true });
    }
  }, [activeMode, navigate, location.search]);
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(returnTo || '/dashboard');
    }
  }, [isAuthenticated, navigate, returnTo]);
  
  // Translations
  const translations = {
    loginTitle: isArabic ? 'تسجيل الدخول' : 'Sign In',
    loginSubtitle: isArabic 
      ? 'أهلاً بك مرة أخرى! قم بتسجيل الدخول للوصول إلى حسابك' 
      : 'Welcome back! Sign in to access your account',
    registerTitle: isArabic ? 'إنشاء حساب جديد' : 'Create Account',
    registerSubtitle: isArabic 
      ? 'انضم إلينا اليوم وابدأ رحلة التعلم الخاصة بك' 
      : 'Join us today and start your learning journey',
    dontHaveAccount: isArabic ? 'ليس لديك حساب؟' : 'Don\'t have an account?',
    createAccount: isArabic ? 'إنشاء حساب' : 'Create account',
    alreadyHaveAccount: isArabic ? 'لديك حساب بالفعل؟' : 'Already have an account?',
    signIn: isArabic ? 'تسجيل الدخول' : 'Sign in'
  };
  
  // Determine title and subtitle based on active mode
  const title = activeMode === 'login' ? translations.loginTitle : translations.registerTitle;
  const subtitle = activeMode === 'login' ? translations.loginSubtitle : translations.registerSubtitle;
  
  return (
    <AuthLayout title={title} subtitle={subtitle}>
      <div className="relative">
        <div ref={loginFormRef} className={activeMode === 'login' ? 'block' : 'hidden'}>
          <LoginForm returnTo={returnTo} />
          
          <div className={`mt-8 text-center ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            <p>{translations.dontHaveAccount}{' '}
              <button 
                onClick={() => setActiveMode('register')}
                className={`font-medium ${isDarkMode ? 'text-primary-light hover:text-primary-base' : 'text-primary-base hover:text-primary-dark'}`}
              >
                {translations.createAccount}
              </button>
            </p>
          </div>
        </div>
        
        <div ref={registerFormRef} className={activeMode === 'register' ? 'block' : 'hidden'}>
          <RegisterForm returnTo={returnTo} />
          
          <div className={`mt-8 text-center ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            <p>{translations.alreadyHaveAccount}{' '}
              <button 
                onClick={() => setActiveMode('login')}
                className={`font-medium ${isDarkMode ? 'text-primary-light hover:text-primary-base' : 'text-primary-base hover:text-primary-dark'}`}
              >
                {translations.signIn}
              </button>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default AuthPage;
