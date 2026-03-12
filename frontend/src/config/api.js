export const API_BASE_URL = "https://api.mpay.africa/api";

/*
|--------------------------------------------------------------------------
| JSON Headers
|--------------------------------------------------------------------------
*/
export const getJsonHeaders = () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
});

/*
|--------------------------------------------------------------------------
| Auth Headers
|--------------------------------------------------------------------------
*/
export const getAuthHeaders = () => {
  const token = localStorage.getItem("mpay_token");

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

/*
|--------------------------------------------------------------------------
| Handle API Response
|--------------------------------------------------------------------------
*/
export const handleResponse = async (response) => {
  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const error = new Error(data?.message || "API request failed");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};