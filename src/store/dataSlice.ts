import { Article } from "./../types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Article[] = [];

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<Article[]>) {
      return action.payload;
    },
  },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;
