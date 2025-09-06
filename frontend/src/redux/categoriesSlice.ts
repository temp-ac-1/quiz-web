// src/redux/categoriesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "./store";

export interface Category {
  _id: string;
  title: string;
  description: string;
  slug: string;
  avatar: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  overallProgress: number;
  totalQuizzes: number;
  completedQuizzes: number;
  participants: number;
  rating: number;
  pointsEarned: number;
  subcategories?: string[];
  achievements?: string[];
}

interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
};

// 🔥 Async thunk to fetch categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      // Assuming backend returns { categories: [...] }
      return res.data.categories;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch categories");
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectCategories = (state: RootState) => state.categories;
export default categoriesSlice.reducer;
