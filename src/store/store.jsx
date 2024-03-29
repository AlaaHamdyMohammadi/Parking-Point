// store.js

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import spinnerReducer from "./slices/spinner";
import isLog from "./slices/login";
import loggedIn from "./slices/authSlice";
import logInUser from "./slices/logInUser";

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    isLog,
    loggedIn,
    logInUser,
    spinner: spinnerReducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  
});

export const persistor = persistStore(store);

export default store;
