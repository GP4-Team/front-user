import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/auth';

/**
 * RegisterForm component - Handles user registration with API integration
 */
const RegisterForm = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    type: 'student', // Default to student
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  
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
    
    // Update form data
    setFormData({
      ...formData,
      [name]: filteredValue
    });
    
    // Clear field error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
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
   * Validate form data
   * @returns {boolean} - True if form is valid
   */
  const validateForm = () => {
    const newErrors = {};
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
    } else if (formData.name.trim().length > 255) {
      newErrors.name = 'يجب أن يكون الاسم أقل من 255 حرف';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'يرجى إدخال بريد إلكتروني صالح';
    } else if (formData.email.trim().length > 255) {
      newErrors.email = 'يجب أن يكون البريد الإلكتروني أقل من 255 حرف';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 8) {
      newErrors.password = 'يجب أن تكون كلمة المرور 8 أحرف على الأقل';
    }
    
    // Validate password confirmation
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'كلمات المرور غير متطابقة';
    }
    
    // Validate phone (optional)
    if (formData.phone && formData.phone.trim() !== '') {
      if (!/^[0-9]+$/.test(formData.phone)) {
        newErrors.phone = 'يجب أن يحتوي رقم الهاتف على أرقام فقط';
      } else if (formData.phone.length !== 11) {
        newErrors.phone = 'يجب أن يكون رقم الهاتف 11 رقم بالضبط';
      }
    }
    
    // Validate type
    if (formData.type && !['student', 'instructor', 'moderator'].includes(formData.type)) {
      newErrors.type = 'نوع المستخدم غير صالح';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset messages
    setServerMessage('');
    setFormSubmitted(false);
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Prepare registration data
    const registrationData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      type: formData.type || 'student'
    };
    
    // Add phone if provided
    if (formData.phone) {
      registrationData.phone = formData.phone;
    }
    
    setLoading(true);
    
    try {
      // Call register API
      const response = await registerUser(registrationData);
      
      // Handle successful registration
      setFormSubmitted(true);
      setServerMessage(response.message || 'تم إنشاء الحساب بنجاح!');
      
      // Navigate to next page after successful registration
      setTimeout(() => {
        navigate(response.redirect || '/login');
      }, 2000);
      
    } catch (error) {
      // Handle validation errors from server
      if (error.errors) {
        const serverErrors = {};
        Object.entries(error.errors).forEach(([key, messages]) => {
          serverErrors[key] = Array.isArray(messages) ? messages[0] : messages;
        });
        setErrors(serverErrors);
      } else {
        // Handle general error
        setServerMessage(error.message || 'حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">إنشاء حساب جديد</h2>
          <p className="mt-2 text-sm text-gray-600">
            أو{' '}
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              تسجيل الدخول إذا كان لديك حساب بالفعل
            </a>
          </p>
        </div>
        
        {serverMessage && (
          <div className={`rounded-md p-4 ${formSubmitted ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            <p className="text-sm font-medium text-center">{serverMessage}</p>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Full Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                الاسم الكامل
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                onKeyPress={(e) => handleKeyPress(e, 'text')}
                className={`mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="الاسم الكامل"
                dir="rtl"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                onKeyPress={(e) => handleKeyPress(e, 'text')}
                className={`mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="البريد الإلكتروني"
                dir="rtl"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            {/* Phone */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                رقم الهاتف (اختياري)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                onKeyPress={(e) => handleKeyPress(e, 'phone')}
                maxLength={11}
                className={`mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="رقم الهاتف"
                dir="rtl"
              />
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
            
            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                كلمة المرور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                onKeyPress={(e) => handleKeyPress(e, 'text')}
                className={`mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="كلمة المرور (8 أحرف على الأقل)"
                dir="rtl"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            
            {/* Confirm Password */}
            <div className="mb-4">
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                تأكيد كلمة المرور
              </label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password_confirmation}
                onChange={handleChange}
                onKeyPress={(e) => handleKeyPress(e, 'text')}
                className={`mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  errors.password_confirmation ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="تأكيد كلمة المرور"
                dir="rtl"
              />
              {errors.password_confirmation && (
                <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>
              )}
            </div>
            
            {/* User Type */}
            <div className="mb-4">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                نوع الحساب
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`mt-1 block w-full py-2 px-3 border ${
                  errors.type ? 'border-red-300' : 'border-gray-300'
                } bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                dir="rtl"
              >
                <option value="student">طالب</option>
                <option value="instructor">معلم</option>
                <option value="moderator">مشرف</option>
              </select>
              {errors.type && (
                <p className="mt-2 text-sm text-red-600">{errors.type}</p>
              )}
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="animate-spin h-5 w-5 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                  جاري التسجيل...
                </>
              ) : 'تسجيل حساب جديد'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;