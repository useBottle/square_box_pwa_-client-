import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NewsData } from "../types/types";

const initialState: NewsData = {
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
    setCurrentNews(state, action: PayloadAction<NewsData>) {
      return action.payload;
    },
  },
});

export const { setCurrentNews } = currentNewsSlice.actions;
export default currentNewsSlice.reducer;
