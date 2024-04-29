// /* eslint-disable no-unused-vars */
// import React, { useEffect } from "react";
// import i18n from "i18next";
// import { useTranslation, initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
// import HttpApi from "i18next-http-backend";
// import cookies from "js-cookie";

// i18n
//   .use(initReactI18next)
//   .use(LanguageDetector)
//   .use(HttpApi)
//   .init({
//     fallbackLng: "ar",
//     detection: {
//       order: [
//         "navigator",
//         "cookie",
//         "htmlTag",
//         "path",
//         "subdomain",
//         "localStorage",
//         "sessionStorage",
//       ],
//       caches: ["cookie"],
//     },
//     backend: {
//       loadPath: "/locale/{{lng}}/translation.json",
//     },
//   });

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
const availableLanguages = ["en", "ar"];

const option = {
  order: ["navigator", "htmlTag", "path", "subdomail"],
  checkWhitelist: true,
};
i18n
.use(LanguageDetector)
.use(initReactI18next)
  .use(Backend)
  .init({
    fallbackLng: "ar",
    debug: true,
    whitelist: availableLanguages,
    detection: option,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // backend: {
    //   loadPath: "locales/{{lng}}/translation.json",
    // },
  });

export default i18n;
