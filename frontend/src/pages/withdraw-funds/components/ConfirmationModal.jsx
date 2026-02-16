import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  withdrawalData,
  isProcessing 
}) => {
  if (!isOpen) return null;

  const { amount, method, accountDetails, fee, netAmount } = withdrawalData;

  const methodLabels = {
    bank: 'Bank Transfer',
    mobile: 'Mobile Money',
    cash: 'Cash Pickup'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-xl border border-border shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6 space-y-4 md:space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground">
              Confirm Withdrawal
            </h2>
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="p-2 hover:bg-muted rounded-lg transition-colors duration-250"
              aria-label="Close modal"
            >
              <Icon name="X" size={20} color="var(--color-foreground)" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">Withdrawal Amount</p>
              <p className="text-2xl md:text-3xl font-heading font-bold text-primary">
                KES {netAmount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Method</span>
                <span className="text-sm font-medium text-foreground">{methodLabels?.[method]}</span>
              </div>

              {method === 'bank' && accountDetails?.accountNumber && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Account Number</span>
                    <span className="text-sm font-medium text-foreground">{accountDetails?.accountNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Bank</span>
                    <span className="text-sm font-medium text-foreground">{accountDetails?.bankName}</span>
                  </div>
                </>
              )}

              {method === 'mobile' && accountDetails?.mobileNumber && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Mobile Number</span>
                  <span className="text-sm font-medium text-foreground">{accountDetails?.mobileNumber}</span>
                </div>
              )}

              {method === 'cash' && accountDetails?.pickupLocation && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pickup Location</span>
                  <span className="text-sm font-medium text-foreground">{accountDetails?.pickupLocation}</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
            <div className="flex items-start gap-2">
              <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mt-0.5 flex-shrink-0" />
              <p className="text-xs text-warning">
                This action cannot be undone. Please verify all details before confirming.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="outline"
              fullWidth
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              fullWidth
              onClick={onConfirm}
              loading={isProcessing}
              iconName="Check"
              iconPosition="right"
            >
              Confirm Withdrawal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;