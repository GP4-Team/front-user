// src/contexts/LanguageContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a context for language
const LanguageContext = createContext();

// Create a provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar'); // Default to Arabic

  // Apply RTL direction for Arabic whenever language changes
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Toggle between Arabic and English
  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  // Check if the document is in RTL mode
  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;