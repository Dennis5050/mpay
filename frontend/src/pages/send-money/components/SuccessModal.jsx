import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessModal = ({ isOpen, onClose, transactionData }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const { amount, recipient, transactionRef, timestamp, currency } = transactionData;

  const handleViewTransactions = () => {
    navigate('/transactions');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto scrollbar-custom">
        <div className="p-6 space-y-6">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-success/10 flex items-center justify-center">
              <Icon name="CheckCircle2" size={48} color="var(--color-success)" />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Transaction Successful!</h2>
              <p className="text-sm text-muted-foreground font-body">
                Your money has been sent successfully
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground font-caption mb-1">Amount Sent</p>
                <p className="text-3xl font-data font-bold text-success">{currency} {amount}</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-caption">
                <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
                <span>Estimated delivery: 2-5 minutes</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground font-body">Recipient</span>
                <span className="font-body font-medium text-foreground text-right">{recipient?.name}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground font-body">Phone Number</span>
                <span className="font-data font-medium text-foreground">{recipient?.phone}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground font-body">Transaction ID</span>
                <div className="flex items-center gap-2">
                  <span className="font-data text-sm text-foreground">{transactionRef}</span>
                  <button
                    onClick={() => navigator.clipboard?.writeText(transactionRef)}
                    className="p-1 hover:bg-card rounded transition-colors duration-250"
                    aria-label="Copy transaction ID"
                  >
                    <Icon name="Copy" size={14} color="var(--color-primary)" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground font-body">Date & Time</span>
                <span className="font-caption text-sm text-foreground">
                  {new Date(timestamp)?.toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>

            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Bell" size={18} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body text-foreground font-medium mb-1">Notification Sent</p>
                  <p className="text-xs font-caption text-muted-foreground leading-relaxed">
                    {recipient?.name} will receive a notification about this transaction.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              fullWidth
              className="sm:flex-1"
            >
              Done
            </Button>
            <Button
              variant="default"
              onClick={handleViewTransactions}
              iconName="Receipt"
              iconPosition="right"
              fullWidth
              className="sm:flex-1"
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