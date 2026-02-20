import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const PaymentMethodList = () => {
  // Mock data (later from API)
  const methods = [
    {
      id: 1,
      type: "bank",
      name: "Equity Bank",
      details: "**** 4567",
      isDefault: true,
      verified: true
    },
    {
      id: 2,
      type: "mobile",
      name: "M-Pesa",
      details: "+254 712 **** 678",
      isDefault: false,
      verified: true
    }
  ];

  const getIcon = (type) => {
    switch (type) {
      case "bank":
        return "Building2";
      case "mobile":
        return "Smartphone";
      default:
        return "CreditCard";
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Payment Methods
        </h3>

        <Button variant="default" size="sm" iconName="Plus">
          Add Method
        </Button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {methods.length > 0 ? (
          methods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-sm transition"
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon
                    name={getIcon(method.type)}
                    size={20}
                    color="var(--color-primary)"
                  />
                </div>

                <div>
                  <p className="font-medium text-foreground">
                    {method.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {method.details}
                  </p>

                  <div className="flex items-center gap-2 mt-1 text-xs">
                    {method.verified && (
                      <span className="text-success flex items-center gap-1">
                        <Icon name="ShieldCheck" size={12} />
                        Verified
                      </span>
                    )}

                    {method.isDefault && (
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-md hover:bg-muted transition">
                  <Icon name="Pencil" size={16} />
                </button>

                <button className="p-2 rounded-md hover:bg-muted transition text-danger">
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-muted-foreground text-sm">
            No payment methods added yet.
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="text-xs text-muted-foreground border-t pt-3">
        Your payment methods are encrypted and securely stored.
      </div>
    </div>
  );
};

export default PaymentMethodList;