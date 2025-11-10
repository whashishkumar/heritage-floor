import api from "@/lib/api/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface toolsAndEquimentsState {
  categoryProducts?: [] | null;
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: toolsAndEquimentsState = {
  categoryProducts: null,
  loading: false,
  success: false,
  error: null,
};

export const fetchCategoryProducts = createAsyncThunk<
  [],
  void,
  {
    rejectValue: string;
  }
>("builder/fetchCategoryProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response.data || "Fetch Category Products Failed"
    );
  }
});

const categoryProductsSlice = createSlice({
  name: "categoryProducts",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(fetchCategoryProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryProducts = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(fetchCategoryProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
  },
});

export const { resetUserState } = categoryProductsSlice.actions;

export default categoryProductsSlice.reducer;
