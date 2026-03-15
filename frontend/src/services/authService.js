import { API_BASE_URL } from "../config/api";

/*
|--------------------------------------------------------------------------
| Helper: Get Auth Headers
|--------------------------------------------------------------------------
*/
const getAuthHeaders = () => {
  const token = localStorage.getItem("mpay_token");

  return {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${token}`,
  };
};

/*
|--------------------------------------------------------------------------
| Helper: Handle API Response (Enhanced Error Catching)
|--------------------------------------------------------------------------
| This handles 422 (Validation), 409 (Conflict), and 500 (Server) errors.
*/
const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    // We create a custom error object to carry the server's specific error details
    const error = new Error(data.message || "API request failed");
    error.status = response.status;
    error.data = data; // This contains the 'errors' object from the API
    throw error;
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Register (Personal & Business)
|--------------------------------------------------------------------------
*/
export const register = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return handleResponse(response);
};

/*
|--------------------------------------------------------------------------
| Verify Email OTP
|--------------------------------------------------------------------------
*/
export const verifyEmailOTP = async (email, otp) => {
  const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });

  return handleResponse(response);
};

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/
export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await handleResponse(response);

  // Save auth data
  localStorage.setItem("mpay_token", data.token);
  localStorage.setItem("mpay_user", JSON.stringify(data.user));
  localStorage.setItem("mpay_onboarding_step", data.onboarding_step);

  return data;
};

/*
|--------------------------------------------------------------------------
| Set Transaction PIN
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
/*
|--------------------------------------------------------------------------
| Complete KYC (Multipart/FormData)
|--------------------------------------------------------------------------
*/
export const completeKYC = async (form) => {

  const token = localStorage.getItem("mpay_token");

  if (!token) {
    throw new Error("User not authenticated");
  }

  const formData = new FormData();

  formData.append("id_number", form.id_number);
  formData.append("dob", form.dob);
  formData.append("city", form.city);
  formData.append("state", form.state);
  formData.append("country", form.country);
  formData.append("address_line", form.address_line);

  if (form.idFront) formData.append("id_front", form.idFront);
  if (form.idBack) formData.append("id_back", form.idBack);
  if (form.selfie) formData.append("selfie", form.selfie);

  const response = await fetch(`${API_BASE_URL}/auth/complete-kyc`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    },
    body: formData
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("Invalid server response");
  }

  if (!response.ok) {
    console.error("KYC API ERROR:", data);
    throw new Error(data.message || "KYC submission failed");
  }

  return data;
};



/*
|--------------------------------------------------------------------------
| Account & Onboarding Status
|--------------------------------------------------------------------------
*/
export const getOnboardingStatus = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/onboarding-status`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
};

export const getDashboardSummary = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/dashboard/summary`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
};

/*
|--------------------------------------------------------------------------
| Auth State Helpers
|--------------------------------------------------------------------------
*/
export const getCurrentUser = () => {
  const user = localStorage.getItem("mpay_user");
  return user ? JSON.parse(user) : null;
};

export const getToken = () => localStorage.getItem("mpay_token");

export const isAuthenticated = () => !!localStorage.getItem("mpay_token");

export const logout = () => {
  localStorage.removeItem("mpay_token");
  localStorage.removeItem("mpay_user");
  localStorage.removeItem("mpay_onboarding_step");
  window.location.href = "/login";
};

/*
|--------------------------------------------------------------------------
| Utility: Get Countries
|--------------------------------------------------------------------------
*/
export const getCountries = async () => {
  const response = await fetch(`${API_BASE_URL}/countries`, {
    headers: { "Accept": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  return response.json();
};
//reset password
export const requestPasswordReset = async (data) => {

  const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to request password reset");
  }

  return result;

};