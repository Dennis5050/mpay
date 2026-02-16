import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SuccessModal = ({ isOpen, onClose, transactionData }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const { referenceNumber, amount, method, processingTime, estimatedCompletion } = transactionData;

  const methodLabels = {
    bank: 'Bank Transfer',
    mobile: 'Mobile Money',
    cash: 'Cash Pickup'
  };

  const handleViewTransactions = () => {
    navigate('/transactions');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-xl border border-border shadow-xl w-full max-w-md">
        <div className="p-6 md:p-8 space-y-5 md:space-y-6 text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name="CheckCircle2" size={40} color="var(--color-success)" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
              Withdrawal Initiated!
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Your withdrawal request has been successfully submitted
            </p>
          </div>

          <div className="space-y-3 text-left">
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Reference Number</span>
                <span className="text-sm font-mono font-medium text-foreground">{referenceNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="text-sm font-medium text-foreground">
                  KES {amount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Method</span>
                <span className="text-sm font-medium text-foreground">{methodLabels?.[method]}</span>
              </div>
            </div>

            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-start gap-2">
                <Icon name="Clock" size={16} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-primary font-medium">Processing Time: {processingTime}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Expected completion: {new Date(estimatedCompletion)?.toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-success/10 rounded-lg border border-success/20">
              <div className="flex items-start gap-2">
                <Icon name="Bell" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                <p className="text-xs text-success">
                  You'll receive SMS notifications about your withdrawal status
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Button
              variant="default"
              fullWidth
              onClick={handleViewTransactions}
              iconName="Receipt"
              iconPosition="left"
            >
              View Transactions
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={handleBackToDashboard}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;