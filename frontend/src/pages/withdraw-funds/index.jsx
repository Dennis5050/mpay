import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Icon from "../../components/AppIcon";
import StepProgress from "../send-money/components/StepProgress";

import WithdrawalMethodCard from "./components/WithdrawalMethodCard";
import WithdrawalForm from "./components/WithdrawalForm";
import WithdrawalSummary from "./components/WithdrawalSummary";
import ConfirmationModal from "./components/ConfirmationModal";
import SuccessModal from "./components/SuccessModal";

const WithdrawFunds = () => {
  // ======================
  // STEP CONTROL
  // ======================
  const [step, setStep] = useState(1);

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [withdrawalData, setWithdrawalData] = useState(null);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const availableBalance = 125430.5;

  // ======================
  // CONFIG
  // ======================
  const savedMethods = [
    {
      id: "bank-1",
      type: "bank",
      label: "Equity Bank - ****4567",
      description: "John Doe - Equity Bank Kenya",
    },
    {
      id: "mobile-1",
      type: "mobile",
      label: "M-Pesa - +254 712 ****678",
      description: "Primary mobile money account",
    },
  ];

  const processingTimes = {
    bank: "1-3 business days",
    mobile: "Instant",
    cash: "2-4 hours",
  };

  const feePercentages = {
    bank: 0.015,
    mobile: 0.02,
    cash: 0.03,
  };

  // ======================
  // STEP HANDLERS
  // ======================
  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setStep(2);
  };

  const handleFormSubmit = (formData) => {
    const fee = formData.amount * feePercentages[formData.method];
    const netAmount = formData.amount - fee;

    setWithdrawalData({
      ...formData,
      fee,
      netAmount,
      processingTime: processingTimes[formData.method],
    });

    setStep(3);
  };

  const handleConfirmWithdrawal = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const referenceNumber = `WD${Date.now()
        .toString()
        .slice(-8)}`;

      const estimatedCompletion = new Date();

      if (withdrawalData.method === "bank") {
        estimatedCompletion.setDate(estimatedCompletion.getDate() + 2);
      } else if (withdrawalData.method === "cash") {
        estimatedCompletion.setHours(estimatedCompletion.getHours() + 3);
      } else {
        estimatedCompletion.setMinutes(estimatedCompletion.getMinutes() + 5);
      }

      setWithdrawalData((prev) => ({
        ...prev,
        referenceNumber,
        estimatedCompletion,
      }));

      setIsProcessing(false);
      setShowConfirmation(false);
      setShowSuccess(true);
    }, 2000);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedMethod(null);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setStep(1);
    setSelectedMethod(null);
    setWithdrawalData(null);
  };

  // ======================
  // UI
  // ======================
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="lg:ml-60 min-h-screen">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Wallet" size={28} color="var(--color-primary)" />
              <h1 className="text-3xl font-bold">Withdraw Funds</h1>
            </div>
            <p className="text-muted-foreground">
              Transfer money to your bank or mobile wallet
            </p>
          </div>

          {/* Step Progress */}
          <StepProgress currentStep={step} />

          {/* Balance */}
          <div className="p-5 bg-card rounded-xl border border-border flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">
                Available Balance
              </p>
              <p className="text-2xl font-bold">
                KES {availableBalance.toLocaleString()}
              </p>
            </div>
            <Icon name="Wallet" size={28} color="var(--color-primary)" />
          </div>

          {/* STEP 1 — METHOD */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Select Withdrawal Method
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <WithdrawalMethodCard method="bank" onSelect={handleMethodSelect} />
                <WithdrawalMethodCard method="mobile" onSelect={handleMethodSelect} />
                <WithdrawalMethodCard method="cash" onSelect={handleMethodSelect} />
              </div>
            </div>
          )}

          {/* STEP 2 — DETAILS */}
          {step === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
                <div className="flex justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    Withdrawal Details
                  </h2>
                  <button
                    className="text-primary text-sm"
                    onClick={() => {
                      setStep(1);
                      setSelectedMethod(null);
                    }}
                  >
                    Change Method
                  </button>
                </div>

                <WithdrawalForm
                  selectedMethod={selectedMethod}
                  onSubmit={handleFormSubmit}
                  availableBalance={availableBalance}
                  savedMethods={savedMethods.filter(
                    (m) => m.type === selectedMethod
                  )}
                />
              </div>
            </div>
          )}

          {/* STEP 3 — REVIEW */}
          {step === 3 && withdrawalData && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 space-y-4">
                <h2 className="text-xl font-semibold">Review Withdrawal</h2>

                <p><strong>Method:</strong> {withdrawalData.method}</p>
                <p><strong>Amount:</strong> KES {withdrawalData.amount}</p>
                <p><strong>Fee:</strong> KES {withdrawalData.fee.toFixed(2)}</p>
                <p><strong>You Receive:</strong> KES {withdrawalData.netAmount.toFixed(2)}</p>
                <p><strong>Processing Time:</strong> {withdrawalData.processingTime}</p>

                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={handleBack}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setShowConfirmation(true)}
                    className="px-4 py-2 bg-primary text-white rounded-lg"
                  >
                    Confirm Withdrawal
                  </button>
                </div>
              </div>

              <WithdrawalSummary
                amount={withdrawalData.amount}
                method={withdrawalData.method}
                fee={withdrawalData.fee}
                processingTime={withdrawalData.processingTime}
              />
            </div>
          )}
        </div>
      </main>

      {/* MODALS */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmWithdrawal}
        withdrawalData={withdrawalData}
        isProcessing={isProcessing}
      />

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleCloseSuccess}
        transactionData={withdrawalData}
      />
    </div>
  );
};

export default WithdrawFunds;