import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Icon from '../../components/AppIcon';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import RecipientSelector from './components/RecipientSelector';
import TransactionSummary from './components/TransactionSummary';
import ConfirmationModal from './components/ConfirmationModal';
import SuccessModal from './components/SuccessModal';

const SendMoney = () => {
  const [amount, setAmount] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const userBalance = 5420.75;
  const currency = 'USD';

  const calculateFee = (amount) => {
    if (amount <= 100) return 2.5;
    if (amount <= 500) return 5.0;
    if (amount <= 1000) return 8.5;
    return amount * 0.01;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    } else if (parseFloat(amount) > userBalance) {
      newErrors.amount = 'Insufficient balance';
    } else if (parseFloat(amount) < 1) {
      newErrors.amount = 'Minimum transfer amount is $1.00';
    } else if (parseFloat(amount) > 10000) {
      newErrors.amount = 'Maximum transfer amount is $10,000.00';
    }

    if (!selectedRecipient) {
      newErrors.recipient = 'Please select a recipient';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleAmountChange = (e) => {
    const value = e?.target?.value?.replace(/[^0-9.]/g, '');
    if (value === '' || /^\d*\.?\d{0,2}$/?.test(value)) {
      setAmount(value);
      if (errors?.amount) {
        setErrors({ ...errors, amount: '' });
      }
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      setShowConfirmation(true);
    }
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
    setAmount('');
    setSelectedRecipient(null);
    setNote('');
    setErrors({});
  };

  const fee = calculateFee(parseFloat(amount) || 0);
  const total = (parseFloat(amount) || 0) + fee;

  const transactionData = {
    amount: (parseFloat(amount) || 0)?.toFixed(2),
    recipient: selectedRecipient,
    fee: fee?.toFixed(2),
    total: total?.toFixed(2),
    currency: currency,
    transactionRef: `TXN${Date.now()?.toString()?.slice(-8)}`,
    timestamp: new Date()?.toISOString()
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex">
      <Sidebar />
      <main className="flex-1 lg:ml-60 p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon name="Send" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Send Money</h1>
              <p className="text-sm md:text-base text-muted-foreground font-body">
                Transfer funds across Africa instantly
              </p>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <Icon name="Wallet" size={20} color="var(--color-primary)" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground font-caption">Available Balance</p>
                <p className="text-xl md:text-2xl font-data font-bold text-foreground">
                  {currency} {userBalance?.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-4 md:p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <Input
                      label="Amount"
                      type="text"
                      placeholder="0.00"
                      value={amount}
                      onChange={handleAmountChange}
                      error={errors?.amount}
                      required
                      description={`Min: $1.00 | Max: $10,000.00`}
                    />
                    {amount && parseFloat(amount) > 0 && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground font-caption">
                        <Icon name="Info" size={14} color="var(--color-primary)" />
                        <span>Transaction fee: {currency} {fee?.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <RecipientSelector
                    selectedRecipient={selectedRecipient}
                    onRecipientSelect={setSelectedRecipient}
                    error={errors?.recipient}
                  />

                  <Input
                    label="Note (Optional)"
                    type="text"
                    placeholder="Add a note for this transaction"
                    value={note}
                    onChange={(e) => setNote(e?.target?.value)}
                    description="Maximum 100 characters"
                  />
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setAmount('');
                        setSelectedRecipient(null);
                        setNote('');
                        setErrors({});
                      }}
                      fullWidth
                      className="sm:flex-1"
                    >
                      Clear Form
                    </Button>
                    <Button
                      type="submit"
                      variant="default"
                      iconName="Send"
                      iconPosition="right"
                      fullWidth
                      className="sm:flex-1"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </form>

              <div className="mt-6 p-4 bg-muted/50 border border-border rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon name="Shield" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-body font-medium text-foreground mb-1">Secure Transactions</p>
                    <p className="text-xs font-caption text-muted-foreground leading-relaxed">
                      All transactions are encrypted and protected by MPay Africa's advanced security systems.
                      Your money is safe with us.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <TransactionSummary
                  amount={(parseFloat(amount) || 0)?.toFixed(2)}
                  recipient={selectedRecipient}
                  currency={currency}
                />

                <div className="mt-6 space-y-3">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon name="Clock" size={18} color="var(--color-primary)" />
                      <p className="text-sm font-body font-medium text-foreground">Processing Time</p>
                    </div>
                    <p className="text-xs font-caption text-muted-foreground leading-relaxed">
                      Instant transfers within the same country. Cross-border transfers may take 2-5 minutes.
                    </p>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon name="HelpCircle" size={18} color="var(--color-primary)" />
                      <p className="text-sm font-body font-medium text-foreground">Need Help?</p>
                    </div>
                    <p className="text-xs font-caption text-muted-foreground leading-relaxed mb-2">
                      Contact our 24/7 support team for assistance with your transactions.
                    </p>
                    <Button variant="outline" size="sm" iconName="MessageCircle" iconPosition="left" fullWidth>
                      Chat Support
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
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