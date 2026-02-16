import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TransactionFilters = ({ 
  filters, 
  onFilterChange, 
  onReset,
  onSearch 
}) => {
  const transactionTypeOptions = [
    { value: 'all', label: 'All Transactions' },
    { value: 'incoming', label: 'Incoming' },
    { value: 'outgoing', label: 'Outgoing' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'success', label: 'Success' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' }
  ];

  const datePresetOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'quarter', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
          Filter Transactions
        </h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={onReset}
        >
          Reset Filters
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Transaction Type"
          options={transactionTypeOptions}
          value={filters?.type}
          onChange={(value) => onFilterChange('type', value)}
          placeholder="Select type"
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
          placeholder="Select status"
        />

        <Select
          label="Date Range"
          options={datePresetOptions}
          value={filters?.datePreset}
          onChange={(value) => onFilterChange('datePreset', value)}
          placeholder="Select period"
        />

        <div className="flex items-end">
          <Input
            type="search"
            placeholder="Search by name, amount, or reference..."
            value={filters?.searchQuery}
            onChange={(e) => onFilterChange('searchQuery', e?.target?.value)}
            className="w-full"
          />
        </div>
      </div>
      {filters?.datePreset === 'custom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <Input
            type="date"
            label="Start Date"
            value={filters?.startDate}
            onChange={(e) => onFilterChange('startDate', e?.target?.value)}
          />
          <Input
            type="date"
            label="End Date"
            value={filters?.endDate}
            onChange={(e) => onFilterChange('endDate', e?.target?.value)}
          />
        </div>
      )}
      <div className="flex flex-wrap gap-2 pt-2">
        {filters?.type !== 'all' && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/10 text-primary text-sm font-caption">
            Type: {transactionTypeOptions?.find(opt => opt?.value === filters?.type)?.label}
            <button
              onClick={() => onFilterChange('type', 'all')}
              className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
              aria-label="Remove type filter"
            >
              <Icon name="X" size={14} color="currentColor" />
            </button>
          </span>
        )}
        {filters?.status !== 'all' && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/10 text-primary text-sm font-caption">
            Status: {statusOptions?.find(opt => opt?.value === filters?.status)?.label}
            <button
              onClick={() => onFilterChange('status', 'all')}
              className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
              aria-label="Remove status filter"
            >
              <Icon name="X" size={14} color="currentColor" />
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default TransactionFilters;