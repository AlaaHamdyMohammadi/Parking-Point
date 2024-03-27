/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const spinnerSlice = createSlice({
    name: 'spinner',
    initialState: {spinner: false},
    reducers: {
        changeSpinner: function(state, action){
            state.spinner = action.payload
        }
    }
})

export const {changeSpinner} = spinnerSlice.actions;
export default spinnerSlice.reducer;