import { configureStore } from "@reduxjs/toolkit";
import isLog from "./slices/login";

const store = configureStore({
  reducer: {
    isLog: isLog,
  },
});
export default store;
