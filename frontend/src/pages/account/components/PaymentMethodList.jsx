import React from "react";
import Icon from "../../../components/AppIcon";

const PaymentMethodList = ({ methods = [], selectedId, onSelect }) => {
  const maskAccount = (acc) => {
    if (!acc) return "";
    return `**** ${acc.slice(-4)}`;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Payment Methods</h3>

        <button className="flex items-center gap-1 text-sm text-primary font-medium hover:underline">
          <Icon name="Plus" size={14} />
          Add Method
        </button>
      </div>

      {methods.length === 0 ? (
        <div className="py-10 text-center border-2 border-dashed border-border rounded-lg bg-muted/20">
          <Icon
            name="CreditCard"
            size={32}
            className="mx-auto mb-3 text-muted-foreground/50"
          />
          <p className="text-sm text-muted-foreground">
            No payment methods added yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {methods.map((method) => {
            const isSelected = selectedId === method.id;

            return (
              <div
                key={method.id}
                onClick={() => onSelect(method.id)}
                className={`cursor-pointer p-4 rounded-lg border transition
                  ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Icon
                        name={
                          method.type === "mobile"
                            ? "Smartphone"
                            : "Building2"
                        }
                        size={18}
                      />
                    </div>

                    <div>
                      <p className="font-medium">{method.provider}</p>
                      <p className="text-sm text-muted-foreground">
                        {maskAccount(method.accountNumber)}
                      </p>
                    </div>
                  </div>

                  {method.isDefault && (
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                      Default
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-4 border-t pt-3">
        Payment details are encrypted and securely stored.
      </p>
    </div>
  );
};

export default PaymentMethodList;