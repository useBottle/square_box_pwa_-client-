import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const currentImgSlice = createSlice({
  name: "currentImg",
  initialState: 0,
  reducers: {
    setCurrentImg(state, action: PayloadAction<number>) {
      return action.payload;
    },
  },
});

export const { setCurrentImg } = currentImgSlice.actions;
export default currentImgSlice.reducer;
