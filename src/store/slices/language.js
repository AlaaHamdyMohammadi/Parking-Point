import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: { language: 'ar' },
  reducers: {
    changeLanguages: function (state, action) {
      state.language = action.payload;
    },
  },
});

export const { changeLanguages } = languageSlice.actions;

export default languageSlice.reducer;
