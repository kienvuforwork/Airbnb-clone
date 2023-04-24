import { configureStore } from "@reduxjs/toolkit";

import registerModalReducer from "./registerModalSlice";
import loginModalSlice from "./loginModalSlice";

export const store = configureStore({
  reducer: { registerModalReducer, loginModalSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
