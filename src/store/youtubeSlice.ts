import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { YoutubeData, YoutubeState } from "../types/types";

const initialState: YoutubeState = {
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
  playerToggle: true,
};

export const youtubeSlice = createSlice({
  name: "newsState",
  initialState,
  reducers: {
    setCurrentYoutube(state, action: PayloadAction<YoutubeData>) {
      state.currentYoutube = action.payload;
    },
    setPlayerToggle(state, action: PayloadAction<boolean>) {
      state.playerToggle = action.payload;
    },
  },
});

export const { setCurrentYoutube, setPlayerToggle } = youtubeSlice.actions;
export default youtubeSlice.reducer;
