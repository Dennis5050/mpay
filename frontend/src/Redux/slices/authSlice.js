import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../config/api";

// --- Helpers ---
const getHeaders = () => ({
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("mpay_token")}`,
});

// --- Async Thunks ---

export const registerUser = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  } catch (err) {
    return rejectWithValue(err.message || "Registration failed");
  }
});

export const loginUser = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw data;

    localStorage.setItem("mpay_token", data.token);
    localStorage.setItem("mpay_user", JSON.stringify(data.user));
    localStorage.setItem("mpay_onboarding_step", data.onboarding_step);
    return data;
  } catch (err) {
    return rejectWithValue(err.message || "Login failed");
  }
});

export const verifyEmailOTP = createAsyncThunk("auth/verifyEmail", async ({ email, otp }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  } catch (err) {
    return rejectWithValue(err.message || "OTP Verification failed");
  }
});

export const setTransactionPin = createAsyncThunk("auth/setPin", async (pin, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/set-pin`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ pin }),
    });
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  } catch (err) {
    return rejectWithValue(err.message || "Failed to set PIN");
  }
});

export const completeKYC = createAsyncThunk("auth/completeKYC", async (form, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    Object.keys(form).forEach(key => {
      if (form[key]) formData.append(key, form[key]);
    });

    const res = await fetch(`${API_BASE_URL}/auth/complete-kyc`, {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${localStorage.getItem("mpay_token")}`,
        "Accept": "application/json" 
      },
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  } catch (err) {
    return rejectWithValue(err.message || "KYC Submission failed");
  }
});

export const getDashboardSummary = createAsyncThunk("auth/fetchSummary", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/dashboard/summary`, {
      method: "GET",
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// --- Slice ---

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("mpay_user")) || null,
    token: localStorage.getItem("mpay_token") || null,
    onboardingStep: localStorage.getItem("mpay_onboarding_step") || null,
    dashboard: null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem("mpay_token"),
  },
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.dashboard = null;
      window.location.href = "/login";
    },
    clearAuthError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.onboardingStep = action.payload.onboarding_step;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Dashboard Summary
      .addCase(getDashboardSummary.fulfilled, (state, action) => {
        state.dashboard = action.payload;
      })
      // KYC & Register (Generic Loading states)
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => { state.loading = true; }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected"),
        (state) => { state.loading = false; }
      );
  }
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;