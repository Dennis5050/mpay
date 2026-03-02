// src/utils/onboardingRedirect.js

export const handleOnboardingRedirect = (navigate) => {
  const token = localStorage.getItem("authToken");

  // Not logged in → go to login
  if (!token) {
    navigate("/login");
    return;
  }

  const pinSet = localStorage.getItem("pinSet") === "true";

  // Only enforce critical onboarding
  if (!pinSet) {
    navigate("/set-pin");
    return;
  }

  // KYC is OPTIONAL → always allow dashboard
  navigate("/dashboard");
};