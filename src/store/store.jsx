import { configureStore } from "@reduxjs/toolkit";
import isLog from "./slices/login";
import loggedIn from "./slices/authSlice";
import user from "./slices/authSlice";
import token from "./slices/authSlice";

const store = configureStore({
  reducer: {
    isLog: isLog,
    loggedIn: loggedIn,
    user:user,
    token:token
  },
});
export default store;
