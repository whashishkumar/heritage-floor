import api from "@/lib/api/axios";
import { ResidentailPageData } from "@/lib/api/endpoints";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ProductCategory {
  id?: number;
  name?: string;
}

interface ProductCategoriesState {
  productCategories: ProductCategory[] | null;
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: ProductCategoriesState = {
  productCategories: null,
  loading: false,
  success: false,
  error: null,
};

//  Define parameter types
interface FetchProductCategoriesParams {
  categoryid?: number;
  id?: number;
  sky?: string;
  sortId?: string;
  order?: string;
  page?: number;
}

//  FIXED ASYNC THUNK
export const fetchproductCategories = createAsyncThunk<
  ProductCategory[], // Return type
  FetchProductCategoriesParams | void, // Argument type
  { rejectValue: string } // Rejection type
>(
  "residential/fetchproductCategories",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { categoryid, id, sky, sortId, order, page }: any = params;
      const response = await ResidentailPageData.getCategoryBasedProducts(
        categoryid,
        id,
        sky,
        sortId,
        order,
        page
      );
      return response.data;
    } catch (error: any) {
      const message = error.response?.data || "Fetch productCategories Failed";
      return rejectWithValue(message);
    }
  }
);

//  SLICE
const productCategoriesSlice = createSlice({
  name: "productCategories",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchproductCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchproductCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.productCategories = action.payload;
        state.error = null;
        state.success = true;
      })
      .addCase(fetchproductCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.success = false;
      });
  },
});

export const { resetUserState } = productCategoriesSlice.actions;

export default productCategoriesSlice.reducer;
