import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Icon from "../../components/AppIcon";

import AccountInfoCard from "./components/AccountInfoCard";
import EditProfileForm from "./components/EditProfileForm";
import SecuritySettings from "./components/SecuritySettings";
import BusinessInfoCard from "./components/BusinessInfoCard";
import PaymentMethodList from "./components/PaymentMethodList";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const user = {
    name: "Kwame Mensah",
    email: "kwame.mensah@mpay.africa",
    phone: "+233 24 123 4567",
    accountType: "Business",
    country: "Ghana",
    businessName: "Kwame Enterprises Ltd",
    businessId: "MPA-458921",
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: "User" },
    { id: "business", label: "Business", icon: "Building" },
    { id: "security", label: "Security", icon: "Shield" },
    { id: "payments", label: "Payment Methods", icon: "CreditCard" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="lg:ml-60 min-h-screen">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon name="User" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Account Settings</h1>
              <p className="text-muted-foreground">
                Manage your profile and account preferences
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-border pb-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "bg-card border border-border hover:border-primary/40"
                }`}
              >
                <Icon name={tab.icon} size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === "profile" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <AccountInfoCard user={user} />
              <EditProfileForm user={user} />
            </div>
          )}

          {activeTab === "business" && (
            <BusinessInfoCard user={user} />
          )}

          {activeTab === "security" && (
            <SecuritySettings />
          )}

          {activeTab === "payments" && (
            <PaymentMethodList />
          )}

        </div>
      </main>
    </div>
  );
};

export default AccountPage;