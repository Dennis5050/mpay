import React, { useState, useEffect } from "react";
import Input from "../../../components/ui/Input";
import Icon from "../../../components/AppIcon";

const PaymentDetailsForm = ({
  formData,
  setFormData,
  paymentMethod,
  errors = {}
}) => {
  const [amount, setAmount] = useState(formData?.amount || "");
  const [account, setAccount] = useState(
    formData?.account?.account_number || ""
  );
  const [remark, setRemark] = useState(formData?.note || "");

  const min = paymentMethod?.min || 0;
  const max = paymentMethod?.max || 0;
  const currency = paymentMethod?.currency || "";

  // Sync state to parent
  useEffect(() => {
    setFormData({
      ...formData,
      amount,
      note: remark,
      account: {
        phone: account,
        account_number: account
      }
    });
  }, [amount, account, remark]);

  // Amount validation
  const amountError = () => {
    if (!amount) return "";
    const value = Number(amount);

    if (min && value < min) {
      return `Minimum amount is ${currency} ${min.toLocaleString()}`;
    }

    if (max && value > max) {
      return `Maximum amount is ${currency} ${max.toLocaleString()}`;
    }

    return "";
  };

  const methodType = paymentMethod?.category;

  return (
    <div className="card p-6 space-y-5">

      <div>
        <h2 className="text-lg font-semibold">
          Enter Transaction Details
        </h2>
        <p className="text-sm text-muted-foreground">
          Provide the payment information to complete your transaction
        </p>
      </div>

      {/* AMOUNT */}

      <Input
        label="Amount"
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        error={amountError() || errors.amount}
        required
      />

      {/* LIMIT DISPLAY */}

      {min && max && (
        <p className="text-xs text-muted-foreground">
          Min: {currency} {min.toLocaleString()} •
          Max: {currency} {max.toLocaleString()}
        </p>
      )}

      {/* PHONE OR ACCOUNT */}

      {methodType === "mobile_money" && (
        <Input
          label="Mobile Number"
          type="tel"
          placeholder="e.g. +254712345678"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          error={errors.account}
          required
        />
      )}

      {methodType === "banks" && (
        <Input
          label="Bank Account Number"
          type="text"
          placeholder="Enter account number"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          error={errors.account}
          required
        />
      )}

      {/* REMARK */}

      <div>
        <label className="text-sm font-medium">
          Payment Remark
        </label>

        <textarea
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Optional note for this transaction"
          rows={3}
          className="w-full mt-2 border rounded-lg px-3 py-2 text-sm resize-none"
        />
      </div>

      {/* INFO BOX */}

      <div className="flex gap-2 p-3 bg-muted rounded-lg text-sm">
        <Icon name="Info" size={16} />
        <p className="text-muted-foreground">
          Ensure the recipient details are correct before continuing.
        </p>
      </div>
    </div>
  );
};

export default PaymentDetailsForm;