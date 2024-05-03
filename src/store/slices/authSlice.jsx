import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "loggedIn",
  initialState: {
    loggedIn: localStorage.getItem("loggedIn")||false,
  },
  reducers: {
    login: (state) => {
      localStorage.setItem("loggedIn", state.language);
    },
    loggedInState: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
      localStorage.removeItem("loggedIn")
    },
  },
});
export const { login, logout, user, loggedInState } = loginSlice.actions;

export default loginSlice.reducer;
