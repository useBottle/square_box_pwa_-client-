import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const visibilitySlice = createSlice({
  name: "visibility",
  initialState: 0,
  reducers: {
    setVisibility(state, action: PayloadAction<number>) {
      return action.payload;
    },
  },
});

export const { setVisibility } = visibilitySlice.actions;
export default visibilitySlice.reducer;
