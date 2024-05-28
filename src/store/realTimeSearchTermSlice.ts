import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { KeywordsType } from "../types/types";

type StateType = Record<string, string[]>;

const initialState: KeywordsType = {};

const realTimeSearchTermSlice = createSlice({
  name: "realTimeSearchTerm",
  initialState,
  reducers: {
    setRealTimeSearchTerm(state, action: PayloadAction<KeywordsType>) {
      return action.payload;
    },
  },
});

export const { setRealTimeSearchTerm } = realTimeSearchTermSlice.actions;
export default realTimeSearchTermSlice.reducer;
