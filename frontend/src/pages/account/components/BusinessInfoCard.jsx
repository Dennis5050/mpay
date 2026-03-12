import React from "react";
import Icon from "../../../components/AppIcon";

const BusinessInfoCard = ({ user }) => {

  if (!user) return null;

  const businessName = user.business_name || user.businessName || "-";
  const businessId = user.business_id || user.businessId || "-";

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="Building" size={18} className="text-primary" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Business Details
          </h3>
        </div>

        <span className="text-[10px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase">
          {user.kyc_status === "verified" ? "Verified Entity" : "Pending"}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">

          {/* Business Name */}
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-medium text-muted-foreground">
              Legal Business Name
            </label>
            <p className="text-base font-semibold text-foreground leading-none">
              {businessName}
            </p>
          </div>

          {/* Registration ID */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">
              Registration ID
            </label>
            <div className="flex items-center gap-2">
              <code className="text-sm font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">
                {businessId}
              </code>
            </div>
          </div>

          {/* Country */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">
              Jurisdiction
            </label>
            <p className="text-sm font-medium flex items-center gap-1.5">
              <Icon name="MapPin" size={14} className="text-muted-foreground" />
              {user.country || "-"}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default BusinessInfoCard;