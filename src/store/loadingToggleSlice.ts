import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const loadingToggleSlice = createSlice({
  name: "loadingToggle",
  initialState: false,
  reducers: {
    setLoadingToggle(state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { setLoadingToggle } = loadingToggleSlice.actions;
export default loadingToggleSlice.reducer;
