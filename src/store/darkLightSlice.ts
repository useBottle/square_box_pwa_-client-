import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const darkLightSlice = createSlice({
  name: "darkLight",
  initialState: "dark",
  reducers: {
    setDarkLight(state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { setDarkLight } = darkLightSlice.actions;
export default darkLightSlice.reducer;
