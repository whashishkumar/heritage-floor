import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/api/axios";

interface toolsAndEquimentsState {
  tools?: [] | null;
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: toolsAndEquimentsState = {
  tools: null,
  loading: false,
  success: false,
  error: null,
};

export const fetchToolsAndEquimentsInfo = createAsyncThunk<
  [],
  void,
  {
    rejectValue: string;
  }
>("builder/fetchToolsAndEquimentsInfo", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/builder/tools-section");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data || "Fetch ToolsAnd Equiments Failed");
  }
});

const toolsAndEquimentsSlice = createSlice({
  name: "toolsAndEquiments",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToolsAndEquimentsInfo.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(fetchToolsAndEquimentsInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.tools = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(fetchToolsAndEquimentsInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
  },
});

export const { resetUserState } = toolsAndEquimentsSlice.actions;

export default toolsAndEquimentsSlice.reducer;
