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

const SendMoney = () => {
  // ======================
  // STEP STATE
  // ======================
  const [step, setStep] = useState(1);

  const [country, setCountry] = useState("");
  const [method, setMethod] = useState("");

  // Existing states
  const [amount, setAmount] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const userBalance = 5420.75;
  const currency = "KES";

  // ======================
  // FEES
  // ======================
  const calculateFee = (amount) => {
    if (amount <= 100) return 2.5;
    if (amount <= 500) return 5.0;
    if (amount <= 1000) return 8.5;
    return amount * 0.01;
  };

  // ======================
  // VALIDATION
  // ======================
  const validateForm = () => {
    const newErrors = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = "Enter a valid amount";
    } else if (parseFloat(amount) > userBalance) {
      newErrors.amount = "Insufficient balance";
    }

    if (!selectedRecipient) {
      newErrors.recipient = "Select a recipient";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep = () => {
    if (step === 1 && !country) return false;
    if (step === 2 && !method) return false;
    if (step === 3) return validateForm();
    return true;
  };

  // ======================
  // HANDLERS
  // ======================
  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setAmount(value);
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (!validateStep()) return;

    if (step < 4) {
      setStep(step + 1);
    } else {
      setShowConfirmation(true);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirmTransaction = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setShowConfirmation(false);
      setShowSuccess(true);
    }, 2000);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setStep(1);
    setAmount("");
    setSelectedRecipient(null);
    setNote("");
    setCountry("");
    setMethod("");
  };

  // ======================
  // CALCULATIONS
  // ======================
  const fee = calculateFee(parseFloat(amount) || 0);
  const total = (parseFloat(amount) || 0) + fee;

  const transactionData = {
    amount: (parseFloat(amount) || 0).toFixed(2),
    recipient: selectedRecipient,
    fee: fee.toFixed(2),
    total: total.toFixed(2),
    currency,
    transactionRef: `TXN${Date.now().toString().slice(-8)}`,
    timestamp: new Date().toISOString(),
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
              <Icon name="Send" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Send Money</h1>
              <p className="text-sm text-muted-foreground">
                Transfer funds across Africa
              </p>
            </div>
          </div>

          {/* Step Progress */}
          <StepProgress currentStep={step} />

          {/* Balance */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Available Balance</p>
            <p className="text-2xl font-bold">
              {currency} {userBalance.toFixed(2)}
            </p>
          </div>

          {/* Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleNext}
                className="bg-card border border-border rounded-xl p-6 space-y-6"
              >
                {/* STEP 1 */}
                {step === 1 && (
                  <div>
                    <h2 className="text-lg font-semibold mb-4">
                      Select Country
                    </h2>
                    <select
                      className="w-full border rounded-lg p-3"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="">Choose country</option>
                      <option>Kenya</option>
                      <option>Ghana</option>
                      <option>Nigeria</option>
                    </select>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div>
                    <h2 className="text-lg font-semibold mb-4">
                      Payment Method
                    </h2>
                    <div className="space-y-3">
                      {["Mobile Money", "Bank Transfer"].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setMethod(m)}
                          className={`w-full p-3 border rounded-lg text-left ${
                            method === m
                              ? "border-primary bg-primary/5"
                              : ""
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div className="space-y-4">
                    <Input
                      label="Amount"
                      type="text"
                      value={amount}
                      onChange={handleAmountChange}
                      error={errors.amount}
                      placeholder="0.00"
                    />

                    <RecipientSelector
                      selectedRecipient={selectedRecipient}
                      onRecipientSelect={setSelectedRecipient}
                      error={errors.recipient}
                    />

                    <Input
                      label="Note"
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Optional note"
                    />
                  </div>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                  <div className="space-y-3 text-sm">
                    <h2 className="text-lg font-semibold">
                      Review Transaction
                    </h2>
                    <p>
                      <strong>Country:</strong> {country}
                    </p>
                    <p>
                      <strong>Method:</strong> {method}
                    </p>
                    <p>
                      <strong>Amount:</strong> {currency} {amount}
                    </p>
                    <p>
                      <strong>Fee:</strong> {currency} {fee.toFixed(2)}
                    </p>
                    <p>
                      <strong>Total:</strong> {currency} {total.toFixed(2)}
                    </p>
                    <p>
                      <strong>Recipient:</strong>{" "}
                      {selectedRecipient?.name || "-"}
                    </p>
                  </div>
                )}

                {/* Navigation */}
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
                    variant="default"
                    iconName={step === 4 ? "Send" : "ArrowRight"}
                    iconPosition="right"
                  >
                    {step === 4 ? "Confirm & Send" : "Next"}
                  </Button>
                </div>
              </form>
            </div>

            {/* RIGHT */}
            <div>
              <TransactionSummary
                amount={(parseFloat(amount) || 0).toFixed(2)}
                recipient={selectedRecipient}
                currency={currency}
              />
            </div>
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