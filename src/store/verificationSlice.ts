import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Verification, userCheck } from "../types/types";

const initialState: Verification = {
  signUpCheck: false,
  userCheck: "default",
};

export const verificationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    setSignUpCheck(state, action: PayloadAction<boolean>) {
      state.signUpCheck = action.payload;
    },
    setUserCheck(state, action: PayloadAction<userCheck>) {
      state.userCheck = action.payload;
    },
  },
});

export const { setSignUpCheck, setUserCheck } = verificationSlice.actions;
export default verificationSlice.reducer;
