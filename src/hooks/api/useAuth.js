// src/hooks/api/useAuth.js
import { useState, useEffect, useCallback, useContext } from 'react';
import { AuthService } from '../../services/api/index';
import { AuthContext } from '../../contexts/AuthContext';

/**
 * هوك مخصص لإدارة عمليات المصادقة
 * يوفر وظائف تسجيل الدخول، التسجيل، وإدارة حالة المستخدم
 */
export const useAuth = () => {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * تسجيل الدخول
   * @param {string} email - البريد الإلكتروني
   * @param {string} password - كلمة المرور
   * @returns {Promise} - Promise مع بيانات المستخدم
   */
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await AuthService.login(email, password);
      setUser(data.user);
      setIsAuthenticated(true);
      return data;
    } catch (err) {
      setError(err.message || 'فشل تسجيل الدخول');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setUser, setIsAuthenticated]);

  /**
   * إنشاء حساب جديد
   * @param {Object} userData - بيانات المستخدم
   * @returns {Promise} - Promise مع بيانات المستخدم المسجل
   */
  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      return await AuthService.register(userData);
    } catch (err) {
      setError(err.message || 'فشل التسجيل');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * تسجيل الخروج
   */
  const logout = useCallback(() => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  }, [setUser, setIsAuthenticated]);

  /**
   * جلب بيانات المستخدم الحالي
   * @returns {Promise} - Promise مع بيانات المستخدم
   */
  const fetchCurrentUser = useCallback(async () => {
    if (!AuthService.isLoggedIn()) {
      setUser(null);
      setIsAuthenticated(false);
      return null;
    }
    
    setLoading(true);
    try {
      const userData = await AuthService.getCurrentUser();
      setUser(userData);
      setIsAuthenticated(true);
      return userData;
    } catch (err) {
      // إذا فشل جلب بيانات المستخدم، نعتبر أن المستخدم غير مسجل
      setUser(null);
      setIsAuthenticated(false);
      // لا نريد إظهار الخطأ هنا لأنه يمكن أن يكون ببساطة انتهاء صلاحية التوكن
      return null;
    } finally {
      setLoading(false);
    }
  }, [setUser, setIsAuthenticated]);

  /**
   * تحديث الملف الشخصي
   * @param {Object} userData - بيانات المستخدم المحدثة
   * @returns {Promise} - Promise مع بيانات المستخدم المحدثة
   */
  const updateProfile = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedUser = await AuthService.updateProfile(userData);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err.message || 'فشل تحديث الملف الشخصي');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  /**
   * تغيير كلمة المرور
   * @param {string} currentPassword - كلمة المرور الحالية
   * @param {string} newPassword - كلمة المرور الجديدة
   * @returns {Promise} - Promise مع رسالة نجاح
   */
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);
    
    try {
      return await AuthService.changePassword(currentPassword, newPassword);
    } catch (err) {
      setError(err.message || 'فشل تغيير كلمة المرور');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // التحقق من حالة تسجيل الدخول عند تحميل المكون
  useEffect(() => {
    const checkAuthStatus = async () => {
      // إذا كان المستخدم مسجل بالفعل في السياق، لا داعي للتحقق مرة أخرى
      if (isAuthenticated && user) return;
      
      // التحقق من وجود توكن محلي
      if (AuthService.isLoggedIn()) {
        const storedUser = AuthService.getStoredUser();
        if (storedUser) {
          // تعيين المستخدم من التخزين المحلي مؤقتًا
          setUser(storedUser);
          setIsAuthenticated(true);
          
          // جلب البيانات المحدثة من الخادم (في الخلفية)
          fetchCurrentUser().catch(console.error);
        } else {
          // لا توجد بيانات مستخدم محلية، جلب من الخادم
          fetchCurrentUser().catch(console.error);
        }
      }
    };
    
    checkAuthStatus();
  }, [fetchCurrentUser, isAuthenticated, user, setUser, setIsAuthenticated]);

  // إعادة الدوال والحالات
  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    fetchCurrentUser,
    updateProfile,
    changePassword,
    clearError: () => setError(null)
  };
};

export default useAuth;