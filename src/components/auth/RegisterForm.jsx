import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/api/index';
import { initCsrfToken } from '../../services/api';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

/**
 * RegisterForm component for user registration
 * Supports multi-language and dark mode
 * Sends exact API fields as required: name, email, phone, password, type
 * 
 * @param {Object} props - Component props
 * @param {string} props.returnTo - Path to redirect after successful registration
 * @returns {JSX.Element} - Register form component
 */
const RegisterForm = ({ returnTo = '/' }) => {
  const navigate = useNavigate();
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const { setUser, setIsAuthenticated } = useAuth();
  
  // Form state with exact API fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    type: 'student',
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Initialize CSRF token when component mounts
  useEffect(() => {
    // Fetch CSRF token on mount
    const fetchCsrfToken = async () => {
      try {
        console.log('Initializing CSRF token on form mount...');
        await initCsrfToken();
      } catch (error) {
        console.error('Error initializing CSRF token on form mount:', error);
      }
    };
    
    fetchCsrfToken();
  }, []);
  
  /**
   * Check if text contains Arabic characters
   * @param {string} text - Text to check
   * @returns {boolean} - True if contains Arabic
   */
  const containsArabic = (text) => {
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    return arabicRegex.test(text);
  };

  /**
   * Filter phone number to allow only digits and limit to 11 characters
   * @param {string} value - Input value
   * @returns {string} - Filtered value
   */
  const filterPhoneNumber = (value) => {
    // Remove all non-digit characters and limit to 11 digits
    return value.replace(/\D/g, '').slice(0, 11);
  };

  /**
   * Filter text to remove Arabic characters
   * @param {string} value - Input value
   * @returns {string} - Filtered value
   */
  const filterArabicCharacters = (value) => {
    // Remove Arabic characters
    return value.replace(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g, '');
  };

  /**
   * Handle input changes with validation and filtering
   * 
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    let filteredValue = value;
    
    // Apply specific filters based on field type
    if (name === 'phone') {
      // For phone: only digits, max 11 characters
      filteredValue = filterPhoneNumber(value);
    } else {
      // For all other fields: remove Arabic characters
      filteredValue = filterArabicCharacters(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: filteredValue
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  /**
   * Handle key press to prevent Arabic characters and invalid input
   * @param {Event} e - Key press event
   */
  const handleKeyPress = (e, fieldType = 'text') => {
    const char = e.key;
    
    if (fieldType === 'phone') {
      // For phone: only allow digits
      if (!/[0-9]/.test(char) && !['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(char)) {
        e.preventDefault();
      }
      // Prevent input if already 11 characters
      if (e.target.value.length >= 11 && !['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(char)) {
        e.preventDefault();
      }
    } else {
      // For other fields: prevent Arabic characters
      if (containsArabic(char)) {
        e.preventDefault();
      }
    }
  };
  
  /**
   * Handle form submission to API
   * 
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    
    // Client-side validation
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Create API payload with exact field names required by the API
    const apiData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      type: formData.type
    };
    
    // Only include phone if provided and not empty
    if (formData.phone && formData.phone.trim() !== '') {
      apiData.phone = formData.phone;
    }
    
    setLoading(true);
    
    try {
      // Get fresh CSRF token before registration (only in production to avoid CORS)
      if (window.location.hostname !== 'localhost') {
        console.log('Getting fresh CSRF token before registration...');
        await initCsrfToken();
      } else {
        console.log('🛠️ Development mode: Skipping CSRF token initialization');
      }
      
      // Log the data being sent for debugging
      console.log('Sending registration data:', apiData);
      
      // Call the registration API
      const response = await authService.register(apiData);
      
      console.log('Registration response:', response);
      
      // Handle success
      if (response && response.token) {
        // If user data is also returned, update auth context
        if (response.user) {
          setUser(response.user);
          setIsAuthenticated(true);
        }
        
        // Handle success
        setMessage({
          text: response.message || (language === 'ar' ? 'تم التسجيل بنجاح!' : 'Registration successful!'),
          type: 'success'
        });
        
        // Redirect after short delay
        setTimeout(() => {
          navigate(returnTo);
        }, 1500);
      } else {
        // Handle success without token (e.g., email verification required)
        setMessage({
          text: response.message || (language === 'ar' ? 'تم التسجيل بنجاح! يرجى تأكيد بريدك الإلكتروني.' : 'Registration successful! Please verify your email.'),
          type: 'success'
        });
        
        // Redirect to login after short delay
        setTimeout(() => {
          navigate('/auth?mode=login');
        }, 2000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle API errors
      if (error.errors) {
        // Format validation errors from backend
        setErrors(error.errors);
      } else if (error.statusCode === 500) {
        // Special handling for server errors
        setMessage({
          text: language === 'ar' ? 
            'خطأ في إعدادات الخادم. يرجى التواصل مع الدعم الفني.' : 
            'Server configuration error. Please contact support.',
          type: 'error'
        });
      } else if (error.csrf) {
        // Special handling for CSRF errors
        console.log('CSRF error detected, retrying with new token...');
        setMessage({
          text: language === 'ar' ? 'حدث خطأ في المصادقة. جاري إعادة المحاولة...' : 'Authentication error. Retrying...',
          type: 'error'
        });
        
        // Wait a moment then try again
        setTimeout(() => {
          handleSubmit(e);
        }, 1000);
        return;
      } else {
        // General error message
        setMessage({
          text: error.message || (language === 'ar' ? 'فشل التسجيل. يرجى المحاولة مرة أخرى.' : 'Registration failed. Please try again.'),
          type: 'error'
        });
      }
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Validate form data
   * 
   * @returns {Object} Validation errors if any
   */
  const validateForm = () => {
    const errors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = language === 'ar' ? 'الاسم مطلوب' : 'Full name is required';
    } else if (formData.name.length > 255) {
      errors.name = language === 'ar' ? 'يجب أن لا يتجاوز الاسم 255 حرف' : 'Name must be less than 255 characters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = language === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = language === 'ar' ? 'يرجى إدخال بريد إلكتروني صالح' : 'Please enter a valid email address';
    } else if (formData.email.length > 255) {
      errors.email = language === 'ar' ? 'يجب أن لا يتجاوز البريد الإلكتروني 255 حرف' : 'Email must be less than 255 characters';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = language === 'ar' ? 'كلمة المرور مطلوبة' : 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = language === 'ar' ? 'يجب أن تكون كلمة المرور 8 أحرف على الأقل' : 'Password must be at least 8 characters';
    }
    
    // Password confirmation
    if (formData.password !== formData.password_confirmation) {
      errors.password_confirmation = language === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match';
    }
    
    // Phone validation (optional)
    if (formData.phone && formData.phone.trim() !== '') {
      if (!/^[0-9]+$/.test(formData.phone)) {
        errors.phone = language === 'ar' ? 'يجب أن يحتوي رقم الهاتف على أرقام فقط' : 'Phone number must contain only numbers';
      } else if (formData.phone.length !== 11) {
        errors.phone = language === 'ar' ? 'يجب أن يكون رقم الهاتف 11 رقم بالضبط' : 'Phone number must be exactly 11 digits';
      }
    }
    
    // Type validation
    if (!['student', 'instructor', 'moderator'].includes(formData.type)) {
      errors.type = language === 'ar' ? 'نوع المستخدم غير صالح' : 'Invalid user type';
    }
    
    return errors;
  };
  
  // Function to retry registration on CSRF error
  const retryRegistration = async () => {
    try {
      setLoading(true);
      setMessage({ text: language === 'ar' ? 'جاري إعادة المحاولة...' : 'Retrying...', type: 'info' });
      
      // Get fresh CSRF token
      await initCsrfToken();
      
      // Wait a moment for CSRF token to be set in cookies
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create API payload again
      const apiData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        type: formData.type
      };
      
      if (formData.phone && formData.phone.trim() !== '') {
        apiData.phone = formData.phone;
      }
      
      // Retry registration
      const response = await authService.register(apiData);
      
      // Handle success
      if (response.data && response.data.token) {
        if (response.data.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        }
        
        setMessage({
          text: response.message || (language === 'ar' ? 'تم التسجيل بنجاح!' : 'Registration successful!'),
          type: 'success'
        });
        
        setTimeout(() => {
          navigate(returnTo);
        }, 1500);
      } else {
        setMessage({
          text: response.message || (language === 'ar' ? 'تم التسجيل بنجاح! يرجى تأكيد بريدك الإلكتروني.' : 'Registration successful! Please verify your email.'),
          type: 'success'
        });
        
        setTimeout(() => {
          navigate('/auth?mode=login');
        }, 2000);
      }
    } catch (error) {
      console.error('Retry registration error:', error);
      setMessage({
        text: error.message || (language === 'ar' ? 'فشل التسجيل مرة أخرى. يرجى المحاولة لاحقاً.' : 'Registration failed again. Please try later.'),
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Labels and text based on selected language
  const labels = {
    fullName: language === 'ar' ? 'الاسم الكامل' : 'Full Name',
    email: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
    phone: language === 'ar' ? 'رقم الهاتف' : 'Phone Number',
    password: language === 'ar' ? 'كلمة المرور' : 'Password',
    confirmPassword: language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password',
    accountType: language === 'ar' ? 'نوع الحساب' : 'Account Type',
    passwordHint: language === 'ar' ? 'يجب أن تكون كلمة المرور 8 أحرف على الأقل' : 'Password must be at least 8 characters long',
    student: language === 'ar' ? 'طالب' : 'Student',
    instructor: language === 'ar' ? 'معلم' : 'Instructor',
    moderator: language === 'ar' ? 'مشرف' : 'Moderator',
    createAccount: language === 'ar' ? 'إنشاء حساب' : 'Create Account',
    registering: language === 'ar' ? 'جاري التسجيل...' : 'Registering...',
    haveAccount: language === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?',
    signIn: language === 'ar' ? 'تسجيل الدخول' : 'Sign in',
    required: language === 'ar' ? 'مطلوب' : 'required',
    retryRegistration: language === 'ar' ? 'إعادة المحاولة' : 'Retry Registration',
    csrfError: language === 'ar' ? 'حدث خطأ في المصادقة. يرجى المحاولة مرة أخرى.' : 'Authentication error. Please try again.'
  };
  
  return (
    <div className={`p-6 rounded-lg w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {message.text && (
        <div 
          className={`mb-6 p-3 rounded-md ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
              : message.type === 'info'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
          }`}
        >
          {message.text}
          
          {/* Retry button for CSRF errors */}
          {message.type === 'error' && message.text.includes('CSRF') && (
            <button
              onClick={retryRegistration}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors block w-full"
            >
              {labels.retryRegistration}
            </button>
          )}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Full Name Field */}
        <div>
          <label htmlFor="name" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>
            {labels.fullName} <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            onKeyPress={(e) => handleKeyPress(e, 'text')}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.name 
                ? 'border-red-300 dark:border-red-500' 
                : isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-white' 
                  : 'border-gray-300 bg-white text-gray-900'
            }`}
            placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
          )}
        </div>
        
        {/* Email Field */}
        <div>
          <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>
            {labels.email} <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            onKeyPress={(e) => handleKeyPress(e, 'text')}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.email 
                ? 'border-red-300 dark:border-red-500' 
                : isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-white' 
                  : 'border-gray-300 bg-white text-gray-900'
            }`}
            placeholder="example@example.com"
            dir="ltr"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
          )}
        </div>
        
        {/* Phone Field (Optional) */}
        <div>
          <label htmlFor="phone" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>
            {labels.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            onKeyPress={(e) => handleKeyPress(e, 'phone')}
            maxLength={11}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.phone 
                ? 'border-red-300 dark:border-red-500' 
                : isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-white' 
                  : 'border-gray-300 bg-white text-gray-900'
            }`}
            placeholder="01xxxxxxxxx"
            dir="ltr"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
          )}
        </div>
        
        {/* Password Field */}
        <div>
          <label htmlFor="register-password" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>
            {labels.password} <span className="text-red-500">*</span>
          </label>
          <input
            id="register-password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            onKeyPress={(e) => handleKeyPress(e, 'text')}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.password 
                ? 'border-red-300 dark:border-red-500' 
                : isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-white' 
                  : 'border-gray-300 bg-white text-gray-900'
            }`}
            placeholder="********"
            dir="ltr"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
          )}
          <p className={`mt-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {labels.passwordHint}
          </p>
        </div>
        
        {/* Password Confirmation Field */}
        <div>
          <label htmlFor="register-password-confirmation" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>
            {labels.confirmPassword} <span className="text-red-500">*</span>
          </label>
          <input
            id="register-password-confirmation"
            name="password_confirmation"
            type="password"
            required
            value={formData.password_confirmation}
            onChange={handleChange}
            onKeyPress={(e) => handleKeyPress(e, 'text')}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.password_confirmation 
                ? 'border-red-300 dark:border-red-500' 
                : isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-white' 
                  : 'border-gray-300 bg-white text-gray-900'
            }`}
            placeholder="********"
            dir="ltr"
          />
          {errors.password_confirmation && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password_confirmation}</p>
          )}
        </div>
        
        {/* User Type Field */}
        <div>
          <label htmlFor="type" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>
            {labels.accountType}
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.type 
                ? 'border-red-300 dark:border-red-500' 
                : isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-white' 
                  : 'border-gray-300 bg-white text-gray-900'
            }`}
          >
            <option value="student">{labels.student}</option>
            <option value="instructor">{labels.instructor}</option>
            <option value="moderator">{labels.moderator}</option>
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.type}</p>
          )}
        </div>
        
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {labels.registering}
              </div>
            ) : (
              labels.createAccount
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;