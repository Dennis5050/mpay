import React from 'react';
import Icon from '../../../components/AppIcon';

const TransactionSummary = ({ amount, recipient, currency = 'USD', exchangeRate = null }) => {
  const calculateFee = (amount) => {
    if (amount <= 100) return 2.5;
    if (amount <= 500) return 5.0;
    if (amount <= 1000) return 8.5;
    return amount * 0.01;
  };

  const fee = calculateFee(parseFloat(amount) || 0);
  const totalAmount = (parseFloat(amount) || 0) + fee;
  const recipientAmount = exchangeRate 
    ? (parseFloat(amount) || 0) * exchangeRate 
    : parseFloat(amount) || 0;

  const summaryItems = [
    {
      label: 'Transfer Amount',
      value: `${currency} ${(parseFloat(amount) || 0)?.toFixed(2)}`,
      icon: 'Banknote',
      color: 'text-foreground'
    },
    {
      label: 'Transaction Fee',
      value: `${currency} ${fee?.toFixed(2)}`,
      icon: 'Receipt',
      color: 'text-muted-foreground'
    },
    {
      label: 'Total Debit',
      value: `${currency} ${totalAmount?.toFixed(2)}`,
      icon: 'CreditCard',
      color: 'text-primary',
      highlight: true
    }
  ];

  if (exchangeRate && recipient?.country) {
    summaryItems?.push({
      label: `Recipient Receives (${recipient?.country})`,
      value: `${recipientAmount?.toFixed(2)}`,
      icon: 'ArrowDownUp',
      color: 'text-success',
      highlight: true
    });
  }

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-border">
        <Icon name="FileText" size={20} color="var(--color-primary)" />
        <h3 className="text-lg font-heading font-semibold text-foreground">Transaction Summary</h3>
      </div>
      <div className="space-y-3">
        {summaryItems?.map((item, index) => (
          <div
            key={index}
            className={`
              flex items-center justify-between p-3 rounded-lg transition-all duration-250
              ${item?.highlight ? 'bg-primary/5 border border-primary/20' : 'bg-muted/50'}
            `}
          >
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-md ${item?.highlight ? 'bg-primary/10' : 'bg-card'}`}>
                <Icon name={item?.icon} size={16} color={item?.highlight ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} />
              </div>
              <span className={`text-sm font-body ${item?.color}`}>{item?.label}</span>
            </div>
            <span className={`font-data font-medium ${item?.highlight ? 'text-base' : 'text-sm'} ${item?.color}`}>
              {item?.value}
            </span>
          </div>
        ))}
      </div>
      {recipient && (
        <div className="pt-3 border-t border-border">
          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
            <Icon name="Info" size={18} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-caption text-muted-foreground leading-relaxed">
                Funds will be sent to <span className="font-medium text-foreground">{recipient?.name}</span> at{' '}
                <span className="font-medium text-foreground">{recipient?.phone}</span>
              </p>
              <p className="text-xs font-caption text-muted-foreground mt-1">
                Estimated delivery: 2-5 minutes
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="pt-3 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-caption">
          <Icon name="Shield" size={14} color="var(--color-success)" />
          <span>Secured by MPay Africa encryption</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionSummary;