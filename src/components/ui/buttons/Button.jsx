// src/components/ui/buttons/Button.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

/**
 * مكون زر قابل للتخصيص
 * يدعم أنماط مختلفة من الأزرار: أساسي, ثانوي, نجاح, تحذير, خطر, رابط
 * ويدعم الحالات المختلفة: تحميل, تعطيل
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  rounded = 'md',
  type = 'button',
  href,
  to,
  onClick,
  className = '',
  leftIcon,
  rightIcon,
  ...props
}) => {
  // تحديد الفئات استنادًا إلى المتغيرات
  const baseClasses = 'flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // فئات الحجم
  const sizeClasses = {
    sm: 'py-1.5 px-3 text-xs',
    md: 'py-2 px-4 text-sm',
    lg: 'py-2.5 px-5 text-base',
    xl: 'py-3 px-6 text-lg',
  };
  
  // فئات النوع/النمط
  const variantClasses = {
    primary: 'bg-[#3949AB] hover:bg-[#303F9F] text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white focus:ring-gray-400',
    success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-400',
    warning: 'bg-[#FFC107] hover:bg-[#FFA000] text-gray-900 focus:ring-yellow-400',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400',
    link: 'bg-transparent hover:bg-gray-100 text-[#3949AB] dark:hover:bg-gray-800 focus:ring-blue-400',
    outline: 'bg-transparent border border-[#3949AB] text-[#3949AB] hover:bg-[#3949AB]/10 focus:ring-blue-400',
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
    roundedClasses[rounded] || roundedClasses.md,
    fullWidth ? 'w-full' : '',
    disabled || loading ? stateClasses.disabled : '',
    loading ? stateClasses.loading : '',
    className,
  ].join(' ');
  
  // تحديد المحتوى الداخلي
  const content = (
    <>
      {loading && (
        <Loader2 size={16} className="mr-2 animate-spin" />
      )}
      {leftIcon && !loading && (
        <span className="mr-2">{leftIcon}</span>
      )}
      <span>{children}</span>
      {rightIcon && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </>
  );
  
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
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;