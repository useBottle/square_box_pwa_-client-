import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const iconIndexSlice = createSlice({
  name: "iconIndex",
  initialState: -1,
  reducers: {
    setIconIndex(state, action: PayloadAction<number>) {
      return action.payload;
    },
  },
});

export const { setIconIndex } = iconIndexSlice.actions;
export default iconIndexSlice.reducer;
