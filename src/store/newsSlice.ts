import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NewsData, NewsState } from "../types/types";

const initialState: NewsState = {
  currentNewsIndex: 0,
  currentNews: {
    title: "",
    description: "",
    pubDate: "",
    originallink: "",
    imageUrls: [],
    articleText: "",
  },
  previewToggle: true,
};

export const newsSlice = createSlice({
  name: "newsState",
  initialState,
  reducers: {
    setCurrentNewsIndex(state, action: PayloadAction<number>) {
      state.currentNewsIndex = action.payload;
    },
    setCurrentNews(state, action: PayloadAction<NewsData>) {
      state.currentNews = action.payload;
    },
    setPreviewToggle(state, action: PayloadAction<boolean>) {
      state.previewToggle = action.payload;
    },
  },
});

export const { setCurrentNewsIndex, setCurrentNews, setPreviewToggle } = newsSlice.actions;
export default newsSlice.reducer;
