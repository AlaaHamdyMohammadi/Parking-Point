import { createSlice } from "@reduxjs/toolkit";
const EditProfileSlice = createSlice({
  name: "EditProfile",

  initialState: {
    EditProfile: false,
  },

  reducers: {
    changEditProfile: function (state, action) {
      state.EditProfile = action.payload;
    },
  },
});

// console.log(EditProfileSlice.actions);
export const { changEditProfile } = EditProfileSlice.actions;

export default EditProfileSlice.reducer;
