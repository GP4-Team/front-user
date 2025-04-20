// src/components/ui/cards/CourseCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Clock } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTheme } from '../../../contexts/ThemeContext';
import Button from '../buttons/Button';

/**
 * مكون لعرض بطاقة دورة تعليمية
 * يستخدم لعرض معلومات الدورة في شبكة الدورات
 */
const CourseCard = ({
  course,
  showEnrollButton = true,
  showProgress = false,
  onEnroll,
  className = '',
}) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  
  // استخراج بيانات الدورة
  const {
    id,
    title,
    category,
    instructor,
    rating,
    students,
    image,
    price,
    badge,
    badgeColor,
    progress = 0,
    level,
  } = course;
  
  // الحصول على النص بلغة المستخدم
  const getText = (textObj) => {
    if (!textObj || typeof textObj !== 'object') {
      return textObj || '';
    }
    
    return textObj[language] || textObj.en || '';
  };
  
  // الحصول على أيقونة المادة
  const getSubjectIcon = () => {
    const categoryText = getText(category).toLowerCase();
    
    if (categoryText.includes('physics') || categoryText.includes('فيزياء')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      );
    } else if (categoryText.includes('chemistry') || categoryText.includes('كيمياء')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path d="M9 3h6m-3-1v2M9.5 8h5c.28 0 .5.22.5.5v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2c0-.28.22-.5.5-.5zM8 8H7c-1.1 0-2 .9-2 2v9a3 3 0 003 3h8a3 3 0 003-3v-9c0-1.1-.9-2-2-2h-1" />
        </svg>
      );
    } else if (categoryText.includes('math') || categoryText.includes('رياضيات')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path d="M19 5H5v14h14V5z" />
          <path d="M5 12h14M12 5v14" />
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 01-2.5-2.5z" />
          <path d="M12 6v4M9 8h6" />
        </svg>
      );
    }
  };
  
  // مؤشر تقدم الدورة (إذا كان المستخدم مسجلًا)
  const ProgressBar = () => {
    if (!showProgress) return null;
    
    return (
      <div className="mt-4">
        <div className="flex justify-between text-xs mb-1">
          <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {progress}% {language === 'ar' ? 'مكتمل' : 'Completed'}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-[#FFC107] h-2 rounded-full" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
    );
  };
  
  // زر التسجيل أو مواصلة التعلم
  const ActionButton = () => {
    if (!showEnrollButton) return null;
    
    if (showProgress) {
      return (
        <Button 
          variant="primary" 
          fullWidth 
          onClick={() => window.location.href = `/courses/${id}`}
          className="mt-4"
        >
          {language === 'ar' ? 'استكمال التعلم' : 'Continue Learning'}
        </Button>
      );
    }
    
    const buttonText = price && price.amount > 0
      ? `${language === 'ar' ? 'سجل الآن - ' : 'Enroll Now - '}${price.amount} ${price.currency}`
      : (language === 'ar' ? 'سجل مجانًا' : 'Enroll for Free');
    
    return (
      <Button 
        variant={price && price.amount > 0 ? 'primary' : 'warning'} 
        fullWidth 
        onClick={onEnroll}
        className="mt-4"
      >
        {buttonText}
      </Button>
    );
  };
  
  // تعيين الفئات الرئيسية
  const cardClasses = [
    'rounded-xl overflow-hidden shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg',
    isDarkMode ? 'bg-[#2D2D2D]' : 'bg-white',
    className
  ].join(' ');
  
  return (
    <div className={cardClasses}>
      {/* صورة الدورة والشارات */}
      <div className="relative">
        <img 
          src={image} 
          alt={getText(title)} 
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {/* شارة الدورة (إذا وجدت) */}
        {badge && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium" style={{ 
            backgroundColor: badgeColor || '#3949AB',
            color: 'white' 
          }}>
            {getText(badge)}
          </div>
        )}
        
        {/* تقييم الدورة */}
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  className={i < Math.floor(rating) ? 'text-[#FFC107]' : 'text-gray-300'} 
                  fill={i < Math.floor(rating) ? '#FFC107' : 'none'} 
                />
              ))}
            </div>
            <span className="text-white text-xs ml-1">{rating}</span>
          </div>
        </div>
      </div>
      
      {/* محتوى الدورة */}
      <div className="p-4">
        {/* فئة/تصنيف الدورة */}
        <div className="flex items-center mb-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
            {getSubjectIcon()}
          </div>
          <span className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-[#3949AB]'} ml-2`}>
            {getText(category)}
          </span>
        </div>
        
        {/* عنوان الدورة */}
        <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
          <Link to={`/courses/${id}`}>
            {getText(title)}
          </Link>
        </h3>
        
        {/* مستوى الدورة */}
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {getText(level)}
        </p>
        
        {/* معلومات إضافية */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <Users size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ml-1`}>
              {students?.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center">
            <Clock size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ml-1`}>
              {getText(course.duration) || '12h 30m'}
            </span>
          </div>
          
          {/* سعر الدورة */}
          <div>
            {price && price.amount > 0 ? (
              <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#37474F]'}`}>
                {price.amount} {price.currency}
              </span>
            ) : (
              <span className="text-xs font-medium text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                {language === 'ar' ? 'مجاني' : 'Free'}
              </span>
            )}
          </div>
        </div>
        
        {/* شريط التقدم (إذا كان المستخدم مسجلًا في الدورة) */}
        <ProgressBar />
        
        {/* زر الإجراء */}
        <ActionButton />
      </div>
    </div>
  );
};

export default CourseCard;