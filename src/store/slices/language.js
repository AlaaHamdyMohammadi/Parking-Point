import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
     language: localStorage.getItem("language") || 'ar'
     },
  reducers: {
    changeLanguage: function (state, action) {
      state.language = action.payload;
      localStorage.setItem("language", state.language);
    },
  },
});

export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;
