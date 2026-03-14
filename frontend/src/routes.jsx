import React, { useEffect } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 

// Import Thunks from your Slices
import { fetchMethods } from "./Redux/slices/paymentSlice";
import { getDashboardSummary } from "./Redux/slices/authSlice";

import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";

// Public
import Login from "./pages/login";
import Register from "./pages/register";
import VerifyEmail from "./pages/verify-email";
import SetPin from "./pages/set-pin";
import ForgotPassword from "./pages/forgot-password";

// Core Protected Pages
import Dashboard from "./pages/dashboard";
import Transactions from "./pages/transactions";
import WithdrawFunds from "./pages/withdraw-funds";
import SendMoney from "./pages/send-money";
import AccountPage from "./pages/account";

// KYC
import KYCPage from "./pages/kyc";
import Pending from "./pages/kyc/Pending";
import Verified from "./pages/kyc/Verified";

// Layout & Guard
import AuthGuard from "./components/AuthGuard";
import AppLayout from "./layouts/AppLayout";

/**
 * MPay Branded Placeholders 
 */
const PlaceholderPage = ({ title }) => (
  <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
    <div className="w-16 h-16 bg-[#A32A29]/10 rounded-full flex items-center justify-center text-[#A32A29] mb-4 font-black">M</div>
    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{title}</h2>
    <p className="text-slate-500 mt-2 font-medium">This module is part of the MPay Africa Infrastructure.</p>
  </div>
);

const Payments = () => <PlaceholderPage title="Payments & Billing" />;
const ApiTransactions = () => <PlaceholderPage title="API Gateway" />;
const Transfer = () => <PlaceholderPage title="Internal Transfer" />;
const Services = () => <PlaceholderPage title="Merchant Services" />;
const Docs = () => <PlaceholderPage title="Developer Docs" />;
const Support = () => <PlaceholderPage title="Institutional Support" />;

const Routes = () => {
  const dispatch = useDispatch();
  
  // We grab the authentication status from the Redux store
  const { isAuthenticated } = useSelector((state) => state.auth);

  /**
   * GLOBAL INITIALIZATION
   * When the app loads, if we have a token (or Redux says we are authenticated),
   * we fire off all initial API calls to populate the global state.
   */
  useEffect(() => {
    const token = localStorage.getItem("mpay_token");
    
    if (token || isAuthenticated) {
      // 1. Fetch Payment Channels (Bank, Mobile Money, etc.)
      dispatch(fetchMethods());
      
      // 2. Fetch Dashboard Statistics (Balances, Recent activity summary)
      dispatch(getDashboardSummary());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <ErrorBoundary>
      <ScrollToTop />

      <RouterRoutes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/set-pin" element={<SetPin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* --- Protected Layout --- */}
        <Route
          element={
            <AuthGuard> 
              <AppLayout />
            </AuthGuard>
          }
        >
          {/* Main Dashboard Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/send-money" element={<SendMoney />} />
          <Route path="/withdraw-funds" element={<WithdrawFunds />} />

          {/* KYC */}
          <Route path="/kyc" element={<KYCPage />} />
          <Route path="/kyc/pending" element={<Pending />} />
          <Route path="/kyc/verified" element={<Verified />} />

          {/* Sidebar Extra Pages */}
          <Route path="/payments" element={<Payments />} />
          <Route path="/api-transactions" element={<ApiTransactions />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/services" element={<Services />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/support" element={<Support />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    </ErrorBoundary>
  );
};

export default Routes;