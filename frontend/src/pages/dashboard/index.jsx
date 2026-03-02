import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import DashboardLayout from "../../layouts/DashboardLayout";

// Component Imports
import WelcomeBanner from "./components/WelcomeBanner";
import WalletOverview from "./components/WalletOverview";
import QuickActionButton from "./components/QuickActionButton";
import RecentTransactionCard from "./components/RecentTransactionCard";
import AccountSummaryCard from "./components/AccountSummaryCard";
import ChartsSection from "./components/ChartsSection";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Clock Update - strictly for display
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // --- Memoized User Context ---
  const userData = useMemo(() => ({
    name: "Kwame Mensah",
    accountType: "Business Account",
    email: "kwame.mensah@mpay.africa",
    vendorId: "231",
    isVerified: true,
  }), []);

  // --- Actions & Summary Data ---
  const quickActions = useMemo(() => [
    { icon: "Send", label: "Send Money", description: "Transfer funds across Africa", path: "/send-money", variant: "default" },
    { icon: "Wallet", label: "Withdraw Funds", description: "To bank or mobile money", path: "/withdraw-funds", variant: "secondary" },
    { icon: "Plus", label: "Deposit Money", description: "Add funds to your wallet", path: "/dashboard", variant: "accent" },
  ], []);

  const accountSummary = useMemo(() => [
    { icon: "TrendingUp", label: "Monthly Volume", value: "KES 125,450", subValue: "Jan 2026", trend: 18, iconColor: "text-success" },
    { icon: "Target", label: "Savings Goal", value: "KES 50,000", subValue: "70% achieved", iconColor: "text-accent" },
    { icon: "Users", label: "Active Recipients", value: "24", subValue: "This month", trend: 8, iconColor: "text-primary" },
  ], []);

  // Format utility
  const formatDate = useCallback((date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-y-10 pb-12">
        
        {/* --- Header Section --- */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Financial Overview</h1>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Icon name="Calendar" size={16} className="text-primary/70" />
              {formatDate(currentTime)}
            </div>
          </div>
          
          <button
            onClick={() => navigate("/transactions")}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all"
          >
            <Icon name="Receipt" size={18} />
            Transactions
          </button>
        </header>

        {/* --- Hero Grid: Welcome & Profile --- */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <section className="xl:col-span-8">
            <WelcomeBanner user={userData} />
          </section>
          <aside className="xl:col-span-4">
             <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 h-full">
                   <div className="relative shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <Icon name="User" size={32} />
                      </div>
                      {userData.isVerified && (
                        <div className="absolute -top-1 -right-1 bg-success text-white rounded-full p-1 border-4 border-card">
                          <Icon name="Check" size={12} strokeWidth={4} />
                        </div>
                      )}
                   </div>
                   <div className="min-w-0">
                      <h3 className="font-bold text-xl truncate">{userData.name}</h3>
                      <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{userData.accountType}</p>
                   </div>
                </div>
             </div>
          </aside>
        </div>

        {/* --- Primary Financial Row --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">Wallet Status</h2>
            </div>
            <WalletOverview />
          </section>
          
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <Icon name="Activity" size={22} className="text-primary" />
              Key Insights
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {accountSummary.map((item, idx) => (
                <AccountSummaryCard key={idx} {...item} />
              ))}
            </div>
          </section>
        </div>

        {/* --- Quick Actions Slider/Grid --- */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, idx) => (
              <QuickActionButton key={idx} {...action} />
            ))}
          </div>
        </section>

        {/* --- Analytics & Transactions Row --- */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          <section className="xl:col-span-2 space-y-6">
            <h2 className="text-xl font-bold tracking-tight">Revenue Analytics</h2>
            <div className="p-4 bg-card border border-border rounded-2xl">
              <ChartsSection />
            </div>
          </section>
          
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold tracking-tight">Recent Activity</h2>
              <button 
                onClick={() => navigate("/transactions")}
                className="text-sm font-bold text-primary hover:text-primary/80 transition-colors"
              >
                View Details
              </button>
            </div>
            
            <div className="space-y-3 bg-card/50 p-4 rounded-2xl border border-dashed border-border/60">
              {/* Optional: Add a map here if you have transaction data */}
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Icon name="Inbox" size={40} className="text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">No recent transactions to display.</p>
              </div>
            </div>
          </section>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;