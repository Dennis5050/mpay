import React from "react";
import Icon from "../../../components/AppIcon";

const AccountInfoCard = ({ user }) => {
  return (
    <div className="group bg-card border border-border rounded-xl p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
      
      {/* User Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-inner">
            <Icon name="User" size={26} color="#fff" />
          </div>
          {/* Subtle Status Indicator */}
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-success border-2 border-card rounded-full"></span>
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-lg text-foreground leading-tight tracking-tight">
            {user.name}
          </h3>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary/10 text-secondary-foreground border border-secondary/20 uppercase tracking-wider">
            {user.accountType}
          </span>
        </div>
      </div>

      {/* Info Grid */}
      <div className="space-y-4 pt-5 border-t border-border/60">
        
        {/* Contact Items */}
        {[
          { icon: "Mail", value: user.email, label: "Email Address" },
          { icon: "Phone", value: user.phone, label: "Phone Number" },
          { icon: "Globe", value: user.country, label: "Location" },
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 group/item cursor-default">
            <div className="mt-0.5 text-muted-foreground group-hover/item:text-primary transition-colors">
              <Icon name={item.icon} size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-muted-foreground/70 tracking-widest">
                {item.label}
              </span>
              <span className="text-sm font-medium text-foreground/90">
                {item.value}
              </span>
            </div>
          </div>
        ))}

        {/* Verification Badge */}
        <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-success/5 rounded-lg border border-success/10 text-success">
          <Icon name="ShieldCheck" size={16} />
          <span className="text-xs font-semibold">Verified Identity</span>
        </div>
      </div>
    </div>
  );
};

export default AccountInfoCard;