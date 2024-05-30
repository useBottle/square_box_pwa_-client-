import { configureStore } from "@reduxjs/toolkit";
import inputValueReducer from "./inputValueSlice";
import dataReducer from "./dataSlice";
import newsStateReducer from "./newsSlice";
import userInterfaceReducer from "./userInterfaceSlice";

const store = configureStore({
  reducer: {
    inputValue: inputValueReducer,
    data: dataReducer,
    newsState: newsStateReducer,
    userInterface: userInterfaceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
