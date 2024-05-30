import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoadingStatus } from "../types/types";

const initialState: LoadingStatus = {
  newsLoading: false,
  youtubeLoading: false,
  instaLoading: false,
  xLoading: false,
};

const loadingStatusSlice = createSlice({
  name: "loadingStatus",
  initialState,
  reducers: {
    setNewsLoading(state, action: PayloadAction<boolean>) {
      state.newsLoading = action.payload;
    },
    setYoutubeLoading(state, action: PayloadAction<boolean>) {
      state.youtubeLoading = action.payload;
    },
    setInstaLoading(state, action: PayloadAction<boolean>) {
      state.instaLoading = action.payload;
    },
    setXLoading(state, action: PayloadAction<boolean>) {
      state.xLoading = action.payload;
    },
  },
});

export const { setNewsLoading, setYoutubeLoading, setInstaLoading, setXLoading } = loadingStatusSlice.actions;
export default loadingStatusSlice.reducer;
