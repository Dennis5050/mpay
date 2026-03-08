import React from "react";
import Icon from "../../../components/AppIcon";

const AccountInfoCard = ({ user }) => {
  return (
    <div className="group bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      
      {/* User Profile Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 ring-4 ring-primary/5">
            <Icon name="User" size={26} className="text-primary" />
          </div>
          {/* Status Badge */}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-card rounded-full" />
        </div>

        <div>
          <h3 className="font-bold text-lg text-foreground tracking-tight leading-tight">
            {user.name}
          </h3>
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">
            {user.accountType} Account
          </span>
        </div>
      </div>

      {/* Information Section */}
      <div className="grid grid-cols-1 gap-4 pt-5 border-t border-border/60">
        
        {/* Detail Item Wrapper */}
        {[
          { label: "Email Address", value: user.email, icon: "Mail" },
          { label: "Phone Number", value: user.phone, icon: "Phone" },
          { label: "Country / Region", value: user.country, icon: "Globe" }
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 group/item">
            <div className="p-2 bg-muted/50 rounded-lg text-muted-foreground group-hover/item:text-primary transition-colors">
              <Icon name={item.icon} size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-wide">
                {item.label}
              </span>
              <span className="text-sm font-medium text-foreground leading-snug">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountInfoCard;