import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Icon from '../../components/AppIcon';
import WithdrawalMethodCard from './components/WithdrawalMethodCard';
import WithdrawalForm from './components/WithdrawalForm';
import WithdrawalSummary from './components/WithdrawalSummary';
import ConfirmationModal from './components/ConfirmationModal';
import SuccessModal from './components/SuccessModal';

const WithdrawFunds = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [withdrawalData, setWithdrawalData] = useState(null);

  const availableBalance = 125430.50;

  const savedMethods = [
    {
      id: 'bank-1',
      type: 'bank',
      label: 'Equity Bank - ****4567',
      description: 'John Doe - Equity Bank Kenya'
    },
    {
      id: 'mobile-1',
      type: 'mobile',
      label: 'M-Pesa - +254 712 ****678',
      description: 'Primary mobile money account'
    }
  ];

  const methodAvailability = {
    bank: true,
    mobile: true,
    cash: true
  };

  const processingTimes = {
    bank: '1-3 business days',
    mobile: 'Instant',
    cash: '2-4 hours'
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleFormSubmit = (formData) => {
    const feePercentages = {
      bank: 0.015,
      mobile: 0.02,
      cash: 0.03
    };
    
    const fee = formData?.amount * feePercentages?.[formData?.method];
    const netAmount = formData?.amount - fee;

    setWithdrawalData({
      ...formData,
      fee,
      netAmount,
      processingTime: processingTimes?.[formData?.method]
    });
    setShowConfirmation(true);
  };

  const handleConfirmWithdrawal = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const referenceNumber = `WD${Date.now()?.toString()?.slice(-8)}`;
      const estimatedCompletion = new Date();
      
      if (withdrawalData?.method === 'bank') {
        estimatedCompletion?.setDate(estimatedCompletion?.getDate() + 2);
      } else if (withdrawalData?.method === 'cash') {
        estimatedCompletion?.setHours(estimatedCompletion?.getHours() + 3);
      } else {
        estimatedCompletion?.setMinutes(estimatedCompletion?.getMinutes() + 5);
      }

      setIsProcessing(false);
      setShowConfirmation(false);
      setShowSuccess(true);
      
      setWithdrawalData(prev => ({
        ...prev,
        referenceNumber,
        estimatedCompletion
      }));
    }, 2000);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setSelectedMethod(null);
    setWithdrawalData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:ml-60 min-h-screen">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Wallet" size={28} color="var(--color-primary)" />
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground">
                Withdraw Funds
              </h1>
            </div>
            <p className="text-sm md:text-base text-muted-foreground">
              Transfer money to your bank account, mobile wallet, or collect cash
            </p>
          </div>

          <div className="mb-6 p-4 md:p-5 bg-card rounded-xl border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
                <p className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  KES {availableBalance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Wallet" size={24} color="var(--color-primary)" />
              </div>
            </div>
          </div>

          {!selectedMethod ? (
            <div>
              <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4">
                Select Withdrawal Method
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
                <WithdrawalMethodCard
                  method="bank"
                  isSelected={false}
                  onSelect={handleMethodSelect}
                  isAvailable={methodAvailability?.bank}
                />
                <WithdrawalMethodCard
                  method="mobile"
                  isSelected={false}
                  onSelect={handleMethodSelect}
                  isAvailable={methodAvailability?.mobile}
                />
                <WithdrawalMethodCard
                  method="cash"
                  isSelected={false}
                  onSelect={handleMethodSelect}
                  isAvailable={methodAvailability?.cash}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2">
                <div className="bg-card rounded-xl border border-border p-4 md:p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                      Withdrawal Details
                    </h2>
                    <button
                      onClick={() => setSelectedMethod(null)}
                      className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-250"
                    >
                      Change Method
                    </button>
                  </div>

                  <WithdrawalForm
                    selectedMethod={selectedMethod}
                    onSubmit={handleFormSubmit}
                    availableBalance={availableBalance}
                    savedMethods={savedMethods?.filter(m => m?.type === selectedMethod)}
                  />
                </div>
              </div>

              <div className="lg:col-span-1">
                {withdrawalData && (
                  <WithdrawalSummary
                    amount={withdrawalData?.amount}
                    method={selectedMethod}
                    fee={withdrawalData?.fee}
                    processingTime={processingTimes?.[selectedMethod]}
                  />
                )}
              </div>
            </div>
          )}

          <div className="mt-8 p-4 md:p-5 bg-muted/50 rounded-xl border border-border">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="text-sm font-heading font-semibold text-foreground">
                  Important Information
                </h3>
                <ul className="text-xs md:text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Minimum withdrawal amount is KES 100</li>
                  <li>Maximum withdrawal per transaction is KES 50,000</li>
                  <li>Daily withdrawal limit is KES 200,000</li>
                  <li>Processing times may vary depending on your bank or mobile money provider</li>
                  <li>Ensure your account details are correct to avoid delays</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
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