// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axiosInstanceParking from '../../axiosConfig/instanc';
// export const getLogInUser = createAsyncThunk('user', async (token) => {
//   try {
    
//     const response = await axiosInstanceParking.get('/users/me'
//     // , {
//     //   headers: { 'Authorization': `Bearer ${token}` }
//     // }
//   );
//   console.log(response);
//     return response.data.doc;
//   } catch (error) {
//     console.log(error);
//   }
// });
// const userSlice = createSlice({
//   name: 'logInUser',
//   initialState: { logInUser: {} },
//   extraReducers: (builder) => {
//     builder.addCase(getLogInUser.fulfilled, (state, action) => {
//       state.logInUser = action.payload;
//     });
//   },
// });

// export default userSlice.reducer;