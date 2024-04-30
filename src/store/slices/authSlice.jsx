import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "loggedIn",
  initialState: {
    loggedIn: localStorage.getItem("loggedIn")||false,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("loggedIn", state.language);
    },
    loggedInState: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
      localStorage.removeItem("loggedIn")
      state.token = null;
    },
  },
});
export const { login, logout, token, user, loggedInState } = loginSlice.actions;

export default loginSlice.reducer;
