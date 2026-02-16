import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentTransactionCard = ({ transaction }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: transaction?.currency,
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const typeConfig = {
    send: { icon: 'ArrowUpRight', color: 'var(--color-error)', bgColor: 'bg-error/10', label: 'Sent' },
    receive: { icon: 'ArrowDownLeft', color: 'var(--color-success)', bgColor: 'bg-success/10', label: 'Received' },
    withdraw: { icon: 'Wallet', color: 'var(--color-warning)', bgColor: 'bg-warning/10', label: 'Withdrawn' }
  };

  const statusConfig = {
    success: { color: 'text-success', bgColor: 'bg-success/10', label: 'Completed' },
    pending: { color: 'text-warning', bgColor: 'bg-warning/10', label: 'Pending' },
    failed: { color: 'text-error', bgColor: 'bg-error/10', label: 'Failed' }
  };

  const config = typeConfig?.[transaction?.type] || typeConfig?.send;
  const status = statusConfig?.[transaction?.status] || statusConfig?.pending;

  return (
    <div className="card flex items-center gap-3 hover:border-primary/20">
      <div className="relative">
        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-border">
          <Image
            src={transaction?.recipientAvatar}
            alt={transaction?.recipientAvatarAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full ${config?.bgColor} flex items-center justify-center border-2 border-card`}>
          <Icon name={config?.icon} size={12} color={config?.color} />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <h4 className="text-sm font-heading font-semibold text-foreground truncate">
            {transaction?.recipientName}
          </h4>
          <span className={`text-sm font-mono font-semibold ${
            transaction?.type === 'receive' ? 'text-success' : 'text-foreground'
          }`}>
            {transaction?.type === 'receive' ? '+' : '-'}{formatCurrency(transaction?.amount)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground font-caption truncate">
            {transaction?.description}
          </p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`text-xs font-caption px-2 py-0.5 rounded-full ${status?.bgColor} ${status?.color} font-medium`}>
              {status?.label}
            </span>
            <span className="text-xs text-muted-foreground font-caption">
              {formatTime(transaction?.timestamp)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactionCard;