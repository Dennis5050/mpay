import React from 'react';
import Icon from '../../../components/AppIcon';

const WithdrawalSummary = ({ amount, method, fee, processingTime }) => {
  const calculateFee = () => {
    const feePercentages = {
      bank: 0.015,
      mobile: 0.02,
      cash: 0.03
    };
    return amount * feePercentages?.[method];
  };

  const calculatedFee = calculateFee();
  const netAmount = amount - calculatedFee;

  const methodLabels = {
    bank: 'Bank Transfer',
    mobile: 'Mobile Money',
    cash: 'Cash Pickup'
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-5 lg:p-6 space-y-4">
      <div className="flex items-center gap-2 mb-3 md:mb-4">
        <Icon name="FileText" size={20} color="var(--color-primary)" />
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
          Withdrawal Summary
        </h3>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span className="text-sm text-muted-foreground">Withdrawal Method</span>
          <span className="text-sm font-medium text-foreground">{methodLabels?.[method]}</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-border">
          <span className="text-sm text-muted-foreground">Amount</span>
          <span className="text-sm font-medium text-foreground">
            KES {amount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-border">
          <span className="text-sm text-muted-foreground">Processing Fee</span>
          <span className="text-sm font-medium text-error">
            - KES {calculatedFee?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex justify-between items-center py-3 bg-primary/5 rounded-lg px-3 mt-2">
          <span className="text-base font-heading font-semibold text-foreground">You'll Receive</span>
          <span className="text-lg md:text-xl font-heading font-bold text-primary">
            KES {netAmount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border space-y-2">
        <div className="flex items-start gap-2">
          <Icon name="Clock" size={16} color="var(--color-muted-foreground)" className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Processing Time</p>
            <p className="text-sm font-medium text-foreground">{processingTime}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Icon name="Shield" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-success">Secure Transaction</p>
            <p className="text-xs text-muted-foreground">Protected by bank-level encryption</p>
          </div>
        </div>
      </div>
      <div className="mt-4 p-3 bg-warning/10 rounded-lg border border-warning/20">
        <div className="flex items-start gap-2">
          <Icon name="AlertCircle" size={16} color="var(--color-warning)" className="mt-0.5 flex-shrink-0" />
          <p className="text-xs text-warning">
            Please ensure your account details are correct. Incorrect details may result in delayed or failed transactions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalSummary;