import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const positionSlice = createSlice({
  name: "position",
  initialState: 0,
  reducers: {
    setPosition(state, action: PayloadAction<number>) {
      return action.payload;
    },
  },
});

export const { setPosition } = positionSlice.actions;
export default positionSlice.reducer;
