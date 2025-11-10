import api from "@/lib/api/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface builderBannerState {
  builderBanner?: [] | null;
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: builderBannerState = {
  builderBanner: null,
  loading: false,
  success: false,
  error: null,
};

export const fetchBuilderBannerPageInfo = createAsyncThunk<
  [],
  void,
  {
    rejectValue: string;
  }
>("builder/fetchBuilderBannerPageInfo", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/builder/hero-section");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data || "Fetch Banner Page Failed");
  }
});

const builderBannerSlice = createSlice({
  name: "builderBanner",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBuilderBannerPageInfo.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(fetchBuilderBannerPageInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.builderBanner = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(fetchBuilderBannerPageInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
  },
});

export const { resetUserState } = builderBannerSlice.actions;

export default builderBannerSlice.reducer;
