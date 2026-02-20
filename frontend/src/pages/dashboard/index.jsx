import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import DashboardLayout from "../../layouts/DashboardLayout";

import WelcomeBanner from "./components/WelcomeBanner";
import WalletOverview from "./components/WalletOverview";
import QuickActionButton from "./components/QuickActionButton";
import RecentTransactionCard from "./components/RecentTransactionCard";
import AccountSummaryCard from "./components/AccountSummaryCard";
import ChartsSection from "./components/ChartsSection";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // ---------------------------
  // Mock User Data
  // ---------------------------
  const userData = {
    name: "Kwame Mensah",
    accountType: "Business Account",
    email: "kwame.mensah@mpay.africa",
    vendorId: "231",
  };

  // ---------------------------
  // Quick Actions
  // ---------------------------
  const quickActions = [
    {
      icon: "Send",
      label: "Send Money",
      description: "Transfer funds across Africa",
      path: "/send-money",
      variant: "default",
    },
    {
      icon: "Wallet",
      label: "Withdraw Funds",
      description: "Withdraw to bank or mobile money",
      path: "/withdraw-funds",
      variant: "secondary",
    },
    {
      icon: "Plus",
      label: "Deposit Money",
      description: "Add funds to your wallet",
      path: "/dashboard",
      variant: "accent",
    },
  ];

  // ---------------------------
  // Mock Transactions
  // ---------------------------
  const recentTransactions = [
    {
      id: "TXN001",
      recipientName: "Amara Okafor",
      recipientAvatar:
        "https://img.rocket.new/generatedImages/rocket_gen_img_110db5bcb-1763295258787.png",
      type: "send",
      amount: 2500,
      currency: "KES",
      description: "Payment for services",
      status: "success",
      timestamp: new Date(),
    },
    {
      id: "TXN002",
      recipientName: "Chidi Nwosu",
      recipientAvatar:
        "https://img.rocket.new/generatedImages/rocket_gen_img_10d17e2d1-1763293910418.png",
      type: "receive",
      amount: 5000,
      currency: "KES",
      description: "Client payment received",
      status: "success",
      timestamp: new Date(),
    },
  ];

  // ---------------------------
  // Account Summary
  // ---------------------------
  const accountSummary = [
    {
      icon: "TrendingUp",
      label: "Monthly Volume",
      value: "KES 125,450",
      subValue: "January 2026",
      trend: 18,
      iconColor: "var(--color-success)",
    },
    {
      icon: "Target",
      label: "Savings Goal",
      value: "KES 50,000",
      subValue: "KES 35,000 achieved",
      iconColor: "var(--color-accent)",
    },
    {
      icon: "Users",
      label: "Active Recipients",
      value: "24",
      subValue: "This month",
      trend: 8,
      iconColor: "var(--color-primary)",
    },
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Welcome Banner */}
        <WelcomeBanner user={userData} />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
               {userData.name}
            </h1>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Icon name="Calendar" size={14} />
              {formatDate(currentTime)}
            </div>
          </div>

          <button
            onClick={() => navigate("/transactions")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:shadow-md transition"
          >
            <Icon name="Receipt" size={18} />
            View All Transactions
          </button>
        </div>

        {/* Wallet + User Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <WalletOverview />
          </div>

          {/* User Card */}
          <div className="card p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="User" size={18} color="#fff" />
              </div>

              <div>
                <h3 className="font-semibold text-foreground">
                  {userData.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {userData.accountType}
                </p>
              </div>
            </div>

            <div className="border-t pt-3 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Mail" size={14} />
                {userData.email}
              </div>

              <div className="flex items-center gap-2 text-sm text-success">
                <Icon name="Shield" size={14} />
                Account Verified
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <QuickActionButton key={index} {...action} />
            ))}
          </div>
        </div>

        {/* Charts Section (NEW) */}
        <ChartsSection />

        {/* Transactions + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Recent Transactions */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Recent Transactions
              </h2>

              <button
                onClick={() => navigate("/transactions")}
                className="text-primary text-sm font-medium"
              >
                View All →
              </button>
            </div>

            {recentTransactions.map((tx) => (
              <RecentTransactionCard key={tx.id} transaction={tx} />
            ))}
          </div>

          {/* Account Summary */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Account Summary
            </h2>

            {accountSummary.map((item, index) => (
              <AccountSummaryCard key={index} {...item} />
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;