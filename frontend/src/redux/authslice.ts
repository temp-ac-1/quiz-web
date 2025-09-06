// src/redux/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

interface User {
  id?: string;
  username?: string;
  email?: string;
  fullName?: string;
  avatar?: string;
  joinDate?: string;
  provider?: string;
  level?: string;
  totalScore?: string;
  quizzesCompleted?: string;
  averageScore?: string;
  rank?: string;
  perfectScores?: string;
  currentStreak?: string;
  fastestTime?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,

};

// 🔥 Async thunk to check if user is logged in (using JWT cookie)
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/me', {
        withCredentials: true, // ✅ needed for cookies
      });
      return res.data.user; // backend should return { user: {..} }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Not authenticated'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, logout } = authSlice.actions;

// 🔥 Selectors
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
