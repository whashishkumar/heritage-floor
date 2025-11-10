import api from "@/lib/api/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  email: string;
  message: string;
}

interface RegisterPayload {
  email: string;
}
interface ForgotState {
  email: User | null;
  loading: boolean;
  message: string | null;
  error: string | null;
  success: boolean;
}

const initialState: ForgotState = {
  email: null,
  message: null,
  error: null,
  loading: false,
  success: false,
};

export const forgotPassword = createAsyncThunk<
  User,
  RegisterPayload,
  { rejectValue: string }
>("auth/forgetPassword", async (userEmail, { rejectWithValue }) => {
  try {
    const response = await api.post("customer/forgot-password", userEmail);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data || "Forget password Failed");
  }
});

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
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
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetUserState } = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
