// src/services/authService.js

const TOKEN_KEY = "authToken";
const USER_KEY = "user";

// ==========================
// DEV USER (no backend)
// ==========================
const DEV_USER = {
  email: "test@mpay.africa",
  password: "123456",
  name: "Test User",
};

export const authService = {
  // ==========================
  // Login (DEV MODE)
  // ==========================
  login: async (email, password) => {
    // simulate network delay
    await new Promise((r) => setTimeout(r, 500));

    if (email === DEV_USER.email && password === DEV_USER.password) {
      const user = {
        email: DEV_USER.email,
        name: DEV_USER.name,
      };

      // Save session
      localStorage.setItem(TOKEN_KEY, "dev-token");
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      // Default onboarding values (if not set)
      if (!localStorage.getItem("pinSet")) {
        localStorage.setItem("pinSet", "true");
      }

      if (!localStorage.getItem("kycStatus")) {
        localStorage.setItem("kycStatus", "not_started");
      }

      if (!localStorage.getItem("kycLevel")) {
        localStorage.setItem("kycLevel", "0");
      }

      return user;
    }

    // simulate backend error
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  },

  // ==========================
  // Register (disabled for dev)
  // ==========================
  register: async () => {
    throw new Error("Register disabled (no backend)");
  },

  // ==========================
  // Logout
  // ==========================
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // ==========================
  // Get current user
  // ==========================
  getUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  // ==========================
  // Check auth
  // ==========================
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // ==========================
  // Onboarding Status (DEV)
  // ==========================
  getOnboardingStatus: async () => {
    // simulate delay
    await new Promise((r) => setTimeout(r, 200));

    return {
      hasPin: localStorage.getItem("pinSet") === "true",
      kycStatus: localStorage.getItem("kycStatus") || "not_started",
      kycLevel: Number(localStorage.getItem("kycLevel") || 0),
    };
  },
};