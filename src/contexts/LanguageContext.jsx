// src/contexts/LanguageContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

// إنشاء سياق اللغة
const LanguageContext = createContext();

// إنشاء مزود السياق
export const LanguageProvider = ({ children }) => {
  // استخدام التخزين المحلي لحفظ تفضيل اللغة
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'ar'; // الافتراضي هو العربية
  });

  // تطبيق اتجاه RTL للعربية عند تغيير اللغة
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // تخزين اللغة المحددة
    localStorage.setItem('language', language);
    
    // تطبيق الخط المناسب للغة
    if (language === 'ar') {
      document.documentElement.classList.add('font-tajawal');
      document.documentElement.classList.remove('font-poppins');
    } else {
      document.documentElement.classList.add('font-poppins');
      document.documentElement.classList.remove('font-tajawal');
    }
  }, [language]);

  // تبديل بين العربية والإنجليزية
  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  // التحقق من أن اتجاه النص هو RTL
  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook مخصص لاستخدام سياق اللغة
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
