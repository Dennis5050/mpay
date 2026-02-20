import React from "react";
import Icon from "../../../components/AppIcon";

const AccountInfoCard = ({ user }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon name="User" size={26} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.accountType} Account</p>
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-border text-sm">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Country:</strong> {user.country}</p>
      </div>
    </div>
  );
};

export default AccountInfoCard;