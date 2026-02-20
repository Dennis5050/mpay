import React from "react";
import Icon from "../../../components/AppIcon";

const AccountInfoCard = ({ user }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">

      {/* User Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Icon name="User" size={26} color="#fff" />
        </div>

        <div>
          <h3 className="font-semibold text-lg text-foreground">
            {user.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {user.accountType} Account
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-3 pt-4 border-t border-border text-sm">

        <div className="flex items-center gap-2">
          <Icon name="Mail" size={14} />
          <span>{user.email}</span>
        </div>

        <div className="flex items-center gap-2">
          <Icon name="Phone" size={14} />
          <span>{user.phone}</span>
        </div>

        <div className="flex items-center gap-2">
          <Icon name="Globe" size={14} />
          <span>{user.country}</span>
        </div>

        <div className="flex items-center gap-2 text-success">
          <Icon name="ShieldCheck" size={14} />
          <span>Account Verified</span>
        </div>
      </div>
    </div>
  );
};

export default AccountInfoCard;