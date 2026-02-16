import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, transactionData, isProcessing }) => {
  if (!isOpen) return null;

  const { amount, recipient, fee, total, currency } = transactionData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto scrollbar-custom">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                <Icon name="AlertCircle" size={24} color="var(--color-warning)" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-semibold text-foreground">Confirm Transaction</h2>
                <p className="text-sm text-muted-foreground font-caption">Review details before sending</p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="p-2 hover:bg-muted rounded-lg transition-colors duration-250 disabled:opacity-50"
              aria-label="Close modal"
            >
              <Icon name="X" size={20} color="var(--color-muted-foreground)" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-card">
                  <img
                    src={recipient?.avatar}
                    alt={recipient?.avatarAlt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-semibold text-foreground truncate">{recipient?.name}</p>
                  <p className="text-sm text-muted-foreground font-caption">{recipient?.phone}</p>
                  <p className="text-xs text-muted-foreground font-caption">{recipient?.country}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm text-muted-foreground font-body">Amount</span>
                <span className="font-data font-semibold text-foreground">{currency} {amount}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm text-muted-foreground font-body">Transaction Fee</span>
                <span className="font-data font-medium text-foreground">{currency} {fee}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <span className="text-base font-body font-semibold text-foreground">Total Debit</span>
                <span className="font-data font-bold text-lg text-primary">{currency} {total}</span>
              </div>
            </div>

            <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={18} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body text-foreground font-medium mb-1">Important Notice</p>
                  <p className="text-xs font-caption text-muted-foreground leading-relaxed">
                    Please verify recipient details carefully. Transactions cannot be reversed once confirmed.
                    Estimated delivery time is 2-5 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
              fullWidth
              className="sm:flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={onConfirm}
              loading={isProcessing}
              disabled={isProcessing}
              iconName="Send"
              iconPosition="right"
              fullWidth
              className="sm:flex-1"
            >
              {isProcessing ? 'Processing...' : 'Confirm & Send'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;