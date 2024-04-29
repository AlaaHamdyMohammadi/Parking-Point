/* eslint-disable no-unused-vars */
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import store, { persistor } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import enTranslation from "./../src/components/locales/en/translation.json";
import arTranslation from "./../src/components/locales/ar/translation.json";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "ar", // Default language
  resources: {
    ar: {
      translation: arTranslation,
    },
    en: {
      translation: enTranslation,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </PersistGate>
  </Provider>
);
