import React, { useMemo } from 'react';
import Icon from '../../../components/AppIcon';

const formatCurrency = (amount, currency) => {
  const value = Number(amount) || 0;
  return `${currency} ${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

const calculateFee = (amount) => {
  // Temporary client-side fee logic
  // In production this should come from API
  if (amount <= 0) return 0;
  if (amount <= 100) return 2.5;
  if (amount <= 500) return 5.0;
  if (amount <= 1000) return 8.5;
  return amount * 0.01;
};

const TransactionSummary = ({
  amount = 0,
  recipient = null,
  currency = 'USD',
  exchangeRate = null,
  fee: apiFee = null // allow backend override later
}) => {

  // Memoized calculations (performance)
  const {
    fee,
    totalAmount,
    recipientAmount
  } = useMemo(() => {
    const numericAmount = Number(amount) || 0;

    const calculatedFee =
      apiFee !== null ? Number(apiFee) : calculateFee(numericAmount);

    const total = numericAmount + calculatedFee;

    const receivedAmount = exchangeRate
      ? numericAmount * Number(exchangeRate)
      : numericAmount;

    return {
      fee: calculatedFee,
      totalAmount: total,
      recipientAmount: receivedAmount
    };
  }, [amount, exchangeRate, apiFee]);

  const summaryItems = [
    {
      label: 'Transfer Amount',
      value: formatCurrency(amount, currency),
      icon: 'Banknote',
      color: 'text-foreground'
    },
    {
      label: 'Transaction Fee',
      value: formatCurrency(fee, currency),
      icon: 'Receipt',
      color: 'text-muted-foreground'
    },
    {
      label: 'Total Debit',
      value: formatCurrency(totalAmount, currency),
      icon: 'CreditCard',
      color: 'text-primary',
      highlight: true
    }
  ];

  // Cross-border display
  if (exchangeRate && recipient?.country) {
    summaryItems.push({
      label: `Recipient Receives (${recipient.country})`,
      value: recipientAmount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }),
      icon: 'ArrowDownUp',
      color: 'text-success',
      highlight: true
    });
  }

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-border">
        <Icon name="FileText" size={20} color="var(--color-primary)" />
        <h3 className="text-lg font-semibold text-foreground">
          Transaction Summary
        </h3>
      </div>

      {/* Summary Items */}
      <div className="space-y-3">
        {summaryItems.map((item, index) => (
          <div
            key={index}
            className={`
              flex items-center justify-between p-3 rounded-lg transition
              ${item.highlight
                ? 'bg-primary/5 border border-primary/20'
                : 'bg-muted/50'}
            `}
          >
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-md ${item.highlight ? 'bg-primary/10' : 'bg-card'}`}>
                <Icon
                  name={item.icon}
                  size={16}
                  color={
                    item.highlight
                      ? 'var(--color-primary)'
                      : 'var(--color-muted-foreground)'
                  }
                />
              </div>
              <span className={`text-sm ${item.color}`}>
                {item.label}
              </span>
            </div>

            <span
              className={`font-data ${
                item.highlight ? 'text-base' : 'text-sm'
              } ${item.color}`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Recipient Info */}
      {recipient && (
        <div className="pt-3 border-t border-border">
          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
            <Icon
              name="Info"
              size={18}
              color="var(--color-primary)"
              className="flex-shrink-0 mt-0.5"
            />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">
                Funds will be sent to{' '}
                <span className="font-medium text-foreground">
                  {recipient?.name || '-'}
                </span>{' '}
                at{' '}
                <span className="font-medium text-foreground">
                  {recipient?.phone || '-'}
                </span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Estimated delivery: 2–5 minutes
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Security */}
      <div className="pt-3 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="Shield" size={14} color="var(--color-success)" />
          <span>Secured by MPay Africa encryption</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionSummary;