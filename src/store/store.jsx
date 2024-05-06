
import { configureStore } from "@reduxjs/toolkit";
import spinnerReducer from "./slices/spinner";
import languageReducer from "./slices/language";
import isLog from "./slices/login";
import loggedIn from "./slices/authSlice";

const store = configureStore({
  reducer: {
    isLog: isLog,
    loggedIn: loggedIn,
    spinner: spinnerReducer,
    language: languageReducer,
  },
});

export default store;
