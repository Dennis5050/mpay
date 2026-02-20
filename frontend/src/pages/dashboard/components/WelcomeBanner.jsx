import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const WelcomeBanner = ({ user }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(user.vendorId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-green-50 border border-green-100 rounded-xl p-5">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <Icon name="Building" size={18} color="#16a34a" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Welcome back! 👋
          </h2>
          <p className="text-sm text-muted-foreground">
            You're viewing <span className="text-primary font-medium">{user.name}</span>'s account
          </p>

          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm text-muted-foreground">Vendor ID:</span>
            <span className="px-2 py-1 bg-muted rounded text-sm font-medium">
              {user.vendorId}
            </span>

            <button
              onClick={handleCopy}
              className="text-sm border px-3 py-1 rounded hover:bg-muted"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
