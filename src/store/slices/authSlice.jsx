import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "loggedIn",
  initialState: {
    loggedIn: false,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    loggedInState: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.token = null;
    },
  },
});
export const { login, logout, token, user, loggedInState } = loginSlice.actions;

export default loginSlice.reducer;
