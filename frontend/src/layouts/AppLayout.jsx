import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const AppLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "220px", background: "#0f172a", color: "#fff", padding: "20px" }}>
        <h2>Mpay</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
          <Link to="/dashboard" style={{ color: "#fff" }}>Dashboard</Link>
          <Link to="/transactions" style={{ color: "#fff" }}>Transactions</Link>
          <Link to="/send-money" style={{ color: "#fff" }}>Send Money</Link>
          <Link to="/withdraw-funds" style={{ color: "#fff" }}>Withdraw</Link>
          <Link to="/kyc" style={{ color: "#fff" }}>KYC</Link>
          <Link to="/account" style={{ color: "#fff" }}>Account</Link>

          <button onClick={logout} style={{ marginTop: "20px" }}>
            Logout
          </button>
        </nav>
      </div>

      {/* Page Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;