import translations from '../locales/translations.json';

let currentLanguage = localStorage.getItem('language') || 'en';

// Initialize the translations
let currentTranslations = translations[currentLanguage] || translations.en;

// Listen for language changes
window.addEventListener('languageChange', () => {
  currentLanguage = localStorage.getItem('language') || 'en';
  currentTranslations = translations[currentLanguage] || translations.en;
});

export const t = (key) => {
  try {
    const keys = key.split('.');
    return keys.reduce((obj, k) => obj?.[k], currentTranslations) || key;
  } catch {
    return key; // Return the key if translation is not found
  }
};

export const getCurrentLanguage = () => currentLanguage;

export const isRTL = () => currentLanguage === 'ar';

export default {
  t,
  getCurrentLanguage,
  isRTL
};