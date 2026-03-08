import React from "react";
import Icon from "../../../components/AppIcon";

const PaymentMethodList = ({ methods = [], selectedId, onSelect }) => {
  const maskAccount = (acc) => {
    if (!acc) return "";
    return `•••• •••• ${acc.slice(-4)}`; // Use standard bullets for a cleaner look
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="p-6 pb-4 flex items-center justify-between border-b border-border/50 bg-muted/5 mt-[-1px]">
        <div>
          <h3 className="text-base font-bold text-foreground">Payment Methods</h3>
          <p className="text-xs text-muted-foreground">Manage your linked accounts</p>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors border border-primary/20">
          <Icon name="Plus" size={14} strokeWidth={3} />
          Add New
        </button>
      </div>

      <div className="p-6">
        {methods.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl bg-muted/10">
            <div className="p-4 bg-background rounded-full shadow-sm mb-4">
              <Icon name="CreditCard" size={28} className="text-muted-foreground/40" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">No payment methods found</p>
            <button className="mt-2 text-xs text-primary hover:underline">Get started by adding one</button>
          </div>
        ) : (
          <div className="space-y-3">
            {methods.map((method) => {
              const isSelected = selectedId === method.id;

              return (
                <button
                  key={method.id}
                  onClick={() => onSelect(method.id)}
                  className={`w-full text-left flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 outline-none
                    ${isSelected 
                      ? "border-primary bg-primary/[0.02] shadow-sm ring-4 ring-primary/5" 
                      : "border-border hover:border-border-hover hover:bg-muted/30"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon Container */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors
                      ${isSelected ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                      <Icon 
                        name={method.type === "mobile" ? "Smartphone" : "Building2"} 
                        size={22} 
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-foreground">{method.provider}</p>
                        {method.isDefault && (
                          <span className="text-[10px] font-bold uppercase tracking-tighter px-1.5 py-0.5 bg-muted text-muted-foreground rounded border border-border">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-mono text-muted-foreground mt-0.5">
                        {maskAccount(method.accountNumber)}
                      </p>
                    </div>
                  </div>

                  {/* Radio-style Indicator */}
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                    ${isSelected ? "border-primary bg-primary" : "border-border bg-transparent"}`}>
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Footer Security Note */}
        <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-muted-foreground/60">
          <Icon name="ShieldCheck" size={14} />
          <p className="text-[11px] font-medium leading-none">
            PCI-DSS Compliant • 256-bit Encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodList;