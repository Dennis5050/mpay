// src/hooks/useAuth.js
import { useNavigate } from "react-router-dom";

// Dev test user (no backend)
const DEV_USER = {
  email: "test@mpay.africa",
  password: "123456",
  name: "Test User",
  token: "dev-token",
  kycStatus: "not_started",
  kycLevel: 0,
  pinSet: true,
};

export const useAuth = () => {
  const navigate = useNavigate();

  // ============================
  // Login (Dev Mode)
  // ============================
  const login = async (email, password) => {
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 700));

    if (email === DEV_USER.email && password === DEV_USER.password) {
      // Save session
      localStorage.setItem("authToken", DEV_USER.token);
      localStorage.setItem("userName", DEV_USER.name);
      localStorage.setItem("kycStatus", DEV_USER.kycStatus);
      localStorage.setItem("kycLevel", DEV_USER.kycLevel);
      localStorage.setItem("pinSet", DEV_USER.pinSet);

      // Redirect after login
      navigate("/dashboard");
      return;
    }

    // Simulate backend error
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  };

  // ============================
  // Logout
  // ============================
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // ============================
  // Auth State
  // ============================
  const isAuthenticated = () => {
    return !!localStorage.getItem("authToken");
  };

  return {
    login,
    logout,
    isAuthenticated,
  };
};