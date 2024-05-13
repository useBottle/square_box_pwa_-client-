import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Article } from "../types/types";

const initialState: Article = {
  title: "",
  description: "",
  pubDate: "",
  originallink: "",
  imageUrls: [],
  articleText: "",
};

const currentNewsSlice = createSlice({
  name: "currentNews",
  initialState,
  reducers: {
    setCurrentNews(state, action: PayloadAction<Article>) {
      return action.payload;
    },
  },
});

export const { setCurrentNews } = currentNewsSlice.actions;
export default currentNewsSlice.reducer;
