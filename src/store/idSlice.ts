import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const idSlice = createSlice({
  name: "idSlice",
  initialState: 100,
  reducers: {
    setId(state, aciton: PayloadAction<number>) {
      return aciton.payload;
    },
  },
});

export const { setId } = idSlice.actions;
export default idSlice.reducer;
