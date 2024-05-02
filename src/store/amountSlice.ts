import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const amountSlice = createSlice({
  name: "amount",
  initialState: ["class0", "class1", "class2"],
  reducers: {
    setAmount(state, action: PayloadAction<string[]>) {
      return action.payload;
    },
  },
});

export const { setAmount } = amountSlice.actions;
export default amountSlice.reducer;
