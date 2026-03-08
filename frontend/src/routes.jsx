import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";

import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";

// Public
import Login from "./pages/login";
import Register from "./pages/register";
import VerifyEmail from "./pages/verify-email";
import SetPin from "./pages/set-pin";

// Core Protected Pages
import Dashboard from "./pages/dashboard";
import Transactions from "./pages/transactions";
import WithdrawFunds from "./pages/withdraw-funds";
import SendMoney from "./pages/send-money";
import AccountPage from "./pages/account";

// KYC
import KYC from "./pages/kyc";
import KYCPending from "./pages/kyc/Pending";

// Layout & Guard
import AuthGuard from "./components/AuthGuard";
import AppLayout from "./layouts/AppLayout";

/**
 * MPay Branded Placeholders 
 * (Temporary UI for confirming navigation)
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
  return (
    <ErrorBoundary>
      <ScrollToTop />

      <RouterRoutes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/set-pin" element={<SetPin />} />

        {/* TEMPORARY UNRESTRICTED LAYOUT 
          I have commented out the <AuthGuard> so you can test all pages.
          Uncomment the <AuthGuard> tags once you confirm the UI.
        */}
        <Route
          element={
            /* <AuthGuard> */ 
              <AppLayout />
            /* </AuthGuard> */
          }
        >
          {/* Main Dashboard Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/send-money" element={<SendMoney />} />
          <Route path="/withdraw-funds" element={<WithdrawFunds />} />

          {/* KYC (Optional per Dashboard) */}
          <Route path="/kyc" element={<KYC />} />
          <Route path="/kyc/pending" element={<KYCPending />} />

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