// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import TRANSLATIONS_EN from "./en/en.json";
import TRANSLATIONS_TA from "./ta/ta.json";
import TRANSLATIONS_AR from "./ar/ar.json";
import TRANSLATIONS_HE from "./he/he.json";

const resources = {
  en: {
    translation: TRANSLATIONS_EN,
  },
  ta: {
    translation: TRANSLATIONS_TA,
  },
  ar: {
    translation: TRANSLATIONS_AR,
  },
  he: {
    translation: TRANSLATIONS_HE,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language if translation is missing
  interpolation: {
    escapeValue: false, // React already safely escapes string interpolation
  },
});

// i18n.changeLanguage("en");

export default i18n;
