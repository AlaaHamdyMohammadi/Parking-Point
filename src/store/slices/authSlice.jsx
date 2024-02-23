import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'loggedIn',
    initialState: {
        loggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
        user: JSON.parse(localStorage.getItem("user")) || null,
        token: JSON.parse(localStorage.getItem("token")) || null
    },
    reducers: {
        login: (state, action) => {
            state.loggedIn =localStorage.setItem("isLoggedIn", true) ;
            state.loggedIn=true
            state.user= localStorage.setItem("user", JSON.stringify(action.payload));
        },
        token: (state, action) => {
            state.user= localStorage.setItem("token", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.loggedIn = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('isLoggedIn')
            localStorage.removeItem('token')
        },
    },
});
export const { login, logout, token } = loginSlice.actions;

export default loginSlice.reducer;
