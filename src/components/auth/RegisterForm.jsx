import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Eye, EyeOff, User, Lock, Mail, Loader, Check, X } from 'lucide-react';
import gsap from 'gsap';

const RegisterForm = ({ returnTo = '/dashboard' }) => {
  const { register } = useAuth();
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const isArabic = language === 'ar';
  
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Password strength and validation
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const passwordRequirements = [
    { id: 'length', label: isArabic ? '8 أحرف على الأقل' : 'At least 8 characters', met: false },
    { id: 'uppercase', label: isArabic ? 'حرف كبير واحد' : 'One uppercase letter', met: false },
    { id: 'lowercase', label: isArabic ? 'حرف صغير واحد' : 'One lowercase letter', met: false },
    { id: 'number', label: isArabic ? 'رقم واحد' : 'One number', met: false },
    { id: 'special', label: isArabic ? 'رمز خاص واحد' : 'One special character', met: false },
  ];
  
  // Update password requirements whenever password changes
  useEffect(() => {
    const updatedRequirements = [
      { id: 'length', label: passwordRequirements[0].label, met: password.length >= 8 },
      { id: 'uppercase', label: passwordRequirements[1].label, met: /[A-Z]/.test(password) },
      { id: 'lowercase', label: passwordRequirements[2].label, met: /[a-z]/.test(password) },
      { id: 'number', label: passwordRequirements[3].label, met: /[0-9]/.test(password) },
      { id: 'special', label: passwordRequirements[4].label, met: /[^A-Za-z0-9]/.test(password) },
    ];
    
    // Update requirements state
    passwordRequirements.forEach((req, i) => {
      req.met = updatedRequirements[i].met;
    });
    
    // Calculate strength (0-5)
    const meetsCount = updatedRequirements.filter(req => req.met).length;
    setPasswordStrength(meetsCount);
  }, [password]);
  
  // Refs for animation
  const formRef = useRef(null);
  const nameFieldsRef = useRef(null);
  const emailFieldRef = useRef(null);
  const passwordFieldRef = useRef(null);
  const confirmPasswordFieldRef = useRef(null);
  const submitBtnRef = useRef(null);
  const errorRef = useRef(null);
  
  // Initialize animations
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      [nameFieldsRef.current, emailFieldRef.current, passwordFieldRef.current, confirmPasswordFieldRef.current],
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
    
    // Validate form
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError(isArabic ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError(isArabic ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
      return;
    }
    
    if (passwordStrength < 3) {
      setError(isArabic ? 'كلمة المرور ضعيفة جدًا' : 'Password is too weak');
      return;
    }
    
    if (!agreed) {
      setError(isArabic ? 'يرجى الموافقة على الشروط والأحكام' : 'Please agree to terms and conditions');
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
      
      // Call register API
      await register(
        {
          firstName,
          lastName,
          email,
          password
        },
        true,  // Login after registration
        returnTo
      );
      
      // Registration successful
      gsap.to(formRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    } catch (err) {
      console.error('Registration error:', err);
      setError(isArabic 
        ? 'فشل التسجيل: قد يكون البريد الإلكتروني مستخدمًا بالفعل' 
        : 'Registration failed: Email might be already in use');
        
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
    firstName: isArabic ? 'الاسم الأول' : 'First Name',
    lastName: isArabic ? 'اسم العائلة' : 'Last Name',
    email: isArabic ? 'البريد الإلكتروني' : 'Email',
    password: isArabic ? 'كلمة المرور' : 'Password',
    confirmPassword: isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password',
    agree: isArabic ? 'أوافق على' : 'I agree to',
    termsConditions: isArabic ? 'الشروط والأحكام' : 'Terms and Conditions',
    register: isArabic ? 'إنشاء حساب' : 'Create Account',
    orContinueWith: isArabic ? 'أو متابعة باستخدام' : 'Or continue with',
    google: isArabic ? 'جوجل' : 'Google',
    firstNamePlaceholder: isArabic ? 'أدخل اسمك الأول' : 'Enter your first name',
    lastNamePlaceholder: isArabic ? 'أدخل اسم عائلتك' : 'Enter your last name',
    emailPlaceholder: isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email',
    passwordPlaceholder: isArabic ? 'أدخل كلمة المرور' : 'Enter your password',
    confirmPasswordPlaceholder: isArabic ? 'أدخل كلمة المرور مرة أخرى' : 'Enter your password again',
    passwordStrength: isArabic ? 'قوة كلمة المرور' : 'Password strength',
    weak: isArabic ? 'ضعيفة' : 'Weak',
    medium: isArabic ? 'متوسطة' : 'Medium',
    strong: isArabic ? 'قوية' : 'Strong',
    veryStrong: isArabic ? 'قوية جدًا' : 'Very strong',
  };
  
  // Password strength indicator text and color
  const getStrengthText = () => {
    if (passwordStrength <= 1) return { text: translations.weak, color: 'text-red-500' };
    if (passwordStrength <= 3) return { text: translations.medium, color: 'text-yellow-500' };
    if (passwordStrength === 4) return { text: translations.strong, color: 'text-green-500' };
    return { text: translations.veryStrong, color: 'text-emerald-500' };
  };
  
  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      {/* Error message */}
      {error && (
        <div 
          ref={errorRef}
          className={`p-3 ${isDarkMode ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-600'} rounded-md text-sm`}
        >
          {error}
        </div>
      )}
      
      {/* Name Fields */}
      <div ref={nameFieldsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="space-y-2">
          <label 
            htmlFor="firstName" 
            className={`block text-sm font-medium ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}
          >
            {translations.firstName}
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder={translations.firstNamePlaceholder}
            className={`block w-full py-3 px-4 ${
              isDarkMode 
                ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500' 
                : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400'
            } border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-base`}
          />
        </div>
        
        {/* Last Name */}
        <div className="space-y-2">
          <label 
            htmlFor="lastName" 
            className={`block text-sm font-medium ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}
          >
            {translations.lastName}
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder={translations.lastNamePlaceholder}
            className={`block w-full py-3 px-4 ${
              isDarkMode 
                ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500' 
                : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400'
            } border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-base`}
          />
        </div>
      </div>
      
      {/* Email input */}
      <div ref={emailFieldRef} className="space-y-2">
        <label 
          htmlFor="registerEmail" 
          className={`block text-sm font-medium ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}
        >
          {translations.email}
        </label>
        <div className={`relative rounded-md shadow-sm`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail size={16} className={`${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
          </div>
          <input
            id="registerEmail"
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
      <div ref={passwordFieldRef} className="space-y-2">
        <label 
          htmlFor="registerPassword" 
          className={`block text-sm font-medium ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}
        >
          {translations.password}
        </label>
        <div className={`relative rounded-md shadow-sm`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock size={16} className={`${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
          </div>
          <input
            id="registerPassword"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            autoComplete="new-password"
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
        
        {/* Password strength indicator */}
        {password && (
          <div>
            <div className="flex items-center justify-between mt-1 mb-1">
              <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                <div 
                  className={`h-1.5 rounded-full ${
                    passwordStrength <= 1 ? 'bg-red-500' : 
                    passwordStrength <= 3 ? 'bg-yellow-500' : 
                    passwordStrength === 4 ? 'bg-green-500' :
                    'bg-emerald-500'
                  }`} 
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
              <span className={`ml-2 text-xs ${getStrengthText().color}`}>
                {getStrengthText().text}
              </span>
            </div>
            
            {/* Password requirements */}
            {passwordFocus && (
              <div className={`mt-2 text-xs ${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-50 border-neutral-200'} p-2 rounded-md border`}>
                <p className={`mb-1 font-medium ${isDarkMode ? 'text-neutral-200' : 'text-neutral-700'}`}>
                  {translations.passwordStrength}:
                </p>
                <ul className="space-y-1">
                  {passwordRequirements.map((req) => (
                    <li key={req.id} className="flex items-center">
                      {req.met ? (
                        <Check size={12} className="text-green-500 mr-1" />
                      ) : (
                        <X size={12} className="text-red-500 mr-1" />
                      )}
                      <span className={req.met ? (isDarkMode ? 'text-green-400' : 'text-green-600') : (isDarkMode ? 'text-neutral-400' : 'text-neutral-600')}>
                        {req.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Confirm Password input */}
      <div ref={confirmPasswordFieldRef} className="space-y-2">
        <label 
          htmlFor="confirmPassword" 
          className={`block text-sm font-medium ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}
        >
          {translations.confirmPassword}
        </label>
        <div className={`relative rounded-md shadow-sm`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock size={16} className={`${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            required
            placeholder={translations.confirmPasswordPlaceholder}
            className={`block w-full pl-10 pr-10 py-3 ${
              isDarkMode 
                ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500' 
                : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400'
            } border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-base ${
              confirmPassword && password !== confirmPassword ? 'border-red-500 ring-red-500' : ''
            }`}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff size={16} className="text-gray-500" />
              ) : (
                <Eye size={16} className="text-gray-500" />
              )}
            </button>
          </div>
        </div>
        {/* Password match indicator */}
        {confirmPassword && (
          <div className="mt-1 text-xs flex items-center">
            {password === confirmPassword ? (
              <>
                <Check size={12} className="text-green-500 mr-1" />
                <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>
                  {isArabic ? 'كلمات المرور متطابقة' : 'Passwords match'}
                </span>
              </>
            ) : (
              <>
                <X size={12} className="text-red-500 mr-1" />
                <span className={isDarkMode ? 'text-red-400' : 'text-red-600'}>
                  {isArabic ? 'كلمات المرور غير متطابقة' : 'Passwords do not match'}
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Terms Checkbox */}
      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className={`h-4 w-4 rounded ${isDarkMode ? 'bg-neutral-800 border-neutral-600' : 'bg-white border-neutral-300'} focus:ring-primary-base text-primary-base`}
        />
        <label 
          htmlFor="terms" 
          className={`ml-2 block text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}
        >
          {translations.agree}{' '}
          <a 
            href="#" 
            className={`font-medium underline ${isDarkMode ? 'text-primary-light hover:text-primary-base' : 'text-primary-base hover:text-primary-dark'}`}
          >
            {translations.termsConditions}
          </a>
        </label>
      </div>

      {/* Submit button */}
      <div ref={submitBtnRef}>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 flex justify-center items-center rounded-md shadow-sm text-sm font-medium text-white bg-primary-base hover:bg-primary-dark focus:outline-none transition-all duration-300 transform active:scale-95 ${
            isLoading ? 'opacity-80 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <Loader size={18} className="animate-spin" />
          ) : (
            translations.register
          )}
        </button>
      </div>

      {/* Social registration */}
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

export default RegisterForm;
