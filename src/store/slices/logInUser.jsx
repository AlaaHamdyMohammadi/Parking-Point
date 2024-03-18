import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstanceParking from '../../axiosConfig/instanc';
export const getLogInUser = createAsyncThunk('user', async (token) => {
  const response = await axiosInstanceParking.get('/users/me', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.data.doc;
});
const userSlice = createSlice({
  name: 'logInUser',
  initialState: { logInUser: {} },
  extraReducers: (builder) => {
    builder.addCase(getLogInUser.fulfilled, (state, action) => {
      state.logInUser = action.payload;
    });
  },
});

export default userSlice.reducer;