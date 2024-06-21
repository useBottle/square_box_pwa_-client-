import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Verification } from "../types/types";

const initialState: Verification = {
  signUpCheck: false,
  userCheck: false,
  username: "",
};

export const verificationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    setSignUpCheck(state, action: PayloadAction<boolean>) {
      state.signUpCheck = action.payload;
    },
    setUserCheck(state, action: PayloadAction<boolean>) {
      state.userCheck = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
});

export const { setSignUpCheck, setUserCheck, setUsername } = verificationSlice.actions;
export default verificationSlice.reducer;
