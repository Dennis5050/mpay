import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";

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

/* ========= NEW PLACEHOLDER PAGES =========
Create simple components if they don't exist yet
*/
const Payments = () => <div>Payments Page</div>;
const ApiTransactions = () => <div>API Transactions Page</div>;
const Transfer = () => <div>Internal Transfer Page</div>;
const Services = () => <div>Services Page</div>;
const Docs = () => <div>Documentation Page</div>;
const Support = () => <div>Support Page</div>;

const Routes = () => {
  return (
      <ErrorBoundary>
        <ScrollToTop />

        <RouterRoutes>

          {/* Public */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/set-pin" element={<SetPin />} />

          {/* Protected Layout */}
          <Route
            element={
              <AuthGuard>
                <AppLayout />
              </AuthGuard>
            }
          >
            {/* Main */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/send-money" element={<SendMoney />} />
            <Route path="/withdraw-funds" element={<WithdrawFunds />} />

            {/* KYC */}
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

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </RouterRoutes>
      </ErrorBoundary>
  );
};

export default Routes;