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
    <div className="min-h-screen bg-[#FDFCFB]">
      <Sidebar />

      <main className="lg:ml-60 min-h-screen">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex items-center gap-3">
            {/* Icon background changed to Equity Maroon tint */}
            <div className="w-12 h-12 rounded-xl bg-[#A32638]/10 flex items-center justify-center">
              {/* Icon color set to Equity Maroon */}
              <Icon name="User" size={24} color="#A32638" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-[#5C2D25]">Account Settings</h1>
              <p className="text-[#5C2D25]/60 font-medium">
                Manage your profile and account preferences on MPay Africa
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-[#A32638] text-white shadow-lg shadow-[#A32638]/20"
                    : "bg-white border border-slate-200 text-[#5C2D25]/70 hover:border-[#FFB612] hover:text-[#5C2D25]"
                }`}
              >
                <Icon name={tab.icon} size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
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

        </div>
      </main>
    </div>
  );
};

export default AccountPage;