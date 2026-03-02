import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const formatCurrency = (currency, value) => {
  if (value === undefined || value === null) return `${currency} 0`;
  return `${currency} ${Number(value).toLocaleString()}`;
};

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  transactionData = {},
  isProcessing = false
}) => {
  // Do not render when closed (performance)
  if (!isOpen) return null;

  const {
    amount = 0,
    fee = 0,
    total = 0,
    currency = 'KES',
    recipient = {}
  } = transactionData;

  const {
    name = 'Recipient',
    phone = '',
    country = '',
    avatar = '/assets/images/no_image.png',
    avatarAlt = 'Recipient'
  } = recipient;

  // Close on ESC (pro UX)
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && !isProcessing) {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isProcessing, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto scrollbar-custom">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                <Icon name="AlertCircle" size={24} color="var(--color-warning)" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  Confirm Transaction
                </h2>
                <p className="text-sm text-muted-foreground font-caption">
                  Review details before sending
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              disabled={isProcessing}
              className="p-2 hover:bg-muted rounded-lg transition disabled:opacity-50"
              aria-label="Close modal"
            >
              <Icon name="X" size={20} color="var(--color-muted-foreground)" />
            </button>
          </div>

          {/* Recipient */}
          <div className="p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-card">
                <img
                  src={avatar}
                  alt={avatarAlt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/no_image.png';
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-body font-semibold text-foreground truncate">
                  {name}
                </p>
                {phone && (
                  <p className="text-sm text-muted-foreground font-caption">
                    {phone}
                  </p>
                )}
                {country && (
                  <p className="text-xs text-muted-foreground font-caption">
                    {country}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Amount Summary */}
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="font-semibold">
                {formatCurrency(currency, amount)}
              </span>
            </div>

            <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
              <span className="text-sm text-muted-foreground">Transaction Fee</span>
              <span className="font-medium">
                {formatCurrency(currency, fee)}
              </span>
            </div>

            <div className="flex justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <span className="font-semibold">Total Debit</span>
              <span className="font-bold text-lg text-primary">
                {formatCurrency(currency, total)}
              </span>
            </div>
          </div>

          {/* Notice */}
          <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
            <div className="flex gap-3">
              <Icon name="Info" size={18} color="var(--color-warning)" />
              <div>
                <p className="text-sm font-medium mb-1">Important Notice</p>
                <p className="text-xs text-muted-foreground">
                  Verify recipient details carefully. Transactions cannot be reversed once confirmed.
                  Estimated delivery time: 2–5 minutes.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
              fullWidth
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