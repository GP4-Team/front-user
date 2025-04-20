// src/components/ui/buttons/IconButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

/**
 * مكون زر أيقونة
 * زر دائري/مربع يحتوي على أيقونة فقط
 */
const IconButton = ({
  icon,
  variant = 'primary',
  size = 'md',
  rounded = 'full',
  disabled = false,
  loading = false,
  to,
  href,
  onClick,
  className = '',
  ...props
}) => {
  // تحديد الفئات استنادًا إلى المتغيرات
  const baseClasses = 'flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // فئات الحجم
  const sizeClasses = {
    xs: 'p-1 text-xs',
    sm: 'p-1.5 text-sm',
    md: 'p-2 text-base',
    lg: 'p-2.5 text-lg',
    xl: 'p-3 text-xl',
  };
  
  // فئات النوع/النمط
  const variantClasses = {
    primary: 'bg-[#3949AB] hover:bg-[#303F9F] text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white focus:ring-gray-400',
    success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-400',
    warning: 'bg-[#FFC107] hover:bg-[#FFA000] text-gray-900 focus:ring-yellow-400',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400',
    light: 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 focus:ring-gray-400',
    dark: 'bg-gray-800 hover:bg-gray-900 text-white focus:ring-gray-500',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-800 dark:hover:bg-gray-800 dark:text-white focus:ring-gray-400',
  };
  
  // فئات الاستدارة
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };
  
  // الفئات المعطلة والتحميل
  const stateClasses = {
    disabled: 'opacity-60 cursor-not-allowed',
    loading: 'relative',
  };
  
  // تجميع الفئات النهائية
  const buttonClasses = [
    baseClasses,
    sizeClasses[size] || sizeClasses.md,
    variantClasses[variant] || variantClasses.primary,
    roundedClasses[rounded] || roundedClasses.full,
    disabled || loading ? stateClasses.disabled : '',
    loading ? stateClasses.loading : '',
    className,
  ].join(' ');
  
  // تحديد المحتوى الداخلي
  const content = loading ? <Loader2 className="animate-spin" /> : icon;
  
  // إذا كان هناك مسار للزر، نستخدم Link
  if (to) {
    return (
      <Link
        to={to}
        className={buttonClasses}
        {...props}
      >
        {content}
      </Link>
    );
  }
  
  // إذا كان هناك ارتباط خارجي، نستخدم علامة الارتباط
  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </a>
    );
  }
  
  // زر افتراضي
  return (
    <button
      type="button"
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
};

export default IconButton;