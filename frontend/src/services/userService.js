import { getToken } from "./authService";
import { API_BASE_URL, getAuthHeaders, handleResponse } from "../config/api";

/*
|--------------------------------------------------------------------------
| Get User Profile
|--------------------------------------------------------------------------
*/

export const getProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
};

/*
|--------------------------------------------------------------------------
| Update Profile
|--------------------------------------------------------------------------
*/

export const updateProfile = async (data) => {
  const response = await fetch(`${API_BASE_URL}/user/profile`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

/*
|--------------------------------------------------------------------------
| Change Password
|--------------------------------------------------------------------------
*/

export const changePassword = async (data) => {
  const response = await fetch(`${API_BASE_URL}/user/change-password`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

/*
|--------------------------------------------------------------------------
| Upload Profile Picture
|--------------------------------------------------------------------------
*/

export const uploadAvatar = async (file) => {
  const token = getToken();

  const formData = new FormData();
  formData.append("avatar", file);

  const response = await fetch(`${API_BASE_URL}/user/avatar`, {
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
| Get KYC Status
|--------------------------------------------------------------------------
*/

export const getKYCStatus = async () => {
  const response = await fetch(`${API_BASE_URL}/user/kyc-status`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
};