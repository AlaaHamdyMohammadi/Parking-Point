import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "loggedIn",
  initialState: {
    loggedIn: false,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.token = null;
    },
  },
});
export const { login, logout, token, user } = loginSlice.actions;

export default loginSlice.reducer;
