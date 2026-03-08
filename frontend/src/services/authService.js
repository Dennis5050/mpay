const API_BASE_URL = "https://api.mpay.africa/api";

/*
|--------------------------------------------------------------------------
| Helper: Get Auth Headers
|--------------------------------------------------------------------------
*/
const getAuthHeaders = () => {
  const token = localStorage.getItem("mpay_token");

  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
};

/*
|--------------------------------------------------------------------------
| Helper: Handle API Response
|--------------------------------------------------------------------------
*/
const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/
export const register = async ({
  account_type,
  name,
  email,
  phone,
  password,
}) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      account_type,
      name,
      email,
      phone,
      password,
    }),
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
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      otp,
    }),
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
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
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
export const setTransactionPin = async (pin) => {
  const response = await fetch(`${API_BASE_URL}/auth/set-pin`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ pin }),
  });

  return handleResponse(response);
};

/*
|--------------------------------------------------------------------------
| Complete KYC
|--------------------------------------------------------------------------
*/
export const completeKYC = async (form) => {
  const token = localStorage.getItem("mpay_token");

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
      Accept: "application/json",
    },
    body: formData,
  });

  return handleResponse(response);
};

/*
|--------------------------------------------------------------------------
| Onboarding Status
|--------------------------------------------------------------------------
*/
export const getOnboardingStatus = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/onboarding-status`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
};

/*
|--------------------------------------------------------------------------
| Dashboard Summary
|--------------------------------------------------------------------------
*/
export const getDashboardSummary = async () => {
  const response = await fetch(
    `${API_BASE_URL}/auth/dashboard/summary`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
};

/*
|--------------------------------------------------------------------------
| Get Current User
|--------------------------------------------------------------------------
*/
export const getCurrentUser = () => {
  const user = localStorage.getItem("mpay_user");

  return user ? JSON.parse(user) : null;
};

/*
|--------------------------------------------------------------------------
| Get Token
|--------------------------------------------------------------------------
*/
export const getToken = () => {
  return localStorage.getItem("mpay_token");
};

/*
|--------------------------------------------------------------------------
| Check Authentication
|--------------------------------------------------------------------------
*/
export const isAuthenticated = () => {
  return !!localStorage.getItem("mpay_token");
};

/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/
export const logout = () => {
  localStorage.removeItem("mpay_token");
  localStorage.removeItem("mpay_user");
  localStorage.removeItem("mpay_onboarding_step");

  window.location.href = "/login";
};
/*
countries
*/
export const getCountries = async () => {
  const response = await fetch("https://api.mpay.africa/api/countries", {
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  return data;
};