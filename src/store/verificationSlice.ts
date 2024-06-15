import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const verificationSlice = createSlice({
  name: "verification",
  initialState: false,
  reducers: {
    setSignUpCheck(state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { setSignUpCheck } = verificationSlice.actions;
export default verificationSlice.reducer;
