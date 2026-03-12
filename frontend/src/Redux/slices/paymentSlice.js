import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "config/api";

const token = () => localStorage.getItem("mpay_token");

// --- Async Actions ---

// 1. Fetch
export const fetchMethods = createAsyncThunk("payments/fetchMethods", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/payment-channels`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    const data = await res.json();
    return data.data || data;
  } catch (err) {
    return rejectWithValue("Failed to fetch methods");
  }
});

// 2. Add
export const addMethod = createAsyncThunk("payments/addMethod", async (formData, { dispatch, rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/payment-channels`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to add");
    dispatch(fetchMethods()); 
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// 3. Delete (The missing piece!)
export const deleteMethod = createAsyncThunk("payments/deleteMethod", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/payment-channels/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token()}` },
    });
    if (!res.ok) throw new Error("Failed to delete channel");
    return id; // We return the ID so the reducer knows which one to remove
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// --- Slice ---
const paymentSlice = createSlice({
  name: "payments",
  initialState: { items: [], loading: false, error: null },
  reducers: {
    // Standard reducer for local cleanup if needed
    removeMethodLocally: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Handlers
      .addCase(fetchMethods.pending, (state) => { state.loading = true; })
      .addCase(fetchMethods.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Handler (Optimistic Update)
      .addCase(deleteMethod.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export const { removeMethodLocally } = paymentSlice.actions;
export default paymentSlice.reducer;