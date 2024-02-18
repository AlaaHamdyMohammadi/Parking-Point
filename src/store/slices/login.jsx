import { createSlice } from "@reduxjs/toolkit";
const isLogSlice=createSlice({
    name: 'isLog',
    initialState :{
        isLog:false,
      },
      reducers:{
        changLog:function(state,action){
        state.isLog=action.payload
          }
      }
    })
export const{changLog}=isLogSlice.actions
  export default isLogSlice.reducer;