import { Data, KeywordsType, NewsData, YoutubeData } from "./../types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Data = {
  realTimeSearchTerms: {},
  newsData: [],
  youtubeData: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setRealTimeSearchTerms(state, action: PayloadAction<KeywordsType>) {
      state.realTimeSearchTerms = action.payload;
    },
    setNewsData(state, action: PayloadAction<Partial<NewsData>[]>) {
      state.newsData = action.payload;
    },
    setYoutubeData(state, action: PayloadAction<Partial<YoutubeData>[]>) {
      state.youtubeData = action.payload;
    },
  },
});

export const { setRealTimeSearchTerms, setNewsData, setYoutubeData } = dataSlice.actions;
export default dataSlice.reducer;
