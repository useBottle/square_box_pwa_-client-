import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const searchModalTriggerSlice = createSlice({
  name: "searchModalTrigger",
  initialState: "none",
  reducers: {
    setSearchModalTrigger(state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { setSearchModalTrigger } = searchModalTriggerSlice.actions;
export default searchModalTriggerSlice.reducer;
