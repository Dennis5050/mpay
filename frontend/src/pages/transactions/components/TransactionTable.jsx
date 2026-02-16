import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import TransactionStatus from '../../../components/ui/TransactionStatus';
import { Checkbox } from '../../../components/ui/Checkbox';

const TransactionTable = ({ 
  transactions, 
  selectedIds, 
  onSelectTransaction, 
  onSelectAll,
  onSort,
  sortConfig 
}) => {
  const [expandedRow, setExpandedRow] = useState(null);

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

  const handleSort = (column) => {
    const direction = sortConfig?.column === column && sortConfig?.direction === 'asc' ? 'desc' : 'asc';
    onSort(column, direction);
  };

  const getSortIcon = (column) => {
    if (sortConfig?.column !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const toggleRowExpansion = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const allSelected = transactions?.length > 0 && selectedIds?.length === transactions?.length;

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto scrollbar-custom">
        <table className="w-full min-w-[800px]">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left w-12">
                <Checkbox
                  checked={allSelected}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  aria-label="Select all transactions"
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center gap-2 font-heading font-semibold text-sm text-foreground hover:text-primary transition-colors"
                >
                  Date & Time
                  <Icon name={getSortIcon('date')} size={16} color="currentColor" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('recipient')}
                  className="flex items-center gap-2 font-heading font-semibold text-sm text-foreground hover:text-primary transition-colors"
                >
                  Recipient/Sender
                  <Icon name={getSortIcon('recipient')} size={16} color="currentColor" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('amount')}
                  className="flex items-center gap-2 font-heading font-semibold text-sm text-foreground hover:text-primary transition-colors"
                >
                  Amount
                  <Icon name={getSortIcon('amount')} size={16} color="currentColor" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="font-heading font-semibold text-sm text-foreground">Type</span>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="font-heading font-semibold text-sm text-foreground">Status</span>
              </th>
              <th className="px-4 py-3 text-center w-12">
                <span className="font-heading font-semibold text-sm text-foreground">Details</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions?.map((transaction) => (
              <React.Fragment key={transaction?.id}>
                <tr className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={selectedIds?.includes(transaction?.id)}
                      onChange={() => onSelectTransaction(transaction?.id)}
                      aria-label={`Select transaction ${transaction?.reference}`}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-foreground font-body whitespace-nowrap">
                      {formatDate(transaction?.date)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground font-body">
                        {transaction?.recipient}
                      </span>
                      <span className="text-xs text-muted-foreground font-caption">
                        {transaction?.phone}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-semibold font-body whitespace-nowrap ${
                      transaction?.type === 'incoming' ? 'text-success' : 'text-foreground'
                    }`}>
                      {transaction?.type === 'incoming' ? '+' : '-'}{formatCurrency(transaction?.amount, transaction?.currency)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-caption font-medium ${
                      transaction?.type === 'incoming' ?'bg-success/10 text-success' :'bg-primary/10 text-primary'
                    }`}>
                      <Icon 
                        name={transaction?.type === 'incoming' ? 'ArrowDownLeft' : 'ArrowUpRight'} 
                        size={14} 
                        color="currentColor" 
                      />
                      {transaction?.type === 'incoming' ? 'Incoming' : 'Outgoing'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <TransactionStatus status={transaction?.status} timestamp={transaction?.date} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleRowExpansion(transaction?.id)}
                      className="p-1.5 hover:bg-muted rounded-md transition-colors"
                      aria-label={expandedRow === transaction?.id ? 'Hide details' : 'Show details'}
                    >
                      <Icon 
                        name={expandedRow === transaction?.id ? 'ChevronUp' : 'ChevronDown'} 
                        size={18} 
                        color="var(--color-muted-foreground)" 
                      />
                    </button>
                  </td>
                </tr>
                {expandedRow === transaction?.id && (
                  <tr className="bg-muted/30">
                    <td colSpan="7" className="px-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <span className="text-xs text-muted-foreground font-caption block mb-1">
                            Transaction Reference
                          </span>
                          <span className="text-sm text-foreground font-body font-medium">
                            {transaction?.reference}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground font-caption block mb-1">
                            Processing Fee
                          </span>
                          <span className="text-sm text-foreground font-body font-medium">
                            {formatCurrency(transaction?.fee, transaction?.currency)}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground font-caption block mb-1">
                            Payment Method
                          </span>
                          <span className="text-sm text-foreground font-body font-medium">
                            {transaction?.paymentMethod}
                          </span>
                        </div>
                        <div className="md:col-span-2 lg:col-span-3">
                          <span className="text-xs text-muted-foreground font-caption block mb-1">
                            Processing Notes
                          </span>
                          <span className="text-sm text-foreground font-body">
                            {transaction?.notes}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {transactions?.length === 0 && (
        <div className="py-12 text-center">
          <Icon name="FileSearch" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground font-body">No transactions found matching your filters</p>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;