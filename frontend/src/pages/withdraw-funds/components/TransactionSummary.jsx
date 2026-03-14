import React, { useMemo } from "react";
import Icon from "../../../components/AppIcon";

const formatCurrency = (amount, currency) => {
  const value = Number(amount) || 0;

  return `${currency} ${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

const TransactionSummary = ({
  amount = 0,
  account = null,
  currency = "KES",
  fee: apiFee = null
}) => {

  // Memoized calculations
  const { fee, totalAmount } = useMemo(() => {

    const numericAmount = Number(amount) || 0;

    const calculatedFee =
      apiFee !== null
        ? Number(apiFee)
        : numericAmount * 0.05; // 5% fee

    const total = numericAmount + calculatedFee;

    return {
      fee: calculatedFee,
      totalAmount: total
    };

  }, [amount, apiFee]);

  const summaryItems = [
    {
      label: "Transfer Amount",
      value: formatCurrency(amount, currency),
      icon: "Banknote",
      highlight: false
    },
    {
      label: "Transaction Fee (5%)",
      value: formatCurrency(fee, currency),
      icon: "Receipt",
      highlight: false
    },
    {
      label: "Total Debit",
      value: formatCurrency(totalAmount, currency),
      icon: "CreditCard",
      highlight: true
    }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 space-y-4">

      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-border">
        <Icon name="FileText" size={20} color="var(--color-primary)" />
        <h3 className="text-lg font-semibold">
          Transaction Summary
        </h3>
      </div>

      {/* Summary Items */}
      <div className="space-y-3">

        {summaryItems.map((item, index) => (

          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg ${
              item.highlight
                ? "bg-primary/5 border border-primary/20"
                : "bg-muted/50"
            }`}
          >

            <div className="flex items-center gap-2">

              <div
                className={`p-1.5 rounded-md ${
                  item.highlight ? "bg-primary/10" : "bg-card"
                }`}
              >
                <Icon
                  name={item.icon}
                  size={16}
                  color={
                    item.highlight
                      ? "var(--color-primary)"
                      : "var(--color-muted-foreground)"
                  }
                />
              </div>

              <span className="text-sm">
                {item.label}
              </span>

            </div>

            <span
              className={`font-semibold ${
                item.highlight
                  ? "text-base text-primary"
                  : "text-sm"
              }`}
            >
              {item.value}
            </span>

          </div>

        ))}

      </div>

      {/* Recipient Account */}
      {account?.account_number && (
        <div className="pt-3 border-t border-border">

          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">

            <Icon
              name="Info"
              size={18}
              color="var(--color-primary)"
              className="flex-shrink-0 mt-0.5"
            />

            <div>

              <p className="text-xs text-muted-foreground">
                Funds will be sent to
                <span className="font-medium text-foreground">
                  {" "}
                  {account.account_number}
                </span>
              </p>

              <p className="text-xs text-muted-foreground mt-1">
                Estimated delivery: 2–5 minutes
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Security */}
      <div className="pt-3 border-t border-border">

        <div className="flex items-center gap-2 text-xs text-muted-foreground">

          <Icon
            name="Shield"
            size={14}
            color="var(--color-success)"
          />

          <span>
            Secured by MPay Africa encryption
          </span>

        </div>

      </div>

    </div>
  );
};

export default TransactionSummary;