import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const previewToggleSlice = createSlice({
  name: "previewToggle",
  initialState: true,
  reducers: {
    setPreviewToggle(state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { setPreviewToggle } = previewToggleSlice.actions;
export default previewToggleSlice.reducer;
