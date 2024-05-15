import { configureStore } from "@reduxjs/toolkit";
import inputValueReducer from "./inputValueSlice";
import newsDataReducer from "./newsDataSlice";
import amountReducer from "./amountSlice";
import positionReducer from "./positionSlice";
import visibilityReducer from "./visibilitySlice";
import currentNewsReducer from "./currentNewsSlice";
import currentImgReducer from "./currentImgSlice";

const store = configureStore({
  reducer: {
    inputValue: inputValueReducer,
    newsData: newsDataReducer,
    currentNews: currentNewsReducer,
    amount: amountReducer,
    position: positionReducer,
    visibility: visibilityReducer,
    currentImg: currentImgReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
