import api from "@/lib/api/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface testimonialsState {
  testimonials?: [] | null;
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: testimonialsState = {
  testimonials: null,
  loading: false,
  success: false,
  error: null,
};

export const fetchTestimonials = createAsyncThunk<
  [],
  void,
  {
    rejectValue: string;
  }
>("builder/fetchTestimonials", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/builder/testimonials");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data || "Fetch Testimonials Failed");
  }
});

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTestimonials.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(fetchTestimonials.fulfilled, (state, action) => {
      state.loading = false;
      state.testimonials = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(fetchTestimonials.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
  },
});

export const { resetUserState } = testimonialsSlice.actions;

export default testimonialsSlice.reducer;
