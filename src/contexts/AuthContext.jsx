// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/api/index';

// إنشاء السياق
export const AuthContext = createContext();

/**
 * مزود سياق المصادقة - يدير حالة المستخدم وعمليات المصادقة
 * @param {Object} props - خصائص المكون
 * @returns {JSX.Element} - مكون مزود سياق المصادقة
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // التحقق من حالة المصادقة عند تحميل التطبيق
  useEffect(() => {
    let isMounted = true;
    const initAuth = async () => {
      setIsLoading(true);
      try {
        if (AuthService.isLoggedIn()) {
          // محاولة استعادة المستخدم من التخزين المحلي أولاً
          const storedUser = AuthService.getStoredUser();
          if (storedUser && isMounted) {
            setUser(storedUser);
            setIsAuthenticated(true);
          }

          // ثم تحديث البيانات من الخادم (في الخلفية)
          try {
            const userData = await AuthService.getCurrentUser();
            if (isMounted) {
              setUser(userData);
              setIsAuthenticated(true);
            }
          } catch (error) {
            // إذا فشلت عملية جلب البيانات من الخادم، نقوم بتسجيل الخروج
            console.error('فشل التحقق من المستخدم الحالي:', error);
            if (isMounted) {
              handleLogout('/auth', false); // Add a second parameter to avoid navigation during cleanup
            }
          }
        }
      } catch (error) {
        console.error('خطأ أثناء تهيئة المصادقة:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initAuth();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * تسجيل الدخول
   * @param {string} email - البريد الإلكتروني
   * @param {string} password - كلمة المرور
   * @param {string} redirectPath - مسار إعادة التوجيه بعد تسجيل الدخول
   * @returns {Promise} - Promise مع بيانات المستخدم
   */
  const login = async (email, password, redirectPath = '/dashboard') => {
    try {
      const data = await AuthService.login(email, password);
      setUser(data.user);
      setIsAuthenticated(true);
      
      // توجيه المستخدم إلى الصفحة المطلوبة بعد تسجيل الدخول
      navigate(redirectPath);
      return data;
    } catch (error) {
      console.error('خطأ في تسجيل الدخول:', error);
      throw error;
    }
  };

  /**
   * تسجيل الخروج
   * @param {string} redirectPath - مسار إعادة التوجيه بعد تسجيل الخروج
   * @param {boolean} doNavigate - هل يجب إعادة التوجيه
   */
  const handleLogout = (redirectPath = '/auth', doNavigate = true) => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
    
    // توجيه المستخدم إلى صفحة تسجيل الدخول إذا كان مسموحًا
    if (doNavigate) {
      navigate(redirectPath);
    }
  };

  /**
   * التسجيل
   * @param {Object} userData - بيانات المستخدم
   * @param {boolean} loginAfterRegister - هل تسجيل الدخول بعد التسجيل؟
   * @param {string} redirectPath - مسار إعادة التوجيه بعد التسجيل
   * @returns {Promise} - Promise مع بيانات المستخدم المسجل
   */
  const register = async (userData, loginAfterRegister = true, redirectPath = '/dashboard') => {
    try {
      const data = await AuthService.register(userData);
      
      // تسجيل الدخول تلقائياً بعد التسجيل إذا طُلب ذلك
      if (loginAfterRegister && data.email) {
        await login(data.email, userData.password, redirectPath);
      }
      
      return data;
    } catch (error) {
      console.error('خطأ في التسجيل:', error);
      throw error;
    }
  };

  /**
   * تحديث بيانات المستخدم
   * @param {Object} userData - بيانات المستخدم المحدثة
   * @returns {Promise} - Promise مع بيانات المستخدم المحدثة
   */
  const updateUserData = async (userData) => {
    try {
      const updatedUser = await AuthService.updateProfile(userData);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('خطأ في تحديث بيانات المستخدم:', error);
      throw error;
    }
  };

  /**
   * تغيير كلمة المرور
   * @param {string} currentPassword - كلمة المرور الحالية
   * @param {string} newPassword - كلمة المرور الجديدة
   * @returns {Promise} - Promise مع رسالة نجاح
   */
  const changePassword = async (currentPassword, newPassword) => {
    try {
      return await AuthService.changePassword(currentPassword, newPassword);
    } catch (error) {
      console.error('خطأ في تغيير كلمة المرور:', error);
      throw error;
    }
  };

  /**
   * التحقق مما إذا كان المستخدم يمتلك دوراً معيناً
   * @param {string} role - الدور المطلوب التحقق منه
   * @returns {boolean} - هل يمتلك المستخدم هذا الدور؟
   */
  const hasRole = (role) => {
    if (!user || !user.roles) return false;
    return user.roles.includes(role);
  };

  /**
   * التحقق مما إذا كان المستخدم يمتلك إذناً معيناً
   * @param {string} permission - الإذن المطلوب التحقق منه
   * @returns {boolean} - هل يمتلك المستخدم هذا الإذن؟
   */
  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  // توفير القيم للسياق
  const contextValue = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    login,
    logout: handleLogout,
    register,
    updateUserData,
    changePassword,
    hasRole,
    hasPermission
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// هوك مخصص لاستخدام سياق المصادقة
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth يجب استخدامه داخل AuthProvider');
  }
  return context;
};

export default AuthProvider;