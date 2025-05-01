// src/components/auth/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Loader } from 'lucide-react';

/**
 * مكون المسار المحمي
 * يحمي المسارات التي تتطلب مصادقة
 */
const ProtectedRoute = ({ 
  requiredRoles = [],
  requiredPermissions = [],
}) => {
  const { isAuthenticated, isLoading, user, hasRole, hasPermission } = useAuth();
  const { showWarning } = useToast();
  const location = useLocation();
  
  // التحقق من الصلاحيات
  const checkAccess = () => {
    // التحقق من الأدوار المطلوبة
    if (requiredRoles.length > 0) {
      const hasRequiredRole = requiredRoles.some(role => hasRole(role));
      if (!hasRequiredRole) {
        showWarning('ليس لديك الصلاحيات اللازمة للوصول إلى هذه الصفحة.', {
          title: 'غير مصرح',
        });
        return false;
      }
    }
    
    // التحقق من الأذونات المطلوبة
    if (requiredPermissions.length > 0) {
      const hasRequiredPermission = requiredPermissions.some(permission => hasPermission(permission));
      if (!hasRequiredPermission) {
        showWarning('ليس لديك الأذونات اللازمة للوصول إلى هذه الصفحة.', {
          title: 'غير مصرح',
        });
        return false;
      }
    }
    
    return true;
  };
  
  // التحقق من الصلاحيات عند تغيير المستخدم أو المسار
  useEffect(() => {
    if (isAuthenticated && user && !isLoading) {
      checkAccess();
    }
  }, [user, location.pathname]);
  
  // إذا كان التحميل قيد التقدم، عرض مؤشر التحميل
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin text-primary-base dark:text-primary-light" />
      </div>
    );
  }
  
  // للتطوير فقط: تجاوز التحقق من المصادقة
  // أزل هذه التعليقات وفعّل الكود الأصلي عند الانتهاء من التطوير
  /*
  if (!isAuthenticated) {
    // حفظ المسار الحالي للعودة إليه بعد تسجيل الدخول
    const returnTo = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/auth?returnTo=${returnTo}`} replace />;
  }
  */
  
  // للتطوير فقط: السماح بالوصول حتى بدون مصادقة
  if (!isAuthenticated) {
    console.log('وضع التطوير: السماح بالوصول بدون مصادقة');
  }
  
  // إذا كان المستخدم لا يملك الصلاحيات المطلوبة
  if (!checkAccess()) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // إذا كان المستخدم مصادق ويملك الصلاحيات المطلوبة، عرض المحتوى المحمي
  return <Outlet />;
};

export default ProtectedRoute;
