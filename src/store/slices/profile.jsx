import { createSlice } from "@reduxjs/toolkit";
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: true,
  },
  reducers: {
    changprofile: function (state, action) {
      state.profile = action.payload;
    },
  },
});

// console.log(profileSlice.actions);
export const { changprofile } = profileSlice.actions;

export default profileSlice.reducer;
