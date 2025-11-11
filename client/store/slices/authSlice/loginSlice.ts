import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api/axios";
import Cookies from "js-cookie";

// ----------------------
// Interfaces
// ----------------------
interface User {
  id?: string;
  email: string;
}

interface LoginResponse {
  data: User;
  token: string;
}

interface LoginPayload {
  email: string;
  password: string;
  device_name: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  token: string | null;
  error: string | null;
  isLoggedIn: boolean | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isLoggedIn: null,
};

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/loginUser", async (formPayload, { rejectWithValue }) => {
  try {
    const res = await api.post("/customer/login", formPayload);
    const { token, data } = res.data;
    // persist token in cookie here (side-effect allowed in thunk)
    // if (token) Cookies.set("token", token);
    return { data, token };
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  Cookies.remove("token");
  return null;
});

export const checkAuth = createAsyncThunk<
  User | null,
  void,
  { rejectValue: string }
>("auth/checkAuth", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/auth/me");
    const user = res.data;
    return user;
  } catch (err) {
    return rejectWithValue("Auth check failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.isLoggedIn = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.isLoggedIn = false;
      })
      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      // CHECK AUTH
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        // If payload is a user object, mark logged in; otherwise false
        state.isLoggedIn = !!action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isLoggedIn = false;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
