import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Icon from '../../components/AppIcon';
import WalletCard from './components/WalletCard';
import QuickActionButton from './components/QuickActionButton';
import RecentTransactionCard from './components/RecentTransactionCard';
import AccountSummaryCard from './components/AccountSummaryCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const userData = {
    name: "Kwame Mensah",
    accountType: "Business Account",
    email: "kwame.mensah@mpay.africa"
  };

  const walletData = {
    balance: 45750.50,
    currency: "GHS",
    trend: "up",
    trendPercentage: 12.5
  };

  const quickActions = [
  {
    icon: "Send",
    label: "Send Money",
    description: "Transfer funds across Africa",
    path: "/send-money",
    variant: "default"
  },
  {
    icon: "Wallet",
    label: "Withdraw Funds",
    description: "Withdraw to bank or mobile money",
    path: "/withdraw-funds",
    variant: "secondary"
  },
  {
    icon: "Plus",
    label: "Deposit Money",
    description: "Add funds to your wallet",
    path: "/dashboard",
    variant: "accent"
  }];


  const recentTransactions = [
  {
    id: "TXN001",
    recipientName: "Amara Okafor",
    recipientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_110db5bcb-1763295258787.png",
    recipientAvatarAlt: "Professional African woman with braided hair wearing blue business attire smiling warmly at camera",
    type: "send",
    amount: 2500.00,
    currency: "GHS",
    description: "Payment for services",
    status: "success",
    timestamp: new Date(2026, 0, 29, 10, 30)
  },
  {
    id: "TXN002",
    recipientName: "Chidi Nwosu",
    recipientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10d17e2d1-1763293910418.png",
    recipientAvatarAlt: "Young African businessman in grey suit with confident smile standing in modern office setting",
    type: "receive",
    amount: 5000.00,
    currency: "GHS",
    description: "Client payment received",
    status: "success",
    timestamp: new Date(2026, 0, 29, 9, 15)
  },
  {
    id: "TXN003",
    recipientName: "Fatima Hassan",
    recipientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14e7e49d1-1763297276274.png",
    recipientAvatarAlt: "Professional African woman wearing traditional headwrap and modern business jacket with warm expression",
    type: "send",
    amount: 1200.00,
    currency: "GHS",
    description: "Supplier payment",
    status: "pending",
    timestamp: new Date(2026, 0, 29, 8, 45)
  },
  {
    id: "TXN004",
    recipientName: "Kofi Asante",
    recipientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12f9cd718-1763293462682.png",
    recipientAvatarAlt: "Smiling African man in casual white shirt with glasses in bright outdoor setting",
    type: "withdraw",
    amount: 3000.00,
    currency: "GHS",
    description: "Bank withdrawal",
    status: "success",
    timestamp: new Date(2026, 0, 28, 16, 20)
  },
  {
    id: "TXN005",
    recipientName: "Zainab Musa",
    recipientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1dce1c59b-1763296539991.png",
    recipientAvatarAlt: "Professional African woman in elegant purple hijab and business attire with confident smile",
    type: "receive",
    amount: 4500.00,
    currency: "GHS",
    description: "Invoice payment",
    status: "success",
    timestamp: new Date(2026, 0, 28, 14, 10)
  }];


  const accountSummary = [
  {
    icon: "TrendingUp",
    label: "Monthly Volume",
    value: "₵125,450",
    subValue: "January 2026",
    trend: 18,
    iconColor: "var(--color-success)"
  },
  {
    icon: "Target",
    label: "Savings Goal",
    value: "₵50,000",
    subValue: "₵35,000 achieved",
    trend: null,
    iconColor: "var(--color-accent)"
  },
  {
    icon: "Users",
    label: "Active Recipients",
    value: "24",
    subValue: "This month",
    trend: 8,
    iconColor: "var(--color-primary)"
  }];


  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:ml-60 min-h-screen">
        <div className="p-4 md:p-5 lg:p-6">
          <div className="max-w-7xl mx-auto space-y-5 md:space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-1">
                  Welcome back, {userData?.name}
                </h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-caption">
                  <Icon name="Calendar" size={14} color="currentColor" />
                  <span>{formatDate(currentTime)}</span>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/transactions')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card border border-border hover:shadow-md hover:border-primary/20 transition-all duration-250 focus-ring">

                <Icon name="Receipt" size={18} color="var(--color-primary)" />
                <span className="text-sm font-body font-medium text-foreground">View All Transactions</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
              <div className="lg:col-span-2">
                <WalletCard {...walletData} />
              </div>
              
              <div className="card">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
                    <Icon name="User" size={20} color="#FFFFFF" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-heading font-semibold text-foreground truncate">
                      {userData?.name}
                    </h3>
                    <p className="text-xs text-muted-foreground font-caption truncate">
                      {userData?.accountType}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Icon name="Mail" size={14} color="var(--color-muted-foreground)" />
                    <span className="text-xs text-muted-foreground font-caption truncate">
                      {userData?.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Shield" size={14} color="var(--color-success)" />
                    <span className="text-xs text-success font-caption font-medium">
                      Account Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {quickActions?.map((action, index) =>
                <QuickActionButton key={index} {...action} />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                    Recent Transactions
                  </h2>
                  <button
                    onClick={() => navigate('/transactions')}
                    className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-body font-medium transition-colors duration-250">

                    <span>View All</span>
                    <Icon name="ArrowRight" size={14} color="currentColor" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {recentTransactions?.map((transaction) =>
                  <RecentTransactionCard key={transaction?.id} transaction={transaction} />
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                  Account Summary
                </h2>
                <div className="space-y-4">
                  {accountSummary?.map((summary, index) =>
                  <AccountSummaryCard key={index} {...summary} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default Dashboard;