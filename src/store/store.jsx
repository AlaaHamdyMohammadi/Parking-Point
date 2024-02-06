import { configureStore } from "@reduxjs/toolkit";
import isLog from "./slices/login";
import EditProfile from "./slices/profileEdit";
import profile from "./slices/profile";

const store = configureStore({
  reducer: {
    isLog: isLog,
    EditProfile: EditProfile,
    profile: profile,
  },
});
export default store;
