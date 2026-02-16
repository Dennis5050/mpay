import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import TransactionStatus from '../../../components/ui/TransactionStatus';
import { Checkbox } from '../../../components/ui/Checkbox';

const TransactionCards = ({ 
  transactions, 
  selectedIds, 
  onSelectTransaction 
}) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const formatCurrency = (amount, currency = 'KES') => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleCardExpansion = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {transactions?.map((transaction) => (
        <div
          key={transaction?.id}
          className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-all duration-250"
        >
          <div className="flex items-start gap-3">
            <Checkbox
              checked={selectedIds?.includes(transaction?.id)}
              onChange={() => onSelectTransaction(transaction?.id)}
              aria-label={`Select transaction ${transaction?.reference}`}
              className="mt-1"
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground font-body truncate">
                    {transaction?.recipient}
                  </h3>
                  <p className="text-xs text-muted-foreground font-caption">
                    {transaction?.phone}
                  </p>
                </div>
                <span className={`text-base font-bold font-body whitespace-nowrap ${
                  transaction?.type === 'incoming' ? 'text-success' : 'text-foreground'
                }`}>
                  {transaction?.type === 'incoming' ? '+' : '-'}{formatCurrency(transaction?.amount, transaction?.currency)}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-caption font-medium ${
                  transaction?.type === 'incoming' ?'bg-success/10 text-success' :'bg-primary/10 text-primary'
                }`}>
                  <Icon 
                    name={transaction?.type === 'incoming' ? 'ArrowDownLeft' : 'ArrowUpRight'} 
                    size={12} 
                    color="currentColor" 
                  />
                  {transaction?.type === 'incoming' ? 'Incoming' : 'Outgoing'}
                </span>
                <TransactionStatus status={transaction?.status} size="sm" timestamp={transaction?.date} />
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground font-caption">
                <span>{formatDate(transaction?.date)}</span>
                <button
                  onClick={() => toggleCardExpansion(transaction?.id)}
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                  aria-label={expandedCard === transaction?.id ? 'Hide details' : 'Show details'}
                >
                  {expandedCard === transaction?.id ? 'Hide' : 'Details'}
                  <Icon 
                    name={expandedCard === transaction?.id ? 'ChevronUp' : 'ChevronDown'} 
                    size={14} 
                    color="currentColor" 
                  />
                </button>
              </div>

              {expandedCard === transaction?.id && (
                <div className="mt-3 pt-3 border-t border-border space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground font-caption">Reference:</span>
                    <span className="text-foreground font-body font-medium">{transaction?.reference}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground font-caption">Fee:</span>
                    <span className="text-foreground font-body font-medium">
                      {formatCurrency(transaction?.fee, transaction?.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground font-caption">Method:</span>
                    <span className="text-foreground font-body font-medium">{transaction?.paymentMethod}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-muted-foreground font-caption block mb-1">Notes:</span>
                    <span className="text-foreground font-body">{transaction?.notes}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {transactions?.length === 0 && (
        <div className="py-12 text-center bg-card rounded-lg border border-border">
          <Icon name="FileSearch" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground font-body">No transactions found matching your filters</p>
        </div>
      )}
    </div>
  );
};

export default TransactionCards;