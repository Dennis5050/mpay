import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Icon from "../../components/AppIcon";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import StepCountry from "./components/StepCountry";
import StepMethod from "./components/StepMethod";
import PaymentDetailsForm from "./components/PaymentDetailsForm";
import TransactionSummary from "./components/TransactionSummary";
import ConfirmationModal from "./components/ConfirmationModal";
import SuccessModal from "./components/SuccessModal";
import StepProgress from "./components/StepProgress";

const API_BASE = "https://api.mpay.africa/api";

const SendMoney = () => {
  // ======================
  // STEP
  // ======================
  const [step, setStep] = useState(1);

  // ======================
  // FORM STATE (Senior pattern)
  // ======================
  const [formData, setFormData] = useState({
    country: null,
    payment_method: null,
    amount: "",
    recipient: null,
    note: ""
  });

  // ======================
  // UI STATE
  // ======================
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showWaiting, setShowWaiting] = useState(false);

  const userBalance = 5420.75;
  const currency = formData?.country?.currency || "KES";

  // ======================
  // FEES
  // ======================
  const calculateFee = (amount) => {
    const value = Number(amount) || 0;
    if (value <= 100) return 2.5;
    if (value <= 500) return 5.0;
    if (value <= 1000) return 8.5;
    return value * 0.01;
  };

  const amountNum = Number(formData.amount) || 0;
  const fee = calculateFee(amountNum);
  const total = amountNum + fee;

  // ======================
  // VALIDATION
  // ======================
  const validateStep = () => {
    const newErrors = {};

    if (step === 1 && !formData.country) {
      newErrors.country = "Select a country";
    }

    if (step === 2 && !formData.payment_method) {
      newErrors.method = "Select a payment method";
    }

    if (step === 3) {
      if (!formData.amount || amountNum <= 0) {
        newErrors.amount = "Enter a valid amount";
      } else if (amountNum > userBalance) {
        newErrors.amount = "Insufficient balance";
      }

     if (!formData.account?.account_number) {
        newErrors.recipient = "Select a recipient";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ======================
  // NAVIGATION
  // ======================
  const handleNext = (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    if (step < 4) setStep(step + 1);
    else setShowConfirmation(true);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // ======================
  // API TRANSACTION
  // ======================
const handleConfirmTransaction = async () => {
  try {
    setIsProcessing(true);

    const token = localStorage.getItem("mpay_token");

    const payload = {
      country_code: formData?.country?.country_code,
      currency: formData?.country?.currency,

      payment_method: {
        category: formData?.payment_method?.category,
        code: formData?.payment_method?.code,
        provider:'sasapay',
      },

      transaction: {
        type: "deposit",
        amount: amountNum,
        remark: formData?.note || ""
      },

      account: formData?.account
    };

    console.log("Payment Payload:", payload);

    // ---------------------------
    // INITIATE PAYMENT
    // ---------------------------

    const res = await fetch(`${API_BASE}/payments/initiate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log("Payment Response:", data);

    if (!res.ok || !data?.success) {
      throw new Error(data?.message || "Transaction failed");
    }

    const reference = data?.data?.reference;
    let status = data?.data?.status || "pending";

    if (!reference) {
      throw new Error("Missing transaction reference");
    }

    // ---------------------------
    // POLL PAYMENT STATUS
    // ---------------------------

    let attempts = 0;
    const MAX_ATTEMPTS = 20;

    while (
      (status === "pending" || status === "processing") &&
      attempts < MAX_ATTEMPTS
    ) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const statusRes = await fetch(
        `${API_BASE}/payments/status/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const statusData = await statusRes.json();

      console.log("Status Response:", statusData);

      status =  statusData?.status || status;

      attempts++;
    }

    setIsProcessing(false);
    setShowConfirmation(false);

    if (status === "success" || status === "completed") {
      setShowSuccess(true);
    } else if (status === "failed") {
      alert("Transaction failed");
    } else {
      alert("Transaction is still processing. Check your transactions history.");
    }

  } catch (error) {
    console.error("Payment Error:", error);
    setIsProcessing(false);
    alert(error.message || "Payment failed");
  }
};

  // ======================
  // RESET
  // ======================
  const handleSuccessClose = () => {
    setShowSuccess(false);
    setStep(1);
    setFormData({
      country: null,
      payment_method: null,
      amount: "",
      recipient: null,
      note: ""
    });
  };

  // ======================
  // CONFIRMATION DATA
  // ======================
  const transactionData = {
    amount: amountNum.toFixed(2),
    recipient: formData.recipient,
    fee: fee.toFixed(2),
    total: total.toFixed(2),
    currency,
    transactionRef: `TXN${Date.now().toString().slice(-8)}`,
    timestamp: new Date().toISOString()
  };

  // ======================
  // UI
  // ======================
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />

      <main className="flex-1 lg:ml-60 p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon name="Send" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Send Money</h1>
              <p className="text-sm text-muted-foreground">
                Transfer funds across Africa
              </p>
            </div>
          </div>

          <StepProgress currentStep={step} />

          {/* Balance */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Available Balance</p>
            <p className="text-2xl font-bold">
              {currency} {userBalance.toFixed(2)}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleNext}
                className="bg-card border border-border rounded-xl p-6 space-y-6"
              >

                {/* STEP 1 */}
              {step === 1 && (
  <StepCountry
    formData={formData}
    setFormData={setFormData}
  />
)}

                {/* STEP 2 */}
               {step === 2 && (
  <StepMethod
    formData={formData}
    setFormData={setFormData}
  />
)}

                {/* STEP 3 */}
              {step === 3 && (
  <PaymentDetailsForm
    formData={formData}
    setFormData={setFormData}
    paymentMethod={formData.payment_method}
    errors={errors}
  />
)}

                {/* STEP 4 */}
                {step === 4 && (
                  <div className="space-y-2 text-sm">
                    <h2 className="text-lg font-semibold">
                      Review Transaction
                    </h2>
                    <p>Country: {formData.country?.country_code}</p>
                    <p>Method: {formData.payment_method?.label}</p>
                    <p>Amount: {currency} {amountNum.toFixed(2)}</p>
                    <p>Fee: {currency} {fee.toFixed(2)}</p>
                    <p>Total: {currency} {total.toFixed(2)}</p>
                    <p>Recipient: {formData.recipient?.name || "-"}</p>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex justify-between pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={step === 1}
                    onClick={handleBack}
                  >
                    Back
                  </Button>

                  <Button
                    type="submit"
                    iconName={step === 4 ? "Send" : "ArrowRight"}
                    iconPosition="right"
                  >
                    {step === 4 ? "Confirm & Send" : "Next"}
                  </Button>
                </div>
              </form>
            </div>

            {/* RIGHT */}
            <TransactionSummary
              amount={amountNum.toFixed(2)}
              recipient={formData.recipient}
              currency={currency}
            />
          </div>
        </div>
      </main>

      {/* MODALS */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmTransaction}
        transactionData={transactionData}
        isProcessing={isProcessing}
      />

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        transactionData={transactionData}
      />
    </div>
  );
};

export default SendMoney;