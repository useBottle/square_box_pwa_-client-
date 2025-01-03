import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BookMark, markedNews, markedYoutube } from "../types/types";

const initialState: BookMark = {
  selector: "news",
  markedNews: [],
  markedYoutube: [],
  mouseOnNews: {
    category: "",
    username: "",
    title: "",
    pubDate: "",
    originallink: "",
    imageUrl: "",
    articleText: "",
    _id: "",
  },
  mouseOnYoutube: {
    category: "",
    username: "",
    videoId: "",
    thumbnail: "",
    title: "",
    channelTitle: "",
    description: "",
    _id: "",
  },
  newsId: "",
  youtubeId: "",
  bookMarkDataExistence: false,
};

export const bookMarkSlice = createSlice({
  name: "bookMark",
  initialState,
  reducers: {
    setSelector(state, action: PayloadAction<string>) {
      state.selector = action.payload;
    },
    setMarkedNews(state, action: PayloadAction<markedNews[]>) {
      state.markedNews = action.payload;
    },
    setMarkedYoutube(state, action: PayloadAction<markedYoutube[]>) {
      state.markedYoutube = action.payload;
    },
    setMouseOnNews(state, action: PayloadAction<markedNews>) {
      state.mouseOnNews = action.payload;
    },
    setMouseOnYoutube(state, action: PayloadAction<markedYoutube>) {
      state.mouseOnYoutube = action.payload;
    },
    setNewsId(state, action: PayloadAction<string>) {
      state.newsId = action.payload;
    },
    setYoutubeId(state, action: PayloadAction<string>) {
      state.youtubeId = action.payload;
    },
    setBookMarkDataExistence(state, action: PayloadAction<boolean>) {
      state.bookMarkDataExistence = action.payload;
    },
  },
});

export const {
  setSelector,
  setMarkedNews,
  setMarkedYoutube,
  setMouseOnNews,
  setMouseOnYoutube,
  setNewsId,
  setYoutubeId,
  setBookMarkDataExistence,
} = bookMarkSlice.actions;
export default bookMarkSlice.reducer;
