import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const inputValueSlice = createSlice({
  name: "inputValue",
  initialState: "",
  reducers: {
    setInputValue(state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { setInputValue } = inputValueSlice.actions;
export default inputValueSlice.reducer;
