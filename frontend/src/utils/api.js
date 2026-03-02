const API_BASE =
  import.meta.env.VITE_API_URL || "https://app.mpayafrica.site/api";

// =============================
// Get token (single source)
// =============================
const getToken = () => {
  return localStorage.getItem("authToken");
};

// =============================
// Handle unauthorized globally
// =============================
const handleUnauthorized = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");

  // Hard redirect to avoid React state issues
  window.location.href = "/login";
};

// =============================
// Core API Request
// =============================
export const apiRequest = async (url, options = {}) => {
  const token = getToken();

  const config = {
    method: options.method || "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  // Attach body if exists
  if (options.body) {
    config.body =
      typeof options.body === "string"
        ? options.body
        : JSON.stringify(options.body);
  }

  try {
    const response = await fetch(`${API_BASE}${url}`, config);

    // Try parse JSON safely
    let data = null;
    try {
      data = await response.json();
    } catch {
      data = {};
    }

    // =============================
    // Global 401 handler
    // =============================
    if (response.status === 401) {
      handleUnauthorized();
      return null;
    }

    // =============================
    // Error handling
    // =============================
    if (!response.ok) {
      throw {
        status: response.status,
        message: data?.message || "Request failed",
        errors: data?.errors || null,
      };
    }

    return data;
  } catch (error) {
    throw {
      status: error.status || 0,
      message: error.message || "Network error",
      errors: error.errors || null,
    };
  }
};