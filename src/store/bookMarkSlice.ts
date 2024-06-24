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
  },
  mouseOnYoutube: {
    category: "",
    username: "",
    videoId: "",
    thumbnail: "",
    title: "",
    timestamp: "",
    channelHandle: "",
    channelThumbnail: "",
    channelTitle: "",
  },
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
  },
});

export const { setSelector, setMarkedNews, setMarkedYoutube, setMouseOnNews, setMouseOnYoutube } =
  bookMarkSlice.actions;
export default bookMarkSlice.reducer;
