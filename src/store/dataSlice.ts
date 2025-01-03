import { Data, KeywordsType, NewsData, youtubeApiResult } from "./../types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Data = {
  realTimeSearchTerms: {},
  newsData: [],
  youtubeData: {
    kind: "",
    etag: "",
    items: [],
    nextPageToken: "",
    pageInfo: {
      totalResults: 0,
      resultsPerPage: 0,
    },
  },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setRealTimeSearchTerms(state, action: PayloadAction<KeywordsType>) {
      state.realTimeSearchTerms = action.payload;
    },
    setNewsData(state, action: PayloadAction<NewsData[]>) {
      state.newsData = action.payload;
    },
    setYoutubeData(state, action: PayloadAction<youtubeApiResult>) {
      state.youtubeData = action.payload;
    },
  },
});

export const { setRealTimeSearchTerms, setNewsData, setYoutubeData } = dataSlice.actions;
export default dataSlice.reducer;
