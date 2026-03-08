import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const PaymentMethodList = ({ onEdit, onDelete }) => {
  const methods = [
    { id: 1, type: "bank", name: "Equity Bank", details: "•••• 4567", isDefault: true, verified: true },
    { id: 2, type: "mobile", name: "M-Pesa", details: "+254 712 •••• 678", isDefault: false, verified: true }
  ];

  const getIcon = (type) => {
    const icons = { bank: "Building2", mobile: "Smartphone" };
    return icons[type] || "CreditCard";
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 flex items-center justify-between bg-muted/20 border-b border-border/50">
        <div>
          <h3 className="text-base font-bold text-foreground">Payment Methods</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Manage your payouts and billing</p>
        </div>
        <Button variant="outline" size="sm" className="h-9 font-bold text-xs uppercase tracking-tight">
          <Icon name="Plus" size={14} className="mr-1.5" />
          Add New
        </Button>
      </div>

      {/* List */}
      <div className="p-4 space-y-3">
        {methods.map((method) => (
          <div
            key={method.id}
            className="group flex items-center justify-between p-4 bg-background border border-border rounded-xl transition-all duration-200 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
          >
            <div className="flex items-center gap-4">
              {/* Icon with refined background */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border border-primary/10 transition-transform group-hover:scale-105">
                <Icon name={getIcon(method.type)} size={22} className="text-primary" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground tracking-tight">{method.name}</span>
                  {method.isDefault && (
                    <span className="bg-primary/10 text-primary text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-tighter">
                      Default
                    </span>
                  )}
                </div>
                
                {/* Monospaced details for better readability */}
                <p className="text-sm font-mono text-muted-foreground/80 mt-0.5">
                  {method.details}
                </p>

                {method.verified && (
                  <div className="flex items-center gap-1 mt-1.5 text-[10px] font-bold text-success uppercase tracking-wider">
                    <Icon name="ShieldCheck" size={12} strokeWidth={3} />
                    Verified
                  </div>
                )}
              </div>
            </div>

            {/* Actions: Refined Ghost Style */}
            <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => onEdit?.(method)}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                title="Edit Method"
              >
                <Icon name="Pencil" size={16} />
              </button>
              <button 
                onClick={() => onDelete?.(method.id)}
                className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                title="Remove Method"
              >
                <Icon name="Trash2" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Security Note */}
      <div className="px-6 py-4 bg-muted/10 border-t border-border/50 flex items-center justify-center gap-2">
        <Icon name="Lock" size={12} className="text-muted-foreground/60" />
        <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest">
          Secure 256-bit SSL Encryption
        </span>
      </div>
    </div>
  );
};

export default PaymentMethodList;