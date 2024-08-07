import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { resources } from "app/locales";

const selectedLng = window.localStorage.getItem("i18nextLng") || "en";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: selectedLng,
    fallbackLng: selectedLng,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
