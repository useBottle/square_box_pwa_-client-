import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { YoutubeData, YoutubeState } from "../types/types";

const initialState: YoutubeState = {
  currentYoutubeIndex: 0,
  currentYoutube: {
    kind: "",
    etag: "",
    id: {
      kind: "",
      videoId: "",
    },
    snippet: {
      channelId: "",
      title: "",
      thumbnails: [
        {
          url: "",
          width: 0,
          height: 0,
        },
      ],
      channelTitle: "",
      channelHandle: "",
      timestamp: "",
      duration: "",
      views: "",
      badges: [],
      channelApproval: null,
      channelThumbnails: [{ url: "", width: 0, height: 0 }],
      detailedMetadataSnippet: [
        {
          test: "",
        },
      ],
      chapters: [],
    },
  },
  previewToggle: true,
};

export const youtubeSlice = createSlice({
  name: "newsState",
  initialState,
  reducers: {
    setCurrentYoutubeIndex(state, action: PayloadAction<number>) {
      state.currentYoutubeIndex = action.payload;
    },
    setCurrentYoutube(state, action: PayloadAction<YoutubeData>) {
      state.currentYoutube = action.payload;
    },
    setPreviewToggle(state, action: PayloadAction<boolean>) {
      state.previewToggle = action.payload;
    },
  },
});

export const { setCurrentYoutubeIndex, setCurrentYoutube, setPreviewToggle } = youtubeSlice.actions;
export default youtubeSlice.reducer;
