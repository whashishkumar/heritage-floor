import api from "@/lib/api/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface toolsAndEquimentsState {
  bestSellerProducts?: [] | null;
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: toolsAndEquimentsState = {
  bestSellerProducts: null,
  loading: false,
  success: false,
  error: null,
};

export const fetchBestSellerProducts = createAsyncThunk<
  [],
  void,
  {
    rejectValue: string;
  }
>("builder/fetchBestSellerProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response.data || "Fetch BestSeller Products Failed"
    );
  }
});

const bestSellerproductsSlice = createSlice({
  name: "bestSellerProducts",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBestSellerProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(fetchBestSellerProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.bestSellerProducts = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(fetchBestSellerProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
  },
});

export const { resetUserState } = bestSellerproductsSlice.actions;

export default bestSellerproductsSlice.reducer;
