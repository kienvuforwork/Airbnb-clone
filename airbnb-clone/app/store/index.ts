import { configureStore } from "@reduxjs/toolkit";

import registerModalReducer from "./registerModalSlice";

export const store = configureStore({
  reducer: { registerModalReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
