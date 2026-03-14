import React from "react";

const formatAmount = (amount, currency) => {
  const value = Number(amount) || 0;
  return `${currency} ${value.toLocaleString()}`;
};

const StepReview = ({ formData = {} }) => {
  const country = formData?.country || {};
  const method = formData?.payment_method || {};
  const account = formData?.account || {};

  const currency = country?.currency || "KES";

  const amount = Number(formData?.amount) || 0;
  const fee = amount * 0.05; // 5% fee
  const total = amount + fee;

  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold mb-4">
        Review Transaction
      </h2>

      <div className="space-y-3 text-sm">

        {/* Country */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Country</span>
          <span className="font-medium">
            {country?.country_name || "-"}
          </span>
        </div>

        {/* Payment Method */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Payment Method
          </span>
          <span className="font-medium">
            {method?.name || method?.label || method?.code || "-"}
          </span>
        </div>

        {/* Recipient Account */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Recipient Account
          </span>
          <span className="font-medium">
            {account?.account_number || "-"}
          </span>
        </div>

        {/* Amount */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Amount
          </span>
          <span className="font-medium">
            {formatAmount(amount, currency)}
          </span>
        </div>

        {/* Fee */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Processing Fee (5%)
          </span>
          <span className="font-medium">
            {formatAmount(fee, currency)}
          </span>
        </div>

        {/* Total */}
        <div className="border-t pt-3 flex justify-between text-base font-semibold">
          <span>Total</span>
          <span className="text-primary">
            {formatAmount(total, currency)}
          </span>
        </div>

        {/* Remark */}
        {formData?.note && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Remark
            </span>
            <span className="font-medium">
              {formData.note}
            </span>
          </div>
        )}

      </div>

      {/* Warning */}
      <div className="mt-4 p-3 bg-warning/5 border border-warning/20 rounded-lg text-xs text-muted-foreground">
        Please confirm the details carefully. Transactions cannot be reversed once submitted.
      </div>
    </div>
  );
};

export default StepReview;