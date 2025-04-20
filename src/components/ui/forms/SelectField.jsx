// src/components/ui/forms/SelectField.jsx
import React, { forwardRef } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

/**
 * مكون حقل الاختيار
 * يدعم الحالات المختلفة: أساسي، معطل، خطأ، التركيز، تسمية، إلخ
 */
const SelectField = forwardRef(({
  id,
  name,
  label,
  value,
  onChange,
  options = [],
  error,
  disabled = false,
  required = false,
  fullWidth = true,
  helperText,
  placeholder,
  className = '',
  selectClassName = '',
  dir,
  // الخيار الذي يحدد كيفية عرض نص الخيار
  getOptionLabel = (option) => option.label || option.name || option,
  // الخيار الذي يحدد قيمة الخيار
  getOptionValue = (option) => option.value || option.id || option,
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

  // تحديد فئات حاوية الاختيار
  const selectContainerClasses = [
    'relative flex items-center',
    fullWidth ? 'w-full' : '',
  ].join(' ');

  // تحديد فئات الاختيار
  const baseSelectClasses = [
    'border rounded-lg px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 appearance-none',
    'dark:bg-gray-800 dark:text-white',
    fullWidth ? 'w-full' : '',
    'pr-10', // مساحة للأيقونة على اليمين
    selectClassName,
  ];
  
  // إضافة فئات الحالة
  if (disabled) {
    baseSelectClasses.push('bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-900');
  } else if (error) {
    baseSelectClasses.push('border-red-500 focus:border-red-500 focus:ring-red-300');
  } else {
    baseSelectClasses.push('border-gray-300 focus:border-[#3949AB] focus:ring-blue-100 dark:border-gray-600');
  }
  
  // تجميع كل الفئات النهائية
  const selectClasses = baseSelectClasses.join(' ');

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
      
      {/* حاوية الاختيار (تسمح بوضع الأيقونات) */}
      <div className={selectContainerClasses}>
        {/* حقل الاختيار */}
        <select
          ref={ref}
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={selectClasses}
          dir={direction}
          {...props}
        >
          {/* خيار الملاحظة إذا تم توفيره */}
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          
          {/* الخيارات */}
          {options.map((option, index) => (
            <option key={index} value={getOptionValue(option)}>
              {getOptionLabel(option)}
            </option>
          ))}
        </select>
        
        {/* أيقونة السهم */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-500 dark:text-gray-400">
          <ChevronDown size={16} />
        </div>
        
        {/* أيقونة الخطأ (إذا وجد خطأ) */}
        {error && (
          <div className="absolute inset-y-0 right-6 flex items-center pr-2 pointer-events-none text-red-500">
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

SelectField.displayName = 'SelectField';

export default SelectField;