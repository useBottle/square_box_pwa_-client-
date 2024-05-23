import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const searchModalTriggerSlice = createSlice({
  name: "searchModalTrigger",
  initialState: false,
  reducers: {
    setSearchModalTrigger(state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { setSearchModalTrigger } = searchModalTriggerSlice.actions;
export default searchModalTriggerSlice.reducer;
