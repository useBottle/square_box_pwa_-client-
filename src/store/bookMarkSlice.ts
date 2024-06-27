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
    channelHandle: "",
    channelThumbnail: "",
    channelTitle: "",
    _id: "",
  },
  newsId: "",
  youtubeId: "",
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
    resetMouseOnNews(state) {
      state.mouseOnNews = {
        category: "",
        username: "",
        title: "",
        pubDate: "",
        originallink: "",
        imageUrl: "",
        articleText: "",
        _id: "",
      };
    },
    resetMouseOnYoutube(state) {
      state.mouseOnYoutube = {
        category: "",
        username: "",
        videoId: "",
        thumbnail: "",
        title: "",
        channelHandle: "",
        channelThumbnail: "",
        channelTitle: "",
        _id: "",
      };
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
  resetMouseOnNews,
  resetMouseOnYoutube,
} = bookMarkSlice.actions;
export default bookMarkSlice.reducer;
