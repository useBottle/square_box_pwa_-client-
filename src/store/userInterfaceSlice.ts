import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userInterface } from "../types/types";

const initialState: userInterface = {
  darkLightToggle: "dark",
  menuIndex: 0,
  searchModalTrigger: false,
  bookMarkModalTrigger: false,
  loadingStatus: {
    newsLoading: false,
    youtubeLoading: false,
    signUpLoading: false,
    bookMarkLoading: false,
  },
};

const userInterfaceSlice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    setDarkLight(state, action: PayloadAction<string>) {
      state.darkLightToggle = action.payload;
    },
    setMenuIndex(state, action: PayloadAction<number>) {
      state.menuIndex = action.payload;
    },
    setSearchModalTrigger(state, action: PayloadAction<boolean>) {
      state.searchModalTrigger = action.payload;
    },
    setBookMarkModalTrigger(state, action: PayloadAction<boolean>) {
      state.bookMarkModalTrigger = action.payload;
    },
    setNewsLoading(state, action: PayloadAction<boolean>) {
      state.loadingStatus.newsLoading = action.payload;
    },
    setYoutubeLoading(state, action: PayloadAction<boolean>) {
      state.loadingStatus.youtubeLoading = action.payload;
    },
    setSignUpLoading(state, action: PayloadAction<boolean>) {
      state.loadingStatus.signUpLoading = action.payload;
    },
    setBookMarkLoading(state, action: PayloadAction<boolean>) {
      state.loadingStatus.bookMarkLoading = action.payload;
    },
  },
});

export const {
  setDarkLight,
  setMenuIndex,
  setSearchModalTrigger,
  setBookMarkModalTrigger,
  setNewsLoading,
  setYoutubeLoading,
  setSignUpLoading,
  setBookMarkLoading,
} = userInterfaceSlice.actions;
export default userInterfaceSlice.reducer;
