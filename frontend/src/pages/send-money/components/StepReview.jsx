import React from "react";

const formatAmount = (amount, currency) => {
  if (!amount) return `${currency} 0`;
  return `${currency} ${Number(amount).toLocaleString()}`;
};

const StepReview = ({ formData = {} }) => {
  const country = formData?.country;
  const method = formData?.payment_method;
  const currency = country?.currency || "KES";

  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold mb-4">Review Transaction</h2>

      <div className="space-y-3 text-sm">
        {/* Country */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Country</span>
          <span className="font-medium">
            {country?.country_name || "-"}
          </span>
        </div>

        {/* Method */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Payment Method</span>
          <span className="font-medium">
            {method?.label || "-"}
          </span>
        </div>

        {/* Amount */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Amount</span>
          <span className="font-semibold text-foreground">
            {formatAmount(formData.amount, currency)}
          </span>
        </div>

        {/* Phone */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Phone</span>
          <span className="font-medium">
            {formData.phone || "-"}
          </span>
        </div>
      </div>

      {/* Info box */}
      <div className="mt-4 p-3 bg-warning/5 border border-warning/20 rounded-lg text-xs text-muted-foreground">
        Please confirm the details carefully. Transactions cannot be reversed once submitted.
      </div>
    </div>
  );
};

export default StepReview;