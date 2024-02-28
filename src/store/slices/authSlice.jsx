import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'loggedIn',
    initialState: {
        loggedIn: false,
        token: null
    },
    reducers: {
        login: (state, action) => {
            state.loggedIn=true
            state.token=action.payload
        },
        logout: (state) => {
            state.loggedIn = false;
            state.token = null;
        },
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
    },
  },
});
export const { login, logout, token ,user } = loginSlice.actions;

export default loginSlice.reducer;
