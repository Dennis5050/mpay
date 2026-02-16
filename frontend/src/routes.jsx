import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Transactions from './pages/transactions';
import WithdrawFunds from './pages/withdraw-funds';
import Login from './pages/login';
import SendMoney from './pages/send-money';
import Dashboard from './pages/dashboard';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Login />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/withdraw-funds" element={<WithdrawFunds />} />
        <Route path="/login" element={<Login />} />
        <Route path="/send-money" element={<SendMoney />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
