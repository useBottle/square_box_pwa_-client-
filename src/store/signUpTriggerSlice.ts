import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const signUpTrigger = createSlice({
  name: "signUpTrigger",
  initialState: false,
  reducers: {
    setSignUpTrigger(state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { setSignUpTrigger } = signUpTrigger.actions;
export default signUpTrigger.reducer;
