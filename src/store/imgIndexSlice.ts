import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const imgIndexSlice = createSlice({
  name: "currentImg",
  initialState: 0,
  reducers: {
    setImgIndex(state, action: PayloadAction<number>) {
      return action.payload;
    },
  },
});

export const { setImgIndex } = imgIndexSlice.actions;
export default imgIndexSlice.reducer;
