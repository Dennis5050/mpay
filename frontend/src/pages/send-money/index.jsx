import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Icon from "../../components/AppIcon";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import RecipientSelector from "./components/RecipientSelector";
import TransactionSummary from "./components/TransactionSummary";
import ConfirmationModal from "./components/ConfirmationModal";
import SuccessModal from "./components/SuccessModal";
import StepProgress from "./components/StepProgress";

const API_BASE = "https://app.mpayafrica.site/api";

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

      if (!formData.recipient) {
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

      const token = localStorage.getItem("token");

      const payload = {
        country_code: formData.country.country_code,
        currency: formData.country.currency,
        payment_method: {
          category: formData.payment_method.category
        },
        transaction: {
          type: "deposit", // or transfer depending on page
          amount: amountNum,
          remark: formData.note
        },
        account: {
          phone: formData.recipient.phone
        }
      };

      // Create payment intent
      const res = await fetch(`${API_BASE}/payments/intent`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Transaction failed");
      }

      const reference = data.reference;

      // Poll status
      let status = "processing";

      while (status === "processing") {
        await new Promise((r) => setTimeout(r, 2000));

        const statusRes = await fetch(
          `${API_BASE}/payments/status/${reference}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const statusData = await statusRes.json();
        status = statusData.status;
      }

      setIsProcessing(false);
      setShowConfirmation(false);

      if (status === "success") {
        setShowSuccess(true);
      } else {
        alert("Transaction failed");
      }
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
      alert(error.message);
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
                  <>
                    <h2 className="text-lg font-semibold mb-4">
                      Select Country
                    </h2>

                    <select
                      className="w-full border rounded-lg p-3"
                      value={formData.country?.country_code || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          country: {
                            country_code: e.target.value,
                            currency: "KES"
                          }
                        })
                      }
                    >
                      <option value="">Choose country</option>
                      <option value="KE">Kenya</option>
                      <option value="GH">Ghana</option>
                      <option value="NG">Nigeria</option>
                    </select>
                  </>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <>
                    <h2 className="text-lg font-semibold mb-4">
                      Payment Method
                    </h2>

                    {["mobile_money", "bank"].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            payment_method: {
                              category: m,
                              label:
                                m === "mobile_money"
                                  ? "Mobile Money"
                                  : "Bank Transfer"
                            }
                          })
                        }
                        className={`w-full p-3 border rounded-lg text-left mb-3 ${
                          formData.payment_method?.category === m
                            ? "border-primary bg-primary/5"
                            : ""
                        }`}
                      >
                        {m === "mobile_money"
                          ? "Mobile Money"
                          : "Bank Transfer"}
                      </button>
                    ))}
                  </>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <>
                    <Input
                      label="Amount"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          amount: e.target.value
                        })
                      }
                      error={errors.amount}
                      placeholder="0.00"
                    />

                    <RecipientSelector
                      selectedRecipient={formData.recipient}
                      onRecipientSelect={(recipient) =>
                        setFormData({ ...formData, recipient })
                      }
                      error={errors.recipient}
                    />

                    <Input
                      label="Note"
                      value={formData.note}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          note: e.target.value
                        })
                      }
                      placeholder="Optional note"
                    />
                  </>
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