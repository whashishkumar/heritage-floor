import api from "@/lib/api/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ourCustomersState {
  ourCustomers?: [] | null;
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: ourCustomersState = {
  ourCustomers: null,
  loading: false,
  success: false,
  error: null,
};

export const fetchOurCustomers = createAsyncThunk<
  [],
  void,
  {
    rejectValue: string;
  }
>("builder/fetchOurCustomers", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/builder/our-customers");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data || "Fetch OurCustomer Failed");
  }
});

const ourCustomersSlice = createSlice({
  name: "ourCustomers",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOurCustomers.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(fetchOurCustomers.fulfilled, (state, action) => {
      state.loading = false;
      state.ourCustomers = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(fetchOurCustomers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
  },
});

export const { resetUserState } = ourCustomersSlice.actions;

export default ourCustomersSlice.reducer;
