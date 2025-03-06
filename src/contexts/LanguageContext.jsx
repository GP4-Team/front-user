import { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem('language') || 'en'
  );

  useEffect(() => {
    // Update direction when language changes
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('language', currentLang);
  }, [currentLang]);

  const value = {
    currentLang,
    switchLanguage: (lang) => setCurrentLang(lang)
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;