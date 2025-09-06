// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice";
import categoriesReducer from "./categoriesSlice"; // ✅ import it

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer, // ✅ register it here
  },
});

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
