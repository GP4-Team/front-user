import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: require("./messages/en.json") },
      ar: { translation: require("./messages/ar.json") },
    },
    fallbackLng: "en", 
    interpolation: { escapeValue: false },
  });

export default i18n;
