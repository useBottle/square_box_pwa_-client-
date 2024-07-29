import { configureStore } from "@reduxjs/toolkit";
import inputValueReducer from "./inputValueSlice";
import dataReducer from "./dataSlice";
import newsReducer from "./newsSlice";
import userInterfaceReducer from "./userInterfaceSlice";
import youtubeReducer from "./youtubeSlice";
import verificationReducer from "./verificationSlice";
import bookMarkReducer from "./bookMarkSlice";
import signUpTriggerReducer from "./signUpTriggerSlice";

const store = configureStore({
  reducer: {
    inputValue: inputValueReducer,
    data: dataReducer,
    news: newsReducer,
    youtube: youtubeReducer,
    userInterface: userInterfaceReducer,
    verification: verificationReducer,
    bookMark: bookMarkReducer,
    signUpTrigger: signUpTriggerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
