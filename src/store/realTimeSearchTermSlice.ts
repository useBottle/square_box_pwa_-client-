import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type StateType = Record<string, unknown>;

const initialState: StateType = {};

const realTimeSearchTermSlice = createSlice({
  name: "realTimeSearchTerm",
  initialState,
  reducers: {
    setRealTimeSearchTerm(state, action: PayloadAction<{ key: string; value: unknown }>) {
      return action.payload;
    },
  },
});

export const { setRealTimeSearchTerm } = realTimeSearchTermSlice.actions;
export default realTimeSearchTermSlice.reducer;
