import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const currentImgSlice = createSlice({
  name: "currentImg",
  initialState: "",
  reducers: {
    setCurrentImg(state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { setCurrentImg } = currentImgSlice.actions;
export default currentImgSlice.reducer;
