// src/services/api/auth.service.js
import apiClient from './client';

/**
 * خدمات المصادقة - تتعامل مع تسجيل الدخول، التسجيل، وإدارة المستخدم
 */
const AuthService = {
  /**
   * تسجيل الدخول بالبريد الإلكتروني وكلمة المرور
   * @param {string} email - البريد الإلكتروني
   * @param {string} password - كلمة المرور
   * @returns {Promise} - Promise مع بيانات المستخدم والتوكن
   */
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw handleAuthError(error, 'تسجيل الدخول');
    }
  },

  /**
   * إنشاء حساب جديد
   * @param {Object} userData - بيانات المستخدم للتسجيل
   * @returns {Promise} - Promise مع بيانات المستخدم المسجل
   */
  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw handleAuthError(error, 'التسجيل');
    }
  },

  /**
   * تسجيل الخروج - مسح بيانات الجلسة
   */
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    // اختياري: إخطار الخادم بتسجيل الخروج
    apiClient.post('/auth/logout').catch(console.error);
  },

  /**
   * الحصول على بيانات المستخدم الحالي
   * @returns {Promise} - Promise مع بيانات المستخدم الكاملة
   */
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      // تحديث بيانات المستخدم المخزنة محليا
      localStorage.setItem('userData', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw handleAuthError(error, 'جلب بيانات المستخدم');
    }
  },

  /**
   * تحديث الملف الشخصي للمستخدم
   * @param {Object} userData - بيانات المستخدم المحدثة
   * @returns {Promise} - Promise مع بيانات المستخدم المحدثة
   */
  updateProfile: async (userData) => {
    try {
      const response = await apiClient.put('/auth/profile', userData);
      // تحديث بيانات المستخدم المخزنة محليا
      localStorage.setItem('userData', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw handleAuthError(error, 'تحديث الملف الشخصي');
    }
  },

  /**
   * تغيير كلمة المرور
   * @param {string} currentPassword - كلمة المرور الحالية
   * @param {string} newPassword - كلمة المرور الجديدة
   * @returns {Promise} - Promise مع رسالة نجاح
   */
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await apiClient.post('/auth/change-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw handleAuthError(error, 'تغيير كلمة المرور');
    }
  },

  /**
   * التحقق مما إذا كان المستخدم مسجل الدخول
   * @returns {boolean} - حالة تسجيل الدخول
   */
  isLoggedIn: () => {
    return !!localStorage.getItem('authToken');
  },

  /**
   * الحصول على بيانات المستخدم المخزنة محليا
   * @returns {Object|null} - بيانات المستخدم أو null
   */
  getStoredUser: () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  },
};

/**
 * معالجة أخطاء المصادقة وتنسيقها
 * @param {Error} error - خطأ الاستجابة
 * @param {string} operation - نوع العملية التي فشلت
 * @returns {Error} - خطأ منسق
 */
const handleAuthError = (error, operation) => {
  const errorMessage = error.response?.data?.message || `حدث خطأ أثناء ${operation}`;
  const errorCode = error.response?.status || 'UNKNOWN';
  
  const formattedError = new Error(errorMessage);
  formattedError.code = errorCode;
  
  return formattedError;
};

export default AuthService;