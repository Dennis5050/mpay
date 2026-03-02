export const DEV_USER = {
  email: "test@mpay.africa",
  password: "123456",
  name: "Test User",
  token: "dev-token",
  kycStatus: "not_started", // change for testing
  kycLevel: 0,
  pinSet: true
};

export const devLogin = (email, password) => {
  if (email === DEV_USER.email && password === DEV_USER.password) {
    localStorage.setItem("authToken", DEV_USER.token);
    localStorage.setItem("userName", DEV_USER.name);
    localStorage.setItem("kycStatus", DEV_USER.kycStatus);
    localStorage.setItem("kycLevel", DEV_USER.kycLevel);
    localStorage.setItem("pinSet", DEV_USER.pinSet);
    return true;
  }
  return false;
};

export const devLogout = () => {
  localStorage.clear();
};