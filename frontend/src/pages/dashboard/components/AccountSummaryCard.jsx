import React from 'react';
import Icon from '../../../components/AppIcon';

const AccountSummaryCard = ({ icon, label, value, subValue, trend, iconColor }) => {
  return (
    <div className="card group hover:border-primary/20">
      <div className="flex items-start gap-3">
        <div 
          className="w-11 h-11 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-250"
          style={{ 
            background: `linear-gradient(135deg, ${iconColor}15 0%, ${iconColor}25 100%)`,
          }}
        >
          <Icon name={icon} size={22} color={iconColor} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-caption text-muted-foreground mb-1 uppercase tracking-wide">{label}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl font-heading font-bold text-foreground">{value}</h3>
            {trend !== null && (
              <span className={`text-xs font-caption font-semibold ${
                trend > 0 ? 'text-success' : 'text-error'
              }`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground font-caption mt-0.5">{subValue}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountSummaryCard;