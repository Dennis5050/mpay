export const getKYCStatus = () => {
  return {
    status: localStorage.getItem("kycStatus") || "not_started",
    level: Number(localStorage.getItem("kycLevel") || 0),
  };
};

export const setKYCStatus = (status, level) => {
  localStorage.setItem("kycStatus", status);
  localStorage.setItem("kycLevel", level);
};