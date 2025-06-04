import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/api/auth.service';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

/**
 * LoginForm component
 * Handles user login with API integration, multi-language, and theme support
 * 
 * @param {Object} props - Component props
 * @param {string} props.returnTo - Path to redirect after successful login
 * @returns {JSX.Element} - Login form component
 */
const LoginForm = ({ returnTo = '/dashboard' }) => {
  const navigate = useNavigate();
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const { setUser, setIsAuthenticated } = useAuth();
  
  // Form state matching exact API requirements
  const [formData, setFormData] = useState({
    login: '',        // API expects 'login'
    password: '',     // API expects 'password'
    remember: false   // API expects 'remember'
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });
  
  /**
   * Handle input changes
   * 
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    
    setLoading(true);
    
    try {
      // Call the login API with exact field names required by API
      const response = await authService.login(
        formData.login,     // API expects 'login'
        formData.password,  // API expects 'password'
        formData.remember   // API expects 'remember'
      );
      
      // Update auth context with user data
      // AuthService returns data directly, not wrapped in response.data
      if (response.data && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else if (response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      }
      
      // Handle success
      setMessage({
        text: response.message || (language === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Login successful!'),
        type: 'success'
      });
      
      // Redirect after short delay
      setTimeout(() => {
        navigate(returnTo);
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle API errors
      if (error.errors) {
        // Format validation errors from backend
        setErrors(error.errors);
      } else {
        // General error message
        setMessage({
          text: error.message || (language === 'ar' ? 'فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك.' : 'Login failed. Please check your credentials.'),
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
    
    // Login validation
    if (!formData.login.trim()) {
      errors.login = language === 'ar' ? 'البريد الإلكتروني أو اسم المستخدم مطلوب' : 'Email or username is required';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = language === 'ar' ? 'كلمة المرور مطلوبة' : 'Password is required';
    }
    
    return errors;
  };
  
  // Labels and text based on selected language
  const labels = {
    emailUsername: language === 'ar' ? 'البريد الإلكتروني أو اسم المستخدم' : 'Email or Username',
    password: language === 'ar' ? 'كلمة المرور' : 'Password',
    rememberMe: language === 'ar' ? 'تذكرني' : 'Remember me',
    forgotPassword: language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?',
    login: language === 'ar' ? 'تسجيل الدخول' : 'Sign In',
    loggingIn: language === 'ar' ? 'جاري تسجيل الدخول...' : 'Signing in...',
    noAccount: language === 'ar' ? 'ليس لديك حساب؟' : 'Don\'t have an account?',
    register: language === 'ar' ? 'إنشاء حساب جديد' : 'Register',
    required: language === 'ar' ? 'مطلوب' : 'required',
  };
  
  return (
    <div className={`p-6 rounded-lg w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {message.text && (
        <div 
          className={`mb-6 p-3 rounded-md ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
              : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
          }`}
        >
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Email/Username Field */}
        <div>
          <label htmlFor="login" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>
            {labels.emailUsername} <span className="text-red-500">*</span>
          </label>
          <input
            id="login"
            name="login"
            type="text"
            required
            value={formData.login}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.login 
                ? 'border-red-300 dark:border-red-500' 
                : isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-white' 
                  : 'border-gray-300 bg-white text-gray-900'
            }`}
            placeholder={language === 'ar' ? 'أدخل البريد الإلكتروني أو اسم المستخدم' : 'Enter email or username'}
          />
          {errors.login && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.login}</p>
          )}
        </div>
        
        {/* Password Field */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              {labels.password} <span className="text-red-500">*</span>
            </label>
            <a 
              href="/auth?mode=forgot-password" 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              {labels.forgotPassword}
            </a>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
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
        </div>
        
        {/* Remember Me Checkbox */}
        <div className="flex items-center">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            checked={formData.remember}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="remember" className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {labels.rememberMe}
          </label>
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
                {labels.loggingIn}
              </div>
            ) : (
              labels.login
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;