import React, { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar";
import Icon from "../../components/AppIcon";

import AccountInfoCard from "./components/AccountInfoCard";
import EditProfileForm from "./components/EditProfileForm";
import SecuritySettings from "./components/SecuritySettings";
import BusinessInfoCard from "./components/BusinessInfoCard";
import PaymentMethodList from "./components/PaymentMethodList";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  // Redux Selectors - Mapped to your specific store keys
  const { user, loading: authLoading } = useSelector((state) => state.auth || {});
  
  // Note: we destructure 'items' and rename it to 'methods' for the UI
  const { items: methods = [], loading: paymentLoading } = useSelector((state) => state.payments || {});

  const tabs = [
    { id: "profile", label: "Profile", icon: "User" },
    ...(user?.account_type === "business"
      ? [{ id: "business", label: "Business", icon: "Building" }]
      : []),
    { id: "security", label: "Security", icon: "Shield" },
    { id: "payments", label: "Payment Methods", icon: "CreditCard" },
  ];

  if (authLoading && !user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#FDFCFB]">
        <div className="w-10 h-10 border-4 border-[#A32638] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[#5C2D25] font-bold uppercase tracking-widest text-xs">Securing Session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      <Sidebar />
      <main className="lg:ml-60 min-h-screen">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#A32638]/10 flex items-center justify-center border border-[#A32638]/5">
              <Icon name="User" size={28} color="#A32638" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-[#5C2D25] tracking-tight uppercase">Account Settings</h1>
              <p className="text-[#5C2D25]/60 font-semibold text-sm">Manage your profile and institutional preferences</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-black transition-all duration-300 uppercase tracking-tighter ${
                  activeTab === tab.id
                    ? "bg-[#A32638] text-white shadow-xl shadow-[#A32638]/20"
                    : "bg-white border border-slate-200 text-[#5C2D25]/70 hover:bg-slate-50"
                }`}
              >
                <Icon name={tab.icon} size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dynamic Content */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === "profile" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <AccountInfoCard user={user} />
                <div className="lg:col-span-2">
                  <EditProfileForm user={user} />
                </div>
              </div>
            )}
            {activeTab === "business" && <BusinessInfoCard user={user} />}
            {activeTab === "security" && <SecuritySettings user={user} />}
            {activeTab === "payments" && (
              <PaymentMethodList methods={methods} loading={paymentLoading} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;