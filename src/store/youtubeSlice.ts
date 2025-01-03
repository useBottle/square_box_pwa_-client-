import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { YoutubeState, YouTubeVideo } from "../types/types";

const initialState: YoutubeState = {
  currentYoutube: {
    kind: "",
    etag: "",
    id: {
      videoId: "",
      kind: "",
    },
    snippet: {
      publishedAt: "",
      channelId: "",
      title: "",
      description: "",
      thumbnails: {
        default: {
          url: "",
          width: 0,
          height: 0,
        },
        medium: {
          url: "",
          width: 0,
          height: 0,
        },
        high: {
          url: "",
          width: 0,
          height: 0,
        },
        standard: {
          url: "",
          width: 0,
          height: 0,
        },
        maxres: {
          url: "",
          width: 0,
          height: 0,
        },
      },
      channelTitle: "",
      tags: [],
      categoryId: "",
      liveBroadcastContent: "",
      localized: {
        title: "",
        description: "",
      },
      defaultAudioLanguage: "",
    },
  },
};

export const youtubeSlice = createSlice({
  name: "newsState",
  initialState,
  reducers: {
    setCurrentYoutube(state, action: PayloadAction<YouTubeVideo>) {
      state.currentYoutube = action.payload;
    },
  },
});

export const { setCurrentYoutube } = youtubeSlice.actions;
export default youtubeSlice.reducer;
