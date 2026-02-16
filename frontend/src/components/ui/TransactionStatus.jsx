import React from 'react';
import Icon from '../AppIcon';

const TransactionStatus = ({ 
  status, 
  timestamp, 
  showIcon = true, 
  showTooltip = false,
  size = 'default' 
}) => {
  const statusConfig = {
    success: {
      label: 'Success',
      icon: 'CheckCircle2',
      bgColor: 'bg-success/10',
      textColor: 'text-success',
      borderColor: 'border-success/20',
      tooltip: 'Transaction completed successfully'
    },
    pending: {
      label: 'Pending',
      icon: 'Clock',
      bgColor: 'bg-warning/10',
      textColor: 'text-warning',
      borderColor: 'border-warning/20',
      tooltip: 'Transaction is being processed'
    },
    failed: {
      label: 'Failed',
      icon: 'XCircle',
      bgColor: 'bg-error/10',
      textColor: 'text-error',
      borderColor: 'border-error/20',
      tooltip: 'Transaction failed'
    },
    processing: {
      label: 'Processing',
      icon: 'Loader2',
      bgColor: 'bg-primary/10',
      textColor: 'text-primary',
      borderColor: 'border-primary/20',
      tooltip: 'Transaction in progress',
      animate: true
    }
  };

  const config = statusConfig?.[status?.toLowerCase()] || statusConfig?.pending;
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    default: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 14,
    default: 16,
    lg: 18
  };

  return (
    <div className="inline-flex items-center gap-2">
      <span
        className={`
          inline-flex items-center gap-1.5 rounded-md border font-caption font-medium
          ${config?.bgColor} ${config?.textColor} ${config?.borderColor}
          ${sizeClasses?.[size]}
          transition-all duration-250
        `}
        title={showTooltip ? config?.tooltip : undefined}
      >
        {showIcon && (
          <Icon 
            name={config?.icon} 
            size={iconSizes?.[size]} 
            color="currentColor"
            className={config?.animate ? 'animate-spin' : ''}
          />
        )}
        <span>{config?.label}</span>
      </span>
      {timestamp && (
        <span className="text-xs text-muted-foreground font-caption">
          {new Date(timestamp)?.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      )}
    </div>
  );
};

export default TransactionStatus;