import { configureStore } from "@reduxjs/toolkit";
import paymentReducer from "../slices/paymentSlice";
import authReducer from "../slices/authSlice";

/**
 * Global Redux Store
 * -----------------
 * The 'reducer' object maps the state keys to their respective logic.
 * - state.auth: Manages login, user data, and tokens.
 * - state.payments: Manages bank/mobile money channels.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    payments: paymentReducer,
  },
  // Redux Toolkit includes Thunk middleware by default for async API calls
});

export default store;