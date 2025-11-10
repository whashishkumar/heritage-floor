import api from "@/lib/api/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface whyToChooseUsState {
  whyToChooseUs?: [] | null;
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: whyToChooseUsState = {
  whyToChooseUs: null,
  loading: false,
  success: false,
  error: null,
};

export const fetchWhyToChooseUs = createAsyncThunk<
  [],
  void,
  {
    rejectValue: string;
  }
>("builder/fetchWhyToChooseUs", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/builder/why-choose-us");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data || "Fetch WhyToChooseUs Failed");
  }
});

const whyToChooseUsSlice = createSlice({
  name: "whyToChooseUs",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWhyToChooseUs.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(fetchWhyToChooseUs.fulfilled, (state, action) => {
      state.loading = false;
      state.whyToChooseUs = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(fetchWhyToChooseUs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
  },
});

export const { resetUserState } = whyToChooseUsSlice.actions;

export default whyToChooseUsSlice.reducer;
