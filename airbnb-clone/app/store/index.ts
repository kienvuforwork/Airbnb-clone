import { configureStore } from "@reduxjs/toolkit";

import registerModalReducer from "./registerModalSlice";
import loginModalSlice from "./loginModalSlice";
import rentModalSlice from "./rentModalSlice";
export const store = configureStore({
  reducer: { registerModalReducer, loginModalSlice, rentModalSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
