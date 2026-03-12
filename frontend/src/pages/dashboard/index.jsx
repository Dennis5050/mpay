import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Added to access store
import Icon from "../../components/AppIcon";
import DashboardLayout from "../../layouts/DashboardLayout";

// Child Components
import WelcomeBanner from "./components/WelcomeBanner";
import WalletOverview from "./components/WalletOverview";
import QuickActionButton from "./components/QuickActionButton";
import RecentTransactionCard from "./components/RecentTransactionCard";
import ChartsSection from "./components/ChartsSection";

const Dashboard = () => {
  const navigate = useNavigate();

  // 1. Get data from Redux Store
  // We use the names defined in our authSlice initial state
  const { user, dashboard: summary, loading } = useSelector((state) => state.auth);

  // 2. Local State for UI only (Clock)
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const quickActions = [
    {
      icon: "Send",
      label: "Send Money",
      description: "Transfer funds across Africa",
      path: "/send-money",
    },
    {
      icon: "Wallet",
      label: "Withdraw Funds",
      description: "To bank or mobile money",
      path: "/withdraw-funds",
    },
    {
      icon: "Plus",
      label: "Deposit Money",
      description: "Add funds to your wallet",
      path: "/deposit",
    },
  ];

  const formatDate = useCallback((date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  // 3. Render Loading State (Triggered by Redux)
  if (loading && !summary) {
    return (
      <DashboardLayout>
        <div className="p-10 text-center text-muted-foreground animate-pulse">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold text-slate-600">Syncing with MPay Infrastructure...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-y-10 pb-12">
        
        {/* Header */}
        <header className="flex justify-between items-center border-b pb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-tight">
              Financial Overview
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Icon name="Calendar" size={16} />
              <span className="font-medium">{formatDate(currentTime)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/transactions")}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#A32A29] text-white rounded-lg font-bold transition-transform active:scale-95 shadow-md shadow-red-900/20"
          >
            <Icon name="Receipt" size={18} />
            Transactions
          </button>
        </header>

        {/* Welcome - Now uses 'user' from Redux */}
        <WelcomeBanner user={user} />

        {/* Wallets - Now uses 'summary' from Redux */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-slate-800">
            Wallet Overview
          </h2>
          <WalletOverview wallets={summary?.wallets} />
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-slate-800">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, i) => (
              <QuickActionButton key={i} {...action} />
            ))}
          </div>
        </section>

        {/* Charts + Transactions */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          <section className="xl:col-span-2">
            <ChartsSection data={summary?.analytics} />
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-slate-800">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {summary?.recent_transactions?.length ? (
                summary.recent_transactions.map((tx) => (
                  <RecentTransactionCard key={tx.id} transaction={tx} />
                ))
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <p className="text-sm text-muted-foreground font-medium">
                    No recent transactions found
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;