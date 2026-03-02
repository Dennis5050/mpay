import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const formatAmount = (amount, currency) => {
  if (!amount) return `${currency} 0`;
  return `${currency} ${Number(amount).toLocaleString()}`;
};

const formatDate = (timestamp) => {
  if (!timestamp) return '-';
  return new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const SuccessModal = ({ isOpen, onClose, transactionData = {} }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const {
    amount = 0,
    recipient = {},
    transactionRef = '',
    timestamp = new Date().toISOString(),
    currency = 'KES'
  } = transactionData;

  const handleViewTransactions = () => {
    navigate('/transactions');
  };

  const handleCopy = async () => {
    if (!transactionRef) return;
    try {
      await navigator.clipboard.writeText(transactionRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  // Close on ESC (pro UX)
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto scrollbar-custom">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-success/10 flex items-center justify-center">
              <Icon name="CheckCircle2" size={48} color="var(--color-success)" />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                Transaction Successful!
              </h2>
              <p className="text-sm text-muted-foreground">
                Your money has been sent successfully
              </p>
            </div>
          </div>

          {/* Amount */}
          <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground mb-1">Amount Sent</p>
              <p className="text-3xl font-data font-bold text-success">
                {formatAmount(amount, currency)}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>Estimated delivery: 2–5 minutes</span>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Recipient</span>
              <span className="font-medium text-right">
                {recipient?.name || '-'}
              </span>
            </div>

            <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Phone</span>
              <span className="font-medium">
                {recipient?.phone || '-'}
              </span>
            </div>

            <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Transaction ID</span>
              <div className="flex items-center gap-2">
                <span className="font-data text-sm">
                  {transactionRef || '-'}
                </span>
                {transactionRef && (
                  <button
                    onClick={handleCopy}
                    className="p-1 hover:bg-card rounded transition"
                    aria-label="Copy transaction ID"
                  >
                    <Icon
                      name={copied ? "Check" : "Copy"}
                      size={14}
                      color="var(--color-primary)"
                    />
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Date & Time</span>
              <span className="text-sm">
                {formatDate(timestamp)}
              </span>
            </div>
          </div>

          {/* Notification */}
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex gap-3">
              <Icon name="Bell" size={18} color="var(--color-primary)" />
              <div>
                <p className="text-sm font-medium mb-1">Notification Sent</p>
                <p className="text-xs text-muted-foreground">
                  {recipient?.name || 'Recipient'} will receive a notification about this transaction.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose} fullWidth>
              Done
            </Button>

            <Button
              variant="default"
              onClick={handleViewTransactions}
              iconName="Receipt"
              iconPosition="right"
              fullWidth
            >
              View Transactions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;