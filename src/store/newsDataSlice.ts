import { Article } from "./../types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Article[] = [];

const newsDataSlice = createSlice({
  name: "newsData",
  initialState,
  reducers: {
    setNewsData(state, action: PayloadAction<Article[]>) {
      return action.payload;
    },
  },
});

export const { setNewsData } = newsDataSlice.actions;
export default newsDataSlice.reducer;
