// src/components/ui/forms/TextField.jsx
import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * مكون حقل النص
 * يدعم الحالات المختلفة: أساسي، معطل، خطأ، التركيز، تسمية، نص توضيحي، إلخ
 */
const TextField = forwardRef(({
  id,
  name,
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  fullWidth = true,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  inputClassName = '',
  dir,
  ...props
}, ref) => {
  // تحديد الاتجاه الافتراضي إذا لم يتم توفيره
  const direction = dir || 'inherit';

  // تحديد فئات الحاوية الرئيسية
  const containerClasses = [
    'flex flex-col',
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ');

  // تحديد فئات حاوية الإدخال
  const inputContainerClasses = [
    'relative flex items-center',
    fullWidth ? 'w-full' : '',
  ].join(' ');

  // تحديد فئات الإدخال
  const baseInputClasses = [
    'border rounded-lg px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2',
    'dark:bg-gray-800 dark:text-white',
    fullWidth ? 'w-full' : '',
    leftIcon ? 'pl-10' : '',
    rightIcon ? 'pr-10' : '',
    inputClassName,
  ];
  
  // إضافة فئات الحالة
  if (disabled) {
    baseInputClasses.push('bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-900');
  } else if (error) {
    baseInputClasses.push('border-red-500 focus:border-red-500 focus:ring-red-300');
  } else {
    baseInputClasses.push('border-gray-300 focus:border-[#3949AB] focus:ring-blue-100 dark:border-gray-600');
  }
  
  // تجميع كل الفئات النهائية
  const inputClasses = baseInputClasses.join(' ');

  return (
    <div className={containerClasses}>
      {/* تسمية الحقل */}
      {label && (
        <label
          htmlFor={id || name}
          className="mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}
      
      {/* حاوية الإدخال (تسمح بوضع الأيقونات) */}
      <div className={inputContainerClasses}>
        {/* أيقونة يسار (إذا وجدت) */}
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
            {leftIcon}
          </div>
        )}
        
        {/* حقل الإدخال */}
        <input
          ref={ref}
          id={id || name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={inputClasses}
          dir={direction}
          {...props}
        />
        
        {/* أيقونة يمين (إذا وجدت) */}
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 dark:text-gray-400">
            {rightIcon}
          </div>
        )}
        
        {/* أيقونة الخطأ (إذا وجد خطأ) */}
        {error && !rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-red-500">
            <AlertCircle size={16} />
          </div>
        )}
      </div>
      
      {/* رسالة المساعدة أو الخطأ */}
      {(helperText || error) && (
        <p className={`mt-1 text-xs ${error ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

TextField.displayName = 'TextField';

export default TextField;