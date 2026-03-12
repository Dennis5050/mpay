import React from "react";
import Icon from "../../../components/AppIcon";

const AccountInfoCard = ({ user }) => {
  if (!user) return null;

  const accountType = user.account_type || user.accountType || "Personal";

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">

      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-6">

        {/* Avatar */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold text-lg shadow-sm">
            {initials}
          </div>

          {/* Online Indicator */}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        {/* Name + Type */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-slate-900 leading-tight">
            {user.name}
          </h3>

          <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary uppercase tracking-wide">
            {accountType} Account
          </span>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-slate-200 pt-5 space-y-4">

        {[
          { icon: "Mail", value: user.email, label: "Email Address" },
          { icon: "Phone", value: user.phone, label: "Phone Number" },
          { icon: "Globe", value: user.country, label: "Country / Region" },
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">

            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
              <Icon name={item.icon} size={16} />
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {item.label}
              </span>

              <span className="text-sm font-medium text-slate-900">
                {item.value || "-"}
              </span>
            </div>

          </div>
        ))}

        {/* KYC Status */}
        <div
          className={`flex items-center gap-2 mt-4 px-3 py-2 rounded-lg border text-xs font-semibold
          ${
            user.kyc_status === "verified"
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-amber-50 border-amber-200 text-amber-700"
          }`}
        >
          <Icon name="ShieldCheck" size={15} />

          {user.kyc_status === "verified"
            ? "Identity Verified"
            : "Verification Pending"}
        </div>

      </div>
    </div>
  );
};

export default AccountInfoCard;