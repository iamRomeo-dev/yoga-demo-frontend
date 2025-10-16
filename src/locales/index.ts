"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./en.json";
import fr from "./fr.json";

void i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Bind to React
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    fallbackLng: "fr", // default language
    interpolation: { escapeValue: false }, // React already escapes
    detection: {
      order: ["localStorage", "navigator"], // detect from localStorage first
      caches: ["localStorage"],
    },
  });

export default i18n;
