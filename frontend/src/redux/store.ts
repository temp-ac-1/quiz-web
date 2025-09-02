import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authslice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

// 🔥 Types for state & dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
