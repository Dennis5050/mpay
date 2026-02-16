import React from 'react';
import Icon from '../../../components/AppIcon';

const WithdrawalMethodCard = ({ 
  method, 
  isSelected, 
  onSelect, 
  isAvailable = true 
}) => {
  const methodConfig = {
    bank: {
      icon: 'Building2',
      title: 'Bank Transfer',
      description: 'Direct transfer to your bank account',
      processingTime: '1-3 business days',
      fee: '1.5%'
    },
    mobile: {
      icon: 'Smartphone',
      title: 'Mobile Money',
      description: 'Instant transfer to mobile wallet',
      processingTime: 'Instant',
      fee: '2%'
    },
    cash: {
      icon: 'MapPin',
      title: 'Cash Pickup',
      description: 'Collect cash at partner locations',
      processingTime: '2-4 hours',
      fee: '3%'
    }
  };

  const config = methodConfig?.[method];

  return (
    <button
      onClick={() => isAvailable && onSelect(method)}
      disabled={!isAvailable}
      className={`
        w-full p-4 md:p-5 lg:p-6 rounded-xl border-2 transition-all duration-250
        ${isSelected 
          ? 'border-primary bg-primary/5 shadow-md' 
          : 'border-border bg-card hover:border-primary/50 hover:shadow-sm'
        }
        ${!isAvailable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <div className="flex items-start gap-3 md:gap-4">
        <div className={`
          w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg flex items-center justify-center flex-shrink-0
          ${isSelected ? 'bg-primary' : 'bg-primary/10'}
        `}>
          <Icon 
            name={config?.icon} 
            size={24} 
            color={isSelected ? 'var(--color-primary-foreground)' : 'var(--color-primary)'} 
          />
        </div>
        
        <div className="flex-1 text-left min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              {config?.title}
            </h3>
            {isSelected && (
              <Icon name="CheckCircle2" size={20} color="var(--color-primary)" />
            )}
          </div>
          
          <p className="text-sm text-muted-foreground mb-2 md:mb-3">
            {config?.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-1.5">
              <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
              <span className="text-muted-foreground">{config?.processingTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon name="DollarSign" size={14} color="var(--color-muted-foreground)" />
              <span className="text-muted-foreground">Fee: {config?.fee}</span>
            </div>
          </div>
          
          {!isAvailable && (
            <div className="mt-2 flex items-center gap-1.5">
              <Icon name="AlertCircle" size={14} color="var(--color-warning)" />
              <span className="text-xs text-warning">Not available in your country</span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default WithdrawalMethodCard;