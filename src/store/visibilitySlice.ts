import { createSlice } from "@reduxjs/toolkit";

export const visibilitySlice = createSlice({
  name: "visibility",
  initialState: {
    start: 0,
    end: 3,
  },
  reducers: {
    setVisibilityRange(state, action) {
      state.start = action.payload.start;
      state.end = action.payload.end;
    },
  },
});

export const { setVisibilityRange } = visibilitySlice.actions;
export default visibilitySlice.reducer;
