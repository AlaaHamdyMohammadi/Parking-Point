import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'loggedIn',
    initialState: {
        loggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
        user: JSON.parse(localStorage.getItem("user")) || null,
    },
    reducers: {
        login: (state, action) => {
            state.loggedIn =localStorage.setItem("isLoggedIn", true) ;
            state.loggedIn=true
            state.user= localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.loggedIn = false;
            state.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('isLoggedIn')
        },
    },
});
export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
